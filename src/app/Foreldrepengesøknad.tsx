import { Locale } from '@navikt/fp-common';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Api from './api/api';
import actionCreator from './context/action/actionCreator';
import { useForeldrepengesøknadContext } from './context/hooks/useForeldrepengesøknadContext';
import ForeldrepengesøknadRoutes from './routes/ForeldrepengesøknadRoutes';
import mapSøkerinfoDTOToSøkerinfo from './utils/mapSøkerinfoDTO';

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
    const { søkerinfoData } = Api.useSøkerinfo();
    const { storageData } = Api.useStoredAppState();
    const { sakerData } = Api.useGetSaker();
    const { dispatch, state } = useForeldrepengesøknadContext();

    useEffect(() => {
        if (storageData) {
            dispatch(actionCreator.applyStoredState(storageData));
        }
        if (søkerinfoData) {
            dispatch(actionCreator.setSøkerinfo(mapSøkerinfoDTOToSøkerinfo(søkerinfoData)));
        }

        if (sakerData) {
            dispatch(actionCreator.setSaker(sakerData));
        }
    }, [dispatch, storageData, søkerinfoData]);

    if (!state.søkerinfo || !storageData) {
        return renderSpinner();
    }

    return (
        <Router>
            <ForeldrepengesøknadRoutes
                fornavn={state.søkerinfo.person.fornavn}
                kjønn={state.søkerinfo.person.kjønn}
                locale={locale}
                onChangeLocale={onChangeLocale}
                currentRoute={storageData.currentRoute}
            />
        </Router>
    );
};

export default Foreldrepengesøknad;
