import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm } from '@navikt/fp-form-hooks';
import { getFloatFromString } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
import { Planperiode } from '../../../types/Planperiode';
import { getGradering, getGraderingsInfo } from '../../../utils/graderingUtils';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { GraderingSpørsmål } from '../../spørsmål/GraderingSpørsmål';
import { KontotypeSpørsmål } from '../../spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../../spørsmål/SamtidigUttakSpørsmål';
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
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
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
    const { valgtPeriode, årsak } = modalData;
    const graderingsInfo = getGraderingsInfo(valgtPeriode);
    const perioder = notEmpty(useContextGetData(UttaksplanContextDataType.UTTAKSPLAN));

    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: valgtPeriode?.fom,
            tom: valgtPeriode?.tom,
            forelder: valgtPeriode?.forelder,
            kontoType: valgtPeriode?.kontoType,
            skalDuJobbe: graderingsInfo?.skalDuJobbe ?? false,
            stillingsprosent: graderingsInfo?.stillingsprosent,
            samtidigUttak: valgtPeriode?.samtidigUttak !== undefined,
            samtidigUttaksprosent:
                valgtPeriode?.samtidigUttak !== undefined ? valgtPeriode.samtidigUttak.toString() : undefined,
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
            gradering: getGradering(values.skalDuJobbe, values.stillingsprosent),
            samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
        });
        closeModal();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
            <VStack gap="4">
                <KontotypeSpørsmål formMethods={formMethods} />
                <TidsperiodeSpørsmål
                    erBarnetFødt={erBarnetFødt}
                    gjelderAdopsjon={gjelderAdopsjon}
                    oppholdsårsak={årsak}
                />
                <SamtidigUttakSpørsmål formMethods={formMethods} perioder={perioder} />
                <GraderingSpørsmål formMethods={formMethods} />
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
