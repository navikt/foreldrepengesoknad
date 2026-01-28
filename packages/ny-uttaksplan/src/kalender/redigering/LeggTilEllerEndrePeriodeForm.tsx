import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, ErrorMessage, HStack, VStack } from '@navikt/ds-react';

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
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface Props {
    lukkRedigeringsmodus: () => void;
}

export const LeggTilEllerEndrePeriodeForm = ({ lukkRedigeringsmodus }: Props) => {
    const { uttakPerioder } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, leggTilUttaksplanPerioder, setValgtePerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const defaultValues = lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
        uttakPerioder,
        sammenslåtteValgtePerioder[0]!,
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

    const resetFormValuesVedEndringAvForelder = (value: string | number | boolean) => {
        formMethods.reset({ forelder: value as BrukerRolleSak_fpoversikt });
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-16">
                {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}

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
