import { Meta, StoryObj } from '@storybook/react';

import '@navikt/ds-css';

import { initAmplitude } from '@navikt/fp-metrics';

import { IkkeKvinne } from './IkkeKvinne';

const meta = {
    title: 'pages/IkkeKvinne',
    component: IkkeKvinne,
    render: () => {
        initAmplitude();
        return <IkkeKvinne />;
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
