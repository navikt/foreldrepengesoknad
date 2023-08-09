import { FunctionComponent } from 'react';
import { EgenNæringSubformComponents, EgenNæringSubformData } from './egenNæringSubformConfig';
import { getInitialEgenNæringSubformValues } from './egenNæringSubformUtils';
import { Næring } from 'app/types/Næring';
import EgenNæringInput from './EgenNæringInput';
import { egenNæringSubformQuestionsConfig } from './egenNæringSubformQuestions';

interface Props {
    erFørsteInput: boolean;
    selectedNæring: Næring | undefined;
    allNæring: Næring[];
    setSelectedNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    addNæring: (inntekt: Næring) => void;
    editNæring: (inntektSomEditeres: Næring, oppdatertInntekt: Næring) => void;
    setLeggTilNyNæring: React.Dispatch<React.SetStateAction<boolean>>;
}

const EgenNæringSubform: FunctionComponent<Props> = ({
    selectedNæring,
    erFørsteInput,
    allNæring,
    setSelectedNæring,
    addNæring,
    editNæring,
    setLeggTilNyNæring,
}) => {
    return (
        <EgenNæringSubformComponents.FormikWrapper
            initialValues={getInitialEgenNæringSubformValues(selectedNæring)}
            onSubmit={() => undefined}
            renderForm={({ values: formValues, errors, validateForm }) => {
                const visibility = egenNæringSubformQuestionsConfig.getVisbility(formValues as EgenNæringSubformData);
                return (
                    <EgenNæringInput
                        allNæring={allNæring}
                        formValues={formValues}
                        errors={errors}
                        selectedNæring={selectedNæring}
                        erFørsteInput={erFørsteInput}
                        visibility={visibility}
                        setSelectedNæring={setSelectedNæring}
                        addNæring={addNæring}
                        editNæring={editNæring}
                        setLeggTilNyNæring={setLeggTilNyNæring}
                        validateForm={validateForm}
                    />
                );
            }}
        />
    );
};

export default EgenNæringSubform;
