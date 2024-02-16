import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, HStack, Radio, VStack } from '@navikt/ds-react';
import { bemUtils, date20YearsAgo, date5MonthsAgo } from '@navikt/fp-common';
import { Datepicker, RadioGroup, Select, TextField } from '@navikt/fp-form-hooks';
import { createCountryOptions } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';
import { getMinInputTilOgMedValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { getUferdigArbeidIUtlandetInput } from './arbeidIUtlandetFormUtils';
import {
    validateArbeidIUtlandetFom,
    validateArbeidIUtlandetNavnArbeidsgiver,
    validateArbeidIUtlandetTom,
} from './arbeidIUtlandetValidation';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';

import './arbeidIUtlandet.css';

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
                        validate={[validateArbeidIUtlandetNavnArbeidsgiver(intl, navnPåArbeidsgiverLabel)]}
                        maxLength={100}
                    />
                    <Datepicker
                        name={`arbeidIUtlandet.${index}.fom`}
                        label={intl.formatMessage({ id: 'arbeidIUtlandet.fom' })}
                        validate={[validateArbeidIUtlandetFom(intl, alleArbeidIUtlandet[index].tom)]}
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
                            validate={[validateArbeidIUtlandetTom(intl, alleArbeidIUtlandet![index].fom)]}
                            maxDate={dayjs().add(9, 'month').toDate()}
                            minDate={getMinInputTilOgMedValue(alleArbeidIUtlandet![index].fom, date5MonthsAgo)}
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
                    onClick={() => append(getUferdigArbeidIUtlandetInput())}
                >
                    {intl.formatMessage({ id: 'arbeidIUtlandet.tittel.ny' })}
                </Button>
            </HStack>
        </>
    );
};

export default ArbeidIUtlandetFieldArray;
