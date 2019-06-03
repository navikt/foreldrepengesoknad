import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import JaNeiSpørsmål from '../../../components/skjema/ja-nei-spørsmål/JaNeiSpørsmål';

interface OwnProps {
    navnAnnenForelder: string;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const HarAnnenForelderSøktForeldrepengerSpørsmål: React.StatelessComponent<Props> = ({
    visible,
    navnAnnenForelder,
    intl
}) => (
    <>
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <JaNeiSpørsmål
                    navn="harAnnenForelderSøktFP"
                    spørsmål={intl.formatMessage(
                        { id: 'spørsmål.harAnnenForelderSøktFP.label' },
                        { navnAnnenForelder }
                    )}
                    valgtVerdi={data.harAnnenForelderSøktFP}
                    onChange={(harAnnenForelderSøktFP) => onChange({ harAnnenForelderSøktFP })}
                />
            )}
        />
    </>
);

export default injectIntl(HarAnnenForelderSøktForeldrepengerSpørsmål);
