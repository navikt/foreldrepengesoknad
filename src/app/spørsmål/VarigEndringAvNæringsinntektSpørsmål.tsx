import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface VarigEndringAvNæringsinntektSpørsmålProps {
    varigEndringAvNæringsinntekt?: boolean;
    onChange: (varigEndringAvNæringsinntekt: boolean) => void;
}

type Props = VarigEndringAvNæringsinntektSpørsmålProps;

const VarigEndringAvNæringsinntektSpørsmål = (props: Props) => {
    const { onChange, varigEndringAvNæringsinntekt } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'varigEndringAvNæringsinntekt.spørsmål')}
            navn="varigEndringAvNæringsinntekt"
            valgtVerdi={varigEndringAvNæringsinntekt}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default VarigEndringAvNæringsinntektSpørsmål;
