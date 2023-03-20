import React, { FunctionComponent } from 'react';
import { FieldArrayRenderProps, FieldArray } from 'formik';
import CheckboksPanelGruppeResponsive, {
    CheckboxPanelgruppeResponsiveProps,
} from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { Omit, get } from 'lodash';
import { translateError } from '../../utils/errorUtils';
import { useIntl } from 'react-intl';

interface OwnProps {
    name: string;
    label: string | React.ReactNode;
    options: Array<{
        value: string;
        label: string;
    }>;
}

type Props = OwnProps & Omit<CheckboxPanelgruppeResponsiveProps, 'onChange' | 'checkboxes' | 'legend'>;

const CheckboksPanelGruppe: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { name, label, options, ...checkboksPanelGruppeProps } = props;

    return (
        <FieldArray
            name={name}
            render={({ form, push, remove }: FieldArrayRenderProps) => {
                const feilmelding = get(form.errors, name) as string;
                return (
                    <CheckboksPanelGruppeResponsive
                        {...checkboksPanelGruppeProps}
                        feil={feilmelding && form.submitCount > 0 ? translateError(intl, feilmelding) : undefined}
                        legend={label}
                        checkboxes={options.map((option) => {
                            const values = get(form.values, name);
                            return {
                                ...option,
                                checked: values && values.includes(option.value) ? true : false,
                            };
                        })}
                        onChange={(_, value) => {
                            const values = get(form.values, name) || [];
                            const indexOfGrunnlag = values.indexOf(value);
                            if (indexOfGrunnlag === -1) {
                                push(value);
                            } else {
                                remove(indexOfGrunnlag);
                            }
                        }}
                    />
                );
            }}
        />
    );
};

export default CheckboksPanelGruppe;
