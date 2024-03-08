import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Sak } from '@navikt/fp-common';
import { LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { ErrorPage, Umyndig } from '@navikt/fp-ui';
import { erMyndig } from '@navikt/fp-utils';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { useAvbrytSøknad } from 'app/context/useAvbrytSøknad';
import useMellomlagreSøknad from 'app/context/useMellomlagreSøknad';
import useSendSøknad from 'app/context/useSendSøknad';
import Velkommen from 'app/pages/velkommen/Velkommen';
import AnnenForelderSteg from 'app/steps/annen-forelder/AnnenForelderSteg';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import ManglendeVedlegg from 'app/steps/manglende-vedlegg/ManglendeVedlegg';
import OmBarnetSteg from 'app/steps/om-barnet/OmBarnetSteg';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import PeriodeMedForeldrepengerSteg from 'app/steps/periodeMedForeldrepenger/PeriodeMedForeldrepengerSteg';
import SøkersituasjonSteg from 'app/steps/søkersituasjon/SøkersituasjonSteg';
import UtenlandsoppholdSteg from 'app/steps/utenlandsopphold/UtenlandsoppholdSteg';
import SenereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';
import TidligereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import UttaksplanInfo from 'app/steps/uttaksplan-info/UttaksplanInfo';
import UttaksplanStep from 'app/steps/uttaksplan/UttaksplanStep';
import { Kvittering } from 'app/types/Kvittering';

import isAvailable from './isAvailable';
import SøknadRoutes from './routes';

const renderSøknadRoutes = (
    harGodkjentVilkår: boolean,
    erEndringssøknad: boolean,
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>,
    avbrytSøknad: () => void,
    søknadGjelderNyttBarn?: boolean,
) => {
    if (!harGodkjentVilkår || søknadGjelderNyttBarn === undefined) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />;
    }

    if (!erMyndig(søkerInfo.søker.fødselsdato)) {
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
    }

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
                path={SøknadRoutes.UTTAKSPLAN_INFO}
                element={
                    <UttaksplanInfo
                        søkerInfo={søkerInfo}
                        erEndringssøknad={erEndringssøknad}
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
                path={SøknadRoutes.INNTEKTSINFORMASJON}
                element={
                    <Inntektsinformasjon
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

const ForeldrepengesøknadRoutes: FunctionComponent<Props> = ({
    locale,
    onChangeLocale,
    currentRoute,
    søkerInfo,
    saker,
    lagretErEndringssøknad,
    lagretHarGodkjentVilkår,
    lagretSøknadGjelderNyttBarn,
    setKvittering,
}) => {
    const navigate = useNavigate();
    const routerLocation = useLocation();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(lagretHarGodkjentVilkår || false);
    const [erEndringssøknad, setErEndringssøknad] = useState(lagretErEndringssøknad || false);
    const [søknadGjelderNyttBarn, setSøknadGjelderNyttBarn] = useState(lagretSøknadGjelderNyttBarn);

    const { sendSøknad, errorSendSøknad } = useSendSøknad(søkerInfo.søker.fnr, erEndringssøknad, setKvittering, locale);

    const mellomlagreSøknadOgNaviger = useMellomlagreSøknad(
        locale,
        søkerInfo.søker.fnr,
        erEndringssøknad,
        harGodkjentVilkår,
        søknadGjelderNyttBarn,
    );

    const avbrytSøknad = useAvbrytSøknad(
        søkerInfo.søker.fnr,
        setErEndringssøknad,
        setHarGodkjentVilkår,
        setSøknadGjelderNyttBarn,
    );

    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);

    useEffect(() => {
        if (currentRoute && erMyndig(søkerInfo.søker.fødselsdato) && lagretHarGodkjentVilkår && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            if (isAvailable(currentRoute, lagretHarGodkjentVilkår, uttaksplan)) {
                navigate(currentRoute);
            } else {
                if (routerLocation.pathname === SøknadRoutes.OPPSUMMERING) {
                    navigate(SøknadRoutes.UTTAKSPLAN);
                }
            }
        }
    }, [
        currentRoute,
        søkerInfo.søker.fødselsdato,
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

    return (
        <Routes>
            <Route
                path={SøknadRoutes.VELKOMMEN}
                element={
                    <Velkommen
                        fornavn={søkerInfo.søker.fornavn}
                        locale={locale}
                        saker={saker}
                        onChangeLocale={onChangeLocale}
                        fnr={søkerInfo.søker.fnr}
                        harGodkjentVilkår={harGodkjentVilkår}
                        søkerInfo={søkerInfo}
                        setHarGodkjentVilkår={setHarGodkjentVilkår}
                        setErEndringssøknad={setErEndringssøknad}
                        setSøknadGjelderNyttBarn={setSøknadGjelderNyttBarn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                }
            />
            <Route path={SøknadRoutes.IKKE_MYNDIG} element={<Umyndig appnavn="Foreldrepenger" />} />

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

export default ForeldrepengesøknadRoutes;
