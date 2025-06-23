import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup } from '@navikt/fp-form-hooks';

import { EndrePeriodeModalStepFormValues } from '../endre-periode-modal/steps/EndrePeriodeModalStep';
import { LeggTilPeriodeModalStepFormValues } from '../legg-til-periode-modal/steps/LeggTilPeriodeModalStep';
import { valideringSamtidigUttak } from './validators';

export const SamtidigUttakSpørsmål = () => {
    const { watch } = useFormContext<LeggTilPeriodeModalStepFormValues | EndrePeriodeModalStepFormValues>();

    const samtidigUttakValue = watch('samtidigUttak');
    const stillingsprosentValue = watch('stillingsprosent');

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
