import { useEffect } from 'react';
import { useSvangerskapspengesøknadContext } from './context/hooks/useSvangerskapspengesøknadContext';
import { Loader } from '@navikt/ds-react';
// import actionCreator from './context/action/actionCreator';
import { sendErrorMessageToSentry } from './utils/errorUtils';
// import SvangerskapspengesøknadRoutes from './routes/SvangerskapspengesøknadRoutes';
// import SøknadRoutes from './routes/routes';
// import { BrowserRouter } from 'react-router-dom';
import Api from './api/api';
// import mapSøkerinfoDTOToSøkerinfo from './utils/mapSøkerinfoDTO';

const renderSpinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

const Svangerskapspengesøknad = () => {
    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { dispatch, state } = useSvangerskapspengesøknadContext();

    useEffect(() => {
        if (søkerinfoData !== undefined) {
            console.log('DATA:', søkerinfoData);
            console.log('dispatch, state: ', dispatch, state);
            // dispatch(actionCreator.setSøkerinfo(mapSøkerinfoDTOToSøkerinfo(søkerinfoData)));
        }
    }, [søkerinfoData]);
    // console.log(state);
    if (søkerinfoData === undefined) {
        return renderSpinner();
    }
    useEffect(() => {
        if (søkerinfoError) {
            sendErrorMessageToSentry(søkerinfoError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`
            );
        }
    }, [søkerinfoError]);

    return (
        <div>
            <p>Hei</p>
            {/* <BrowserRouter>
                <SvangerskapspengesøknadRoutes currentRoute={SøknadRoutes.VELKOMMEN} />
            </BrowserRouter> */}
        </div>
    );
};

export default Svangerskapspengesøknad;
