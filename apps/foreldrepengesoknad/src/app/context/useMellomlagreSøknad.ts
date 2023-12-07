import Api from 'app/api/api';
import { ContextDataMap, ContextDataType, useContextGetAnyData } from './FpDataContext';
import { useCallback, useEffect, useState } from 'react';
import { notEmpty } from '@navikt/fp-validation';
import { useNavigate } from 'react-router-dom';
import { redirectToLogin } from 'app/utils/redirectToLogin';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import { LocaleNo } from '@navikt/fp-types';
import Søker from './types/Søker';

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
    const søker = getDataFromState(ContextDataType.SØKER);
    const utenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD);
    const senereUtenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = getDataFromState(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const uttaksplanMetadata = getDataFromState(ContextDataType.UTTAKSPLAN_METADATA);
    const barnFraNesteSak = getDataFromState(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = getDataFromState(ContextDataType.EKSISTERENDE_SAK);
    const uttaksplan = getDataFromState(ContextDataType.UTTAKSPLAN);
    const uttaksplanInfo = getDataFromState(ContextDataType.UTTAKSPLAN_INFO);

    // TODO (TOR) Dropp mapping her og lagre context rått
    const dataSomSkalMellomlagres = {
        version: 5,
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
            } as Søker,
            informasjonOmUtenlandsopphold: utenlandsopphold
                ? {
                      ...utenlandsopphold,
                      senereOpphold: senereUtenlandsopphold?.senereOpphold || [],
                      tidligereOpphold: tidligereUtenlandsopphold?.tidligereOpphold || [],
                  }
                : undefined,
            erEndringssøknad,
            dekningsgrad: uttaksplanMetadata?.dekningsgrad,
            uttaksplan,
            vedlegg: [],
            tilleggsopplysninger: uttaksplanMetadata?.tilleggsopplysninger,
            ønskerJustertUttakVedFødsel: uttaksplanMetadata?.ønskerJustertUttakVedFødsel,
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

    useEffect(() => {
        if (skalMellomlagre) {
            const currentRoute = notEmpty(getDataFromState(ContextDataType.APP_ROUTE));

            const lagre = async () => {
                setSkalMellomlagre(false);

                await mellomlagre(
                    locale,
                    getDataFromState,
                    fødselsnr,
                    erEndringssøknad,
                    harGodkjentVilkår,
                    søknadGjelderEtNyttBarn,
                );

                navigate(currentRoute);
            };

            lagre().catch((error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    redirectToLogin();
                } else {
                    //Logg feil, men ikkje vis feilmelding til brukar
                    sendErrorMessageToSentry(error);

                    navigate(currentRoute);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skalMellomlagre]);

    const mellomlagreSøknadOgNaviger = useCallback(() => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setSkalMellomlagre(true);
    }, []);

    return mellomlagreSøknadOgNaviger;
};

export default useMellomlagreSøknad;
