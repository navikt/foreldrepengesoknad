import { hasValue, intlUtils } from '@navikt/fp-common';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Situasjon } from 'app/types/Situasjon';
import { RadioPanelProps } from 'nav-frontend-skjema';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getStønadskontoNavn } from 'uttaksplan/utils/stønadskontoerUtils';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    velgbareStønadskontoer: StønadskontoType[];
    erOppholdsperiode: boolean;
    navnPåForeldre: NavnPåForeldre;
    navnAnnenForelder?: string;
    fieldName: PeriodeUttakFormField;
    erFarEllerMedmor: boolean;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
}

const getSpørsmålsTekst = (erOppholdsperiode: boolean, intl: IntlShape, navnAnnenForelder?: string): string => {
    if (erOppholdsperiode) {
        return intlUtils(intl, 'uttaksplan.hvilkenKvote.annenForelder', {
            navnAnnenForelder,
        });
    } else {
        return intlUtils(intl, 'uttaksplan.hvilkenKvote');
    }
};

const HvilkenKontoSpørsmål: FunctionComponent<Props> = ({
    velgbareStønadskontoer,
    erOppholdsperiode,
    navnAnnenForelder,
    navnPåForeldre,
    fieldName,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();
    const legend = getSpørsmålsTekst(erOppholdsperiode, intl, navnAnnenForelder);

    const radios = velgbareStønadskontoer.map(
        (konto): RadioPanelProps => ({
            label: getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg),
            value: `${konto}`,
        })
    );

    return (
        <PeriodeUttakFormComponents.RadioPanelGroup
            name={fieldName}
            radios={radios}
            legend={legend}
            useTwoColumns={true}
            validate={(value) => {
                if (!hasValue(value)) {
                    return intlUtils(intl, 'uttaksplan.validering.hvilkenKonto');
                }

                return undefined;
            }}
        />
    );
};

export default HvilkenKontoSpørsmål;
