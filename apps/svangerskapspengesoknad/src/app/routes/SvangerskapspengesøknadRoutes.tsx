import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SøknadRoutes from './routes';
import isAvailable from './isAvailable';
import Forside from 'app/pages/forside/Forside';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import Barnet from 'app/steps/barnet/Barnet';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import Utenlandsopphold from 'app/steps/utenlandsopphold/Utenlandsopphold';
import TilretteleggingStep from 'app/steps/tilrettelegging/TilretteleggingStep';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import Skjema from 'app/steps/skjema/Skjema';
import Tilrettelegging from 'app/types/Tilrettelegging';
import useSøknad from 'app/utils/hooks/useSøknad';
import FrilansStep from 'app/steps/frilans/FrilansStep';
import ArbeidIUtlandetStep from 'app/steps/arbeid-i-utlandet/ArbeidIUtlandetStep';
import VelgArbeid from 'app/steps/velg-arbeidsforhold/VelgArbeid';
import EgenNæringStep from 'app/steps/egen-næring/EgenNæringStep';
import BoIUtlandet from 'app/steps/bo-i-utlandet/BoIUtlandet';
import SøknadSendt from 'app/pages/søknad-sendt/SøknadSendt';

interface Props {
    currentRoute: SøknadRoutes;
}

export const getForrigeTilretteleggingId = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
) => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[tilretteleggingBehov.length - 1].id;
    }
    const forrigeTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) - 1;
    if (forrigeTilretteleggingIndex < 0) {
        return undefined;
    }
    return tilretteleggingBehov[forrigeTilretteleggingIndex].id;
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
    if (currentRoute !== SøknadRoutes.SKJEMA && currentRoute !== SøknadRoutes.PERIODE) {
        return nextRoute;
    }

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingBehov, currentTilretteleggingId);

    if (nesteTilretteleggingId) {
        return `${SøknadRoutes.PERIODE}/${nesteTilretteleggingId}`;
    } else {
        return SøknadRoutes.OPPSUMMERING;
    }
};

const getTilretteleggingRoutes = (tilretteleggingValg: Tilrettelegging[] | undefined) => {
    return tilretteleggingValg?.map((tilrettelegging) => {
        return (
            <Route
                key={tilrettelegging.id}
                path={`${SøknadRoutes.PERIODE}/${tilrettelegging.id}`}
                element={
                    <TilretteleggingStep
                        key={tilrettelegging.id}
                        id={tilrettelegging.id}
                        type={tilrettelegging.arbeidsforhold.type}
                        navn={tilrettelegging.arbeidsforhold.navn}
                    />
                }
            />
        );
    });
};

const renderSøknadRoutes = (harGodkjentVilkår: boolean, tilretteleggingBehov: Tilrettelegging[]) => {
    if (!harGodkjentVilkår) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.FORSIDE} />} />;
    }
    return (
        <>
            <Route path={SøknadRoutes.BARNET} element={<Barnet />} />
            <Route path={SøknadRoutes.UTENLANDSOPPHOLD} element={<Utenlandsopphold />} />
            <Route
                path={SøknadRoutes.HAR_BODD_I_UTLANDET}
                element={<BoIUtlandet key={'iFortid'} oppgirIFortid={true} />}
            />
            <Route
                path={SøknadRoutes.SKAL_BO_I_UTLANDET}
                element={<BoIUtlandet key={'iFremtid'} oppgirIFortid={false} />}
            />
            <Route path={SøknadRoutes.UTENLANDSOPPHOLD} element={<Utenlandsopphold />} />
            <Route path={SøknadRoutes.ARBEID} element={<Inntektsinformasjon />} />
            <Route path={SøknadRoutes.FRILANS} element={<FrilansStep />} />
            <Route path={SøknadRoutes.NÆRING} element={<EgenNæringStep />} />
            <Route path={SøknadRoutes.ARBEID_I_UTLANDET} element={<ArbeidIUtlandetStep />} />
            <Route path={SøknadRoutes.VELG_ARBEID} element={<VelgArbeid />} />
            <Route path={SøknadRoutes.SKJEMA} element={<Skjema />} />
            {getTilretteleggingRoutes(tilretteleggingBehov)}
            <Route path={SøknadRoutes.OPPSUMMERING} element={<Oppsummering />} />
            <Route path={SøknadRoutes.SØKNAD_SENDT} element={<SøknadSendt />} />
        </>
    );
};

const SvangerskapspengesøknadRoutes: FunctionComponent<Props> = ({ currentRoute }) => {
    const { state } = useSvangerskapspengerContext();
    const { tilrettelegging } = useSøknad();
    const navigate = useNavigate();
    const harGodkjentVilkår = state.søknad.harGodkjentVilkår;
    const erMyndig = true; // TODO: state.søkerinfo.person?.erMyndig;
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    useEffect(() => {
        if (currentRoute && erMyndig && harGodkjentVilkår && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            if (isAvailable(currentRoute, harGodkjentVilkår)) {
                navigate(currentRoute);
            }
        }
    }, [currentRoute, erMyndig, harGodkjentVilkår, navigate, isFirstTimeLoadingApp]);

    return (
        <Routes>
            <Route path={SøknadRoutes.FORSIDE} element={<Forside />} />

            {renderSøknadRoutes(harGodkjentVilkår, tilrettelegging)}
        </Routes>
    );
};

export default SvangerskapspengesøknadRoutes;
