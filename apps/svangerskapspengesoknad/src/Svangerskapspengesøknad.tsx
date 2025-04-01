import { useQuery } from '@tanstack/react-query';
import { ContextDataMap, SvpDataContext } from 'appData/SvpDataContext';
import { SvpDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import { useIntl } from 'react-intl';
import { AvtaltFeriePerArbeidsgiver } from 'types/AvtaltFerie';
import { Barn } from 'types/Barn';

import { LocaleNo, Saker, Søkerinfo } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, Spinner, SvangerskapspengesøknadRoutes } from './SvangerskapspengesøknadRoutes';
import { IkkeKvinne } from './pages/ikke-kvinne/IkkeKvinne';
import './styles/app.css';

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

            const barnet = {
                erBarnetFødt: svpSak.familiehendelse.antallBarn > 0,
                fødselsdato: svpSak.familiehendelse.fødselsdato,
                termindato: svpSak.familiehendelse.termindato!, //TODO: denne skal vel alltid være satt?
            } satisfies Barn;

            const valgteArbeidsforhold = svpSak.gjeldendeVedtak?.arbeidsforhold
                .map((a) => a.aktivitet.arbeidsgiver?.id)
                .filter((s) => s !== undefined);

            const ferie = {} satisfies AvtaltFeriePerArbeidsgiver;

            return { OM_BARNET: barnet, VALGTE_ARBEIDSFORHOLD: valgteArbeidsforhold } satisfies ContextDataMap;
        },
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
