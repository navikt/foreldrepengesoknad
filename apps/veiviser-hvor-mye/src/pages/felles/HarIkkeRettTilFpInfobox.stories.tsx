import { expect, within } from 'storybook/test';

import preview from '../../../.storybook/preview';
import { HarIkkeRettTilFpInfobox } from './HarIkkeRettTilFpInfobox';

const meta = preview.meta({
    title: 'components/HarIkkeRettTilFpInfobox',
    component: HarIkkeRettTilFpInfobox,
});
export default meta;

export const Default = meta.story({
    args: {
        minÅrslønn: 100000,
        antattÅrslønn: 500000,
    },
    test: async () => {
        const canvas = within(document.body);
        await expect(
            canvas.findByText('Med årslønn under 100 000 kr har du ikke rett til foreldrepenger'),
        ).resolves.toBeInTheDocument();
        await expect(canvas.getByText(/500 000 kr i året/)).toBeInTheDocument();
        await expect(canvas.getByText(/100 000 kr i året/)).toBeInTheDocument();
    },
});

export const VisKrIkon = meta.story({
    args: {
        minÅrslønn: 100000,
        antattÅrslønn: 500000,
        showKrIcon: true,
    },
});
