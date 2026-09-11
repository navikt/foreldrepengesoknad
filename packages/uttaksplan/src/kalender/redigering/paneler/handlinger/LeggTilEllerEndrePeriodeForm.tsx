import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Alert, Button, ErrorMessage, HStack, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import type { BrukerRolleSak_fpoversikt, PeriodeDto_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import {
    LeggTilEllerEndrePeriodeFellesForm,
    LeggTilEllerEndrePeriodeFormFormValues,
    lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm,
    mapFraFormValuesTilPeriodeDto,
} from '../../../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { LeggTilPeriodeForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/LeggTilPeriodeForskyvEllerErstattPanel';
import { useVisForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/useVisForskyvEllerErstattPanel';
import { useFormSubmitValidator } from '../../../../felles/uttaksplanValidatorer';
import { useKanKunErstatte, useLeggTilEndreSkjemaInfoAlerts } from '../../../../regler/alert/informasjonsAlertHooks';
import { useAlleUttakPerioderInklTapteDager } from '../../../../utils/lagHullPerioder';
import { erDetEksisterendePerioderEtterValgtePerioder, finnSideForForelder } from '../../../../utils/periodeUtils';
import { useKalenderRedigeringContext } from '../../context/KalenderRedigeringContext';
import { finnValgtePerioder } from '../../utils/kalenderPeriodeUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface Props {
    lukkRedigeringsmodus: () => void;
}

export const LeggTilEllerEndrePeriodeForm = ({ lukkRedigeringsmodus }: Props) => {
    const {
        perioder,
        foreldreInfo: { søker },
        erPeriodeneTilAnnenPartLåst,
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, leggTilUttaksplanPerioder, setValgtePerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const { visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel } =
        useVisForskyvEllerErstattPanel(sammenslåtteValgtePerioder);

    const defaultValues = lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
        perioder,
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
                perioder,
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

    // Byggjer syntetiske periodar med KUN mors side, slik at den delte sjekk-funksjonen ikkje
    // ved eit uhell finn far/medmor sine data frå ei anna, urelatert (t.d. samtidig uttak-)rad.
    const morsPerioder: PeriodeDto_fpoversikt[] = perioder
        .map((p) => {
            const morsSide = finnSideForForelder(p, 'MOR');
            return morsSide ? { fom: p.fom, tom: p.tom, søker: morsSide } : undefined;
        })
        .filter((p): p is PeriodeDto_fpoversikt => p !== undefined);

    const { morsAktivitetIkkeOppgittAlert } = useLeggTilEndreSkjemaInfoAlerts(
        harValgtDagerKunForEnEksisterendePeriode ? [...eksisterendePerioderSomErValgt, ...morsPerioder] : [],
    );

    const erGradertMor = skalDuKombinereArbeidOgUttakMor === true && (forelder === 'MOR' || forelder === 'BEGGE');

    const kanKunErstatte = useKanKunErstatte({
        valgtePerioder: sammenslåtteValgtePerioder,
        erFerie: false,
        erGradert: erGradertMor,
    });

    const harNesteSteg =
        !kanKunErstatte &&
        !morsAktivitetIkkeOppgittAlert &&
        erDetEksisterendePerioderEtterValgtePerioder(perioder, sammenslåtteValgtePerioder);

    const onSubmit = (values: LeggTilEllerEndrePeriodeFormFormValues) => {
        const submitFeilmelding = formSubmitValidator(sammenslåtteValgtePerioder, values);

        if (submitFeilmelding) {
            setFeilmelding(submitFeilmelding);
            return;
        }
        setFeilmelding(undefined);

        if (harNesteSteg) {
            setVisEndreEllerForskyvPanel(true);
        } else {
            leggIKalender(false);
        }
    };

    const leggIKalender = (skalForskyve: boolean) => {
        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.flatMap((periode) =>
                mapFraFormValuesTilPeriodeDto(formMethods.getValues(), periode, søker, kanVelgeArbeidsgiver),
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
                    setVisEndreEllerForskyvPanel={setVisEndreEllerForskyvPanel}
                    leggTilEllerForskyvPeriode={leggIKalender}
                />
            )}
            {!visEndreEllerForskyvPanel && (
                <VStack gap="space-16">
                    {morsAktivitetIkkeOppgittAlert && (
                        <Alert variant={morsAktivitetIkkeOppgittAlert.variant} size="small">
                            {morsAktivitetIkkeOppgittAlert.melding}
                        </Alert>
                    )}

                    <LeggTilEllerEndrePeriodeFellesForm
                        valgtePerioder={sammenslåtteValgtePerioder}
                        resetFormValuesVedEndringAvForelder={resetFormValuesVedEndringAvForelder}
                    />

                    {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}

                    <HStack gap="space-12" className="w-full">
                        <Button
                            type="submit"
                            variant="primary"
                            size="small"
                            className="flex-1"
                            disabled={!formMethods.formState.isDirty}
                        >
                            {harNesteSteg ? (
                                <FormattedMessage id="RedigeringPanel.LeggTilPeriode.Fortsett" />
                            ) : (
                                <FormattedMessage id="RedigeringPanel.LeggTilPeriode" />
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            className="flex-1"
                            onClick={lukkRedigeringsmodus}
                        >
                            <FormattedMessage id="RedigeringPanel.LeggTilPeriode.Tilbake" />
                        </Button>
                    </HStack>
                </VStack>
            )}
        </RhfForm>
    );
};
