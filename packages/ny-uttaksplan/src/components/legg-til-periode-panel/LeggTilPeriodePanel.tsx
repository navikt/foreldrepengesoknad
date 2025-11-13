import { PencilIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';

import { Planperiode } from '../../types/Planperiode';
import { LeggTilPeriodePanelStep } from './steps/LeggTilPeriodePanelStep';
import { HvaVilDuGjøre } from './types/LeggTilPeriodePanelFormValues';

export interface PanelData {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    fom?: string;
    tom?: string;
    kontoType?: KontoTypeUttak;
    forelder?: BrukerRolleSak_fpoversikt;
}

interface Props {
    onCancel?: () => void;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
}

export const LeggTilPeriodePanel = ({ onCancel, handleAddPeriode }: Props) => {
    const panelData: PanelData = {
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        kontoType: undefined,
        forelder: undefined,
    };

    return (
        <VStack gap="space-8" className="border-border-subtle bg-surface-default w-full rounded-xl border p-4">
            <HStack gap="space-8" align="center" className="bg-ax-bg-neutral-soft -m-4 mb-0 rounded-t-xl p-4">
                <PencilIcon aria-hidden={true} width={24} height={24} />
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Heading>
            </HStack>
            <LeggTilPeriodePanelStep
                panelData={panelData}
                closePanel={onCancel || (() => {})}
                handleAddPeriode={handleAddPeriode}
            />
        </VStack>
    );
};
