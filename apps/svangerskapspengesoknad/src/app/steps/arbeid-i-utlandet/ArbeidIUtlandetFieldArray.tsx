import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, HStack, Radio, VStack } from '@navikt/ds-react';
import { bemUtils, date20YearsAgo, date5MonthsAgo, validateTextInputField } from '@navikt/fp-common';
import { Datepicker, RadioGroup, Select, TextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import {
    isAfterDate,
    isBeforeDate,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
    hasMaxLength,
} from '@navikt/fp-validation';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { getMinInputTilOgMedValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { HorizontalLine } from '@navikt/fp-ui';
import { femMånederSiden } from '@navikt/fp-utils/src/dateUtils';
import './arbeidIUtlandet.css';

export const NEW_ARBEID_I_UTLANDET = {
    fom: '',
    tom: '',
    pågående: undefined!,
    arbeidsgiverNavn: '',
    land: '',
};

const ArbeidIUtlandetFieldArray: React.FunctionComponent = () => {
    const bem = bemUtils('arbeidIUtlandet');
    const intl = useIntl();

    const formMethods = useFormContext<ArbeidIUtlandet>();
    const { fields, append, remove } = useFieldArray({
        name: 'arbeidIUtlandet',
        control: formMethods.control,
    });

    const alleArbeidIUtlandet = formMethods.watch(`arbeidIUtlandet`);

    const navnPåArbeidsgiverLabel = intl.formatMessage({ id: 'arbeidIUtlandet.navn' });

    return (
        <>
            {fields.map((field, index) => (
                <VStack key={field.id} gap="10">
                    <HStack justify="space-between">
                        <Select
                            name={`arbeidIUtlandet.${index}.land`}
                            style={{ width: 'var(--app-text-input-width)' }}
                            label={intl.formatMessage({ id: 'arbeidIUtlandet.land' })}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.arbeidIUtlandetLand.påkrevd' })),
                            ]}
                        >
                            {createCountryOptions().map((o: Record<string, any>) => (
                                <option key={o[0]} value={o[0]}>
                                    {o[1]}
                                </option>
                            ))}
                        </Select>
                        {index !== 0 && (
                            <Button
                                className={bem.element('delete')}
                                icon={<XMarkIcon aria-hidden />}
                                type="button"
                                variant="tertiary"
                                onClick={() => remove(index)}
                            >
                                <FormattedMessage id="perioder.varierende.slett" />
                            </Button>
                        )}
                    </HStack>
                    <TextField
                        name={`arbeidIUtlandet.${index}.arbeidsgiverNavn`}
                        style={{ width: 'var(--app-text-input-width)' }}
                        label={navnPåArbeidsgiverLabel}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.arbeidIUtlandetNavn.påkrevd' })),
                            hasMaxLength(
                                intl.formatMessage({ id: 'valideringsfeil.arbeidIUtlandetNavn.forLang' }),
                                100,
                            ),
                            (navn: string) => validateTextInputField(navn, navnPåArbeidsgiverLabel, intl),
                        ]}
                        maxLength={100}
                    />
                    <Datepicker
                        name={`arbeidIUtlandet.${index}.fom`}
                        label={intl.formatMessage({ id: 'arbeidIUtlandet.fom' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.påkrevd' })),
                            isValidDate(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' }),
                            ),
                            isBeforeDate(
                                intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.førTilDato' }),
                                alleArbeidIUtlandet[index].tom,
                            ),
                        ]}
                        maxDate={dayjs().toDate()}
                        minDate={date20YearsAgo}
                    />
                    <RadioGroup
                        name={`arbeidIUtlandet.${index}.pågående`}
                        label={<FormattedMessage id="egenNæring.næring.pågående" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.arbeidIUtlandetPågående.påkrevd' })),
                        ]}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RadioGroup>
                    {alleArbeidIUtlandet![index].pågående === false && (
                        <Datepicker
                            name={`arbeidIUtlandet.${index}.tom`}
                            label={intl.formatMessage({ id: 'arbeidIUtlandet.tom' })}
                            description={intl.formatMessage({
                                id: 'egenNæring.arbeid.tom.description',
                            })}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.påkrevd' })),
                                isValidDate(intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' })),
                                isBeforeDate(
                                    intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.erIFremtiden' }),
                                    dayjs().add(9, 'month'),
                                ),
                                isAfterDate(
                                    intl.formatMessage({
                                        id: 'valideringsfeil.tilOgMedDato.arbeidIUtlandet.merEnn5MånederSiden',
                                    }),
                                    femMånederSiden(),
                                ),
                                isAfterDate(
                                    intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.etterFraDato' }),
                                    alleArbeidIUtlandet[index].fom,
                                ),
                            ]}
                            maxDate={dayjs().add(9, 'month').toDate()}
                            minDate={getMinInputTilOgMedValue(alleArbeidIUtlandet[index].fom, date5MonthsAgo)}
                        />
                    )}
                    {index < fields.length - 1 && <HorizontalLine />}
                </VStack>
            ))}
            <HStack>
                <Button
                    icon={<PlusIcon aria-hidden />}
                    type="button"
                    variant="secondary"
                    onClick={() => append(NEW_ARBEID_I_UTLANDET)}
                >
                    <FormattedMessage id="arbeidIUtlandet.tittel.ny" />
                </Button>
            </HStack>
        </>
    );
};

export default ArbeidIUtlandetFieldArray;
