import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import JaNeiSpørsmål from '../../../components/skjema/ja-nei-spørsmål/JaNeiSpørsmål';

const SkalHaDelAvFellesperiodeSpørsmål: React.StatelessComponent<UttaksplanSkjemaspørsmålProps & InjectedIntlProps> = ({
    visible = true,
    intl
}) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <JaNeiSpørsmål
                navn="skalHaDelAvFellesperiodeSpørsmål"
                spørsmål={intl.formatMessage({ id: 'spørsmål.skalHaDelAvFellesperiodeSpørsmål.label' })}
                valgtVerdi={data.skalHaDelAvFellesperiode}
                onChange={(skalHaDelAvFellesperiode) => onChange({ skalHaDelAvFellesperiode })}
            />
        )}
    />
);

export default injectIntl(SkalHaDelAvFellesperiodeSpørsmål);
