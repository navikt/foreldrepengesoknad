import { queryOptions, useQuery } from '@tanstack/react-query';
import { getStønadskontoParams } from 'api/getStønadskontoParams';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import { annenForelderHarNorskFnr, getAnnenPartVedtakParam } from 'utils/annenForelderUtils';

import { AnnenPartSak, Saker, Søkerinfo, Tidsperiode, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

export const API_URLS = {
    søkerInfo: `${import.meta.env.BASE_URL}/fpoversikt/api/person/info-med-arbeidsforhold`,
    saker: `${import.meta.env.BASE_URL}/fpoversikt/api/saker`,
    mellomlagring: `${import.meta.env.BASE_URL}/fpsoknad/api/storage/FORELDREPENGER`,
    annenPartVedtak: `${import.meta.env.BASE_URL}/fpoversikt/annenPartVedtak`,
    konto: `${import.meta.env.BASE_URL}/fpoversikt/konto`,
    trengerDokumentereMorsArbeid: `${import.meta.env.BASE_URL}/fpoversikt/trengerDokumentereMorsArbeid`,
    sendSøknad: `${import.meta.env.BASE_URL}/fpsoknad/foreldrepenger`,
    endreSøknad: `${import.meta.env.BASE_URL}/fpsoknad/foreldrepenger/endre`,
} as const;

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
    fødselsdato: string | undefined;
    termindato: string | undefined;
    omsorgsovertakelseDato: string | undefined;
    morHarUføretrygd: boolean;
    familieHendelseDatoNesteSak: Date | undefined;
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
