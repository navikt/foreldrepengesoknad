export interface QuestionDefinition<Payload, QuestionKeys extends string, ErrorFormat = undefined> {
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
}

export type QuestionConfig<Payload, QuestionKeys extends string, ErrorFormat = undefined> = Partial<
    Record<QuestionKeys, QuestionDefinition<Payload, QuestionKeys, ErrorFormat>>
>;

const getQuestionConfig = <Payload, QuestionKeys extends string, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
) => questions[question];

const isQuestionVisible = <Payload, QuestionKeys extends string, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
    payload: Payload,
): boolean => {
    const config = getQuestionConfig(questions, question);
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
        const parentQuestion = getQuestionConfig(questions, config.parentQuestion);
        if (!parentQuestion) {
            return false;
        }

        return isQuestionVisible(questions, config.parentQuestion, payload) && parentQuestion.isAnswered(payload);
    }
    return true;
};

const isQuestionAnswered = <Payload, QuestionKeys extends string, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
    payload: Payload,
): boolean => {
    const config = getQuestionConfig(questions, question);
    if (!config?.isAnswered) {
        return false;
    }
    return config.isAnswered(payload);
};

const isQuestionIncluded = <Payload, QuestionKeys extends string, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
    payload: Payload,
): boolean => {
    const config = getQuestionConfig(questions, question);
    if (!config) {
        return false;
    }
    return config.isIncluded ? config.isIncluded(payload) : true;
};

const areAllQuestionsAnswered = <Payload, QuestionKeys extends string, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    payload: Payload,
): boolean => {
    let allQuestionsHasAnswers = true;
    for (const key of Object.keys(questions) as QuestionKeys[]) {
        const question = questions[key]!;
        if (isQuestionVisible<Payload, QuestionKeys, ErrorFormat>(questions, key, payload)) {
            const isOptional = question.isOptional !== undefined ? question.isOptional(payload) === true : false;
            allQuestionsHasAnswers = allQuestionsHasAnswers === true && (question.isAnswered(payload) || isOptional);
        }
    }
    return allQuestionsHasAnswers;
};

const getIncludedQuestions = <QuestionKeys extends string, Payload, ErrorFormat>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    payload: Payload,
): QuestionKeys[] => {
    return (Object.keys(questions) as QuestionKeys[]).filter((key) => isQuestionIncluded(questions, key, payload));
};

const validateQuestion = <QuestionKeys extends string, Payload, ErrorFormat = unknown>(
    _value: unknown,
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
    question: QuestionKeys,
    payload: Payload,
): undefined | boolean | ErrorFormat | ErrorFormat[] => {
    const config = getQuestionConfig(questions, question);
    if (!config?.validate) {
        return undefined;
    }
    return config.validate(payload);
};

export interface QuestionVisibility<QuestionKeys extends string, ErrorFormat = undefined> {
    validate: (key: QuestionKeys) => (value: unknown) => undefined | boolean | ErrorFormat | ErrorFormat[];
    isVisible: (key: QuestionKeys) => boolean;
    isAnswered: (key: QuestionKeys) => boolean;
    isIncluded: (key: QuestionKeys) => boolean;
    areAllQuestionsAnswered: () => boolean;
    getIncludedQuestions: () => QuestionKeys[];
}

interface QuestionVisibilityInfo<ErrorFormat = undefined> {
    validate: (value: unknown) => undefined | boolean | ErrorFormat | ErrorFormat[];
    isVisible: () => boolean;
    isAnswered: () => boolean;
}

export const Questions = <Payload, QuestionKeys extends string, ErrorFormat = undefined>(
    questions: QuestionConfig<Payload, QuestionKeys, ErrorFormat>,
) => ({
    getVisbility: (payload: Payload): QuestionVisibility<QuestionKeys, ErrorFormat> => ({
        validate: (key: QuestionKeys) => (value: unknown) =>
            validateQuestion<QuestionKeys, Payload, ErrorFormat>(value, questions, key, payload),
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
        return {
            validate: (value: unknown) =>
                validateQuestion<QuestionKeys, Payload, ErrorFormat>(value, questions, key, payload),
            isVisible: () => isQuestionVisible<Payload, QuestionKeys, ErrorFormat>(questions, key, payload),
            isAnswered: () => isQuestionAnswered<Payload, QuestionKeys, ErrorFormat>(questions, key, payload),
        };
    },
});
