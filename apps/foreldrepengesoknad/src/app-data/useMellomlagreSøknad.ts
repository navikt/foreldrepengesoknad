import * as Sentry from '@sentry/browser';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fordeling from 'types/Fordeling';
import { Søknad } from 'types/Søknad';
import { MELLOMLAGRET_VERSJON } from 'utils/mellomlagringUtils';

import { BarnFraNesteSak, EksisterendeSak, Periode } from '@navikt/fp-common';
import { LocaleNo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import Environment from '../Environment';
import { ContextDataMap, ContextDataType, useContextGetAnyData } from './FpDataContext';
import SøknadRoutes from './routes';

export interface FpMellomlagretData {
    version: number;
    locale: LocaleNo;
    currentRoute: SøknadRoutes;
    søknad?: Partial<Søknad>;
    antallUkerIUttaksplan?: number;
    perioderSomSkalSendesInn?: Periode[];
    harUttaksplanBlittSlettet?: boolean;
    søknadGjelderEtNyttBarn?: boolean;
    fordeling?: Fordeling;
    eksisterendeSak?: EksisterendeSak;
    endringstidspunkt?: Date;
    barnFraNesteSak?: BarnFraNesteSak;
    annenPartsUttakErLagtTilIPlan?: boolean;
}

const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

const getDataForMellomlagring = (
    locale: LocaleNo,
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
    const uttaksplanMetadata = getDataFromState(ContextDataType.UTTAKSPLAN_METADATA);
    const barnFraNesteSak = getDataFromState(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = getDataFromState(ContextDataType.EKSISTERENDE_SAK);
    const uttaksplan = getDataFromState(ContextDataType.UTTAKSPLAN);
    const fordeling = getDataFromState(ContextDataType.FORDELING);
    const dekningsgrad = getDataFromState(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const vedlegg = getDataFromState(ContextDataType.VEDLEGG);

    // TODO (TOR) Dropp mapping her og lagre context rått
    const dataSomSkalMellomlagres = {
        version: MELLOMLAGRET_VERSJON,
        locale,
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
            uttaksplan,
            vedlegg,
            ønskerJustertUttakVedFødsel: uttaksplanMetadata?.ønskerJustertUttakVedFødsel,
        },
        eksisterendeSak,
        barnFraNesteSak,
        fordeling,
        endringstidspunkt: uttaksplanMetadata?.endringstidspunkt,
        antallUkerIUttaksplan: uttaksplanMetadata?.antallUkerIUttaksplan,
        perioderSomSkalSendesInn: uttaksplanMetadata?.perioderSomSkalSendesInn,
        harUttaksplanBlittSlettet: uttaksplanMetadata?.harUttaksplanBlittSlettet,
        annenPartsUttakErLagtTilIPlan: uttaksplanMetadata?.annenPartsUttakErLagtTilIPlan,
    } satisfies FpMellomlagretData;

    return dataSomSkalMellomlagres;
};

const useMellomlagreSøknad = (
    locale: LocaleNo,
    fødselsnr: string,
    erEndringssøknad: boolean,
    harGodkjentVilkår: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const navigate = useNavigate();
    const getDataFromState = useContextGetAnyData();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>();

    useEffect(() => {
        if (skalMellomlagre) {
            const currentRoute = notEmpty(getDataFromState(ContextDataType.APP_ROUTE));

            const lagre = async () => {
                setSkalMellomlagre(false);

                navigate(currentRoute);

                const data = getDataForMellomlagring(
                    locale,
                    getDataFromState,
                    erEndringssøknad,
                    harGodkjentVilkår,
                    søknadGjelderEtNyttBarn,
                );

                try {
                    await ky.post(`${Environment.PUBLIC_PATH}/rest/storage/foreldrepenger`, {
                        json: data,
                        headers: {
                            fnr: fødselsnr,
                        },
                    });
                } catch (error: unknown) {
                    if (error instanceof HTTPError) {
                        if (error.response.status === 401 || error.response.status === 403) {
                            throw error;
                        }

                        const jsonResponse = await error.response.json();
                        const callIdForBruker = jsonResponse?.uuid ? jsonResponse?.uuid.slice(0, 8) : UKJENT_UUID;
                        throw Error(FEIL_VED_INNSENDING + callIdForBruker);
                    }
                    if (error instanceof Error) {
                        throw error;
                    }
                    throw new Error(String(error));
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagre().catch((error) => {
                //Logg feil, men ikkje vis feilmelding til brukar
                Sentry.captureMessage(error.message);

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

export default useMellomlagreSøknad;
