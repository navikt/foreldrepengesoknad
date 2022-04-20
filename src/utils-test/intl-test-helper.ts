import { createIntl, createIntlCache } from 'react-intl';
import messages from 'app/intl/nb_NO.json';

// Create the IntlProvider to retrieve context for wrapping around.
const cache = createIntlCache();

const getIntlMock = () => {
    return createIntl(
        {
            locale: 'nb',
            defaultLocale: 'nb',
            messages,
        },
        cache
    );
};

export default getIntlMock;
