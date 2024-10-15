import { ReactNode, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useMatch, useNavigate } from 'react-router-dom';

// import { InntektsmeldingPage } from '../pages/inntektsmelding-page/InntektsmeldingPage';
import { Breadcrumb } from './../components/breadcrumb/Breadcrumb';
import Snarveier from './../components/snarveier/Snarveier';
import { default as SakComponent } from './../pages/Sak';
import DokumenterPage from './../pages/dokumenter-page/DokumenterPage';
import EttersendingPage from './../pages/ettersending/EttersendingPage';
import Forside from './../pages/forside/Forside';
import MinidialogPage from './../pages/minidialog-page/MinidialogPage';
import Saksoversikt from './../pages/saksoversikt/Saksoversikt';
import TidslinjePage from './../pages/tidslinje-page/TidslinjePage';
import { LayoutWrapper } from './../sections/LayoutWrapper';
import KontaktOss from './../sections/kontakt-oss/KontaktOss';
import { SakOppslag } from './../types/SakOppslag';
import { SøkerinfoDTO } from './../types/SøkerinfoDTO';
import { getAlleYtelser } from './../utils/sakerUtils';
import OversiktRoutes from './routes';

interface Props {
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
}

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({ søkerinfo, saker }) => {
    const isFirstRender = useRef(true);

    return (
        <>
            <Routes>
                <Route element={<Breadcrumb />}>
                    <Route element={<RedirectTilSakHvisDetKunFinnesEn saker={saker} />}>
                        <Route
                            path={`${OversiktRoutes.HOVEDSIDE}/:redirect?`}
                            element={<Forside saker={saker} isFirstRender={isFirstRender} søkerinfo={søkerinfo} />}
                        />
                        <Route
                            path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/:redirect?`}
                            element={<SakComponent />}
                        >
                            <Route
                                index
                                element={<Saksoversikt søkerinfo={søkerinfo} isFirstRender={isFirstRender} />}
                            />
                            <Route path={OversiktRoutes.DOKUMENTER} element={<DokumenterPage />} />
                            <Route
                                path={OversiktRoutes.TIDSLINJEN}
                                element={<TidslinjePage søkersBarn={søkerinfo.søker.barn ?? []} />}
                            />
                            <Route
                                path={`${OversiktRoutes.OPPGAVER}/:oppgaveId`}
                                element={<MinidialogPage fnr={søkerinfo.søker.fnr} />}
                            />
                            <Route path={OversiktRoutes.ETTERSEND} element={<EttersendingPage saker={saker} />} />
                            {/*<Route path={OversiktRoutes.INNTEKTSMELDING} element={<InntektsmeldingPage />} />*/}
                        </Route>
                        <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
                    </Route>
                </Route>
            </Routes>
            <KontaktOss />
        </>
    );
};

/**
 * Denne wrapperen ligger rundt alle routene våre og vil gjøre en redirect til aktuell sak kun dersom:
 * 1. Bruker har kun 1 sak
 * 2. Bruker besøkte "/" for første gang
 *
 * Vi ønsker ikke å redirecte til sak dersom bruker allerede er på en underside på saken, eller at bruker navigerer tilbake til forside via breadcrumbs
 */
function RedirectTilSakHvisDetKunFinnesEn({ saker }: { saker: SakOppslag }) {
    const navigate = useNavigate();

    const alleSaker = getAlleYtelser(saker);
    const harKunDetteSaksnummeret = alleSaker.length === 1 ? alleSaker[0].saksnummer : undefined;

    const viErPåLandingSiden = useMatch(OversiktRoutes.HOVEDSIDE);
    const [tillatRedirect, setTillatRedirect] = useState(true);

    const landetPåHovedsideOgHarIkkeRedirected = viErPåLandingSiden && tillatRedirect;

    // Etter første gang denne komponenten rendres skal det ikke lenger tillates redirects.
    useEffect(() => {
        setTillatRedirect(false);
    }, []);

    useEffect(() => {
        if (landetPåHovedsideOgHarIkkeRedirected && harKunDetteSaksnummeret) {
            navigate(`${OversiktRoutes.SAKSOVERSIKT}/${harKunDetteSaksnummeret}`);
        }
    }, [landetPåHovedsideOgHarIkkeRedirected, navigate, harKunDetteSaksnummeret]);

    return <Outlet />;
}

export function PageRouteLayout({ header, children }: { header: ReactNode; children: ReactNode }) {
    return (
        <>
            {header}
            <LayoutWrapper className="md:pb-28 pb-4 pl-4 pr-4">{children}</LayoutWrapper>
            {/*Viktig at Snarveier ligger her slik at den har tilgang til saksnummer fra Route da snarveien er dynamiske*/}
            <Snarveier />
        </>
    );
}

export default ForeldrepengeoversiktRoutes;
