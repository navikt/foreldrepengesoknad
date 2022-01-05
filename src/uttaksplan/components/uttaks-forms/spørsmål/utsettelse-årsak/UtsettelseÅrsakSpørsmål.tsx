import { intlUtils } from '@navikt/fp-common';
import { RadioProps } from 'nav-frontend-skjema';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import {
    PeriodeUtsettelseFormComponents,
    PeriodeUtsettelseFormField,
} from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';

interface Props {
    periodenErKunHelligdager: boolean;
    skalViseGamleUtsettelseÅrsaker: boolean;
}

const getUtsettelseÅrsakOptions = (
    intl: IntlShape,
    periodenErKunHelligdager: boolean,
    skalViseGamleUtsettelseÅrsaker: boolean
) => {
    const allRadios: RadioProps[] = [
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskalhaferie'),
            value: UtsettelseÅrsakType.Ferie,
            disabled: periodenErKunHelligdager === true,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskaljobbeheltid'),
            value: UtsettelseÅrsakType.Arbeid,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.pgasykdom'),
            value: UtsettelseÅrsakType.Sykdom,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.hv_øvelse'),
            value: UtsettelseÅrsakType.HvØvelse,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.navtiltak'),
            value: UtsettelseÅrsakType.NavTiltak,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.fri'),
            value: UtsettelseÅrsakType.Fri,
            name: 'utsettelseÅrsak',
        },
    ];

    const defaultRadios = allRadios.filter((option) => {
        if (skalViseGamleUtsettelseÅrsaker && option.value === UtsettelseÅrsakType.Fri) {
            return false;
        }

        if (skalViseGamleUtsettelseÅrsaker) {
            return true;
        }

        return option.value === UtsettelseÅrsakType.Sykdom || option.value === UtsettelseÅrsakType.Fri;
    });

    return defaultRadios;
};

const UtsettelseÅrsakSpørsmål: FunctionComponent<Props> = ({
    periodenErKunHelligdager,
    skalViseGamleUtsettelseÅrsaker,
}) => {
    const intl = useIntl();
    const årsakOptions = getUtsettelseÅrsakOptions(intl, periodenErKunHelligdager, skalViseGamleUtsettelseÅrsaker);

    return (
        <PeriodeUtsettelseFormComponents.RadioPanelGroup
            name={PeriodeUtsettelseFormField.årsak}
            radios={årsakOptions}
        />
    );
};

export default UtsettelseÅrsakSpørsmål;
