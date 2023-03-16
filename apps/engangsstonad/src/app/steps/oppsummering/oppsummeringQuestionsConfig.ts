import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OppsummeringFormData, OppsummeringFormField } from './oppsummeringFormConfig';

const OppsummeringFormConfig: QuestionConfig<OppsummeringFormData, OppsummeringFormField> = {
    [OppsummeringFormField.oppgittKorrekteOpplysninger]: {
        isIncluded: () => true,
        isAnswered: ({ oppgittKorrekteOpplysninger }) => oppgittKorrekteOpplysninger === true,
    },
};

const oppsummeringQuestionsConfig = Questions<OppsummeringFormData, OppsummeringFormField>(OppsummeringFormConfig);

export default oppsummeringQuestionsConfig;
