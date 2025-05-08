import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { getMaxDate, getMinDate } from '../../utils/dateLimits';
import { getFomValidators, getTomValidators } from '../../utils/dateValidators';

type Props = {
    formMethods: any;
    valgtPeriode?: Planperiode;
    gjelderAdopsjon: boolean;
    erBarnetFødt: boolean;
    oppholdsårsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
};

export const TidsperiodeSpørsmål = ({
    formMethods,
    valgtPeriode,
    gjelderAdopsjon,
    erBarnetFødt,
    oppholdsårsak,
}: Props) => {
    const intl = useIntl();

    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');
    const skalDuJobbe = formMethods.watch('skalDuJobbe');
    const forelder = formMethods.watch('forelder');
    const kontoType = formMethods.watch('kontoType');

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
    const minDate = getMinDate({ årsak, kontoType: valgtPeriode?.kontoType, familiehendelsedato, gjelderAdopsjon });
    const maxDate = getMaxDate({ familiehendelsedato, kontoType: valgtPeriode?.kontoType });

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
                        intl,
                        familiehendelsedato,
                        kontoType: valgtPeriode?.kontoType ?? kontoType,
                        tomValue,
                        erBarnetFødt,
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon,
                        skalDuJobbe,
                        forelder,
                    })}
                />
                <RhfDatepicker
                    validate={getTomValidators({
                        intl,
                        familiehendelsedato,
                        kontoType: valgtPeriode?.kontoType ?? kontoType,
                        fomValue,
                        erBarnetFødt,
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon,
                        skalDuJobbe,
                        forelder,
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
