import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { ErrorPage } from './ErrorPage';

const meta = {
    title: 'ErrorPage',
    component: ErrorPage,
} satisfies Meta<typeof ErrorPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        appName: 'engangsstonad',
        errorMessage: 'Kall mot url: ‘/hjelpemidler/barnebriller/api/vilkarsgrunnlag’ feilet,  At S.kallFeilet',
        retryCallback: action('button-click'),
    },
};
