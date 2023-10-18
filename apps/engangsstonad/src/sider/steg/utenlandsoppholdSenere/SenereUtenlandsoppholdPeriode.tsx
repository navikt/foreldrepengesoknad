import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { date1YearFromNow, dateRangesCollide, dateToday } from '@navikt/fp-common';
import { createCountryOptions } from '@navikt/fp-utils';
import { Datepicker, Select } from '@navikt/fp-form-hooks';
import { useFormValidators } from '@navikt/fp-validation';
import { TIDENES_ENDE } from '@navikt/fp-constants';

import { validateFromDate, validateToDate } from './valideringsregler';
import { UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';

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
            id: 'SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp',
        });
    }
    return null;
};

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const SenereUtenlandsoppholdPanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const intl = useIntl();
    const {
        isRequired,
        date: { isDatesNotTheSame },
    } = useFormValidators();

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
                    <FormattedMessage
                        id={'SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI'}
                    />
                }
                validate={[isRequired('SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved')]}
            >
                {createCountryOptions().map((o: Record<string, any>) => (
                    <option key={o[0]} value={o[0]}>
                        {o[1]}
                    </option>
                ))}
            </Select>
            <Datepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.fom`}
                label={<FormattedMessage id="SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed" />}
                minDate={dayjs(dateToday).toDate()}
                maxDate={tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).toDate()}
                validate={[
                    isRequired('SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved'),
                    isDatesNotTheSame('SenereUtenlandsoppholdSteg.FomErLikTom', tom),
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
                label={<FormattedMessage id="SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    isRequired('SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved'),
                    isDatesNotTheSame('SenereUtenlandsoppholdSteg.TomErLikFom', fom),
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
                    <FormattedMessage id="SenereUtenlandsoppholdSteg.Knapp.SlettOpphold" />
                </Button>
            )}
        </VStack>
    );
};

export default SenereUtenlandsoppholdPanel;
