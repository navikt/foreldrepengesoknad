import './arbeid-i-utlandet-input.css';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { FunctionComponent } from 'react';
import { ArbeidIUtlandetSubformComponents, ArbeidIUtlandetSubformData } from './arbeidIUtlandetSubformConfig';
import { getInitialArbeidIUtlandetFormData } from './arbeidIUtlandetSubformUtils';
import { arbeidIUtlandetSubformQuestionsConfig } from './arbeidIUtlandetSubformQuestions';
import ArbeidIUtlandetInput from './ArbeidIUtlandetInput';

interface Props {
    erFørsteInput: boolean;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArbeidIUtlandetSubform: FunctionComponent<Props> = ({
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
                    <ArbeidIUtlandetInput
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

export default ArbeidIUtlandetSubform;
