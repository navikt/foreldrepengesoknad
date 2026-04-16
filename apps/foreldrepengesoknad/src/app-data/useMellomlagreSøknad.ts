import { API_URLS } from 'api/queries';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EksisterendeSak } from 'types/EksisterendeSak';
import { Fordeling } from 'types/Fordeling';
import { Søknad } from 'types/Søknad';
import { VERSJON_MELLOMLAGRING } from 'utils/mellomlagringUtils';

import { captureMessage } from '@navikt/fp-observability';
import {
    FpPersonopplysningerDto_fpoversikt,
    FpSak_fpoversikt,
    ProblemDetails,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './FpDataContext';
import { SøknadRoutes } from './routes';

export interface FpMellomlagretData {
    version: number;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    foreldrepengerSaker: FpSak_fpoversikt[];
    currentRoute: SøknadRoutes;
    søknad?: Partial<Søknad>;
    antallUkerIUttaksplan?: number;
    harUttaksplanBlittSlettet?: boolean;
    søknadGjelderEtNyttBarn?: boolean;
    fordeling?: Fordeling;
    eksisterendeSak?: EksisterendeSak;
    annenPartsUttakErLagtTilIPlan?: boolean;
    uttaksplanNy?: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    valgtEksisterendeSaksnr?: string;
}

const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

const getDataForMellomlagring = (
    foreldrepengerSaker: FpSak_fpoversikt[],
    søkerInfo: FpPersonopplysningerDto_fpoversikt,
    getDataFromState: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    erEndringssøknad: boolean,
    harGodkjentVilkår: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const currentRoute = notEmpty(getDataFromState(ContextDataType.APP_ROUTE));

    const søkersituasjon = getDataFromState(ContextDataType.SØKERSITUASJON);
    const barn = getDataFromState(ContextDataType.OM_BARNET);
    const annenForelder = getDataFromState(ContextDataType.ANNEN_FORELDER);
    const arbeidsforholdOgInntekt = getDataFromState(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const frilans = getDataFromState(ContextDataType.FRILANS);
    const egenNæring = getDataFromState(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = getDataFromState(ContextDataType.ANDRE_INNTEKTSKILDER);
    const utenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD);
    const senereUtenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const fordeling = getDataFromState(ContextDataType.FORDELING);
    const dekningsgrad = getDataFromState(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const vedlegg = getDataFromState(ContextDataType.VEDLEGG);
    const uttaksplanNy = getDataFromState(ContextDataType.UTTAKSPLAN);
    const ønskerJustertUttakVedFødsel = getDataFromState(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const valgtEksisterendeSaksnr = getDataFromState(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    // TODO (TOR) Dropp mapping her og lagre context rått
    const dataSomSkalMellomlagres = {
        version: VERSJON_MELLOMLAGRING,
        foreldrepengerSaker,
        søkerInfo,
        currentRoute,
        søknadGjelderEtNyttBarn,
        søknad: {
            harGodkjentVilkår,
            søkersituasjon,
            barn,
            annenForelder,
            arbeidsforholdOgInntekt,
            frilans,
            egenNæring,
            andreInntektskilder,
            utenlandsopphold,
            utenlandsoppholdNeste12Mnd: senereUtenlandsopphold,
            utenlandsoppholdSiste12Mnd: tidligereUtenlandsopphold,
            erEndringssøknad,
            dekningsgrad,
            vedlegg,
            ønskerJustertUttakVedFødsel,
        },
        fordeling,
        uttaksplanNy,
        valgtEksisterendeSaksnr,
    } satisfies FpMellomlagretData;

    return dataSomSkalMellomlagres;
};

export const useMellomlagreSøknad = (
    foreldrepengerSaker: FpSak_fpoversikt[],
    søkerInfo: FpPersonopplysningerDto_fpoversikt,
    erEndringssøknad: boolean,
    harGodkjentVilkår: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const navigate = useNavigate();
    const getDataFromState = useContextGetAnyData();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>(null);

    useEffect(() => {
        if (skalMellomlagre) {
            const currentRoute = notEmpty(getDataFromState(ContextDataType.APP_ROUTE));

            const lagre = async () => {
                setSkalMellomlagre(false);

                void navigate(currentRoute);

                const data = getDataForMellomlagring(
                    foreldrepengerSaker,
                    søkerInfo,
                    getDataFromState,
                    erEndringssøknad,
                    harGodkjentVilkår,
                    søknadGjelderEtNyttBarn,
                );

                try {
                    await ky.post(API_URLS.mellomlagring, {
                        json: data,
                        headers: {
                            fnr: søkerInfo.fnr,
                        },
                    });
                } catch (error: unknown) {
                    if (error instanceof HTTPError) {
                        if (error.response.status === 401 || error.response.status === 403) {
                            throw error;
                        }

                        const jsonResponse = await error.response.json<ProblemDetails>();
                        const callId = jsonResponse?.callId ?? UKJENT_UUID;
                        captureMessage(FEIL_VED_INNSENDING + callId);
                        throw new Error(FEIL_VED_INNSENDING + callId.substring(0, 6), { cause: error });
                    }
                    if (error instanceof Error) {
                        throw error;
                    }
                    throw new Error(String(error), { cause: error });
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagre().catch((error) => {
                //Logg feil, men ikkje vis feilmelding til brukar
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                captureMessage(error.message);

                if (promiseRef.current) {
                    promiseRef.current();
                }
            });
        }
    }, [skalMellomlagre]);

    const mellomlagreSøknadOgNaviger = useCallback(() => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setSkalMellomlagre(true);

        const promise = new Promise<void>((resolve) => {
            promiseRef.current = resolve;
        });

        return promise;
    }, []);

    return mellomlagreSøknadOgNaviger;
};
