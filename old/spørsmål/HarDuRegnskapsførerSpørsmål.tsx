import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface HarDuRegnskapsførerSpørsmålProps {
    harRegnskapsfører?: boolean;
    onChange: (harDuRegnskapsfører: boolean) => void;
}

type Props = HarDuRegnskapsførerSpørsmålProps;

const HarDuRegnskapsførerSpørsmål = (props: Props) => {
    const { onChange, harRegnskapsfører } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harRegnskapsfører.spørsmål')}
            navn="harDuRegnskapsfører"
            valgtVerdi={harRegnskapsfører}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default HarDuRegnskapsførerSpørsmål;
