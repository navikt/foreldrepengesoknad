import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Utenlandsopphold.stories';
import { render, screen } from '@testing-library/react';

const { Default } = composeStories(stories);

const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const HAR_BODD = 'Hvor har du bodd de siste 12 månedene?';
const BODD_I_NORGE = 'Du har bodd i Norge';
const SKAL_BO = 'Hvor skal du bo de neste 12 månedene?';
const SKAL_BO_I_NORGE = 'Du skal bo i Norge';
const NESTE_STEG = 'Neste steg';

describe('<Utlandsopphold>', () => {
    const user = userEvent.setup();
    it('skal ikke vise feilmelding hvis spørsmål besvart', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(screen.getByText(HAR_BODD)).toBeInTheDocument();
        expect(screen.getByText(SKAL_BO)).toBeInTheDocument();

        await user.click(screen.getByText(BODD_I_NORGE));

        await user.click(screen.getByText(SKAL_BO_I_NORGE));

        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.queryByText('Du må oppgi om du har bodd i Norge de siste 12 månedene.'),
        ).not.toBeInTheDocument();
        expect(
            await screen.queryByText('Du må oppgi om du skal bo i Norge de neste 12 månedene.'),
        ).not.toBeInTheDocument();
    });
    it('skal vise feilmelding hvis spørsmål ikke er besvart', async () => {
        render(<Default />);
        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Du må oppgi om du har bodd i Norge de siste 12 månedene.')[0],
        ).toBeInTheDocument();
        expect(
            await screen.getAllByText('Du må oppgi om du skal bo i Norge de neste 12 månedene.')[0],
        ).toBeInTheDocument();
    });
});
