import { useQuery } from '@tanstack/react-query';
import { SvpDataContext } from 'appData/SvpDataContext';
import { API_URLS, mellomlagretInfoOptions, søkerinfoOptions } from 'appData/queries';
import { VERSJON_MELLOMLAGRING } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import { useIntl } from 'react-intl';

import { erUmyndigFeil } from '@navikt/fp-app-shell';
import { SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { RegisterdataUtdatert, Spinner, Umyndig } from '@navikt/fp-ui';
import { erLikUansettRekkefølge, erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, SvangerskapspengesøknadRoutes } from './SvangerskapspengesøknadRoutes';
import { IkkeKvinne } from './pages/ikke-kvinne/IkkeKvinne';
import './styles/app.css';

export const slettMellomlagringOgLastSidePåNytt = async () => {
    try {
        await ky.delete(API_URLS.mellomlagring);
    } catch {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

export const Svangerskapspengesøknad = () => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'Svangerskapspengesøknad.pagetitle' }));

    const søkerinfo = useQuery(søkerinfoOptions());

    const mellomlagretInfo = useQuery(mellomlagretInfoOptions());

    if (erUmyndigFeil(søkerinfo.error)) {
        return <Umyndig appName="svangerskapspengesoknad" />;
    }

    if (søkerinfo.error || mellomlagretInfo.error) {
        return <ApiErrorHandler error={notEmpty(søkerinfo.error ?? mellomlagretInfo.error)} />;
    }

    if (!søkerinfo.data || mellomlagretInfo.isPending) {
        return <Spinner />;
    }

    const erPersonKvinne = søkerinfo.data.kjønn === 'K';

    if (!erPersonKvinne) {
        return <IkkeKvinne />;
    }

    const erPersonMyndig = erMyndig(søkerinfo.data.fødselsdato);

    const mellomlagretState =
        mellomlagretInfo.data?.version === VERSJON_MELLOMLAGRING ? mellomlagretInfo.data : undefined;

    // frilansoppdrag/selvstendigNæring kan mangle på lagret søkerInfo dersom mellomlagringa vart gjort
    // før desse felta fanst i kontrakten. Då fell vi tilbake på fersk data i staden for å be brukaren
    // starte på nytt berre fordi den lagra søknaden manglar felt ho aldri fekk moglegheit til å ha.
    const normalisertLagretSøkerInfo: SvpPersonopplysningerDto_fpoversikt | undefined = mellomlagretState && {
        ...mellomlagretState.søkerInfo,
        frilansoppdrag: mellomlagretState.søkerInfo.frilansoppdrag ?? søkerinfo.data.frilansoppdrag ?? [],
        selvstendigNæring: mellomlagretState.søkerInfo.selvstendigNæring ?? søkerinfo.data.selvstendigNæring ?? [],
    };

    if (normalisertLagretSøkerInfo && !erLikUansettRekkefølge(normalisertLagretSøkerInfo, søkerinfo.data)) {
        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="svangerskapspengesoknad"
                avvik="søkerInfo"
            />
        );
    }

    return (
        <div>
            {erPersonMyndig ? (
                <SvpDataContext initialState={mellomlagretState}>
                    <SvangerskapspengesøknadRoutes søkerInfo={søkerinfo.data} mellomlagretData={mellomlagretState} />
                </SvpDataContext>
            ) : (
                <Umyndig appName="svangerskapspengesoknad" />
            )}
        </div>
    );
};
