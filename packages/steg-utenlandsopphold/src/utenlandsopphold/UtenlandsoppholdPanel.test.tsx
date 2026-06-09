import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './UtenlandsoppholdPanel.stories';

import messages from '../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('UtenlandsoppholdPanel', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<Default />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 2')).toBeInTheDocument();

        expect(screen.getByText(messages['UtenlandsoppholdSteg.Siste12Måneder.Spørsmål'])).toBeInTheDocument();
        expect(screen.getByText(messages['UtenlandsoppholdSteg.Neste12Måneder.Spørsmål'])).toBeInTheDocument();
        expect(screen.getByText(messages['UtenlandsoppholdSteg.HjelpeTekstES.Tittel'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();

        expect(screen.getAllByText(messages['UtenlandsoppholdSteg.Siste12Måneder.IsRequired'])).toHaveLength(2);
        expect(screen.getAllByText(messages['UtenlandsoppholdSteg.Neste12Måneder.IsRequired'])).toHaveLength(2);
    });

    it('skal oppgi at en har bodd i Norge og skal bo i Norge', async () => {
        const saveOnNext = vi.fn();

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge']));
        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge']));

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

        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet']));
        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge']));

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

        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge']));
        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet']));

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

        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet']));
        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet']));

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

        await userEvent.click(screen.getByText(messages['UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet']));

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

        render(<Default onFortsettSenere={vi.fn()} onAvsluttOgSlett={onAvsluttOgSlett} />);

        expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Slett søknaden')[0]!);
        await userEvent.click(screen.getAllByText('Slett søknaden')[1]!);

        expect(onAvsluttOgSlett).toHaveBeenCalledTimes(1);
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<Default onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Barnet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'BARNET_PATH');
    });
});
