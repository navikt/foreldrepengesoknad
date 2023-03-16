import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import moment from 'moment';
import { Språkkode } from './types';
import nnMessages from './messages/nn_NO.json';
import nbMessages from './messages/nb_NO.json';
import enMessages from './messages/en_US.json';
import { allCommonMessages } from '@navikt/fp-common';

interface Props {
    språkkode: Språkkode;
    children: React.ReactNode;
}

moment.locale('nb');

const getLanguageMessages = (språkkode: Språkkode) => {
    if (språkkode === 'nb') {
        return { ...nbMessages, ...allCommonMessages.nb };
    } else if (språkkode === 'nn') {
        return { ...nnMessages, ...allCommonMessages.nn };
    } else {
        return { ...enMessages, ...allCommonMessages.en };
    }
};

const IntlProvider: React.FunctionComponent<Props> = ({ språkkode, children }) => {
    return (
        <Provider locale={språkkode} messages={getLanguageMessages(språkkode) || {}}>
            {children}
        </Provider>
    );
};
export default IntlProvider;
