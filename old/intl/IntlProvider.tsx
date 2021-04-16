import * as React from 'react';
import { connect } from 'react-redux';
import { IntlProvider as Provider } from 'react-intl';
import moment from 'moment';

import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';
import nnMessagesCommon from '../../common/intl/nn_NO.json';
import nbMessagesCommon from '../../common/intl/nb_NO.json';
import { AppState } from '../redux/reducers';
import { Språkkode } from 'common/intl/types';

interface StateProps {
    språkkode: Språkkode;
}

interface OwnProps {
    children: React.ReactNode;
}

type Props = OwnProps & StateProps;

moment.locale('nb');

class IntlProvider extends React.Component<Props> {
    constructor(props: Props) {
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

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.språkkode,
});

export default connect(mapStateToProps)(IntlProvider);
