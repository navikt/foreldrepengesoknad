import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './TilretteleggingSteg.stories';

const { ForArbeidsforhold } = composeStories(stories);

describe('<TilretteleggingSteg>', () => {
    const user = userEvent.setup();
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(
            screen.getByText('Fra hvilken dato har du behov for tilrettelegging eller omplassering?'),
        ).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi startdatoen for behov for tilrettelegging.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi hvor mye du kan jobbe.')[0]).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <ForArbeidsforhold
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );
        expect(
            await screen.findByText('Fra hvilken dato har du behov for tilrettelegging eller omplassering?'),
        ).toBeInTheDocument();

        const tilretteleggingsdatoInput = screen.getByLabelText(
            'Fra hvilken dato har du behov for tilrettelegging eller omplassering?',
        );
        await user.type(tilretteleggingsdatoInput, dayjs().format('DD.MM.YYYY'));
        await user.tab();

        expect(screen.getByText('Hvor mye kan du jobbe?')).toBeInTheDocument();

        await user.click(screen.getByText('Jeg kan jobbe redusert'));

        await user.click(screen.getByText('Nei, jeg skal ha perioder med ulik arbeidsprosent'));

        await user.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi startdatoen for behov for tilrettelegging.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi hvor mye du kan jobbe.')).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '990322244': {
                    behovForTilretteleggingFom: dayjs().format(ISO_DATE_FORMAT),
                    delvisTilretteleggingPeriodeType: 'VARIERTE_PERIODER',
                    type: 'delvis',
                },
            },
            key: ContextDataType.TILRETTELEGGINGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: addTilretteleggingIdToRoute(SøknadRoute.PERIODER, '990322244'),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('validering av for sen tilrettelegging', async () => {
        render(<ForArbeidsforhold />);

        expect(
            await screen.findByText('Fra hvilken dato har du behov for tilrettelegging eller omplassering?'),
        ).toBeInTheDocument();

        const tilretteleggingsdatoInput = screen.getByLabelText(
            'Fra hvilken dato har du behov for tilrettelegging eller omplassering?',
        );
        await user.type(tilretteleggingsdatoInput, dayjs().add(40, 'days').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Startdatoen for behov for tilrettelegging må være mer enn 3 uker før termindato.')[0],
        ).toBeInTheDocument();
    });

    it('redusert valgt', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText('Jeg kan jobbe redusert')).toBeInTheDocument();
        await user.click(screen.getByText('Jeg kan jobbe redusert'));

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getByText('Skal du ha den samme stillingsprosenten gjennom hele svangerskapet?'),
        ).toBeInTheDocument();
    });

    it('spørsmål om fra-dato vises når man har valgt at man ikke kan jobbe', async () => {
        render(<ForArbeidsforhold />);
        expect(await screen.findByText('Jeg kan ikke jobbe')).toBeInTheDocument();
        await user.click(screen.getByText('Jeg kan ikke jobbe'));

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Fra hvilken dato skal du være borte fra jobb?')).toBeInTheDocument();
    });

    it('redusert valgt, ikke oppgitt stillingsprosent', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText('Jeg kan jobbe redusert')).toBeInTheDocument();
        await user.click(screen.getByText('Jeg kan jobbe redusert'));

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(
                'Du må oppgi om du skal ha den samme stillingsprosenten gjennom hele svangerskapet.',
            )[0],
        ).toBeInTheDocument();
    });

    it('spørsmål om stillingsprosent skal vises når redusert arbeidstid og samme stillingsprosent er valgt', async () => {
        render(<ForArbeidsforhold />);
        expect(await screen.findByText('Jeg kan jobbe redusert')).toBeInTheDocument();

        await user.click(screen.getByText('Jeg kan jobbe redusert'));
        await user.click(screen.getByText('Ja'));

        expect(screen.getByText('Hvilken stillingsprosent skal du jobbe?')).toBeInTheDocument();
    });

    it('feilmelding ved ikke oppgitt stillingsprosent', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText('Jeg kan jobbe redusert')).toBeInTheDocument();

        await user.click(screen.getByText('Jeg kan jobbe redusert'));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText('Hvilken stillingsprosent skal du jobbe?')).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi stillingsprosenten du skal jobbe.')[0]).toBeInTheDocument();
    });
    it('feilmelding ved stillingsprosent i feil format', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText('Jeg kan jobbe redusert')).toBeInTheDocument();

        await user.click(screen.getByText('Jeg kan jobbe redusert'));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText('Hvilken stillingsprosent skal du jobbe?')).toBeInTheDocument();

        const stillingsprosentInput = screen.getByLabelText('Hvilken stillingsprosent skal du jobbe?');
        await user.type(stillingsprosentInput, 'bla bla');
        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Stillingsprosent må være et tall.')[0]).toBeInTheDocument();
    });
    it('feilmelding ved ikke oppgitt redusert fra-dato', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText('Jeg kan jobbe redusert')).toBeInTheDocument();

        await user.click(screen.getByText('Jeg kan jobbe redusert'));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText('Fra hvilken dato skal du jobbe redusert?')).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi fra hvilken dato du skal jobbe redusert.')[0]).toBeInTheDocument();
    });
    it('feilmelding ved ikke oppgitt redusert til-dato', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText('Jeg kan jobbe redusert')).toBeInTheDocument();

        await user.click(screen.getByText('Jeg kan jobbe redusert'));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText('Frem til hvilken dato skal du jobbe redusert?')).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(
                'Du må oppgi om du skal jobbe redusert frem til tre uker før termin eller frem til en annen dato.',
            )[0],
        ).toBeInTheDocument();
    });

    it('redusert frem til en dato valgt', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText('Jeg kan jobbe redusert')).toBeInTheDocument();

        await user.click(screen.getByText('Jeg kan jobbe redusert'));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText('Frem til hvilken dato skal du jobbe redusert?')).toBeInTheDocument();
        await user.click(screen.getByText('Frem til en dato'));
        await user.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Dato du skal tilbake til din opprinnelige stillingsprosent')).toBeInTheDocument();
    });

    it('validering av dato på feil format', async () => {
        render(<ForArbeidsforhold />);

        expect(
            await screen.findByText('Fra hvilken dato har du behov for tilrettelegging eller omplassering?'),
        ).toBeInTheDocument();

        expect(screen.getByText('Jeg kan jobbe redusert')).toBeInTheDocument();

        await user.click(screen.getByText('Jeg kan jobbe redusert'));
        await user.click(screen.getByText('Ja'));

        expect(screen.getByText('Fra hvilken dato skal du jobbe redusert?')).toBeInTheDocument();

        await user.click(screen.getByText('Frem til en dato'));

        const tilretteleggingsdatoInput = screen.getByLabelText(
            'Fra hvilken dato har du behov for tilrettelegging eller omplassering?',
        );
        const fraDatoRedusertInput = screen.getByLabelText('Fra hvilken dato skal du jobbe redusert?');
        const tilbakeDatoInput = screen.getByLabelText('Dato du skal tilbake til din opprinnelige stillingsprosent');

        await user.type(tilretteleggingsdatoInput, 'fdkmv');
        await user.type(fraDatoRedusertInput, 'fdkmv');
        await user.type(tilbakeDatoInput, 'fdkmv');

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(
                'Startdatoen for behov for tilrettelegging må være en gyldig dato på formatet dd.mm.åååå.',
            )[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText(
                'Datoen du skal begynne å jobbe redusert må være en gyldig dato på formatet dd.mm.åååå.',
            )[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText(
                'Datoen du skal tilbake til din opprinnelige stillingsprosent må være på formatet dd.mm.åååå.',
            )[0],
        ).toBeInTheDocument();
    });
});
