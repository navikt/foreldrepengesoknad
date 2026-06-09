import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';

import { endreFordelingMedSlider } from '../vitest/testHelpers';
import * as stories from './Planlegger.stories';

import messages from './intl/messages/nb_NO.json';

const { DefaultMockaStønadskvoterOgSatser, FarFarMockaStønadskvoterOgSatser } = composeStories(stories);

describe('<Planlegger>', () => {
    it(
        'skal gå rett til oppsummering når ingen av foreldrene har rett',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(DefaultMockaStønadskvoterOgSatser.parameters.msw);
            const utils = render(<DefaultMockaStønadskvoterOgSatser />);

            expect(await screen.findByText(messages['OmPlanleggerenSteg.Underoverskrift'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OmPlanleggerenSteg.Start.Planlegger']));

            await waitFor(() => expect(screen.getAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.MorOgFar']));
            const morNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Mor']);
            await userEvent.type(morNavn, 'Helga');
            const farNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Far']);
            await userEvent.type(farNavn, 'Espen');
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OmBarnetSteg.Fødsel']));
            await userEvent.click(screen.getByText(messages['OmBarnetSteg.Ett']));
            await userEvent.click(screen.getByText('Ja'));
            const fødselsdato = utils.getByLabelText('Når ble barnet født?');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            const termindato = utils.getByLabelText(messages['ErFødtPanel.NårVarTermin']);
            await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['BarnehageplassOppsummering.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['ArbeidssituasjonSteg.Ufør']));
            await userEvent.click(screen.getByText(messages['DefaultMessage.Nei']));
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['OppsummeringHeader.Tittel'])).toHaveLength(2));
            expect(screen.getByText(messages['OppsummeringSteg.Infoboks.IngenHarRett'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OppsummeringSteg.TilbakeTil']));

            await waitFor(() => expect(screen.getAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 5')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            await waitFor(() => expect(screen.getAllByText(messages['BarnehageplassOppsummering.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            await waitFor(() => expect(screen.getAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 5')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            await waitFor(() => expect(screen.getAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 5')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getByText(messages['OmPlanleggerenSteg.Underoverskrift'])).toBeInTheDocument();
        }),
    );

    it(
        'skal gå rett til oppsummering når barnet er født for mer enn tre år siden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(DefaultMockaStønadskvoterOgSatser.parameters.msw);
            const utils = render(<DefaultMockaStønadskvoterOgSatser />);

            expect(await screen.findByText(messages['OmPlanleggerenSteg.Underoverskrift'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OmPlanleggerenSteg.Start.Planlegger']));

            await waitFor(() => expect(screen.getAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.MorOgFar']));
            const morNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Mor']);
            await userEvent.type(morNavn, 'Helga');
            const farNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Far']);
            await userEvent.type(farNavn, 'Espen');
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OmBarnetSteg.Fødsel']));
            await userEvent.click(screen.getByText(messages['OmBarnetSteg.Ett']));
            await userEvent.click(screen.getByText('Ja'));
            const fødselsdato = utils.getByLabelText('Når ble barnet født?');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'years').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            const termindato = utils.getByLabelText(messages['ErFødtPanel.NårVarTermin']);
            await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['OppsummeringHeader.Tittel'])).toHaveLength(2));
            expect(screen.getByText(messages['OppsummeringSteg.Infoboks.IngenHarRett'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OppsummeringSteg.TilbakeTil']));

            await waitFor(() => expect(screen.getAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 3')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getByText('Steg 1 av 3')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));
        }),
    );

    it(
        'skal ikke vise fordelingssteget når far og far og barnet er født',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarFarMockaStønadskvoterOgSatser.parameters.msw);
            const utils = render(<FarFarMockaStønadskvoterOgSatser />);

            expect(await screen.findByText(messages['OmPlanleggerenSteg.Underoverskrift'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OmPlanleggerenSteg.Start.Planlegger']));

            await waitFor(() => expect(screen.getAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.FarOgFar']));
            const morNavn = utils.getAllByLabelText('Hva heter far? (valgfritt)')[0]!;
            await userEvent.type(morNavn, 'Anders');
            const farNavn = utils.getAllByLabelText('Hva heter far? (valgfritt)')[1]!;
            await userEvent.type(farNavn, 'Espen');
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OmBarnetSteg.Fødsel']));
            await userEvent.click(screen.getByText(messages['OmBarnetSteg.Ett']));
            await userEvent.click(screen.getByText('Ja'));
            const fødselsdato = utils.getByLabelText('Når ble barnet født?');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            const termindato = utils.getByLabelText(messages['ErFødtPanel.NårVarTermin']);
            await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['BarnehageplassOppsummering.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja'));
            await userEvent.click(screen.getAllByText('Ja')[1]!);
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['HvorMyeSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
            const lønnSøker1 = utils.getByLabelText('Hva tjener Anders ca. i måneden? (valgfritt)');
            await userEvent.type(lønnSøker1, '50000');
            const lønnSøker2 = utils.getByLabelText('Hva tjener Espen ca. i måneden? (valgfritt)');
            await userEvent.type(lønnSøker2, '50000');
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['HvorLangPeriodeSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('100 % utbetaling over 15 uker'));
            await userEvent.click(screen.getByText('Neste'));

            expect(await screen.findByText('Planen deres')).toBeInTheDocument();
            expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getAllByText(messages['OppsummeringHeader.Tittel'])[1]!);

            expect(screen.getAllByText(messages['OppsummeringHeader.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Planen deres')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OppsummeringSteg.TilbakeTil']));

            expect(screen.getByText('Planen deres')).toBeInTheDocument();
            expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['HvorLangPeriodeSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['HvorMyeSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 4 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['BarnehageplassOppsummering.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 3 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 2 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2);
            expect(screen.getByText('Steg 1 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getByText(messages['OmPlanleggerenSteg.Underoverskrift'])).toBeInTheDocument();
        }),
    );

    it(
        'skal ikke vise barnehageplass-steget når adopsjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(DefaultMockaStønadskvoterOgSatser.parameters.msw);
            const utils = render(<DefaultMockaStønadskvoterOgSatser />);

            expect(await screen.findByText(messages['OmPlanleggerenSteg.Underoverskrift'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OmPlanleggerenSteg.Start.Planlegger']));

            await waitFor(() => expect(screen.getAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['HvemPlanleggerSteg.MorOgFar']));
            const morNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Mor']);
            await userEvent.type(morNavn, 'Klara');
            const farNavn = utils.getByLabelText(messages['HvemPlanleggerSteg.Far']);
            await userEvent.type(farNavn, 'Espen');
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OmBarnetSteg.Adopsjon']));
            await userEvent.click(screen.getByText(messages['OmBarnetSteg.Ett']));
            const overtakelse = utils.getByLabelText('Når tar dere over omsorgen for barnet?');
            await userEvent.type(overtakelse, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(overtakelse);
            const fødselsdato = utils.getByLabelText('Når ble barnet født?');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 8')).toBeInTheDocument();
            await userEvent.click(
                screen.getByText(
                    'Har jobbet minst 6 av de siste 10 månedene og har tjent 68 274,50 kr eller mer det siste året',
                ),
            );
            await userEvent.click(screen.getByText('Ja'));
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['HvorMyeSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 8')).toBeInTheDocument();
            const lønnSøker1 = utils.getByLabelText('Hva tjener Klara ca. i måneden? (valgfritt)');
            await userEvent.type(lønnSøker1, '50000');
            const lønnSøker2 = utils.getByLabelText('Hva tjener Espen ca. i måneden? (valgfritt)');
            await userEvent.type(lønnSøker2, '50000');
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['HvorLangPeriodeSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('100 % utbetaling over 49 uker'));
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText(messages['FordelingSteg.Tittel'])).toHaveLength(2));
            expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
            await endreFordelingMedSlider(utils, 45);
            await userEvent.click(screen.getByText('Neste'));

            expect(await screen.findByText('Planen deres')).toBeInTheDocument();
            expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getAllByText(messages['OppsummeringHeader.Tittel'])[1]!);

            expect(screen.getAllByText(messages['OppsummeringHeader.Tittel'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['OppsummeringSteg.TilbakeTil']));

            expect(screen.getByText('Planen deres')).toBeInTheDocument();
            expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['FordelingSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['HvorLangPeriodeSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['HvorMyeSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 4 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 3 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['OmBarnetSteg.Tittel'])).toHaveLength(2);
            expect(screen.getByText('Steg 2 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getAllByText(messages['HvemPlanleggerSteg.HvemPlanlegger'])).toHaveLength(2);
            expect(screen.getByText('Steg 1 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Forrige'));

            expect(screen.getByText(messages['OmPlanleggerenSteg.Underoverskrift'])).toBeInTheDocument();
        }),
    );
});
