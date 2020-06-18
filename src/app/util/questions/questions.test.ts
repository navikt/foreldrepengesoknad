import { QuestionConfig, QuestionVisibility, questionValueIsOk, Questions } from './Question';

enum TestKeys {
    parent = 'parent',
    child = 'child',
    grandchild = 'grandchild',
    friend = 'friend',
}

interface TestPayload {
    parent?: boolean;
    child?: boolean;
    grandchild?: boolean;
    friend?: boolean;
    allowChildren?: boolean;
}

type TestQuestionVisibility = QuestionVisibility<TestKeys>;

const testPayload: TestPayload = {};

export const questionConfig: QuestionConfig<TestPayload, TestKeys> = {
    [TestKeys.parent]: {
        isIncluded: () => true,
        isAnswered: (payload: TestPayload) => questionValueIsOk(payload.parent),
    },
    [TestKeys.child]: {
        isIncluded: (payload) => payload.allowChildren === true,
        isAnswered: (payload: TestPayload) => payload.child !== undefined,
    },
    [TestKeys.grandchild]: {
        parentQuestion: TestKeys.child,
        isIncluded: (payload) => payload.allowChildren === true,
        isAnswered: (payload: TestPayload) => payload.grandchild !== undefined,
    },
    [TestKeys.friend]: {
        isIncluded: () => true,
        isAnswered: (payload: TestPayload) => payload.friend !== undefined,
        visibilityFilter: ({ parent, child, grandchild }) => parent === true && child === true && grandchild === true,
    },
};

const getVisibility = (payload: TestPayload): TestQuestionVisibility => Questions(questionConfig).getVisbility(payload);

describe('question', () => {
    it('renders only relevant questions', () => {
        const visibility = getVisibility(testPayload);
        expect(visibility.isVisible(TestKeys.parent)).toBe(true);
        expect(visibility.isVisible(TestKeys.child)).toBe(false);
        expect(visibility.isVisible(TestKeys.grandchild)).toBe(false);
        expect(visibility.isVisible(TestKeys.friend)).toBe(false);
    });
    it('renders child if relevant', () => {
        const visibility = getVisibility({ ...testPayload, allowChildren: true });
        expect(visibility.isVisible(TestKeys.parent)).toBe(true);
        expect(visibility.isVisible(TestKeys.child)).toBe(true);
    });
    it('does not render children if parent is not visible or relevant', () => {
        const visibility = getVisibility({ ...testPayload, allowChildren: true });
        expect(visibility.isVisible(TestKeys.parent)).toBe(true);
        expect(visibility.isVisible(TestKeys.child)).toBe(true);
        expect(visibility.isVisible(TestKeys.grandchild)).toBe(false);
    });
    it('does render children if parent is visible and relevant', () => {
        const visibility = getVisibility({ ...testPayload, allowChildren: true, child: true });
        expect(visibility.isVisible(TestKeys.parent)).toBe(true);
        expect(visibility.isVisible(TestKeys.child)).toBe(true);
        expect(visibility.isVisible(TestKeys.grandchild)).toBe(true);
    });
    it('filters out questions based on visibilityFilter', () => {
        let visibility = getVisibility({ ...testPayload, allowChildren: true, child: true });
        expect(visibility.isVisible(TestKeys.friend)).toBe(false);
        visibility = getVisibility({
            ...testPayload,
            allowChildren: true,
            child: true,
            parent: true,
            grandchild: true,
        });
        expect(visibility.isVisible(TestKeys.grandchild)).toBe(true);
    });
});
