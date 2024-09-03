import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { NavnPåForeldre, StønadskontoType, hasValue } from '@navikt/fp-common';

import { FormikRadioProp } from '../../../../formik-wrappers/components/formik-radio-group/FormikRadioGroup';
import { getStønadskontoNavn } from '../../../../utils/stønadskontoerUtils';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    velgbareStønadskontoer: StønadskontoType[];
    erOppholdsperiode: boolean;
    navnPåForeldre: NavnPåForeldre;
    fieldName: PeriodeUttakFormField;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
}

const getSpørsmålsTekst = (
    erOppholdsperiode: boolean,
    intl: IntlShape,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
): string => {
    if (erOppholdsperiode) {
        const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
        return intl.formatMessage(
            { id: 'uttaksplan.hvilkenKvote.annenForelder' },
            {
                navnAnnenForelder,
            },
        );
    } else {
        return intl.formatMessage({ id: 'uttaksplan.hvilkenKvote' });
    }
};

const HvilkenKontoSpørsmål: FunctionComponent<Props> = ({
    velgbareStønadskontoer,
    erOppholdsperiode,
    navnPåForeldre,
    fieldName,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();
    const legend = getSpørsmålsTekst(erOppholdsperiode, intl, navnPåForeldre, erFarEllerMedmor);

    const radios = velgbareStønadskontoer.map(
        (konto): FormikRadioProp => ({
            label: getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg),
            value: `${konto}`,
        }),
    );

    return (
        <PeriodeUttakFormComponents.RadioGroup
            name={fieldName}
            radios={radios}
            legend={legend}
            validate={(value) => {
                if (!hasValue(value)) {
                    return intl.formatMessage({ id: 'uttaksplan.validering.hvilkenKonto' });
                }

                return undefined;
            }}
        />
    );
};

export default HvilkenKontoSpørsmål;
