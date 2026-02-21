import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, GuidePanel, Radio, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

interface Props {
    onBekreft: (erGravid: boolean) => void;
}

interface FormValues {
    erGravid: boolean;
}

export const ErDuGravidSteg = ({ onBekreft }: Props) => {
    const intl = useIntl();

    const formMethods = useForm<FormValues>({
        defaultValues: undefined,
    });

    const onSubmit = (values: FormValues) => {
        onBekreft(values.erGravid);
    };

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'erDuGravid.tittel' })}>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="space-40">
                    <ErrorSummaryHookForm />
                    <GuidePanel>
                        <FormattedMessage id="erDuGravid.intro" />
                    </GuidePanel>

                    <RhfRadioGroup
                        name="erGravid"
                        control={formMethods.control}
                        label={<FormattedMessage id="erDuGravid.spørsmål" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'erDuGravid.validering' })),
                        ]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="erDuGravid.ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="erDuGravid.nei" />
                        </Radio>
                    </RhfRadioGroup>

                    <Button type="submit">
                        <FormattedMessage id="erDuGravid.fortsett" />
                    </Button>
                </VStack>
            </RhfForm>
        </SkjemaRotLayout>
    );
};

