import { Locale } from '@navikt/fp-common';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
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
    const { søkerinfoData } = Api.getSøkerinfo();
    const { storageData } = Api.getStoredAppState();

    if (!søkerinfoData || !storageData) {
        return renderSpinner();
    }

    console.log(søkerinfoData);
    console.log(storageData);

    return (
        <ForeldrepengesøknadRoutes
            fornavn={søkerinfoData.søker.fornavn}
            kjønn={søkerinfoData.søker.kjønn}
            locale={locale}
            onChangeLocale={onChangeLocale}
        />
    );
};

export default Foreldrepengesøknad;
