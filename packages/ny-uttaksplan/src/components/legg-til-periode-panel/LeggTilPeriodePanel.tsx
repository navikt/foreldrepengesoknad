import { PencilIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-constants';
import { KontoTypeUttak_fpoversikt } from '@navikt/fp-types';

import { Planperiode } from '../../types/Planperiode';
import { LeggTilPeriodePanelStep } from './steps/LeggTilPeriodePanelStep';
import { HvaVilDuGjøre } from './types/LeggTilPeriodePanelFormValues';

export interface PanelData {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    fom?: string;
    tom?: string;
    kontoType?: KontoTypeUttak_fpoversikt;
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
                erBarnetFødt={erBarnetFødt}
                gjelderAdopsjon={gjelderAdopsjon}
                handleAddPeriode={handleAddPeriode}
            />
        </VStack>
    );
};
