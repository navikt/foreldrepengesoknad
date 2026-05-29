import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { expect, userEvent, within } from 'storybook/test';

import preview from '../../../.storybook/preview';
import { HvorMyeForside } from './HvorMyeForside';

const meta = preview.meta({
    title: 'hvorMye/HvorMyeForside',
    component: HvorMyeForside,
});
export default meta;

export const Default = meta.story({
    render: () => {
        return (
            <MemoryRouter initialEntries={[HvorMyeRoutes.ARBEIDSSITUASJON]}>
                <HvorMyeForside />
            </MemoryRouter>
        );
    },
    test: async () => {
        const canvas = within(document.body);
        await expect(canvas.findAllByText('Hvor mye kan jeg få i foreldrepenger?')).resolves.toHaveLength(2);
        await expect(
            canvas.getByText(
                'Denne veiviseren er for deg som ønsker å vite omtrent hvor mye foreldrepenger du kan få fra Nav.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Start'));

        await expect(canvas.findAllByText('Hvor mye kan jeg få i foreldrepenger?')).resolves.toHaveLength(2);
    },
});
