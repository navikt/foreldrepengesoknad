import * as React from 'react';
import { ForeldrepengesøknadValues } from '../types/ForeldrepengesøknadValues';
import { Field, FieldProps } from 'formik';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';

interface Props {
    name: string;
    radios: RadioProps[];
    legend: string;
    checked?: string;
}

const RadioPanelGruppeResponsiveField: React.StatelessComponent<Props> = (props) => {
    return (
        <Field
            render={({ field }: FieldProps<ForeldrepengesøknadValues>) => {
                return <RadioPanelGruppeResponsive onChange={field.onChange} {...props} />;
            }}
        />
    );
};

export default RadioPanelGruppeResponsiveField;
