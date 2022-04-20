import { Locale } from '@navikt/fp-common';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Api from './api/api';
import actionCreator from './context/action/actionCreator';
import { useForeldrepengesøknadContext } from './context/hooks/useForeldrepengesøknadContext';
import ForeldrepengesøknadRoutes from './routes/ForeldrepengesøknadRoutes';
import SøknadRoutes from './routes/routes';
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
    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { storageData } = Api.useStoredAppState();
    const { sakerData } = Api.useGetSaker(søkerinfoData ? søkerinfoData.søker.fnr : undefined);
    const { dispatch, state } = useForeldrepengesøknadContext();

    useEffect(() => {
        if (storageData) {
            if (storageData.version === 4) {
                dispatch(actionCreator.applyStoredState(storageData));
            }
        }
        if (søkerinfoData) {
            dispatch(actionCreator.setSøkerinfo(mapSøkerinfoDTOToSøkerinfo(søkerinfoData)));
        }

        if (sakerData) {
            dispatch(actionCreator.setSaker(sakerData));
        }
    }, [dispatch, storageData, søkerinfoData, sakerData]);

    useEffect(() => {
        if (søkerinfoError) {
            throw new Error(
                'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.'
            );
        }
    }, [søkerinfoError]);

    if (!state.søkerinfo || !sakerData) {
        return renderSpinner();
    }

    return (
        <BrowserRouter>
            <ForeldrepengesøknadRoutes
                fornavn={state.søkerinfo.person.fornavn}
                locale={locale}
                onChangeLocale={onChangeLocale}
                currentRoute={storageData ? storageData.currentRoute : SøknadRoutes.VELKOMMEN}
            />
        </BrowserRouter>
    );
};

export default Foreldrepengesøknad;
