import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import JaNeiSpørsmål from '../../../../components/skjema/ja-nei-spørsmål/JaNeiSpørsmål';

const SkalStarteRettEtterMorSpørsmål: React.StatelessComponent<UttaksplanSkjemaspørsmålProps & InjectedIntlProps> = ({
    visible = true,
    intl
}) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <JaNeiSpørsmål
                navn="skalStarteRettEtterMorSpørsmål"
                spørsmål={intl.formatMessage({ id: 'spørsmål.skalStarteRettEtterMorSpørsmål.label' })}
                valgtVerdi={data.skalStarteRettEtterMor}
                onChange={(skalStarteRettEtterMor) => onChange({ skalStarteRettEtterMor })}
            />
        )}
    />
);

export default injectIntl(SkalStarteRettEtterMorSpørsmål);
