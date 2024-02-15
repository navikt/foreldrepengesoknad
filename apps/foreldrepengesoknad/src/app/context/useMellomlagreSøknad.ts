import Api from 'app/api/api';
import { ContextDataMap, ContextDataType, useContextGetAnyData } from './FpDataContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { notEmpty } from '@navikt/fp-validation';
import { useNavigate } from 'react-router-dom';
import { redirectToLogin } from 'app/utils/redirectToLogin';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import { LocaleNo } from '@navikt/fp-types';
import SøkerData from './types/SøkerData';

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
    const søker = getDataFromState(ContextDataType.SØKER_DATA);
    const utenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD);
    const senereUtenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const uttaksplanMetadata = getDataFromState(ContextDataType.UTTAKSPLAN_METADATA);
    const barnFraNesteSak = getDataFromState(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = getDataFromState(ContextDataType.EKSISTERENDE_SAK);
    const uttaksplan = getDataFromState(ContextDataType.UTTAKSPLAN);
    const uttaksplanInfo = getDataFromState(ContextDataType.UTTAKSPLAN_INFO);
    const periodeMedForeldrepenger = getDataFromState(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const vedlegg = getDataFromState(ContextDataType.VEDLEGG);
    const manglerDokumentasjon = getDataFromState(ContextDataType.MANGLER_DOKUMENTASJON);

    // TODO (TOR) Dropp mapping her og lagre context rått
    const dataSomSkalMellomlagres = {
        version: 6,
        currentRoute,
        søknadGjelderEtNyttBarn,
        søknad: {
            harGodkjentVilkår,
            søkersituasjon,
            barn,
            annenForelder,
            søker: {
                ...søker,
                språkkode: locale,
            } as SøkerData,
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
            manglerDokumentasjon,
        },
        eksisterendeSak,
        barnFraNesteSak,
        uttaksplanInfo,
        endringstidspunkt: uttaksplanMetadata?.endringstidspunkt,
        antallUkerIUttaksplan: uttaksplanMetadata?.antallUkerIUttaksplan,
        perioderSomSkalSendesInn: uttaksplanMetadata?.perioderSomSkalSendesInn,
        harUttaksplanBlittSlettet: uttaksplanMetadata?.harUttaksplanBlittSlettet,
        annenPartsUttakErLagtTilIPlan: uttaksplanMetadata?.annenPartsUttakErLagtTilIPlan,
    };

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
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    redirectToLogin();
                } else {
                    //Logg feil, men ikkje vis feilmelding til brukar
                    sendErrorMessageToSentry(error);
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
