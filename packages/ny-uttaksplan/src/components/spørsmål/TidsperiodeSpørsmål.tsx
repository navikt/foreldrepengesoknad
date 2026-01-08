import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { isBeforeOrSame, isRequired, isValidDate, isWeekday } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Uttaksplanperiode, erUttaksplanHull, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import {
    getFomDiverseValidators,
    getFomKontoTypeValidators,
    getFomÅrsakValidators,
} from '../../utils/dateFomValidators';
import { getMaxDate, getMinDate } from '../../utils/dateLimits';
import {
    getTomDiverseValidators,
    getTomKontoTypeValidators,
    getTomÅrsakValidators,
} from '../../utils/dateTomValidators';
import { EndrePeriodePanelStepFormValues } from '../endre-periode-panel/steps/EndrePeriodePanelStep';
import {
    HvaVilDuGjøre,
    LeggTilPeriodePanelFormValues,
} from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';

type Props = {
    valgtPeriode?: Uttaksplanperiode;
    hvaVilDuGjøre: HvaVilDuGjøre;
};

export const TidsperiodeSpørsmål = ({ valgtPeriode, hvaVilDuGjøre }: Props) => {
    const intl = useIntl();

    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const { watch, control } = useFormContext<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>();

    const fomValue = watch('fom');
    const kontoType = watch('kontoType');
    const tomValue = watch('tom');
    const samtidigUttak = watch('samtidigUttak');
    const skalDuJobbe = watch('skalDuJobbe');
    const forelder = watch('forelder');

    const årsak = getÅrsak(hvaVilDuGjøre, valgtPeriode);

    const valgtPeriodeKontoType =
        valgtPeriode && erVanligUttakPeriode(valgtPeriode) ? valgtPeriode.kontoType : undefined;

    const minDate = getMinDate({
        årsak,
        kontoType: kontoType ?? valgtPeriodeKontoType,
        familiehendelsedato,
        gjelderAdopsjon: familiesituasjon === 'adopsjon',
    });
    const maxDate = getMaxDate({ familiehendelsedato, kontoType: kontoType ?? valgtPeriodeKontoType, årsak });

    return (
        <>
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
                        isBeforeOrSame(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.førTilDato' }), tomValue),
                        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.måVæreUkedag' })),
                        ...getFomKontoTypeValidators(
                            intl,
                            familiehendelsedato,
                            familiesituasjon,
                            tomValue,
                            samtidigUttak,
                            kontoType,
                        ),
                        ...getFomDiverseValidators(
                            intl,
                            familiehendelsedato,
                            familiesituasjon,
                            minDate,
                            maxDate,
                            samtidigUttak,
                            kontoType,
                            skalDuJobbe,
                            forelder,
                        ),
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
                        ...getTomKontoTypeValidators(
                            intl,
                            familiehendelsedato,
                            familiesituasjon,
                            fomValue,
                            samtidigUttak,
                            kontoType,
                        ),
                        ...getTomDiverseValidators(
                            intl,
                            familiehendelsedato,
                            familiesituasjon,
                            minDate,
                            maxDate,
                            skalDuJobbe,
                            samtidigUttak,
                            forelder,
                            kontoType,
                        ),
                        ...getTomÅrsakValidators(intl, familiehendelsedato, familiesituasjon, årsak),
                    ]}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.tom' })}
                    disableWeekends={true}
                    minDate={fomValue}
                    maxDate={maxDate}
                />
            </HStack>
        </>
    );
};

const getÅrsak = (hvaVilDuGjøre: HvaVilDuGjøre, valgtPeriode: Uttaksplanperiode | undefined) => {
    if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD) {
        return 'PERIODE_UTEN_UTTAK';
    }

    if (valgtPeriode && erVanligUttakPeriode(valgtPeriode) && valgtPeriode?.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
        return valgtPeriode.utsettelseÅrsak;
    }

    if (valgtPeriode && erUttaksplanHull(valgtPeriode) && valgtPeriode.hullType === 'PERIODE_UTEN_UTTAK') {
        return valgtPeriode.hullType;
    }

    return undefined;
};
