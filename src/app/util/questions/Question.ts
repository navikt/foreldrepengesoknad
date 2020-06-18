export type QuestionValue = string | number | Date | boolean | undefined;

export const questionValueIsOk = (value: QuestionValue) => {
    return value !== undefined && value !== '';
};

export interface QuestionConfig<Payload, QuestionKeys> {
    [key: string]: {
        parentQuestion?: QuestionKeys;
        isIncluded?: (props: Payload) => boolean;
        isAnswered: (props: Payload) => boolean;
        isOptional?: (props: Payload) => boolean;
        visibilityFilter?: (props: Payload) => boolean;
    };
}

const isQuestionVisible = <Payload, QuestionKeys>(
    questions: QuestionConfig<Payload, QuestionKeys>,
    question: QuestionKeys,
    payload: Payload
): boolean => {
    const config = questions[question as any];
    if (!config) {
        return false;
    }
    if (config.isIncluded && config.isIncluded(payload) === false) {
        return false;
    }
    if (config.visibilityFilter && config.visibilityFilter(payload) === false) {
        return false;
    }
    if (config.parentQuestion !== undefined) {
        return (
            isQuestionVisible(questions, config.parentQuestion, payload) &&
            questions[config.parentQuestion as any].isAnswered(payload)
        );
    }
    return true;
};

const isQuestionAnswered = <Payload, QuestionKeys>(
    questions: QuestionConfig<Payload, QuestionKeys>,
    question: QuestionKeys,
    payload: Payload
): boolean => {
    const config = questions[question as any];
    if (!config) {
        return false;
    }
    return config.isAnswered(payload);
};

const areAllQuestionsAnswered = <Payload, QuestionKeys>(
    questions: QuestionConfig<Payload, QuestionKeys>,
    payload: Payload
): boolean => {
    let allQuestionsHasAnswers = true;
    Object.keys(questions).forEach((key) => {
        const question = questions[key];
        if (isQuestionVisible<Payload, QuestionKeys>(questions, key as any, payload)) {
            const isOptional = question.isOptional !== undefined ? question.isOptional(payload) === true : false;
            allQuestionsHasAnswers = allQuestionsHasAnswers === true && (question.isAnswered(payload) || isOptional);
        }
    });
    return allQuestionsHasAnswers;
};

export interface QuestionVisibility<QuestionKeys> {
    isVisible: (key: QuestionKeys) => boolean;
    isAnswered: (key: QuestionKeys) => boolean;
    areAllQuestionsAnswered: () => boolean;
}

export const Questions = <P, T>(questions: QuestionConfig<P, T>) => ({
    getVisbility: (payload: P): QuestionVisibility<T> => ({
        isVisible: (key: T) => isQuestionVisible(questions, key, payload),
        isAnswered: (key: T) => isQuestionAnswered(questions, key, payload),
        areAllQuestionsAnswered: () => areAllQuestionsAnswered(questions, payload),
    }),
});
