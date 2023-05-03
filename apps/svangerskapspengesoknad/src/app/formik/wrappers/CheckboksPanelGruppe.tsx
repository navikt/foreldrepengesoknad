import { FunctionComponent } from 'react';
import { FieldArrayRenderProps, FieldArray } from 'formik';
import { Omit, get } from 'lodash';
import { translateError } from '../../utils/errorUtils';
import { useIntl } from 'react-intl';
import { Checkbox, CheckboxGroup, CheckboxGroupProps } from '@navikt/ds-react';
import { guid } from '@navikt/fp-common';

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
        <FieldArray name={name}>
            {({ form, push, remove }: FieldArrayRenderProps) => {
                const feilmelding = get(form.errors, name);
                const values = get(form.values, name) || [];

                return (
                    <CheckboxGroup
                        {...checkboksPanelGruppeProps}
                        error={feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined}
                        legend={label}
                        value={values}
                    >
                        {options.map((cb) => (
                            <Checkbox
                                key={guid()}
                                value={cb.value}
                                onChange={(event) => {
                                    const indexOfGrunnlag = values.indexOf(event.currentTarget.value);
                                    if (indexOfGrunnlag === -1) {
                                        push(event.currentTarget.value);
                                    } else {
                                        remove(indexOfGrunnlag);
                                    }
                                }}
                            >
                                {cb.label}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                );
            }}
        </FieldArray>
    );
};

export default CheckboksGruppe;
