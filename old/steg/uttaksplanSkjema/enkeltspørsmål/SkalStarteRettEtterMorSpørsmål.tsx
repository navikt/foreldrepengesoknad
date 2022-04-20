import * as React from 'react';
import { useIntl } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import JaNeiSpørsmål from '../../../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

const SkalStarteRettEtterMorSpørsmål: React.FunctionComponent<UttaksplanSkjemaspørsmålProps> = ({ visible = true }) => {
    const intl = useIntl();
    return (
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
};

export default SkalStarteRettEtterMorSpørsmål;
