import * as React from 'react';
import { useIntl } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import JaNeiSpørsmål from '../../../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

const SkalHaDelAvFellesperiodeSpørsmål: React.FunctionComponent<UttaksplanSkjemaspørsmålProps> = ({
    visible = true,
}) => {
    const intl = useIntl();
    return (
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
};

export default SkalHaDelAvFellesperiodeSpørsmål;
