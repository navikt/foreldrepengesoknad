import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading } from '@navikt/ds-react';

import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';
import { isBeforeOrSame, isEmpty, isRequired, isValidDate } from '@navikt/fp-validation';

import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
    familiehendelsedato: string;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
}

export const EndreTidsperiodeModalStep = ({ modalData, setModalData, closeModal, familiehendelsedato }: Props) => {
    const intl = useIntl();
    const { fom, tom } = modalData;
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: fom ?? '',
            tom: tom ?? '',
        },
    });

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            fom: values.fom,
            tom: values.tom,
            currentStep: 'step2',
        });
    };

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');

    return (
        <>
            <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                    <RhfDatepicker
                        showMonthAndYearDropdowns
                        minDate={dayjs(familiehendelsedato).subtract(3, 'weeks').toDate()}
                        maxDate={dayjs(familiehendelsedato).add(3, 'years').toDate()}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.fom.påkrevd' })),
                            isValidDate(
                                intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.fom.gyldigDato' }),
                            ),
                            isBeforeOrSame(
                                intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.fom.førTilDato' }),
                                tomValue,
                            ),
                        ]}
                        disableWeekends={true}
                        label="Fra og med dato"
                        name="fom"
                        defaultMonth={isEmpty(fomValue) ? familiehendelsedato : fomValue}
                    />
                    <RhfDatepicker
                        showMonthAndYearDropdowns
                        minDate={dayjs(familiehendelsedato).subtract(3, 'weeks').toDate()}
                        maxDate={dayjs(familiehendelsedato).add(3, 'years').toDate()}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.tom.påkrevd' })),
                            isValidDate(
                                intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.tom.gyldigDato' }),
                            ),
                        ]}
                        disableWeekends={true}
                        label="Til og med dato"
                        name="tom"
                        defaultMonth={isEmpty(fomValue) ? familiehendelsedato : fomValue}
                    />
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
                        {/* <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                setModalData({ ...modalData, currentStep: 'step1' });
                            }}
                        >
                            Gå tilbake
                        </Button> */}
                        <Button>Gå videre</Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
