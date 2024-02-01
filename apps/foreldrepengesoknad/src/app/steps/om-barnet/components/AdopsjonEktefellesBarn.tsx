import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio } from '@navikt/ds-react';

import { Block, hasValue } from '@navikt/fp-common';
import { Datepicker, RadioGroup, Select } from '@navikt/fp-form-hooks';

import { validateAdopsjonsdato } from '../validation/omBarnetValidering';
import AdopsjonFodselFieldArray from './AdopsjonFodselFieldArray';
import { OmBarnetFormValues } from './OmBarnetFormValues';

interface Props {
    søknadGjelderEtNyttBarn: boolean;
}

const AdopsjonEktefellesBarn: FunctionComponent<Props> = ({ søknadGjelderEtNyttBarn }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnetFormValues>();

    const formValues = formMethods.watch();

    return (
        <>
            <Block padBottom="xl">
                <Datepicker
                    name="adopsjonsdato"
                    label={intl.formatMessage({ id: 'omBarnet.adopsjonsdato.stebarn' })}
                    validate={[validateAdopsjonsdato(intl)]}
                />
            </Block>
            {søknadGjelderEtNyttBarn &&
                (formValues.erBarnetFødt !== undefined ||
                    (formValues.adopsjonAvEktefellesBarn !== undefined && hasValue(formValues.adopsjonsdato))) && (
                    <Block padBottom="xl">
                        <RadioGroup
                            name="antallBarn"
                            label={intl.formatMessage({ id: 'omBarnet.antallBarn.adopsjon.født' })}
                            // validate={[
                            //     isRequired(
                            //         intl.formatMessage({
                            //             id: 'valideringsfeil.annenForelder',
                            //         }),
                            //     ),
                            // ]}
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
                    </Block>
                )}
            <Block
                padBottom="xl"
                visible={
                    formValues.antallBarn !== undefined &&
                    søknadGjelderEtNyttBarn &&
                    parseInt(formValues.antallBarn, 10) >= 3
                }
            >
                <Select name="antallBarnSelect" label="Antall barn">
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </Select>
            </Block>
            {formValues.antallBarn && (
                <Block padBottom="xl">
                    <AdopsjonFodselFieldArray
                        adopsjonsdato={formValues.adopsjonsdato}
                        antallBarn={parseInt(formValues.antallBarn, 10)}
                        antallBarnDropDown={formValues.antallBarnSelect}
                    />
                </Block>
            )}
        </>
    );
};

export default AdopsjonEktefellesBarn;
