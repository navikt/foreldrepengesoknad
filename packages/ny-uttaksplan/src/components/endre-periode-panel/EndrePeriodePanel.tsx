import { useState } from 'react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import styles from './endrePeriodePanel.module.css';
import { EndrePeriodePanelStep } from './steps/EndrePeriodePanelStep';
import { VelgPeriodePanelStep } from './steps/VelgPeriodePanelStep';

interface Props {
    closePanel: () => void | undefined;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    permisjonsperiode: Permisjonsperiode;
    inneholderKunEnPeriode: boolean;
    isPanelOpen: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

type PanelStep = 'step1' | 'step2' | 'step3' | 'step4';

export interface PanelData {
    valgtPeriode: Planperiode | undefined;
    hvaVilDuGjøre: string | undefined;
    currentStep: PanelStep;
    fom?: string;
    tom?: string;
    forelder?: Forelder;
    kontoType: StønadskontoType | undefined;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
    stillingsprosent?: string;
    skalDuJobbe?: boolean;
}

export const EndrePeriodePanel = ({
    closePanel,
    permisjonsperiode,
    handleUpdatePeriode,
    inneholderKunEnPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const kunEnPeriode = permisjonsperiode.perioder.length === 1;

    const initialPanelState: PanelData = {
        valgtPeriode: kunEnPeriode ? permisjonsperiode.perioder[0] : undefined,
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        currentStep: kunEnPeriode ? 'step2' : 'step1',
        forelder: undefined,
        kontoType: undefined,
        skalDuJobbe: undefined,
        stillingsprosent: undefined,
    };

    const [panelData, setPanelData] = useState<PanelData>(initialPanelState);
    const { currentStep } = panelData;

    const ariaLabelId = 'endre-periode-panel-heading';

    const closePanelWrapper = () => {
        setPanelData(initialPanelState);
        closePanel();
    };

    const renderContent = () => {
        switch (currentStep) {
            case 'step1':
                return (
                    <VelgPeriodePanelStep
                        perioder={permisjonsperiode.perioder}
                        panelData={panelData}
                        setPanelData={setPanelData}
                        closePanel={closePanelWrapper}
                    />
                );
            case 'step2':
                return (
                    <EndrePeriodePanelStep
                        closePanel={closePanelWrapper}
                        panelData={panelData}
                        setPanelData={setPanelData}
                        handleUpdatePeriode={handleUpdatePeriode}
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.modal} aria-labelledby={ariaLabelId}>
            <div>{renderContent()}</div>
        </div>
    );
};
