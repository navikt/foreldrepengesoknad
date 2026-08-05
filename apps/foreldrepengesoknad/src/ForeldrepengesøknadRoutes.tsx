import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useAvbrytSøknad } from 'appData/useAvbrytSøknad';
import { useMellomlagreSøknad } from 'appData/useMellomlagreSøknad';
import { useSendSøknad } from 'appData/useSendSøknad';
import { Forside } from 'pages/forside/Forside';
import { Søknadsmetadata } from 'pages/forside/utils/useStartSøknad';
import { Suspense, lazy, useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Alert, Button, VStack } from '@navikt/ds-react';

import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { ErrorPage, Spinner, Umyndig } from '@navikt/fp-ui';
import { erMyndig } from '@navikt/fp-utils';

// Stega er lazy-lasta slik at forsida ikkje må vente på uttaksplan, filopplastar og alle
// steg-pakkene. Kvart steg blir henta først når brukaren faktisk kjem dit.
const AndreInntektskilderSteg = lazy(() =>
    import('steps/andre-inntektskilder/AndreInntektskilderSteg').then((m) => ({ default: m.AndreInntektskilderSteg })),
);
const AnnenForelderSteg = lazy(() =>
    import('steps/annen-forelder/AnnenForelderSteg').then((m) => ({ default: m.AnnenForelderSteg })),
);
const ArbeidsforholdOgInntektSteg = lazy(() =>
    import('steps/arbeidsforhold-og-inntekt/ArbeidsforholdOgInntektSteg').then((m) => ({
        default: m.ArbeidsforholdOgInntektSteg,
    })),
);
const EgenNæringSteg = lazy(() =>
    import('steps/egen-næring/EgenNæringSteg').then((m) => ({ default: m.EgenNæringSteg })),
);
const FordelingSteg = lazy(() => import('steps/fordeling/FordelingSteg').then((m) => ({ default: m.FordelingSteg })));
const FrilansSteg = lazy(() => import('steps/frilans/FrilansSteg').then((m) => ({ default: m.FrilansSteg })));
const KvitteringPage = lazy(() =>
    import('pages/kvittering/KvitteringPage').then((m) => ({ default: m.KvitteringPage })),
);
const ManglendeVedlegg = lazy(() =>
    import('steps/manglende-vedlegg/ManglendeVedlegg').then((m) => ({ default: m.ManglendeVedlegg })),
);
const OmBarnetSteg = lazy(() => import('steps/om-barnet/OmBarnetSteg').then((m) => ({ default: m.OmBarnetSteg })));
const OppsummeringSteg = lazy(() =>
    import('steps/oppsummering/OppsummeringSteg').then((m) => ({ default: m.OppsummeringSteg })),
);
const PeriodeMedForeldrepengerSteg = lazy(() =>
    import('steps/periode-med-foreldrepenger/PeriodeMedForeldrepengerSteg').then((m) => ({
        default: m.PeriodeMedForeldrepengerSteg,
    })),
);
const SenereUtenlandsoppholdSteg = lazy(() =>
    import('steps/utenlandsopphold-senere/SenereUtenlandsoppholdSteg').then((m) => ({
        default: m.SenereUtenlandsoppholdSteg,
    })),
);
const SøkersituasjonSteg = lazy(() =>
    import('steps/søkersituasjon/SøkersituasjonSteg').then((m) => ({ default: m.SøkersituasjonSteg })),
);
const TidligereUtenlandsoppholdSteg = lazy(() =>
    import('steps/utenlandsopphold-tidligere/TidligereUtenlandsoppholdSteg').then((m) => ({
        default: m.TidligereUtenlandsoppholdSteg,
    })),
);
const UtenlandsoppholdSteg = lazy(() =>
    import('steps/utenlandsopphold/UtenlandsoppholdSteg').then((m) => ({ default: m.UtenlandsoppholdSteg })),
);
const UttaksplanSteg = lazy(() =>
    import('steps/uttaksplan/UttaksplanSteg').then((m) => ({ default: m.UttaksplanSteg })),
);

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
                        <Suspense fallback={<Spinner />}>
                            <UttaksplanSteg
                                søkerInfo={søkerInfo}
                                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                avbrytSøknad={avbrytSøknad}
                                foreldrepengerSaker={foreldrepengerSaker}
                                erEndringssøknad={erEndringssøknad}
                            />
                        </Suspense>
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
                    <Suspense fallback={<Spinner />}>
                        <UttaksplanSteg
                            søkerInfo={søkerInfo}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
                            foreldrepengerSaker={foreldrepengerSaker}
                            erEndringssøknad={erEndringssøknad}
                        />
                    </Suspense>
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
    const routerLocation = useLocation();

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(lagretHarGodkjentVilkår || false);
    const [erEndringssøknad, setErEndringssøknad] = useState(lagretErEndringssøknad || false);
    const [søknadGjelderNyttBarn, setSøknadGjelderNyttBarn] = useState(lagretSøknadGjelderNyttBarn);

    const { sendSøknad, errorSendSøknad } = useSendSøknad(søkerInfo, erEndringssøknad, foreldrepengerSaker);

    const {
        mellomlagreSøknad: mellomlagreSøknadOgNaviger,
        lagringFeilet,
        nullstillLagringFeilet,
    } = useMellomlagreSøknad(foreldrepengerSaker, søkerInfo, erEndringssøknad, søknadGjelderNyttBarn);

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
    // dit). React Router monterer derimot steget ut frå URL-en allereie under
    // render. Endrar nettlesarens tilbake/fram-knapp URL-en til eit anna, forelda
    // steg, må vi difor snappe tilbake til APP_ROUTE *under render* – ein
    // navigasjon i ein useEffect skjer for seint, då har det forelda steget
    // allereie rendra og krasja på notEmpty(...). Stegvelgar og «Tilbake»-knappar
    // navigerer via APP_ROUTE og held URL-en i synk. KVITTERING og IKKE_MYNDIG er
    // unntatt: kvittering blir navigert til utan å oppdatere APP_ROUTE etter
    // innsending.
    const appRoute = useContextGetData(ContextDataType.APP_ROUTE);

    if (errorSendSøknad) {
        return (
            <ErrorPage
                appName="foreldrepengesoknad"
                errorMessage={errorSendSøknad.message}
                retryCallback={() => location.reload()}
            />
        );
    }

    if (
        appRoute &&
        harGodkjentVilkår &&
        erMyndig(søkerInfo.fødselsdato) &&
        routerLocation.pathname !== appRoute.toString() &&
        routerLocation.pathname !== SøknadRoutes.KVITTERING.toString() &&
        routerLocation.pathname !== `/${SøknadRoutes.IKKE_MYNDIG}`
    ) {
        return <Navigate to={appRoute} replace />;
    }

    return (
        <VStack gap="space-16">
            {lagringFeilet && (
                <VStack align="center" paddingBlock="space-16" paddingInline="space-16">
                    <VStack maxWidth="600px" width="100%">
                        <Alert variant="error">
                            <VStack align="start" gap="space-8">
                                <FormattedMessage id="Mellomlagring.FeiletVedFortsettSenere" />
                                <Button type="button" variant="secondary" size="small" onClick={nullstillLagringFeilet}>
                                    <FormattedMessage id="Mellomlagring.FeiletVedFortsettSenere.Lukk" />
                                </Button>
                            </VStack>
                        </Alert>
                    </VStack>
                </VStack>
            )}
            <Suspense fallback={<Spinner />}>
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
            </Suspense>
        </VStack>
    );
};
