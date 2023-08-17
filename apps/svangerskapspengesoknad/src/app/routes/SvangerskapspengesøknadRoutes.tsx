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
import Tilrettelegging from 'app/steps/tilrettelegging/Tilrettelegging';

interface Props {
    currentRoute: SøknadRoutes;
}

export const findNextRouteForTilrettelegging = (
    currentRoute: SøknadRoutes,
    tilretteleggingBehov: TilretteleggingBehov[] | undefined
): any => {
    if (tilretteleggingBehov === undefined || tilretteleggingBehov.length === 0) {
        return SøknadRoutes.ARBEID;
    } else if (currentRoute === SøknadRoutes.ARBEID) {
        return `${SøknadRoutes.PERIODE}/${tilretteleggingBehov[0].id}`;
    } else if (currentRoute === SøknadRoutes.PERIODE) {
        return `${SøknadRoutes.PERIODE}/${tilretteleggingBehov[0].id}`;
    }
    return SøknadRoutes.ARBEID;
};

const getTilretteleggingRoutes = (tilretteleggingValg: TilretteleggingBehov[] | undefined) => {
    return tilretteleggingValg?.map((tilrettelegging) => {
        return (
            <Route
                path={`${SøknadRoutes.PERIODE}/${tilrettelegging.id}`}
                element={
                    <Tilrettelegging id={tilrettelegging.id} type={tilrettelegging.type} navn={tilrettelegging.label} />
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
            <Route path={SøknadRoutes.UTENLANDSOPPHOLD} element={<Utenlandsopphold />} />
            {getTilretteleggingRoutes(tilretteleggingBehov)}
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
