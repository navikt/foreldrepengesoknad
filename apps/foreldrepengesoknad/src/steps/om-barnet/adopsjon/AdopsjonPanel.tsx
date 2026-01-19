import { FileIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, Box, HStack, Radio, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfSelect } from '@navikt/fp-form-hooks';
import { førsteOktober2021ReglerGjelder } from '@navikt/fp-uttaksplan';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import { BarnetFormValues } from '../OmBarnetFormValues';
import { FødselsdatoerFieldArray } from './FødselsdatoerFieldArray';

dayjs.extend(isSameOrBefore);

interface Props {
    søknadGjelderEtNyttBarn: boolean;
}

export const AdopsjonPanel = ({ søknadGjelderEtNyttBarn }: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<BarnetFormValues>();

    const adopsjonAvEktefellesBarn = formMethods.watch('adopsjonAvEktefellesBarn');
    const antallBarn = formMethods.watch('antallBarn');
    const antallBarnSelect = formMethods.watch('antallBarnSelect');
    const adopsjonsdato = formMethods.watch('adopsjonsdato');
    const adoptertIUtlandet = formMethods.watch('adoptertIUtlandet');
    const fødselsdatoer = formMethods.watch('fødselsdatoer');

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
                    {antallBarn === 3 && (
                        <RhfSelect name="antallBarnSelect" control={formMethods.control} label="Antall barn">
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </RhfSelect>
                    )}
                    <FødselsdatoerFieldArray
                        adopsjonsdato={adopsjonsdato}
                        antallBarn={antallBarn}
                        antallBarnDropDown={antallBarnSelect}
                    />
                </>
            )}
            {adopsjonAvEktefellesBarn === false && !førsteOktober2021ReglerGjelder(adopsjonsdato) && (
                <>
                    <RhfRadioGroup
                        name="adoptertIUtlandet"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'omBarnet.adopteresFraUtlandet' })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.omBarnet.adopteresFraUtlandet.duMåOppgi',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RhfRadioGroup>
                    {adoptertIUtlandet === true && (
                        <RhfDatepicker
                            name="ankomstdato"
                            control={formMethods.control}
                            minDate={fødselsdatoer ? dayjs(fødselsdatoer[0]!.dato).toDate() : undefined}
                            maxDate={dayjs().add(6, 'months').toDate()}
                            label={intl.formatMessage({ id: 'omBarnet.ankomstDato' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi' }),
                                ),
                                isValidDate(
                                    intl.formatMessage({
                                        id: 'valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat',
                                    }),
                                ),
                                (ankomstdato) => {
                                    return fødselsdatoer[0]?.dato !== undefined &&
                                        !dayjs(fødselsdatoer[0].dato).isSameOrBefore(ankomstdato, 'day')
                                        ? intl.formatMessage({
                                              id: 'valideringsfeil.omBarnet.ankomstDato.førFødselsdato',
                                          })
                                        : undefined;
                                },
                            ]}
                        />
                    )}
                </>
            )}
        </>
    );
};
