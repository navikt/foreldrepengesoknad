import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../../context/UttaksplanDataContext';
import { FormValues, LeggTilPauseForm } from '../../../../../felles/utsettelse/LeggTilPauseForm';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';

interface Props {
    setVisPausePanel: (skalVisePanel: boolean) => void;
}

export const LeggTilPausePanel = ({ setVisPausePanel }: Props) => {
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
                        utsettelseÅrsak: 'FRI',
                        flerbarnsdager: false,
                        morsAktivitet: formValues.morsAktivitet,
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
                <LeggTilPauseForm visTittel />
                <HStack justify="space-between">
                    <Button variant="primary" size="small" disabled={!formMethods.formState.isDirty}>
                        <FormattedMessage id="LeggTilPausePanel.LeggTil" />
                    </Button>
                    <Button type="button" variant="secondary" size="small" onClick={() => setVisPausePanel(false)}>
                        <FormattedMessage id="LeggTilPausePanel.Lukk" />
                    </Button>
                </HStack>
            </VStack>
        </RhfForm>
    );
};
