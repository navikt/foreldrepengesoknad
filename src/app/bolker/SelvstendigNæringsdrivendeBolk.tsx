import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import NæringstypeSpørsmål from './../spørsmål/NæringstypeSørsmål';

interface SelvstendigNæringsdrivendeBolkProps {}

type Props = SelvstendigNæringsdrivendeBolkProps & InjectedIntlProps;

class SelvstendigNæringsdrivendeBolk extends React.Component<Props, {}> {
    render() {
        return (
            <React.Fragment>
                Yo
                <NæringstypeSpørsmål næringstyper={[]} onChange={() => {}} />
            </React.Fragment>
        );
    }
}

export default injectIntl(SelvstendigNæringsdrivendeBolk);
