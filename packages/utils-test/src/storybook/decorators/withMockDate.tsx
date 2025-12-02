import type { DecoratorFunction } from 'storybook/internal/types';

export const withMockDate =
    (mockDate: Date): DecoratorFunction =>
    (Story) => {
        Date.now = () => mockDate.getTime();

        return <Story />;
    };
