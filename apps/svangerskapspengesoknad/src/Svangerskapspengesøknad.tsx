import { useQuery } from '@tanstack/react-query';
import { ContextDataMap, SvpDataContext } from 'appData/SvpDataContext';
import { SvpDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import { useIntl } from 'react-intl';
import { AvtaltFeriePerArbeidsgiver } from 'types/AvtaltFerie';
import { Barn } from 'types/Barn';
import {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    TilOgMedDatoType,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';
import { tilSkjematilstandFraEksisterendeSak } from 'utils/endresøknadUtils';

import { ArbeidsforholdOgInntektSvp, LocaleNo, Saker, Søkerinfo } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, Spinner, SvangerskapspengesøknadRoutes } from './SvangerskapspengesøknadRoutes';
import { IkkeKvinne } from './pages/ikke-kvinne/IkkeKvinne';

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

    const sak = useQuery({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`).json<Saker>(),
        select: (saker) => {
            const svpSak = saker.svangerskapspenger[0]; //TODO: gal antagelse om bare 1 sak
            if (!svpSak) {
                return undefined;
            }

            return tilSkjematilstandFraEksisterendeSak(svpSak);
        },
    });
    console.log(sak);

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

    const m = {
        version: mellomlagretState?.version ?? 1,
        locale: mellomlagretState?.locale ?? 'nb',
        ...sak.data,
    }; //TODO: temp

    return (
        <div>
            {!erPersonMyndig ? (
                <Umyndig appnavn="Svangerskapspenger" />
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
