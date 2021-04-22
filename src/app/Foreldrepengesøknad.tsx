import { Locale } from '@navikt/fp-common';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import useSWR from 'swr';
import Api from './api/api';
import ForeldrepengesøknadRoutes from './routes/ForeldrepengesøknadRoutes';

interface Props {
    locale: Locale;
    onChangeLocale: any;
}

const renderSpinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <NavFrontendSpinner type="XXL" />
    </div>
);

const Foreldrepengesøknad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { data } = useSWR('/sokerinfo', (url) => Api.getSøkerinfo(url));

    if (!data) {
        return renderSpinner();
    }

    console.log(data);

    return (
        <ForeldrepengesøknadRoutes
            fornavn={data.søker.fornavn}
            kjønn={data.søker.kjønn}
            locale={locale}
            onChangeLocale={onChangeLocale}
        />
    );
};

export default Foreldrepengesøknad;
