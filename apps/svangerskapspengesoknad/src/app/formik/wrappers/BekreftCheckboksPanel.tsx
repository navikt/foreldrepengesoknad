import { ReactNode } from 'react';
import { Field, FieldProps } from 'formik';
import { ConfirmationPanel } from '@navikt/ds-react';

interface Props {
    label: string;
    name: string;
    children?: ReactNode;
    className?: string;
}

const BekreftCheckboksPanel: React.FunctionComponent<Props> = ({ name, label, children, className }) => {
    return (
        <Field
            name={name}
            type="checkbox"
            render={({ form }: FieldProps) => (
                <ConfirmationPanel
                    checked={form.values[name]}
                    label={label}
                    onChange={(value) => {
                        form.setFieldValue(name, value);
                    }}
                    className={className}
                >
                    {children}
                </ConfirmationPanel>
            )}
        />
    );
};

export default BekreftCheckboksPanel;
