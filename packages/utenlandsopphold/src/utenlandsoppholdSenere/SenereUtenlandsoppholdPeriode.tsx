import { XMarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, VStack } from '@navikt/ds-react';

import { DATE_1_YEAR_FROM_NOW, DATE_TODAY } from '@navikt/fp-constants';
import { Datepicker, Select } from '@navikt/fp-form-hooks';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { createCountryOptions, formatDate, isSameOrAfterToday } from '@navikt/fp-utils';
import {
    isAfterOrSame,
    isBeforeOrSame,
    isDateWithinRange,
    isDatesNotTheSame,
    isPeriodNotOverlappingOthers,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

interface OwnProps {
    index: number;
    fjernOpphold: (index: number) => void;
}

const SenereUtenlandsoppholdPanel: React.FunctionComponent<OwnProps> = ({ index, fjernOpphold }) => {
    const intl = useIntl();

    const {
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<{ utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[] }>();

    const alleAndreUtenlandsopphold = watch(`utenlandsoppholdNeste12Mnd`).filter((_u, i) => i !== index);
    const fom = watch(`utenlandsoppholdNeste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdNeste12Mnd.${index}.tom`);

    const minDateFom = dayjs(DATE_TODAY).toDate();
    const maxDateFom = tom ? dayjs(tom).subtract(1, 'days').toDate() : dayjs(DATE_1_YEAR_FROM_NOW).toDate();

    const minDateTom = fom && isSameOrAfterToday(fom) ? dayjs(fom).add(1, 'days').toDate() : dayjs(DATE_TODAY).toDate();
    const maxDateTom = dayjs(DATE_1_YEAR_FROM_NOW).toDate();

    return (
        <VStack gap="5" align="start">
            <Select
                name={`utenlandsoppholdNeste12Mnd.${index}.landkode`}
                label={
                    <FormattedMessage
                        id={'SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI'}
                    />
                }
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved',
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
                label={<FormattedMessage id="SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed" />}
                minDate={minDateFom}
                maxDate={maxDateFom}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved',
                        }),
                    ),
                    isValidDate(intl.formatMessage({ id: 'SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato' })),
                    isDatesNotTheSame(intl.formatMessage({ id: 'SenereUtenlandsoppholdSteg.FomErLikTom' }), tom),
                    isBeforeOrSame(
                        intl.formatMessage({ id: 'SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato' }),
                        tom,
                    ),
                    isDateWithinRange(
                        intl.formatMessage(
                            { id: 'SenereUtenlandsoppholdSteg.DateOutsideRangeFom' },
                            {
                                min: formatDate(minDateFom),
                                max: formatDate(maxDateFom),
                            },
                        ),
                        minDateFom,
                        maxDateFom,
                    ),
                    isPeriodNotOverlappingOthers(
                        intl.formatMessage({
                            id: 'SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp',
                        }),
                        { date: tom, isStartDate: false },
                        alleAndreUtenlandsopphold,
                    ),
                ]}
                onChange={() => isSubmitted && trigger()}
            />
            <Datepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.tom`}
                label={<FormattedMessage id="SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed" />}
                minDate={minDateTom}
                maxDate={maxDateTom}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved',
                        }),
                    ),
                    isValidDate(intl.formatMessage({ id: 'SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato' })),
                    isDatesNotTheSame(intl.formatMessage({ id: 'SenereUtenlandsoppholdSteg.TomErLikFom' }), fom),
                    isAfterOrSame(
                        intl.formatMessage({ id: 'SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato' }),
                        fom,
                    ),
                    isDateWithinRange(
                        intl.formatMessage(
                            { id: 'SenereUtenlandsoppholdSteg.DateOutsideRangeTom' },
                            {
                                min: formatDate(minDateTom),
                                max: formatDate(maxDateTom),
                            },
                        ),
                        minDateTom,
                        maxDateTom,
                    ),
                    isPeriodNotOverlappingOthers(
                        intl.formatMessage({
                            id: 'SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp',
                        }),
                        { date: fom, isStartDate: true },
                        alleAndreUtenlandsopphold,
                    ),
                ]}
                onChange={() => isSubmitted && trigger()}
                defaultMonth={fom ? dayjs(fom).toDate() : undefined}
            />
            {index > 0 && (
                <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    icon={<XMarkIcon aria-hidden />}
                    onClick={() => fjernOpphold(index)}
                >
                    <FormattedMessage id="SenereUtenlandsoppholdSteg.Knapp.SlettOpphold" />
                </Button>
            )}
        </VStack>
    );
};

export default SenereUtenlandsoppholdPanel;
