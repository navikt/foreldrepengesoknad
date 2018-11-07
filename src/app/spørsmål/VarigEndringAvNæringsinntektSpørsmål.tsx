import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface VarigEndringAvNæringsinntektSpørsmålProps {
    varigEndringAvNæringsinntekt?: boolean;
    onChange: (varigEndringAvNæringsinntekt: boolean) => void;
}

type Props = VarigEndringAvNæringsinntektSpørsmålProps & InjectedIntlProps;

const VarigEndringAvNæringsinntektSpørsmål = (props: Props) => {
    const { onChange, varigEndringAvNæringsinntekt, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'varigEndringAvNæringsinntekt.spørsmål')}
            navn="varigEndringAvNæringsinntekt"
            valgtVerdi={varigEndringAvNæringsinntekt}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(VarigEndringAvNæringsinntektSpørsmål);
