import { useForm } from 'react-hook-form';

import { Button, Heading, Radio } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';

import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
}

interface FormValues {
    hvaVilDuGjøre: string | undefined;
}

enum HvaVilDuGjøre {
    ENDRE_TIDSROM = 'endreTidsrom',
    ENDRE_KVOTE = 'endreKvote',
    OVERFØRE = 'overføre',
    GRADERE = 'gradere',
}

export const ValgModalStep = ({ modalData, setModalData, closeModal }: Props) => {
    const formMethods = useForm<FormValues>({
        defaultValues: {
            hvaVilDuGjøre: modalData.hvaVilDuGjøre,
        },
    });

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            hvaVilDuGjøre: values.hvaVilDuGjøre,
            currentStep: 'step2',
        });
    };

    return (
        <>
            <Heading size="medium">Hva vil du gjøre med perioden?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <RhfRadioGroup name="hvaVilDuGjøre">
                    <Radio value={HvaVilDuGjøre.ENDRE_TIDSROM}>Endre tidsrommet</Radio>
                    <Radio value={HvaVilDuGjøre.OVERFØRE}>Overfør perioden til andre part</Radio>
                    <Radio value={HvaVilDuGjøre.GRADERE}>Jeg vil jobbe delvis i perioden</Radio>
                    <Radio value={HvaVilDuGjøre.ENDRE_KVOTE}>Jeg vil endre hvilken kvote som er brukt</Radio>
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
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button>Gå videre</Button>
                    </div>
                </div>
            </RhfForm>
        </>
    );
};
