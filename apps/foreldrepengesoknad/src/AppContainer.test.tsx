import { composeStories, composeStory } from '@storybook/react-vite';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { API_URLS } from 'api/queries';
import dayjs from 'dayjs';
import ky from 'ky';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { PeriodeDto_fpoversikt } from '@navikt/fp-types';

import { AppContainer, queryClient } from './AppContainer';
import * as stories from './AppContainer.stories';

const { SøkerErMann, SøkerErKvinne } = composeStories(stories);

const PLANLEGGER_DATA =
    'eyJPTV9CQVJORVQiOnsiZXJGw7hkc2VsIjp0cnVlLCJhbnRhbGxCYXJuIjoiMSIsImVyQmFybmV0RsO4ZHQiOnRydWUsImbDuGRzZWxzZGF0byI6IjIwMjYtMDUtMDUiLCJ0ZXJtaW5kYXRvIjoiMjAyNi0wNS0wMiJ9LCJIVk9SX0xBTkdfUEVSSU9ERSI6eyJkZWtuaW5nc2dyYWQiOiIxMDAifSwiRk9SREVMSU5HIjp7ImFudGFsbERhZ2VyU8O4a2VyMSI6NjB9LCJVVFRBS1NQTEFOIjpbeyJmb20iOiIyMDI2LTA0LTE0IiwidG9tIjoiMjAyNi0wNS0wNCIsInPDuGtlciI6eyJmb3JlbGRlciI6Ik1PUiIsImtvbnRvVHlwZSI6IkZPUkVMRFJFUEVOR0VSX0bDmFJfRsOYRFNFTCIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX19LHsiZm9tIjoiMjAyNi0wNS0wNSIsInRvbSI6IjIwMjYtMDgtMTciLCJzw7hrZXIiOnsiZm9yZWxkZXIiOiJNT1IiLCJrb250b1R5cGUiOiJNw5hEUkVLVk9URSIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX19LHsiZm9tIjoiMjAyNi0wOC0xOCIsInRvbSI6IjIwMjYtMTEtMDkiLCJzw7hrZXIiOnsiZm9yZWxkZXIiOiJNT1IiLCJrb250b1R5cGUiOiJGRUxMRVNQRVJJT0RFIiwiZmxlcmJhcm5zZGFnZXIiOmZhbHNlfX0seyJmb20iOiIyMDI2LTExLTEwIiwidG9tIjoiMjAyNi0xMS0xMyIsInPDuGtlciI6eyJmb3JlbGRlciI6IkZBUl9NRURNT1IiLCJrb250b1R5cGUiOiJGRURSRUtWT1RFIiwiZmxlcmJhcm5zZGFnZXIiOmZhbHNlfX0seyJmb20iOiIyMDI2LTExLTE2IiwidG9tIjoiMjAyNi0xMS0yNyIsInPDuGtlciI6eyJmb3JlbGRlciI6Ik1PUiIsInV0c2V0dGVsc2XDhXJzYWsiOiJGRVJJRSIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX19LHsiZm9tIjoiMjAyNi0xMS0zMCIsInRvbSI6IjIwMjctMDItMjIiLCJzw7hrZXIiOnsiZm9yZWxkZXIiOiJGQVJfTUVETU9SIiwia29udG9UeXBlIjoiRkVEUkVLVk9URSIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX19LHsiZm9tIjoiMjAyNy0wMi0yMyIsInRvbSI6IjIwMjctMDMtMjIiLCJzw7hrZXIiOnsia29udG9UeXBlIjoiRkVMTEVTUEVSSU9ERSIsIm1vcnNBa3Rpdml0ZXQiOiJUUkVOR0VSX0hKRUxQIiwiZm9yZWxkZXIiOiJGQVJfTUVETU9SIiwiZmxlcmJhcm5zZGFnZXIiOmZhbHNlfX1dfQ==';

describe('<AppContainer>', () => {
    beforeEach(() => {
        vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
            setAvailableLanguages: vi.fn(),
            onLanguageSelect: vi.fn(),
        }));
        queryClient.clear();
    });

    it('skal gå raskeste vei gjennom applikasjonen som far', async () => {
        await SøkerErMann.run();

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
        const termindato = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        const fødselsdato = screen.getByLabelText('Når ble barnet født?');
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

        // Stegvelger: hopp frå Oppsummering (steg 9) tilbake til Bo i utlandet (steg 3) via stegvelgar
        await userEvent.click(screen.getByText('Vis alle steg'));
        await userEvent.click(screen.getByText('Bo i utlandet'));
        await waitFor(() => expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2));
        expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();

        // Stegvelger: hopp frå Bo i utlandet (steg 3) tilbake til Din situasjon (steg 1) via stegvelgar
        await userEvent.click(screen.getByText('Vis alle steg'));
        await userEvent.click(screen.getByText('Din situasjon'));
        await waitFor(() => expect(screen.getAllByText('Din situasjon')).toHaveLength(2));
        expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();

        // Forrige steg frå steg 1 → Velkommen
        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
    });

    it('skal gå raskeste vei gjennom applikasjonen som mor', async () => {
        await SøkerErKvinne.run();

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
        const termindato = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        const fødselsdato = screen.getByLabelText('Når ble barnet født?');
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
        await userEvent.click(screen.getByText(/Tre uker før fødsel fra/));
        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(screen.getAllByText('Din plan med foreldrepenger')).toHaveLength(2));
        expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(screen.getAllByText('Oppsummering')).toHaveLength(2));
        expect(screen.getByText('Steg 9 av 9')).toBeInTheDocument();
    });

    it('skal gå gjennom applikasjonen med forhåndsutfylte data fra planleggeren', async () => {
        const planleggerData = PLANLEGGER_DATA;

        const SøkerErKvinneMedPlanleggerData = composeStory(
            { ...stories.SøkerErKvinne },
            {
                ...stories.default,
                render: () => (
                    <MemoryRouter initialEntries={[`/?planleggerData=${planleggerData}`]}>
                        <AppContainer />
                    </MemoryRouter>
                ),
            },
        );

        await SøkerErKvinneMedPlanleggerData.run();

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
            const fødselsdato = screen.getByDisplayValue('05.05.2026');
            expect(fødselsdato).toBeInTheDocument();
        });
        const termindato = screen.getByDisplayValue('02.05.2026');
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

        // Step 6: PERIODE_MED_FORELDREPENGER - verify 100 % pre-selected
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
    });
    it('skal fordele periodene fra planleggeren etter søkers forelder når far søker', async () => {
        const SøkerErMannMedPlanleggerData = composeStory(
            {
                ...stories.SøkerErMann,
                beforeEach({ msw }) {
                    msw.use(
                        http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 204 })),
                        http.post(API_URLS.uttaksplan, () => new HttpResponse(null, { status: 204 })),
                    );
                },
            },
            {
                ...stories.default,
                render: () => (
                    <MemoryRouter initialEntries={[`/?planleggerData=${PLANLEGGER_DATA}`]}>
                        <AppContainer />
                    </MemoryRouter>
                ),
            },
        );
        const kyPost = vi.spyOn(ky, 'post');

        await SøkerErMannMedPlanleggerData.run();

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Det planlagte barnet fra planleggeren'));
        await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));
        await userEvent.click(screen.getByText('Start søknaden'));

        await waitFor(() => expect(screen.getAllByText('Din situasjon')).toHaveLength(2));
        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(screen.getAllByText('Barnet')).toHaveLength(2));
        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2));
        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2));
        const neiRadios = screen.getAllByText('Nei');
        await userEvent.click(neiRadios[0]!);
        await userEvent.click(neiRadios[1]!);
        await userEvent.click(neiRadios[2]!);
        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2));
        await userEvent.type(screen.getByLabelText('Fornavnet til den andre forelderen'), 'Hanne');
        await userEvent.type(screen.getByLabelText('Etternavnet til den andre forelderen'), 'Mygg');
        await userEvent.type(
            screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen'),
            '02520489226',
        );
        await waitFor(() => expect(screen.getAllByText('Ja')).toHaveLength(3));
        const jaRadios = screen.getAllByText('Ja');
        await userEvent.click(jaRadios[0]!);
        await userEvent.click(jaRadios[1]!);
        await userEvent.click(jaRadios[2]!);
        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(screen.getAllByText('Periode med foreldrepenger')).toHaveLength(2));
        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(screen.getAllByText('Din plan med foreldrepenger')).toHaveLength(2));
        await userEvent.click(screen.getByRole('tab', { name: 'Liste' }));

        expect(
            within(screen.getByTestId('2026-04-14 - 2026-05-04')).getAllByText('Hanne har foreldrepenger'),
        ).not.toHaveLength(0);
        expect(
            within(screen.getByTestId('2026-05-05 - 2026-11-09')).getAllByText('Hanne har foreldrepenger'),
        ).not.toHaveLength(0);
        expect(
            within(screen.getByTestId('2026-11-10 - 2026-11-13')).getAllByText('Tapper har foreldrepenger'),
        ).not.toHaveLength(0);
        expect(
            within(screen.getByTestId('2026-11-30 - 2027-03-22')).getAllByText('Tapper har foreldrepenger'),
        ).not.toHaveLength(0);

        const sisteMellomlagretUttaksplan = kyPost.mock.calls
            .filter(([url]) => url === API_URLS.mellomlagring)
            .map(([, options]) => (options?.json as { UTTAKSPLAN?: PeriodeDto_fpoversikt[] }).UTTAKSPLAN)
            .at(-1);

        expect(sisteMellomlagretUttaksplan?.map((p) => [p.fom, p.søker?.forelder, p.annenPart?.forelder])).toEqual([
            ['2026-04-14', undefined, 'MOR'],
            ['2026-05-05', undefined, 'MOR'],
            ['2026-08-18', undefined, 'MOR'],
            ['2026-11-10', 'FAR_MEDMOR', undefined],
            ['2026-11-16', undefined, 'MOR'],
            ['2026-11-30', 'FAR_MEDMOR', undefined],
            ['2027-02-23', 'FAR_MEDMOR', undefined],
        ]);
    });
});
