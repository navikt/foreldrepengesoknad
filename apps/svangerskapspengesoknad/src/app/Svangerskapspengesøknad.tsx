import { useRequest } from '@navikt/fp-api';
import { LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { Umyndig } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import { useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { SvpDataContext } from './appData/SvpDataContext';
import { SvpDataMapAndMetaData, VERSJON_MELLOMLAGRING } from './appData/useMellomlagreSøknad';
import IkkeKvinne from './pages/ikke-kvinne/IkkeKvinne';
import SvangerskapspengesøknadRoutes, { ApiErrorHandler, Spinner, svpApi } from './SvangerskapspengesøknadRoutes';

import './styles/app.css';

interface Props {
    locale: LocaleNo;
    onChangeLocale: any;
}

const Svangerskapspengesøknad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const { data: søkerinfoData, error: søkerinfoError } = useRequest<Søkerinfo>(svpApi, '/sokerinfo');

    const {
        data: mellomlagretData,
        loading: loadingMellomlagretData,
        error: errorMellomlagretData,
    } = useRequest<SvpDataMapAndMetaData>(svpApi, '/storage/svangerskapspenger');

    if (søkerinfoError || errorMellomlagretData) {
        return <ApiErrorHandler error={notEmpty(søkerinfoError || errorMellomlagretData)} />;
    }

    if (!søkerinfoData || loadingMellomlagretData) {
        return <Spinner />;
    }

    const erPersonKvinne = søkerinfoData.søker.kjønn === 'K';

    if (!erPersonKvinne) {
        return <IkkeKvinne />;
    }

    const erPersonMyndig = erMyndig(søkerinfoData.søker.fødselsdato);

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
                            søkerInfo={søkerinfoData}
                            mellomlagretData={mellomlagretState}
                        />
                    </SvpDataContext>
                </BrowserRouter>
            )}
        </div>
    );
};

export default Svangerskapspengesøknad;
