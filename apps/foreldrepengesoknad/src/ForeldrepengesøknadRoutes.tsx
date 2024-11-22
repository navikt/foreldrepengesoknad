import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { useAvbrytSøknad } from 'appData/useAvbrytSøknad';
import useMellomlagreSøknad from 'appData/useMellomlagreSøknad';
import useSendSøknad from 'appData/useSendSøknad';
import Velkommen from 'pages/forside/Forside';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AndreInntektskilderSteg from 'steps/andre-inntektskilder/AndreInntektskilderSteg';
import AnnenForelderSteg from 'steps/annen-forelder/AnnenForelderSteg';
import ArbeidsforholdOgInntektSteg from 'steps/arbeidsforhold-og-inntekt/ArbeidsforholdOgInntektSteg';
import EgenNæringSteg from 'steps/egen-næring/EgenNæringSteg';
import FordelingSteg from 'steps/fordeling/FordelingSteg';
import FrilansSteg from 'steps/frilans/FrilansSteg';
import ManglendeVedlegg from 'steps/manglende-vedlegg/ManglendeVedlegg';
import OmBarnetSteg from 'steps/om-barnet/OmBarnetSteg';
import { Oppsummering } from 'steps/oppsummering/Oppsummering';
import PeriodeMedForeldrepengerSteg from 'steps/periode-med-foreldrepenger/PeriodeMedForeldrepengerSteg';
import SøkersituasjonSteg from 'steps/søkersituasjon/SøkersituasjonSteg';
import SenereUtenlandsoppholdSteg from 'steps/utenlandsopphold-senere/SenereUtenlandsoppholdSteg';
import TidligereUtenlandsoppholdSteg from 'steps/utenlandsopphold-tidligere/TidligereUtenlandsoppholdSteg';
import UtenlandsoppholdSteg from 'steps/utenlandsopphold/UtenlandsoppholdSteg';
import UttaksplanStep from 'steps/uttaksplan/UttaksplanStep';
import { Kvittering } from 'types/Kvittering';

import { Sak } from '@navikt/fp-common';
import { LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { ErrorPage, Umyndig } from '@navikt/fp-ui';
import { erMyndig } from '@navikt/fp-utils';

import SøknadRoutes, { isRouteAvailable } from './app-data/routes';

interface Props {
    locale: LocaleNo;
    onChangeLocale: (locale: LocaleNo) => void;
    currentRoute: SøknadRoutes;
    søkerInfo: Søkerinfo;
    saker: Sak[];
    lagretErEndringssøknad?: boolean;
    lagretHarGodkjentVilkår?: boolean;
    lagretSøknadGjelderNyttBarn?: boolean;
    setKvittering: (kvittering: Kvittering) => void;
}

export const ForeldrepengesøknadRoutes = ({
    locale,
    onChangeLocale,
    currentRoute,
    søkerInfo,
    saker,
    lagretErEndringssøknad,
    lagretHarGodkjentVilkår,
    lagretSøknadGjelderNyttBarn,
    setKvittering,
}: Props) => {
    const navigate = useNavigate();
    const routerLocation = useLocation();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(lagretHarGodkjentVilkår || false);
    const [erEndringssøknad, setErEndringssøknad] = useState(lagretErEndringssøknad || false);
    const [søknadGjelderNyttBarn, setSøknadGjelderNyttBarn] = useState(lagretSøknadGjelderNyttBarn);

    const {
        søker: { fnr, fødselsdato },
    } = søkerInfo;

    const { sendSøknad, errorSendSøknad } = useSendSøknad(fnr, erEndringssøknad, setKvittering, locale);

    const mellomlagreSøknadOgNaviger = useMellomlagreSøknad(
        locale,
        fnr,
        erEndringssøknad,
        harGodkjentVilkår,
        søknadGjelderNyttBarn,
    );

    const avbrytSøknad = useAvbrytSøknad(fnr, setErEndringssøknad, setHarGodkjentVilkår, setSøknadGjelderNyttBarn);

    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);

    useEffect(() => {
        if (currentRoute && erMyndig(fødselsdato) && lagretHarGodkjentVilkår && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            if (isRouteAvailable(currentRoute, lagretHarGodkjentVilkår, uttaksplan)) {
                navigate(currentRoute);
            } else if (routerLocation.pathname === SøknadRoutes.OPPSUMMERING) {
                navigate(SøknadRoutes.UTTAKSPLAN);
            }
        }
    }, [
        currentRoute,
        fødselsdato,
        lagretHarGodkjentVilkår,
        navigate,
        isFirstTimeLoadingApp,
        routerLocation.pathname,
        uttaksplan,
    ]);

    if (errorSendSøknad) {
        return (
            <ErrorPage
                appName="Foreldrepenger"
                errorMessage={errorSendSøknad.message}
                retryCallback={() => location.reload()}
            />
        );
    }

    const navigerTilVelkommen = !harGodkjentVilkår || søknadGjelderNyttBarn === undefined;
    const navigerTilIkkeMyndig = !erMyndig(fødselsdato);
    const brukSøknadRoutes = !navigerTilVelkommen && !navigerTilIkkeMyndig;

    return (
        <Routes>
            <Route
                path={SøknadRoutes.VELKOMMEN}
                element={
                    <Velkommen
                        locale={locale}
                        saker={saker}
                        søkerInfo={søkerInfo}
                        onChangeLocale={onChangeLocale}
                        harGodkjentVilkår={harGodkjentVilkår}
                        setHarGodkjentVilkår={setHarGodkjentVilkår}
                        setErEndringssøknad={setErEndringssøknad}
                        setSøknadGjelderNyttBarn={setSøknadGjelderNyttBarn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                }
            />
            <Route path={SøknadRoutes.IKKE_MYNDIG} element={<Umyndig appnavn="Foreldrepenger" />} />
            {navigerTilVelkommen && <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />}
            {navigerTilIkkeMyndig && <Route path="*" element={<Navigate to={SøknadRoutes.IKKE_MYNDIG} />} />}
            {erEndringssøknad && brukSøknadRoutes && (
                <EndringSøknadRoutes
                    søkerInfo={søkerInfo}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    sendSøknad={sendSøknad}
                    avbrytSøknad={avbrytSøknad}
                />
            )}
            {!erEndringssøknad && brukSøknadRoutes && (
                <FørstegangssøknadRoutes
                    erEndringssøknad={erEndringssøknad}
                    søkerInfo={søkerInfo}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    sendSøknad={sendSøknad}
                    avbrytSøknad={avbrytSøknad}
                    søknadGjelderNyttBarn={søknadGjelderNyttBarn}
                />
            )}
        </Routes>
    );
};

interface FørstegangssøknadRoutesProps {
    erEndringssøknad: boolean;
    søkerInfo: Søkerinfo;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    sendSøknad: () => Promise<void>;
    avbrytSøknad: () => void;
    søknadGjelderNyttBarn: boolean;
}

const FørstegangssøknadRoutes = ({
    erEndringssøknad,
    søkerInfo,
    mellomlagreSøknadOgNaviger,
    sendSøknad,
    avbrytSøknad,
    søknadGjelderNyttBarn,
}: FørstegangssøknadRoutesProps) => {
    return (
        <>
            <Route
                path={SøknadRoutes.SØKERSITUASJON}
                element={
                    <SøkersituasjonSteg
                        arbeidsforhold={søkerInfo.arbeidsforhold}
                        kjønn={søkerInfo.søker.kjønn}
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
                        søker={søkerInfo.søker}
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
                    <Oppsummering
                        erEndringssøknad={erEndringssøknad}
                        søkerInfo={søkerInfo}
                        sendSøknad={sendSøknad}
                        avbrytSøknad={avbrytSøknad}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                }
            />
        </>
    );
};

interface EndringSøknadRoutesProps {
    søkerInfo: Søkerinfo;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    sendSøknad: () => Promise<void>;
    avbrytSøknad: () => void;
}

const EndringSøknadRoutes = ({
    søkerInfo,
    mellomlagreSøknadOgNaviger,
    sendSøknad,
    avbrytSøknad,
}: EndringSøknadRoutesProps) => {
    return (
        <>
            <Route
                path={SøknadRoutes.UTTAKSPLAN}
                element={
                    <UttaksplanStep
                        søkerInfo={søkerInfo}
                        erEndringssøknad
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
                        erEndringssøknad
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.OPPSUMMERING}
                element={
                    <Oppsummering
                        erEndringssøknad
                        søkerInfo={søkerInfo}
                        sendSøknad={sendSøknad}
                        avbrytSøknad={avbrytSøknad}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                }
            />
        </>
    );
};
