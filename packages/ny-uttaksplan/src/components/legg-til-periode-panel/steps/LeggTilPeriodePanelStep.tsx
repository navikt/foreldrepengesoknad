import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-constants';
import { RhfForm } from '@navikt/fp-form-hooks';
import { KontoTypeUttak, UtsettelseÅrsakType } from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../../types/Planperiode';
import { getGradering } from '../../../utils/graderingUtils';
import { PanelButtons } from '../../panel-buttons/PanelButtons';
import { GraderingSpørsmål } from '../../spørsmål/GraderingSpørsmål';
import { HvaVilDuGjøreSpørsmål } from '../../spørsmål/HvaVilDuGjøreSpørsmål';
import { KontotypeSpørsmål } from '../../spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../../spørsmål/SamtidigUttakSpørsmål';
import { TidsperiodeSpørsmål } from '../../spørsmål/TidsperiodeSpørsmål';
import { PanelData } from '../LeggTilPeriodePanel';
import { HvaVilDuGjøre, LeggTilPeriodePanelFormValues } from '../types/LeggTilPeriodePanelFormValues';

interface Props {
    panelData: PanelData;
    closePanel: () => void;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
}

export const LeggTilPeriodePanelStep = ({ panelData, closePanel, handleAddPeriode }: Props) => {
    const intl = useIntl();
    const { forelder, kontoType, fom, tom } = panelData;
    const { aleneOmOmsorg } = useUttaksplanData();

    const formMethods = useForm<LeggTilPeriodePanelFormValues>({
        defaultValues: {
            forelder: forelder,
            kontoType: kontoType,
            fom,
            tom,
        },
    });

    const hvaVilDuGjøre = formMethods.watch('hvaVilDuGjøre');

    const getForelderFromKontoType = (
        ktValue: KontoTypeUttak | undefined,
        fValue: Forelder | undefined,
    ): Forelder | undefined => {
        switch (ktValue) {
            case 'FEDREKVOTE':
                return Forelder.farMedmor;
            case 'MØDREKVOTE':
            case 'FORELDREPENGER_FØR_FØDSEL':
                return Forelder.mor;
            default:
                return fValue;
        }
    };

    const onSubmit = (values: LeggTilPeriodePanelFormValues) => {
        const fomValue = values.fom;
        const tomValue = values.tom;

        if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_FERIE) {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                id: `${fomValue} - ${tomValue} - ${UtsettelseÅrsakType.Ferie}`,
                readOnly: false,
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
            });
        } else if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD) {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                id: `${fomValue} - ${tomValue} - ${PeriodeHullType.PERIODE_UTEN_UTTAK}`,
                readOnly: false,
                forelder: Forelder.mor,
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
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
            <VStack gap="space-16">
                <HvaVilDuGjøreSpørsmål
                    label={intl.formatMessage({ id: 'uttaksplan.valgPanel.label' })}
                    autoFocus
                    erEndring={false}
                />
                {hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_PERIODE ? (
                    <>
                        <KontotypeSpørsmål />
                        <TidsperiodeSpørsmål hvaVilDuGjøre={hvaVilDuGjøre} />
                        {!aleneOmOmsorg && <SamtidigUttakSpørsmål />}
                        <GraderingSpørsmål />
                    </>
                ) : null}
                {hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD || hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_FERIE ? (
                    <TidsperiodeSpørsmål hvaVilDuGjøre={hvaVilDuGjøre} />
                ) : null}

                <PanelButtons onCancel={closePanel} isFinalStep={true} />
            </VStack>
        </RhfForm>
    );
};
