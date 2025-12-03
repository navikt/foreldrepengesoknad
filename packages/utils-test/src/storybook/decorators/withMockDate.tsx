import MockDate from 'mockdate';
import type { DecoratorFunction } from 'storybook/internal/types';

export const withMockDate =
    (defaultDate: number): DecoratorFunction =>
    (Story, context) => {
        const mockDateSinceEpoch = (context.args.mockDate ?? defaultDate) as number;
        MockDate.set(mockDateSinceEpoch);
        console.log('mockdate set in story');

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
