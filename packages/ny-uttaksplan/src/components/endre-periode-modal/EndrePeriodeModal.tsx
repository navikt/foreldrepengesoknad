import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, Modal } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import styles from './endrePeriodeModal.module.css';
import { EndrePeriodeModalStep } from './steps/EndrePeriodeModalStep';
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
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
    stillingsprosent?: string;
    skalDuJobbe?: boolean;
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
        skalDuJobbe: undefined,
        stillingsprosent: undefined,
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
            case 'step2':
                return (
                    <EndrePeriodeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                        handleUpdatePeriode={handleUpdatePeriode}
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                    />
                );
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
                        <FormattedMessage id="endrePeriodeModal.tittel" />
                    </Heading>
                </div>
            </Modal.Header>
            <Modal.Body>{renderContent()}</Modal.Body>
        </Modal>
    );
};
