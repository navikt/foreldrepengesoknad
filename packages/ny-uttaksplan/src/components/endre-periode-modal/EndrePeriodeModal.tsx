import { PencilIcon } from '@navikt/aksel-icons';
import { forwardRef, useState } from 'react';

import { Heading, Modal } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import Permisjonsperiode from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import styles from './endrePeriodeModal.module.css';
import { EndreTidsperiodeModalStep } from './steps/EndreTidsperiodeModalStep';
import { OppsummeringModalStep } from './steps/OppsummeringModalStep';
import { ValgModalStep } from './steps/ValgModalStep';
import { VelgPeriodeModalStep } from './steps/VelgPeriodeModalStep';

interface Props {
    closeModal: () => void | undefined;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    permisjonsperiode: Permisjonsperiode;
    familiehendelsedato: string;
}

export type ModalStep = 'step1' | 'step2' | 'step3' | 'step4';

export interface ModalData {
    valgtPeriode: Planperiode | undefined;
    hvaVilDuGjøre: string | undefined;
    currentStep: ModalStep;
    fom?: string;
    tom?: string;
    familiehendelsedato?: string;
}

export const EndrePeriodeModal = forwardRef<HTMLDialogElement, Props>(
    ({ closeModal, permisjonsperiode, handleUpdatePeriode }, ref) => {
        const kunEnPeriode = permisjonsperiode.perioder.length === 1;
        const initialModalState: ModalData = {
            valgtPeriode: kunEnPeriode ? permisjonsperiode.perioder[0] : undefined,
            hvaVilDuGjøre: undefined,
            fom: undefined,
            tom: undefined,
            currentStep: kunEnPeriode ? 'step2' : 'step1',
            familiehendelsedato: undefined,
        };
        const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));
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
                case 'step2':
                    return (
                        <ValgModalStep
                            modalData={modalData}
                            setModalData={setModalData}
                            closeModal={closeModalWrapper}
                            kunEnPeriode={kunEnPeriode}
                        />
                    );
                case 'step3':
                    return (
                        <EndreTidsperiodeModalStep
                            familiehendelsedato={familiehendelsedato}
                            modalData={modalData}
                            setModalData={setModalData}
                            closeModal={closeModalWrapper}
                        />
                    );
                case 'step4':
                    return (
                        <OppsummeringModalStep
                            modalData={modalData}
                            setModalData={setModalData}
                            closeModal={closeModalWrapper}
                            handleUpdatePeriode={handleUpdatePeriode}
                        />
                    );
                default:
                    return null;
            }
        };

        return (
            <Modal className={styles.modal} ref={ref} aria-labelledby={ariaLabelId}>
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
    },
);
