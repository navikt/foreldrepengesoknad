import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import MockDate from 'mockdate';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './TidslinjePage.stories';

const {
    FPAdopsjon,
    FPTerminInnvilget,
    FPMedTilbakekreving,
    FPEtterlysIM,
    FPForTidligSøknad,
    FPManglerDokumentasjon,
    FPNySøknad,
    SVPInnvilget,
    SVPUnderBehandling,
    ESAdopsjonAvslag,
    ESAdopsjonInnvilget,
    ESUnderBehandling,
} = composeStories(stories);

describe('<TidslinjePage>', () => {
    it(
        'FP - Adopsjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPAdopsjon.parameters.msw);
            const { container } = render(<FPAdopsjon />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 4, completed: 2, uncompleted: 2 });
            verifiserTeksterIKronologiskRekkefølge([
                /barnet ble adoptert/i,
                /du søkte om foreldrepenger/i,
                /du vil få et svar på søknaden din/i,
                /3 år siden adopsjonsdato/i,
            ]);
            verifiserTeksterIKronologiskRekkefølge([
                /25. november 2025/i,
                /27. november 2025 kl 01:00/i,
                /senere/i,
                /25. nov. 2028/i,
            ]);
        }),
    );

    it(
        'FP- Termin innvilget',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPTerminInnvilget.parameters.msw);
            const { container } = render(<FPTerminInnvilget />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 5, completed: 5, uncompleted: 0 });
            verifiserTeksterIKronologiskRekkefølge([
                /termindato/i,
                /du søkte om foreldrepenger/i,
                /nav har sendt deg brev fordi vi mangler inntektsmelding/i,
                /nav mottok inntektsmelding/i,
                /søknaden din ble innvilget/i,
            ]);
        }),
    );

    it(
        'FP - Med tilbakekreving',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPMedTilbakekreving.parameters.msw);
            const { container } = render(<FPMedTilbakekreving />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 6, completed: 6, uncompleted: 0 });
            verifiserTeksterIKronologiskRekkefølge([
                /barnet ble født/i,
                /du søkte om foreldrepenger/i,
                /nav mottok inntektsmelding/i,
                /søknaden din ble innvilget/i,
                /du har fått et svar på søknaden din/i,
                /nav har sendt deg varsel om tilbakebetaling/i,
            ]);
        }),
    );

    it(
        'FP - Etterlys IM',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPEtterlysIM.parameters.msw);
            const { container } = render(<FPEtterlysIM />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 5, completed: 2, uncompleted: 3 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om foreldrepenger/i,
                /nav har sendt deg brev fordi vi mangler inntektsmelding/i,
                /arbeidsgiver skal sende inntektsmelding til nav/i,
                /Du vil få et svar på søknaden din/i,
                /termindato/i,
            ]);
        }),
    );

    it(
        'FP - For tidlig søknad',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPForTidligSøknad.parameters.msw);
            const { container } = render(<FPForTidligSøknad />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 4, completed: 1, uncompleted: 3 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om foreldrepenger/i,
                /vi kan tidligst behandle søknaden din 05.01.2026/i,
                /Du vil få et svar på søknaden din/i,
                /termindato/i,
            ]);
        }),
    );

    it(
        'FP - Mangler dokumentasjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPManglerDokumentasjon.parameters.msw);
            const { container } = render(<FPManglerDokumentasjon />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 4, completed: 1, uncompleted: 3 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om foreldrepenger/i,
                /du må sende inn dokumentasjon/i,
                /Du vil få et svar på søknaden din/i,
                /termindato/i,
            ]);

            // Verify manglende vedlegg list items
            const terminbekreftelse = screen.getByText(/Terminbekreftelse/i);
            expect(terminbekreftelse).toBeInTheDocument();
            expect(terminbekreftelse.closest('.aksel-list__item')).toBeInTheDocument();

            const dokumentasjonStudier = screen.getByText(/Dokumentasjon på at mor studerer på heltid/i);
            expect(dokumentasjonStudier).toBeInTheDocument();
            expect(dokumentasjonStudier.closest('.aksel-list__item')).toBeInTheDocument();

            // Verify button with link
            const button = screen.getByRole('button', { name: /Last opp dokumentasjon/i });
            expect(button).toBeInTheDocument();
            expect(button).toHaveAttribute('href', expect.stringContaining('/ettersend'));
        }),
    );

    it(
        'FP - Ny søknad',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPNySøknad.parameters.msw);
            const { container } = render(<FPNySøknad />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 5, completed: 2, uncompleted: 3 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om foreldrepenger/i,
                /du sendte en ny søknad/i,
                /du må sende inn dokumentasjon/i,
                /Du vil få et svar på søknaden din/i,
                /termindato/i,
            ]);
        }),
    );

    it(
        'SVP - Innvilget',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(SVPInnvilget.parameters.msw);
            const { container } = render(<SVPInnvilget />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 5, completed: 4, uncompleted: 1 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om svangerskapspenger/i,
                /søknaden din ble innvilget/i,
                /termindato/i,
            ]);

            // NOTE: Disse skulle ideelt vært testet i verifiserTeksterIKronologiskRekkefølge,
            // men å utvide funksjonen til å støtte duplikater som også skal være kronologisk forkludret veldig.
            // Siden det bare gjelder denne testen gjør vi heller et unntak.
            expect(screen.getAllByText(/nav mottok inntektsmelding/i)).toHaveLength(2);
        }),
    );

    it(
        'SVP - Under behandling',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(SVPUnderBehandling.parameters.msw);
            const { container } = render(<SVPUnderBehandling />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 1, uncompleted: 2 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om svangerskapspenger/i,
                /du vil få et svar på søknaden din/i,
                /termindato/i,
            ]);

            screen.getByText('Du sendte 4 dokumenter').click();
            expect(screen.getByText('Søknad om svangerskapspenger')).toBeInTheDocument();
            expect(screen.getAllByText(/skjema for tilrettelegging og omplassering ved graviditet/i)).toHaveLength(3);
        }),
    );

    it(
        'ES - adopsjon innvilget',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ESAdopsjonInnvilget.parameters.msw);
            const { container } = render(<ESAdopsjonInnvilget />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 2, uncompleted: 1 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om engangsstønad/i,
                /søknaden din ble innvilget/i,
                /barnet blir adoptert/i,
            ]);
        }),
    );

    it(
        'ES - adopsjon innvilget - senere dato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ESAdopsjonInnvilget.parameters.msw);
            const { container } = render(<ESAdopsjonInnvilget mockDate={new Date('2025-12-31').getTime()} />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 3, uncompleted: 0 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om engangsstønad/i,
                /søknaden din ble innvilget/i,
                /barnet ble adoptert/i,
            ]);
        }),
    );

    it(
        'ES - adopsjon avslag',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ESAdopsjonAvslag.parameters.msw);
            const { container } = render(<ESAdopsjonAvslag />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 2, uncompleted: 1 });
            verifiserTeksterIKronologiskRekkefølge([
                /du søkte om engangsstønad/i,
                /søknaden din ble avslått/i,
                /barnet blir adoptert/i,
            ]);
        }),
    );

    it(
        'ES - under behandling',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ESUnderBehandling.parameters.msw);
            const { container } = render(<ESUnderBehandling />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 2, uncompleted: 1 });
            verifiserTeksterIKronologiskRekkefølge([
                /barnet ble født/i,
                /du søkte om engangsstønad/i,
                /du vil få et svar på søknaden din/i,
            ]);
        }),
    );
});

/**
 * Util funksjon for å sjekke rekkefølge til DOM elementer utifra tekst.
 * Laget av ChatGPT
 */
const verifiserTeksterIKronologiskRekkefølge = (tekster: Array<string | RegExp>) => {
    const elements = tekster.map((tekst) => screen.getByText(tekst));

    // Verify all texts are in the document
    elements.forEach((element) => {
        expect(element).toBeInTheDocument();
    });

    // Verify chronological order by comparing DOM positions
    for (let i = 0; i < elements.length - 1; i++) {
        const currentElement = elements[i];
        const nextElement = elements[i + 1];

        if (!currentElement || !nextElement) {
            continue;
        }

        // compareDocumentPosition returns a bitmask
        // DOCUMENT_POSITION_FOLLOWING (4) means the next element comes after the current one
        const position = currentElement.compareDocumentPosition(nextElement);

        expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
};

const verifiserHendelseStatus = ({
    container,
    antall,
    completed,
    uncompleted,
}: {
    container: HTMLElement;
    antall: number;
    completed: number;
    uncompleted: number;
}) => {
    expect(container.querySelectorAll('.aksel-process__event')).toHaveLength(antall);
    expect(container.querySelectorAll('[data-status="completed"]')).toHaveLength(completed);
    expect(container.querySelectorAll('[data-status="uncompleted"]')).toHaveLength(uncompleted);
};
