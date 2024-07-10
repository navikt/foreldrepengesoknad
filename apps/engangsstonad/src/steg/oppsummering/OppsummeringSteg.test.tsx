import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './OppsummeringSteg.stories';

const { BarnetErFodt, AdopsjonAvEktefellesBarn, BarnetErIkkeFodt, HarTidligereOgFremtidigeUtenlandsopphold } =
    composeStories(stories);

describe('<OppsummeringSteg>', () => {
    it('skal vise opplysninger og så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<BarnetErFodt sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Oppsummering')).toBeInTheDocument();
        expect(screen.getByText('Steg 5 av 5')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Søknaden gjelder')).toBeInTheDocument();
        expect(screen.getByText('ett barn')).toBeInTheDocument();
        expect(screen.getByText('Fødselsdato')).toBeInTheDocument();
        expect(screen.getByText(dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT))).toBeInTheDocument();

        expect(screen.getByText('Utenlandsopphold')).toBeInTheDocument();
        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Jeg har bodd i Norge')).toBeInTheDocument();
        expect(screen.getByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Jeg skal bo i Norge')).toBeInTheDocument();

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

    it('skal vise opplysninger om adopsjon og så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<AdopsjonAvEktefellesBarn sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Søknaden gjelder')).toBeInTheDocument();
        expect(screen.getByText('ett barn')).toBeInTheDocument();
        expect(screen.getByText('Adopsjonsdato')).toBeInTheDocument();
        expect(screen.getAllByText('01.01.2023')).toHaveLength(2);
        expect(screen.getByText('Fødselsdato')).toBeInTheDocument();
        expect(screen.getByText('Bekreftelse på omsorgsovertakelse')).toBeInTheDocument();
        expect(screen.getByText('filnavn.pdf')).toBeInTheDocument();

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

    it('skal vise opplysninger om når barnet ikke er født og så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<BarnetErIkkeFodt sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Søknaden gjelder')).toBeInTheDocument();
        expect(screen.getByText('ett barn')).toBeInTheDocument();
        expect(screen.getByText('Termindato')).toBeInTheDocument();
        expect(screen.getByText('02.01.2023')).toBeInTheDocument();
        expect(screen.getByText('Når fikk du terminbekreftelse?')).toBeInTheDocument();
        expect(screen.getByText('01.01.2023')).toBeInTheDocument();
        expect(screen.getByText('Terminbekreftelse')).toBeInTheDocument();
        expect(screen.getByText('filnavn.pdf')).toBeInTheDocument();

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

    it('skal vise opplysninger om historiske og fremtidige utenlandsforhold så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<HarTidligereOgFremtidigeUtenlandsopphold sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Utenlandsopphold')).toBeInTheDocument();

        expect(screen.getByText('Hvilket land har du bodd i de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Island')).toBeInTheDocument();
        expect(
            screen.getByText('Fra ' + dayjs().subtract(100, 'day').format(DDMMYYYY_DATE_FORMAT) + ' til i dag'),
        ).toBeInTheDocument();

        expect(screen.getByText('Hvilke land skal du bo i de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Sverige')).toBeInTheDocument();
        expect(
            screen.getByText('Fra i dag til ' + dayjs().add(100, 'day').format(DDMMYYYY_DATE_FORMAT)),
        ).toBeInTheDocument();
        expect(screen.getByText('Danmark')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Fra ' +
                    dayjs().add(101, 'day').format(DDMMYYYY_DATE_FORMAT) +
                    ' til ' +
                    dayjs().add(200, 'day').format(DDMMYYYY_DATE_FORMAT),
            ),
        ).toBeInTheDocument();

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
});
