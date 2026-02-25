import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { RhfForm, RhfSelect } from '@navikt/fp-form-hooks';
import { UttakPeriode_fpoversikt, UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useKalenderRedigeringContext } from '../../kalender/redigering/context/KalenderRedigeringContext';

export type FormValues = {
    utsettelseÅrsak: UttakUtsettelseÅrsak_fpoversikt;
};

interface Props {
    setVisUtsettelsePanel: (skalVisePanel: boolean) => void;
}

export const LeggTilUtsettelsePanel = ({ setVisUtsettelsePanel }: Props) => {
    const intl = useIntl();

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
                <RhfSelect
                    name="utsettelseÅrsak"
                    control={formMethods.control}
                    label={intl.formatMessage({ id: 'LeggTilUtsettelsePanel.VelgÅrsak' })}
                    validate={[isRequired(intl.formatMessage({ id: 'LeggTilUtsettelsePanel.VelgÅrsak.Required' }))]}
                >
                    <option value={'SØKER_SYKDOM' satisfies UttakUtsettelseÅrsak_fpoversikt}>
                        <FormattedMessage id="LeggTilUtsettelsePanel.SøkerSykdom" />
                    </option>
                    <option value={'SØKER_INNLAGT' satisfies UttakUtsettelseÅrsak_fpoversikt}>
                        <FormattedMessage id="LeggTilUtsettelsePanel.SøkerInnlagt" />
                    </option>
                    <option value={'BARN_INNLAGT' satisfies UttakUtsettelseÅrsak_fpoversikt}>
                        <FormattedMessage id="LeggTilUtsettelsePanel.BarnInnlagt" />
                    </option>
                </RhfSelect>
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
