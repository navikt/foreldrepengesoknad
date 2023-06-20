import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SøknadRoutes from './routes';
import IkkeMyndig from 'app/pages/ikkeMyndig/IkkeMyndig';
import isAvailable from './isAvailable';
import Velkommen from 'app/pages/velkommen/Velkommen';
import { useSvangerskapspengesøknadContext } from 'app/context/hooks/useSvangerskapspengesøknadContext';

interface Props {
    currentRoute: SøknadRoutes;
}

const renderSøknadRoutes = (harGodkjentVilkår: boolean, søkerErMyndig: boolean) => {
    if (!harGodkjentVilkår) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.VELKOMMEN} />} />;
    }

    if (!søkerErMyndig) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.IKKE_MYNDIG} />} />;
    }

    return (
        <>
            <Route path={SøknadRoutes.VELKOMMEN} element={<Velkommen />} />
        </>
    );
};

const SvangerskapspengesøknadRoutes: FunctionComponent<Props> = ({ currentRoute }) => {
    const { state } = useSvangerskapspengesøknadContext();
    const navigate = useNavigate();
    const harGodkjentVilkår = false; //TODO
    const erMyndig = true; //TODO
    // const harGodkjentVilkår = state.søknad.harGodkjentVilkår;
    // const erMyndig = state.søkerinfo.person.erMyndig;//TODO
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);

    useEffect(() => {
        if (currentRoute && erMyndig && harGodkjentVilkår && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            if (isAvailable(currentRoute)) {
                navigate(currentRoute);
            }
        }
    }, [currentRoute, erMyndig, harGodkjentVilkår, navigate, isFirstTimeLoadingApp]);

    return (
        <Routes>
            <Route path={SøknadRoutes.VELKOMMEN} element={<Velkommen />} />
            <Route path={SøknadRoutes.IKKE_MYNDIG} element={<IkkeMyndig fornavn={state.søkerinfo.person.fornavn} />} />

            {renderSøknadRoutes(harGodkjentVilkår, erMyndig)}
        </Routes>
    );
};

export default SvangerskapspengesøknadRoutes;
