import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { UttakRundtFødselÅrsak } from '@navikt/fp-common';

import Block from '../../../../common/block/Block';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

interface Props {
    fieldName: PeriodeUttakFormField;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const UttakRundtFødselÅrsakSpørsmål: FunctionComponent<Props> = ({ fieldName }) => {
    const intl = useIntl();
    const radios = [
        {
            label: intl.formatMessage({ id: 'ja' }),
            value: UttakRundtFødselÅrsak.samtidigUttak,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.uttakrundtFødselÅrsak.nei.morErForSyk' }),
            value: UttakRundtFødselÅrsak.morErForSyk,
        },
    ];

    return (
        <Block padBottom="l">
            <PeriodeUttakFormComponents.RadioGroup
                legend={intl.formatMessage({ id: 'uttaksplan.uttakrundtFødselÅrsak.spørsmål' })}
                name={fieldName}
                radios={radios}
                validate={(value) => {
                    if (!hasValue(value)) {
                        return intl.formatMessage({ id: 'uttaksplan.validering.uttakRundtFødselFarMedmorWLB' });
                    }

                    return undefined;
                }}
            />
        </Block>
    );
};
// eslint-disable-next-line import/no-default-export
export default UttakRundtFødselÅrsakSpørsmål;
