import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { EndrePeriodeModalStepFormValues } from '../endre-periode-modal/steps/EndrePeriodeModalStep';
import { LeggTilPeriodeModalFormValues } from '../legg-til-periode-modal/types/LeggTilPeriodeModalFormValues';
import { valideringSamtidigUttak } from './validators';

export const SamtidigUttakSpørsmål = () => {
    const { watch, control } = useFormContext<LeggTilPeriodeModalFormValues | EndrePeriodeModalStepFormValues>();

    const samtidigUttakValue = watch('samtidigUttak');
    const stillingsprosentValue = watch('stillingsprosent');

    const intl = useIntl();

    return (
        <VStack gap="4">
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
