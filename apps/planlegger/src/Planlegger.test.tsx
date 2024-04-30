import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './Planlegger.stories';

const { Default } = composeStories(stories);

describe('<Planlegger>', () => {
    it('skal gå gjennom applikasjonen og så tilbake', async () => {
        const utils = render(<Default brukStønadskontoMock />);

        expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getByText('Hvem planlegger')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor og far'));
        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Helga');
        const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
        await userEvent.type(farNavn, 'Espen');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Ett'));
        await userEvent.click(screen.getByText('Ja'));
        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);
        const termindato = utils.getByLabelText('Når var termindato?');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();
        await userEvent.click(
            screen.getByText('Har jobbet 6 av de siste 10 månedene og har tjent mer enn 59 310 kr det siste året'),
        );
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Hvor lenge')).toBeInTheDocument();
        expect(screen.getByText('Steg 4 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('100 % utbetaling over 49 uker'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Fordeling')).toBeInTheDocument();
        expect(screen.getByText('Steg 5 av 7')).toBeInTheDocument();
        await userEvent.selectOptions(utils.getByLabelText('Hvordan vil dere fordele fellesperioden?'), '1');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 6 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 6 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Fordeling')).toBeInTheDocument();
        expect(screen.getByText('Steg 5 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Hvor lenge')).toBeInTheDocument();
        expect(screen.getByText('Steg 4 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Hvem planlegger')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
    });

    it('skal gå rett til oppsummering når ingen av foreldrene har rett', async () => {
        const utils = render(<Default brukStønadskontoMock />);

        expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getByText('Hvem planlegger')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor og far'));
        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Helga');
        const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
        await userEvent.type(farNavn, 'Espen');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Ett'));
        await userEvent.click(screen.getByText('Ja'));
        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);
        const termindato = utils.getByLabelText('Når var termindato?');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Er ufør'));
        await userEvent.click(screen.getByText('Nei'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Ingen av dere har rett til foreldrepenger')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Hvem planlegger')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
    });

    it('skal gå rett til oppsummering når barnet er født for mer enn tre år siden', async () => {
        const utils = render(<Default brukStønadskontoMock />);

        expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getByText('Hvem planlegger')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor og far'));
        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Helga');
        const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
        await userEvent.type(farNavn, 'Espen');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Ett'));
        await userEvent.click(screen.getByText('Ja'));
        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'years').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);
        const termindato = utils.getByLabelText('Når var termindato?');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Ingen av dere har rett til foreldrepenger')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Hvem planlegger')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
    });

    it('skal ikke vise fordelingssteget når far og far og barnet er født', async () => {
        const utils = render(<Default brukStønadskontoMock />);

        expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getByText('Hvem planlegger')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Far og far'));
        const morNavn = utils.getAllByLabelText('Hva heter far? (valgfritt)')[0];
        await userEvent.type(morNavn, 'Anders');
        const farNavn = utils.getAllByLabelText('Hva heter far? (valgfritt)')[1];
        await userEvent.type(farNavn, 'Espen');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 3')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Ett'));
        await userEvent.click(screen.getByText('Ja'));
        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);
        const termindato = utils.getByLabelText('Når var termindato?');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getAllByText('Ja')[1]);
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Hvor lenge')).toBeInTheDocument();
        expect(screen.getByText('Steg 4 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('100 % utbetaling over 46 uker'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 5 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Perioden med foreldrepenger')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 5 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Hvor lenge')).toBeInTheDocument();
        expect(screen.getByText('Steg 4 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Hvem planlegger')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
    });
});
