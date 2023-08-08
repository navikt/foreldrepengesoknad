import { FunctionComponent } from 'react';
import { FrilansSubformComponents, FrilansSubformData } from './frilansSubformConfig';
import { getInitialFrilansSubformValues } from './frilansSubformUtils';
import { Frilans } from 'app/types/Frilans';
import FrilansInput from './FrilansInput';
import frilansSubformQuestionsConfig from './frilansSubformQuestionsConfig';

interface Props {
    frilans: Frilans | undefined;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
}

const FrilansSubform: FunctionComponent<Props> = ({ frilans, setFrilans, setRedigererFrilans }) => {
    return (
        <FrilansSubformComponents.FormikWrapper
            initialValues={getInitialFrilansSubformValues(frilans)}
            onSubmit={() => undefined}
            renderForm={({ values: formValues, errors, validateForm }) => {
                const visibility = frilansSubformQuestionsConfig.getVisbility(formValues as FrilansSubformData);
                return (
                    <FrilansInput
                        frilans={frilans}
                        setFrilans={setFrilans}
                        setRedigererFrilans={setRedigererFrilans}
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

export default FrilansSubform;
