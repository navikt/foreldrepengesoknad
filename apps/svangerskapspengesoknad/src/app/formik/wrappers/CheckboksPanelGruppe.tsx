import { FunctionComponent } from 'react';
import { FieldArrayRenderProps, Field } from 'formik';
import { Omit, get } from 'lodash';
import { translateError } from '../../utils/errorUtils';
import { useIntl } from 'react-intl';
import { Checkbox, CheckboxGroup, CheckboxGroupProps } from '@navikt/ds-react';

interface OwnProps {
    name: string;
    label: string | React.ReactNode;
    options: Array<{
        value: string;
        label: string;
    }>;
}

type Props = OwnProps & Omit<CheckboxGroupProps, 'children' | 'onChange' | 'checkboxes' | 'legend'>;

const CheckboksGruppe: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { name, label, options, ...checkboksPanelGruppeProps } = props;

    return (
        <Field
            name={name}
            render={({ form, push, remove }: FieldArrayRenderProps) => {
                const feilmelding = get(form.errors, name);
                return (
                    <CheckboxGroup
                        {...checkboksPanelGruppeProps}
                        error={feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined}
                        legend={label}
                        onChange={(val) => {
                            const values = get(form.values, name) || [];
                            const indexOfGrunnlag = values.indexOf(val);
                            if (indexOfGrunnlag === -1) {
                                push(val);
                            } else {
                                remove(indexOfGrunnlag);
                            }
                        }}
                    >
                        {options.map((cb) => (
                            <Checkbox value={cb.value}>{cb.label}</Checkbox>
                        ))}
                    </CheckboxGroup>
                );
            }}
        />
    );
};

export default CheckboksGruppe;
