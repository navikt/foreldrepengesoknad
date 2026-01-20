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
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { usePeriodeValidator } from './utils/usePeriodeValidator';

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

    const { finnPerioderGyldigeFeilmeldinger } = usePeriodeValidator(sammenslåtteValgtePerioder);

    const defaultValues = lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
        uttakPerioder,
        sammenslåtteValgtePerioder[0]!,
    );

    const formMethods = useForm<LeggTilEllerEndrePeriodeFormFormValues>({
        defaultValues,
    });

    const onSubmit = (values: LeggTilEllerEndrePeriodeFormFormValues) => {
        const valideringsfeil: string[] = [];

        if (values.forelder === 'MOR' || values.forelder === 'BEGGE') {
            valideringsfeil.push(
                ...finnPerioderGyldigeFeilmeldinger(
                    values.kontoTypeMor,
                    values.samtidigUttaksprosentMor !== undefined,
                    values.skalDuKombinereArbeidOgUttakMor,
                    'MOR',
                ),
            );
        }
        if (values.forelder === 'FAR_MEDMOR' || values.forelder === 'BEGGE') {
            valideringsfeil.push(
                ...finnPerioderGyldigeFeilmeldinger(
                    values.kontoTypeFarMedmor,
                    values.samtidigUttaksprosentFarMedmor !== undefined,
                    values.skalDuKombinereArbeidOgUttakFarMedmor,
                    'FAR_MEDMOR',
                ),
            );
        }

        if (valideringsfeil.length > 0) {
            setFeilmelding(valideringsfeil.at(0));
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

    const resetFormValues = (value: string | number | boolean) => {
        formMethods.reset({ ...defaultValues, forelder: value as BrukerRolleSak_fpoversikt | 'BEGGE' });
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-16">
                {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}

                <LeggTilEllerEndrePeriodeFellesForm
                    valgtePerioder={sammenslåtteValgtePerioder}
                    resetFormValues={resetFormValues}
                />
                <HStack gap="space-8">
                    <Button type="submit" variant="primary" disabled={!formMethods.formState.isDirty}>
                        <FormattedMessage id="LeggTilPeriodePanel.LeggTil" />
                    </Button>
                    <Button type="button" variant="primary" onClick={lukkRedigeringsmodus}>
                        <FormattedMessage id="LeggTilPeriodePanel.Avbryt" />
                    </Button>
                </HStack>
            </VStack>
        </RhfForm>
    );
};
