export type QuestionValue = string | number | boolean | Date | undefined;

export const questionHasValidInput = (value: QuestionValue) => {
    return value !== undefined && value !== '';
};

export interface QuestionConfig<P> {
    [key: string]: {
        getValue: (props: P) => QuestionValue;
        dependsOnQuestion?: {
            question: string;
            check: (value: QuestionValue) => boolean;
        };
        dependency?: (props: P) => boolean;
    };
}

export const Questions = <P>(questions: QuestionConfig<P>) => ({
    checkVisibility: (question: string, payload: P, isVisible: boolean): boolean => {
        const config = questions[question];
        if (config.dependsOnQuestion === undefined) {
            return config.dependency ? config.dependency(payload) : isVisible;
        } else {
            const parentConfig = questions[config.dependsOnQuestion.question];
            const value = parentConfig.getValue(payload);
            const visible = config.dependsOnQuestion.check(value);
            const ownDependencyIsMet = config.dependency ? config.dependency(payload) : true;
            if (ownDependencyIsMet === false || visible === false) {
                return false;
            }
            return Questions(questions).checkVisibility(config.dependsOnQuestion.question, payload, visible);
        }
    },
    check: (question: string, payload: P) => {
        return Questions(questions).checkVisibility(question, payload, false);
    }
});
