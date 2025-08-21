import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../../types/Planperiode';
import { getGradering } from '../../../utils/graderingUtils';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { GraderingSpørsmål } from '../../spørsmål/GraderingSpørsmål';
import { KontotypeSpørsmål } from '../../spørsmål/KontotypeSpørsmål';
import { OppholdsÅrsakSpørsmål } from '../../spørsmål/OppholdsÅrsakSpørsmål';
import { SamtidigUttakSpørsmål } from '../../spørsmål/SamtidigUttakSpørsmål';
import { TidsperiodeSpørsmål } from '../../spørsmål/TidsperiodeSpørsmål';
import { PanelData } from '../LeggTilPeriodePanel';
import { LeggTilPeriodePanelFormValues } from '../types/LeggTilPeriodePanelFormValues';

interface Props {
    panelData: PanelData;
    closePanel: () => void;
    setPanelData: (data: PanelData) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    isOpphold: boolean;
}

export const LeggTilPeriodePanelStep = ({
    panelData,
    closePanel,
    setPanelData,
    handleAddPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
    isOpphold,
}: Props) => {
    const { forelder, kontoType, fom, tom, årsak } = panelData;
    const erAleneOmOmsorg = notEmpty(useContextGetData(UttaksplanContextDataType.ALENE_OM_OMSORG));

    const formMethods = useForm<LeggTilPeriodePanelFormValues>({
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

    const onSubmit = (values: LeggTilPeriodePanelFormValues) => {
        const fomValue = values.fom;
        const tomValue = values.tom;
        const årsakValue = values.årsak;

        if (årsakValue === UtsettelseÅrsakType.Ferie) {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                id: `${fomValue} - ${tomValue} - ${årsakValue}`,
                readOnly: false,
                forelder: Forelder.farMedmor,
                utsettelseÅrsak: årsakValue,
            });
        } else if (årsakValue === PeriodeHullType.PERIODE_UTEN_UTTAK) {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                id: `${fomValue} - ${tomValue} - ${årsakValue}`,
                readOnly: false,
                periodeHullÅrsak: årsakValue,
            });
        } else {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                id: `${fomValue} - ${tomValue} - ${kontoType}`,
                readOnly: false,
                kontoType: values.kontoType,
                forelder: getForelderFromKontoType(values.kontoType, values.forelder),
                gradering: getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType),
                samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
            });
        }

        closePanel();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
            <VStack gap="4" className="p-4 rounded-lg bg-white">
                {isOpphold === false ? (
                    <>
                        <KontotypeSpørsmål />
                        <TidsperiodeSpørsmål
                            erBarnetFødt={erBarnetFødt}
                            gjelderAdopsjon={gjelderAdopsjon}
                            oppholdsårsak={årsak}
                        />
                        {!erAleneOmOmsorg && <SamtidigUttakSpørsmål />}
                        <GraderingSpørsmål />
                    </>
                ) : null}
                {isOpphold ? (
                    <>
                        <OppholdsÅrsakSpørsmål />
                        <TidsperiodeSpørsmål
                            erBarnetFødt={erBarnetFødt}
                            gjelderAdopsjon={gjelderAdopsjon}
                            oppholdsårsak={årsak}
                        />
                    </>
                ) : null}

                <ModalButtons
                    onCancel={closePanel}
                    onGoPreviousStep={() => {
                        setPanelData({ ...panelData, currentStep: 'step1' });
                    }}
                    isFinalStep={true}
                />
            </VStack>
        </RhfForm>
    );
};
