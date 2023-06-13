import { hasValue, intlUtils } from '@navikt/fp-common';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getStønadskontoNavn } from 'uttaksplan/utils/stønadskontoerUtils';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';

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
    erFarEllerMedmor: boolean
): string => {
    if (erOppholdsperiode) {
        const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
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
        })
    );

    return (
        <PeriodeUttakFormComponents.RadioGroup
            name={fieldName}
            radios={radios}
            legend={legend}
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
