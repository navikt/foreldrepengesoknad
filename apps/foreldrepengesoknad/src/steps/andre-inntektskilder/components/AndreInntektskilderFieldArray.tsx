import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';

import { Button, HStack, Radio, VStack } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { HorizontalLine } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

import { EtterlønnEllerSluttvederlagPanel } from './EtterlønnEllerSluttvederlagPanel';
import { FørstegangstjenestePanel } from './FørstegangstjenestePanel';
import { JobbIUtlandetPanel } from './JobbIUtlandetPanel';

export type FormValues = {
    andreInntektskilder: AndreInntektskilder[];
};

export const AndreInntektskilderFieldArray = () => {
    const intl = useIntl();
    const { control, watch } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'andreInntektskilder',
    });

    const andreInntektskilder = watch('andreInntektskilder');

    return (
        <VStack gap="10">
            {fields.map((field, index) => {
                const inntektskilde = andreInntektskilder[index];
                return (
                    <VStack gap="10" key={field.id}>
                        <RhfRadioGroup
                            name={`andreInntektskilder.${index}.type`}
                            label={<FormattedMessage id="AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder" />}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'AndreInntektskilderStep.Validering.OppgiType' })),
                            ]}
                        >
                            <Radio value={AnnenInntektType.JOBB_I_UTLANDET}>
                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Utlandet" />
                            </Radio>
                            <Radio value={AnnenInntektType.SLUTTPAKKE}>
                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Etterlønn" />
                            </Radio>
                            <Radio value={AnnenInntektType.MILITÆRTJENESTE}>
                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Førstegangstjeneste" />
                            </Radio>
                        </RhfRadioGroup>
                        {inntektskilde.type === AnnenInntektType.JOBB_I_UTLANDET && (
                            <JobbIUtlandetPanel index={index} inntektskilde={inntektskilde} />
                        )}
                        {inntektskilde.type === AnnenInntektType.SLUTTPAKKE && (
                            <EtterlønnEllerSluttvederlagPanel index={index} inntektskilde={inntektskilde} />
                        )}
                        {inntektskilde.type === AnnenInntektType.MILITÆRTJENESTE && (
                            <FørstegangstjenestePanel index={index} inntektskilde={inntektskilde} />
                        )}
                        {index === 0 && fields.length > 1 && <HorizontalLine />}
                        {index !== 0 && (
                            <VStack gap="2">
                                <HStack>
                                    <Button
                                        icon={<XMarkIcon aria-hidden />}
                                        type="button"
                                        variant="tertiary"
                                        onClick={() => remove(index)}
                                    >
                                        <FormattedMessage id="AndreInntektskilderStep.Slett" />
                                    </Button>
                                </HStack>
                                <HorizontalLine />
                            </VStack>
                        )}
                    </VStack>
                );
            })}
            <HStack>
                <Button
                    icon={<PlusIcon aria-hidden />}
                    type="button"
                    variant="secondary"
                    // @ts-ignore
                    onClick={() => append({})}
                    size="small"
                >
                    <FormattedMessage id="AndreInntektskilderStep.LeggTil" />
                </Button>
            </HStack>
        </VStack>
    );
};
