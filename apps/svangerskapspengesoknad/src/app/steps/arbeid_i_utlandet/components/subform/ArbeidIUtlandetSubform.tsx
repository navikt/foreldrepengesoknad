import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { FunctionComponent } from 'react';
import { ArbeidIUtlandetSubformComponents, ArbeidIUtlandetSubformData } from './arbeidIUtlandetSubformConfig';
import { getInitialArbeidIUtlandetFormData } from './arbeidIUtlandetSubformUtils';
import { arbeidIUtlandetSubformQuestionsConfig } from './arbeidIUtlandetSubformQuestions';
import ArbeidIUtlandetInput from './ArbeidIUtlandetInput';

interface Props {
    erFørsteInput: boolean;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    allArbeidIUtlandet: ArbeidIUtlandet[];
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
    setFeilmelding: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ArbeidIUtlandetSubform: FunctionComponent<Props> = ({
    selectedAnnenInntekt,
    erFørsteInput,
    allArbeidIUtlandet,
    setSelectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
    setLeggTilNyttArbeidIUtlandet,
    setFeilmelding,
}) => {
    return (
        <ArbeidIUtlandetSubformComponents.FormikWrapper
            initialValues={getInitialArbeidIUtlandetFormData(selectedAnnenInntekt)}
            onSubmit={() => console.log('')}
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
                        allArbeidIUtlandet={allArbeidIUtlandet}
                        setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                        addAnnenInntekt={addAnnenInntekt}
                        editAnnenInntekt={editAnnenInntekt}
                        setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                        validateForm={validateForm}
                        setFeilmelding={setFeilmelding}
                    />
                );
            }}
        />
    );
};

export default ArbeidIUtlandetSubform;
