import { useForm } from 'react-hook-form';

import { Button, Heading } from '@navikt/ds-react';

import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';

import { ModalData } from '../EndrePeriodeModal';

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
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: modalData.valgtPeriode?.fom,
            tom: modalData.valgtPeriode?.tom,
        },
    });

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            fom: values.fom,
            tom: values.tom,
            currentStep: 'step4',
        });
    };

    return (
        <>
            <Heading size="medium">Hva vil du gjøre med perioden?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                    <RhfDatepicker label="Fra og med dato" name="fom" />
                    <RhfDatepicker label="Til og med dato" name="tom" />
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
                                setModalData({ ...modalData, currentStep: 'step2' });
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
