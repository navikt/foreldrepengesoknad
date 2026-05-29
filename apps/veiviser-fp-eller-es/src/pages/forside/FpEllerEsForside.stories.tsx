/* eslint-disable */
// @ts-nocheck
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { expect, userEvent } from 'storybook/test';

import preview from '../../../.storybook/preview';
import { FpEllerEsForside } from './FpEllerEsForside';

const meta = preview.meta({
    title: 'fpEllerEs/FpEllerEsForside',
    component: FpEllerEsForside,
});
export default meta;

export const Default = meta.story({
    render: () => {
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <FpEllerEsForside />
            </MemoryRouter>
        );
    },
    test: async ({ canvas }) => {
        await expect(canvas.findAllByText('Foreldrepenger eller engangsstønad?')).resolves.toHaveLength(2);
        expect(
            canvas.getByText(
                'Denne veiviseren er for deg som ønsker å vite om du har rett til foreldrepenger og/eller engangsstønad.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Start'));

        await expect(canvas.findAllByText('Foreldrepenger eller engangsstønad?')).resolves.toHaveLength(2);
    },
});
