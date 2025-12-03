import type { DecoratorFunction } from 'storybook/internal/types';

export const withMockDate =
    (mockDate: Date): DecoratorFunction =>
    (Story) => {
        Date.now = () => mockDate.getTime();

        return (
            <>
                <div
                    style={{
                        fontSize: '18px',
                        borderRadius: '4px',
                        padding: '8px',
                        background: '#F68282',
                    }}
                >
                    Dato er mocket til {mockDate.toLocaleDateString()}
                </div>
                <Story />
            </>
        );
    };
