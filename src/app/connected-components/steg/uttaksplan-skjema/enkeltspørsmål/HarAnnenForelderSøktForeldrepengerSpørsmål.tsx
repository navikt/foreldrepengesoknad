import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import JaNeiSpørsmål from '../../../../components/ja-nei-spørsmål/JaNeiSpørsmål';

const HarAnnenForelderSøktForeldrepengerSpørsmål: React.StatelessComponent<
    UttaksplanSkjemaspørsmålProps & InjectedIntlProps
> = ({ visible = true, intl }) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <JaNeiSpørsmål
                navn="harAnnenForelderSøktFP"
                spørsmål={intl.formatMessage({ id: 'spørsmål.harAnnenForelderSøktFP.label' })}
                valgtVerdi={data.harAnnenForelderSøktFP}
                onChange={(harAnnenForelderSøktFP) => onChange({ harAnnenForelderSøktFP })}
            />
        )}
    />
);

export default injectIntl(HarAnnenForelderSøktForeldrepengerSpørsmål);
