import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
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
    gjelderAdopsjon: boolean;
    erBarnetFødt: boolean;
    hvaVilDuGjøre: HvaVilDuGjøre;
};

export const TidsperiodeSpørsmål = ({ valgtPeriode, gjelderAdopsjon, erBarnetFødt, hvaVilDuGjøre }: Props) => {
    const intl = useIntl();

    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));
    const { watch, control } = useFormContext<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>();

    const fomValue = watch('fom');
    const kontoType = watch('kontoType');

    const getÅrsak = () => {
        if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_FERIE) {
            return UtsettelseÅrsakType.Ferie;
        }

        if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD) {
            return PeriodeHullType.PERIODE_UTEN_UTTAK;
        }

        if (valgtPeriode?.utsettelseÅrsak && valgtPeriode.utsettelseÅrsak === UtsettelseÅrsakType.Ferie) {
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
        gjelderAdopsjon,
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
                        erBarnetFødt,
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon,
                    })}
                />
                <RhfDatepicker
                    name="tom"
                    control={control}
                    validate={getTomValidators({
                        intl,
                        watch,
                        familiehendelsedato,
                        erBarnetFødt,
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon,
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
