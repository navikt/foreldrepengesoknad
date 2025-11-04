import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import { BrukerRolleSak_fpoversikt, KontoTypeUttak_fpoversikt } from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../../types/Planperiode';
import { getGradering, getGraderingsInfo } from '../../../utils/graderingUtils';
import { HvaVilDuGjøre } from '../../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';
import { PanelButtons } from '../../panel-buttons/PanelButtons';
import { GraderingSpørsmål } from '../../spørsmål/GraderingSpørsmål';
import { HvaVilDuGjøreSpørsmål } from '../../spørsmål/HvaVilDuGjøreSpørsmål';
import { KontotypeSpørsmål } from '../../spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../../spørsmål/SamtidigUttakSpørsmål';
import { TidsperiodeSpørsmål } from '../../spørsmål/TidsperiodeSpørsmål';
import { PanelData } from '../EndrePeriodePanel';

interface Props {
    panelData: PanelData;
    setPanelData: (data: PanelData) => void;
    closePanel: () => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    inneholderKunEnPeriode: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

export interface EndrePeriodePanelStepFormValues {
    fom: string | undefined;
    tom: string | undefined;
    kontoType: KontoTypeUttak_fpoversikt;
    forelder?: BrukerRolleSak_fpoversikt;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
    hvaVilDuGjøre: HvaVilDuGjøre;
}

export const EndrePeriodePanelStep = ({
    panelData,
    setPanelData,
    closePanel,
    handleUpdatePeriode,
    handleAddPeriode,
    inneholderKunEnPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const intl = useIntl();
    const { valgtPeriode } = panelData;
    const graderingsInfo = getGraderingsInfo(valgtPeriode);
    const erAleneOmOmsorg = notEmpty(useContextGetData(UttaksplanContextDataType.ALENE_OM_OMSORG));

    const getHvaVilDuGjøre = () => {
        if (valgtPeriode) {
            if (valgtPeriode.utsettelseÅrsak) {
                return HvaVilDuGjøre.LEGG_TIL_FERIE;
            }

            if (valgtPeriode.periodeHullÅrsak) {
                return HvaVilDuGjøre.LEGG_TIL_OPPHOLD;
            }

            return HvaVilDuGjøre.LEGG_TIL_PERIODE;
        }

        return undefined;
    };

    const formMethods = useForm<EndrePeriodePanelStepFormValues>({
        defaultValues: {
            fom: valgtPeriode?.fom,
            tom: valgtPeriode?.tom,
            forelder: valgtPeriode?.forelder,
            kontoType: valgtPeriode?.kontoType,
            skalDuJobbe: graderingsInfo?.skalDuJobbe ?? false,
            stillingsprosent: graderingsInfo?.stillingsprosent,
            samtidigUttak: valgtPeriode?.samtidigUttak !== undefined,
            samtidigUttaksprosent: valgtPeriode?.samtidigUttak?.toString(),
            hvaVilDuGjøre: getHvaVilDuGjøre(),
        },
    });

    const hvaVilDuGjøre = formMethods.watch('hvaVilDuGjøre');

    const getForelderFromKontoType = (
        ktValue: KontoTypeUttak_fpoversikt,
        fValue: BrukerRolleSak_fpoversikt | undefined,
    ): BrukerRolleSak_fpoversikt | undefined => {
        switch (ktValue) {
            case 'FEDREKVOTE':
                return 'FAR_MEDMOR';
            case 'MØDREKVOTE':
            case 'FORELDREPENGER_FØR_FØDSEL':
                return 'MOR';
            default:
                return fValue;
        }
    };

    const chooseUpdateOrAdd = (hvaVilDuGjøreValue: HvaVilDuGjøre) => {
        if (hvaVilDuGjøreValue === HvaVilDuGjøre.LEGG_TIL_PERIODE) {
            if (valgtPeriode && valgtPeriode.kontoType) {
                return handleUpdatePeriode;
            }

            return handleAddPeriode;
        }

        if (hvaVilDuGjøreValue === HvaVilDuGjøre.LEGG_TIL_FERIE) {
            if (valgtPeriode && valgtPeriode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
                return handleUpdatePeriode;
            }

            return handleAddPeriode;
        }

        return handleAddPeriode;
    };

    const onSubmit = (values: EndrePeriodePanelStepFormValues) => {
        const fomValue = values.fom ?? valgtPeriode!.fom;
        const tomValue = values.tom ?? valgtPeriode!.tom;

        if (values.hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_FERIE) {
            const handleFunc = chooseUpdateOrAdd(values.hvaVilDuGjøre);

            handleFunc({
                id: valgtPeriode?.id ?? `${fomValue} - ${tomValue} - LOVBESTEMT_FERIE`,
                readOnly: false,
                fom: fomValue,
                tom: tomValue,
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            });
        } else if (values.hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD) {
            handleAddPeriode({
                id: `${fomValue} - ${tomValue} - ${PeriodeHullType.PERIODE_UTEN_UTTAK}`,
                readOnly: false,
                fom: fomValue,
                tom: tomValue,
                forelder: 'MOR',
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
            });
        } else {
            const handleFunc = chooseUpdateOrAdd(values.hvaVilDuGjøre);

            handleFunc({
                id: valgtPeriode!.id,
                readOnly: false,
                fom: fomValue,
                tom: tomValue,
                forelder: getForelderFromKontoType(values.kontoType, values.forelder),
                kontoType: values.kontoType,
                gradering: getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType),
                samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
            });
        }
        closePanel();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
            <VStack gap="space-16">
                <HvaVilDuGjøreSpørsmål
                    label={intl.formatMessage({ id: 'uttaksplan.valgPanel.label.endre' })}
                    erEndring={true}
                />
                {hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_PERIODE ? <KontotypeSpørsmål /> : null}
                <TidsperiodeSpørsmål
                    erBarnetFødt={erBarnetFødt}
                    gjelderAdopsjon={gjelderAdopsjon}
                    hvaVilDuGjøre={hvaVilDuGjøre!}
                />
                {!erAleneOmOmsorg && hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_PERIODE && <SamtidigUttakSpørsmål />}
                {hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_PERIODE ? <GraderingSpørsmål /> : null}
                <PanelButtons
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
