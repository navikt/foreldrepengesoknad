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

        expect(screen.getByText('Deg')).toBeInTheDocument();
        expect(screen.getByText('Henrikke Ibsen')).toBeInTheDocument();
        expect(screen.getByText('01018823234')).toBeInTheDocument();

        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Du har bodd i Tyskland i løpet av de forrige 12 månedene')).toBeInTheDocument();
        expect(screen.getByText('06.06.2023 - 10.10.2023')).toBeInTheDocument();
        expect(screen.getByText('Du har bodd i Sverige i løpet av de forrige 12 månedene')).toBeInTheDocument();
        expect(screen.getByText('10.10.2022 - 05.05.2023')).toBeInTheDocument();
        expect(screen.getByText('På fødselstidspunktet bodde du i utlandet')).toBeInTheDocument();

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

        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Du har bodd i Norge de siste 12 månedene')).toBeInTheDocument();
        expect(screen.getByText('Du skal bo i Norge de neste 12 månadene')).toBeInTheDocument();
        expect(screen.getByText('På fødselstidspunktet kommer du til å bo i Norge')).toBeInTheDocument();
    });
});
