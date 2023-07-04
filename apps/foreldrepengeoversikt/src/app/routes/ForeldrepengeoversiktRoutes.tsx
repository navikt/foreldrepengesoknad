import { useEffect, useRef } from 'react';
import OversiktRoutes from './routes';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Saksoversikt from 'app/pages/saksoversikt/Saksoversikt';
import { bemUtils } from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { default as SakComponent } from 'app/pages/Sak';
import DinPlanPage from 'app/pages/din-plan-page/DinPlanPage';
import Forside from 'app/pages/forside/Forside';
import Header from 'app/components/header/Header';
import DokumenterPage from 'app/pages/dokumenter-page/DokumenterPage';
import { SakOppslag } from 'app/types/SakOppslag';

import './routes-wrapper.css';
import { getAlleYtelser, getAntallSaker, grupperSakerPåBarn } from 'app/utils/sakerUtils';
import MinidialogPage from 'app/pages/minidialog-page/MinidialogPage';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { AxiosError } from 'axios';
import EttersendingPage from 'app/pages/ettersending/EttersendingPage';
import Snarveier from 'app/components/snarveier/Snarveier';
import KontaktOss from 'app/sections/kontakt-oss/KontaktOss';
import TidslinjePage from 'app/pages/tidslinje-page/TidslinjePage';

interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
    oppdatertData: boolean;
}

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({
    søkerinfo,
    saker,
    minidialogerData,
    minidialogerError,
    oppdatertData,
}) => {
    const bem = bemUtils('routesWrapper');
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

    const oppgaverIds = minidialogerData ? minidialogerData.map((oppgave) => oppgave.dialogId) : [];
    const grupperteSaker = grupperSakerPåBarn(søkerinfo.søker.barn, saker);
    const alleYtelser = getAlleYtelser(saker);
    // Super spesifikt case for avslåtte papirsøknad for svangerskapspenger. Bør fjernes
    const avslåttSvangerskapspengesak =
        grupperteSaker.length === 0 && alleYtelser.length === 1 && saker.svangerskapspenger.length === 1
            ? saker.svangerskapspenger[0]
            : undefined;

    return (
        <>
            <Header grupperteSaker={grupperteSaker} oppgaverIds={oppgaverIds} />
            <div className={bem.block}>
                <Routes>
                    <Route
                        path={OversiktRoutes.HOVEDSIDE}
                        element={
                            <Forside
                                alleYtelser={alleYtelser}
                                grupperteSaker={grupperteSaker}
                                avslåttSvangerskapspengesak={avslåttSvangerskapspengesak}
                                oppdatertData={oppdatertData}
                            />
                        }
                    />
                    <Route path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer`} element={<SakComponent />}>
                        <Route
                            index
                            element={
                                <Saksoversikt
                                    minidialogerData={minidialogerData}
                                    minidialogerError={minidialogerError}
                                    saker={saker}
                                    søkerinfo={søkerinfo}
                                />
                            }
                        />
                        <Route
                            path={OversiktRoutes.DIN_PLAN}
                            element={<DinPlanPage navnPåSøker={søkerinfo.søker.fornavn} søkerinfo={søkerinfo} />}
                        />
                        <Route
                            path={OversiktRoutes.DOKUMENTER}
                            element={<DokumenterPage fnr={søkerinfo.søker.fnr} />}
                        />
                        <Route
                            path={OversiktRoutes.TIDSLINJEN}
                            element={<TidslinjePage saker={saker} søkersBarn={søkerinfo.søker.barn} />}
                        />
                        <Route
                            path={`${OversiktRoutes.OPPGAVER}/:oppgaveId`}
                            element={
                                <MinidialogPage
                                    minidialoger={minidialogerData}
                                    saker={saker}
                                    fnr={søkerinfo.søker.fnr}
                                />
                            }
                        />
                        <Route path={OversiktRoutes.ETTERSEND} element={<EttersendingPage saker={saker} />} />
                    </Route>
                    <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
                </Routes>
            </div>
            <Snarveier saker={saker} />
            <KontaktOss />
        </>
    );
};

export default ForeldrepengeoversiktRoutes;
