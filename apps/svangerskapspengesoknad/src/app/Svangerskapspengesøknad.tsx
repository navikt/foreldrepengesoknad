import { useEffect, useMemo, useState } from 'react';
import { Loader } from '@navikt/ds-react';
import { sendErrorMessageToSentry } from './utils/errorUtils';
import SvangerskapspengesøknadRoutes from './routes/SvangerskapspengesøknadRoutes';
import SøknadRoutes from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import Api from './api/api';
import mapSøkerinfoDTOToSøkerinfo from './utils/mapSøkerinfoDTO';
import './styles/app.css';
import { erMyndig, erKvinne, useDocumentTitle } from '@navikt/fp-common';
import IkkeKvinne from './pages/ikke-kvinne/IkkeKvinne';
import { Kvittering, LocaleNo } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';
import { useIntl } from 'react-intl';
import Environment from './Environment';
import { redirect } from '@navikt/fp-utils';

interface Props {
    locale: LocaleNo;
    onChangeLocale: any;
}

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

const Svangerskapspengesøknad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));
    const [kvittering, setKvittering] = useState<Kvittering>();

    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();

    useEffect(() => {
        if (søkerinfoError) {
            sendErrorMessageToSentry(søkerinfoError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
    }, [søkerinfoError]);

    const søkerInfo = useMemo(
        () => (søkerinfoData ? mapSøkerinfoDTOToSøkerinfo(søkerinfoData) : undefined),
        [søkerinfoData],
    );

    if (kvittering) {
        if (Environment.INNSYN) {
            redirect(
                kvittering.saksNr
                    ? `${Environment.INNSYN}/sak/${kvittering.saksNr}/redirectFromSoknad`
                    : `${Environment.INNSYN}/redirectFromSoknad`,
            );
            return <Spinner />;
        }
        return <div>Redirected to Innsyn</div>;
    }

    if (!søkerInfo) {
        return <Spinner />;
    }

    const erPersonKvinne = erKvinne(søkerInfo.person.kjønn);

    if (!erPersonKvinne) {
        return <IkkeKvinne />;
    }

    const erPersonMyndig = erMyndig(søkerInfo.person.fødselsdato);
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
                        søkerInfo={søkerInfo}
                        setKvittering={setKvittering}
                    />
                </BrowserRouter>
            )}
        </div>
    );
};

export default Svangerskapspengesøknad;
