import { ReactNode, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useMatch, useNavigate } from 'react-router-dom';

import { Søkerinfo } from '@navikt/fp-types';

import { Breadcrumb } from '../components/breadcrumb/Breadcrumb';
import { Snarveier } from '../components/snarveier/Snarveier';
import { Sak } from '../pages/Sak';
import { DokumenterPage } from '../pages/dokumenter-page/DokumenterPage';
import { EttersendingPage } from '../pages/ettersending/EttersendingPage';
import { Forside } from '../pages/forside/Forside';
import { InntektsmeldingOversiktPage } from '../pages/inntektsmelding-page/InntektsmeldingOversiktPage';
import { InntektsmeldingPage } from '../pages/inntektsmelding-page/InntektsmeldingPage';
import { MinidialogPage } from '../pages/minidialog-page/MinidialogPage';
import { Saksoversikt } from '../pages/saksoversikt/Saksoversikt';
import { TidslinjePage } from '../pages/tidslinje-page/TidslinjePage';
import { LayoutWrapper } from '../sections/LayoutWrapper';
import { KontaktOss } from '../sections/kontakt-oss/KontaktOss';
import { SakOppslag } from '../types/SakOppslag';
import { getAlleYtelser } from '../utils/sakerUtils';
import { OversiktRoutes } from './routes';

interface Props {
    saker: SakOppslag;
    søkerinfo: Søkerinfo;
}

export const ForeldrepengeoversiktRoutes = ({ søkerinfo, saker }: Props) => {
    const isFirstRender = useRef(true);

    return (
        <>
            <Routes>
                <Route element={<Breadcrumb />}>
                    <Route element={<RedirectTilSakHvisDetKunFinnesEn saker={saker} />}>
                        <Route
                            path={OversiktRoutes.INFORMASJON}
                            element={
                                <PageRouteLayout
                                    header={
                                        <>
                                            <h1 className="text-3xl font-bold text-purple-600 animate-bounce">
                                                🦄 SUPERSØTT UNICORN SIDE 🦄
                                            </h1>
                                            <div className="flex justify-center mt-4">
                                                <img
                                                    src="https://media.giphy.com/media/j0kQJxo5mzGYb4EvWK/giphy.gif"
                                                    alt="Dansende unicorn"
                                                    className="rounded-lg shadow-xl"
                                                />
                                            </div>
                                            <p className="text-center mt-4 text-pink-500 font-bold text-xl">
                                                Dette er en hemmelig side som egentlig ikke finnes! Men nå kan du se den
                                                likevel. Gratulerer!
                                            </p>
                                        </>
                                    }
                                >
                                    <div>
                                        <p>Dette er en proof-of-concept for å vise at rutingen faktisk fungerer!</p>
                                    </div>
                                </PageRouteLayout>
                            }
                        />

                        <Route
                            path={`${OversiktRoutes.HOVEDSIDE}/:redirect?`}
                            element={<Forside saker={saker} isFirstRender={isFirstRender} søkerinfo={søkerinfo} />}
                        />
                        <Route path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/:redirect?`} element={<Sak />}>
                            <Route
                                index
                                element={<Saksoversikt søkerinfo={søkerinfo} isFirstRender={isFirstRender} />}
                            />
                            <Route path={OversiktRoutes.DOKUMENTER} element={<DokumenterPage />} />
                            <Route
                                path={OversiktRoutes.TIDSLINJEN}
                                element={<TidslinjePage søkersBarn={søkerinfo.søker.barn} />}
                            />
                            <Route
                                path={`${OversiktRoutes.OPPGAVER}/:oppgaveId`}
                                element={<MinidialogPage fnr={søkerinfo.søker.fnr} />}
                            />
                            <Route path={OversiktRoutes.ETTERSEND} element={<EttersendingPage saker={saker} />} />
                            <Route path={OversiktRoutes.INNTEKTSMELDING} element={<InntektsmeldingOversiktPage />} />
                            <Route
                                path={`${OversiktRoutes.INNTEKTSMELDING}/:journalpostId`}
                                element={<InntektsmeldingPage />}
                            />
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
function RedirectTilSakHvisDetKunFinnesEn({ saker }: { readonly saker: SakOppslag }) {
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

export function PageRouteLayout({ header, children }: { readonly header: ReactNode; readonly children: ReactNode }) {
    return (
        <>
            {header}
            <LayoutWrapper className="md:pb-28 pb-4 pl-4 pr-4">{children}</LayoutWrapper>
            {/*Viktig at Snarveier ligger her slik at den har tilgang til saksnummer fra Route da snarveien er dynamiske*/}
            <Snarveier />
        </>
    );
}
