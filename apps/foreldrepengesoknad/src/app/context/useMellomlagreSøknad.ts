import Api from 'app/api/api';
import { FpDataMap, FpDataType, useFpStateAllDataFn } from './FpDataContext';
import { useCallback, useEffect, useState } from 'react';
import { notEmpty } from '@navikt/fp-validation';
import { useNavigate } from 'react-router-dom';
import { redirectToLogin } from 'app/utils/redirectToLogin';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import { LocaleNo } from '@navikt/fp-types';
import Søker from './types/Søker';

const mellomlagre = (
    locale: LocaleNo,
    getDataFromState: <TYPE extends FpDataType>(key: TYPE) => FpDataMap[TYPE],
    fødselsnr: string,
    erEndringssøknad: boolean,
    harGodkjentVilkår: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const currentRoute = notEmpty(getDataFromState(FpDataType.APP_ROUTE));

    const søkersituasjon = getDataFromState(FpDataType.SØKERSITUASJON);
    const barn = getDataFromState(FpDataType.OM_BARNET);
    const annenForelder = getDataFromState(FpDataType.ANNEN_FORELDER);
    const søker = getDataFromState(FpDataType.SØKER);
    const utenlandsopphold = getDataFromState(FpDataType.UTENLANDSOPPHOLD);
    const senereUtenlandsopphold = getDataFromState(FpDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = getDataFromState(FpDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const uttaksplanMetadata = getDataFromState(FpDataType.UTTAKSPLAN_METADATA);
    const barnFraNesteSak = getDataFromState(FpDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = getDataFromState(FpDataType.EKSISTERENDE_SAK);
    const uttaksplan = getDataFromState(FpDataType.UTTAKSPLAN);
    const uttaksplanInfo = getDataFromState(FpDataType.UTTAKSPLAN_INFO);

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
    const getDataFromState = useFpStateAllDataFn();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    useEffect(() => {
        if (skalMellomlagre) {
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

                const currentRoute = notEmpty(getDataFromState(FpDataType.APP_ROUTE));
                navigate(currentRoute);
            };

            lagre().catch((error) => {
                // TODO (TOR) Bør heller returnere error og håndtere feil frå API-kall på same måte
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    redirectToLogin();
                } else {
                    sendErrorMessageToSentry(error);
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
