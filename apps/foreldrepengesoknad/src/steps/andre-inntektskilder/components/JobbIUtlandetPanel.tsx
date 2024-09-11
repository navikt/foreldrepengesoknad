import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';

import { HStack, Radio, VStack } from '@navikt/ds-react';

import { Datepicker, RadioGroup, Select, TextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import { isBeforeOrSame, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

interface Props {
    index: number;
    inntektskilde: AndreInntektskilder;
}

export const JobbIUtlandetPanel: React.FunctionComponent<Props> = ({ index, inntektskilde }) => {
    const intl = useIntl();

    if (inntektskilde.type !== AnnenInntektType.JOBB_I_UTLANDET) {
        throw Error('Inntektskilde ikke av type JOBB_I_UTLANDET');
    }

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
                    maxDate={dayjs()}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.Required.Fom' })),
                        isValidDate(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.Valid.Fom' })),
                        isBeforeTodayOrToday(
                            intl.formatMessage({ id: 'JobbIUtlandetPanel.FraOgMedDato.ErIFremtiden' }),
                        ),
                        isBeforeOrSame(
                            intl.formatMessage({ id: 'JobbIUtlandetPanel.FraOgMedDato.FørTilDato' }),
                            inntektskilde.pågående === false ? inntektskilde.tom : dayjs(),
                        ),
                    ]}
                />
                {inntektskilde.pågående === false && (
                    <Datepicker
                        name={`andreInntektskilder.${index}.tom`}
                        label={intl.formatMessage({ id: 'JobbIUtlandetPanel.Tom' })}
                        maxDate={dayjs()}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.Required.Tom' })),
                            isValidDate(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.Valid.Tom' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'JobbIUtlandetPanel.TilOgMedDato.ErIFremtiden' }),
                            ),
                        ]}
                    />
                )}
            </HStack>
        </VStack>
    );
};
