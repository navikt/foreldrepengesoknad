import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useAvbrytSøknad } from 'appData/useAvbrytSøknad';
import { useMellomlagreSøknad } from 'appData/useMellomlagreSøknad';
import { useSendSøknad } from 'appData/useSendSøknad';
import { Forside } from 'pages/forside/Forside';
import { Søknadsmetadata } from 'pages/forside/useStartSøknad';
import { KvitteringPage } from 'pages/kvittering/KvitteringPage';
import { useCallback, useEffect, useState } from 'react';import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AndreInntektskilderSteg } from 'steps/andre-inntektskilder/AndreInntektskilderSteg';
import { AnnenForelderSteg } from 'steps/annen-forelder/AnnenForelderSteg';
import { ArbeidsforholdOgInntektSteg } from 'steps/arbeidsforhold-og-inntekt/ArbeidsforholdOgInntektSteg';
import { EgenNæringSteg } from 'steps/egen-næring/EgenNæringSteg';
import { FordelingSteg } from 'steps/fordeling/FordelingSteg';
import { FrilansSteg } from 'steps/frilans/FrilansSteg';
import { ManglendeVedlegg } from 'steps/manglende-vedlegg/ManglendeVedlegg';
import { OmBarnetSteg } from 'steps/om-barnet/OmBarnetSteg';
import { OppsummeringSteg } from 'steps/oppsummering/OppsummeringSteg';
import { PeriodeMedForeldrepengerSteg } from 'steps/periode-med-foreldrepenger/PeriodeMedForeldrepengerSteg';
import { SøkersituasjonSteg } from 'steps/søkersituasjon/SøkersituasjonSteg';
import { SenereUtenlandsoppholdSteg } from 'steps/utenlandsopphold-senere/SenereUtenlandsoppholdSteg';
import { TidligereUtenlandsoppholdSteg } from 'steps/utenlandsopphold-tidligere/TidligereUtenlandsoppholdSteg';
import { UtenlandsoppholdSteg } from 'steps/utenlandsopphold/UtenlandsoppholdSteg';
import { UttaksplanSteg } from 'steps/uttaksplan/UttaksplanSteg';

import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { ErrorPage, Umyndig } from '@navikt/fp-ui';
import { erMyndig } from '@navikt/fp-utils';

interface SøknadRoutesOptions {
    harGodkjentVilkår: boolean;
    erEndringssøknad: boolean;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    sendSøknad: () => Promise<void>;
    avbrytSøknad: () => void;
    søknadGjelderNyttBarn?: boolean;
    foreldrepengerSaker?: FpSak_fpoversikt[];
}

const renderSøknadRoutes = ({
    harGodkjentVilkår,
    erEndringssøknad,
    søkerInfo,
    mellomlagreSøknadOgNaviger,
    sendSøknad,
    avbrytSøknad,
    søknadGjelderNyttBarn,
    foreldrepengerSaker,
}: SøknadRoutesOptions) => {
    if (!harGodkjentVilkår || søknadGjelderNyttBarn === undefined) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />;
    }

    if (!erMyndig(søkerInfo.fødselsdato)) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.IKKE_MYNDIG} />} />;
    }

    if (erEndringssøknad) {
        return (
            <>
                <Route
                    path={SøknadRoutes.UTTAKSPLAN}
                    element={
                        <UttaksplanSteg
                            søkerInfo={søkerInfo}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
                            foreldrepengerSaker={foreldrepengerSaker}
                        />
                    }
                />
                <Route
                    path={SøknadRoutes.DOKUMENTASJON}
                    element={
                        <ManglendeVedlegg
                            søkerInfo={søkerInfo}
                            erEndringssøknad={erEndringssøknad}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
                            foreldrepengerSaker={foreldrepengerSaker}
                        />
                    }
                />
                <Route
                    path={SøknadRoutes.OPPSUMMERING}
                    element={
                        <OppsummeringSteg
                            erEndringssøknad={erEndringssøknad}
                            søkerInfo={søkerInfo}
                            sendSøknad={sendSøknad}
                            avbrytSøknad={avbrytSøknad}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            foreldrepengerSaker={foreldrepengerSaker}
                        />
                    }
                />
                <Route path={SøknadRoutes.KVITTERING} element={<KvitteringPage />} />
            </>
        );
    }

    return (
        <>
            <Route
                path={SøknadRoutes.SØKERSITUASJON}
                element={
                    <SøkersituasjonSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        kjønn={søkerInfo.kjønn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.OM_BARNET}
                element={
                    <OmBarnetSteg
                        søkerInfo={søkerInfo}
                        søknadGjelderNyttBarn={søknadGjelderNyttBarn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ANNEN_FORELDER}
                element={
                    <AnnenForelderSteg
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.PERIODE_MED_FORELDREPENGER}
                element={
                    <PeriodeMedForeldrepengerSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.FORDELING}
                element={
                    <FordelingSteg
                        person={søkerInfo}
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.UTTAKSPLAN}
                element={
                    <UttaksplanSteg
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                        foreldrepengerSaker={foreldrepengerSaker}
                    />
                }
            />
            <Route
                path={SøknadRoutes.DOKUMENTASJON}
                element={
                    <ManglendeVedlegg
                        søkerInfo={søkerInfo}
                        erEndringssøknad={erEndringssøknad}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                        foreldrepengerSaker={foreldrepengerSaker}
                    />
                }
            />
            <Route
                path={SøknadRoutes.UTENLANDSOPPHOLD}
                element={
                    <UtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD}
                element={
                    <TidligereUtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.SENERE_UTENLANDSOPPHOLD}
                element={
                    <SenereUtenlandsoppholdSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ARBEID_OG_INNTEKT}
                element={
                    <ArbeidsforholdOgInntektSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.EGEN_NÆRING}
                element={
                    <EgenNæringSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.FRILANS}
                element={
                    <FrilansSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ANDRE_INNTEKTER}
                element={
                    <AndreInntektskilderSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.OPPSUMMERING}
                element={
                    <OppsummeringSteg
                        erEndringssøknad={erEndringssøknad}
                        søkerInfo={søkerInfo}
                        sendSøknad={sendSøknad}
                        avbrytSøknad={avbrytSøknad}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                }
            />
            <Route path={SøknadRoutes.KVITTERING} element={<KvitteringPage />} />
        </>
    );
};

interface Props {
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    foreldrepengerSaker: FpSak_fpoversikt[];
    lagretErEndringssøknad?: boolean;
    lagretHarGodkjentVilkår?: boolean;
    lagretSøknadGjelderNyttBarn?: boolean;
}

export const ForeldrepengesøknadRoutes = ({
    søkerInfo,
    foreldrepengerSaker,
    lagretErEndringssøknad,
    lagretHarGodkjentVilkår,
    lagretSøknadGjelderNyttBarn,
}: Props) => {
    const navigate = useNavigate();
    const routerLocation = useLocation();

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(lagretHarGodkjentVilkår || false);
    const [erEndringssøknad, setErEndringssøknad] = useState(lagretErEndringssøknad || false);
    const [søknadGjelderNyttBarn, setSøknadGjelderNyttBarn] = useState(lagretSøknadGjelderNyttBarn);

    const { sendSøknad, errorSendSøknad } = useSendSøknad(søkerInfo, erEndringssøknad, foreldrepengerSaker);

    const mellomlagreSøknadOgNaviger = useMellomlagreSøknad(
        foreldrepengerSaker,
        søkerInfo,
        erEndringssøknad,
        søknadGjelderNyttBarn,
    );

    const avbrytSøknad = useAvbrytSøknad(setErEndringssøknad, setHarGodkjentVilkår, setSøknadGjelderNyttBarn);

    const oppdaterSøknadsmetadata = useCallback((metadata: Søknadsmetadata) => {
        setHarGodkjentVilkår(metadata.harGodkjentVilkår);
        setErEndringssøknad(metadata.erEndringssøknad);
        setSøknadGjelderNyttBarn(metadata.søknadGjelderNyttBarn);
    }, []);

    // Hvis valgt barn kan vi forsøke hente termindato fra annenpartsvedtak.
    // Dette trengs ikke før i OmBarnet. Men om vi legger et query på rot for å prefetche så tidlig som mulig.
    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    useQuery(annenPartVedtakOptions);

    // APP_ROUTE er einaste sanning for kva steg brukaren er på, og blir alltid
    // halden gyldig av stegnavigasjonen (data for steget finst når APP_ROUTE peikar
    // dit). Endrar nettlesarens tilbake/fram-knapp URL-en til eit anna steg,
    // snappar vi tilbake til APP_ROUTE slik at vi aldri monterer eit steg utan dei
    // påkravde dataene. Stegvelgar og «Tilbake»-knappar navigerer via APP_ROUTE og
    // held difor URL-en i synk.
    const appRoute = useContextGetData(ContextDataType.APP_ROUTE);

    useEffect(() => {
        if (!appRoute || !harGodkjentVilkår || !erMyndig(søkerInfo.fødselsdato)) {
            return;
        }

        const currentPath = decodeURIComponent(routerLocation.pathname);

        const ignoredPaths = [SøknadRoutes.KVITTERING, SøknadRoutes.IKKE_MYNDIG].map((path) => path.toString());
        if (ignoredPaths.includes(currentPath)) {
            return;
        }

        if (currentPath !== appRoute.toString()) {
            void navigate(appRoute, { replace: true });
        }
    }, [appRoute, harGodkjentVilkår, søkerInfo.fødselsdato, routerLocation.pathname, navigate]);

    if (errorSendSøknad) {
        return (
            <ErrorPage
                appName="foreldrepengesoknad"
                errorMessage={errorSendSøknad.message}
                retryCallback={() => location.reload()}
            />
        );
    }

    return (
        <Routes>
            <Route
                path={SøknadRoutes.VELKOMMEN}
                element={
                    <Forside
                        saker={foreldrepengerSaker}
                        harGodkjentVilkår={harGodkjentVilkår}
                        søkerInfo={søkerInfo}
                        oppdaterSøknadsmetadata={oppdaterSøknadsmetadata}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                }
            />
            <Route path={SøknadRoutes.IKKE_MYNDIG} element={<Umyndig appName="foreldrepengesoknad" />} />

            {renderSøknadRoutes({
                harGodkjentVilkår,
                erEndringssøknad,
                søkerInfo,
                mellomlagreSøknadOgNaviger,
                sendSøknad,
                avbrytSøknad,
                søknadGjelderNyttBarn,
                foreldrepengerSaker,
            })}
        </Routes>
    );
};
