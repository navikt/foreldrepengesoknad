export type QuestionValue = string | number | Date | boolean | undefined;

export const questionValueIsOk = (value: QuestionValue) => {
    return value !== undefined && value !== '';
};

export interface QuestionConfig<Payload, QuestionKeys, ErrorFormat = any> {
    [key: string]: {
        /** Depends on parentQuestions visibility, so if parent is hidden,
         * this is hidden too */
        parentQuestion?: QuestionKeys;
        /** Should question be included in the form. Is not the same as
         * visiblity, since it might be included, but it is still not visible because
         * parent is not visible, or visibilityFilter is active  */
        isIncluded?: (props: Payload) => boolean;
        /** Is the question answered */
        isAnswered: (props: Payload) => boolean;
        /** Is it ok if the question is not answered. Used when running isAllQuestionsAnswered */
        isOptional?: (props: Payload) => boolean;
        /** Additional feature for toggling visibility of the question */
        visibilityFilter?: (props: Payload) => boolean;
        /** Fieldvalidation */
        validate?: (payload: Payload) => undefined | boolean | ErrorFormat | ErrorFormat[];
    };
}

const isQuestionVisible = <Payload, QuestionKeys, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
    payload: Payload,
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
        const parentQuestion = questions[config.parentQuestion as any];
        return isQuestionVisible(questions, config.parentQuestion, payload) && parentQuestion.isAnswered(payload);
    }
    return true;
};

const isQuestionAnswered = <Payload, QuestionKeys, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
    payload: Payload,
): boolean => {
    const config = questions[question as any];
    if (!config || !config.isAnswered) {
        return false;
    }
    return config.isAnswered(payload);
};

const isQuestionIncluded = <Payload, QuestionKeys, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
    payload: Payload,
): boolean => {
    const config = questions[question as any];
    if (!config) {
        return false;
    }
    return config.isIncluded ? config.isIncluded(payload) : true;
};

const areAllQuestionsAnswered = <Payload, QuestionKeys, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    payload: Payload,
): boolean => {
    let allQuestionsHasAnswers = true;
    Object.keys(questions).forEach((key) => {
        const question = questions[key];
        if (isQuestionVisible<Payload, QuestionKeys, ErrorFormat>(questions, key as any, payload)) {
            const isOptional = question.isOptional !== undefined ? question.isOptional(payload) === true : false;
            allQuestionsHasAnswers = allQuestionsHasAnswers === true && (question.isAnswered(payload) || isOptional);
        }
    });
    return allQuestionsHasAnswers;
};

const getIncludedQuestions = <QuestionKeys, Payload, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    payload: Payload,
): QuestionKeys[] => {
    const keys = Object.keys(questions).filter((key) => {
        return isQuestionIncluded(questions, key as any, payload);
    });
    return keys as any[];
};

const validateQuestion = <Value, QuestionKeys, Payload, ErrorFormat = any>(
    _value: Value,
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
    payload: Payload,
): undefined | boolean | ErrorFormat | ErrorFormat[] => {
    const config = questions[question as any];
    if (!config || !config.validate) {
        return undefined;
    }
    return config.validate(payload);
};

export interface QuestionVisibility<QuestionKeys, ErrorFormat = any> {
    validate: (key: QuestionKeys) => (value: any) => undefined | boolean | ErrorFormat | ErrorFormat[];
    isVisible: (key: QuestionKeys) => boolean;
    isAnswered: (key: QuestionKeys) => boolean;
    isIncluded: (key: QuestionKeys) => boolean;
    areAllQuestionsAnswered: () => boolean;
    getIncludedQuestions: () => QuestionKeys[];
}

export interface QuestionVisibilityInfo<ErrorFormat = any> {
    validate: (value: any) => undefined | boolean | ErrorFormat | ErrorFormat[];
    isVisible: () => boolean;
    isAnswered: () => boolean;
}

export const Questions = <Payload, QuestionKeys, ErrorFormat = undefined>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
) => ({
    getVisbility: (payload: Payload): QuestionVisibility<QuestionKeys, ErrorFormat> => ({
        validate: (key: QuestionKeys) => (value: any) =>
            validateQuestion<any, QuestionKeys, Payload, ErrorFormat>(value, questions, key, payload),
        isVisible: (key: QuestionKeys) =>
            isQuestionVisible<Payload, QuestionKeys, ErrorFormat>(questions, key, payload),
        isAnswered: (key: QuestionKeys) =>
            isQuestionAnswered<Payload, QuestionKeys, ErrorFormat>(questions, key, payload),
        isIncluded: (key: QuestionKeys) =>
            isQuestionIncluded<Payload, QuestionKeys, ErrorFormat>(questions, key, payload),
        areAllQuestionsAnswered: () => areAllQuestionsAnswered<Payload, QuestionKeys, ErrorFormat>(questions, payload),
        getIncludedQuestions: (): QuestionKeys[] =>
            getIncludedQuestions<QuestionKeys, Payload, ErrorFormat>(questions, payload),
    }),
    getQuestionVisbilityInfo: (key: QuestionKeys, payload: Payload): QuestionVisibilityInfo<ErrorFormat> => {
        const info: QuestionVisibilityInfo = {
            validate: (value: any) =>
                validateQuestion<any, QuestionKeys, Payload, ErrorFormat>(value, questions, key, payload),
            isVisible: () => isQuestionVisible<Payload, QuestionKeys, ErrorFormat>(questions, key, payload),
            isAnswered: () => isQuestionAnswered<Payload, QuestionKeys, ErrorFormat>(questions, key, payload),
        };
        return info;
    },
});
