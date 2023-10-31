import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './TilretteleggingStep.stories';
import dayjs from 'dayjs';

const { Default } = composeStories(stories);
const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const TILRETTELEGGINGSDATO = 'Fra hvilken dato har du behov for tilrettelegging eller omplassering?';
const TERMINDATO = '2024-02-18';
const HVOR_MYE_KAN_DU_JOBBE = 'Hvor mye kan du jobbe?';
const REDUSERT = 'Jeg kan jobbe med redusert arbeidstid';
const SAMME_STILLINGSPROSENT = 'Skal du ha den samme stillingsprosenten gjennom hele svangerskapet?';
const JA = 'Ja';
const HVILKEN_STILLINGSPROSENT = 'Hvilken stillingsprosent skal du jobbe?';
const FRA_DATO_REDUSERT = 'Fra hvilken dato skal du jobbe redusert?';
const TIL_DATO_REDUSERT = 'Frem til hvilken dato skal du jobbe redusert?';
const FREM_TIL_DATO = 'Frem til en dato';
const DATO_TILBAKE = 'Dato du skal tilbake til din opprinnelige stillingsprosent';
const IKKE_JOBBE = 'Jeg kan ikke jobbe';
const FRA_DATO_BORTE_FRA_JOBB = 'Fra hvilken dato skal du være borte fra jobb?';
const NESTE_STEG = 'Neste steg';
describe('<Behov for tilrettelegging>', () => {
    const user = userEvent.setup();
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(TILRETTELEGGINGSDATO)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Du må oppgi startdatoen for behov for tilrettelegging.')[0],
        ).toBeInTheDocument();
        expect(await screen.getAllByText('Du må oppgi hvor mye du kan jobbe.')[0]).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        render(<Default />);
        expect(await screen.findByText(TILRETTELEGGINGSDATO)).toBeInTheDocument();

        const tilretteleggingsdatoInput = screen.getByLabelText(TILRETTELEGGINGSDATO);
        await user.type(tilretteleggingsdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(HVOR_MYE_KAN_DU_JOBBE)).toBeInTheDocument();
        // Fiks skrivefeil i mmye
        await user.click(screen.getByText(REDUSERT));
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.queryByText('Du må oppgi startdatoen for behov for tilrettelegging.'),
        ).not.toBeInTheDocument();
        expect(await screen.queryByText('Du må oppgi hvor mye du kan jobbe.')).not.toBeInTheDocument();
    });
    it('validering av for sen tilrettelegging', async () => {
        render(<Default />);

        expect(await screen.findByText(TILRETTELEGGINGSDATO)).toBeInTheDocument();

        const tilretteleggingsdatoInput = screen.getByLabelText(TILRETTELEGGINGSDATO);
        await user.type(
            tilretteleggingsdatoInput,
            dayjs(TERMINDATO).subtract(2, 'weeks').subtract(6, 'days').format('DD.MM.YYYY'),
        );
        await user.tab();
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText(
                'Startdatoen for behov for tilrettelegging må være mer enn 3 uker før termindato.',
            )[0],
        ).toBeInTheDocument();
    });
    it('redusert valgt', async () => {
        render(<Default />);

        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();
        await user.click(screen.getByText(REDUSERT));

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getByText(SAMME_STILLINGSPROSENT)).toBeInTheDocument();
    });
    it('spørsmål om fra-dato vises når man har valgt at man ikke kan jobbe', async () => {
        render(<Default />);
        expect(await screen.findByText(IKKE_JOBBE)).toBeInTheDocument();
        await user.click(screen.getByText(IKKE_JOBBE));

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getByText(FRA_DATO_BORTE_FRA_JOBB)).toBeInTheDocument();
    });
    it('redusert valgt, ikke oppgitt stillingsprosent', async () => {
        render(<Default />);

        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();
        await user.click(screen.getByText(REDUSERT));

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText(
                'Du må oppgi om du skal ha den samme stillingsprosenten gjennom hele svangerskapet.',
            )[0],
        ).toBeInTheDocument();
    });
    it('spørsmål om stillingsprosent skal vises når redusert arbeidstid og samme stillingsprosent er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(REDUSERT));
        await user.click(screen.getByText(JA));

        expect(await screen.getByText(HVILKEN_STILLINGSPROSENT)).toBeInTheDocument();
    });
    it('feilmelding ved ikke oppgitt stillingsprosent', async () => {
        render(<Default />);

        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(REDUSERT));
        await user.click(screen.getByText(JA));
        expect(await screen.findByText(HVILKEN_STILLINGSPROSENT)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi stillingsprosenten du skal jobbe.')[0]).toBeInTheDocument();
    });
    it('feilmelding ved stillingsprosent i feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(REDUSERT));
        await user.click(screen.getByText(JA));
        expect(await screen.findByText(HVILKEN_STILLINGSPROSENT)).toBeInTheDocument();

        const stillingsprosentInput = screen.getByLabelText(HVILKEN_STILLINGSPROSENT);
        await user.type(stillingsprosentInput, 'bla bla');
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Stillingsprosent må være et tall.')[0]).toBeInTheDocument();
    });
    it('feilmelding ved ikke oppgitt redusert fra-dato', async () => {
        render(<Default />);

        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(REDUSERT));
        await user.click(screen.getByText(JA));
        expect(await screen.findByText(FRA_DATO_REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Du må oppgi fra hvilken dato du skal jobbe redusert.')[0],
        ).toBeInTheDocument();
    });
    it('feilmelding ved ikke oppgitt redusert til-dato', async () => {
        render(<Default />);

        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(REDUSERT));
        await user.click(screen.getByText(JA));
        expect(await screen.findByText(TIL_DATO_REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText(
                'Du må oppgi om du skal jobbe redusert frem til tre uker før termin eller frem til en annen dato.',
            )[0],
        ).toBeInTheDocument();
    });

    it('redusert frem til en dato valgt', async () => {
        render(<Default />);

        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(REDUSERT));
        await user.click(screen.getByText(JA));
        expect(await screen.findByText(TIL_DATO_REDUSERT)).toBeInTheDocument();
        await user.click(screen.getByText(FREM_TIL_DATO));
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.findByText(DATO_TILBAKE)).toBeInTheDocument();
    });
    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(TILRETTELEGGINGSDATO)).toBeInTheDocument();

        expect(await screen.findByText(REDUSERT)).toBeInTheDocument();

        await user.click(screen.getByText(REDUSERT));
        await user.click(screen.getByText(JA));
        expect(await screen.findByText(FRA_DATO_REDUSERT)).toBeInTheDocument();
        await user.click(screen.getByText(FREM_TIL_DATO));

        const tilretteleggingsdatoInput = screen.getByLabelText(TILRETTELEGGINGSDATO);
        const fraDatoRedusertInput = screen.getByLabelText(FRA_DATO_REDUSERT);
        const tilbakeDatoInput = screen.getByLabelText(DATO_TILBAKE);

        await user.type(tilretteleggingsdatoInput, 'fdkmv');
        await user.type(fraDatoRedusertInput, 'fdkmv');
        await user.type(tilbakeDatoInput, 'fdkmv');

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText(
                'Startdatoen for behov for tilrettelegging må være en gyldig dato på formatet dd.mm.åååå.',
            )[0],
        ).toBeInTheDocument();
        expect(
            await screen.getAllByText(
                'Datoen du skal begynne å jobbe redusert må være en gyldig dato på formatet dd.mm.åååå.',
            )[0],
        ).toBeInTheDocument();
        expect(
            await screen.getAllByText(
                'Datoen du skal tilbake til din opprinnelige stillingsprosent må være på formatet dd.mm.åååå.',
            )[0],
        ).toBeInTheDocument();
    });
});
