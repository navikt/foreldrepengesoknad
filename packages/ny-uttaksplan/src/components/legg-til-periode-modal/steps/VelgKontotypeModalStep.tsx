import { useForm } from 'react-hook-form';

import { Button, Heading, Radio, VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';

import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    closeModal: () => void;
    setModalData: (data: ModalData) => void;
}

interface FormValues {
    kontoType: StønadskontoType;
    forelder: Forelder;
}

export const VelgKontotypeModalStep = ({ modalData, closeModal, setModalData }: Props) => {
    const { kontoType, forelder } = modalData;

    const formMethods = useForm<FormValues>({
        defaultValues: {
            forelder: forelder ?? undefined,
            kontoType: kontoType ?? undefined,
        },
    });

    const getForelderFromKontoType = (
        kontoTypeValue: StønadskontoType,
        forelderValue: Forelder | undefined,
    ): Forelder | undefined => {
        switch (kontoTypeValue) {
            case StønadskontoType.Fedrekvote:
                return Forelder.farMedmor;
            case StønadskontoType.Mødrekvote:
                return Forelder.mor;
            default:
                return forelderValue;
        }
    };

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            kontoType: values.kontoType,
            currentStep: 'step4',
            forelder: getForelderFromKontoType(values.kontoType, values.forelder),
        });
    };

    const kontoTypeValue = formMethods.watch('kontoType');

    return (
        <>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <VStack gap="4">
                    <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
                    <RhfRadioGroup label="Velg kontotype" name="kontoType">
                        <Radio value={StønadskontoType.Fedrekvote}>Fedrekvote</Radio>
                        <Radio value={StønadskontoType.Mødrekvote}>Mødrekvote</Radio>
                        <Radio value={StønadskontoType.Fellesperiode}>Fellesperiode</Radio>
                    </RhfRadioGroup>
                    {kontoTypeValue === StønadskontoType.Fellesperiode && (
                        <RhfRadioGroup label="Hvem gjelder fellesperioden?" name="forelder">
                            <Radio value={Forelder.mor}>Mor</Radio>
                            <Radio value={Forelder.farMedmor}>Far eller medmor</Radio>
                        </RhfRadioGroup>
                    )}
                </VStack>
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
