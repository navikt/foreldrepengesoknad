import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './Frilans.stories';

import messages from './intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<Arbeid som frilanser>', () => {
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['FrilansPanel.Oppstart'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['FrilansPanel.Valideringsfeil.FraOgMedDato.Påkrevd'])[0]).toBeInTheDocument();
        expect(screen.getAllByText(messages['FrilansPanel.Valideringsfeil.JobberFremdelesSomFrilans.Påkrevd'])[0]).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        const saveOnNext = vi.fn();

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findByText(messages['FrilansPanel.Oppstart'])).toBeInTheDocument();
        expect(screen.getByText(messages['FrilansPanel.JobberFremdelesSomFrilans'])).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText(messages['FrilansPanel.Oppstart']);
        await userEvent.type(frilansStartdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText(messages['FrilansPanel.JobberFremdelesSomFrilans'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi startdatoen for behov for tilrettelegging.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi hvor mye du kan jobbe.')).not.toBeInTheDocument();

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            oppstart: '2023-12-30',
        });
    });

    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['FrilansPanel.Oppstart'])).toBeInTheDocument();
        expect(screen.getByText(messages['FrilansPanel.JobberFremdelesSomFrilans'])).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText(messages['FrilansPanel.Oppstart']);
        await userEvent.type(frilansStartdatoInput, 'sjnkf');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['FrilansPanel.Valideringsfeil.FraOgMedDato.GyldigDato'])[0],
        ).toBeInTheDocument();
    });

    it('skal avslutte søknad', async () => {
        const onAvsluttOgSlett = vi.fn();

        render(<Default onFortsettSenere={vi.fn()} onAvsluttOgSlett={onAvsluttOgSlett} />);

        expect(await screen.findByText(messages['FrilansPanel.Oppstart'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Slett søknaden')[0]!);
        await userEvent.click(screen.getAllByText('Slett søknaden')[1]!);

        expect(screen.getAllByText('Fortsett senere')[0]).toBeInTheDocument();
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<Default onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Barnet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'BARNET_PATH');
    });

    it('skal vise feilmelding når sluttdato er før startdato', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['FrilansPanel.Oppstart'])).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText(messages['FrilansPanel.Oppstart']);
        await userEvent.type(frilansStartdatoInput, dayjs('2024-06-15').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText(messages['FrilansPanel.JobberFremdelesSomFrilans.Nei']));

        const sluttdatoInput = screen.getByLabelText(messages['FrilansPanel.SluttetDato']);
        await userEvent.type(sluttdatoInput, dayjs('2024-05-01').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['FrilansPanel.Valideringsfeil.TilOgMedDato.FørStartdato'])[0]).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding når sluttdato er lik startdato', async () => {
        const saveOnNext = vi.fn();

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findByText(messages['FrilansPanel.Oppstart'])).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText(messages['FrilansPanel.Oppstart']);
        await userEvent.type(frilansStartdatoInput, dayjs('2024-06-15').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText(messages['FrilansPanel.JobberFremdelesSomFrilans.Nei']));

        const sluttdatoInput = screen.getByLabelText(messages['FrilansPanel.SluttetDato']);
        await userEvent.type(sluttdatoInput, dayjs('2024-06-15').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText(messages['FrilansPanel.Valideringsfeil.TilOgMedDato.FørStartdato'])).not.toBeInTheDocument();

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            oppstart: '2024-06-15',
            tom: '2024-06-15',
        });
    });
});
