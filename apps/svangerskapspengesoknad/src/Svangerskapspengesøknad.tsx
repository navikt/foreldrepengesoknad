import { useQuery } from '@tanstack/react-query';
import { SvpDataContext } from 'appData/SvpDataContext';
import { SvpDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import isEqual from 'lodash/isEqual';
import { useIntl } from 'react-intl';

import { LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { RegisterdataUtdatert, Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, Spinner, SvangerskapspengesøknadRoutes } from './SvangerskapspengesøknadRoutes';
import { hentSakerOptions } from './api/queries';
import { IkkeKvinne } from './pages/ikke-kvinne/IkkeKvinne';

export const slettMellomlagringOgLastSidePåNytt = async () => {
    try {
        await ky.delete(`${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`);
    } catch {
        // Vi bryr oss ikke om feil her. Logges bare i backend
    }

    location.reload();
};

interface Props {
    locale: LocaleNo;
    onChangeLocale: any;
}

export const Svangerskapspengesøknad = ({ locale, onChangeLocale }: Props) => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const søkerinfo = useQuery({
        queryKey: ['SOKERINFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`).json<Søkerinfo>(),
    });

    const mellomlagretInfo = useQuery({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () =>
            ky.get(`${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`).json<SvpDataMapAndMetaData>(),
    });

    const sak = useQuery(hentSakerOptions());
    console.log(sak);

    if (søkerinfo.error || mellomlagretInfo.error) {
        return <ApiErrorHandler error={notEmpty(søkerinfo.error ?? mellomlagretInfo.error)} />;
    }

    if (!søkerinfo.data || mellomlagretInfo.isPending || sak.isPending) {
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

    const m = {
        version: mellomlagretState?.version ?? 1,
        locale: mellomlagretState?.locale ?? 'nb',
        søkerInfo: søkerinfo.data,
        ...sak.data,
    }; //TODO: temp

    return (
        <div>
            {!erPersonMyndig ? (
                <Umyndig appName="svangerskapspengesoknad" />
            ) : (
                <SvpDataContext initialState={m}>
                    <SvangerskapspengesøknadRoutes
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                        søkerInfo={søkerinfo.data}
                        mellomlagretData={m}
                    />
                </SvpDataContext>
            )}
        </div>
    );
};
