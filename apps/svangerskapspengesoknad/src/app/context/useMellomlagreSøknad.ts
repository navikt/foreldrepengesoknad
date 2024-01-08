import { ContextDataMap, ContextDataType, useContextGetAnyData } from './SvpDataContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { notEmpty } from '@navikt/fp-validation';
import { useNavigate } from 'react-router-dom';
import { redirectToLogin } from 'app/utils/redirectToLogin';
import { LocaleNo } from '@navikt/fp-types';

const mellomlagre = (
    locale: LocaleNo,
    getDataFromState: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    fødselsnr: string,
    harGodkjentVilkår: boolean,
) => {
    const currentRoute = notEmpty(getDataFromState(ContextDataType.APP_ROUTE));

    const barn = getDataFromState(ContextDataType.OM_BARNET);

    // TODO (TOR) Dropp mapping her og lagre context rått
    const dataSomSkalMellomlagres = {
        version: 5,
        currentRoute,
        søknad: {
            harGodkjentVilkår,
            barn,
            søker: {
                språkkode: locale,
            } as Søker,
            vedlegg: [],
        },
    };

    //return Api.storeAppState(dataSomSkalMellomlagres, fødselsnr);
};

const useMellomlagreSøknad = (locale: LocaleNo, fødselsnr: string, harGodkjentVilkår: boolean) => {
    const navigate = useNavigate();
    const getDataFromState = useContextGetAnyData();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>();

    useEffect(() => {
        if (skalMellomlagre) {
            const currentRoute = notEmpty(getDataFromState(ContextDataType.APP_ROUTE));

            const lagre = async () => {
                setSkalMellomlagre(false);

                await mellomlagre(locale, getDataFromState, fødselsnr, harGodkjentVilkår);

                navigate(currentRoute);

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

                    navigate(currentRoute);
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
