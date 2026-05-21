import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './UttaksplanSteg.stories';

const infoTekst = [
    'I denne søknaden søker du kun for deg selv.',
    'Du kan legge inn foreldrepenger for den andre forelderen, men informasjonen vil ikke bli sendt inn.',
    'Den andre forelderen må selv huske å sende oss en søknad.',
].join(' ');

const { FødselMorOgFarBeggeHarRett, FødselMorOgFarBeggeHarRettAnnenPartTomtVedtak, FødselMorOgFarKunMorHarRett } =
    composeStories(stories);

describe('<UttaksplanSteg>', () => {
    it(
        'skal vise feilmelding når en sletter alle perioder og prøver å gå videre',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FødselMorOgFarBeggeHarRett.parameters.msw);

            render(
                <FødselMorOgFarBeggeHarRett
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            const juni = screen.getByTestId('year:2024;month:5');

            // Start redigeringsmodus
            await userEvent.click(within(juni).getByTestId('day:10;dayColor:BLUE'));

            // Lukk aksjonspanel for dag
            await userEvent.click(within(juni).getByTestId('day:10;dayColor:DARKBLUE'));

            await userEvent.click(screen.getAllByText('Du kan velge datoer i kalenderen')[0]!);

            await userEvent.click(screen.getByText('Fjern alt i planen'));

            expect(await screen.findByText('Ønsker du å fjerne alt som er lagt til?')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Fjern alt'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Du har ikke lagt til noen perioder i planen')).toBeInTheDocument();
        }),
    );

    it(
        'skal generere uttaksplan og gå videre når annen part har et vedtak med tomme perioder',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FødselMorOgFarBeggeHarRettAnnenPartTomtVedtak.parameters.msw);

            render(
                <FødselMorOgFarBeggeHarRettAnnenPartTomtVedtak
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            // Planen er lastet med perioder (ikke tom)
            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);
            expect(screen.queryByText('Du har ikke lagt til noen perioder i planen')).not.toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            // Ingen feilmelding om tom plan
            expect(screen.queryByText('Du har ikke lagt til noen perioder i planen')).not.toBeInTheDocument();

            // Uttaksplanen ble lagret med innhold
            const uttaksplanAction = gåTilNesteSide.mock.calls.find(
                ([action]) => action.key === ContextDataType.UTTAKSPLAN,
            );
            expect(uttaksplanAction).toBeDefined();
            expect((uttaksplanAction![0].data as unknown[]).length).toBeGreaterThan(0);
        }),
    );

    it(
        'skal kunne gå videre uten å endre planen når standardforslaget er gyldig',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FødselMorOgFarBeggeHarRett.parameters.msw);

            render(
                <FødselMorOgFarBeggeHarRett
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Neste steg'));

            // Valideringen skal ikke blokkere når standardforslaget har perioder
            expect(screen.queryByText('Du har ikke lagt til noen perioder i planen')).not.toBeInTheDocument();

            // Uttaksplanen ble lagret med innhold
            const uttaksplanAction = gåTilNesteSide.mock.calls.find(
                ([action]) => action.key === ContextDataType.UTTAKSPLAN,
            );
            expect(uttaksplanAction).toBeDefined();
            expect((uttaksplanAction![0].data as unknown[]).length).toBeGreaterThan(0);
        }),
    );

    it(
        'skal skjule info-teksten når annen forelder ikke har rett',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FødselMorOgFarKunMorHarRett.parameters.msw);

            render(<FødselMorOgFarKunMorHarRett />);

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);
            expect(screen.queryByText(infoTekst)).not.toBeInTheDocument();
        }),
    );

    it(
        'skal vise TilbakestillPlanModal og lukke uten endring ved avbryt',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FødselMorOgFarBeggeHarRett.parameters.msw);

            render(
                <FødselMorOgFarBeggeHarRett
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            // Gå til redigeringsmodus og ekspander mobilpanelet
            await userEvent.click(screen.getByText('Start redigering'));
            await userEvent.click(screen.getAllByText('Du kan velge datoer i kalenderen')[0]!);

            // Fjern alt for å aktivere 'Tilbakestill plan'-knappen
            await userEvent.click(screen.getByText('Fjern alt i planen'));
            expect(await screen.findByText('Ønsker du å fjerne alt som er lagt til?')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Fjern alt'));

            // Klikk på 'Tilbakestill plan'
            await userEvent.click(screen.getByRole('button', { name: 'Tilbakestill plan' }));
            expect(await screen.findByText('Ønsker du å tilbakestille planen?')).toBeInTheDocument();

            // Avbryt lukker modalen uten å tilbakestille
            await userEvent.click(screen.getByText('Avbryt'));

            // Tilbakestill-knappen er fortsatt aktiv (planen er ikke tilbakestilt)
            expect(screen.getByRole('button', { name: 'Tilbakestill plan' })).not.toBeDisabled();
        }),
    );

    it(
        'skal tilbakestille planen ved bekreftelse i TilbakestillPlanModal',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FødselMorOgFarBeggeHarRett.parameters.msw);

            render(
                <FødselMorOgFarBeggeHarRett
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            // Gå til redigeringsmodus og ekspander mobilpanelet
            await userEvent.click(screen.getByText('Start redigering'));
            await userEvent.click(screen.getAllByText('Du kan velge datoer i kalenderen')[0]!);

            // Fjern alt for å aktivere 'Tilbakestill plan'-knappen
            await userEvent.click(screen.getByText('Fjern alt i planen'));
            expect(await screen.findByText('Ønsker du å fjerne alt som er lagt til?')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Fjern alt'));

            // Klikk på 'Tilbakestill plan'
            await userEvent.click(screen.getByRole('button', { name: 'Tilbakestill plan' }));
            expect(await screen.findByText('Ønsker du å tilbakestille planen?')).toBeInTheDocument();

            // Bekreft tilbakestilling
            await userEvent.click(screen.getByRole('button', { name: 'Tilbakestill' }));

            // Tilbakestill-knappen er nå deaktivert (planen er tilbakestilt til standardforslaget)
            expect(screen.getByRole('button', { name: 'Tilbakestill plan' })).toBeDisabled();
        }),
    );

    // TODO (TOR) Denne skal slåast på igjen etter ein sluttar å filtrera vekk perioden til annen part fra forslaget til plan
    it.todo(
        'skal vise feilmelding når en prøver å gå videre med stjernemerkede perioder',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FødselMorOgFarBeggeHarRett.parameters.msw);

            render(
                <FødselMorOgFarBeggeHarRett
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(
                await screen.findAllByText('Du må fylle ut informasjon om mors aktivitet i de markerte periodene'),
            ).toHaveLength(2);
        }),
    );
});
