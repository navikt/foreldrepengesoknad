import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { isBeforeOrSame, isRequired, isValidDate, isWeekday } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Uttaksplanperiode, erPeriodeUtenUttakHull, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { getFomDiverseValidators, getFomÅrsakValidators } from '../../utils/dateFomValidators';
import { getMaxDate, getMinDate } from '../../utils/dateLimits';
import { getTomDiverseValidators, getTomÅrsakValidators } from '../../utils/dateTomValidators';
import { FormValues, HvaVilDuGjøre } from './LeggTilEllerEndrePeriodeListPanel';

type Props = {
    valgtPeriode?: Uttaksplanperiode;
};

export const TidsperiodeSpørsmål = ({ valgtPeriode }: Props) => {
    const intl = useIntl();

    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const { watch, control } = useFormContext<FormValues>();

    const {
        forelder,
        hvaVilDuGjøre,
        kontoTypeMor,
        kontoTypeFarMedmor,
        skalDuKombinereArbeidOgUttakMor,
        skalDuKombinereArbeidOgUttakFarMedmor,
        tom,
        fom,
    } = watch();

    const årsak = getÅrsak(hvaVilDuGjøre, valgtPeriode);

    const erSamtidigUttak = forelder === 'BEGGE';

    const valgtPeriodeKontoType =
        valgtPeriode && erVanligUttakPeriode(valgtPeriode) ? valgtPeriode.kontoType : undefined;

    let minDateMor = undefined;
    let maxDateMor = undefined;
    let minDateFarMedmor = undefined;
    let maxDateFarMedmor = undefined;

    const fomValidatorer = [];
    const tomValidatorer = [];

    if (forelder === 'MOR' || forelder === 'BEGGE') {
        minDateMor = getMinDate({
            årsak,
            kontoType: kontoTypeMor ?? valgtPeriodeKontoType,
            familiehendelsedato,
            gjelderAdopsjon: familiesituasjon === 'adopsjon',
        });
        maxDateMor = getMaxDate({ familiehendelsedato, kontoType: kontoTypeMor ?? valgtPeriodeKontoType, årsak });

        fomValidatorer.push(
            ...getFomDiverseValidators(
                intl,
                familiehendelsedato,
                familiesituasjon,
                minDateMor,
                maxDateMor,
                erSamtidigUttak,
                kontoTypeMor,
                skalDuKombinereArbeidOgUttakMor,
                'MOR',
            ),
        );
        tomValidatorer.push(
            ...getTomDiverseValidators(
                intl,
                familiehendelsedato,
                familiesituasjon,
                minDateMor,
                maxDateMor,
                skalDuKombinereArbeidOgUttakMor,
                erSamtidigUttak,
                'MOR',
                kontoTypeMor,
            ),
        );
    }

    if (forelder === 'FAR_MEDMOR' || forelder === 'BEGGE') {
        minDateFarMedmor = getMinDate({
            årsak,
            kontoType: kontoTypeFarMedmor ?? valgtPeriodeKontoType,
            familiehendelsedato,
            gjelderAdopsjon: familiesituasjon === 'adopsjon',
        });
        maxDateFarMedmor = getMaxDate({
            familiehendelsedato,
            kontoType: kontoTypeFarMedmor ?? valgtPeriodeKontoType,
            årsak,
        });

        fomValidatorer.push(
            ...getFomDiverseValidators(
                intl,
                familiehendelsedato,
                familiesituasjon,
                minDateFarMedmor,
                maxDateFarMedmor,
                erSamtidigUttak,
                kontoTypeFarMedmor,
                skalDuKombinereArbeidOgUttakFarMedmor,
                'FAR_MEDMOR',
            ),
        );

        tomValidatorer.push(
            ...getTomDiverseValidators(
                intl,
                familiehendelsedato,
                familiesituasjon,
                minDateFarMedmor,
                maxDateFarMedmor,
                skalDuKombinereArbeidOgUttakFarMedmor,
                erSamtidigUttak,
                'FAR_MEDMOR',
                kontoTypeFarMedmor,
            ),
        );
    }

    const minDate = dayjs(minDateMor).isBefore(dayjs(minDateFarMedmor)) ? minDateFarMedmor : minDateMor;
    const maxDate = dayjs(maxDateMor).isAfter(dayjs(maxDateFarMedmor)) ? maxDateFarMedmor : maxDateMor;

    return (
        <VStack gap="space-16">
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.tidsperiodeSpørsmål.heading" />
            </Heading>
            <HStack gap="space-16">
                <RhfDatepicker
                    name="fom"
                    control={control}
                    showMonthAndYearDropdowns
                    minDate={minDate}
                    maxDate={maxDate}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.fom' })}
                    disableWeekends={true}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.påkrevd' })),
                        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.gyldigDato' })),
                        isBeforeOrSame(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.førTilDato' }), tom),
                        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.måVæreUkedag' })),
                        ...fomValidatorer,
                        ...getFomÅrsakValidators(intl, familiehendelsedato, familiesituasjon, årsak),
                    ]}
                />
                <RhfDatepicker
                    name="tom"
                    control={control}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.påkrevd' })),
                        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.gyldigDato' })),
                        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.måVæreUkedag' })),
                        ...tomValidatorer,
                        ...getTomÅrsakValidators(intl, familiehendelsedato, familiesituasjon, årsak),
                    ]}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.tom' })}
                    disableWeekends={true}
                    minDate={fom}
                    maxDate={maxDate}
                />
            </HStack>
        </VStack>
    );
};

const getÅrsak = (hvaVilDuGjøre: HvaVilDuGjøre, valgtPeriode: Uttaksplanperiode | undefined) => {
    if (hvaVilDuGjøre === 'LEGG_TIL_OPPHOLD') {
        return 'PERIODE_UTEN_UTTAK';
    }

    if (valgtPeriode && erVanligUttakPeriode(valgtPeriode) && valgtPeriode?.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
        return valgtPeriode.utsettelseÅrsak;
    }

    if (valgtPeriode && erPeriodeUtenUttakHull(valgtPeriode)) {
        return 'PERIODE_UTEN_UTTAK';
    }

    return undefined;
};
