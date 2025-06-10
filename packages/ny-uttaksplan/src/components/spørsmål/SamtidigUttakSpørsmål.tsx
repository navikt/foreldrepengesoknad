import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup } from '@navikt/fp-form-hooks';

import { prosentValideringSamtidigUttak } from './validators';

interface Props {
    formMethods: any;
}

export const SamtidigUttakSpørsmål = ({ formMethods }: Props) => {
    const samtidigUttakValue = formMethods.watch('samtidigUttak');
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
                    validate={[prosentValideringSamtidigUttak(intl)]}
                    maxLength={5}
                />
            )}
        </VStack>
    );
};
