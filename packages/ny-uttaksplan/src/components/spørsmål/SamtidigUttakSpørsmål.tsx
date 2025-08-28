import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { EndrePeriodePanelStepFormValues } from '../endre-periode-panel/steps/EndrePeriodePanelStep';
import { LeggTilPeriodePanelFormValues } from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';
import { valideringSamtidigUttak } from './validators';

export const SamtidigUttakSpørsmål = () => {
    const { watch, control } = useFormContext<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>();

    const samtidigUttakValue = watch('samtidigUttak');
    const stillingsprosentValue = watch('stillingsprosent');

    const intl = useIntl();

    return (
        <VStack gap="space-16">
            <RhfRadioGroup
                control={control}
                name="samtidigUttak"
                label="Skal du ha samtidig uttak?"
                validate={[isRequired('Du må fylle ut')]}
            >
                <Radio value={true}>
                    <FormattedMessage id="uttaksplan.ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="uttaksplan.nei" />
                </Radio>
            </RhfRadioGroup>
            {samtidigUttakValue && (
                <RhfNumericField
                    control={control}
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
