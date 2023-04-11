/* eslint-disable */

import React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { Språkkode } from 'common/intl/types';
import { State } from 'app/redux/store';
import nbMessages from './nb_NO.json';
import nbMessagesCommon from '../../common/intl/nb_NO.json';
import nnMessages from './nn_NO.json';
import nnMessagesCommon from '../../common/intl/nn_NO.json';

interface StateProps {
    språkkode: Språkkode;
}

moment.locale('nb');

class IntlProvider extends React.Component<any, StateProps> {
    constructor(props: StateProps) {
        super(props);
    }

    render() {
        const messages =
            this.props.språkkode === 'nb'
                ? {
                      ...nbMessages,
                      ...nbMessagesCommon,
                  }
                : {
                      ...nnMessages,
                      ...nnMessagesCommon,
                  };
        return (
            <Provider key={this.props.språkkode} locale={this.props.språkkode} messages={messages || {}}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: State): StateProps => ({
    språkkode: state.common.språkkode,
});

// @ts-ignore Fiks
export default connect(mapStateToProps)(IntlProvider);
