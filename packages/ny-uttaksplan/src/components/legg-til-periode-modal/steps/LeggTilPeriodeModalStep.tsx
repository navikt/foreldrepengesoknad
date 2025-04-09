import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm } from '@navikt/fp-form-hooks';

import { Planperiode } from '../../../types/Planperiode';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { KontotypeSpørsmål } from '../../spørsmål/KontotypeSpørsmål';
import { TidsperiodeSpørsmål } from '../../spørsmål/TidsperiodeSpørsmål';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    closeModal: () => void;
    setModalData: (data: ModalData) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
}

interface FormValues {
    kontoType: StønadskontoType;
    forelder: Forelder;
    fom: string;
    tom: string;
}

export const LeggTilPeriodeModalStep = ({
    modalData,
    closeModal,
    setModalData,
    handleAddPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const { forelder, kontoType, fom, tom } = modalData;

    const formMethods = useForm<FormValues>({
        defaultValues: {
            forelder: forelder,
            kontoType: kontoType,
            fom,
            tom,
        },
    });

    const getForelderFromKontoType = (
        ktValue: StønadskontoType,
        fValue: Forelder | undefined,
    ): Forelder | undefined => {
        switch (ktValue) {
            case StønadskontoType.Fedrekvote:
                return Forelder.farMedmor;
            case StønadskontoType.Mødrekvote:
            case StønadskontoType.ForeldrepengerFørFødsel:
                return Forelder.mor;
            default:
                return fValue;
        }
    };

    const onSubmit = (values: FormValues) => {
        const fomValue = values.fom;
        const tomValue = values.tom;

        handleAddPeriode({
            fom: fomValue,
            tom: tomValue,
            id: `${fomValue} - ${tomValue} - ${kontoType}`,
            readOnly: false,
            kontoType: values.kontoType,
            forelder: getForelderFromKontoType(values.kontoType, values.forelder),
        });

        closeModal();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
            <VStack gap="4">
                <KontotypeSpørsmål formMethods={formMethods} />
                <TidsperiodeSpørsmål
                    formMethods={formMethods}
                    erBarnetFødt={erBarnetFødt}
                    gjelderAdopsjon={gjelderAdopsjon}
                />
                <ModalButtons
                    onCancel={closeModal}
                    onGoPreviousStep={() => {
                        setModalData({ ...modalData, currentStep: 'step1' });
                    }}
                    isFinalStep={true}
                />
            </VStack>
        </RhfForm>
    );
};
