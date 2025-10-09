import { useQuery } from '@tanstack/react-query';
import { SvpDataContext } from 'appData/SvpDataContext';
import { API_URLS, mellomlagretInfoOptions, søkerinfoOptions } from 'appData/queries';
import { VERSJON_MELLOMLAGRING } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { useIntl } from 'react-intl';

import { RegisterdataUtdatert, Spinner, Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
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
    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const søkerinfo = useQuery(søkerinfoOptions());

    const mellomlagretInfo = useQuery(mellomlagretInfoOptions());

    if (søkerinfo.error || mellomlagretInfo.error) {
        return <ApiErrorHandler error={notEmpty(søkerinfo.error ?? mellomlagretInfo.error)} />;
    }

    if (!søkerinfo.data || mellomlagretInfo.isPending) {
        return <Spinner />;
    }

    const erPersonKvinne = søkerinfo.data.søker.kjønn === 'K';

    if (!erPersonKvinne) {
        return <IkkeKvinne />;
    }

    const erPersonMyndig = erMyndig(søkerinfo.data.søker.fødselsdato);

    const mellomlagretState =
        mellomlagretInfo.data?.version === VERSJON_MELLOMLAGRING ? mellomlagretInfo.data : undefined;

    if (mellomlagretState && !isEqual(mellomlagretState.søkerInfo, søkerinfo.data)) {
        return (
            <RegisterdataUtdatert
                slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt}
                appName="svangerskapspengesoknad"
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
