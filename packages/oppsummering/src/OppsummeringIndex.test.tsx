import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './OppsummeringIndex.stories';

const { HarBoddIUtlandetOgFødt, HarIkkeBoddIUtlandetOgIkkeFødt } = composeStories(stories);

describe('<OppsummeringSteg>', () => {
    it('skal ha hatt utenlandsopphold for ES og så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<HarBoddIUtlandetOgFødt sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 1')).toBeInTheDocument();

        expect(screen.getByText('Utenlandsopphold')).toBeInTheDocument();
        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Jeg har bodd helt eller delvis i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Hvilket land har du bodd i de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Tyskland')).toBeInTheDocument();
        expect(screen.getByText('Fra 06.06.2023 til 10.10.2023')).toBeInTheDocument();

        expect(screen.getByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Jeg skal bo helt eller delvis i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Hvilket land skal du bo i de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Sverige')).toBeInTheDocument();
        expect(screen.getByText('Fra 10.10.2022 til 05.05.2023')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknaden'));

        expect(screen.getByText('Du må bekrefte at du har oppgitt riktige opplysninger')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Send søknaden'));

        const abortController = new AbortController();

        expect(sendSøknad).toHaveBeenCalledTimes(1);
        expect(sendSøknad).toHaveBeenNthCalledWith(1, abortController.signal);
    });

    it('skal ikke ha hatt utenlandsopphold for ES', async () => {
        render(<HarIkkeBoddIUtlandetOgIkkeFødt />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 1')).toBeInTheDocument();

        expect(screen.getByText('Utenlandsopphold')).toBeInTheDocument();
        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Jeg har bodd i Norge')).toBeInTheDocument();
        expect(screen.getByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Jeg skal bo i Norge')).toBeInTheDocument();
    });
});
