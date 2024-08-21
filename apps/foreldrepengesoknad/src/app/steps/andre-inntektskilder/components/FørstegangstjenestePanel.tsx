import { FileIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Radio, VStack } from '@navikt/ds-react';

import { Datepicker, RadioGroup } from '@navikt/fp-form-hooks';
import { BluePanel } from '@navikt/fp-ui';
import { isRequired, isValidDate } from '@navikt/fp-validation';

interface Props {
    index: number;
}

export const FørstegangstjenestePanel: React.FunctionComponent<Props> = ({ index }) => {
    const intl = useIntl();

    return (
        <VStack gap="10">
            <RadioGroup
                name={`andreInntektskilder.${index}.pågående`}
                label={<FormattedMessage id="FørstegangstjenestePanel.IFørstegangstjenesteNå" />}
                validate={[
                    isRequired(
                        intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.IFørstegangstjenesteNå' }),
                    ),
                ]}
            >
                <Radio value={false}>
                    <FormattedMessage id="FørstegangstjenestePanel.RadioButton.Nei" />
                </Radio>
                <Radio value={true}>
                    <FormattedMessage id="FørstegangstjenestePanel.RadioButton.Ja" />
                </Radio>
            </RadioGroup>
            <HStack gap="6">
                <Datepicker
                    name={`andreInntektskilder.${index}.fom`}
                    label={intl.formatMessage({ id: 'FørstegangstjenestePanel.Fom' })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Required.Fom' })),
                        isValidDate(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Valid.Fom' })),
                    ]}
                />
                <Datepicker
                    name={`andreInntektskilder.${index}.tom`}
                    label={intl.formatMessage({ id: 'FørstegangstjenestePanel.Tom' })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Required.Tom' })),
                        isValidDate(intl.formatMessage({ id: 'FørstegangstjenestePanel.Validering.Valid.Tom' })),
                    ]}
                />
            </HStack>
            <BluePanel isDarkBlue>
                <HStack gap="2" wrap={false}>
                    <div>
                        <FileIcon fontSize="1.5rem" />
                    </div>
                    <BodyShort>
                        <FormattedMessage id="FørstegangstjenestePanel.Vedlegg" />
                    </BodyShort>
                </HStack>
            </BluePanel>
        </VStack>
    );
};
