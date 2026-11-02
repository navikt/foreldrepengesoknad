import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './OmPlanleggerenSteg.stories';

const { Default, MedUgyldigLenke } = composeStories(stories);

describe('<OmPlanleggerenSteg>', () => {
    it('skal vise info om planleggeren', async () => {
        render(<Default />);
        expect(await screen.findAllByText('Planlegg foreldrepenger')).toHaveLength(2);
    });

    it('skal vise infotekst om at opplysninger ikke lagres', async () => {
        render(<Default />);
        expect(
            await screen.findByText(/Vi lagrer ikke opplysningene dine hos oss/),
        ).toBeInTheDocument();
    });

    it('skal ikke vise varsel om ugyldig lenke igjen når brukeren går tilbake i nettleserhistorikken', async () => {
        render(<MedUgyldigLenke />);
        const varsel = 'Vi kunne ikke lese planen fra lenken. Du kan lage en ny plan nedenfor.';
        expect(await screen.findByText(varsel)).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start'));
        await userEvent.click(await screen.findByText('Tilbake i nettleserhistorikken'));

        expect(await screen.findByText('Start')).toBeInTheDocument();
        expect(screen.queryByText(varsel)).not.toBeInTheDocument();
    });
});
