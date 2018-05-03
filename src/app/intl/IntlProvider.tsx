import * as React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';

import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';

interface Props {
    language: string;
}

class IntlProvider extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        addLocaleData([...nb, ...nn]);
    }

    render() {
        const messages = this.props.language === 'nb' ? nbMessages : nnMessages;
        return (
            <Provider locale="nb" messages={messages || {}}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: any) => ({
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(IntlProvider);
