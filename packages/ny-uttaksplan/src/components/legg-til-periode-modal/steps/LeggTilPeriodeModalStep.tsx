import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../../../types/Planperiode';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { KontotypeSpørsmål } from '../../spørsmål/KontotypeSpørsmål';
import { OppholdsÅrsakSpørsmål } from '../../spørsmål/OppholdsÅrsakSpørsmål';
import { TidsperiodeSpørsmål } from '../../spørsmål/TidsperiodeSpørsmål';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    closeModal: () => void;
    setModalData: (data: ModalData) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    isOpphold: boolean;
}

interface FormValues {
    kontoType?: StønadskontoType;
    forelder: Forelder;
    fom: string;
    tom: string;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
}

export const LeggTilPeriodeModalStep = ({
    modalData,
    closeModal,
    setModalData,
    handleAddPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
    isOpphold,
}: Props) => {
    const { forelder, kontoType, fom, tom, årsak } = modalData;

    const formMethods = useForm<FormValues>({
        defaultValues: {
            forelder: forelder,
            kontoType: kontoType,
            fom,
            tom,
            årsak,
        },
    });

    const getForelderFromKontoType = (
        ktValue: StønadskontoType | undefined,
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
                {isOpphold === false ? <KontotypeSpørsmål formMethods={formMethods} /> : null}
                {isOpphold ? <OppholdsÅrsakSpørsmål /> : null}
                <TidsperiodeSpørsmål
                    formMethods={formMethods}
                    erBarnetFødt={erBarnetFødt}
                    gjelderAdopsjon={gjelderAdopsjon}
                    oppholdsårsak={årsak}
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
