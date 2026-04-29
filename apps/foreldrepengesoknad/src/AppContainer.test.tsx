import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';

import { queryClient, AppContainer } from './AppContainer';
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
            
            const planleggerData = 'eyJPTV9CQVJORVQiOnsiZXJGw7hkc2VsIjp0cnVlLCJhbnRhbGxCYXJuIjoiMSIsImVyQmFybmV0RsO4ZHQiOnRydWUsImZm8blkc2VsIjoiMjAyNi0wNS0wNCIsInRlcm1pbmRhdG8iOiIyMDI2LTA1LTAxIn0sIkhXT1JfTEFOR19QRVJJT0RFIjp7ImRla25pbmdzZ3JhZCI6IjEwMCJ9LCJGT1JERUxJTkciOnsiYW50YWxsRGFnZXJTwuhrZXIxIjo2MH0sIlVUVEFLU1BMQU4iOlt7ImZvcmVsZGVyIjoiTU9SIiwia29udG9UeXBlIjoiRk9SRUxEUkVQRU5HRVJFX0bDmFJfRsOYRFNFTCIsImZyYSI6IjIwMjYtMDQtMTMiLCJ0aWwiOiIyMDI2LTA1LTAxIiwiZmxlcmJhcm5zZGFnZXIiOmZhbHNlfSx7ImZvcmVsZGVyIjoiTU9SIiwia29udG9UeXBlIjoiTcOYRFJRS1ZPVEUiLCJmcmEiOiIyMDI2LTA1LTA0IiwidG9tIjoiMjAyNi0wOC0xNCIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX0seyJmb3JlbGRlciI6Ik1PUiIsImtvbnRvVHlwZSI6IkZFTExFU1BFUklPREUiLCJmcmEiOiIyMDI2LTA4LTE3IiwidG9tIjoiMjAyNi0xMS0wNiIsImZsZXJiYXJuc2RhZ2VyIjpmYWxzZX0seyJmb3JlbGRlciI6Ik1PUiIsImZyYSI6IjIwMjYtMTEtMDkiLCJ0b20iOiIyMDI2LTEyLTA0IiwidXRzZXR0ZWxzZcOAcnNhayI6IkxPVkJFU1RFTVRfRkVSSUUiLCJmbGVyYmFybnNkYWdlciI6ZmFsc2V9LHsiZm9yZWxkZXIiOiJGQVJfTUVETU9SIiwia29udG9UeXBlIjoiRkVEUkVLVk9URSIsImZyYSI6IjIwMjYtMTItMDciLCJ0b20iOiIyMDI3LTAyLTE5IiwiZmxlcmJhcm5zZGFnZXIiOmZhbHNlfSx7ImZyYSI6IjIwMjctMDItMjIiLCJ0b20iOiIyMDI3LTAzLTE5Iiwia29udG9UeXBlIjoiRkVMTEVTUEVSSU9ERSIsIm1vcnNBa3Rpdml0ZXQiOiJBUkJFSUQiLCJmb3JlbGRlciI6IkZBUl9NRURNT1IiLCJmbGVyYmFybnNkYWdlciI6ZmFsc2V9XX0=';
            
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
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 2: OM_BARNET - verify pre-filled dates
            await waitFor(() => expect(screen.getAllByText('Barnet')).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            const fødselsdato = utils.getByDisplayValue('04.05.2026');
            expect(fødselsdato).toBeInTheDocument();
            const termindato = utils.getByDisplayValue('01.05.2026');
            expect(termindato).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 3: BO_I_UTLANDET
            await waitFor(() => expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
            await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 4: ARBEIDSFORHOLD_OG_INNTEKT
            await waitFor(() => expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
            const neiRadios = screen.getAllByText('Nei');
            await userEvent.click(neiRadios[0]!);
            await userEvent.click(neiRadios[1]!);
            await userEvent.click(neiRadios[2]!);
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 5: DEN_ANDRE_FORELDEREN
            await waitFor(() => expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2));
            expect(screen.getByText('Steg 5 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Jeg kan ikke oppgi den andre forelderen'));
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 6: PERIODE_MED_FORELDREPENGER - verify 100% pre-selected
            await waitFor(() => expect(screen.getAllByText('Periode med foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 6 av 9')).toBeInTheDocument();
            expect(screen.getByDisplayValue('100')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 7: UTTAKSPLAN (FORDELING hidden)
            await waitFor(() => expect(screen.getAllByText('Din plan med foreldrepenger')).toHaveLength(2));
            expect(screen.getByText('Steg 7 av 9')).toBeInTheDocument();
            expect(screen.getByText('13.04.2026')).toBeInTheDocument();
            expect(screen.getByText('04.05.2026')).toBeInTheDocument();
            expect(screen.getByText('17.08.2026')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            // Step 8: OPPSUMMERING
            await waitFor(() => expect(screen.getAllByText('Oppsummering')).toHaveLength(2));
            expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
        }),
    );
});
