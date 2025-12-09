import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';

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
            verifiserHendelseStatus({ container, antall: 4, completed: 2 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/barnet ble adoptert/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/du vil få et svar på søknaden din/i)).toBeInTheDocument();
            expect(within(timelineEvents[3]!).getByText(/3 år siden adopsjonsdato/i)).toBeInTheDocument();

            const timelineDatoer = container.querySelectorAll<HTMLElement>('.aksel-process__timestamp');
            expect(within(timelineDatoer[0]!).getByText(/25. november 2025/i)).toBeInTheDocument();
            expect(within(timelineDatoer[1]!).getByText(/27. november 2025 kl 01:00/i)).toBeInTheDocument();
            expect(within(timelineDatoer[2]!).getByText(/senere/i)).toBeInTheDocument();
            expect(within(timelineDatoer[3]!).getByText(/25. nov. 2028/i)).toBeInTheDocument();
        }),
    );

    it(
        'FP - Adopsjon - visHeleTidslinjen=false',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPAdopsjon.parameters.msw);
            const { container } = render(<FPAdopsjon visHeleTidslinjen={false} />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 2 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/barnet ble adoptert/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/du vil få et svar på søknaden din/i)).toBeInTheDocument();
        }),
    );

    it(
        'FP- Termin innvilget',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPTerminInnvilget.parameters.msw);
            const { container } = render(<FPTerminInnvilget />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 5, completed: 5 });

            const items = screen.getAllByRole('listitem');
            expect(within(items[0]!).getByText(/termindato/i)).toBeInTheDocument();
            expect(within(items[1]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(
                within(items[2]!).getByText(/nav har sendt deg brev fordi vi mangler inntektsmelding/i),
            ).toBeInTheDocument();
            expect(within(items[3]!).getByText(/nav mottok inntektsmelding/i)).toBeInTheDocument();
            expect(within(items[4]!).getByText(/søknaden din ble innvilget/i)).toBeInTheDocument();
        }),
    );

    it(
        'FP - Med tilbakekreving',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPMedTilbakekreving.parameters.msw);
            const { container } = render(<FPMedTilbakekreving />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 6, completed: 6 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/barnet ble født/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/nav mottok inntektsmelding/i)).toBeInTheDocument();
            expect(within(timelineEvents[3]!).getByText(/søknaden din ble innvilget/i)).toBeInTheDocument();
            expect(within(timelineEvents[4]!).getByText(/du har fått et svar på søknaden din/i)).toBeInTheDocument();
            expect(
                within(timelineEvents[5]!).getByText(/nav har sendt deg varsel om tilbakebetaling/i),
            ).toBeInTheDocument();
        }),
    );

    it(
        'FP - Med tilbakekreving - visHeleTidslinjen=false',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPMedTilbakekreving.parameters.msw);
            const { container } = render(<FPMedTilbakekreving visHeleTidslinjen={false} />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 3 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/søknaden din ble innvilget/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du har fått et svar på søknaden din/i)).toBeInTheDocument();
            expect(
                within(timelineEvents[2]!).getByText(/nav har sendt deg varsel om tilbakebetaling/i),
            ).toBeInTheDocument();
        }),
    );

    it(
        'FP - Etterlys IM',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPEtterlysIM.parameters.msw);
            const { container } = render(<FPEtterlysIM />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 5, completed: 2 });

            const items = screen.getAllByRole('listitem');
            expect(within(items[0]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(
                within(items[1]!).getByText(/nav har sendt deg brev fordi vi mangler inntektsmelding/i),
            ).toBeInTheDocument();
            expect(within(items[2]!).getByText(/arbeidsgiver skal sende inntektsmelding til nav/i)).toBeInTheDocument();
            expect(within(items[3]!).getByText(/Du vil få et svar på søknaden din/i)).toBeInTheDocument();
            expect(within(items[4]!).getByText(/termindato/i)).toBeInTheDocument();
        }),
    );

    it(
        'FP - For tidlig søknad',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPForTidligSøknad.parameters.msw);
            const { container } = render(<FPForTidligSøknad />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 4, completed: 1 });

            const items = screen.getAllByRole('listitem');
            expect(within(items[0]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(
                within(items[1]!).getByText(/vi kan tidligst behandle søknaden din 05.01.2026/i),
            ).toBeInTheDocument();
            expect(within(items[2]!).getByText(/Du vil få et svar på søknaden din/i)).toBeInTheDocument();
            expect(within(items[3]!).getByText(/termindato/i)).toBeInTheDocument();
        }),
    );

    it(
        'FP - Mangler dokumentasjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPManglerDokumentasjon.parameters.msw);
            const { container } = render(<FPManglerDokumentasjon />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 4, completed: 1 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du må sende inn dokumentasjon/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/Du vil få et svar på søknaden din/i)).toBeInTheDocument();
            expect(within(timelineEvents[3]!).getByText(/termindato/i)).toBeInTheDocument();

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
        'FP - Mangler dokumentasjon - visHeleTidslinjen=false',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPManglerDokumentasjon.parameters.msw);
            const { container } = render(<FPManglerDokumentasjon visHeleTidslinjen={false} />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 1 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du må sende inn dokumentasjon/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/Du vil få et svar på søknaden din/i)).toBeInTheDocument();
        }),
    );

    it(
        'FP - Ny søknad',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPNySøknad.parameters.msw);
            const { container } = render(<FPNySøknad />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 5, completed: 2 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/du søkte om foreldrepenger/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du sendte en ny søknad/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/du må sende inn dokumentasjon/i)).toBeInTheDocument();
            expect(within(timelineEvents[3]!).getByText(/Du vil få et svar på søknaden din/i)).toBeInTheDocument();
            expect(within(timelineEvents[4]!).getByText(/termindato/i)).toBeInTheDocument();
        }),
    );

    it(
        'SVP - Innvilget',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(SVPInnvilget.parameters.msw);
            const { container } = render(<SVPInnvilget />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 5, completed: 4 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/du søkte om svangerskapspenger/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/nav mottok inntektsmelding/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/nav mottok inntektsmelding/i)).toBeInTheDocument();
            expect(within(timelineEvents[3]!).getByText(/søknaden din ble innvilget/i)).toBeInTheDocument();
            expect(within(timelineEvents[4]!).getByText(/termindato/i)).toBeInTheDocument();
        }),
    );

    it(
        'SVP - Under behandling',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(SVPUnderBehandling.parameters.msw);
            const { container } = render(<SVPUnderBehandling />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 1 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/du søkte om svangerskapspenger/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du vil få et svar på søknaden din/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/termindato/i)).toBeInTheDocument();

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
            verifiserHendelseStatus({ container, antall: 3, completed: 2 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/du søkte om engangsstønad/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/søknaden din ble innvilget/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/barnet blir adoptert/i)).toBeInTheDocument();
        }),
    );

    it(
        'ES - adopsjon innvilget - senere dato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ESAdopsjonInnvilget.parameters.msw);
            const { container } = render(<ESAdopsjonInnvilget mockDate={new Date('2025-12-31').getTime()} />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 3 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/du søkte om engangsstønad/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/søknaden din ble innvilget/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/barnet ble adoptert/i)).toBeInTheDocument();
        }),
    );

    it(
        'ES - adopsjon avslag',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ESAdopsjonAvslag.parameters.msw);
            const { container } = render(<ESAdopsjonAvslag />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 2 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/du søkte om engangsstønad/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/søknaden din ble avslått/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/barnet blir adoptert/i)).toBeInTheDocument();
        }),
    );

    it(
        'ES - under behandling',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ESUnderBehandling.parameters.msw);
            const { container } = render(<ESUnderBehandling />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 2 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/barnet ble født/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du søkte om engangsstønad/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/du vil få et svar på søknaden din/i)).toBeInTheDocument();
        }),
    );

    it(
        'ES - under behandling - visHeleTidslinjen=false',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ESUnderBehandling.parameters.msw);
            const { container } = render(<ESUnderBehandling visHeleTidslinjen={false} />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 3, completed: 2 });

            const timelineEvents = container.querySelectorAll<HTMLElement>('.aksel-process__event');
            expect(within(timelineEvents[0]!).getByText(/barnet ble født/i)).toBeInTheDocument();
            expect(within(timelineEvents[1]!).getByText(/du søkte om engangsstønad/i)).toBeInTheDocument();
            expect(within(timelineEvents[2]!).getByText(/du vil få et svar på søknaden din/i)).toBeInTheDocument();
        }),
    );
});

const verifiserHendelseStatus = ({
    container,
    antall,
    completed,
}: {
    container: HTMLElement;
    antall: number;
    completed: number;
}) => {
    expect(container.querySelectorAll<HTMLElement>('.aksel-process__event')).toHaveLength(antall);
    expect(container.querySelectorAll<HTMLElement>('[data-status="completed"]')).toHaveLength(completed);
    expect(container.querySelectorAll<HTMLElement>('[data-status="uncompleted"]')).toHaveLength(antall - completed);
};
