import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { getMaxDate, getMinDate } from '../../utils/dateLimits';
import { getFomValidators, getTomValidators } from '../../utils/dateValidators';
import { EndrePeriodePanelStepFormValues } from '../endre-periode-panel/steps/EndrePeriodePanelStep';
import {
    HvaVilDuGjøre,
    LeggTilPeriodePanelFormValues,
} from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';

type Props = {
    valgtPeriode?: Planperiode;
    hvaVilDuGjøre: HvaVilDuGjøre;
};

export const TidsperiodeSpørsmål = ({ valgtPeriode, hvaVilDuGjøre }: Props) => {
    const intl = useIntl();

    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const { watch, control } = useFormContext<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>();

    const fomValue = watch('fom');
    const kontoType = watch('kontoType');

    const getÅrsak = () => {
        if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_FERIE) {
            return 'LOVBESTEMT_FERIE';
        }

        if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD) {
            return PeriodeHullType.PERIODE_UTEN_UTTAK;
        }

        if (valgtPeriode?.utsettelseÅrsak && valgtPeriode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
            return valgtPeriode.utsettelseÅrsak;
        }

        if (valgtPeriode?.periodeHullÅrsak && valgtPeriode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
            return valgtPeriode.periodeHullÅrsak;
        }

        return undefined;
    };

    const årsak = getÅrsak();
    const minDate = getMinDate({
        årsak,
        kontoType: kontoType ?? valgtPeriode?.kontoType,
        familiehendelsedato,
        gjelderAdopsjon: familiesituasjon === 'adopsjon',
    });
    const maxDate = getMaxDate({ familiehendelsedato, kontoType: kontoType ?? valgtPeriode?.kontoType, årsak });

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
                    validate={getFomValidators({
                        intl,
                        watch,
                        familiehendelsedato,
                        erBarnetFødt: familiesituasjon === 'fødsel',
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon: familiesituasjon === 'adopsjon',
                    })}
                />
                <RhfDatepicker
                    name="tom"
                    control={control}
                    validate={getTomValidators({
                        intl,
                        watch,
                        familiehendelsedato,
                        erBarnetFødt: familiesituasjon === 'fødsel',
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon: familiesituasjon === 'adopsjon',
                    })}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.tom' })}
                    disableWeekends={true}
                    minDate={fomValue}
                    maxDate={maxDate}
                />
            </HStack>
        </>
    );
};
