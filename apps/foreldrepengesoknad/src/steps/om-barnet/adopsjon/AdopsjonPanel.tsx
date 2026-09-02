import { FileIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, Box, HStack, Radio, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import { AntallBarnSelect } from '../AntallBarnSelect';
import { BarnetFormValues } from '../OmBarnetFormValues';
import { FødselsdatoerFieldArray, FormValues as FødselsdatoerFormValues } from './FødselsdatoerFieldArray';

dayjs.extend(isSameOrBefore);

interface Props {
    søknadGjelderEtNyttBarn: boolean;
}

export const AdopsjonPanel = ({ søknadGjelderEtNyttBarn }: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<BarnetFormValues>();
    const { control } = useFormContext<FødselsdatoerFormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fødselsdatoer',
    });

    const adopsjonAvEktefellesBarn = formMethods.watch('adopsjonAvEktefellesBarn');
    const antallBarn = formMethods.watch('antallBarn');
    const adopsjonsdato = formMethods.watch('adopsjonsdato');
    const oppdaterFødselsdatoer = (antall: number) => {
        const diff = fields.length - antall;
        if (diff > 0) {
            remove(Array.from({ length: diff }, (_, index) => fields.length - index - 1));
        }
        if (diff < 0) {
            append(Array.from({ length: -diff }, () => ({ dato: undefined })));
        }
    };

    return (
        <>
            <RhfRadioGroup
                name="adopsjonAvEktefellesBarn"
                control={formMethods.control}
                label={intl.formatMessage({ id: 'omBarnet.adopsjonGjelder' })}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.omBarnet.adopsjonGjelder.duMåOppgi',
                        }),
                    ),
                ]}
            >
                <Radio value={true}>Ja</Radio>
                <Radio value={false}>Nei</Radio>
            </RhfRadioGroup>
            <VStack gap="space-16">
                <RhfDatepicker
                    name="adopsjonsdato"
                    control={formMethods.control}
                    label={
                        adopsjonAvEktefellesBarn
                            ? intl.formatMessage({ id: 'omBarnet.adopsjonsdato.stebarn' })
                            : intl.formatMessage({ id: 'omBarnet.adopsjonsdato.annetBarn' })
                    }
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi' })),
                        isValidDate(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat' }),
                        ),
                    ]}
                />
                <Box padding="space-16" background="brand-blue-moderate" borderRadius="4">
                    <HStack gap="space-8">
                        <FileIcon height={24} width={24} color="#005B82" />
                        <VStack gap="space-8" style={{ width: '85%' }}>
                            <BodyLong>
                                <FormattedMessage id="omBarnet.opplaste.bekreftelse" />
                            </BodyLong>
                        </VStack>
                    </HStack>
                </Box>
            </VStack>
            {søknadGjelderEtNyttBarn && (
                <>
                    <RhfRadioGroup
                        name="antallBarn"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'omBarnet.antallBarn.adopsjon.født' })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.omBarnet.adopsjon.født.duMåOppgi',
                                }),
                            ),
                        ]}
                        onChange={(value) => {
                            const antall = Number(value);
                            if (antall < 3) {
                                oppdaterFødselsdatoer(antall);
                            }
                        }}
                    >
                        <Radio value={1}>
                            <FormattedMessage id="omBarnet.radiobutton.ettBarn" />
                        </Radio>
                        <Radio value={2}>
                            <FormattedMessage id="omBarnet.radiobutton.toBarn" />
                        </Radio>
                        <Radio value={3}>
                            <FormattedMessage id="omBarnet.radiobutton.flere" />
                        </Radio>
                    </RhfRadioGroup>
                    {antallBarn === 3 && <AntallBarnSelect onChange={oppdaterFødselsdatoer} />}
                    <FødselsdatoerFieldArray adopsjonsdato={adopsjonsdato} fields={fields} />
                </>
            )}
        </>
    );
};
