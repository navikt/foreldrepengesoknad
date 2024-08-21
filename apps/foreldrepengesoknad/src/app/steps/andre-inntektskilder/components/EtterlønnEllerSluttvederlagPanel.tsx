import { FileIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import { BluePanel } from '@navikt/fp-ui';
import { isRequired, isValidDate } from '@navikt/fp-validation';

interface Props {
    index: number;
}

export const EtterlønnEllerSluttvederlagPanel: React.FunctionComponent<Props> = ({ index }) => {
    const intl = useIntl();

    return (
        <VStack gap="10">
            <HStack gap="6">
                <Datepicker
                    name={`andreInntektskilder.${index}.fom`}
                    label={intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Fom' })}
                    validate={[
                        isRequired(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Validering.Required.Fom' }),
                        ),
                        isValidDate(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Validering.Valid.Fom' }),
                        ),
                    ]}
                />
                <Datepicker
                    name={`andreInntektskilder.${index}.tom`}
                    label={intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Tom' })}
                    validate={[
                        isRequired(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Validering.Required.Tom' }),
                        ),
                        isValidDate(
                            intl.formatMessage({ id: 'EtterlønnEllerSluttvederlagPanel.Validering.Valid.Tom' }),
                        ),
                    ]}
                />
            </HStack>
            <BluePanel isDarkBlue>
                <HStack gap="2" wrap={false}>
                    <div>
                        <FileIcon fontSize="1.5rem" />
                    </div>
                    <BodyShort>
                        <FormattedMessage id="EtterlønnEllerSluttvederlagPanel.Vedlegg" />
                    </BodyShort>
                </HStack>
            </BluePanel>
        </VStack>
    );
};
