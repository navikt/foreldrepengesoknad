import { useIntl } from 'react-intl';

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
    valgtPeriode: Planperiode | undefined;
    gjelderAdopsjon: boolean;
    erBarnetFødt: boolean;
};

export const TidsperiodeSpørsmål = ({ formMethods, valgtPeriode, gjelderAdopsjon, erBarnetFødt }: Props) => {
    const intl = useIntl();

    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');

    const getÅrsak = () => {
        if (valgtPeriode?.utsettelseÅrsak && valgtPeriode.utsettelseÅrsak === UtsettelseÅrsakType.Ferie) {
            return valgtPeriode.utsettelseÅrsak;
        }

        if (valgtPeriode?.periodeHullÅrsak && valgtPeriode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
            return valgtPeriode.periodeHullÅrsak;
        }

        return undefined;
    };

    const årsak = getÅrsak();
    const minDate = getMinDate({ årsak, kontoType: valgtPeriode?.kontoType, familiehendelsedato, gjelderAdopsjon });
    const maxDate = getMaxDate({ familiehendelsedato, kontoType: valgtPeriode?.kontoType });

    return (
        <>
            <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
            <HStack gap="4">
                <RhfDatepicker
                    showMonthAndYearDropdowns
                    minDate={minDate}
                    maxDate={maxDate}
                    label="Fra og med dato"
                    name="fom"
                    disableWeekends={true}
                    validate={getFomValidators({
                        intl,
                        familiehendelsedato,
                        kontoType: valgtPeriode?.kontoType,
                        tomValue,
                        erBarnetFødt,
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon,
                    })}
                />
                <RhfDatepicker
                    validate={getTomValidators({
                        intl,
                        familiehendelsedato,
                        kontoType: valgtPeriode?.kontoType,
                        fomValue,
                        erBarnetFødt,
                        minDate,
                        maxDate,
                        årsak,
                        gjelderAdopsjon,
                    })}
                    label="Til og med dato"
                    name="tom"
                    disableWeekends={true}
                    minDate={fomValue}
                    maxDate={maxDate}
                />
            </HStack>
        </>
    );
};
