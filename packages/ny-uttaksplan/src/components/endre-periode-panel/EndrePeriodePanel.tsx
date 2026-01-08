import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import {
    BrukerRolleSak_fpoversikt,
    KontoTypeUttak,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { Uttaksplanperiode } from '../../types/UttaksplanPeriode';
import { HvaVilDuGjøre } from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';
import { EndrePeriodePanelStep } from './steps/EndrePeriodePanelStep';
import { VelgPeriodePanelStep } from './steps/VelgPeriodePanelStep';

const ARIA_LABEL_ID = 'endre-periode-panel-heading';

interface Props {
    closePanel: () => void;
    handleUpdatePeriode: (
        oppdatertPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
        gammelPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    ) => void;
    handleAddPeriode: (nyPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => void;
    handleDeletePerioder: (slettedePerioder: Array<{ fom: string; tom: string }>) => void;
    uttaksplanperioder: Uttaksplanperiode[];
    inneholderKunEnPeriode: boolean;
}

type PanelStep = 'step1' | 'step2';

export interface PanelData {
    valgtPeriode: Uttaksplanperiode | undefined;
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    currentStep: PanelStep;
    fom?: string;
    tom?: string;
    forelder?: BrukerRolleSak_fpoversikt;
    kontoType: KontoTypeUttak | undefined;
    årsak?: 'LOVBESTEMT_FERIE' | 'PERIODE_UTEN_UTTAK';
    stillingsprosent?: string;
    skalDuJobbe?: boolean;
}

export const EndrePeriodePanel = ({
    closePanel,
    uttaksplanperioder,
    handleUpdatePeriode,
    handleAddPeriode,
    handleDeletePerioder,
    inneholderKunEnPeriode,
}: Props) => {
    const kunEnPeriode = uttaksplanperioder.length === 1;

    const initialPanelState: PanelData = {
        valgtPeriode: kunEnPeriode ? uttaksplanperioder[0] : undefined,
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
                        perioder={uttaksplanperioder}
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
                        handleAddPeriode={handleAddPeriode}
                        handleDeletePerioder={handleDeletePerioder}
                    />
                )}
            </div>
        </div>
    );
};
