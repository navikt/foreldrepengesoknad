import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface BarnFødtBolkProps {
    adoptertIUtlandet?: boolean;
    onChange: (fødtIUtlandet: boolean) => void;
}

type Props = BarnFødtBolkProps;

const AdoptertIUtlandetSpørsmål = (props: Props) => {
    const { onChange, adoptertIUtlandet } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'adoptertIUtlandet.spørsmål')}
            navn="adoptertIUtlandet"
            valgtVerdi={adoptertIUtlandet}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default AdoptertIUtlandetSpørsmål;
