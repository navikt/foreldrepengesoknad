import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SøknadRoutes from './routes';
import isAvailable from './isAvailable';
import Forside from 'app/pages/forside/Forside';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import Barnet from 'app/steps/barnet/Barnet';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import Utenlandsopphold from 'app/steps/utenlandsopphold/Utenlandsopphold';
import { TilretteleggingBehov } from 'app/types/VelgSøknadsgrunnlag';
import TilretteleggingStep from 'app/steps/tilrettelegging/TilretteleggingStep';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import actionCreator from 'app/context/action/actionCreator';
import Skjema from 'app/steps/skjema/Skjema';

interface Props {
    currentRoute: SøknadRoutes;
}

export const getNesteTilretteleggingId = (
    tilretteleggingBehov: TilretteleggingBehov[],
    currentTilretteleggingId: string | undefined
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

export const findNextRouteForTilrettelegging = (
    currentRoute: SøknadRoutes,
    currentTilretteleggingId: string | undefined,
    tilretteleggingBehov: TilretteleggingBehov[] | undefined,
    dispatch: any
): any => {
    if (tilretteleggingBehov === undefined || tilretteleggingBehov.length === 0) {
        return SøknadRoutes.ARBEID;
    } else if (currentRoute === SøknadRoutes.PERIODE) {
        const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingBehov, currentTilretteleggingId);
        dispatch(actionCreator.setCurrentTilretteleggingId(nesteTilretteleggingId));
        if (nesteTilretteleggingId) {
            return `${SøknadRoutes.PERIODE}/${nesteTilretteleggingId}`;
        } else {
            return SøknadRoutes.OPPSUMMERING;
        }
    }
    return SøknadRoutes.ARBEID;
};

const getTilretteleggingRoutes = (tilretteleggingValg: TilretteleggingBehov[] | undefined) => {
    return tilretteleggingValg?.map((tilrettelegging) => {
        return (
            <Route
                key={tilrettelegging.id}
                path={`${SøknadRoutes.PERIODE}/${tilrettelegging.id}`}
                element={
                    <TilretteleggingStep
                        id={tilrettelegging.id}
                        type={tilrettelegging.type}
                        navn={tilrettelegging.label}
                    />
                }
            />
        );
    });
};

const renderSøknadRoutes = (harGodkjentVilkår: boolean, tilretteleggingBehov: TilretteleggingBehov[]) => {
    if (!harGodkjentVilkår) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.FORSIDE} />} />;
    }
    return (
        <>
            <Route path={SøknadRoutes.BARNET} element={<Barnet />} />
            <Route path={SøknadRoutes.ARBEID} element={<Inntektsinformasjon />} />
            <Route path={SøknadRoutes.SKJEMA} element={<Skjema />} />
            <Route path={SøknadRoutes.UTENLANDSOPPHOLD} element={<Utenlandsopphold />} />
            {getTilretteleggingRoutes(tilretteleggingBehov)}
            <Route path={SøknadRoutes.OPPSUMMERING} element={<Oppsummering />} />
        </>
    );
};

const SvangerskapspengesøknadRoutes: FunctionComponent<Props> = ({ currentRoute }) => {
    const { state } = useSvangerskapspengerContext();
    const { tilretteleggingBehov } = state;
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

            {renderSøknadRoutes(harGodkjentVilkår, tilretteleggingBehov)}
        </Routes>
    );
};

export default SvangerskapspengesøknadRoutes;
