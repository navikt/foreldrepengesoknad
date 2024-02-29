import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { Block, UttakRundtFødselÅrsak, hasValue, intlUtils } from '@navikt/fp-common';

import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
}

const UttakRundtFødselÅrsakSpørsmål: FunctionComponent<Props> = ({ fieldName }) => {
    const intl = useIntl();
    const radios = [
        {
            label: intlUtils(intl, 'ja'),
            value: UttakRundtFødselÅrsak.samtidigUttak,
        },
        {
            label: intlUtils(intl, 'uttaksplan.uttakrundtFødselÅrsak.nei.morErForSyk'),
            value: UttakRundtFødselÅrsak.morErForSyk,
        },
    ];

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.RadioGroup
                    legend={intlUtils(intl, 'uttaksplan.uttakrundtFødselÅrsak.spørsmål')}
                    name={fieldName}
                    radios={radios}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intlUtils(intl, 'uttaksplan.validering.uttakRundtFødselFarMedmorWLB');
                        }

                        return undefined;
                    }}
                />
            </Block>
        </>
    );
};

export default UttakRundtFødselÅrsakSpørsmål;
