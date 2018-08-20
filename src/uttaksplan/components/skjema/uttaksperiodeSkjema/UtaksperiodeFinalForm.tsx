import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DispatchProps } from 'common/redux/types';
import {
    Form,
    Field,
    FieldRenderProps,
    FormRenderProps,
    FieldProps
} from 'react-final-form';

import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { SkjemaelementFeil } from 'nav-frontend-skjema/src/skjemaelement-feilmelding';
import { AppState } from 'app/redux/reducers';
import { StønadskontoType } from 'uttaksplan/types';
import { Input, NavFrontendInputProps } from 'nav-frontend-skjema';
import { FormApi } from 'final-form';

export interface StateProps {
    stønadskontoer: StønadskontoType[];
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

export interface RadioProps {
    label: string;
    value: string;
    disabled?: boolean;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

interface RadioPanelFieldProps extends FieldProps {
    radioProps: {
        radios: RadioProps[];
        legend: string;
        feil?: SkjemaelementFeil;
    };
}
const RadioPanelField: React.StatelessComponent<RadioPanelFieldProps> = (
    props
) => {
    const { radioProps, value, ...fieldProps } = props;
    return (
        <Field
            {...fieldProps}
            value={value}
            type="radio"
            render={({ input, meta }: FieldRenderProps) => (
                <RadioPanelGruppeResponsive
                    {...radioProps}
                    name={input.name}
                    checked={input.value}
                    feil={
                        meta.touched && meta.error
                            ? { feilmelding: meta.error }
                            : undefined
                    }
                    onChange={(e) => {
                        input.onChange(e);
                    }}
                />
            )}
        />
    );
};

type InputFieldProps = FieldProps & NavFrontendInputProps;

const InputField: React.StatelessComponent<InputFieldProps> = (props) => {
    const { value, label, ...fieldProps } = props;
    return (
        <Field
            {...fieldProps}
            render={({ input, meta }: FieldRenderProps) => (
                <Input
                    label={label}
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    feil={
                        meta.touched && meta.error
                            ? { feilmelding: meta.error }
                            : undefined
                    }
                />
            )}
        />
    );
};

const formatNumber = (value: any, name?: string): string => {
    return (value && value.replace(/\./g, ',')) || '';
};

const parseNumber = (value: any, name?: string): string => {
    return (value && value.replace(/,/g, '.')) || '';
};

const NumberInputField: React.StatelessComponent<InputFieldProps> = (props) => {
    const { value, label, ...fieldProps } = props;
    return (
        <Field
            {...fieldProps}
            format={formatNumber}
            parse={parseNumber}
            render={({ input, meta }: FieldRenderProps) => (
                <Input
                    {...input}
                    label={label}
                    max={10}
                    feil={
                        meta.touched && meta.error
                            ? { feilmelding: meta.error }
                            : undefined
                    }
                />
            )}
        />
    );
};

interface ConditionProps {
    when: string;
    hasValue?: string | number | undefined;
    isDefined?: boolean;
    children: React.ReactNode;
}
const Condition = ({ when, isDefined, hasValue, children }: ConditionProps) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input, meta }) => {
            return isDefined
                ? input.value !== ''
                    ? children
                    : null
                : input.value === hasValue
                    ? children
                    : null;
        }}
    </Field>
);

const required = (value: any, allValues: object): string | undefined => {
    return value !== undefined ? undefined : 'Required';
};

class UttaksperiodeForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    onSubmit(values: any, form: FormApi, callback: (errors?: object) => void) {
        console.log(form);
        console.log(values);
        console.log(callback);
    }
    render() {
        const { stønadskontoer, intl } = this.props;
        return (
            <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit, values }: FormRenderProps) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <RadioPanelField
                                name="hvem"
                                value={values.hvem}
                                validate={required}
                                radioProps={{
                                    legend: 'hvem banker på',
                                    radios: [
                                        {
                                            label: 'mor',
                                            value: 'mor'
                                        },
                                        {
                                            label: 'far',
                                            value: 'far'
                                        }
                                    ]
                                }}
                            />
                            <Condition when="hvem" isDefined={true}>
                                <RadioPanelField
                                    name="konto"
                                    value={values.konto}
                                    validate={required}
                                    radioProps={{
                                        legend: 'Hvilken stønadskonto',
                                        radios: stønadskontoer.map((konto) => ({
                                            label: intl.formatMessage({
                                                id: `stønadskontotype.${konto}`
                                            }),
                                            value: konto
                                        }))
                                    }}
                                />
                            </Condition>

                            <InputField name="navn" label="Navn" />

                            <Condition when="hvem" isDefined={true}>
                                <NumberInputField
                                    name="stillingsprosent"
                                    label="Stillingsprosent"
                                    max="10"
                                    min="0"
                                    validate={required}
                                />
                            </Condition>

                            <button type="submit">ok</button>
                        </form>
                    );
                }}
            />
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const grunnlag = state.uttaksplan.uttaksplan.uttaksgrunnlag;
    return {
        stønadskontoer: grunnlag ? grunnlag.tilgjengeligeStønadskontoer : []
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
