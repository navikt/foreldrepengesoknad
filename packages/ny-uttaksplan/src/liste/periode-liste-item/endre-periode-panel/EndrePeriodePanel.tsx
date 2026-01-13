import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';

import { Uttaksplanperiode } from '../../../types/UttaksplanPeriode';
import { HvaVilDuGjøre } from '../../types/LeggTilPeriodePanelFormValues';
import { EndrePeriodePanelStep } from './steps/EndrePeriodePanelStep';
import { VelgPeriodePanelStep } from './steps/VelgPeriodePanelStep';

const ARIA_LABEL_ID = 'endre-periode-panel-heading';

interface Props {
    closePanel: () => void;
    uttaksplanperioder: Uttaksplanperiode[];
    inneholderKunEnPeriode: boolean;
}

type PanelStep = 'step1' | 'step2';

export type PanelData = {
    valgtPeriode?: Uttaksplanperiode;
    hvaVilDuGjøre?: HvaVilDuGjøre;
    currentStep: PanelStep;
    fom?: string;
    tom?: string;
    forelder?: BrukerRolleSak_fpoversikt;
    kontoType?: KontoTypeUttak;
    årsak?: 'LOVBESTEMT_FERIE' | 'PERIODE_UTEN_UTTAK';
    stillingsprosent?: string;
    skalDuJobbe?: boolean;
};

export const EndrePeriodePanel = ({ closePanel, uttaksplanperioder, inneholderKunEnPeriode }: Props) => {
    const kunEnPeriode = uttaksplanperioder.length === 1;

    const initialPanelState: PanelData = {
        valgtPeriode: kunEnPeriode ? uttaksplanperioder[0] : undefined,
        currentStep: kunEnPeriode ? 'step2' : 'step1',
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
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
                    />
                )}
            </div>
        </div>
    );
};
