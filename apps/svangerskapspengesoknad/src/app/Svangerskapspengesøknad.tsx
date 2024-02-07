import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { erMyndig, erKvinne, useDocumentTitle } from '@navikt/fp-common';
import { LocaleNo } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';
import { useRequest } from '@navikt/fp-api';
import { notEmpty } from '@navikt/fp-validation';
import IkkeKvinne from './pages/ikke-kvinne/IkkeKvinne';
import SvangerskapspengesøknadRoutes, {
    ApiErrorHandler,
    Spinner,
    svpApi,
} from './routes/SvangerskapspengesøknadRoutes';
import { SvpDataContext } from './context/SvpDataContext';
import mapSøkerinfoDTOToSøkerinfo from './utils/mapSøkerinfoDTO';
import { SvpDataMapAndMetaData, VERSJON_MELLOMLAGRING } from './context/useMellomlagreSøknad';
import { SøkerinfoDTO } from './types/SøkerinfoDTO';

import './styles/app.css';

interface Props {
    locale: LocaleNo;
    onChangeLocale: any;
}

const Svangerskapspengesøknad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const { data: søkerinfoData, error: søkerinfoError } = useRequest<SøkerinfoDTO>(svpApi, '/sokerinfo');

    const {
        data: mellomlagretData,
        loading: loadingMellomlagretData,
        error: errorMellomlagretData,
    } = useRequest<SvpDataMapAndMetaData>(svpApi, '/storage/svangerskapspenger');

    const søkerInfo = useMemo(
        () => (søkerinfoData ? mapSøkerinfoDTOToSøkerinfo(søkerinfoData) : undefined),
        [søkerinfoData],
    );

    if (søkerinfoError || errorMellomlagretData) {
        return <ApiErrorHandler error={notEmpty(søkerinfoError || errorMellomlagretData)} />;
    }

    if (!søkerInfo || loadingMellomlagretData) {
        return <Spinner />;
    }

    const erPersonKvinne = erKvinne(søkerInfo.person.kjønn);

    if (!erPersonKvinne) {
        return <IkkeKvinne />;
    }

    const erPersonMyndig = erMyndig(søkerInfo.person.fødselsdato);

    const mellomlagretState = mellomlagretData?.version === VERSJON_MELLOMLAGRING ? mellomlagretData : undefined;

    return (
        <div>
            {!erPersonMyndig ? (
                <Umyndig appnavn="Svangerskapspenger" />
            ) : (
                <BrowserRouter>
                    <SvpDataContext initialState={mellomlagretState}>
                        <SvangerskapspengesøknadRoutes
                            locale={locale}
                            onChangeLocale={onChangeLocale}
                            søkerInfo={søkerInfo}
                            mellomlagretData={mellomlagretState}
                        />
                    </SvpDataContext>
                </BrowserRouter>
            )}
        </div>
    );
};

export default Svangerskapspengesøknad;
