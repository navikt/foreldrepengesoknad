import { PencilIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';

import { Planperiode } from '../../types/Planperiode';
import { LeggTilPeriodePanelStep } from './steps/LeggTilPeriodePanelStep';
import { HvaVilDuGjøre } from './types/LeggTilPeriodePanelFormValues';

export interface PanelData {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    fom?: string;
    tom?: string;
    kontoType?: StønadskontoType;
    forelder?: Forelder;
}

interface Props {
    onCancel?: () => void;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

export const LeggTilPeriodePanel = ({ onCancel, handleAddPeriode, erBarnetFødt, gjelderAdopsjon }: Props) => {
    const panelData: PanelData = {
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        kontoType: undefined,
        forelder: undefined,
    };

    return (
        <VStack gap="space-8" className="w-full p-4 border border-border-subtle rounded-xl bg-surface-default">
            <HStack gap="space-8" align="center" className="-m-4 p-4 mb-0 bg-ax-bg-neutral-soft rounded-t-xl">
                <PencilIcon aria-hidden={true} width={24} height={24} />
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Heading>
            </HStack>
            <LeggTilPeriodePanelStep
                panelData={panelData}
                closePanel={onCancel || (() => {})}
                erBarnetFødt={erBarnetFødt}
                gjelderAdopsjon={gjelderAdopsjon}
                handleAddPeriode={handleAddPeriode}
            />
        </VStack>
    );
};

// Backward compatibility
export const LeggTilPeriodeModal = LeggTilPeriodePanel;
export const LeggTilPeriode = LeggTilPeriodePanel;
