import { expect, within } from 'storybook/test';

import preview from '../../../.storybook/preview';
import { HøyInntektInfobox } from './HøyInntektInfobox';

const meta = preview.meta({
    title: 'components/HøyInntektInfobox',
    component: HøyInntektInfobox,
});
export default meta;

export const Default = meta.story({
    args: {
        maxÅrslønnDekket: 700000,
    },
    test: async () => {
        const canvas = within(document.body);
        await expect(canvas.findByText('Du får dekket opptil 700 000 kr av din inntekt')).resolves.toBeInTheDocument();
        await expect(
            canvas.getByText('Du har oppgitt en inntekt høyere enn dette, men dette dekkes ikke av Nav.'),
        ).toBeInTheDocument();
    },
});

export const HarGråBakgrunn = meta.story({
    args: {
        maxÅrslønnDekket: 700000,
        isGray: true,
    },
});

export const VisKrIkon = meta.story({
    args: {
        maxÅrslønnDekket: 700000,
        showKrIcon: true,
    },
});
