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
    mellomlagreSøknad: () => void,
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
                            mellomlagreSøknad={mellomlagreSøknad}
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
                        mellomlagreSøknad={mellomlagreSøknad}
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
                        mellomlagreSøknad={mellomlagreSøknad}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ANNEN_FORELDER}
                element={
                    <AnnenForelder
                        søkerInfo={søkerInfo}
                        mellomlagreSøknad={mellomlagreSøknad}
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
                        mellomlagreSøknad={mellomlagreSøknad}
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
                        mellomlagreSøknad={mellomlagreSøknad}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.UTENLANDSOPPHOLD}
                element={<UtenlandsoppholdSteg mellomlagreSøknad={mellomlagreSøknad} avbrytSøknad={avbrytSøknad} />}
            />
            <Route
                path={SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD}
                element={
                    <TidligereUtenlandsoppholdSteg mellomlagreSøknad={mellomlagreSøknad} avbrytSøknad={avbrytSøknad} />
                }
            />
            <Route
                path={SøknadRoutes.SENERE_UTENLANDSOPPHOLD}
                element={
                    <SenereUtenlandsoppholdSteg mellomlagreSøknad={mellomlagreSøknad} avbrytSøknad={avbrytSøknad} />
                }
            />
            <Route
                path={SøknadRoutes.INNTEKTSINFORMASJON}
                element={
                    <Inntektsinformasjon
                        søkerInfo={søkerInfo}
                        mellomlagreSøknad={mellomlagreSøknad}
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
                    />
                }
            />
        </>
    );
};

interface Props {
    locale: LocaleNo;
    onChangeLocale: (locale: LocaleNo) => void;
    lagretCurrentRoute: SøknadRoutes;
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
    lagretCurrentRoute,
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

    const { mellomlagreSøknad, mellomlagreSøknadMedData } = useMellomlagreSøknad(
        søkerInfo.person.fnr,
        erEndringssøknad,
        harGodkjentVilkår,
        søknadGjelderNyttBarn,
    );
    const setDataOgMellomlagreSøknad = (
        harGodkjentVilkårLokal: boolean,
        erEndringssøknadLokal: boolean,
        søknadGjelderNyttBarnLokal: boolean,
    ) => {
        setHarGodkjentVilkår(harGodkjentVilkårLokal);
        setErEndringssøknad(erEndringssøknadLokal);
        setSøknadGjelderNyttBarn(søknadGjelderNyttBarnLokal);
        return mellomlagreSøknadMedData(harGodkjentVilkårLokal, erEndringssøknadLokal, søknadGjelderNyttBarnLokal);
    };

    const avbrytSøknad = useAvbrytSøknad(
        søkerInfo.person.fnr,
        setErEndringssøknad,
        setHarGodkjentVilkår,
        setSøknadGjelderNyttBarn,
        lagretErEndringssøknad,
        lagretHarGodkjentVilkår,
        lagretSøknadGjelderNyttBarn,
    );

    const uttaksplan = useFpStateData(FpDataType.UTTAKSPLAN);

    const erMyndig = søkerInfo.person.erMyndig;

    useEffect(() => {
        if (lagretCurrentRoute && erMyndig && lagretHarGodkjentVilkår && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            if (isAvailable(lagretCurrentRoute, lagretHarGodkjentVilkår, uttaksplan)) {
                navigate(lagretCurrentRoute);
            } else {
                if (location.pathname === SøknadRoutes.OPPSUMMERING) {
                    navigate(SøknadRoutes.UTTAKSPLAN);
                }
            }
        }
    }, [
        lagretCurrentRoute,
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
                        setDataOgMellomlagreSøknad={setDataOgMellomlagreSøknad}
                    />
                }
            />
            <Route path={SøknadRoutes.IKKE_MYNDIG} element={<IkkeMyndig søkerInfo={søkerInfo} />} />

            {renderSøknadRoutes(
                harGodkjentVilkår,
                erEndringssøknad,
                erMyndig,
                søkerInfo,
                mellomlagreSøknad,
                sendSøknad,
                avbrytSøknad,
                søknadGjelderNyttBarn,
            )}
        </Routes>
    );
};

export default ForeldrepengesøknadRoutes;
