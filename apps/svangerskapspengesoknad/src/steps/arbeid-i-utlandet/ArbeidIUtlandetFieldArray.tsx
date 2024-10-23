import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { ArbeidIUtlandet, ArbeidIUtlandetType } from 'types/ArbeidIUtlandet';
import { getMinInputTilOgMedValue } from 'utils/validationUtils';

import { Button, HStack, Radio, VStack } from '@navikt/ds-react';

import { DATE_5_MONTHS_AGO, DATE_20_YEARS_AGO } from '@navikt/fp-constants';
import { RhfDatepicker, RhfRadioGroup, RhfSelect, RhfTextField } from '@navikt/fp-form-hooks';
import { HorizontalLine } from '@navikt/fp-ui';
import { bemUtils, createCountryOptions } from '@navikt/fp-utils';
import { femMånederSiden } from '@navikt/fp-utils/src/dateUtils';
import {
    hasLegalChars,
    hasMaxLength,
    isAfterDate,
    isBeforeDate,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

import './arbeidIUtlandet.css';

export const NEW_ARBEID_I_UTLANDET = {
    type: ArbeidIUtlandetType.JOBB_I_UTLANDET,
    fom: '',
    tom: '',
    pågående: undefined!,
    arbeidsgiverNavn: '',
    land: '',
};

export const ArbeidIUtlandetFieldArray: React.FunctionComponent = () => {
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
                        <RhfSelect
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
                        </RhfSelect>
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
                    <RhfTextField
                        name={`arbeidIUtlandet.${index}.arbeidsgiverNavn`}
                        style={{ width: 'var(--app-text-input-width)' }}
                        label={navnPåArbeidsgiverLabel}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.arbeidIUtlandetNavn.påkrevd' })),
                            hasMaxLength(
                                intl.formatMessage({ id: 'valideringsfeil.arbeidIUtlandetNavn.forLang' }),
                                100,
                            ),
                            hasLegalChars((ugyldigeTegn: string) =>
                                intl.formatMessage(
                                    { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
                                    {
                                        feltNavn: navnPåArbeidsgiverLabel,
                                        ugyldigeTegn: ugyldigeTegn,
                                    },
                                ),
                            ),
                        ]}
                    />
                    <RhfDatepicker
                        name={`arbeidIUtlandet.${index}.fom`}
                        label={intl.formatMessage({ id: 'arbeidIUtlandet.fom' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.påkrevd' })),
                            isValidDate(intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' }),
                            ),
                            (fom) => {
                                if (alleArbeidIUtlandet[index].tom) {
                                    return isBeforeDate(
                                        intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.førTilDato' }),
                                        alleArbeidIUtlandet[index].tom,
                                    )(fom);
                                }
                                return null;
                            },
                        ]}
                        maxDate={dayjs().toDate()}
                        minDate={DATE_20_YEARS_AGO}
                    />
                    <RhfRadioGroup
                        name={`arbeidIUtlandet.${index}.pågående`}
                        label={<FormattedMessage id="ArbeidIUtlandetFieldArray.næring.pågående" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.arbeidIUtlandetPågående.påkrevd' })),
                        ]}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RhfRadioGroup>
                    {alleArbeidIUtlandet![index].pågående === false && (
                        <RhfDatepicker
                            name={`arbeidIUtlandet.${index}.tom`}
                            label={intl.formatMessage({ id: 'arbeidIUtlandet.tom' })}
                            description={intl.formatMessage({
                                id: 'ArbeidIUtlandetFieldArray.arbeid.tom.description',
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
                            minDate={getMinInputTilOgMedValue(alleArbeidIUtlandet[index].fom, DATE_5_MONTHS_AGO)}
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
