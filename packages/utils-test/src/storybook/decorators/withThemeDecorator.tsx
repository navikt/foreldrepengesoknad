import type { ReactRenderer } from '@storybook/react';
import { useEffect } from 'react';
import type { DecoratorFunction } from 'storybook/internal/types';

import { Theme } from '@navikt/ds-react';

export const withThemeDecorator: DecoratorFunction<ReactRenderer> = (Story, context) => {
    const theme = context.globals['theme'];

    useEffect(() => {
        // Dette kan sikkert gjerast på ein bedre måte
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
