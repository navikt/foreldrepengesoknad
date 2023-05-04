import { ReactNode } from 'react';
import { Field, FieldProps } from 'formik';
import { ConfirmationPanel } from '@navikt/ds-react';
import { get } from 'lodash';
import { translateError } from 'app/utils/errorUtils';
import { useIntl } from 'react-intl';

interface Props {
    label: string;
    name: string;
    children?: ReactNode;
    className?: string;
}

const BekreftCheckboksPanel: React.FunctionComponent<Props> = ({ name, label, children, className }) => {
    const intl = useIntl();

    return (
        <Field name={name} type="checkbox">
            {({ form }: FieldProps) => {
                const feilmelding = get(form.errors, name);
                const feil =
                    feilmelding && form.submitCount > 0
                        ? {
                              feilmelding: translateError(intl, feilmelding),
                          }
                        : undefined;
                return (
                    <ConfirmationPanel
                        checked={form.values[name]}
                        label={label}
                        onChange={(value) => {
                            form.setFieldValue(name, value);
                        }}
                        className={className}
                        error={feil?.feilmelding}
                    >
                        {children}
                    </ConfirmationPanel>
                );
            }}
        </Field>
    );
};

export default BekreftCheckboksPanel;
