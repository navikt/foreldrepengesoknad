import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { PeriodeHullType } from '../../../types/Planperiode';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    closeModal: () => void;
    setModalData: (data: ModalData) => void;
}

interface FormValues {
    årsak: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK | undefined;
}

export const VelgOppholdsårsakModalStep = ({ modalData, setModalData, closeModal }: Props) => {
    const intl = useIntl();

    const formMethods = useForm<FormValues>({
        defaultValues: {
            årsak: modalData.årsak,
        },
    });

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            årsak: values.årsak,
            currentStep: 'step3',
        });
    };

    return (
        <>
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.oppholdsårsakModal.tittel" />
            </Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <VStack gap="4">
                    <RhfRadioGroup
                        name="årsak"
                        validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.hvaVilDuGjøre.påkrevd' }))]}
                    >
                        <Radio value={UtsettelseÅrsakType.Ferie}>
                            <FormattedMessage id="uttaksplan.oppholdsårsakModal.ferie" />
                        </Radio>
                        <Radio value={PeriodeHullType.PERIODE_UTEN_UTTAK}>
                            <FormattedMessage id="uttaksplan.oppholdsårsakModal.periodeUtenForeldrepenger" />
                        </Radio>
                    </RhfRadioGroup>
                    <ModalButtons
                        onCancel={closeModal}
                        isFinalStep={false}
                        onGoPreviousStep={() => {
                            setModalData({
                                ...modalData,
                                currentStep: 'step1',
                            });
                        }}
                    />
                </VStack>
            </RhfForm>
        </>
    );
};
