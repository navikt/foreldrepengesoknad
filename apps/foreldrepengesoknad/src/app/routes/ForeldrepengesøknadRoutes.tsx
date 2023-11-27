import { LocaleNo } from '@navikt/fp-types';
import IkkeMyndig from 'app/pages/ikkeMyndig/IkkeMyndig';
import Velkommen from 'app/pages/velkommen/Velkommen';
import AnnenForelder from 'app/steps/annen-forelder/AnnenForelder';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import OmBarnet from 'app/steps/om-barnet/OmBarnet';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import SøkersituasjonSteg from 'app/steps/søkersituasjon/SøkersituasjonSteg';
import UttaksplanInfo from 'app/steps/uttaksplan-info/UttaksplanInfo';
import UttaksplanStep from 'app/steps/uttaksplan/UttaksplanStep';
import { FunctionComponent, useEffect, useState } from 'react';
import { Route, useNavigate, Navigate, Routes, useLocation } from 'react-router-dom';
import isAvailable from './isAvailable';
import SøknadRoutes from './routes';
import UtenlandsoppholdSteg from 'app/steps/utenlandsopphold/UtenlandsoppholdSteg';
import TidligereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import SenereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';
import { Sak, Søkerinfo } from '@navikt/fp-common';
import useMellomlagreSøknad from 'app/context/useMellomlagreSøknad';
import useSendSøknad from 'app/context/useSendSøknad';
import { FpDataType, useFpStateData } from 'app/context/FpDataContext';
import { Kvittering } from 'app/types/Kvittering';
import { useAvbrytSøknad } from 'app/context/useAvbrytSøknad';

const renderSøknadRoutes = (
    harGodkjentVilkår: boolean,
    erEndringssøknad: boolean,
    søkerErMyndig: boolean,
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => void,
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>,
    avbrytSøknad: () => void,
    søknadGjelderNyttBarn?: boolean,
) => {
    if (!harGodkjentVilkår || søknadGjelderNyttBarn === undefined) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />;
    }

    if (!søkerErMyndig) {
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
                        kjønn={søkerInfo.person.kjønn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.OM_BARNET}
                element={
                    <OmBarnet
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
                    <AnnenForelder
                        søkerInfo={søkerInfo}
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
                path={SøknadRoutes.UTENLANDSOPPHOLD}
                element={
                    <UtenlandsoppholdSteg
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD}
                element={
                    <TidligereUtenlandsoppholdSteg
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.SENERE_UTENLANDSOPPHOLD}
                element={
                    <SenereUtenlandsoppholdSteg
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.INNTEKTSINFORMASJON}
                element={
                    <Inntektsinformasjon
                        søkerInfo={søkerInfo}
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
    const location = useLocation();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(lagretHarGodkjentVilkår || false);
    const [erEndringssøknad, setErEndringssøknad] = useState(lagretErEndringssøknad || false);
    const [søknadGjelderNyttBarn, setSøknadGjelderNyttBarn] = useState(lagretSøknadGjelderNyttBarn);

    const sendSøknad = useSendSøknad(søkerInfo.person.fnr, erEndringssøknad, setKvittering);

    const { mellomlagreSøknadOgNaviger, mellomlagreError } = useMellomlagreSøknad(
        søkerInfo.person.fnr,
        erEndringssøknad,
        harGodkjentVilkår,
        søknadGjelderNyttBarn,
    );

    const avbrytSøknad = useAvbrytSøknad(
        søkerInfo.person.fnr,
        setErEndringssøknad,
        setHarGodkjentVilkår,
        setSøknadGjelderNyttBarn,
    );

    const uttaksplan = useFpStateData(FpDataType.UTTAKSPLAN);

    const erMyndig = søkerInfo.person.erMyndig;

    useEffect(() => {
        if (currentRoute && erMyndig && lagretHarGodkjentVilkår && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            if (isAvailable(currentRoute, lagretHarGodkjentVilkår, uttaksplan)) {
                navigate(currentRoute);
            } else {
                if (location.pathname === SøknadRoutes.OPPSUMMERING) {
                    navigate(SøknadRoutes.UTTAKSPLAN);
                }
            }
        }
    }, [
        currentRoute,
        erMyndig,
        lagretHarGodkjentVilkår,
        navigate,
        isFirstTimeLoadingApp,
        location.pathname,
        uttaksplan,
    ]);

    return (
        <Routes>
            <Route
                path={SøknadRoutes.VELKOMMEN}
                element={
                    <Velkommen
                        fornavn={søkerInfo.person.fornavn}
                        locale={locale}
                        saker={saker}
                        onChangeLocale={onChangeLocale}
                        fnr={søkerInfo.person.fnr}
                        harGodkjentVilkår={harGodkjentVilkår}
                        søkerInfo={søkerInfo}
                        setHarGodkjentVilkår={setHarGodkjentVilkår}
                        setErEndringssøknad={setErEndringssøknad}
                        setSøknadGjelderNyttBarn={setSøknadGjelderNyttBarn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                }
            />
            <Route path={SøknadRoutes.IKKE_MYNDIG} element={<IkkeMyndig søkerInfo={søkerInfo} />} />

            {renderSøknadRoutes(
                harGodkjentVilkår,
                erEndringssøknad,
                erMyndig,
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
