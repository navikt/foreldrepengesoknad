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
import { PanelData } from '../EndrePeriodePanel';

interface Props {
    panelData: PanelData;
    setPanelData: (data: PanelData) => void;
    closePanel: () => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    inneholderKunEnPeriode: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

export interface EndrePeriodePanelStepFormValues {
    fom: string | undefined;
    tom: string | undefined;
    kontoType: StønadskontoType;
    forelder?: Forelder;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
}

export const EndrePeriodePanelStep = ({
    panelData,
    setPanelData,
    closePanel,
    handleUpdatePeriode,
    inneholderKunEnPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const { valgtPeriode, årsak } = panelData;
    const graderingsInfo = getGraderingsInfo(valgtPeriode);
    const erAleneOmOmsorg = notEmpty(useContextGetData(UttaksplanContextDataType.ALENE_OM_OMSORG));

    const formMethods = useForm<EndrePeriodePanelStepFormValues>({
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

    const onSubmit = (values: EndrePeriodePanelStepFormValues) => {
        handleUpdatePeriode({
            ...valgtPeriode!,
            fom: values.fom ?? valgtPeriode!.fom,
            tom: values.tom ?? valgtPeriode!.tom,
            forelder: getForelderFromKontoType(values.kontoType, values.forelder),
            kontoType: values.kontoType,
            gradering: getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType),
            samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
        });
        closePanel();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
            <VStack gap="space-16">
                <KontotypeSpørsmål />
                <TidsperiodeSpørsmål
                    erBarnetFødt={erBarnetFødt}
                    gjelderAdopsjon={gjelderAdopsjon}
                    oppholdsårsak={årsak}
                />
                {!erAleneOmOmsorg && <SamtidigUttakSpørsmål />}
                <GraderingSpørsmål />
                <ModalButtons
                    onCancel={closePanel}
                    onGoPreviousStep={
                        inneholderKunEnPeriode
                            ? undefined
                            : () => {
                                  setPanelData({ ...panelData, currentStep: 'step1' });
                              }
                    }
                    isFinalStep={true}
                />
            </VStack>
        </RhfForm>
    );
};
