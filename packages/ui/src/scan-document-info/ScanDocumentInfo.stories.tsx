import { Meta, StoryObj } from '@storybook/react';

import { ScanDocumentInfo } from './ScanDocumentInfo';

const meta = {
    component: ScanDocumentInfo,
} satisfies Meta<typeof ScanDocumentInfo>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
