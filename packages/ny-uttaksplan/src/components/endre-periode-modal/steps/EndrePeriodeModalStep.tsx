import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm } from '@navikt/fp-form-hooks';

import { Planperiode } from '../../../types/Planperiode';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { KontotypeSpørsmål } from '../../spørsmål/KontotypeSpørsmål';
import { TidsperiodeSpørsmål } from '../../spørsmål/TidsperiodeSpørsmål';
import { ModalData } from '../EndrePeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    inneholderKunEnPeriode: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
    kontoType: StønadskontoType;
    forelder?: Forelder;
}

export const EndrePeriodeModalStep = ({
    modalData,
    setModalData,
    closeModal,
    handleUpdatePeriode,
    inneholderKunEnPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const { valgtPeriode } = modalData;
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: modalData.valgtPeriode?.fom,
            tom: modalData.valgtPeriode?.tom,
            forelder: modalData.valgtPeriode?.forelder,
            kontoType: modalData.valgtPeriode?.kontoType,
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
        handleUpdatePeriode({
            ...valgtPeriode!,
            fom: values.fom ?? valgtPeriode!.fom,
            tom: values.tom ?? valgtPeriode!.tom,
            forelder: getForelderFromKontoType(values.kontoType, values.forelder),
            kontoType: values.kontoType,
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
                    valgtPeriode={valgtPeriode}
                />
                <ModalButtons
                    onCancel={closeModal}
                    onGoPreviousStep={
                        inneholderKunEnPeriode
                            ? undefined
                            : () => {
                                  setModalData({ ...modalData, currentStep: 'step1' });
                              }
                    }
                    isFinalStep={true}
                />
            </VStack>
        </RhfForm>
    );
};
