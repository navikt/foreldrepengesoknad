import { Heading, Radio } from '@navikt/ds-react';
import { Locale } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { Form, RadioGroup } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

interface Props {
    locale: Locale;
    onChangeLocale: (activeLocale: Locale) => void;
}

const Planlegger: FunctionComponent<Props> = () => {
    const formMethods = useForm({ defaultValues: { test: '' } });

    return (
        <ContentWrapper>
            <Form formMethods={formMethods}>
                <Heading size="medium">
                    <FormattedMessage id="hvem.tittel" />
                    <RadioGroup name="test">
                        <Radio value="option1">Mor og far</Radio>
                        <Radio value="option2">Mor og medmor</Radio>
                        <Radio value="option2">Far og far</Radio>
                        <Radio value="option2">Bare mor</Radio>
                        <Radio value="option2">Bare far</Radio>
                    </RadioGroup>
                </Heading>
            </Form>
        </ContentWrapper>
    );
};

export default Planlegger;
