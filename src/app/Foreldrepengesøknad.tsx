import { Locale } from '@navikt/fp-common';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Api from './api/api';
import actionCreator from './context/action/actionCreator';
import { useForeldrepengesøknadContext } from './context/hooks/useForeldrepengesøknadContext';
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
    const { dispatch } = useForeldrepengesøknadContext();

    useEffect(() => {
        if (storageData) {
            dispatch(actionCreator.applyStoredState(storageData));
        }
    }, [storageData]);

    if (!søkerinfoData || !storageData) {
        return renderSpinner();
    }

    console.log(søkerinfoData);
    console.log(storageData);

    return (
        <Router>
            <ForeldrepengesøknadRoutes
                fornavn={søkerinfoData.søker.fornavn}
                kjønn={søkerinfoData.søker.kjønn}
                locale={locale}
                onChangeLocale={onChangeLocale}
                currentRoute={storageData.currentRoute}
            />
        </Router>
    );
};

export default Foreldrepengesøknad;
