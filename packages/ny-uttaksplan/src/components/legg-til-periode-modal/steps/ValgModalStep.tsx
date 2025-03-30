import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
}

export enum HvaVilDuGjøre {
    LEGG_TIL_PERIODE = 'leggTilPeriode',
    LEGG_TIL_OPPHOLD = 'leggTilOpphold',
}

interface FormValues {
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
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
            <Heading size="medium">Hva vil du legge til?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <VStack gap="4">
                    <RhfRadioGroup
                        name="hvaVilDuGjøre"
                        validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.hvaVilDuGjøre.påkrevd' }))]}
                    >
                        <Radio value={HvaVilDuGjøre.LEGG_TIL_PERIODE}>Legge til periode med foreldrepenger</Radio>
                        <Radio value={HvaVilDuGjøre.LEGG_TIL_OPPHOLD}>
                            Legge til ferie eller periode uten foreldrepenger
                        </Radio>
                    </RhfRadioGroup>
                    <ModalButtons onCancel={closeModal} isFinalStep={false} />
                </VStack>
            </RhfForm>
        </>
    );
};
