import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { SøknadRoutes, isRouteAvailable } from 'appData/routes';
import { useAvbrytSøknad } from 'appData/useAvbrytSøknad';
import { useMellomlagreSøknad } from 'appData/useMellomlagreSøknad';
import { useSendSøknad } from 'appData/useSendSøknad';
import { Forside } from 'pages/forside/Forside';
import { KvitteringPage } from 'pages/kvittering/KvitteringPage';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { UttaksplanStep } from 'steps/uttaksplan/UttaksplanStep';

import { FpSak_fpoversikt, PersonMedArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { ErrorPage, Umyndig } from '@navikt/fp-ui';
import { erMyndig } from '@navikt/fp-utils';

const renderSøknadRoutes = (
    harGodkjentVilkår: boolean,
    erEndringssøknad: boolean,
    søkerInfo: PersonMedArbeidsforholdDto_fpoversikt,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    sendSøknad: () => Promise<void>,
    avbrytSøknad: () => void,
    søknadGjelderNyttBarn?: boolean,
) => {
    if (!harGodkjentVilkår || søknadGjelderNyttBarn === undefined) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />;
    }

    if (!erMyndig(søkerInfo.person.fødselsdato)) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.IKKE_MYNDIG} />} />;
    }

    if (erEndringssøknad) {
        return (
            <>
                <Route
                    path={SøknadRoutes.UTTAKSPLAN}
                    element={
                        <UttaksplanStep
                            søkerInfo={søkerInfo}
                            erEndringssøknad={erEndringssøknad}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
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
    }

    return (
        <>
            <Route
                path={SøknadRoutes.SØKERSITUASJON}
                element={
                    <SøkersituasjonSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        kjønn={søkerInfo.person.kjønn}
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
                        person={søkerInfo.person}
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.UTTAKSPLAN}
                element={
                    <UttaksplanStep
                        søkerInfo={søkerInfo}
                        erEndringssøknad={erEndringssøknad}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
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
    currentRoute: SøknadRoutes;
    søkerInfo: PersonMedArbeidsforholdDto_fpoversikt;
    foreldrepengerSaker: FpSak_fpoversikt[];
    lagretErEndringssøknad?: boolean;
    lagretHarGodkjentVilkår?: boolean;
    lagretSøknadGjelderNyttBarn?: boolean;
}

export const ForeldrepengesøknadRoutes = ({
    currentRoute,
    søkerInfo,
    foreldrepengerSaker,
    lagretErEndringssøknad,
    lagretHarGodkjentVilkår,
    lagretSøknadGjelderNyttBarn,
}: Props) => {
    const navigate = useNavigate();
    const routerLocation = useLocation();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(lagretHarGodkjentVilkår || false);
    const [erEndringssøknad, setErEndringssøknad] = useState(lagretErEndringssøknad || false);
    const [søknadGjelderNyttBarn, setSøknadGjelderNyttBarn] = useState(lagretSøknadGjelderNyttBarn);

    const { sendSøknad, errorSendSøknad } = useSendSøknad(søkerInfo, erEndringssøknad);

    const mellomlagreSøknadOgNaviger = useMellomlagreSøknad(
        foreldrepengerSaker,
        søkerInfo,
        erEndringssøknad,
        harGodkjentVilkår,
        søknadGjelderNyttBarn,
    );

    const avbrytSøknad = useAvbrytSøknad(setErEndringssøknad, setHarGodkjentVilkår, setSøknadGjelderNyttBarn);

    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);

    // Hvis valgt barn kan vi forsøke hente termindato fra annenpartsvedtak.
    // Dette trengs ikke før i OmBarnet. Men om vi legger et query på rot for å prefetche så tidlig som mulig.
    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    useQuery(annenPartVedtakOptions);

    useEffect(() => {
        if (
            currentRoute &&
            erMyndig(søkerInfo.person.fødselsdato) &&
            lagretHarGodkjentVilkår &&
            isFirstTimeLoadingApp
        ) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- TODO (TOR) - Vurder om denne kan fjennast
            setIsFirstTimeLoadingApp(false);
            if (isRouteAvailable(currentRoute, lagretHarGodkjentVilkår, uttaksplan)) {
                navigate(currentRoute);
            } else if (routerLocation.pathname === SøknadRoutes.OPPSUMMERING) {
                navigate(SøknadRoutes.UTTAKSPLAN);
            }
        }
    }, [
        currentRoute,
        søkerInfo.person.fødselsdato,
        lagretHarGodkjentVilkår,
        navigate,
        isFirstTimeLoadingApp,
        routerLocation.pathname,
        uttaksplan,
    ]);

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
                        setHarGodkjentVilkår={setHarGodkjentVilkår}
                        setErEndringssøknad={setErEndringssøknad}
                        setSøknadGjelderNyttBarn={setSøknadGjelderNyttBarn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                }
            />
            <Route path={SøknadRoutes.IKKE_MYNDIG} element={<Umyndig appName="foreldrepengesoknad" />} />

            {renderSøknadRoutes(
                harGodkjentVilkår,
                erEndringssøknad,
                søkerInfo,
                mellomlagreSøknadOgNaviger,
                sendSøknad,
                avbrytSøknad,
                søknadGjelderNyttBarn,
            )}
        </Routes>
    );
};
