import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, Modal } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { HvaVilDuGjøre } from '../legg-til-periode-modal/types/LeggTilPeriodeModalFormValues';
import { EndrePeriodeModalStep } from './steps/EndrePeriodeModalStep';
import { VelgPeriodeModalStep } from './steps/VelgPeriodeModalStep';

const ARIA_LABEL_ID = 'endre-periode-modal-heading';

interface Props {
    closeModal: () => void | undefined;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    permisjonsperiode: Permisjonsperiode;
    inneholderKunEnPeriode: boolean;
    isModalOpen: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

type ModalStep = 'step1' | 'step2';

export interface ModalData {
    valgtPeriode: Planperiode | undefined;
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
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
    handleAddPeriode,
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

    const closeModalWrapper = () => {
        setModalData(initialModalState);
        closeModal();
    };

    return (
        <Modal className="w-[100%]" open={isModalOpen} aria-labelledby={ARIA_LABEL_ID} onClose={closeModalWrapper}>
            <Modal.Header className="bg-ax-neutral-200A mb-4" closeButton={false}>
                <HStack gap="space-8" align="center">
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="endrePeriodeModal.tittel" />
                    </Heading>
                </HStack>
            </Modal.Header>
            <Modal.Body>
                {currentStep === 'step1' && (
                    <VelgPeriodeModalStep
                        perioder={permisjonsperiode.perioder}
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                    />
                )}
                {currentStep === 'step2' && (
                    <EndrePeriodeModalStep
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModalWrapper}
                        handleUpdatePeriode={handleUpdatePeriode}
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                        handleAddPeriode={handleAddPeriode}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};
