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

    return (
        <VStack gap="4">
            <RhfRadioGroup
                name="skalDuJobbe"
                control={formMethods.control}
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
                    control={formMethods.control}
                    className="w-xs"
                    label={intl.formatMessage({ id: 'GraderingSpørsmål.HvorMangeProsent' })}
                    // @ts-expect-error Andreas fiksar
                    validate={[prosentValideringGradering(intl)]}
                    maxLength={5}
                />
            )}
        </VStack>
    );
};
