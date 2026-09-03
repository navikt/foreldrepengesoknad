import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import { SøknadRoutes, isRouteAvailable } from 'appData/routes';
import { useAvbrytSøknad } from 'appData/useAvbrytSøknad';
import { useMellomlagreSøknad } from 'appData/useMellomlagreSøknad';
import { useSendSøknad } from 'appData/useSendSøknad';
import { Forside } from 'pages/forside/Forside';
import { Søknadsmetadata } from 'pages/forside/utils/useStartSøknad';
import { KvitteringPage } from 'pages/kvittering/KvitteringPage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
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

import { Alert, Button, VStack } from '@navikt/ds-react';

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
                            erEndringssøknad={erEndringssøknad}
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
                        erEndringssøknad={erEndringssøknad}
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
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
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
    const isFirstTimeLoadingAppRef = useRef(true);

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

    useEffect(() => {
        if (!(
            currentRoute &&
            lagretHarGodkjentVilkår &&
            erMyndig(søkerInfo.fødselsdato) &&
            isFirstTimeLoadingAppRef.current
        )) {
            return;
        }

        isFirstTimeLoadingAppRef.current = false;
        if (isRouteAvailable(currentRoute, lagretHarGodkjentVilkår)) {
            void navigate(currentRoute);
            // eslint-disable-next-line unicorn/no-useless-coercion
        } else if (routerLocation.pathname === SøknadRoutes.OPPSUMMERING.toString()) {
            void navigate(SøknadRoutes.UTTAKSPLAN);
        }
    }, [currentRoute, søkerInfo.fødselsdato, lagretHarGodkjentVilkår, navigate, routerLocation.pathname]);

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
        </VStack>
    );
};
