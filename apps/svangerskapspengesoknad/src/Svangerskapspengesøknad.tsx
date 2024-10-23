import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { useIntl } from 'react-intl';

import { LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import SvangerskapspengesøknadRoutes, { ApiErrorHandler, Spinner } from './SvangerskapspengesøknadRoutes';
import { SvpDataContext } from './app-data/SvpDataContext';
import { SvpDataMapAndMetaData, VERSJON_MELLOMLAGRING } from './app-data/useMellomlagreSøknad';
import IkkeKvinne from './pages/ikke-kvinne/IkkeKvinne';
import './styles/app.css';

interface Props {
    locale: LocaleNo;
    onChangeLocale: any;
}

const Svangerskapspengesøknad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
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

    if (søkerinfo.error || mellomlagretInfo.error) {
        return <ApiErrorHandler error={notEmpty(søkerinfo.error || mellomlagretInfo.error)} />;
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

    return (
        <div>
            {!erPersonMyndig ? (
                <Umyndig appnavn="Svangerskapspenger" />
            ) : (
                <SvpDataContext initialState={mellomlagretState}>
                    <SvangerskapspengesøknadRoutes
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                        søkerInfo={søkerinfo.data}
                        mellomlagretData={mellomlagretState}
                    />
                </SvpDataContext>
            )}
        </div>
    );
};

export default Svangerskapspengesøknad;
