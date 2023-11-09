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
import { erMyndig, erKvinne } from '@navikt/fp-common';
import IkkeKvinne from './pages/ikke-kvinne/IkkeKvinne';
import { LocaleNo } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';

interface Props {
    locale: LocaleNo;
    onChangeLocale: any;
}

const renderSpinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

const Svangerskapspengesøknad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { dispatch, state } = useSvangerskapspengerContext();

    useEffect(() => {
        if (søkerinfoData !== undefined) {
            dispatch(actionCreator.setSøkerinfo(mapSøkerinfoDTOToSøkerinfo(søkerinfoData)));
        }
    }, [søkerinfoData, dispatch]);

    useEffect(() => {
        if (søkerinfoError) {
            sendErrorMessageToSentry(søkerinfoError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
    }, [søkerinfoError]);

    if (!state.søkerinfo || !søkerinfoData) {
        return renderSpinner();
    }

    const erPersonKvinne = erKvinne(søkerinfoData.søker.kjønn);

    if (!erPersonKvinne) {
        return <IkkeKvinne />;
    }

    const erPersonMyndig = erMyndig(søkerinfoData.søker.fødselsdato);
    return (
        <div>
            {!erPersonMyndig ? (
                <Umyndig appnavn="Svangerskapspenger" />
            ) : (
                <BrowserRouter>
                    <SvangerskapspengesøknadRoutes
                        currentRoute={SøknadRoutes.FORSIDE}
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                    />
                </BrowserRouter>
            )}
        </div>
    );
};

export default Svangerskapspengesøknad;
