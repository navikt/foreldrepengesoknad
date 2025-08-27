import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, Modal } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';

import { Planperiode } from '../../types/Planperiode';
import styles from './leggTilPeriodeModal.module.css';
import { LeggTilPeriodeModalStep } from './steps/LeggTilPeriodeModalStep';
import { HvaVilDuGjøre } from './types/LeggTilPeriodeModalFormValues';

interface Props {
    closeModal: () => void | undefined;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    isModalOpen: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

export interface ModalData {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
    fom?: string;
    tom?: string;
    kontoType?: StønadskontoType;
    forelder?: Forelder;
}

export const LeggTilPeriodeModal = ({
    closeModal,
    handleAddPeriode,
    isModalOpen,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const initialModalState: ModalData = {
        hvaVilDuGjøre: undefined,
        fom: undefined,
        tom: undefined,
        kontoType: undefined,
        forelder: undefined,
    };

    const [modalData, setModalData] = useState<ModalData>(initialModalState);

    const ariaLabelId = 'legg-til-periode-modal-heading';

    const closeModalWrapper = () => {
        setModalData(initialModalState);
        closeModal();
    };

    return (
        <Modal className={styles.modal} open={isModalOpen} aria-labelledby={ariaLabelId} onClose={closeModalWrapper}>
            <Modal.Header className={styles.header} closeButton={false}>
                <div className={styles.headerContent}>
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ariaLabelId}>
                        <FormattedMessage id="uttaksplan.leggTilPeriode" />
                    </Heading>
                </div>
            </Modal.Header>
            <Modal.Body>
                <LeggTilPeriodeModalStep
                    modalData={modalData}
                    setModalData={setModalData}
                    closeModal={closeModalWrapper}
                    erBarnetFødt={erBarnetFødt}
                    gjelderAdopsjon={gjelderAdopsjon}
                    handleAddPeriode={handleAddPeriode}
                />
            </Modal.Body>
        </Modal>
    );
};
