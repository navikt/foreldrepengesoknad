import { FunctionComponent, ReactNode } from 'react';
import { Field, FieldProps } from 'formik';
import { get } from 'lodash';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { translateError } from 'app/utils/errorUtils';
import { Radio, RadioGroup } from '@navikt/ds-react';

type Props = {
    name: string;
    labels?: {
        ja: string;
        nei: string;
    };
    legend: string;
    description?: ReactNode;
};

const JaNeiSpørsmål: FunctionComponent<Props> = ({ labels, name, legend, description }) => {
    const intl = useIntl();
    return (
        <Field
            name={name}
            type="string"
            render={({ form }: FieldProps) => {
                const radios = [
                    {
                        label: labels ? labels.ja : getMessage(intl, 'jaNeiSpørsmål.ja'),
                        value: true,
                    },
                    {
                        label: labels ? labels.nei : getMessage(intl, 'jaNeiSpørsmål.nei'),
                        value: false,
                    },
                ];

                const feilmelding = get(form.errors, name);
                const feil = feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined;

                return (
                    <RadioGroup legend={legend} name={name} error={feil} description={description}>
                        {radios.map((radio) => {
                            return (
                                <Radio
                                    onChange={(evt) => {
                                        form.setFieldValue(name, evt.target.value === 'true');
                                    }}
                                    value={radio.value}
                                >
                                    {radio.label}
                                </Radio>
                            );
                        })}
                    </RadioGroup>
                );
            }}
        />
    );
};

export default JaNeiSpørsmål;
