import { ReactRenderer } from '@storybook/react-vite';
import type { DecoratorFunction } from 'storybook/internal/types';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';

export const withUttaksplanContextDecorator: DecoratorFunction<ReactRenderer> = (Story, { parameters }) => {
    const { context } = parameters;

    return (
        <UttaksplanDataProvider {...context}>
            <Story />
        </UttaksplanDataProvider>
    );
};
