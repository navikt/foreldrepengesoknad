import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

import { Heading, Modal } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import styles from './endrePeriodeModal.module.css';
import { EndreTidsperiodeModalStep } from './steps/EndreTidsperiodeModalStep';
// import { OppsummeringModalStep } from './steps/OppsummeringModalStep';
// import { ValgModalStep } from './steps/ValgModalStep';
import { VelgPeriodeModalStep } from './steps/VelgPeriodeModalStep';

interface Props {
    closeModal: () => void | undefined;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    permisjonsperiode: Permisjonsperiode;
    inneholderKunEnPeriode: boolean;
    isModalOpen: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

export type ModalStep = 'step1' | 'step2' | 'step3' | 'step4';

export interface ModalData {
    valgtPeriode: Planperiode | undefined;
    hvaVilDuGjøre: string | undefined;
    currentStep: ModalStep;
    fom?: string;
    tom?: string;
    forelder?: Forelder;
    kontoType: StønadskontoType | undefined;
}

export const EndrePeriodeModal = ({
    closeModal,
    permisjonsperiode,
    handleUpdatePeriode,
    inneholderKunEnPeriode,
    isModalOpen,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const kunEnPeriode = permisjonsperiode.perioder.length === 1;
    const initialModalState: ModalData = {
        valgtPeriode: kunEnPeriode ? permisjonsperiode.perioder[0] : undefined,
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        currentStep: kunEnPeriode ? 'step2' : 'step1',
        forelder: undefined,
        kontoType: undefined,
    };

    const [modalData, setModalData] = useState<ModalData>(initialModalState);
    const { currentStep } = modalData;

    const ariaLabelId = 'endre-periode-modal-heading';

    const closeModalWrapper = () => {
        setModalData(initialModalState);
        closeModal();
    };

    const renderContent = () => {
        switch (currentStep) {
            case 'step1':
                return (
                    <VelgPeriodeModalStep
                        perioder={permisjonsperiode.perioder}
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                    />
                );
            // case 'step2':
            //     return (
            //         <ValgModalStep
            //             modalData={modalData}
            //             setModalData={setModalData}
            //             closeModal={closeModalWrapper}
            //             kunEnPeriode={kunEnPeriode}
            //         />
            //     );
            case 'step2':
                return (
                    <EndreTidsperiodeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                        handleUpdatePeriode={handleUpdatePeriode}
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                    />
                );
            // case 'step3':
            //     return (
            //         <OppsummeringModalStep
            //             modalData={modalData}
            //             setModalData={setModalData}
            //             closeModal={closeModalWrapper}
            //             handleUpdatePeriode={handleUpdatePeriode}
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
                        Endre periode
                    </Heading>
                </div>
            </Modal.Header>
            <Modal.Body>{renderContent()}</Modal.Body>
        </Modal>
    );
};
