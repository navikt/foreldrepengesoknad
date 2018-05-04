import * as React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';

import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';
import { AppState } from '../redux/reducers';
import { Språkkode } from './types';

interface StateProps {
    språkkode: Språkkode;
}

class IntlProvider extends React.Component<StateProps> {
    constructor(props: StateProps) {
        super(props);
        addLocaleData([...nb, ...nn]);
    }

    render() {
        const messages =
            this.props.språkkode === 'nb' ? nbMessages : nnMessages;
        return (
            <Provider locale="nb" messages={messages || {}}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.språkkode
});

export default connect(mapStateToProps)(IntlProvider);
