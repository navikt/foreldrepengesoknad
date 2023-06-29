import { FunctionComponent, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SøknadRoutes from './routes';
// import IkkeMyndig from 'app/pages/ikkeMyndig/IkkeMyndig';
import isAvailable from './isAvailable';
import Velkommen from 'app/pages/forside/Forside';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import IkkeMyndig from 'app/pages/ikkeMyndig/IkkeMyndig';
// import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';

interface Props {
    currentRoute: SøknadRoutes;
}

const renderSøknadRoutes = (harGodkjentVilkår: boolean, søkerErMyndig: boolean) => {
    if (!harGodkjentVilkår && søkerErMyndig) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.FORSIDE} />} />;
    }

    if (!søkerErMyndig) {
        return <Route path="*" element={<Navigate to={SøknadRoutes.IKKE_MYNDIG} />} />;
    }

    return (
        <>
            <Route path={SøknadRoutes.FORSIDE} element={<Velkommen />} />
        </>
    );
};

const SvangerskapspengesøknadRoutes: FunctionComponent<Props> = ({ currentRoute }) => {
    const { state } = useSvangerskapspengerContext();
    console.log(state);
    const navigate = useNavigate();
    const harGodkjentVilkår = false; //TODO
    // const erMyndig = true; //TODO
    // const harGodkjentVilkår = state.søknad.harGodkjentVilkår;
    const erMyndig = false; // state.søkerinfo.person?.erMyndig; //TODO
    console.log('Ermydnog: ', erMyndig);
    useEffect(() => {
        if (currentRoute && erMyndig && harGodkjentVilkår) {
            if (isAvailable(currentRoute)) {
                navigate(currentRoute);
            }
        }
    }, [currentRoute, erMyndig, harGodkjentVilkår, navigate]);

    return (
        <Routes>
            <Route path={SøknadRoutes.FORSIDE} element={<Velkommen />} />
            <Route path={SøknadRoutes.IKKE_MYNDIG} element={<IkkeMyndig fornavn={'Hei'} />} />

            {renderSøknadRoutes(harGodkjentVilkår, erMyndig)}
        </Routes>
    );
};

export default SvangerskapspengesøknadRoutes;
