import { FileIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, HStack, Radio, Select, VStack } from '@navikt/ds-react';
import { Datepicker, RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, isValidDate } from '@navikt/fp-validation';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { BarnetFormValues } from '../OmBarnetFormValues';
import FødselsdatoerFieldArray from './FødselsdatoerFieldArray';

dayjs.extend(isSameOrBefore);

interface Props {
    søknadGjelderEtNyttBarn: boolean;
}

const AdopsjonPanel: FunctionComponent<Props> = ({ søknadGjelderEtNyttBarn }) => {
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
            <RadioGroup
                name="adopsjonAvEktefellesBarn"
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
            </RadioGroup>
            <Datepicker
                name="adopsjonsdato"
                label={
                    adopsjonAvEktefellesBarn
                        ? intl.formatMessage({ id: 'omBarnet.adopsjonsdato.stebarn' })
                        : intl.formatMessage({ id: 'omBarnet.adopsjonsdato.annetBarn' })
                }
                validate={[
                    isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi' })),
                    isValidDate(intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat' })),
                ]}
            />
            <Box padding="4" background="surface-alt-3-subtle" borderRadius="medium">
                <HStack gap="2">
                    <FileIcon height={24} width={24} color="#005B82" />
                    <VStack gap="2" style={{ width: '85%' }}>
                        <BodyLong>
                            <FormattedMessage id="omBarnet.opplaste.bekreftelse" />
                        </BodyLong>
                    </VStack>
                </HStack>
            </Box>
            {søknadGjelderEtNyttBarn && (
                <>
                    <RadioGroup
                        name="antallBarn"
                        label={intl.formatMessage({ id: 'omBarnet.antallBarn.adopsjon.født' })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.omBarnet.adopsjon.født.duMåOppgi',
                                }),
                            ),
                        ]}
                    >
                        <Radio value="1">
                            <FormattedMessage id="omBarnet.radiobutton.ettBarn" />
                        </Radio>
                        <Radio value="2">
                            <FormattedMessage id="omBarnet.radiobutton.toBarn" />
                        </Radio>
                        <Radio value="3">
                            <FormattedMessage id="omBarnet.radiobutton.flere" />
                        </Radio>
                    </RadioGroup>
                    {antallBarn === 3 && (
                        <Select name="antallBarnSelect" label="Antall barn">
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </Select>
                    )}
                    <FødselsdatoerFieldArray
                        adopsjonsdato={adopsjonsdato}
                        antallBarn={antallBarn}
                        antallBarnDropDown={antallBarnSelect}
                    />
                </>
            )}
            {adopsjonAvEktefellesBarn === false && (
                <>
                    <RadioGroup
                        name="adoptertIUtlandet"
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
                    </RadioGroup>
                    {adoptertIUtlandet === true && (
                        <Datepicker
                            name="ankomstdato"
                            minDate={fødselsdatoer ? dayjs(fødselsdatoer[0].dato).toDate() : undefined}
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

export default AdopsjonPanel;
