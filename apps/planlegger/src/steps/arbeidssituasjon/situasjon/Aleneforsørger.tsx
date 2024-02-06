import { Radio, VStack } from '@navikt/ds-react';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const Aleneforsørger: FunctionComponent = () => {
    const intl = useIntl();

    return (
        <VStack gap="10">
            <RadioGroup
                name="arbeidssituasjonAlene"
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'feilmelding.arbeidssituasjonAlene.duMåOppgi',
                        }),
                    ),
                ]}
            >
                <Radio
                    value={true}
                    description={intl.formatMessage({ id: 'arbeid.jobber.beskrivelseDeg' })}
                    className="panel green"
                >
                    <FormattedMessage id="arbeid.jobber" />
                </Radio>
                <Radio
                    value={false}
                    description={intl.formatMessage({ id: 'arbeid.jobberIkke.beskrivelseDeg' })}
                    className="panel green"
                >
                    <FormattedMessage id="arbeid.jobberIkke" />
                </Radio>
            </RadioGroup>
        </VStack>
    );
};

export default Aleneforsørger;
