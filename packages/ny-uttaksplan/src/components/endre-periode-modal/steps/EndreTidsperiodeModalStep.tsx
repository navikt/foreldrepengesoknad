import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading } from '@navikt/ds-react';

import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';
import { isBeforeOrSame, isRequired, isValidDate, isWeekday } from '@navikt/fp-validation';

import { Planperiode } from '../../../types/Planperiode';
import { ModalData } from '../EndrePeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
    familiehendelsedato: string;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    inneholderKunEnPeriode: boolean;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
}

export const EndreTidsperiodeModalStep = ({
    modalData,
    setModalData,
    closeModal,
    familiehendelsedato,
    handleUpdatePeriode,
    inneholderKunEnPeriode,
}: Props) => {
    const { valgtPeriode } = modalData;
    const intl = useIntl();
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: modalData.valgtPeriode?.fom,
            tom: modalData.valgtPeriode?.tom,
        },
    });

    const onSubmit = (values: FormValues) => {
        handleUpdatePeriode({
            ...valgtPeriode!,
            fom: values.fom ?? valgtPeriode!.fom,
            tom: values.tom ?? valgtPeriode!.tom,
        });
        closeModal();
    };
    const tomValue = formMethods.watch('tom');

    return (
        <>
            <Heading size="medium">Hva vil du gjøre med perioden?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                    <RhfDatepicker
                        showMonthAndYearDropdowns
                        minDate={dayjs(familiehendelsedato).subtract(3, 'weeks').toDate()}
                        maxDate={dayjs(familiehendelsedato).add(3, 'years').toDate()}
                        label="Fra og med dato"
                        name="fom"
                        disableWeekends={true}
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.fom.påkrevd' }),
                            ),
                            isValidDate(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.fom.gyldigDato' }),
                            ),
                            isBeforeOrSame(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.fom.førTilDato' }),
                                tomValue,
                            ),
                            isWeekday(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.fom.måVæreUkedag' }),
                            ),
                        ]}
                    />
                    <RhfDatepicker
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.tom.påkrevd' }),
                            ),
                            isValidDate(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.tom.gyldigDato' }),
                            ),
                            isWeekday(
                                intl.formatMessage({ id: 'endreTidsPeriodeModal.endreTidsperiode.tom.måVæreUkedag' }),
                            ),
                        ]}
                        label="Til og med dato"
                        name="tom"
                        disableWeekends={true}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingTop: '1rem',
                    }}
                >
                    <div>
                        <Button type="button" variant="secondary" onClick={closeModal}>
                            Avbryt
                        </Button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {inneholderKunEnPeriode ? null : (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setModalData({ ...modalData, currentStep: 'step1' });
                                }}
                            >
                                Gå tilbake
                            </Button>
                        )}
                        <Button>Ferdig, legg til i planen</Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
