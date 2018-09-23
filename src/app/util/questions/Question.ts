export type QuestionValue = string | number | boolean | Date | undefined;

export const questionIsAnswered = (value: QuestionValue) => {
    return value !== undefined && value !== '';
};

export interface QuestionConfig<P> {
    [key: string]: {
        getValue: (props: P) => QuestionValue;
        parentQuestion?: string;
        ownDependency?: (props: P) => boolean;
        isOptional?: boolean;
    };
}

const isQuestionVisible = <P>(questions: QuestionConfig<P>, question: string, payload: P): boolean => {
    const config = questions[question];
    const ownDependencyIsMet = config.ownDependency ? config.ownDependency(payload) : true;
    if (ownDependencyIsMet === false) {
        return false;
    }
    if (config.parentQuestion === undefined) {
        return ownDependencyIsMet;
    } else {
        const parentHasValidValue = questionIsAnswered(questions[config.parentQuestion].getValue(payload));
        return parentHasValidValue && isQuestionVisible(questions, config.parentQuestion, payload);
    }
};

export const Questions = <P>(questions: QuestionConfig<P>) => ({
    allQuestionsAreAnswered: (payload: P) => {
        let allQuestionsHasAnswers = true;
        Object.keys(questions).forEach((key) => {
            const question = questions[key];
            if (isQuestionVisible<P>(questions, key, payload)) {
                const answered = questionIsAnswered(question.getValue(payload)) || question.isOptional === true;
                allQuestionsHasAnswers = allQuestionsHasAnswers === true && answered;
            }
        });
        return allQuestionsHasAnswers;
    },
    isVisible: (question: string, payload: P) => {
        return isQuestionVisible<P>(questions, question, payload);
    }
});
