import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { LeggTilPeriodeModalStep } from './legg-til-periode-modal/steps/LeggTilPeriodeModalStep';
import { HvaVilDuGjøre, ValgModalStep } from './legg-til-periode-modal/steps/ValgModalStep';

interface Props {
    handleAddPeriode: (periode: Planperiode) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
    onCancel: () => void;
}

export type ModalStep = 'step1' | 'step2' | 'step3' | 'step4';

export interface ModalData {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    currentStep: ModalStep;
    fom?: string;
    tom?: string;
    kontoType?: StønadskontoType;
    forelder?: Forelder;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
}

export function LeggTilPeriodeBox({ handleAddPeriode, erBarnetFødt, gjelderAdopsjon, onCancel }: Props) {
    const initialModalState: ModalData = {
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        currentStep: 'step1',
        kontoType: undefined,
        forelder: undefined,
        årsak: undefined,
    };

    const [modalData, setModalData] = useState<ModalData>(initialModalState);
    const { currentStep, hvaVilDuGjøre } = modalData;

    const closeBox = () => {
        setModalData(initialModalState);
        onCancel();
    };

    const renderContent = () => {
        switch (currentStep) {
            case 'step1':
                return <ValgModalStep modalData={modalData} setModalData={setModalData} closeModal={closeBox} />;
            case 'step2':
                return (
                    <LeggTilPeriodeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeBox}
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

    return (
        <div style={{ border: '1px solid #ddd', padding: 16, marginTop: 16, background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <PencilIcon aria-hidden={true} width={24} height={24} />
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Heading>
            </div>
            {renderContent()}
        </div>
    );
}
