import { Radio } from '@navikt/ds-react';
import { Block, RegistrertBarn, Søkersituasjon, hasValue, intlUtils } from '@navikt/fp-common';
import { Datepicker, RadioGroup, Select } from '@navikt/fp-form-hooks';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { validateFødselsdato, validateTermindatoFødsel } from '../validation/omBarnetValidering';
import { OmBarnetFormValues } from './OmBarnetFormValues';

interface Props {
    søkersituasjon: Søkersituasjon;
    søknadGjelderEtNyttBarn: boolean;
    barnSøktOmFørMenIkkeRegistrert: boolean;
    valgteBarn?: RegistrertBarn[];
}

const Fødsel: FunctionComponent<Props> = ({
    søkersituasjon,
    søknadGjelderEtNyttBarn,
    barnSøktOmFørMenIkkeRegistrert,
    valgteBarn,
}) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnetFormValues>();

    const formValues = formMethods.watch();

    const { erBarnetFødt, antallBarn, fødselsdatoer } = formValues;

    const intlIdFødsel =
        antallBarn !== undefined && parseInt(antallBarn, 10) > 1
            ? 'omBarnet.fødselsdato.flereBarn'
            : 'omBarnet.fødselsdato';

    if (
        søkersituasjon.situasjon === 'adopsjon' ||
        erBarnetFødt !== true ||
        (!søknadGjelderEtNyttBarn && !barnSøktOmFørMenIkkeRegistrert)
    ) {
        return null;
    }

    return (
        <>
            {(formValues.erBarnetFødt !== undefined ||
                (formValues.adopsjonAvEktefellesBarn !== undefined && hasValue(formValues.adopsjonsdato))) && (
                <Block padBottom="xl">
                    <RadioGroup
                        name="antallBarn"
                        label={intl.formatMessage({ id: 'omBarnet.antallBarn.født' })}
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
                            <FormattedMessage id="omBarnet.radiobutton.tvillinger" />
                        </Radio>
                        <Radio value="3">
                            <FormattedMessage id="omBarnet.radiobutton.flere" />
                        </Radio>
                    </RadioGroup>
                </Block>
            )}
            <Block
                padBottom="xl"
                visible={antallBarn !== undefined && søknadGjelderEtNyttBarn && parseInt(antallBarn, 10) >= 3}
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
            {hasValue(antallBarn) && (
                <Block padBottom="xl">
                    <Datepicker
                        name="fødselsdatoer.0.dato"
                        label={intlUtils(intl, intlIdFødsel)}
                        minDate={dayjs().subtract(3, 'years').toDate()}
                        maxDate={dayjs().toDate()}
                        validate={[validateFødselsdato(intl)]}
                    />
                </Block>
            )}
            {fødselsdatoer &&
                (hasValue(fødselsdatoer[0].dato) ||
                    (formValues.erBarnetFødt === false && hasValue(antallBarn)) ||
                    (valgteBarn !== undefined && valgteBarn.length > 0)) && (
                    <Block padBottom="l">
                        <Datepicker
                            name="termindato"
                            minDate={dayjs(fødselsdatoer[0].dato).subtract(1, 'months').toDate()}
                            maxDate={dayjs(fødselsdatoer[0].dato).add(6, 'months').toDate()}
                            label={intl.formatMessage({ id: 'omBarnet.termindato.født' })}
                            validate={[validateTermindatoFødsel(fødselsdatoer[0].dato, intl)]}
                        />
                    </Block>
                )}
        </>
    );
};

export default Fødsel;
