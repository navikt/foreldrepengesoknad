import { Radio, Select } from '@navikt/ds-react';
import { Datepicker, RadioGroup } from '@navikt/fp-form-hooks';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import FødselsdatoerFieldArray from '../components/FødselsdatoerFieldArray';
import { BarnetFormValues } from '../components/OmBarnetFormValues';
import { validateAdopsjonsdato } from '../validation/omBarnetValidering';

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
                // validate={[
                //     isRequired(
                //         intl.formatMessage({
                //             id: 'valideringsfeil.annenForelder',
                //         }),
                //     ),
                // ]}
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
                validate={[validateAdopsjonsdato(intl)]}
            />
            {søknadGjelderEtNyttBarn && (
                <>
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
                        // validate={[
                        //     isRequired(
                        //         intl.formatMessage({
                        //             id: 'valideringsfeil.annenForelder',
                        //         }),
                        //     ),
                        // ]}
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
                            //validate={(value) => validateAnkomstdato(intl)(value, formValues.fødselsdatoer[0])}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default AdopsjonPanel;
