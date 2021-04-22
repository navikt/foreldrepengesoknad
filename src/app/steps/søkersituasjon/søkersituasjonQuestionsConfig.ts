import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { SøkersituasjonFormData, SøkersituasjonFormField } from './søkersituasjonFormConfig';

const SøkersituasjonFormConfig: QuestionConfig<SøkersituasjonFormData, SøkersituasjonFormField> = {
    [SøkersituasjonFormField.situasjon]: {
        isIncluded: () => true,
        isAnswered: ({ situasjon }) => situasjon !== undefined,
    },
    [SøkersituasjonFormField.rolle]: {
        isIncluded: () => true,
        isAnswered: ({ rolle }) => rolle !== undefined,
        visibilityFilter: ({ situasjon }) => situasjon !== undefined,
    },
};

const søkersituasjonQuestionsConfig = Questions<SøkersituasjonFormData, SøkersituasjonFormField>(
    SøkersituasjonFormConfig
);

export default søkersituasjonQuestionsConfig;
