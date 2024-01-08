import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SøknadRoutes from './routes';
import isAvailable from './isAvailable';
import Forside from 'app/pages/forside/Forside';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import Barnet from 'app/steps/barnet/Barnet';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import UtenlandsoppholdSteg from 'app/steps/utenlandsopphold/UtenlandsoppholdSteg';
import TilretteleggingStep from 'app/steps/tilrettelegging/TilretteleggingStep';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import SkjemaSteg from 'app/steps/skjema/SkjemaSteg';
import Tilrettelegging, { TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import useSøknad from 'app/utils/hooks/useSøknad';
import FrilansStep from 'app/steps/frilans/FrilansStep';
import ArbeidIUtlandetStep from 'app/steps/arbeid-i-utlandet/ArbeidIUtlandetStep';
import VelgArbeid from 'app/steps/velg-arbeidsforhold/VelgArbeid';
import EgenNæringStep from 'app/steps/egen-næring/EgenNæringStep';
import SøknadSendt from 'app/pages/søknad-sendt/SøknadSendt';
import { DelivisTilretteleggingPeriodeType } from 'app/steps/tilrettelegging/tilretteleggingStepFormConfig';
import PerioderStep from 'app/steps/perioder/PerioderStep';
import { LocaleNo } from '@navikt/fp-types';
import { Søkerinfo } from 'app/types/Søkerinfo';
import useMellomlagreSøknad from 'app/context/useMellomlagreSøknad';
import useAvbrytSøknad from 'app/context/useAvbrytSøknad';
import TidligereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdTidligere/TidligereUtenlandsoppholdSteg';
import SenereUtenlandsoppholdSteg from 'app/steps/utenlandsoppholdSenere/SenereUtenlandsoppholdSteg';

export const getForrigeTilrettelegging = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
) => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[tilretteleggingBehov.length - 1];
    }
    const forrigeTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) - 1;
    if (forrigeTilretteleggingIndex < 0) {
        return undefined;
    }
    return tilretteleggingBehov[forrigeTilretteleggingIndex];
};

export const getNesteTilretteleggingId = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
) => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[0].id;
    }
    const nesteTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) + 1;
    if (nesteTilretteleggingIndex === tilretteleggingBehov.length) {
        return undefined;
    }
    return tilretteleggingBehov[nesteTilretteleggingIndex].id;
};

export const findNextRoute = (
    currentRoute: SøknadRoutes,
    nextRoute: SøknadRoutes,
    currentTilretteleggingId: string | undefined,
    tilretteleggingBehov: Tilrettelegging[],
): any => {
    if (currentRoute !== SøknadRoutes.SKJEMA && currentRoute !== SøknadRoutes.TILRETTELEGGING) {
        return nextRoute;
    }

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingBehov, currentTilretteleggingId);

    if (nesteTilretteleggingId) {
        return `${SøknadRoutes.TILRETTELEGGING}/${nesteTilretteleggingId}`;
    } else {
        return SøknadRoutes.OPPSUMMERING;
    }
};

const getSkjemaRoutes = (
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
    tilretteleggingValg: Tilrettelegging[] | undefined,
) => {
    return tilretteleggingValg?.map((tilrettelegging) => {
        return (
            <Route
                key={tilrettelegging.id}
                path={`${SøknadRoutes.SKJEMA}/${tilrettelegging.id}`}
                element={
                    <SkjemaSteg
                        key={tilrettelegging.id}
                        id={tilrettelegging.id}
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
        );
    });
};

const getPerioderRoutes = (
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
    tilretteleggingValg: Tilrettelegging[] | undefined,
) => {
    return tilretteleggingValg
        ?.filter(
            (t) =>
                t.type === TilretteleggingstypeOptions.DELVIS &&
                t.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        )
        .map((tilrettelegging) => {
            return (
                <Route
                    key={tilrettelegging.id}
                    path={`${SøknadRoutes.PERIODER}/${tilrettelegging.id}`}
                    element={
                        <PerioderStep
                            key={tilrettelegging.id}
                            id={tilrettelegging.id}
                            navn={tilrettelegging.arbeidsforhold.navn}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
                        />
                    }
                />
            );
        });
};

const getTilretteleggingRoutes = (
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
    tilretteleggingValg: Tilrettelegging[] | undefined,
) => {
    return tilretteleggingValg?.map((tilrettelegging) => {
        return (
            <Route
                key={tilrettelegging.id}
                path={`${SøknadRoutes.TILRETTELEGGING}/${tilrettelegging.id}`}
                element={
                    <TilretteleggingStep
                        key={tilrettelegging.id}
                        id={tilrettelegging.id}
                        typeArbeid={tilrettelegging.arbeidsforhold.type}
                        navn={tilrettelegging.arbeidsforhold.navn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
        );
    });
};

const renderSøknadRoutes = (
    harGodkjentVilkår: boolean,
    tilretteleggingBehov: Tilrettelegging[],
    søkerInfo: Søkerinfo,
    mellomlagreSøknadOgNaviger: () => Promise<void>,
    avbrytSøknad: () => Promise<void>,
) => {
    if (!harGodkjentVilkår) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.FORSIDE} />} />;
    }
    return (
        <>
            <Route
                path={SøknadRoutes.BARNET}
                element={<Barnet mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />}
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
                path={SøknadRoutes.HAR_BODD_I_UTLANDET}
                element={
                    <TidligereUtenlandsoppholdSteg
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.SKAL_BO_I_UTLANDET}
                element={
                    <SenereUtenlandsoppholdSteg
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ARBEID}
                element={
                    <Inntektsinformasjon
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.FRILANS}
                element={
                    <FrilansStep
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.NÆRING}
                element={
                    <EgenNæringStep
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.ARBEID_I_UTLANDET}
                element={
                    <ArbeidIUtlandetStep
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            <Route
                path={SøknadRoutes.VELG_ARBEID}
                element={
                    <VelgArbeid
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                }
            />
            {getSkjemaRoutes(søkerInfo, mellomlagreSøknadOgNaviger, avbrytSøknad, tilretteleggingBehov)}
            {getTilretteleggingRoutes(mellomlagreSøknadOgNaviger, avbrytSøknad, tilretteleggingBehov)}
            {getPerioderRoutes(mellomlagreSøknadOgNaviger, avbrytSøknad, tilretteleggingBehov)}
            <Route path={SøknadRoutes.OPPSUMMERING} element={<Oppsummering />} />
            <Route path={SøknadRoutes.SØKNAD_SENDT} element={<SøknadSendt />} />
        </>
    );
};

interface Props {
    currentRoute: SøknadRoutes;
    locale: LocaleNo;
    onChangeLocale: (locale: LocaleNo) => void;
    søkerInfo: Søkerinfo;
}

const SvangerskapspengesøknadRoutes: FunctionComponent<Props> = ({
    søkerInfo,
    currentRoute,
    locale,
    onChangeLocale,
}) => {
    const { state } = useSvangerskapspengerContext();
    const { tilrettelegging } = useSøknad();
    const navigate = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    const [harGodkjentVilkår, setHarGodkjentVilkår] = useState(state.søknad.harGodkjentVilkår || false);

    const mellomlagreSøknadOgNaviger = useMellomlagreSøknad(locale, søkerInfo.person.fnr, harGodkjentVilkår);

    const avbrytSøknad = useAvbrytSøknad(setHarGodkjentVilkår);

    useEffect(() => {
        if (currentRoute && harGodkjentVilkår && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            if (isAvailable(currentRoute, harGodkjentVilkår)) {
                navigate(currentRoute);
            }
        }
    }, [currentRoute, harGodkjentVilkår, navigate, isFirstTimeLoadingApp]);

    return (
        <Routes>
            <Route
                path={SøknadRoutes.FORSIDE}
                element={
                    <Forside
                        setHarGodkjentVilkår={setHarGodkjentVilkår}
                        harGodkjentVilkår={harGodkjentVilkår}
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                    />
                }
            />

            {renderSøknadRoutes(
                harGodkjentVilkår,
                tilrettelegging,
                søkerInfo,
                mellomlagreSøknadOgNaviger,
                avbrytSøknad,
            )}
        </Routes>
    );
};

export default SvangerskapspengesøknadRoutes;
