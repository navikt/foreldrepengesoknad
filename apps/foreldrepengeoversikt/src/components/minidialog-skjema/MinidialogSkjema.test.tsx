import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Skjemanummer } from '@navikt/fp-constants';
import { EttersendelseDto } from '@navikt/fp-types';

import * as stories from './MinidialogSkjema.stories';

const { SkalIkkeFeileOpplasting } = composeStories(stories);

describe('<MinidialogSkjema>', () => {
    it('skal vise og sende samme uttalelse etter at brukeren velger ja, nei og ja igjen', async () => {
        const send = vi.fn();
        const uttalelse = 'Dette er uttalelsen jeg ønsker å sende til Nav.';
        await SkalIkkeFeileOpplasting.run({ args: { ...SkalIkkeFeileOpplasting.args, onSubmit: send } });

        await userEvent.click(screen.getByRole('radio', { name: 'Ja' }));
        await userEvent.type(screen.getByRole('textbox', { name: 'Svar på tilbakebetalingen:' }), uttalelse);
        await userEvent.click(screen.getByRole('radio', { name: 'Nei' }));
        expect(screen.queryByRole('textbox', { name: 'Svar på tilbakebetalingen:' })).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('radio', { name: 'Ja' }));
        expect(screen.getByRole('textbox', { name: 'Svar på tilbakebetalingen:' })).toHaveValue(uttalelse);

        await userEvent.click(screen.getByRole('button', { name: 'Send' }));
        expect(send).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({
                brukerTekst: {
                    dokumentType: Skjemanummer.TILBAKEBETALING,
                    tekst: uttalelse,
                },
            }),
        );
    });

    it('skal ikke sende den gamle uttalelsen når brukeren tømmer feltet etter å ha valgt ja igjen', async () => {
        const send = vi.fn();
        await SkalIkkeFeileOpplasting.run({ args: { ...SkalIkkeFeileOpplasting.args, onSubmit: send } });

        await userEvent.click(screen.getByRole('radio', { name: 'Ja' }));
        await userEvent.type(
            screen.getByRole('textbox', { name: 'Svar på tilbakebetalingen:' }),
            'Dette er en uttalelse som brukeren vil fjerne.',
        );
        await userEvent.click(screen.getByRole('radio', { name: 'Nei' }));
        await userEvent.click(screen.getByRole('radio', { name: 'Ja' }));
        await userEvent.clear(screen.getByRole('textbox', { name: 'Svar på tilbakebetalingen:' }));
        await userEvent.click(screen.getByRole('button', { name: 'Send' }));

        expect(send).not.toHaveBeenCalled();
        expect(screen.getAllByText('Feltet "Svar på tilbakebetalingen " må inneholde minst 25 tegn.')).toHaveLength(2);
    });

    it('skal velge at en ikke ønsker å uttale seg og så sende inn', async () => {
        const send = vi.fn();
        await SkalIkkeFeileOpplasting.run({ args: { ...SkalIkkeFeileOpplasting.args, onSubmit: send } });

        expect(
            await screen.findByText(
                'Nav har sendt deg et varsel om at du har fått for mye utbetalte foreldrepenger. Før vi behandler saken, ' +
                    'kan du gi en uttalelse og legge ved relevant dokumentasjon om du har det. Du finner relevant informasjon ' +
                    'om hva som har skjedd i saken og dine rettigheter i varselet som vi har sendt til deg.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(
            screen.getByText(
                'Saken vil bli behandlet med de opplysningene vi har tilgjengelig. Vi sender deg et vedtak når saken er ferdig behandlet.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send'));

        expect(send).toHaveBeenCalledTimes(1);
        expect(send).toHaveBeenNthCalledWith(1, {
            brukerTekst: {
                dokumentType: Skjemanummer.TILBAKEBETALING,
                tekst: 'Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som Nav har tilgjengelig.',
            },
            fnr: '26430359419',
            saksnummer: '1',
            type: 'FORELDREPENGER',
            vedlegg: [],
        } satisfies EttersendelseDto);
    });

    it('skal velge at en ønsker å uttale seg og så sende inn', async () => {
        const send = vi.fn();
        await SkalIkkeFeileOpplasting.run({ args: { ...SkalIkkeFeileOpplasting.args, onSubmit: send } });

        expect(
            await screen.findByText(
                'Nav har sendt deg et varsel om at du har fått for mye utbetalte foreldrepenger. Før vi behandler saken, kan du ' +
                    'gi en uttalelse og legge ved relevant dokumentasjon om du har det. Du finner relevant informasjon om hva som ' +
                    'har skjedd i saken og dine rettigheter i varselet som vi har sendt til deg.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByLabelText('Ja'));

        expect(screen.getByText('Svar på tilbakebetalingen:')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send'));

        expect(screen.getAllByText('Feltet "Svar på tilbakebetalingen " må inneholde minst 25 tegn.')).toHaveLength(2);

        expect(screen.getByText('Last opp dokumenter')).toBeInTheDocument();

        expect(
            screen.queryByText(
                'Saken vil bli behandlet med de opplysningene vi har tilgjengelig. Vi sender deg et vedtak når saken er ferdig behandlet.',
            ),
        ).not.toBeInTheDocument();

        await userEvent.type(
            screen.getByText('Svar på tilbakebetalingen:'),
            'Dette er et svar som er minst 25 tegn langt',
        );

        await userEvent.click(screen.getByText('Send'));

        expect(send).toHaveBeenCalledTimes(1);
        expect(send).toHaveBeenNthCalledWith(1, {
            brukerTekst: {
                dokumentType: Skjemanummer.TILBAKEBETALING,
                tekst: 'Dette er et svar som er minst 25 tegn langt',
            },
            fnr: '26430359419',
            saksnummer: '1',
            type: 'FORELDREPENGER',
            vedlegg: [],
        } satisfies EttersendelseDto);
    });
});
