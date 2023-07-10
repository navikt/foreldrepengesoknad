import { useEffect } from 'react';
import { useSvangerskapspengerContext } from './context/hooks/useSvangerskapspengerContext';
import { Loader } from '@navikt/ds-react';
import actionCreator from './context/action/actionCreator';
import { sendErrorMessageToSentry } from './utils/errorUtils';
import SvangerskapspengesøknadRoutes from './routes/SvangerskapspengesøknadRoutes';
import SøknadRoutes from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import Api from './api/api';
import mapSøkerinfoDTOToSøkerinfo from './utils/mapSøkerinfoDTO';
import './styles/app.css';

const renderSpinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

const Svangerskapspengesøknad = () => {
    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { dispatch } = useSvangerskapspengerContext();

    useEffect(() => {
        if (søkerinfoData !== undefined) {
            dispatch(actionCreator.setSøkerinfo(mapSøkerinfoDTOToSøkerinfo(søkerinfoData)));
        }
    }, [søkerinfoData]);

    useEffect(() => {
        if (søkerinfoError) {
            sendErrorMessageToSentry(søkerinfoError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`
            );
        }
    }, [søkerinfoError]);

    if (søkerinfoData === undefined) {
        return renderSpinner();
    }
    return (
        <div>
            <BrowserRouter>
                <SvangerskapspengesøknadRoutes currentRoute={SøknadRoutes.FORSIDE} />
            </BrowserRouter>
        </div>
    );
};

export default Svangerskapspengesøknad;
