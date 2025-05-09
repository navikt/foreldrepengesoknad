import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../../../types/Planperiode';
import { getGradering } from '../../../utils/graderingUtils';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { GraderingSpørsmål } from '../../spørsmål/GraderingSpørsmål';
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
    skalDuJobbe: boolean;
    stillingsprosent?: string;
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
        const årsak = values.årsak;

        if (årsak === UtsettelseÅrsakType.Ferie) {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                id: `${fomValue} - ${tomValue} - ${årsak}`,
                readOnly: false,
                forelder: Forelder.farMedmor,
                utsettelseÅrsak: årsak,
            });
        } else if (årsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                id: `${fomValue} - ${tomValue} - ${årsak}`,
                readOnly: false,
                forelder: Forelder.farMedmor,
                periodeHullÅrsak: årsak,
            });
        } else {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                id: `${fomValue} - ${tomValue} - ${kontoType}`,
                readOnly: false,
                kontoType: values.kontoType,
                forelder: getForelderFromKontoType(values.kontoType, values.forelder),
                gradering: getGradering(values.skalDuJobbe, values.stillingsprosent),
            });
        }

        closeModal();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
            <VStack gap="4">
                {isOpphold === false ? (
                    <>
                        <KontotypeSpørsmål formMethods={formMethods} />
                        <TidsperiodeSpørsmål
                            formMethods={formMethods}
                            erBarnetFødt={erBarnetFødt}
                            gjelderAdopsjon={gjelderAdopsjon}
                            oppholdsårsak={årsak}
                        />
                        <GraderingSpørsmål formMethods={formMethods} />
                    </>
                ) : null}
                {isOpphold ? (
                    <>
                        <OppholdsÅrsakSpørsmål />
                        <TidsperiodeSpørsmål
                            formMethods={formMethods}
                            erBarnetFødt={erBarnetFødt}
                            gjelderAdopsjon={gjelderAdopsjon}
                            oppholdsårsak={årsak}
                        />
                    </>
                ) : null}

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
