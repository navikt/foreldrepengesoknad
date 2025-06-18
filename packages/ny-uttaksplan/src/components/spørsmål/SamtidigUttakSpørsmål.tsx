import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup } from '@navikt/fp-form-hooks';

import { Planperiode } from '../../types/Planperiode';
import { valideringSamtidigUttak } from './validators';

interface Props {
    formMethods: any;
    perioder: Planperiode[];
}

export const SamtidigUttakSpørsmål = ({ formMethods }: Props) => {
    const samtidigUttakValue = formMethods.watch('samtidigUttak');
    const stillingsprosentValue = formMethods.watch('stillingsprosent');

    const intl = useIntl();

    return (
        <VStack gap="4">
            <RhfRadioGroup name="samtidigUttak" label="Skal du ha samtidig uttak?">
                <Radio value={true}>
                    <FormattedMessage id="uttaksplan.ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="uttaksplan.nei" />
                </Radio>
            </RhfRadioGroup>
            {samtidigUttakValue && (
                <RhfNumericField
                    className="w-xs"
                    label="Hvor mange prosent?"
                    name="samtidigUttaksprosent"
                    validate={[valideringSamtidigUttak(intl, stillingsprosentValue)]}
                    maxLength={5}
                />
            )}
        </VStack>
    );
};
