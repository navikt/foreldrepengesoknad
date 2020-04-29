import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

export enum MorForSyk {
    'FOR_SYK' = 'forSyk',
    'IKKE_FOR_SYK' = 'ikkeForSyk',
}

interface MorForSykSpørsmålProps {
    erMorForSyk?: boolean;
    onChange: (erBarnetFødt: boolean) => void;
}

type Props = MorForSykSpørsmålProps;

const MorForSykSpørsmål = (props: Props) => {
    const { onChange, erMorForSyk } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'morForSykSpørsmål.spørsmål')}
            navn="morForSykSpørsmål"
            valgtVerdi={erMorForSyk}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default MorForSykSpørsmål;
