import { composeStories } from '@storybook/react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { applyRequestHandlers } from 'msw-storybook-addon';
import { describe, expect } from 'vitest';

import * as stories from './EttersendingPage.stories';

const { SkalIkkeFeileOpplasting, SkalFeileOpplasting } = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ saksnummer: '1' }),
    };
});

describe('<EttersendingPage>', () => {
    it('skal laste opp dokument uten feil', async () => {
        await applyRequestHandlers(SkalIkkeFeileOpplasting.parameters.msw);
        const utils = render(<SkalIkkeFeileOpplasting />);

        expect(
            await screen.findByText(
                'Dokumentene du laster opp vil bli lagt ved søknaden din. ' +
                    'Du må velge hva dokumentene inneholder for at saksbehandlerene i Nav skal kunne behandle saken din.',
            ),
        ).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hva inneholder dokumentene dine?'), 'I000060');

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp dokumenter');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });

        expect(await screen.findByText('Lastet opp (1) - Annet dokument')).toBeInTheDocument();
        expect(screen.getByText('hello.png')).toBeInTheDocument();
        expect(screen.queryByText('Ops noe gikk galt prøv igjen')).not.toBeInTheDocument();
    });

    it('skal få feil ved opplasting av dokument', async () => {
        await applyRequestHandlers(SkalFeileOpplasting.parameters.msw);
        const utils = render(<SkalFeileOpplasting />);

        expect(
            await screen.findByText(
                'Dokumentene du laster opp vil bli lagt ved søknaden din. ' +
                    'Du må velge hva dokumentene inneholder for at saksbehandlerene i Nav skal kunne behandle saken din.',
            ),
        ).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hva inneholder dokumentene dine?'), 'I000060');

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp dokumenter');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });

        expect(await screen.findByText('Vedlegg med feil')).toBeInTheDocument();
        expect(screen.getByText('hello.png')).toBeInTheDocument();
        expect(screen.getByText('Ops noe gikk galt prøv igjen')).toBeInTheDocument();
    });

    it('skal få ES-relevante dokumentvalg', async () => {
        await applyRequestHandlers(SkalIkkeFeileOpplasting.parameters.msw);
        const utils = render(<SkalIkkeFeileOpplasting />);

        expect(
            await screen.findByText(
                'Dokumentene du laster opp vil bli lagt ved søknaden din. ' +
                    'Du må velge hva dokumentene inneholder for at saksbehandlerene i Nav skal kunne behandle saken din.',
            ),
        ).toBeInTheDocument();

        const select = utils.getByLabelText('Hva inneholder dokumentene dine?');
        const optionsTextContent = within(select)
            .getAllByRole('option')
            .map((o) => o.textContent);

        // ikke uttømmende
        expect(optionsTextContent).toContain('Dokumentasjon på oppholdstillatelse');
        expect(optionsTextContent).toContain('Dokumentasjon på reiser til og fra Norge');
        expect(optionsTextContent).toContain('Dokumentasjon på oppfølging i svangerskapet');
        expect(optionsTextContent).toContain('Dokumentasjon på inntekt');
    });

    it('skal sortere annet dokument nederst', async () => {
        await applyRequestHandlers(SkalIkkeFeileOpplasting.parameters.msw);
        const utils = render(<SkalIkkeFeileOpplasting />);

        expect(
            await screen.findByText(
                'Dokumentene du laster opp vil bli lagt ved søknaden din. ' +
                    'Du må velge hva dokumentene inneholder for at saksbehandlerene i Nav skal kunne behandle saken din.',
            ),
        ).toBeInTheDocument();

        const select = utils.getByLabelText('Hva inneholder dokumentene dine?');
        const optionsTextContent = within(select)
            .getAllByRole('option')
            .map((o) => o.textContent);
        expect(optionsTextContent[optionsTextContent.length - 1]).toBe('Annet dokument');
    });

    it('skal filtrere bort irrelevante dokumenttyper basert på verdier i queryparam', async () => {
        const utils = render(<SkalIkkeFeileOpplasting skjematypeQueryParamValue="I000141,I000063" />);

        const select = utils.getByLabelText('Hva inneholder dokumentene dine?');
        const preselectedOption = within(select).getByRole('option', { selected: true });
        expect(preselectedOption.textContent).toBe('Velg type dokument');

        const optionsTextContent = within(select)
            .getAllByRole('option', { selected: false })
            .map((o) => o.textContent);

        expect(optionsTextContent).toContain('Terminbekreftelse');
        expect(optionsTextContent).toContain('Fødselsattest');
        expect(optionsTextContent.length).toBe(2);
    });

    it('skal preselektere dokumenttype dersom kun én manglende dokumenttype i queryparam', async () => {
        const utils = render(<SkalIkkeFeileOpplasting skjematypeQueryParamValue="I000141" />);
        const select = utils.getByLabelText('Hva inneholder dokumentene dine?');
        const preselectedOption = () => within(select).getByRole('option', { selected: true });

        expect(preselectedOption().textContent).toBe('Terminbekreftelse');
    });
});
