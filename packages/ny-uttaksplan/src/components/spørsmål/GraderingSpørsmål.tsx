import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { EndrePeriodePanelStepFormValues } from '../endre-periode-panel/steps/EndrePeriodePanelStep';
import { LeggTilPeriodePanelFormValues } from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';
import { prosentValideringGradering } from './validators';

export const GraderingSpørsmål = () => {
    const intl = useIntl();
    const { watch, control } = useFormContext<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>();

    const graderingValue = watch('skalDuJobbe');
    const kontoTypeValue = watch('kontoType');
    const samtidigUttaksprosentValue = watch('samtidigUttaksprosent');

    if (kontoTypeValue === 'FORELDREPENGER_FØR_FØDSEL') {
        return null;
    }

    return (
        <VStack gap="space-16">
            <RhfRadioGroup
                name="skalDuJobbe"
                control={control}
                label={intl.formatMessage({ id: 'uttaksplan.graderingSpørsmål.heading' })}
                validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodePanel.skalDuJobbe.påkrevd' }))]}
            >
                <Radio value={true}>
                    <FormattedMessage id="uttaksplan.ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="uttaksplan.nei" />
                </Radio>
            </RhfRadioGroup>
            {graderingValue && (
                <RhfNumericField
                    name="stillingsprosent"
                    control={control}
                    className="max-w-xs"
                    label={intl.formatMessage({ id: 'GraderingSpørsmål.HvorMangeProsent' })}
                    validate={[prosentValideringGradering(intl, samtidigUttaksprosentValue)]}
                    maxLength={5}
                />
            )}
        </VStack>
    );
};
