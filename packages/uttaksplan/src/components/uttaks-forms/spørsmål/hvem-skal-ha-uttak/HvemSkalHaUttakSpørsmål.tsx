import { Forelder, NavnPåForeldre, hasValue, intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { capitalizeFirstLetter } from '@navikt/fp-common/src/common/utils/stringUtils';

interface Props {
    fieldName: PeriodeUttakFormField;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

const HvemSkalHaUttakSpørsmål: FunctionComponent<Props> = ({ fieldName, navnPåForeldre, erFarEllerMedmor }) => {
    const intl = useIntl();

    return (
        <PeriodeUttakFormComponents.RadioGroup
            legend={intlUtils(intl, 'uttaksplan.hvemSkalHaUttak')}
            name={fieldName}
            radios={[
                {
                    label: erFarEllerMedmor
                        ? capitalizeFirstLetter(navnPåForeldre.farMedmor)
                        : capitalizeFirstLetter(navnPåForeldre.mor),
                    value: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
                },
                {
                    label: erFarEllerMedmor
                        ? capitalizeFirstLetter(navnPåForeldre.mor)
                        : capitalizeFirstLetter(navnPåForeldre.farMedmor),
                    value: erFarEllerMedmor ? Forelder.mor : Forelder.farMedmor,
                },
            ]}
            validate={(value) => {
                if (!hasValue(value)) {
                    return intlUtils(intl, 'uttaksplan.validering.hvemSkalHaUttak');
                }

                return undefined;
            }}
        />
    );
};

export default HvemSkalHaUttakSpørsmål;
