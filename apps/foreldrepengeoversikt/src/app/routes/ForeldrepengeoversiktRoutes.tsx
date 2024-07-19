import { ReactNode, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { bemUtils } from '@navikt/fp-utils';

import Snarveier from 'app/components/snarveier/Snarveier';
import { default as SakComponent } from 'app/pages/Sak';
import DinPlanPage from 'app/pages/din-plan-page/DinPlanPage';
import DokumenterPage from 'app/pages/dokumenter-page/DokumenterPage';
import EttersendingPage from 'app/pages/ettersending/EttersendingPage';
import Forside from 'app/pages/forside/Forside';
import MinidialogPage from 'app/pages/minidialog-page/MinidialogPage';
import Saksoversikt from 'app/pages/saksoversikt/Saksoversikt';
import TidslinjePage from 'app/pages/tidslinje-page/TidslinjePage';
import KontaktOss from 'app/sections/kontakt-oss/KontaktOss';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { getAntallSaker } from 'app/utils/sakerUtils';

import OversiktRoutes from './routes';
import './routes-wrapper.css';

interface Props {
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
}

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({ søkerinfo, saker }) => {
    const isFirstRender = useRef(true);
    const hasNavigated = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasNavigated.current) {
            hasNavigated.current = true;
            const antallSaker = getAntallSaker(saker);
            const { foreldrepenger, engangsstønad, svangerskapspenger } = saker;
            if (antallSaker === 1) {
                if (foreldrepenger.length === 1) {
                    navigate(`${OversiktRoutes.SAKSOVERSIKT}/${foreldrepenger[0].saksnummer}`);
                }

                if (engangsstønad.length === 1) {
                    navigate(`${OversiktRoutes.SAKSOVERSIKT}/${engangsstønad[0].saksnummer}`);
                }

                if (svangerskapspenger.length === 1) {
                    navigate(`${OversiktRoutes.SAKSOVERSIKT}/${svangerskapspenger[0].saksnummer}`);
                }
            }
        }
    }, [navigate, saker]);

    return (
        <>
            <Routes>
                <Route
                    path={`${OversiktRoutes.HOVEDSIDE}/:redirect?`}
                    element={<Forside saker={saker} isFirstRender={isFirstRender} søkerinfo={søkerinfo} />}
                />
                <Route path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/:redirect?`} element={<SakComponent />}>
                    <Route index element={<Saksoversikt søkerinfo={søkerinfo} isFirstRender={isFirstRender} />} />
                    <Route path={OversiktRoutes.DIN_PLAN} element={<DinPlanPage søkerinfo={søkerinfo} />} />
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
                </Route>
                <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
            </Routes>
            <Snarveier />
            <KontaktOss />
        </>
    );
};

export function PageRouteLayout({ header, children }: { readonly header: ReactNode; readonly children: ReactNode }) {
    const bem = bemUtils('routesWrapper');

    return (
        <>
            {header}
            <div className={bem.block}>{children}</div>
        </>
    );
}

export default ForeldrepengeoversiktRoutes;
