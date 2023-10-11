import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { date1YearFromNow, dateRangesCollide, dateToday } from '@navikt/fp-common';

import { createCountryOptions } from 'fpcommon/util/countryUtils';
import { Datepicker, Select } from '@navikt/fp-form-hooks';
import {
    isRequired,
    validateDatesNotEqual,
    validateFromDate,
    validateToDate,
} from 'fpcommon/validering/valideringsregler';
import { UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';

const TIDENES_ENDE = dayjs('9999-31-12').toDate();

const validerPeriodeOverlapp = (
    intl: IntlShape,
    alleAndrePerioder: UtenlandsoppholdPeriode[],
    fom: string,
    tom?: string,
): string | null => {
    const dateRanges = alleAndrePerioder.map((u) => ({
        from: dayjs(u.fom).toDate(),
        to: u.tom ? dayjs(u.tom).toDate() : TIDENES_ENDE,
    }));

    const allDateRanges = dateRanges.concat({
        from: dayjs(fom).toDate(),
        to: tom ? dayjs(tom).toDate() : TIDENES_ENDE,
    });

    if (dateRangesCollide(allDateRanges)) {
        return intl.formatMessage({
            id: 'valideringsfeil.utenlandsopphold.overlapp',
        });
    }
    return null;
};

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const NesteUtenlandsoppholdPanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const intl = useIntl();

    const {
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<{ utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[] }>();

    const alleAndreUtenlandsopphold = watch(`utenlandsoppholdNeste12Mnd`).filter((_u, i) => i !== index);
    const fom = watch(`utenlandsoppholdNeste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdNeste12Mnd.${index}.tom`);

    const minDateFom = dayjs(dateToday).toDate();
    const maxDateFom = tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).toDate();

    const minDateTom = dayjs(fom || dateToday).toDate();
    const maxDateTom = dayjs(date1YearFromNow).toDate();

    return (
        <VStack gap="5" align="start">
            <Select
                name={`utenlandsoppholdNeste12Mnd.${index}.landkode`}
                label={
                    <FormattedMessage id={'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandSkalDuBoI'} />
                }
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.leggTilUtenlandsopphold.landDuSkalBoIPåkreved',
                        }),
                    ),
                ]}
            >
                {createCountryOptions().map((o: Record<string, any>) => (
                    <option key={o[0]} value={o[0]}>
                        {o[1]}
                    </option>
                ))}
            </Select>
            <Datepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.fom`}
                label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                minDate={dayjs(dateToday).toDate()}
                maxDate={tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).toDate()}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.leggTilUtenlandsopphold.landFomDuSkalBoIPåkreved',
                        }),
                    ),
                    validateDatesNotEqual(
                        intl.formatMessage({
                            id: 'valideringsfeil.fomErLikTom',
                        }),
                        tom,
                    ),
                    (fomValue) => {
                        return validateFromDate(
                            intl,
                            dayjs(fomValue).toDate(),
                            minDateFom,
                            maxDateFom,
                            dayjs(tom).toDate(),
                        );
                    },
                    (fomValue) => {
                        return validerPeriodeOverlapp(intl, alleAndreUtenlandsopphold, fomValue, tom);
                    },
                ]}
                onChange={() => isSubmitted && trigger()}
            />
            <Datepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.tom`}
                label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    validateDatesNotEqual(
                        intl.formatMessage({
                            id: 'valideringsfeil.tomErLikFom',
                        }),
                        fom,
                    ),
                    (tomValue) => {
                        const tom = tomValue || TIDENES_ENDE;
                        return validateToDate(
                            intl,
                            dayjs(tom).toDate(),
                            dayjs(fom || dateToday).toDate(),
                            dayjs(date1YearFromNow).toDate(),
                            dayjs(fom).toDate(),
                        );
                    },
                    (tomValue) => {
                        return validerPeriodeOverlapp(intl, alleAndreUtenlandsopphold, fom, tomValue);
                    },
                ]}
                onChange={() => isSubmitted && trigger()}
            />
            {index > 0 && (
                <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    icon={<TrashIcon aria-hidden />}
                    onClick={() => fjernOpphold(index)}
                >
                    <FormattedMessage id="utenlandsopphold.knapp.SlettOpphold" />
                </Button>
            )}
        </VStack>
    );
};

export default NesteUtenlandsoppholdPanel;
