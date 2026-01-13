import { PencilIcon } from '@navikt/aksel-icons';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import {
    BrukerRolleSak_fpoversikt,
    KontoTypeUttak,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../context/UttaksplanRedigeringContext';
import { UttakPeriodeBuilder } from '../../utils/UttakPeriodeBuilder';
import { getGradering } from '../../utils/graderingUtils';
import { PanelButtons } from '../panel-buttons/PanelButtons';
import { AktivitetskravSpørsmål } from '../spørsmål/AktivitetskravSpørsmål';
import { GraderingSpørsmål } from '../spørsmål/GraderingSpørsmål';
import { HvaVilDuGjøreSpørsmål } from '../spørsmål/HvaVilDuGjøreSpørsmål';
import { KontotypeSpørsmål } from '../spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../spørsmål/SamtidigUttakSpørsmål';
import { TidsperiodeSpørsmål } from '../spørsmål/TidsperiodeSpørsmål';
import { HvaVilDuGjøre, LeggTilPeriodePanelFormValues } from '../types/LeggTilPeriodePanelFormValues';

interface Props {
    setIsLeggTilPeriodePanelOpen: (isOpen: boolean) => void;
}

export const LeggTilPeriodePanel = ({ setIsLeggTilPeriodePanelOpen }: Props) => {
    const intl = useIntl();
    const {
        uttakPerioder,
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const formMethods = useForm<LeggTilPeriodePanelFormValues>();

    const hvaVilDuGjøre = formMethods.watch('hvaVilDuGjøre');

    const getForelderFromKontoType = (
        ktValue: KontoTypeUttak | undefined,
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

    const handleAddPeriode = (nyPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
        const uttakPeriodeBuilder = new UttakPeriodeBuilder(uttakPerioder);
        uttakPeriodeBuilder.leggTilUttakPerioder([nyPeriode]);
        uttaksplanRedigering?.oppdaterUttaksplan?.(uttakPeriodeBuilder.getUttakPerioder());
        setIsLeggTilPeriodePanelOpen(false);
    };

    const handleDeletePerioder = (slettedePerioder: Array<{ fom: string; tom: string }>) => {
        const uttakPeriodeBuilder = new UttakPeriodeBuilder(uttakPerioder);
        const nyeUttakPerioder = uttakPeriodeBuilder.fjernUttakPerioder(slettedePerioder).getUttakPerioder();
        uttaksplanRedigering?.oppdaterUttaksplan?.(nyeUttakPerioder);
    };

    const onSubmit = (values: LeggTilPeriodePanelFormValues) => {
        const fomValue = values.fom;
        const tomValue = values.tom;

        if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_FERIE) {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                forelder: 'FAR_MEDMOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            });
        } else if (hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD) {
            handleDeletePerioder([
                {
                    fom: fomValue,
                    tom: tomValue,
                },
            ]);
        } else {
            handleAddPeriode({
                fom: fomValue,
                tom: tomValue,
                kontoType: values.kontoType === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : values.kontoType,
                morsAktivitet: values.kontoType === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : values.morsAktivitet,
                forelder: getForelderFromKontoType(values.kontoType, values.forelder),
                gradering: getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType),
                samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
            });
        }

        setIsLeggTilPeriodePanelOpen(false);
    };

    return (
        <VStack gap="space-8" className="border-border-subtle bg-surface-default w-full rounded-xl border p-4">
            <HStack gap="space-8" align="center" className="bg-ax-bg-neutral-soft -m-4 mb-0 rounded-t-xl p-4">
                <PencilIcon aria-hidden={true} width={24} height={24} />
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Heading>
            </HStack>
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
                            <AktivitetskravSpørsmål />
                            <TidsperiodeSpørsmål hvaVilDuGjøre={hvaVilDuGjøre} />
                            {rettighetType === 'BEGGE_RETT' && <SamtidigUttakSpørsmål />}
                            <GraderingSpørsmål />
                        </>
                    ) : null}
                    {hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_OPPHOLD ||
                    hvaVilDuGjøre === HvaVilDuGjøre.LEGG_TIL_FERIE ? (
                        <TidsperiodeSpørsmål hvaVilDuGjøre={hvaVilDuGjøre} />
                    ) : null}

                    <PanelButtons onCancel={() => setIsLeggTilPeriodePanelOpen(false)} isFinalStep={true} />
                </VStack>
            </RhfForm>
        </VStack>
    );
};
