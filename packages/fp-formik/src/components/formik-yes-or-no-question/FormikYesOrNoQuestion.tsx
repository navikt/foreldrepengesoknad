import { TestProps, TypedFormInputValidationProps, YesOrNo } from './../../types';
import FormikRadioGroup, { FormikRadioGroupProps } from './../formik-radio-group/FormikRadioGroup';

export interface FormikYesOrNoQuestionProps<FieldName, ErrorType>
    extends TestProps,
        Omit<FormikRadioGroupProps<FieldName, ErrorType>, 'radios'> {
    labels?: {
        [YesOrNo.YES]?: string;
        [YesOrNo.NO]?: string;
    };
}

function FormikYesOrNoQuestion<FieldName, ErrorType>({
    name,
    labels,
    ...restProps
}: FormikYesOrNoQuestionProps<FieldName, ErrorType> & TypedFormInputValidationProps<FieldName, ErrorType>) {
    const { yes: yesLabel = 'Ja', no: noLabel = 'Nei' } = labels || {};
    const testKey = restProps['data-testid'];
    delete restProps['data-testid'];

    return (
        <FormikRadioGroup<FieldName, ErrorType>
            data-testid={testKey}
            {...restProps}
            radios={[
                { label: yesLabel, value: YesOrNo.YES, ['data-testid']: testKey ? `${testKey}_yes` : undefined },
                { label: noLabel, value: YesOrNo.NO, ['data-testid']: testKey ? `${testKey}_no` : undefined },
            ]}
            name={name}
        />
    );
}

export default FormikYesOrNoQuestion;
