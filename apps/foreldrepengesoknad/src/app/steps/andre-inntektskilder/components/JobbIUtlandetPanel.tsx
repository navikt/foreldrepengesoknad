import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, Radio, VStack } from '@navikt/ds-react';

import { Datepicker, RadioGroup, Select, TextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import { isRequired, isValidDate } from '@navikt/fp-validation';

interface Props {
    index: number;
}

export const JobbIUtlandetPanel: React.FunctionComponent<Props> = ({ index }) => {
    const intl = useIntl();

    return (
        <VStack gap="10">
            <Select
                name={`andreInntektskilder.${index}.land`}
                label={<FormattedMessage id="JobbIUtlandetPanel.LandDuHarJobbet" />}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'JobbIUtlandetPanel.Validering.LandDuHarJobber',
                        }),
                    ),
                ]}
            >
                {createCountryOptions().map((o: Record<string, any>) => (
                    <option key={o[0]} value={o[0]}>
                        {o[1]}
                    </option>
                ))}
            </Select>
            <TextField
                name={`andreInntektskilder.${index}.arbeidsgiverNavn`}
                label={<FormattedMessage id="JobbIUtlandetPanel.NavnPåArbeidsgiver" />}
                validate={[isRequired(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.NavnPåArbeidsgiver' }))]}
            />
            <RadioGroup
                name={`andreInntektskilder.${index}.pågående`}
                label={<FormattedMessage id="JobbIUtlandetPanel.JobberDuDerNå" />}
                validate={[isRequired(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.JobberDuDerNå' }))]}
            >
                <Radio value={false}>
                    <FormattedMessage id="JobbIUtlandetPanel.RadioButton.Nei" />
                </Radio>
                <Radio value={true}>
                    <FormattedMessage id="JobbIUtlandetPanel.RadioButton.Ja" />
                </Radio>
            </RadioGroup>
            <HStack gap="6">
                <Datepicker
                    name={`andreInntektskilder.${index}.fom`}
                    label={intl.formatMessage({ id: 'JobbIUtlandetPanel.Fom' })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.Required.Fom' })),
                        isValidDate(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.Valid.Fom' })),
                    ]}
                />
                <Datepicker
                    name={`andreInntektskilder.${index}.tom`}
                    label={intl.formatMessage({ id: 'JobbIUtlandetPanel.Tom' })}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.Required.Tom' })),
                        isValidDate(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.Valid.Tom' })),
                    ]}
                />
            </HStack>
        </VStack>
    );
};
