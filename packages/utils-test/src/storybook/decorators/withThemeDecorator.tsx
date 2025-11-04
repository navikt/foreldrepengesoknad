import { useEffect } from 'react';
import type { DecoratorFunction } from 'storybook/internal/types';

import { Theme } from '@navikt/ds-react';

export const withThemeDecorator: DecoratorFunction = (Story, context) => {
    const Wrapper = () => {
        const theme = context.globals['theme'];
        useEffect(() => {
            const elements = document.getElementsByClassName('sb-show-main');
            if (elements.length > 0) {
                elements[0].setAttribute(
                    'style',
                    theme === 'dark' ? 'background: #0e151f !important' : 'background: #fff !important',
                );
            }
        }, [theme]);

        return (
            <Theme theme={theme === 'dark' ? 'dark' : 'light'}>
                <Story />
            </Theme>
        );
    };

    return <Wrapper />;
};
