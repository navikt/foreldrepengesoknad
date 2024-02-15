import { VStack } from '@navikt/ds-react';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';
import GreenRadio from 'components/radio/GreenRadio';
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
                <GreenRadio value={true} description={intl.formatMessage({ id: 'arbeid.jobber.beskrivelseDeg' })}>
                    <FormattedMessage id="arbeid.jobber" />
                </GreenRadio>
                <GreenRadio value={false} description={intl.formatMessage({ id: 'arbeid.jobberIkke.beskrivelseDeg' })}>
                    <FormattedMessage id="arbeid.jobberIkke" />
                </GreenRadio>
            </RadioGroup>
        </VStack>
    );
};

export default Aleneforsørger;
