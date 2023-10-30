import { IntlProvider as Provider } from 'react-intl';
import { allCommonMessages } from '@navikt/fp-common';
import { Språkkode } from './types';
import nnMessages from './messages/nn_NO.json';
import nbMessages from './messages/nb_NO.json';

interface Props {
    språkkode: Språkkode;
    children: React.ReactNode;
}

const getLanguageMessages = (språkkode: Språkkode) => {
    if (språkkode === 'nb') {
        return { ...nbMessages, ...allCommonMessages.nb };
    } else {
        return { ...nnMessages, ...allCommonMessages.nn };
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
