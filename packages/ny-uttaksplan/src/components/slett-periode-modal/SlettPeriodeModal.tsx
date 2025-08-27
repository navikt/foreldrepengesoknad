import { PencilIcon } from '@navikt/aksel-icons';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Checkbox, HStack, Heading, Modal, VStack } from '@navikt/ds-react';

import { RhfCheckboxGroup, RhfForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';

const ARIA_LABEL_ID = 'slett-periode-modal-heading';

interface Props {
    closeModal: () => void | undefined;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
    isModalOpen: boolean;
    permisjonsperiode: Permisjonsperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
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
        closeModal();
    };

    return (
        <Modal className="w-[100%]" open={isModalOpen} aria-labelledby={ARIA_LABEL_ID} onClose={closeModal}>
            <Modal.Header className="bg-ax-neutral-200A mb-4" closeButton={false}>
                <HStack gap="space-8" align="center">
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="uttaksplan.slettPeriode.tittel" />
                    </Heading>
                </HStack>
            </Modal.Header>
            <Modal.Body>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                    <VStack gap="space-16">
                        <Heading size="medium">
                            <FormattedMessage id="uttaksplan.slettPeriode.hvilkePerioder" />
                        </Heading>
                        <RhfCheckboxGroup
                            name="perioder"
                            control={formMethods.control}
                            validate={[isRequired(intl.formatMessage({ id: 'uttaksplan.velgperiode' }))]}
                            label={intl.formatMessage({ id: 'uttaksplan.perioder' })}
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
                        <HStack justify="space-between">
                            <Button type="button" variant="secondary" onClick={closeModal}>
                                <FormattedMessage id="uttaksplan.avbryt" />
                            </Button>
                            <Button>
                                <FormattedMessage id="uttaksplan.slettValgte" />
                            </Button>
                        </HStack>
                    </VStack>
                </RhfForm>
            </Modal.Body>
        </Modal>
    );
};
