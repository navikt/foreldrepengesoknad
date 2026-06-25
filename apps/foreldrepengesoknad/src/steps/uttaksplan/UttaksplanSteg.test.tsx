import { composeStories } from '@storybook/react-vite';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';

import * as stories from './UttaksplanSteg.stories';

const infoTekst = [
    'I denne søknaden søker du kun for deg selv.',
    'Du kan legge inn foreldrepenger for den andre forelderen, men informasjonen vil ikke bli sendt inn.',
    'Den andre forelderen må selv huske å sende oss en søknad.',
].join(' ');

const {
    FødselMorOgFarBeggeHarRett,
    FødselMorOgFarBeggeHarRettAnnenPartTomtVedtak,
    FødselMorOgFarKunMorHarRett,
    FødselFarBeggeHarRettStarterPåTermin,
    NySøknadFørVedtakMedEksisterendeSak,
    FødselMorOgFarBeggeHarRettOverførtFraPlanlegger,
} = composeStories(stories);

describe('<UttaksplanSteg>', () => {
    it(
        'skal vise feilmelding når en sletter alle perioder og prøver å gå videre',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await FødselMorOgFarBeggeHarRett.run({
                args: {
                    ...FødselMorOgFarBeggeHarRett.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            const juni = screen.getByTestId('year:2024;month:5');

            // Start redigeringsmodus
            await userEvent.click(within(juni).getByTestId('day:10;dayColor:BLUE'));

            // Lukk aksjonspanel for dag
            await userEvent.click(within(juni).getByTestId('day:10;dayColor:DARKBLUE'));

            await userEvent.click(screen.getAllByText('Du kan velge datoer i kalenderen')[0]!);

            await userEvent.click(screen.getByText('Fjern alt'));

            expect(await screen.findByText('Ønsker du å fjerne alt som er lagt til?')).toBeInTheDocument();
            const modal = screen.getByRole('dialog');
            await userEvent.click(within(modal).getByText('Fjern alt'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Du har ikke lagt til noen perioder i planen')).toBeInTheDocument();
        },
    );

    it(
        'skal generere uttaksplan og gå videre når annen part har et vedtak med tomme perioder',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await FødselMorOgFarBeggeHarRettAnnenPartTomtVedtak.run({
                args: {
                    ...FødselMorOgFarBeggeHarRettAnnenPartTomtVedtak.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

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
        },
    );

    it(
        'skal kunne gå videre uten å endre planen når standardforslaget er gyldig',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await FødselMorOgFarBeggeHarRett.run({
                args: {
                    ...FødselMorOgFarBeggeHarRett.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

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
        },
    );

    it(
        'skal skjule info-teksten når annen forelder ikke har rett',
        async () => {
            await FødselMorOgFarKunMorHarRett.run();

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);
            expect(screen.queryByText(infoTekst)).not.toBeInTheDocument();
        },
    );

    it(
        'skal vise TilbakestillPlanModal og lukke uten endring ved avbryt',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await FødselMorOgFarBeggeHarRett.run({
                args: {
                    ...FødselMorOgFarBeggeHarRett.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            // Gå til redigeringsmodus og ekspander mobilpanelet
            await userEvent.click(screen.getByText('Start redigering'));
            await userEvent.click(screen.getAllByText('Du kan velge datoer i kalenderen')[0]!);

            // Fjern alt for å aktivere 'Tilbakestill plan'-knappen
            await userEvent.click(screen.getByText('Fjern alt'));
            expect(await screen.findByText('Ønsker du å fjerne alt som er lagt til?')).toBeInTheDocument();
            const fjernAltModal = screen.getByRole('dialog');
            await userEvent.click(within(fjernAltModal).getByText('Fjern alt'));

            // Klikk på 'Tilbakestill plan'
            await userEvent.click(screen.getByRole('button', { name: 'Tilbakestill plan' }));
            expect(await screen.findByText('Ønsker du å tilbakestille planen?')).toBeInTheDocument();

            // Avbryt lukker modalen uten å tilbakestille
            await userEvent.click(screen.getByText('Avbryt'));

            // Tilbakestill-knappen er fortsatt aktiv (planen er ikke tilbakestilt)
            expect(screen.getByRole('button', { name: 'Tilbakestill plan' })).not.toBeDisabled();
        },
    );

    it(
        'skal tilbakestille planen ved bekreftelse i TilbakestillPlanModal',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await FødselMorOgFarBeggeHarRett.run({
                args: {
                    ...FødselMorOgFarBeggeHarRett.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            // Gå til redigeringsmodus og ekspander mobilpanelet
            await userEvent.click(screen.getByText('Start redigering'));
            await userEvent.click(screen.getAllByText('Du kan velge datoer i kalenderen')[0]!);

            // Fjern alt for å aktivere 'Tilbakestill plan'-knappen
            await userEvent.click(screen.getByText('Fjern alt'));
            expect(await screen.findByText('Ønsker du å fjerne alt som er lagt til?')).toBeInTheDocument();
            const fjernAltModal2 = screen.getByRole('dialog');
            await userEvent.click(within(fjernAltModal2).getByText('Fjern alt'));

            // Klikk på 'Tilbakestill plan'
            await userEvent.click(screen.getByRole('button', { name: 'Tilbakestill plan' }));
            expect(await screen.findByText('Ønsker du å tilbakestille planen?')).toBeInTheDocument();

            // Bekreft tilbakestilling
            await userEvent.click(screen.getByRole('button', { name: 'Tilbakestill' }));

            // Tilbakestill-knappen er nå deaktivert (planen er tilbakestilt til standardforslaget)
            expect(screen.getByRole('button', { name: 'Tilbakestill plan' })).toBeDisabled();
        },
    );

    it(
        'TFP-6962: skal kunne gå videre med forhåndsutfylt plan fra eksisterende sak når det er en ny søknad (ikke endringssøknad)',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await NySøknadFørVedtakMedEksisterendeSak.run({
                args: {
                    ...NySøknadFørVedtakMedEksisterendeSak.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Neste steg'));

            // Skal IKKE blokkere med endringssøknad-feilmeldingen for en ny søknad
            expect(
                screen.queryByText('Du må gjøre en endring for å kunne søke om endring'),
            ).not.toBeInTheDocument();

            // Navigasjon til neste steg skal ha skjedd
            const navigasjonsAction = gåTilNesteSide.mock.calls.find(
                ([action]) => action.key === ContextDataType.APP_ROUTE,
            );
            expect(navigasjonsAction).toBeDefined();
        },
    );

    it(
        'TFP-6962: skal fortsatt vise endringssøknad-feilmelding når det faktisk er en endringssøknad uten nye perioder',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await NySøknadFørVedtakMedEksisterendeSak.run({
                args: {
                    ...NySøknadFørVedtakMedEksisterendeSak.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                    erEndringssøknad: true,
                },
            });

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(
                await screen.findByText('Du må gjøre en endring for å kunne søke om endring'),
            ).toBeInTheDocument();
        },
    );

    it(
        'skal hente opp den overførte planen frå planleggeren igjen med "Tilbakestill plan" etter "Fjern alt"',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await FødselMorOgFarBeggeHarRettOverførtFraPlanlegger.run({
                args: {
                    ...FødselMorOgFarBeggeHarRettOverførtFraPlanlegger.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

            // Den overførte planen er vist (ikkje tom)
            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            // Gå til redigeringsmodus og ekspander mobilpanelet
            await userEvent.click(screen.getByText('Start redigering'));
            await userEvent.click(screen.getAllByText('Du kan velge datoer i kalenderen')[0]!);

            // Den overførte planen er utgangspunktet, så "Tilbakestill plan" er deaktivert frå start
            expect(screen.getByRole('button', { name: 'Tilbakestill plan' })).toBeDisabled();

            // Fjern alt tømmer planen og aktiverer "Tilbakestill plan"
            await userEvent.click(screen.getByText('Fjern alt'));
            expect(await screen.findByText('Ønsker du å fjerne alt som er lagt til?')).toBeInTheDocument();
            const fjernAltModal = screen.getByRole('dialog');
            await userEvent.click(within(fjernAltModal).getByText('Fjern alt'));

            expect(screen.getByRole('button', { name: 'Tilbakestill plan' })).not.toBeDisabled();

            // Tilbakestill plan skal hente opp den overførte planen igjen
            await userEvent.click(screen.getByRole('button', { name: 'Tilbakestill plan' }));
            expect(await screen.findByText('Ønsker du å tilbakestille planen?')).toBeInTheDocument();
            await userEvent.click(screen.getByRole('button', { name: 'Tilbakestill' }));

            // Planen er tilbake til utgangspunktet, så "Tilbakestill plan" er deaktivert igjen
            expect(screen.getByRole('button', { name: 'Tilbakestill plan' })).toBeDisabled();
        },
    );

    // TODO (TOR) Denne skal slåast på igjen etter ein sluttar å filtrera vekk perioden til annen part fra forslaget til plan
    it.todo(
        'skal vise feilmelding når en prøver å gå videre med stjernemerkede perioder',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await FødselMorOgFarBeggeHarRett.run({
                args: {
                    ...FødselMorOgFarBeggeHarRett.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(
                await screen.findAllByText('Du må fylle ut informasjon om mors aktivitet i de markerte periodene'),
            ).toHaveLength(2);
        },
    );

    it(
        'skal kun vise to uker for far i forslaget når far med begge rett starter på termin',
        async () => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            await FødselFarBeggeHarRettStarterPåTermin.run({
                args: {
                    ...FødselFarBeggeHarRettStarterPåTermin.args,
                    gåTilNesteSide,
                    mellomlagreSøknadOgNaviger,
                },
            });

            expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);

            // Spørsmålet om automatisk justering skal stå fast med ein gong forslaget startar på termin,
            // utan at far/medmor må redigere planen i kalenderen eller lista først (TFP-7021).
            expect(
                screen.getByText(/ønsker du at vi endrer den til å starte fra fødselsdato/),
            ).toBeInTheDocument();

            // Far/medmor må svare på spørsmålet før dei kan gå vidare.
            await userEvent.click(screen.getByRole('radio', { name: 'Nei' }));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(screen.queryByText('Du har ikke lagt til noen perioder i planen')).not.toBeInTheDocument();

            const uttaksplanAction = gåTilNesteSide.mock.calls.find(
                ([action]) => action.key === ContextDataType.UTTAKSPLAN,
            );
            expect(uttaksplanAction).toBeDefined();

            const uttaksplan = uttaksplanAction![0].data as Array<{
                forelder: string;
                kontoType: string;
                fom: string;
                tom: string;
            }>;
            const farPerioder = uttaksplan.filter((p) => p.forelder === 'FAR_MEDMOR');

            // Forslaget skal kun inneholde de to ukene ved termin (10 uttaksdager), ikke gjenstående fedrekvote i fremtiden
            expect(farPerioder).toHaveLength(1);
            expect(farPerioder[0]!.kontoType).toBe('FEDREKVOTE');
            // Perioden skal starte på termindato (2024-07-01) og vare nøyaktig 10 uttaksdager (tom: 2024-07-12)
            expect(farPerioder[0]!.fom).toBe('2024-07-01');
            expect(farPerioder[0]!.tom).toBe('2024-07-12');
        },
    );
});
