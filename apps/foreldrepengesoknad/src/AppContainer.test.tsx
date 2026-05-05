import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';

import { AppContainer, queryClient } from './AppContainer';
import * as stories from './AppContainer.stories';

const { SøkerErMann, SøkerErKvinne } = composeStories(stories);

describe('<AppContainer>', () => {
    beforeEach(() => {
        vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
            setAvailableLanguages: vi.fn(),
            onLanguageSelect: vi.fn(),
        }));
        queryClient.clear();
    });

    it(
        'skal gå raskeste vei gjennom applikasjonen som far',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(SøkerErMann.parameters.msw);
            const utils = render(<SøkerErMann />);

            expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Et annet barn'));
            await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));
            await userEvent.click(screen.getByText('Start søknaden'));

            await waitFor(() => expect(screen.getAllByText('Din situasjon')).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Fødsel'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Barnet')).toHaveLength(2));
            expect(await screen.findAllByText('Barnet')).toHaveLength(2);
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja'));
            await userEvent.click(screen.getByText('Ett barn'));
            const termindato = utils.getByLabelText('Hva var termindatoen?');
            await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            const fødselsdato = utils.getByLabelText('Når ble barnet født?');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
            await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
            const neiRadios = screen.getAllByText('Nei');
            await userEvent.click(neiRadios[0]!);
            await userEvent.click(neiRadios[1]!);
            await userEvent.click(neiRadios[2]!);
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2));
            expect(screen.getByText('Steg 5 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Jeg kan ikke oppgi den andre forelderen'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Periode med foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 6 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('75 uker med 100 prosent foreldrepenger'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Fordeling av foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 7 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Da barnet ble født'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Din plan med foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Oppsummering')).toHaveLength(2));
            expect(screen.getByText('Steg 9 av 9')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            await userEvent.click(screen.getByText('Ja'));
            expect(screen.getAllByText('Fordeling av foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Periode med foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Barnet')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Din situasjon')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        }),
    );

    it(
        'skal gå raskeste vei gjennom applikasjonen som mor',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(SøkerErKvinne.parameters.msw);
            const utils = render(<SøkerErKvinne />);

            expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Et annet barn'));
            await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));
            await userEvent.click(screen.getByText('Start søknaden'));

            await waitFor(() => expect(screen.getAllByText('Din situasjon')).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Fødsel'));
            await userEvent.click(screen.getByText('Mor'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Barnet')).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja'));
            await userEvent.click(screen.getByText('Ett barn'));
            const termindato = utils.getByLabelText('Hva var termindatoen?');
            await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            const fødselsdato = utils.getByLabelText('Når ble barnet født?');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
            await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
            const neiRadios = screen.getAllByText('Nei');
            await userEvent.click(neiRadios[0]!);
            await userEvent.click(neiRadios[1]!);
            await userEvent.click(neiRadios[2]!);
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2));
            expect(screen.getByText('Steg 5 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Jeg kan ikke oppgi den andre forelderen'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Periode med foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 6 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('75 uker med 100 prosent foreldrepenger'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Fordeling av foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 7 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Tre uker før fødsel'));
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Din plan med foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            await waitFor(() => expect(screen.getAllByText('Oppsummering')).toHaveLength(2));
            expect(screen.getByText('Steg 9 av 9')).toBeInTheDocument();
        }),
    );

    it(
        'skal gå gjennom applikasjonen med forhåndsutfylte data fra planleggeren',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(SøkerErKvinne.parameters.msw);

            const planleggerData =
                // eslint-disable-next-line max-len
                'eyJPTV9CQVJORVQiOnsiZXJGw7hkc2VsIjp0cnVlLCJhbnRhbGxCYXJuIjoiMSIsImVyQmFybmV0RsO4ZHQiOnRydWUsImbDuGRzZWxzZGF0byI6IjIwMjYtMDUtMDUiLCJ0ZXJtaW5kYXRvIjoiMjAyNi0wNS0wMiJ9LCJIVk9SX0xBTkdfUEVSSU9ERSI6eyJkZWtuaW5nc2dyYWQiOiIxMDAifSwiRk9SREVMSU5HIjp7ImFudGFsbERhZ2VyU8O4a2VyMSI6NjB9LCJVVFRBS1NQTEFOIjpbeyJmb3JlbGRlciI6Ik1PUiIsImtvbnRvVHlwZSI6IkZPUkVMRFJFUEVOR0VSX0bDmFJfRsOYRFNFTCIsImZvbSI6IjIwMjYtMDQtMTQiLCJ0b20iOiIyMDI2LTA1LTA0IiwiZmxlcmJhcm5zZGFnZXIiOmZhbHNlfSx7ImZvcmVsZGVyIjoiTU9SIiwia29udG9UeXBlIjoiTcOYRFJFS1ZPVEUiLCJmb20iOiIyMDI2LTA1LTA1IiwidG9tIjoiMjAyNi0wOC0xNyIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX0seyJmb3JlbGRlciI6Ik1PUiIsImtvbnRvVHlwZSI6IkZFTExFU1BFUklPREUiLCJmb20iOiIyMDI2LTA4LTE4IiwidG9tIjoiMjAyNi0xMS0wOSIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX0seyJmb3JlbGRlciI6IkZBUl9NRURNT1IiLCJrb250b1R5cGUiOiJGRURSRUtWT1RFIiwiZm9tIjoiMjAyNi0xMS0xMCIsInRvbSI6IjIwMjYtMTEtMTMiLCJmbGVyYmFybnNkYWdlciI6ZmFsc2V9LHsiZm9yZWxkZXIiOiJNT1IiLCJmb20iOiIyMDI2LTExLTE2IiwidG9tIjoiMjAyNi0xMS0yNyIsInV0c2V0dGVsc2XDhXJzYWsiOiJMT1ZCRVNURU1UX0ZFUklFIiwiZmxlcmJhcm5zZGFnZXIiOmZhbHNlfSx7ImZvcmVsZGVyIjoiRkFSX01FRE1PUiIsImtvbnRvVHlwZSI6IkZFRFJFS1ZPVEUiLCJmb20iOiIyMDI2LTExLTMwIiwidG9tIjoiMjAyNy0wMi0yMiIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX0seyJmb20iOiIyMDI3LTAyLTIzIiwidG9tIjoiMjAyNy0wMy0yMiIsImtvbnRvVHlwZSI6IkZFTExFU1BFUklPREUiLCJtb3JzQWt0aXZpdGV0IjoiVFJFTkdFUl9ISkVMUCIsImZvcmVsZGVyIjoiRkFSX01FRE1PUiIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX1dfQ==';

            const utils = render(
                <MemoryRouter initialEntries={[`/?planleggerData=${planleggerData}`]}>
                    <AppContainer />
                </MemoryRouter>,
            );

            // Front page - verify planned child option appears
            expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
            expect(screen.getByText('Det planlagte barnet fra planleggeren')).toBeInTheDocument();

            // Select planned child option and start
            await userEvent.click(screen.getByText('Det planlagte barnet fra planleggeren'));
            await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));
            await userEvent.click(screen.getByText('Start søknaden'));

            // Step 1: SØKERSITUASJON
            await waitFor(() => expect(screen.getAllByText('Din situasjon')).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Fødsel'));
            await userEvent.click(screen.getByText('Mor'));
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 2: OM_BARNET - verify pre-filled dates
            await waitFor(() => expect(screen.getAllByText('Barnet')).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 8')).toBeInTheDocument();
            await waitFor(() => {
                const fødselsdato = utils.getByDisplayValue('05.05.2026');
                expect(fødselsdato).toBeInTheDocument();
            });
            const termindato = utils.getByDisplayValue('02.05.2026');
            expect(termindato).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 3: BO_I_UTLANDET
            await waitFor(() => expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
            await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 4: ARBEIDSFORHOLD_OG_INNTEKT
            await waitFor(() => expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 8')).toBeInTheDocument();
            const neiRadios = screen.getAllByText('Nei');
            await userEvent.click(neiRadios[0]!);
            await userEvent.click(neiRadios[1]!);
            await userEvent.click(neiRadios[2]!);
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 5: DEN_ANDRE_FORELDEREN
            await waitFor(() => expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2));
            expect(screen.getByText('Steg 5 av 8')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Jeg kan ikke oppgi den andre forelderen'));
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 6: PERIODE_MED_FORELDREPENGER - verify 100% pre-selected
            await waitFor(() => expect(screen.getAllByText('Periode med foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 6 av 8')).toBeInTheDocument();
            expect(screen.getByDisplayValue('100')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 7: UTTAKSPLAN (FORDELING hidden)
            await waitFor(() => expect(screen.getAllByText('Din plan med foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
            // Switch to list view to verify all planlegger periods are rendered
            await userEvent.click(screen.getByRole('tab', { name: 'Liste' }));

            // Row 1 — MOR: Foreldrepenger før fødsel (P1 alone, before fødsel)
            const row1 = screen.getByTestId('2026-04-14 - 2026-05-04');
            expect(within(row1).getByText(/14\. april 26/)).toBeInTheDocument();
            expect(within(row1).getByText(/04\. mai 26/)).toBeInTheDocument();

            // Fødselsdato row (familiehendelse, "Fødsel" label appears twice via responsive Hide/Show)
            const fødselRow = screen.getByTestId('2026-05-05 - 2026-05-05');
            expect(within(fødselRow).getAllByText('Fødsel')).toHaveLength(2);
            expect(within(fødselRow).getByText(/05\. mai 26/)).toBeInTheDocument();

            // Row 2 — MOR: Mødrekvote (P2) + Fellesperiode (P3) grouped
            const row2 = screen.getByTestId('2026-05-05 - 2026-11-09');
            expect(within(row2).getByText(/05\. mai 26/)).toBeInTheDocument();
            expect(within(row2).getByText(/09\. nov/)).toBeInTheDocument();

            // Row 3 — FAR_MEDMOR: Fedrekvote (P4 alone)
            const row3 = screen.getByTestId('2026-11-10 - 2026-11-13');
            expect(within(row3).getByText(/10\. nov/)).toBeInTheDocument();
            expect(within(row3).getByText(/13\. nov/)).toBeInTheDocument();

            // Row 4 — MOR: Utsettelse lovbestemt ferie (P5 alone; utsettelse always gets its own row)
            const row4 = screen.getByTestId('2026-11-16 - 2026-11-27');
            expect(within(row4).getAllByText('Ferie')).toHaveLength(2);
            expect(within(row4).getByText(/16\. nov/)).toBeInTheDocument();
            expect(within(row4).getByText(/27\. nov/)).toBeInTheDocument();

            // Row 5 — FAR_MEDMOR: Fedrekvote (P6) + Fellesperiode med morsAktivitet (P7) grouped
            const row5 = screen.getByTestId('2026-11-30 - 2027-03-22');
            expect(within(row5).getByText(/30\. nov/)).toBeInTheDocument();
            expect(within(row5).getByText(/22\. mars/)).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            // Step 8: OPPSUMMERING
            await waitFor(() => expect(screen.getAllByText('Oppsummering')).toHaveLength(2));
            expect(screen.getByText('Steg 8 av 8')).toBeInTheDocument();
        }),
    );
});
