import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import {
    BrukerRolleSak_fpoversikt,
    KontoTypeUttak,
    MorsAktivitet,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { erUttaksplanHull, erVanligUttakPeriode } from '../../../types/UttaksplanPeriode';
import { getGradering, getGraderingsInfo } from '../../../utils/graderingUtils';
import { HvaVilDuGjøre } from '../../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';
import { PanelButtons } from '../../panel-buttons/PanelButtons';
import { AktivitetskravSpørsmål } from '../../spørsmål/AktivitetskravSpørsmål';
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
    handleUpdatePeriode: (
        oppdatertPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
        gammelPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    ) => void;
    handleAddPeriode: (nyPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => void;
    handleDeletePerioder: (slettedePerioder: Array<{ fom: string; tom: string }>) => void;
    inneholderKunEnPeriode: boolean;
}

export type EndrePeriodePanelStepFormValues = {
    fom: string | undefined;
    tom: string | undefined;
    kontoType: KontoTypeUttak;
    forelder?: BrukerRolleSak_fpoversikt;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
    hvaVilDuGjøre: HvaVilDuGjøre;
    morsAktivitet?: MorsAktivitet | undefined;
};

export const EndrePeriodePanelStep = ({
    panelData,
    setPanelData,
    closePanel,
    handleUpdatePeriode,
    handleAddPeriode,
    handleDeletePerioder,
    inneholderKunEnPeriode,
}: Props) => {
    const intl = useIntl();
    const { valgtPeriode } = panelData;
    const graderingsInfo = getGraderingsInfo(valgtPeriode);
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();

    const getHvaVilDuGjøre = () => {
        if (valgtPeriode) {
            if (erVanligUttakPeriode(valgtPeriode) && valgtPeriode.utsettelseÅrsak) {
                return HvaVilDuGjøre.LEGG_TIL_FERIE;
            }

            if (erUttaksplanHull(valgtPeriode)) {
                return HvaVilDuGjøre.LEGG_TIL_OPPHOLD;
            }

            return HvaVilDuGjøre.LEGG_TIL_PERIODE;
        }

        return undefined;
    };

    const formMethods = useForm<EndrePeriodePanelStepFormValues>({
        defaultValues:
            !valgtPeriode || !erVanligUttakPeriode(valgtPeriode)
                ? undefined
                : {
                      fom: valgtPeriode.fom,
                      tom: valgtPeriode.tom,
                      forelder: valgtPeriode.forelder,
                      kontoType:
                          valgtPeriode.kontoType === 'FORELDREPENGER' && valgtPeriode.morsAktivitet === 'IKKE_OPPGITT'
                              ? 'AKTIVITETSFRI_KVOTE'
                              : valgtPeriode.kontoType,
                      skalDuJobbe: graderingsInfo?.skalDuJobbe ?? false,
                      stillingsprosent: graderingsInfo?.stillingsprosent,
                      samtidigUttak: valgtPeriode.samtidigUttak !== undefined,
                      samtidigUttaksprosent: valgtPeriode.samtidigUttak?.toString(),
                      hvaVilDuGjøre: getHvaVilDuGjøre(),
                      morsAktivitet: valgtPeriode.morsAktivitet,
                  },
    });

    const hvaVilDuGjøre = formMethods.watch('hvaVilDuGjøre');

    const getForelderFromKontoType = (
        ktValue: KontoTypeUttak,
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

    const onSubmit = (values: EndrePeriodePanelStepFormValues) => {
        const fomValue = values.fom ?? valgtPeriode!.fom;
        const tomValue = values.tom ?? valgtPeriode!.tom;

        if (values.hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_FERIE) {
            const feriePeriode = {
                fom: fomValue,
                tom: tomValue,
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            } satisfies UttakPeriode_fpoversikt;
            if (
                valgtPeriode &&
                erVanligUttakPeriode(valgtPeriode) &&
                valgtPeriode.utsettelseÅrsak === 'LOVBESTEMT_FERIE'
            ) {
                handleUpdatePeriode(feriePeriode, valgtPeriode);
            } else {
                handleAddPeriode(feriePeriode);
            }
        } else if (values.hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD) {
            handleDeletePerioder([
                {
                    fom: fomValue,
                    tom: tomValue,
                },
            ]);
        } else {
            const periode = {
                fom: fomValue,
                tom: tomValue,
                forelder: getForelderFromKontoType(values.kontoType, values.forelder),
                kontoType: values.kontoType === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : values.kontoType,
                morsAktivitet: values.kontoType === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : values.morsAktivitet,
                gradering: getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType),
                samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
            } satisfies UttakPeriode_fpoversikt;
            if (
                values.hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_PERIODE &&
                valgtPeriode &&
                erVanligUttakPeriode(valgtPeriode) &&
                valgtPeriode.kontoType
            ) {
                handleUpdatePeriode(periode, valgtPeriode);
            }

            handleAddPeriode(periode);
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
                <AktivitetskravSpørsmål />
                <TidsperiodeSpørsmål hvaVilDuGjøre={hvaVilDuGjøre} />
                {rettighetType === 'BEGGE_RETT' && hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_PERIODE && (
                    <SamtidigUttakSpørsmål />
                )}
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
