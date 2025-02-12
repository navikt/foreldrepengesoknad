import { PencilIcon } from '@navikt/aksel-icons';
import React, { useState } from 'react';

import { Heading, Modal } from '@navikt/ds-react';

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
    familiehendelsedato: string;
    inneholderKunEnPeriode: boolean;
    ref?: React.Ref<HTMLDialogElement>;
}

export type ModalStep = 'step1' | 'step2' | 'step3' | 'step4';

export interface ModalData {
    valgtPeriode: Planperiode | undefined;
    hvaVilDuGjøre: string | undefined;
    currentStep: ModalStep;
    fom?: string;
    tom?: string;
}

export const EndrePeriodeModal = ({
    closeModal,
    permisjonsperiode,
    handleUpdatePeriode,
    familiehendelsedato,
    inneholderKunEnPeriode,
    ref,
}: Props) => {
    const kunEnPeriode = permisjonsperiode.perioder.length === 1;
    const initialModalState: ModalData = {
        valgtPeriode: kunEnPeriode ? permisjonsperiode.perioder[0] : undefined,
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        currentStep: kunEnPeriode ? 'step2' : 'step1',
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
                        familiehendelsedato={familiehendelsedato}
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                        handleUpdatePeriode={handleUpdatePeriode}
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
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
        <Modal className={styles.modal} ref={ref} aria-labelledby={ariaLabelId} onClose={closeModalWrapper}>
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
