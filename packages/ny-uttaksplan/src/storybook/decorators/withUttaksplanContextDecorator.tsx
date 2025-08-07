import { ReactRenderer } from '@storybook/react-vite';
import type { DecoratorFunction } from 'storybook/internal/types';

import { UttaksplanDataContext } from '../../context/UttaksplanDataContext';

export const withUttaksplanContextDecorator: DecoratorFunction<ReactRenderer> = (Story, { parameters }) => {
    const { context } = parameters;

    return (
        <UttaksplanDataContext initialState={context}>
            <Story />
        </UttaksplanDataContext>
    );
};
