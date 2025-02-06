import { BodyShort, Button, Heading } from '@navikt/ds-react';

import { Planperiode } from '../../../types/Planperiode';
import { ModalData } from '../EndrePeriodeModal';

interface Props {
    modalData: ModalData;
    closeModal: () => void;
    setModalData: (data: ModalData) => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
}

export const OppsummeringModalStep = ({ modalData, closeModal, handleUpdatePeriode, setModalData }: Props) => {
    const { valgtPeriode, fom, tom } = modalData;

    if (!valgtPeriode) {
        return null;
    }

    return (
        <>
            <Heading size="medium">Oppsummering av endringer</Heading>
            <BodyShort>Her har du gjort noen endringer</BodyShort>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1rem 0',
                }}
            >
                <div>
                    <Button type="button" variant="secondary" onClick={closeModal}>
                        Avbryt
                    </Button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            setModalData({ ...modalData, currentStep: 'step3' });
                        }}
                    >
                        Gå tilbake
                    </Button>
                    <Button
                        onClick={() => {
                            handleUpdatePeriode({
                                ...valgtPeriode,
                                fom: fom ?? valgtPeriode!.fom,
                                tom: tom ?? valgtPeriode!.tom,
                            });
                            closeModal();
                        }}
                    >
                        Ferdig, legg til i planen
                    </Button>
                </div>
            </div>
        </>
    );
};
