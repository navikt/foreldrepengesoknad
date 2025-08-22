import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { StønadskontoType } from '@navikt/fp-constants';
import { RhfNumericField, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { EndrePeriodeModalStepFormValues } from '../endre-periode-modal/steps/EndrePeriodeModalStep';
import { LeggTilPeriodeModalFormValues } from '../legg-til-periode-modal/types/LeggTilPeriodeModalFormValues';
import { prosentValideringGradering } from './validators';

export const GraderingSpørsmål = () => {
    const intl = useIntl();
    const { watch, control } = useFormContext<LeggTilPeriodeModalFormValues | EndrePeriodeModalStepFormValues>();

    const graderingValue = watch('skalDuJobbe');
    const kontoTypeValue = watch('kontoType');
    const samtidigUttaksprosentValue = watch('samtidigUttaksprosent');

    if (kontoTypeValue === StønadskontoType.ForeldrepengerFørFødsel) {
        return null;
    }

    return (
        <VStack gap="space-16">
            <RhfRadioGroup
                name="skalDuJobbe"
                control={control}
                label={intl.formatMessage({ id: 'uttaksplan.graderingSpørsmål.heading' })}
                validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.skalDuJobbe.påkrevd' }))]}
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
                    className="w-xs"
                    label={intl.formatMessage({ id: 'GraderingSpørsmål.HvorMangeProsent' })}
                    validate={[prosentValideringGradering(intl, samtidigUttaksprosentValue)]}
                    maxLength={5}
                />
            )}
        </VStack>
    );
};
