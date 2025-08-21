import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { LeggTilPeriodePanelStep } from './steps/LeggTilPeriodePanelStep';
import { HvaVilDuGjøre, ValgPanelStep } from './steps/ValgPanelStep';

interface Props {
    handleAddPeriode: (periode: Planperiode) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
    onCancel: () => void;
}

type PanelStep = 'step1' | 'step2' | 'step3' | 'step4';

export interface PanelData {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    currentStep: PanelStep;
    fom?: string;
    tom?: string;
    kontoType?: StønadskontoType;
    forelder?: Forelder;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
}

export function LeggTilPeriodePanel({ handleAddPeriode, erBarnetFødt, gjelderAdopsjon, onCancel }: Props) {
    const initialPanelState: PanelData = {
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        currentStep: 'step1',
        kontoType: undefined,
        forelder: undefined,
        årsak: undefined,
    };

    const [panelData, setPanelData] = useState<PanelData>(initialPanelState);
    const { currentStep, hvaVilDuGjøre } = panelData;

    const closeBox = () => {
        setPanelData(initialPanelState);
        onCancel();
    };

    const renderContent = () => {
        switch (currentStep) {
            case 'step1':
                return <ValgPanelStep panelData={panelData} setPanelData={setPanelData} closePanel={closeBox} />;
            case 'step2':
                return (
                    <LeggTilPeriodePanelStep
                        panelData={panelData}
                        setPanelData={setPanelData}
                        closePanel={closeBox}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                        handleAddPeriode={handleAddPeriode}
                        isOpphold={hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD}
                    />
                );
            default:
                return null;
        }
    };
    // Todo: deaktiver når åpnes? At innholder
    return (
        <div className="border rounded-lg bg-white">
            <div className="flex items-center gap-2 p-4 bg-grayalpha-100">
                <PencilIcon aria-hidden={true} width={24} height={24} />
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Heading>
            </div>
            {renderContent()}
        </div>
    );
}
