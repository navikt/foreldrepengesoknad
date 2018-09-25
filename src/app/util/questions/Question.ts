export type QuestionValue = any;

export const questionIsAnswered = (value: QuestionValue) => {
    return value !== undefined && value !== '';
};

export interface QuestionConfig<Payload, QuestionKeys> {
    [key: string]: {
        getValue: (props: Payload) => QuestionValue;
        parentQuestion?: QuestionKeys;
        condition?: (props: Payload) => boolean;
        isOptional?: (props: Payload) => boolean;
    };
}

const isQuestionVisible = <Payload, QuestionKeys>(
    questions: QuestionConfig<Payload, QuestionKeys>,
    question: QuestionKeys,
    payload: Payload
): boolean => {
    const config = questions[question as any];
    const conditionIsMet = config.condition ? config.condition(payload) : true;
    if (conditionIsMet === false) {
        return false;
    }
    if (config.parentQuestion === undefined) {
        return conditionIsMet;
    } else {
        const parentHasValidValue = questionIsAnswered(questions[config.parentQuestion as any].getValue(payload));
        return parentHasValidValue && isQuestionVisible(questions, config.parentQuestion, payload);
    }
};

const isAllQuestionsAnswered = <Payload, QuestionKeys>(
    questions: QuestionConfig<Payload, QuestionKeys>,
    payload: Payload
): boolean => {
    let allQuestionsHasAnswers = true;
    Object.keys(questions).forEach((key) => {
        const question = questions[key];
        if (isQuestionVisible<Payload, QuestionKeys>(questions, key as any, payload)) {
            const isOptional = question.isOptional !== undefined ? question.isOptional(payload) === true : false;
            const answered = questionIsAnswered(question.getValue(payload)) || isOptional;
            allQuestionsHasAnswers = allQuestionsHasAnswers === true && answered;
        }
    });
    return allQuestionsHasAnswers;
};

export interface QuestionVisibility<QuestionKeys> {
    isVisible: (key: QuestionKeys) => boolean;
    areAllQuestionsAnswered: () => boolean;
}

export const Questions = <P, T>(questions: QuestionConfig<P, T>) => ({
    getVisbility: (payload: P): QuestionVisibility<T> => ({
        isVisible: (key: T) => isQuestionVisible(questions, key, payload),
        areAllQuestionsAnswered: () => isAllQuestionsAnswered(questions, payload)
    })
});
