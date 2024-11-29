import { PencilIcon } from '@navikt/aksel-icons';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Heading, Modal, Radio } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import styles from './endrePeriodeModal.module.css';

interface Props {
    closeModal: () => void | undefined;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    permisjonsperiode: Permisjonsperiode;
}

export const EndrePeriodeModal = forwardRef<HTMLDialogElement, Props>(
    ({ closeModal, handleUpdatePeriode, permisjonsperiode }, ref) => {
        const formMethods = useForm<any>({
            defaultValues: {},
        });

        const ariaLabelId = 'endre-periode-modal-heading';

        const periode = permisjonsperiode.perioder[0];

        return (
            <Modal className={styles.modal} ref={ref} aria-labelledby={ariaLabelId}>
                <Modal.Header className={styles.header}>
                    <div className={styles.headerContent}>
                        <PencilIcon aria-label="Lukk" width={24} height={24} />
                        <Heading size="medium" id={ariaLabelId}>
                            Endre periode
                        </Heading>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Heading size="medium">Hva vil du gjøre med perioden?</Heading>
                    <RhfForm formMethods={formMethods}>
                        <RhfRadioGroup name="Test">
                            <Radio value="test1">Endre tidsrommet</Radio>
                            <Radio value="test2">Overfør perioden til andre part</Radio>
                            <Radio value="test3">Jeg vil jobbe delvis i perioden</Radio>
                            <Radio value="test4">Jeg vil endre hvilken kvote som er brukt</Radio>
                        </RhfRadioGroup>
                    </RhfForm>
                </Modal.Body>
                <Modal.Footer style={{ justifyItems: 'space-between', flexFlow: 'row' }}>
                    <Button type="button" variant="secondary" onClick={closeModal}>
                        Avbryt
                    </Button>
                    <Button type="button" onClick={() => handleUpdatePeriode(periode)}>
                        Lagre endringer
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    },
);
