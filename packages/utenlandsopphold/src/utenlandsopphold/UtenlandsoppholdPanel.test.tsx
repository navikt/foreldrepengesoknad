import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './UtenlandsoppholdPanel.stories';

const { ForFødsel, ForAdopsjon } = composeStories(stories);

describe('<UtenlandsoppholdPanel>', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<ForFødsel />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 1')).toBeInTheDocument();

        expect(
            screen.getByText(
                'For å få rett til engangsstønad må du være medlem av folketrygden på tidspunktet for fødsel.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Utenlandsopphold og støtte fra NAV')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();

        expect(screen.getAllByText('Du må oppgi hvor du har bodd de siste 12 månedene')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi hvor du skal bo de neste 12 månedene')).toHaveLength(2);
    });

    it('skal vise tekst for søkersituasjon Adopsjon', async () => {
        render(<ForAdopsjon />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        expect(
            screen.getByText(
                'For å få rett til engangsstønad må du være medlem av folketrygden på tidspunktet for omsorgsovertakelsen ved adopsjon.',
            ),
        ).toBeInTheDocument();
    });

    it('skal oppgi at en har bodd i Norge og skal bo i Norge', async () => {
        const saveOnNext = vi.fn();

        render(<ForFødsel saveOnNext={saveOnNext} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            harBoddUtenforNorgeSiste12Mnd: false,
            skalBoUtenforNorgeNeste12Mnd: false,
        });
    });

    it('skal oppgi at en har bodd i utlandet og skal bo i Norge', async () => {
        const saveOnNext = vi.fn();

        render(<ForFødsel saveOnNext={saveOnNext} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            harBoddUtenforNorgeSiste12Mnd: true,
            skalBoUtenforNorgeNeste12Mnd: false,
        });
    });

    it('skal oppgi at en har bodd i Norge og skal bo i utlandet', async () => {
        const saveOnNext = vi.fn();

        render(<ForFødsel saveOnNext={saveOnNext} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            harBoddUtenforNorgeSiste12Mnd: false,
            skalBoUtenforNorgeNeste12Mnd: true,
        });
    });

    it('skal oppgi at en har bodd i utlandet og skal bo i utlandet', async () => {
        const saveOnNext = vi.fn();

        render(<ForFødsel saveOnNext={saveOnNext} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));
        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            harBoddUtenforNorgeSiste12Mnd: true,
            skalBoUtenforNorgeNeste12Mnd: true,
        });
    });

    it('skal oppgi at en har bodd i utlandet og skal bo i utlandet', async () => {
        const saveOnNext = vi.fn();

        render(<ForFødsel saveOnNext={saveOnNext} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));
        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            harBoddUtenforNorgeSiste12Mnd: true,
            skalBoUtenforNorgeNeste12Mnd: true,
        });
    });

    it('skal lagre uvalidert data når en går til forrige steg', async () => {
        const saveOnPrevious = vi.fn();
        const goToPreviousStep = vi.fn();

        render(<ForFødsel saveOnPrevious={saveOnPrevious} goToPreviousStep={goToPreviousStep} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Forrige steg'));

        expect(saveOnPrevious).toHaveBeenCalledTimes(1);
        expect(saveOnPrevious).toHaveBeenNthCalledWith(1, {
            harBoddUtenforNorgeSiste12Mnd: true,
            skalBoUtenforNorgeNeste12Mnd: undefined,
        });

        expect(goToPreviousStep).toHaveBeenCalledTimes(1);
    });

    it('skal avslutte søknad', async () => {
        const cancelApplication = vi.fn();

        render(<ForFødsel cancelApplication={cancelApplication} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Avslutt'));

        expect(screen.getByText('Avslutt og slett søknad')).toBeInTheDocument();
    });
});
