import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading, Radio } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

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
    LEGG_TIL_PERIODE = 'leggTilPeriode',
    LEGG_TIL_OPPHOLD = 'leggTilOpphold',
}

export const ValgModalStep = ({ modalData, setModalData, closeModal }: Props) => {
    const intl = useIntl();

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
            <Heading size="medium">Hva vil du gjøre?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <RhfRadioGroup
                    name="hvaVilDuGjøre"
                    validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.hvaVilDuGjøre.påkrevd' }))]}
                >
                    <Radio value={HvaVilDuGjøre.LEGG_TIL_PERIODE}>Legge til periode med foreldrepenger</Radio>
                    <Radio value={HvaVilDuGjøre.LEGG_TIL_OPPHOLD}>Legge til periode uten foreldrepenger</Radio>
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
