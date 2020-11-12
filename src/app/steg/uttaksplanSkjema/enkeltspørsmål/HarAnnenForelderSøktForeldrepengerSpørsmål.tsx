import * as React from 'react';
import { useIntl } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import JaNeiSpørsmål from '../../../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface OwnProps {
    navnAnnenForelder: string;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps;

const HarAnnenForelderSøktForeldrepengerSpørsmål: React.FunctionComponent<Props> = ({ visible, navnAnnenForelder }) => {
    const intl = useIntl();
    return (
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
};

export default HarAnnenForelderSøktForeldrepengerSpørsmål;
