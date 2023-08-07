import { InntektsinformasjonFormData } from '../../../inntektsinformasjonFormConfig';
import './arbeid-i-utlandet-input.css';
import { FormikErrors } from 'formik';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { FunctionComponent } from 'react';
import { ArbeidIUtlandetSubformComponents, ArbeidIUtlandetSubformData } from './subform/arbeidIUtlandetSubformConfig';
import { getInitialArbeidIUtlandetFormData } from './subform/arbeidIUtlandetSubformUtils';
import ArbeidIUtlandetSubform from './subform/ArbeidIUtlandetSubform';
import { arbeidIUtlandetSubformQuestionsConfig } from './subform/arbeidIUtlandetSubformQuestions';

interface Props {
    formValues: InntektsinformasjonFormData;
    erFørsteInput: boolean;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    // setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArbeidIUtlandetInput: FunctionComponent<Props> = ({
    selectedAnnenInntekt,
    erFørsteInput,
    setSelectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
    setLeggTilNyttArbeidIUtlandet,
}) => {
    return (
        <ArbeidIUtlandetSubformComponents.FormikWrapper
            initialValues={getInitialArbeidIUtlandetFormData(selectedAnnenInntekt)}
            onSubmit={() => undefined}
            renderForm={({ values: formValues, errors, validateForm }) => {
                const visibility = arbeidIUtlandetSubformQuestionsConfig.getVisbility(
                    formValues as ArbeidIUtlandetSubformData
                );
                return (
                    <ArbeidIUtlandetSubform
                        formValues={formValues}
                        errors={errors}
                        selectedAnnenInntekt={selectedAnnenInntekt}
                        erFørsteInput={erFørsteInput}
                        visibility={visibility}
                        setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                        addAnnenInntekt={addAnnenInntekt}
                        editAnnenInntekt={editAnnenInntekt}
                        setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                        validateForm={validateForm}
                    />
                );
            }}
        />
    );
};

export default ArbeidIUtlandetInput;
