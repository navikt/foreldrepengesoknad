import { PencilIcon } from '@navikt/aksel-icons';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Checkbox, Heading, Modal } from '@navikt/ds-react';

import { RhfCheckboxGroup, RhfForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';
import styles from './slettPeriodeModal.module.css';

interface Props {
    closeModal: () => void | undefined;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
    isModalOpen: boolean;
    permisjonsperiode: Permisjonsperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

export interface ModalData {
    perioderSomSkalSlettes: Planperiode[];
}

interface FormValues {
    perioder: string[];
}

export const SlettPeriodeModal = ({
    closeModal,
    handleDeletePeriode,
    handleDeletePerioder,
    permisjonsperiode,
    isModalOpen,
    navnPåForeldre,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();
    const { perioder } = permisjonsperiode;

    const ariaLabelId = 'slett-periode-modal-heading';

    const formMethods = useForm<FormValues>({
        defaultValues: {
            perioder: [],
        },
    });

    const onSubmit = (values: FormValues) => {
        if (values.perioder.length === 1) {
            const periode = perioder.find((p) => p.id === values.perioder[0]);

            if (periode) {
                handleDeletePeriode(periode);
            }
        } else {
            const slettedePerioder: Planperiode[] = [];

            values.perioder?.map((id) => {
                const periode = perioder.find((p) => p.id === id);

                if (periode) {
                    slettedePerioder.push(periode);
                }
            });

            handleDeletePerioder(slettedePerioder);
        }
    };

    return (
        <Modal className={styles.modal} open={isModalOpen} aria-labelledby={ariaLabelId} onClose={closeModal}>
            <Modal.Header className={styles.header} closeButton={false}>
                <div className={styles.headerContent}>
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ariaLabelId}>
                        Slett periode
                    </Heading>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Heading size="medium">Hvilke perioder vil du slette?</Heading>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                    <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                        <RhfCheckboxGroup
                            validate={[isRequired('Du må velge en periode du vil slette')]}
                            name="perioder"
                            label="Perioder"
                        >
                            {perioder.map((p) => {
                                return (
                                    <Checkbox key={p.id} name={p.id} value={p.id}>
                                        {`${formatDate(p.fom)} - ${formatDate(p.tom)} - 
                                        ${getStønadskontoNavn(intl, p.kontoType!, navnPåForeldre, erFarEllerMedmor)}`}
                                    </Checkbox>
                                );
                            })}
                        </RhfCheckboxGroup>
                    </div>
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
                            <Button>Slett valgte perioder</Button>
                        </div>
                    </div>
                </RhfForm>
            </Modal.Body>
        </Modal>
    );
};
