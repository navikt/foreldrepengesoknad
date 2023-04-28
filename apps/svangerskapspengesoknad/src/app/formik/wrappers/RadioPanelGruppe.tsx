import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Field, FieldProps } from 'formik';
import { Omit, get } from 'lodash';
import { translateError } from 'app/utils/errorUtils';
import { Radio, RadioGroup as RadioGroupDS, RadioGroupProps, RadioProps } from '@navikt/ds-react';

export type FormikRadioProp = Omit<RadioProps, 'children' | 'name'> & {
    label: React.ReactNode;
};

interface Props extends Omit<RadioGroupProps, 'name' | 'onChange' | 'children' | 'radios'> {
    name: string;
    radios: FormikRadioProp[];
    afterOnChange?: (newValue: string) => void;
}

const RadioGroup: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { id, value, legend, radios, description, ...radioPanelGruppeProps } = props;

    return (
        <Field
            name={radioPanelGruppeProps.name}
            type="string"
            render={({ field, form }: FieldProps) => {
                const feilmelding = get(form.errors, radioPanelGruppeProps.name);
                const feil = feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined;

                return (
                    <RadioGroupDS
                        {...radioPanelGruppeProps}
                        description={description}
                        name={radioPanelGruppeProps.name}
                        legend={legend}
                        onChange={(evt) => {
                            form.setFieldValue(radioPanelGruppeProps.name, evt.target.value);
                        }}
                        error={feil}
                    >
                        {radios.map((rb, idx) => {
                            const { label, ...rest } = rb;
                            return (
                                <Radio
                                    key={idx}
                                    {...rest}
                                    name={field.name as any}
                                    onChange={(evt) => {
                                        form.setFieldValue(field.name, evt.target.value);
                                    }}
                                >
                                    {label}
                                </Radio>
                            );
                        })}
                    </RadioGroupDS>
                );
            }}
        />
    );
};
export default RadioGroup;
