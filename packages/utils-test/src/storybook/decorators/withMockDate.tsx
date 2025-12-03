import type { DecoratorFunction } from 'storybook/internal/types';

export const withMockDate: DecoratorFunction = (Story, context) => {
    const mockDateSinceEpoch = context.args.mockDate as number;
    Date.now = () => mockDateSinceEpoch;

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
                Dato er mocket til {new Date(mockDateSinceEpoch).toLocaleDateString()}
            </div>
            <Story />
        </>
    );
};
