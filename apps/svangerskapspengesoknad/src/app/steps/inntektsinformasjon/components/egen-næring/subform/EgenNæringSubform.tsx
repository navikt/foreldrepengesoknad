import { FunctionComponent } from 'react';
import { EgenNæringSubformComponents, EgenNæringSubformData } from './egenNæringSubformConfig';
import { getInitialEgenNæringSubformValues } from './egenNæringSubformUtils';
import { Næring } from 'app/types/Næring';
import EgenNæringInput from './EgenNæringInput';
import { egenNæringSubformQuestionsConfig } from './egenNæringSubformQuestions';

interface Props {
    næring: Næring | undefined;
    setNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    setRedigererNæring: React.Dispatch<React.SetStateAction<boolean>>;
}

const EgenNæringSubform: FunctionComponent<Props> = ({ næring, setNæring, setRedigererNæring }) => {
    return (
        <EgenNæringSubformComponents.FormikWrapper
            initialValues={getInitialEgenNæringSubformValues(næring)}
            onSubmit={() => undefined}
            renderForm={({ values: formValues, errors, validateForm }) => {
                const visibility = egenNæringSubformQuestionsConfig.getVisbility(formValues as EgenNæringSubformData);
                return (
                    <EgenNæringInput
                        næring={næring}
                        setNæring={setNæring}
                        setRedigererNæring={setRedigererNæring}
                        formValues={formValues}
                        errors={errors}
                        visibility={visibility}
                        validateForm={validateForm}
                    />
                );
            }}
        />
    );
};

export default EgenNæringSubform;
