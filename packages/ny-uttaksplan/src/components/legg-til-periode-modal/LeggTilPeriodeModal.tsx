import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, Modal } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { LeggTilPeriodeModalStep } from './steps/LeggTilPeriodeModalStep';
import { HvaVilDuGjøre, ValgModalStep } from './steps/ValgModalStep';

type ModalStep = 'step1' | 'step2';

const ARIA_LABEL_ID = 'legg-til-periode-modal-heading';

export interface ModalData {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    currentStep: ModalStep;
    fom?: string;
    tom?: string;
    kontoType?: StønadskontoType;
    forelder?: Forelder;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
}

interface Props {
    closeModal: () => void;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

export const LeggTilPeriodeModal = ({ closeModal, handleAddPeriode, erBarnetFødt, gjelderAdopsjon }: Props) => {
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
    const { hvaVilDuGjøre, currentStep } = modalData;

    const closeModalWrapper = () => {
        setModalData(initialModalState);
        closeModal();
    };

    return (
        <Modal className="w-[100%]" open aria-labelledby={ARIA_LABEL_ID} onClose={closeModalWrapper}>
            <Modal.Header className="bg-ax-neutral-200A mb-4" closeButton={false}>
                <HStack gap="space-8" align="center">
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="uttaksplan.leggTilPeriode" />
                    </Heading>
                </HStack>
            </Modal.Header>
            <Modal.Body>
                {currentStep === 'step1' && (
                    <ValgModalStep modalData={modalData} setModalData={setModalData} closeModal={closeModalWrapper} />
                )}
                {currentStep === 'step2' && (
                    <LeggTilPeriodeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                        handleAddPeriode={handleAddPeriode}
                        isOpphold={hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};
