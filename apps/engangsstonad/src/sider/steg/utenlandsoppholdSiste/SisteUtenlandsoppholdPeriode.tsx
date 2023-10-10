import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { date1YearAgo, dateRangesCollide, dateToday } from '@navikt/fp-common';

import { createCountryOptions } from 'fpcommon/util/countryUtils';
import { Datepicker, Select } from '@navikt/fp-form-hooks';
import {
    validateDatesNotEqual,
    isRequired,
    validateFromDate,
    validateToDate,
} from 'fpcommon/validering/valideringsregler';
import { UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';

const validerPeriodeOverlapp = (
    intl: IntlShape,
    alleAndrePerioder: UtenlandsoppholdPeriode[],
    fom: string,
    tom: string,
): string | null => {
    const dateRanges = alleAndrePerioder.map((u) => ({
        from: dayjs(u.fom).toDate(),
        to: dayjs(u.tom).toDate(),
    }));

    const allDateRanges = dateRanges.concat({
        from: dayjs(fom).toDate(),
        to: dayjs(tom).toDate(),
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

const SisteUtenlandsoppholdPeriode: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const intl = useIntl();

    const {
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<{ utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[] }>();

    const alleAndreUtenlandsopphold = watch(`utenlandsoppholdSiste12Mnd`).filter((_u, i) => i !== index);
    const fom = watch(`utenlandsoppholdSiste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdSiste12Mnd.${index}.tom`);

    const minDateFom = dayjs(date1YearAgo).toDate();
    const maxDateFom = tom ? dayjs(tom).toDate() : dayjs(dateToday).toDate();

    const minDateTom = fom ? dayjs(fom).toDate() : dayjs(date1YearAgo).toDate();
    const maxDateTom = dayjs(dateToday).toDate();

    return (
        <VStack gap="5" align="start">
            <Select
                name={`utenlandsoppholdSiste12Mnd.${index}.landkode`}
                label={
                    <FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandHarDuBoddI" />
                }
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.leggTilUtenlandsopphold.landDuHarBoddIPåkrevd',
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
                name={`utenlandsoppholdSiste12Mnd.${index}.fom`}
                label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                minDate={minDateFom}
                maxDate={maxDateFom}
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
                        //TODO Del opp denne funksjonen
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
                name={`utenlandsoppholdSiste12Mnd.${index}.tom`}
                label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.leggTilUtenlandsopphold.landTomDuHarBoddIPåkreved',
                        }),
                    ),
                    validateDatesNotEqual(
                        intl.formatMessage({
                            id: 'valideringsfeil.tomErLikFom',
                        }),
                        fom,
                    ),
                    (tomValue) => {
                        //TODO Del opp denne funksjonen
                        return validateToDate(
                            intl,
                            dayjs(tomValue).toDate(),
                            minDateTom,
                            maxDateTom,
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

export default SisteUtenlandsoppholdPeriode;
