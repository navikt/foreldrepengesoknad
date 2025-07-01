import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './UtenlandsoppholdPanel.stories';

const { Default } = composeStories(stories);

describe('UtenlandsoppholdPanel', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<Default />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 2')).toBeInTheDocument();

        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Medlemskap i norsk folketrygd')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();

        expect(screen.getAllByText('Du må oppgi hvor du har bodd de siste 12 månedene')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi hvor du skal bo de neste 12 månedene')).toHaveLength(2);
    });

    it('skal oppgi at en har bodd i Norge og skal bo i Norge', async () => {
        const saveOnNext = vi.fn();

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);

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

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);

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

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);

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

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);

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

        render(<Default saveOnPrevious={saveOnPrevious} goToPreviousStep={goToPreviousStep} />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);

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
        const onAvsluttOgSlett = vi.fn();

        render(<Default onAvsluttOgSlett={onAvsluttOgSlett} />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Avslutt')[0]);

        expect(screen.getAllByText('Fortsett senere')[0]).toBeInTheDocument();
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<Default onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Barnet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'BARNET_PATH');
    });
});
