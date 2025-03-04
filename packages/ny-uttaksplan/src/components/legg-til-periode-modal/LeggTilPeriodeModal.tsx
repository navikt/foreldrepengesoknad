import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

import { Heading, Modal } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';

import { Planperiode } from '../../types/Planperiode';
import styles from './leggTilPeriodeModal.module.css';
import { EndreTidsperiodeModalStep } from './steps/EndreTidsperiodeModalStep';
// import { OppsummeringModalStep } from './steps/OppsummeringModalStep';
// import { ValgModalStep } from './steps/ValgModalStep';
import { VelgKontotypeModalStep } from './steps/VelgKontotypeModalStep';

interface Props {
    closeModal: () => void | undefined;
    handleAddPeriode: (oppdatertPeriode: Planperiode) => void;
    familiehendelsedato: string;
    isModalOpen: boolean;
    erBarnetFødt: boolean;
}

export type ModalStep = 'step1' | 'step2' | 'step3' | 'step4';

export interface ModalData {
    hvaVilDuGjøre: string | undefined;
    currentStep: ModalStep;
    fom?: string;
    tom?: string;
    kontoType?: StønadskontoType;
    forelder?: Forelder;
}

export const LeggTilPeriodeModal = ({
    closeModal,
    handleAddPeriode,
    familiehendelsedato,
    isModalOpen,
    erBarnetFødt,
}: Props) => {
    const initialModalState: ModalData = {
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        currentStep: 'step1',
        kontoType: undefined,
        forelder: undefined,
    };

    const [modalData, setModalData] = useState<ModalData>(initialModalState);
    const { currentStep } = modalData;

    const ariaLabelId = 'legg-til-periode-modal-heading';

    const closeModalWrapper = () => {
        setModalData(initialModalState);
        closeModal();
    };

    const renderContent = () => {
        switch (currentStep) {
            // case 'step1':
            //     return (
            //         <ValgModalStep
            //             modalData={modalData}
            //             setModalData={setModalData}
            //             closeModal={closeModalWrapper}
            //         />
            //     );
            case 'step1':
                return (
                    <VelgKontotypeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                    />
                );
            case 'step2':
                return (
                    <EndreTidsperiodeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                        familiehendelsedato={familiehendelsedato}
                        handleAddPeriode={handleAddPeriode}
                        erBarnetFødt={erBarnetFødt}
                    />
                );

            // case 'step3':
            //     return (
            //         <OppsummeringModalStep
            //             modalData={modalData}
            //             setModalData={setModalData}
            //             closeModal={closeModalWrapper}
            //             handleAddPeriode={handleAddPeriode}
            //         />
            //     );
            default:
                return null;
        }
    };

    return (
        <Modal className={styles.modal} open={isModalOpen} aria-labelledby={ariaLabelId} onClose={closeModalWrapper}>
            <Modal.Header className={styles.header} closeButton={false}>
                <div className={styles.headerContent}>
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ariaLabelId}>
                        Legg til periode
                    </Heading>
                </div>
            </Modal.Header>
            <Modal.Body>{renderContent()}</Modal.Body>
        </Modal>
    );
};
