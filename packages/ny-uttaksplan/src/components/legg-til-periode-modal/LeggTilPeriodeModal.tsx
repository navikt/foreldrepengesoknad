import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, Modal } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import styles from './leggTilPeriodeModal.module.css';
import { EndreTidsperiodeModalStep } from './steps/EndreTidsperiodeModalStep';
import { LeggTilPeriodeModalStep } from './steps/LeggTilPeriodeModalStep';
import { HvaVilDuGjøre, ValgModalStep } from './steps/ValgModalStep';
import { VelgOppholdsårsakModalStep } from './steps/VelgOppholdsårsakModalStep';

interface Props {
    closeModal: () => void | undefined;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    familiehendelsedato: string;
    isModalOpen: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
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

export const LeggTilPeriodeModal = ({
    closeModal,
    handleAddPeriode,
    familiehendelsedato,
    isModalOpen,
    erBarnetFødt,
    gjelderAdopsjon,
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

    const { hvaVilDuGjøre } = modalData;

    const ariaLabelId = 'legg-til-periode-modal-heading';

    const closeModalWrapper = () => {
        setModalData(initialModalState);
        closeModal();
    };

    const renderContent = () => {
        switch (currentStep) {
            case 'step1':
                return (
                    <ValgModalStep modalData={modalData} setModalData={setModalData} closeModal={closeModalWrapper} />
                );
            case 'step2':
                if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD) {
                    return (
                        <VelgOppholdsårsakModalStep
                            modalData={modalData}
                            setModalData={setModalData}
                            closeModal={closeModalWrapper}
                        />
                    );
                }

                return (
                    <LeggTilPeriodeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                        handleAddPeriode={handleAddPeriode}
                    />
                );
            case 'step3':
                return (
                    <EndreTidsperiodeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                        familiehendelsedato={familiehendelsedato}
                        handleAddPeriode={handleAddPeriode}
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
                        <FormattedMessage id="uttaksplan.leggTilPeriode" />
                    </Heading>
                </div>
            </Modal.Header>
            <Modal.Body>{renderContent()}</Modal.Body>
        </Modal>
    );
};
