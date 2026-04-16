import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../../context/UttaksplanDataContext';
import { FormValues, LeggTilUtsettelseForm } from '../../../../../felles/utsettelse/LeggTilUtsettelseForm';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';

interface Props {
    setVisUtsettelsePanel: (skalVisePanel: boolean) => void;
}

export const LeggTilUtsettelsePanel = ({ setVisUtsettelsePanel }: Props) => {
    const {
        foreldreInfo: { søker },
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, setValgtePerioder, leggTilUttaksplanPerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const formMethods = useForm<FormValues>({
        defaultValues: undefined,
    });

    const onSubmit = (formValues: FormValues) => {
        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.map(
                (p) =>
                    ({
                        forelder: søker,
                        fom: p.fom,
                        tom: p.tom,
                        utsettelseÅrsak: formValues.utsettelseÅrsak,
                        flerbarnsdager: false,
                    }) satisfies UttakPeriode_fpoversikt,
            ),
            false,
        );

        setValgtePerioder([]);
        setEndredePerioder(sammenslåtteValgtePerioder);
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-16">
                <LeggTilUtsettelseForm visTittel />
                <HStack justify="space-between">
                    <Button variant="primary" size="small" disabled={!formMethods.formState.isDirty}>
                        <FormattedMessage id="LeggTilUtsettelsePanel.LeggTil" />
                    </Button>
                    <Button type="button" variant="secondary" size="small" onClick={() => setVisUtsettelsePanel(false)}>
                        <FormattedMessage id="LeggTilUtsettelsePanel.Lukk" />
                    </Button>
                </HStack>
            </VStack>
        </RhfForm>
    );
};
