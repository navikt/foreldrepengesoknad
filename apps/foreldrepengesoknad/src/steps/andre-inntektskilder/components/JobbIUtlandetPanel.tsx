import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';

import { HStack, Radio, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfSelect, RhfTextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import { isBeforeOrSame, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

import { AndreInntekterFormValues } from '../types/AndreInntekterFormValues';

interface Props {
    index: number;
    inntektskilde: AndreInntektskilder;
}

export const JobbIUtlandetPanel = ({ index, inntektskilde }: Props) => {
    const intl = useIntl();

    const { control } = useFormContext<AndreInntekterFormValues>();

    if (inntektskilde.type !== AnnenInntektType.JOBB_I_UTLANDET) {
        throw new Error('Inntektskilde ikke av type JOBB_I_UTLANDET');
    }

    return (
        <VStack gap="space-40">
            <RhfSelect
                name={`andreInntektskilder.${index}.land`}
                control={control}
                label={<FormattedMessage id="JobbIUtlandetPanel.LandDuHarJobbet" />}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'JobbIUtlandetPanel.Validering.LandDuHarJobber',
                        }),
                    ),
                ]}
            >
                {createCountryOptions().map((o) => (
                    <option key={o[0]} value={o[0]}>
                        {o[1]}
                    </option>
                ))}
            </RhfSelect>
            <RhfTextField
                name={`andreInntektskilder.${index}.arbeidsgiverNavn`}
                control={control}
                label={<FormattedMessage id="JobbIUtlandetPanel.NavnPåArbeidsgiver" />}
                validate={[isRequired(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.NavnPåArbeidsgiver' }))]}
            />
            <RhfRadioGroup
                name={`andreInntektskilder.${index}.pågående`}
                control={control}
                label={<FormattedMessage id="JobbIUtlandetPanel.JobberDuDerNå" />}
                validate={[isRequired(intl.formatMessage({ id: 'JobbIUtlandetPanel.Validering.JobberDuDerNå' }))]}
            >
                <Radio value={false}>
                    <FormattedMessage id="JobbIUtlandetPanel.RadioButton.Nei" />
                </Radio>
                <Radio value={true}>
                    <FormattedMessage id="JobbIUtlandetPanel.RadioButton.Ja" />
                </Radio>
            </RhfRadioGroup>
            <HStack gap="space-24">
                <RhfDatepicker
                    name={`andreInntektskilder.${index}.fom`}
                    control={control}
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
                    <RhfDatepicker
                        name={`andreInntektskilder.${index}.tom`}
                        control={control}
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
