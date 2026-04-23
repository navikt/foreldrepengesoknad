import { XMarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, VStack } from '@navikt/ds-react';

import { DATE_1_YEAR_FROM_NOW, DATE_TODAY, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { RhfDatepicker, RhfSelect } from '@navikt/fp-form-hooks';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { createCountryOptions, formatDate } from '@navikt/fp-utils';
import {
    isAfterOrSame,
    isBeforeOrSame,
    isDateWithinRange,
    isDatesNotTheSame,
    isPeriodNotOverlappingOthers,
    isRequired,
    isSameOrAfterToday,
    isValidDate,
} from '@navikt/fp-validation';

interface Props {
    index: number;
    fjernOpphold: (index: number) => void;
}

export const SenereUtenlandsoppholdPeriode = ({ index, fjernOpphold }: Props) => {
    const intl = useIntl();

    const {
        control,
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<{ utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[] }>();

    const alleAndreUtenlandsopphold = watch(`utenlandsoppholdNeste12Mnd`).filter((_u, i) => i !== index);
    const fom = watch(`utenlandsoppholdNeste12Mnd.${index}.fom`);
    const tom = watch(`utenlandsoppholdNeste12Mnd.${index}.tom`);

    const minDateFom = DATE_TODAY;
    const maxDateFom = tom ? dayjs(tom).subtract(1, 'days').format(ISO_DATE_FORMAT) : DATE_1_YEAR_FROM_NOW;

    const minDateTom = fom && isSameOrAfterToday(fom) ? dayjs(fom).add(1, 'days').format(ISO_DATE_FORMAT) : DATE_TODAY;
    const maxDateTom = DATE_1_YEAR_FROM_NOW;

    return (
        <VStack gap="space-20" align="start">
            <RhfSelect
                name={`utenlandsoppholdNeste12Mnd.${index}.landkode`}
                control={control}
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
                {createCountryOptions().map((o) => (
                    <option key={o[0]} value={o[0]}>
                        {o[1]}
                    </option>
                ))}
            </RhfSelect>
            <RhfDatepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.fom`}
                control={control}
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
                onChange={() => isSubmitted && void trigger()}
            />
            <RhfDatepicker
                name={`utenlandsoppholdNeste12Mnd.${index}.tom`}
                control={control}
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
                onChange={() => isSubmitted && void trigger()}
                defaultMonth={fom}
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
