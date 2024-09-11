import Api, { FpMellomlagretData } from 'api/api';
import { sendErrorMessageToSentry } from 'api/apiUtils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MELLOMLAGRET_VERSJON } from 'utils/mellomlagringUtils';

import { LocaleNo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './FpDataContext';

const mellomlagre = (
    locale: LocaleNo,
    getDataFromState: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    fødselsnr: string,
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
    const periodeMedForeldrepenger = getDataFromState(ContextDataType.PERIODE_MED_FORELDREPENGER);
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
            informasjonOmUtenlandsopphold: utenlandsopphold
                ? {
                      ...utenlandsopphold,
                      senereOpphold: senereUtenlandsopphold?.senereOpphold || [],
                      tidligereOpphold: tidligereUtenlandsopphold?.tidligereOpphold || [],
                  }
                : undefined,
            erEndringssøknad,
            dekningsgrad: periodeMedForeldrepenger?.dekningsgrad,
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
    } as FpMellomlagretData;

    return Api.storeAppState(dataSomSkalMellomlagres, fødselsnr);
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

                await mellomlagre(
                    locale,
                    getDataFromState,
                    fødselsnr,
                    erEndringssøknad,
                    harGodkjentVilkår,
                    søknadGjelderEtNyttBarn,
                );

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagre().catch((error) => {
                //Logg feil, men ikkje vis feilmelding til brukar
                sendErrorMessageToSentry(error);
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
