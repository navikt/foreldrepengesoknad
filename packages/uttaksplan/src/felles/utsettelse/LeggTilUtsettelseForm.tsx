import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Detail, Heading, VStack } from '@navikt/ds-react';

import { RhfSelect } from '@navikt/fp-form-hooks';
import { UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

export type FormValues = {
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
};

interface Props {
    visTittel?: boolean;
}

export const LeggTilUtsettelseForm = ({ visTittel = false }: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<FormValues>();

    return (
        <VStack gap="space-16">
            {visTittel && (
                <VStack gap="space-0">
                    <Heading size="xsmall">
                        <FormattedMessage id="LeggTilUtsettelsePanel.Periode6Uker" />
                    </Heading>
                    <Detail>
                        <FormattedMessage id="LeggTilUtsettelsePanel.ForeldrepengerEllerUtsettelse" />
                    </Detail>
                </VStack>
            )}
            <RhfSelect
                name="utsettelseÅrsak"
                control={formMethods.control}
                className="max-w-100"
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
        </VStack>
    );
};
