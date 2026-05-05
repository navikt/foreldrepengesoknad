import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Alert, Button, ErrorMessage, HStack, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import type { BrukerRolleSak_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import {
    LeggTilEllerEndrePeriodeFellesForm,
    LeggTilEllerEndrePeriodeFormFormValues,
    lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm,
    mapFraFormValuesTilUttakPeriode,
} from '../../../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { LeggTilPeriodeForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/LeggTilPeriodeForskyvEllerErstattPanel';
import { useVisForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/useVisForskyvEllerErstattPanel';
import { useFormSubmitValidator } from '../../../../felles/uttaksplanValidatorer';
import { useAlleUttakPerioderInklTapteDager } from '../../../../utils/lagHullPerioder';
import {
    erDetEksisterendePerioderEtterValgtePerioder,
    harPeriodeDerMorsAktivitetIkkeErValgt,
} from '../../../../utils/periodeUtils';
import { erEøsUttakPeriode } from '../../../../types/UttaksplanPeriode';
import { useKalenderRedigeringContext } from '../../context/KalenderRedigeringContext';
import { finnValgtePerioder } from '../../utils/kalenderPeriodeUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface Props {
    lukkRedigeringsmodus: () => void;
}

export const LeggTilEllerEndrePeriodeForm = ({ lukkRedigeringsmodus }: Props) => {
    const {
        uttakPerioder,
        foreldreInfo: { søker, rettighetType },
        erPeriodeneTilAnnenPartLåst,
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, leggTilUttaksplanPerioder, setValgtePerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const { visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel } =
        useVisForskyvEllerErstattPanel(sammenslåtteValgtePerioder);

    const defaultValues = lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
        uttakPerioder,
        sammenslåtteValgtePerioder[0]!,
        søker,
        erPeriodeneTilAnnenPartLåst,
    );

    const formMethods = useForm<LeggTilEllerEndrePeriodeFormFormValues>({
        defaultValues,
    });

    const skalDuKombinereArbeidOgUttakMor = formMethods.watch('skalDuKombinereArbeidOgUttakMor');
    const forelder = formMethods.watch('forelder');

    const formSubmitValidator = useFormSubmitValidator<LeggTilEllerEndrePeriodeFormFormValues>();

    const resetFormValuesVedEndringAvForelder = (forelderVerdi: BrukerRolleSak_fpoversikt | 'BEGGE' | undefined) => {
        const erFarMedmorLåst = erPeriodeneTilAnnenPartLåst && søker === 'MOR';
        const erMorLåst = erPeriodeneTilAnnenPartLåst && søker === 'FAR_MEDMOR';

        if (forelderVerdi === 'BEGGE' && (erFarMedmorLåst || erMorLåst)) {
            const nyeDefaultVerdier = lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
                uttakPerioder,
                sammenslåtteValgtePerioder[0]!,
                søker,
                false,
            );
            formMethods.reset({ ...nyeDefaultVerdier, forelder: forelderVerdi });
        } else {
            formMethods.reset({ forelder: forelderVerdi });
        }
    };

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();
    const eksisterendePerioderSomErValgt = finnValgtePerioder(
        sammenslåtteValgtePerioder,
        uttakPerioderInkludertTapteDager,
    );

    const harValgtDagerKunForEnEksisterendePeriode =
        eksisterendePerioderSomErValgt.length === 1 &&
        !sammenslåtteValgtePerioder.some(
            (vp) =>
                dayjs(vp.fom).isBefore(eksisterendePerioderSomErValgt.at(0)!.fom) ||
                dayjs(vp.tom).isAfter(eksisterendePerioderSomErValgt.at(0)!.tom),
        );

    const erMorsAktivitetIkkeOppgitt =
        harValgtDagerKunForEnEksisterendePeriode &&
        harPeriodeDerMorsAktivitetIkkeErValgt(rettighetType, [
            ...eksisterendePerioderSomErValgt,
            ...uttakPerioder.filter(
                (mp): mp is UttakPeriode_fpoversikt => !erEøsUttakPeriode(mp) && mp.forelder === 'MOR',
            ),
        ]);

    const onSubmit = (values: LeggTilEllerEndrePeriodeFormFormValues) => {
        const submitFeilmelding = formSubmitValidator(sammenslåtteValgtePerioder, values);

        if (submitFeilmelding) {
            setFeilmelding(submitFeilmelding);
            return;
        }
        setFeilmelding(undefined);

        if (
            !erMorsAktivitetIkkeOppgitt &&
            erDetEksisterendePerioderEtterValgtePerioder(uttakPerioder, sammenslåtteValgtePerioder)
        ) {
            setVisEndreEllerForskyvPanel(true);
        } else {
            leggIKalender(false);
        }
    };

    const leggIKalender = (skalForskyve: boolean) => {
        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.flatMap((periode) =>
                mapFraFormValuesTilUttakPeriode(formMethods.getValues(), periode, søker),
            ),
            skalForskyve,
        );

        setValgtePerioder([]);
        setEndredePerioder(sammenslåtteValgtePerioder);

        lukkRedigeringsmodus();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            {visEndreEllerForskyvPanel && (
                <LeggTilPeriodeForskyvEllerErstattPanel
                    valgtePerioder={sammenslåtteValgtePerioder}
                    erFerie={false}
                    erGradert={skalDuKombinereArbeidOgUttakMor === true && (forelder === 'MOR' || forelder === 'BEGGE')}
                    setVisEndreEllerForskyvPanel={setVisEndreEllerForskyvPanel}
                    leggTilEllerForskyvPeriode={leggIKalender}
                />
            )}
            {!visEndreEllerForskyvPanel && (
                <VStack gap="space-16">
                    {erMorsAktivitetIkkeOppgitt && (
                        <Alert variant="warning" size="small">
                            <FormattedMessage id="LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt" />
                        </Alert>
                    )}

                    <LeggTilEllerEndrePeriodeFellesForm
                        valgtePerioder={sammenslåtteValgtePerioder}
                        resetFormValuesVedEndringAvForelder={resetFormValuesVedEndringAvForelder}
                    />

                    {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}

                    <HStack justify="space-between">
                        <Button type="submit" variant="primary" size="small" disabled={!formMethods.formState.isDirty}>
                            <FormattedMessage id="LeggTilPeriodePanel.LeggTil" />
                        </Button>
                        <Button type="button" variant="secondary" size="small" onClick={lukkRedigeringsmodus}>
                            <FormattedMessage id="LeggTilPeriodePanel.Avbryt" />
                        </Button>
                    </HStack>
                </VStack>
            )}
        </RhfForm>
    );
};
