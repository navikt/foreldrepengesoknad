import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Alert, Button, ErrorMessage, HStack, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import type { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import {
    LeggTilEllerEndrePeriodeFellesForm,
    LeggTilEllerEndrePeriodeFormFormValues,
    lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm,
    mapFraFormValuesTilUttakPeriode,
} from '../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { useFormSubmitValidator } from '../../felles/uttaksplanValidatorer';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import { harPeriodeDerMorsAktivitetIkkeErValgt } from '../../utils/periodeUtils';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { finnValgtePerioder } from './utils/kalenderPeriodeUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface Props {
    lukkRedigeringsmodus: () => void;
}

export const LeggTilEllerEndrePeriodeForm = ({ lukkRedigeringsmodus }: Props) => {
    const {
        uttakPerioder,
        foreldreInfo: { søker },
        erPeriodeneTilAnnenPartLåst,
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, leggTilUttaksplanPerioder, setValgtePerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const defaultValues = lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
        uttakPerioder,
        sammenslåtteValgtePerioder[0]!,
        erPeriodeneTilAnnenPartLåst,
        søker,
    );

    const formMethods = useForm<LeggTilEllerEndrePeriodeFormFormValues>({
        defaultValues,
    });

    const formSubmitValidator = useFormSubmitValidator<LeggTilEllerEndrePeriodeFormFormValues>();

    const onSubmit = (values: LeggTilEllerEndrePeriodeFormFormValues) => {
        const submitFeilmelding = formSubmitValidator(sammenslåtteValgtePerioder, values);

        if (submitFeilmelding) {
            setFeilmelding(submitFeilmelding);
            return;
        }
        setFeilmelding(undefined);

        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.flatMap((periode) => {
                return mapFraFormValuesTilUttakPeriode(values, periode);
            }),
        );

        setValgtePerioder([]);
        setEndredePerioder(sammenslåtteValgtePerioder);

        lukkRedigeringsmodus();
    };

    const resetFormValuesVedEndringAvForelder = (forelder: BrukerRolleSak_fpoversikt | 'BEGGE' | undefined) => {
        formMethods.reset({ forelder });
    };

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();
    const eksisterendePerioderSomErValgt = finnValgtePerioder(
        sammenslåtteValgtePerioder,
        uttakPerioderInkludertTapteDager,
    );

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-16">
                {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}

                {harPeriodeDerMorsAktivitetIkkeErValgt(eksisterendePerioderSomErValgt) && (
                    <Alert variant="warning" size="small">
                        <FormattedMessage id="LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt" />
                    </Alert>
                )}

                <LeggTilEllerEndrePeriodeFellesForm
                    valgtePerioder={sammenslåtteValgtePerioder}
                    resetFormValuesVedEndringAvForelder={resetFormValuesVedEndringAvForelder}
                />
                <HStack gap="space-8">
                    <Button type="button" variant="secondary" onClick={lukkRedigeringsmodus}>
                        <FormattedMessage id="LeggTilPeriodePanel.Avbryt" />
                    </Button>
                    <Button type="submit" variant="primary" disabled={!formMethods.formState.isDirty}>
                        <FormattedMessage id="LeggTilPeriodePanel.LeggTil" />
                    </Button>
                </HStack>
            </VStack>
        </RhfForm>
    );
};
