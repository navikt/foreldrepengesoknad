import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswTest } from '@navikt/fp-utils-test';

import * as stories from './Planlegger.stories';

const { DefaultMockaStønadskontoerOgSatser } = composeStories(stories);

describe('<Planlegger>', () => {
    mswTest.skip('skal gå rett til oppsummering når ingen av foreldrene har rett', async ({ setHandlers }) => {
        // TODO Fiks test
        setHandlers(DefaultMockaStønadskontoerOgSatser.parameters.msw);
        const utils = render(<DefaultMockaStønadskontoerOgSatser />);

        expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor og far'));
        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Helga');
        const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
        await userEvent.type(farNavn, 'Espen');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
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

        expect(screen.getAllByText('Barnehageplass')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Er ufør'));
        await userEvent.click(screen.getByText('Nei'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Ingen av dere har rett til foreldrepenger')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 5')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Barnehageplass')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 5')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 5')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
    });

    mswTest.skip(
        'skal gå rett til oppsummering når barnet er født for mer enn tre år siden',
        async ({ setHandlers }) => {
            // TODO Fiks test
            setHandlers(DefaultMockaStønadskontoerOgSatser.parameters.msw);
            const utils = render(<DefaultMockaStønadskontoerOgSatser />);

            expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Start'));

            expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Mor og far'));
            const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
            await userEvent.type(morNavn, 'Helga');
            const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
            await userEvent.type(farNavn, 'Espen');
            await userEvent.click(screen.getByText('Neste'));

            expect(screen.getAllByText('Barnet')).toHaveLength(2);
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
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

            expect(screen.getAllByText('Barnet')).toHaveLength(2);
            expect(screen.getByText('Steg 2 av 3')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
            expect(screen.getByText('Steg 1 av 3')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
        },
    );

    //TODO (TOR) Fiks denne som kun feilar på github
    mswTest.skip('skal ikke vise fordelingssteget når far og far og barnet er født', async ({ setHandlers }) => {
        setHandlers(DefaultMockaStønadskontoerOgSatser.parameters.msw);
        const utils = render(<DefaultMockaStønadskontoerOgSatser />);

        expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Far og far'));
        const morNavn = utils.getAllByLabelText('Hva heter far? (valgfritt)')[0];
        await userEvent.type(morNavn, 'Anders');
        const farNavn = utils.getAllByLabelText('Hva heter far? (valgfritt)')[1];
        await userEvent.type(farNavn, 'Espen');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
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

        expect(screen.getAllByText('Barnehageplass')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getAllByText('Ja')[1]);
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Hvor mye')).toHaveLength(2);
        expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
        const lønnSøker1 = utils.getByLabelText('Hva tjener Anders ca. i måneden? (valgfritt)');
        await userEvent.type(lønnSøker1, '50000');
        const lønnSøker2 = utils.getByLabelText('Hva tjener Espen ca. i måneden? (valgfritt)');
        await userEvent.type(lønnSøker2, '50000');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Hvor lenge')).toHaveLength(2);
        expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('100 % utbetaling over 46 uker'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Perioden med foreldrepenger')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvor lenge')).toHaveLength(2);
        expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvor mye')).toHaveLength(2);
        expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Barnehageplass')).toHaveLength(2);
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

    mswTest.skip('skal ikke vise barnehageplass-steget når adopsjon', async ({ setHandlers }) => {
        // TODO Fiks test
        setHandlers(DefaultMockaStønadskontoerOgSatser.parameters.msw);
        const utils = render(<DefaultMockaStønadskontoerOgSatser />);

        expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Start'));

        expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor og far'));
        const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
        await userEvent.type(morNavn, 'Klara');
        const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
        await userEvent.type(farNavn, 'Espen');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Adopsjon'));
        await userEvent.click(screen.getByText('Ett'));
        const overtakelse = utils.getByLabelText('Når tar dere over omsorgen for barnet?');
        await userEvent.type(overtakelse, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(overtakelse);
        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

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
        const lønnSøker1 = utils.getByLabelText('Hva tjener Klara ca. i måneden? (valgfritt)');
        await userEvent.type(lønnSøker1, '50000');
        const lønnSøker2 = utils.getByLabelText('Hva tjener Espen ca. i måneden? (valgfritt)');
        await userEvent.type(lønnSøker2, '50000');
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Hvor lenge')).toHaveLength(2);
        expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('100 % utbetaling over 49 uker'));
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getAllByText('Fordeling')).toHaveLength(2);
        expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
        await userEvent.selectOptions(
            utils.getByLabelText('Hvordan vil dere fordele 16 uker med fellesperiode?'),
            '45',
        );
        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Tilpass planen'));

        expect(screen.getAllByText('Tilpass planen')).toHaveLength(2);
        expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: 'Neste' }));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

        expect(screen.getAllByText('Tilpass planen')).toHaveLength(2);
        expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Steg 7 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Fordeling')).toHaveLength(2);
        expect(screen.getByText('Steg 6 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvor lenge')).toHaveLength(2);
        expect(screen.getByText('Steg 5 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvor mye')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige'));

        expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
    });
});
