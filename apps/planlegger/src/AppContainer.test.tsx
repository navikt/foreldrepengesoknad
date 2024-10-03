import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { applyRequestHandlers } from 'msw-storybook-addon';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './AppContainer.stories';

const { DefaultMockaStønadskontoerOgSatser } = composeStories(stories);

// Denne testen har kun ein test grunna at context ikkje blir sletta mellom testande. Skriv derfor testane i Planlegger.test.tsx

describe('<AppContainer>', () => {
    it('skal gå gjennom applikasjonen og så tilbake', async () => {
        await applyRequestHandlers(DefaultMockaStønadskontoerOgSatser.parameters.msw);
        const utils = render(<DefaultMockaStønadskontoerOgSatser />);

        expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor og far'));
        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Helga');
        const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
        await userEvent.type(farNavn, 'Espen');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 8')).toBeInTheDocument();
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

        expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 8')).toBeInTheDocument();
        await userEvent.click(
            screen.getByText('Har jobbet 6 av de siste 10 månedene og har tjent mer enn 62 014 kr det siste året'),
        );
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Hvor mye')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 8')).toBeInTheDocument();
        const lønnMor = utils.getByLabelText('Hva tjener Helga ca. i måneden? (valgfritt)');
        await userEvent.type(lønnMor, '50000');
        const lønnFar = utils.getByLabelText('Hva tjener Espen ca. i måneden? (valgfritt)');
        await userEvent.type(lønnFar, '50000');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Hvor lenge')).toHaveLength(2);
        expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('100 % utbetaling over 49 uker'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Fordeling')).toHaveLength(2);
        expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
        await userEvent.selectOptions(utils.getByLabelText('Hvordan vil dere fordele 16 uker med fellesperiode?'), '5');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Fordeling')).toHaveLength(2);
        expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvor lenge')).toHaveLength(2);
        expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvor mye')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
    });
});
