import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Checkbox, Heading, VStack } from '@navikt/ds-react';

import { RhfCheckboxGroup, RhfForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';

interface Props {
    closeModal: () => void | undefined;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
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
    navnPåForeldre,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();
    const { perioder } = permisjonsperiode;

    const ariaLabelId = 'slett-periode-modal-heading';

    const formMethods = useForm<FormValues>({
        defaultValues: {
            perioder: perioder.length === 1 ? [perioder[0].id] : [],
        },
    });

    const watchedPerioder = formMethods.watch('perioder');

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
        <div aria-labelledby={ariaLabelId}>
            <div>
                <div className="mb-4"></div>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                    <VStack gap="space-16">
                        <Heading size="medium">
                            <FormattedMessage
                                id={
                                    perioder.length === 1
                                        ? 'uttaksplan.slettPeriode.bekreftelse'
                                        : 'uttaksplan.slettPeriode.hvilkePerioder'
                                }
                            />
                        </Heading>

                        <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                            <RhfCheckboxGroup
                                name="perioder"
                                control={formMethods.control}
                                validate={[isRequired('Du må velge en periode du vil slette')]}
                                label={intl.formatMessage({
                                    id: perioder.length === 1 ? 'uttaksplan.periode' : 'uttaksplan.perioder',
                                })}
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
                                    <FormattedMessage id="uttaksplan.avbryt" />
                                </Button>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button>
                                    <FormattedMessage
                                        id={
                                            watchedPerioder.length === 1
                                                ? 'uttaksplan.slettValgtPeriode'
                                                : 'uttaksplan.slettValgte'
                                        }
                                    />
                                </Button>
                            </div>
                        </div>
                    </VStack>
                </RhfForm>
            </div>
        </div>
    );
};
