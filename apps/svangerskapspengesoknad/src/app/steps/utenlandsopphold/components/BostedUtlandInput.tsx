import { BostedUtland } from 'app/types/BostedUtland';
import { FunctionComponent } from 'react';
import { getInitialOppholdFormData } from './subform/bostedUtlandSubformUtils';
import { BostedUtlandSubformComponents, BostedUtlandSubformData } from './subform/bostedUtlandSubformConfig';
import BostedUtlandSubform from './subform/BostedUtlandSubform';
import { bostedUtlandFormQuestionsConfig } from './subform/BostedUtlandSubformQuestions';

interface Props {
    currentOppholdId: number | undefined;
    selectedOpphold: BostedUtland | undefined;
    alleOpphold: BostedUtland[];
    oppgirIFortid: boolean;
    addOpphold: (inntekt: BostedUtland) => void;
    editOpphold: (oppholdSomEditeres: BostedUtland, oppdatertOpphold: BostedUtland) => void;
    setSelectedOpphold: React.Dispatch<React.SetStateAction<BostedUtland | undefined>>;
    setLeggerTilNyttOppholdIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}
const BostedUtlandInput: FunctionComponent<Props> = ({
    currentOppholdId,
    oppgirIFortid,
    alleOpphold,
    selectedOpphold,
    addOpphold,
    editOpphold,
    setSelectedOpphold,
    setLeggerTilNyttOppholdIUtlandet,
}) => {
    return (
        <BostedUtlandSubformComponents.FormikWrapper
            initialValues={getInitialOppholdFormData(selectedOpphold)}
            onSubmit={() => undefined}
            renderForm={({ values: formValues, errors, validateForm }) => {
                const visibility = bostedUtlandFormQuestionsConfig.getVisbility(formValues as BostedUtlandSubformData);
                return (
                    <BostedUtlandSubform
                        currentOppholdId={currentOppholdId}
                        selectedOpphold={selectedOpphold}
                        alleOpphold={alleOpphold}
                        oppgirIFortid={oppgirIFortid}
                        formValues={formValues}
                        errors={errors}
                        visibility={visibility}
                        setSelectedOpphold={setSelectedOpphold}
                        editOpphold={editOpphold}
                        addOpphold={addOpphold}
                        validateForm={validateForm}
                        setLeggerTilNyttOppholdIUtlandet={setLeggerTilNyttOppholdIUtlandet}
                    />
                );
            }}
        />
    );
};

export default BostedUtlandInput;
