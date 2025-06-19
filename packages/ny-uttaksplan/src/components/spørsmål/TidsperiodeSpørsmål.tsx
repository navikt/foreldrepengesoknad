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
import { LeggTilPeriodeModalStepFormValues } from '../legg-til-periode-modal/steps/LeggTilPeriodeModalStep';

type Props = {
    valgtPeriode?: Planperiode;
    gjelderAdopsjon: boolean;
    erBarnetFødt: boolean;
    oppholdsårsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
};

export const TidsperiodeSpørsmål = ({ valgtPeriode, gjelderAdopsjon, erBarnetFødt, oppholdsårsak }: Props) => {
    const intl = useIntl();

    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));
    const { watch } = useFormContext<LeggTilPeriodeModalStepFormValues>();

    const fomValue = watch('fom');
    const kontoType = watch('kontoType');

    const getÅrsak = () => {
        if (valgtPeriode?.utsettelseÅrsak && valgtPeriode.utsettelseÅrsak === UtsettelseÅrsakType.Ferie) {
            return valgtPeriode.utsettelseÅrsak;
        }

        if (valgtPeriode?.periodeHullÅrsak && valgtPeriode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
            return valgtPeriode.periodeHullÅrsak;
        }

        return undefined;
    };

    const årsak = oppholdsårsak ?? getÅrsak();
    const minDate = getMinDate({
        årsak,
        kontoType: kontoType ?? valgtPeriode?.kontoType,
        familiehendelsedato,
        gjelderAdopsjon,
    });
    const maxDate = getMaxDate({ familiehendelsedato, kontoType: kontoType ?? valgtPeriode?.kontoType });

    return (
        <>
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.tidsperiodeSpørsmål.heading" />
            </Heading>
            <HStack gap="4">
                <RhfDatepicker
                    showMonthAndYearDropdowns
                    minDate={minDate}
                    maxDate={maxDate}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.fom' })}
                    name="fom"
                    disableWeekends={true}
                    validate={getFomValidators({
                        familiehendelsedato,
                        erBarnetFødt,
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon,
                    })}
                />
                <RhfDatepicker
                    validate={getTomValidators({
                        familiehendelsedato,
                        erBarnetFødt,
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon,
                    })}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.tom' })}
                    name="tom"
                    disableWeekends={true}
                    minDate={fomValue}
                    maxDate={maxDate}
                />
            </HStack>
        </>
    );
};
