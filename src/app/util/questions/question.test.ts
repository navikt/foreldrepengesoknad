import { QuestionConfig, QuestionVisibility, questionValueIsOk, Questions } from './Question';

enum TestKeys {
    name = 'name',
    hasAddress = 'hasAddress',
    address = 'address',
    address2 = 'address2'
}

interface TestPayload {
    firstname?: string;
    hasAddress?: boolean;
    address?: string;
    address2?: string;
    shouldAskIfHasAddress?: boolean;
}

type TestQuestionVisibility = QuestionVisibility<TestKeys>;

const testPayload: TestPayload = {};

const askIfUserHasAddress = (payload: TestPayload): boolean => {
    return payload.shouldAskIfHasAddress === true;
};
const askForAddressDetails = (payload: TestPayload): boolean => {
    return payload.hasAddress === true;
};

export const questionConfig: QuestionConfig<TestPayload, TestKeys> = {
    [TestKeys.name]: {
        isRelevant: () => true,
        isAnswered: (payload: TestPayload) => questionValueIsOk(payload.firstname)
    },
    [TestKeys.hasAddress]: {
        isRelevant: (payload) => askIfUserHasAddress(payload),
        isAnswered: (payload: TestPayload) => payload.hasAddress !== undefined
    },
    [TestKeys.address]: {
        parentQuestion: TestKeys.hasAddress,
        isRelevant: (payload) => askForAddressDetails(payload),
        isAnswered: (payload: TestPayload) => questionValueIsOk(payload.address)
    },
    [TestKeys.address2]: {
        parentQuestion: TestKeys.address,
        isRelevant: () => true,
        isAnswered: (payload: TestPayload) => questionValueIsOk(payload.address2)
    }
};

const getVisibility = (payload: TestPayload): TestQuestionVisibility => Questions(questionConfig).getVisbility(payload);

describe('question', () => {
    it('renders only relevant questions', () => {
        const visibility = getVisibility(testPayload);
        expect(visibility.isVisible(TestKeys.name)).toBe(true);
        expect(visibility.isVisible(TestKeys.hasAddress)).toBe(false);
        expect(visibility.isVisible(TestKeys.address)).toBe(false);
        expect(visibility.isVisible(TestKeys.address2)).toBe(false);
    });
    it('does NOT render question when isIncluded returns false', () => {
        const visibility = getVisibility({ ...testPayload, shouldAskIfHasAddress: false });
        expect(visibility.isVisible(TestKeys.hasAddress)).toBe(false);
    });
    it('does render question correctly when isIncluded returns true', () => {
        const visibility = getVisibility({ ...testPayload, shouldAskIfHasAddress: true });
        expect(visibility.isVisible(TestKeys.hasAddress)).toBe(true);
        expect(visibility.isVisible(TestKeys.address)).toBe(false);
        expect(visibility.isVisible(TestKeys.address2)).toBe(false);
    });
    it('does NOT render question if parent question has no value', () => {
        const visibility = getVisibility({ ...testPayload, shouldAskIfHasAddress: true });
        expect(visibility.isVisible(TestKeys.hasAddress)).toBe(true);
        expect(visibility.isVisible(TestKeys.address)).toBe(false);
        expect(visibility.isVisible(TestKeys.address2)).toBe(false);
    });
    it('does render question if parent question has value', () => {
        const visibility = getVisibility({
            ...testPayload,
            shouldAskIfHasAddress: true,
            hasAddress: true
        });
        expect(visibility.isVisible(TestKeys.hasAddress)).toBe(true);
        expect(visibility.isVisible(TestKeys.address)).toBe(true);
        expect(visibility.isVisible(TestKeys.address2)).toBe(false);
    });
    it('does NOT render question if parent question has value but value is negative', () => {
        const visibility = getVisibility({
            ...testPayload,
            shouldAskIfHasAddress: true,
            hasAddress: true
        });
        expect(visibility.isVisible(TestKeys.hasAddress)).toBe(true);
        expect(visibility.isVisible(TestKeys.address)).toBe(true);
        expect(visibility.isVisible(TestKeys.address2)).toBe(false);
    });
    it('does NOT render question if parent question has value, but where value returns false in isIncludedCheck', () => {
        const visibility = getVisibility({
            ...testPayload,
            shouldAskIfHasAddress: true,
            hasAddress: false
        });
        expect(visibility.isVisible(TestKeys.address)).toBe(false);
        expect(visibility.isVisible(TestKeys.address2)).toBe(false);
    });
    it('does render question if all parent questions has value', () => {
        const visibility = getVisibility({
            ...testPayload,
            shouldAskIfHasAddress: true,
            hasAddress: true,
            address: 'Italy'
        });
        expect(visibility.isVisible(TestKeys.hasAddress)).toBe(true);
        expect(visibility.isVisible(TestKeys.address)).toBe(true);
        expect(visibility.isVisible(TestKeys.address2)).toBe(true);
    });
});
