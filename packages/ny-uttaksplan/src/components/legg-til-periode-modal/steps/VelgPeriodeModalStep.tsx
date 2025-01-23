import { useForm } from 'react-hook-form';

import { Button, Heading, Radio } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';

import { Planperiode } from '../../../types/Planperiode';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    perioder: Planperiode[];
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
}

interface FormValues {
    periodeId: string | undefined;
}

export const VelgPeriodeModalStep = ({ perioder, modalData, setModalData, closeModal }: Props) => {
    const formMethods = useForm<FormValues>({
        defaultValues: {
            periodeId: modalData.valgtPeriode?.id,
        },
    });

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            valgtPeriode: perioder.find((p) => p.id === values.periodeId),
            currentStep: 'step2',
        });
    };

    return (
        <>
            <Heading size="medium">Hvilken periode vil du endre?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <RhfRadioGroup
                    name="periodeId"
                    validate={[
                        (value) => {
                            if (!value) {
                                return 'Du må velge hvilken periode du vil endre';
                            }

                            return undefined;
                        },
                    ]}
                >
                    {perioder.map((p) => {
                        return <Radio key={p.id} value={p.id}>{`${p.id}`}</Radio>;
                    })}
                </RhfRadioGroup>
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
                    <div>
                        <Button>Gå videre</Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
