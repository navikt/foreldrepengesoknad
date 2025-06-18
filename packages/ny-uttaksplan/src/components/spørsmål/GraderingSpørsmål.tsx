import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { prosentValideringGradering } from './validators';

interface Props {
    formMethods: any;
}

export const GraderingSpørsmål = ({ formMethods }: Props) => {
    const intl = useIntl();

    const graderingValue = formMethods.watch('skalDuJobbe');
    const samtidigUttaksprosentValue = formMethods.watch('samtidigUttaksprosent');

    return (
        <VStack gap="4">
            <RhfRadioGroup
                name="skalDuJobbe"
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
                    className="w-xs"
                    label={intl.formatMessage({ id: 'GraderingSpørsmål.HvorMangeProsent' })}
                    name="stillingsprosent"
                    validate={[prosentValideringGradering(intl, samtidigUttaksprosentValue)]}
                    maxLength={5}
                />
            )}
        </VStack>
    );
};
