import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { HvaVilDuGjøre } from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';
import { EndrePeriodePanelStep } from './steps/EndrePeriodePanelStep';
import { VelgPeriodePanelStep } from './steps/VelgPeriodePanelStep';

const ARIA_LABEL_ID = 'endre-periode-panel-heading';

interface Props {
    closePanel: () => void | undefined;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    permisjonsperiode: Permisjonsperiode;
    inneholderKunEnPeriode: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

type PanelStep = 'step1' | 'step2';

export interface PanelData {
    valgtPeriode: Planperiode | undefined;
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    currentStep: PanelStep;
    fom?: string;
    tom?: string;
    forelder?: BrukerRolleSak_fpoversikt;
    kontoType: KontoTypeUttak | undefined;
    årsak?: 'LOVBESTEMT_FERIE' | PeriodeHullType.PERIODE_UTEN_UTTAK;
    stillingsprosent?: string;
    skalDuJobbe?: boolean;
}

export const EndrePeriodePanel = ({
    closePanel,
    permisjonsperiode,
    handleUpdatePeriode,
    handleAddPeriode,
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

    const closePanelWrapper = () => {
        setPanelData(initialPanelState);
        closePanel();
    };

    return (
        <div aria-labelledby={ARIA_LABEL_ID} data-panel="endre-periode">
            <div className="mb-4">
                <HStack gap="space-8" align="center">
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="endrePeriodePanel.tittel" />
                    </Heading>
                </HStack>
            </div>
            <div>
                {currentStep === 'step1' && (
                    <VelgPeriodePanelStep
                        perioder={permisjonsperiode.perioder}
                        panelData={panelData}
                        setPanelData={setPanelData}
                        closePanel={closePanelWrapper}
                    />
                )}
                {currentStep === 'step2' && (
                    <EndrePeriodePanelStep
                        panelData={panelData}
                        setPanelData={setPanelData}
                        closePanel={closePanelWrapper}
                        handleUpdatePeriode={handleUpdatePeriode}
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                        handleAddPeriode={handleAddPeriode}
                    />
                )}
            </div>
        </div>
    );
};
