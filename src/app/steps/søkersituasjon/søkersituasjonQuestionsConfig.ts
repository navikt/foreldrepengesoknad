import { hasValue, Kjønn } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { SøkersituasjonFormData, SøkersituasjonFormField } from './søkersituasjonFormConfig';

interface SøkersituasjonQuestionsPayload extends SøkersituasjonFormData {
    søkerKjønn: Kjønn;
}

const SøkersituasjonFormConfig: QuestionConfig<SøkersituasjonQuestionsPayload, SøkersituasjonFormField> = {
    [SøkersituasjonFormField.situasjon]: {
        isIncluded: () => true,
        isAnswered: ({ situasjon }) => hasValue(situasjon),
    },
    [SøkersituasjonFormField.rolle]: {
        isIncluded: ({ søkerKjønn }) => søkerKjønn === 'K',
        isAnswered: ({ rolle }) => hasValue(rolle),
        visibilityFilter: ({ situasjon }) => hasValue(situasjon),
    },
};

const søkersituasjonQuestionsConfig = Questions<SøkersituasjonQuestionsPayload, SøkersituasjonFormField>(
    SøkersituasjonFormConfig
);

export default søkersituasjonQuestionsConfig;
