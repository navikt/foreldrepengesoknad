import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading } from '@navikt/ds-react';

import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
}

export const EndreTidsperiodeModalStep = ({ modalData, setModalData, closeModal }: Props) => {
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
            currentStep: 'step3',
        });
    };

    return (
        <>
            <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                    <RhfDatepicker
                        validate={[
                            isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.fom.påkrevd' })),
                            isValidDate(
                                intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.fom.gyldigDato' }),
                            ),
                        ]}
                        disableWeekends={true}
                        label="Fra og med dato"
                        name="fom"
                    />
                    <RhfDatepicker
                        validate={[
                            isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.tom.påkrevd' })),
                            isValidDate(
                                intl.formatMessage({ id: 'leggTilPeriodeModal.endreTidsperiode.tom.gyldigDato' }),
                            ),
                        ]}
                        disableWeekends={true}
                        label="Til og med dato"
                        name="tom"
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
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                setModalData({ ...modalData, currentStep: 'step1' });
                            }}
                        >
                            Gå tilbake
                        </Button>
                        <Button>Gå videre</Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
