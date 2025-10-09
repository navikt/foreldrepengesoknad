import { queryOptions, useQuery } from '@tanstack/react-query';
import { getStønadskontoParams } from 'api/getStønadskontoParams';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import { annenForelderHarNorskFnr, getAnnenPartVedtakParam } from 'utils/annenForelderUtils';

import { AnnenPartSak, Saker, Søkerinfo, Tidsperiode, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/rest/sokerinfo`,
    saker: `${urlPrefiks}/rest/innsyn/v2/saker`,
    mellomlagring: `${urlPrefiks}/rest/storage/foreldrepenger`,
    annenPartVedtak: `${urlPrefiks}/rest/innsyn/v2/annenPartVedtak`,
    konto: `${urlPrefiks}/rest/konto`,
    trengerDokumentereMorsArbeid: `${urlPrefiks}/rest/innsyn/v2/trengerDokumentereMorsArbeid`,

    status: `${urlPrefiks}/fpsoknad/api/soknad/status`,
    sendSøknad: `${urlPrefiks}/fpsoknad/api/soknad/foreldrepenger`,
    endreSøknad: `${urlPrefiks}/fpsoknad/api/soknad/foreldrepenger/endre`,
    sendVedlegg: `${urlPrefiks}/fpsoknad/api/storage/foreldrepenger/vedlegg`,
} as const;

export const statusOptions = () =>
    queryOptions({
        queryKey: ['STATUS'],
        queryFn: () =>
            ky.get(API_URLS.status).json<{ status: 'PENDING' | 'MIDLERTIDIG' | 'ENDELIG'; saksnummer?: number }>(),
        staleTime: Infinity,
    });

export const sakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(API_URLS.saker).json<Saker>(),
        staleTime: Infinity,
    });

export const søkerinfoOptions = () =>
    queryOptions({
        queryKey: ['SØKERINFO'],
        queryFn: () => ky.get(API_URLS.søkerInfo, { timeout: 30000 }).json<Søkerinfo>(),
        staleTime: Infinity,
    });

export const mellomlagretInfoOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(API_URLS.mellomlagring).json<FpMellomlagretData>(),
        staleTime: Infinity,
    });

export const annenPartVedtakOptions = (data?: AnnenPartVedtakParams) =>
    queryOptions({
        queryKey: ['ANNEN_PART_VEDTAK', data],
        queryFn: async () => {
            const vedtakEllerTomStrengForIngenVedtak = await ky
                .post(API_URLS.annenPartVedtak, { json: data })
                .json<AnnenPartSak | ''>();
            if (vedtakEllerTomStrengForIngenVedtak === '') {
                return null;
            }

            return vedtakEllerTomStrengForIngenVedtak;
        },
        /**
         * Denne selected ser snodig ut. Men poenget er at QueryCachen liker ikke at data er undefined.
         * Derfor lagres den som null i cache. Men i bruk i koden ønsker vi ikke deale med både null og undefined.
         */
        select: (vedtak) => {
            if (vedtak === null) {
                return undefined;
            }
            return vedtak;
        },
    });

// TODO: relocate types
type AnnenPartVedtakParams = {
    annenPartFødselsnummer?: string;
    barnFødselsnummer?: string;
    familiehendelse: string;
};

type StønadskontoParams = {
    rettighetstype: string;
    brukerrolle: string;
    antallBarn: string;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelseDato?: string;
    morHarUføretrygd: boolean;
    familieHendelseDatoNesteSak?: Date;
};

export type DokumentereMorsArbeidParams = {
    annenPartFødselsnummer: string;
    barnFødselsnummer?: string;
    familiehendelse: string;
    perioder: Array<Tidsperiode & { periodeType: 'UTSETTELSE' | 'UTTAK' }>;
};

export const tilgjengeligeStønadskontoerOptions = (data: StønadskontoParams) =>
    queryOptions({
        queryKey: ['TILGJENGELIGE_STONADSKONTOER', data],
        queryFn: () => ky.post(API_URLS.konto, { json: data }).json<TilgjengeligeStønadskontoer>(),
        staleTime: Infinity,
    });

export const trengerDokumentereMorsArbeidOptions = (data: DokumentereMorsArbeidParams) =>
    queryOptions({
        queryKey: ['TRENGER_DOKUMENTERER_MORS_ARBEID', data],
        queryFn: () => ky.post(API_URLS.trengerDokumentereMorsArbeid, { json: data }).json<boolean>(),
    });

export const useStønadsKontoerOptions = () => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);

    const annenPartOptions = useAnnenPartVedtakOptions();
    const annenPartVedtakQuery = useQuery(annenPartOptions);

    const stønadskontoParams = getStønadskontoParams({
        barn,
        annenForelder,
        søkersituasjon,
        barnFraNesteSak,
        annenPartsVedtak: annenPartVedtakQuery.data,
        eksisterendeSak,
    });

    return tilgjengeligeStønadskontoerOptions(stønadskontoParams);
};

export const useAnnenPartVedtakOptions = () => {
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);
    const barn = useContextGetData(ContextDataType.OM_BARNET);

    const enabled = !!annenForelder && !!barn && annenForelderHarNorskFnr(annenForelder);
    return queryOptions({
        ...annenPartVedtakOptions(enabled ? getAnnenPartVedtakParam(annenForelder, barn) : undefined),
        enabled,
    });
};
