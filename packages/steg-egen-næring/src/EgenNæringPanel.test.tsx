import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { IntlProvider } from 'react-intl';

import { Button } from '@navikt/ds-react';

import { formHookMessages } from '@navikt/fp-form-hooks';

import { EgenNæringForm } from './EgenNæringPanel';
import * as stories from './EgenNæringPanel.stories';
import nbMessages from './intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<Arbeid som selvstendig næringsdrivende>', () => {
    it('skal forhåndsvelge en redigerbar næringstype', async () => {
        render(
            <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...nbMessages }}>
                <EgenNæringForm
                    initialNæringstype="ANNEN"
                    appOrigin="foreldrepengesoknad"
                    onSubmit={vi.fn()}
                    withoutFormElement
                />
            </IntlProvider>,
        );

        expect(screen.getByRole('radio', { name: 'Annet' })).toBeChecked();

        await userEvent.click(screen.getByRole('radio', { name: 'Gårdsdrift' }));

        expect(screen.getByRole('radio', { name: 'Gårdsdrift' })).toBeChecked();
    });

    it('skal prioritere mellomlagret næringstype over foreslått næringstype', () => {
        render(
            <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...nbMessages }}>
                <EgenNæringForm
                    initialNæringstype="ANNEN"
                    egenNæring={{
                        fom: '2023-04-30',
                        næringstype: 'JORDBRUK_SKOGBRUK',
                        registrertINorge: true,
                    }}
                    appOrigin="foreldrepengesoknad"
                    onSubmit={vi.fn()}
                    withoutFormElement
                />
            </IntlProvider>,
        );

        expect(screen.getByRole('radio', { name: 'Gårdsdrift' })).toBeChecked();
    });

    it('skal skjule forhåndsvalgt fiske som virksomhetstype', () => {
        const { container } = render(
            <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...nbMessages }}>
                <EgenNæringForm
                    initialNæringstype="FISKE"
                    appOrigin="foreldrepengesoknad"
                    onSubmit={vi.fn()}
                    withoutFormElement
                />
            </IntlProvider>,
        );

        expect(screen.queryByRole('radiogroup', { name: 'Hvilken type næring har du hatt?' })).not.toBeInTheDocument();
        expect(container.querySelector('input[type="hidden"][name="næringstype"]')).toHaveValue('FISKE');
    });

    it('skal vise og låse navn, organisasjonsnummer og type fra registeret', () => {
        const { container } = render(
            <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...nbMessages }}>
                <EgenNæringForm
                    registrertNæring={{
                        navn: 'Kari Konsulent',
                        organisasjonsnummer: '998877665',
                        næringstype: 'JORDBRUK_SKOGBRUK',
                    }}
                    appOrigin="foreldrepengesoknad"
                    onSubmit={vi.fn()}
                    withoutFormElement
                />
            </IntlProvider>,
        );

        expect(screen.getByText('Opplysninger fra Brønnøysundregistrene')).toBeInTheDocument();
        expect(screen.getByText('Kari Konsulent')).toBeInTheDocument();
        expect(screen.getByText('Organisasjonsnummer: 998877665')).toBeInTheDocument();
        expect(screen.queryByText('Hvilken type næring har du hatt?')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Hva heter virksomheten?')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Hva er organisasjonsnummeret?')).not.toBeInTheDocument();
        expect(container.querySelector('input[type="hidden"][name="næringstype"]')).toHaveValue('JORDBRUK_SKOGBRUK');
        expect(container.querySelector('input[type="hidden"][name="navnPåNæringen"]')).toHaveValue('Kari Konsulent');
        expect(container.querySelector('input[type="hidden"][name="organisasjonsnummer"]')).toHaveValue('998877665');
    });

    it('skal forklare at svarene gjelder samlet når flere næringer er registrert', () => {
        render(
            <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...nbMessages }}>
                <EgenNæringForm
                    registrertNæring={{
                        navn: 'Prioritert Fiskeri',
                        organisasjonsnummer: '998877665',
                        næringstype: 'FISKE',
                    }}
                    registrerteNæringer={[
                        {
                            navn: 'Prioritert Fiskeri',
                            organisasjonsnummer: '998877665',
                            næringstype: 'FISKE',
                        },
                        {
                            navn: 'Gårdsdriften',
                            organisasjonsnummer: '887766554',
                            næringstype: 'JORDBRUK_SKOGBRUK',
                        },
                    ]}
                    appOrigin="foreldrepengesoknad"
                    onSubmit={vi.fn()}
                    withoutFormElement
                />
            </IntlProvider>,
        );

        expect(
            screen.getByText(
                'Svar samlet for alle næringene dine. Svarene blir knyttet til organisasjonsnummer 998877665.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Næringene dette gjelder' })).toBeInTheDocument();
    });

    it('skal vise mellomlagret ikke-fiske selv om foreslått type er fiske', () => {
        render(
            <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...nbMessages }}>
                <EgenNæringForm
                    initialNæringstype="FISKE"
                    egenNæring={{
                        fom: '2023-04-30',
                        næringstype: 'ANNEN',
                        registrertINorge: true,
                    }}
                    appOrigin="foreldrepengesoknad"
                    onSubmit={vi.fn()}
                    withoutFormElement
                />
            </IntlProvider>,
        );

        expect(screen.getByRole('radio', { name: 'Annet' })).toBeChecked();
    });

    it('skal låse næringstype til fiske i plugin-varianten', async () => {
        const onSubmit = vi.fn();

        render(
            <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...nbMessages }}>
                <EgenNæringForm
                    fixedNæringstype="FISKE"
                    egenNæring={{
                        fom: '2023-04-30',
                        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
                        navnPåNæringen: 'Fiskebåten',
                        næringsinntekt: 1000,
                        næringstype: 'ANNEN',
                        organisasjonsnummer: '997519485',
                        registrertINorge: true,
                    }}
                    appOrigin="foreldrepengesoknad"
                    onSubmit={onSubmit}
                    withoutFormElement
                    renderActions={(submitForm) => (
                        <Button type="button" onClick={() => void submitForm()}>
                            Legg til
                        </Button>
                    )}
                />
            </IntlProvider>,
        );

        expect(screen.queryByText('Hvilken type næring har du hatt?')).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                næringstype: 'FISKE',
            }),
        );
    });

    it('skal låse registrering til utlandet i plugin-varianten', async () => {
        const onSubmit = vi.fn();

        render(
            <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...nbMessages }}>
                <EgenNæringForm
                    fixedRegistrertINorge={false}
                    egenNæring={{
                        fom: '2023-04-30',
                        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
                        navnPåNæringen: 'Utenlandsk virksomhet',
                        næringsinntekt: 1000,
                        næringstype: 'ANNEN',
                        organisasjonsnummer: '997519485',
                        registrertILand: 'SE',
                        registrertINorge: true,
                    }}
                    appOrigin="foreldrepengesoknad"
                    onSubmit={onSubmit}
                    withoutFormElement
                    renderActions={(submitForm) => (
                        <Button type="button" onClick={() => void submitForm()}>
                            Legg til
                        </Button>
                    )}
                />
            </IntlProvider>,
        );

        expect(screen.queryByText('Er virksomheten registrert i Norge?')).not.toBeInTheDocument();
        expect(screen.getByText('I hvilket land er virksomheten din registrert i?')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                registrertILand: 'SE',
                registrertINorge: false,
            }),
        );
    });

    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvilken type næring har du hatt?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryAllByText('Du må oppgi type virksomhet du har.')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi navnet på virksomheten din')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi en startdato.')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi om virksomheten din er pågående.')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi næringsresultat de siste 12 månedene.')[0]).toBeInTheDocument();
        expect(
            screen.queryAllByText('Du må oppgi om du har begynt å jobbe i løpet av de 3 siste ferdigliknede årene.')[0],
        ).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        const saveOnNext = vi.fn();

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findByText('Hvilken type næring har du hatt?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Gårdsdrift'));

        const virksomhetsnavnInput = screen.getByLabelText('Hva heter virksomheten?');
        await userEvent.type(virksomhetsnavnInput, 'Virksomhetsnavn AS');

        expect(screen.queryByText('Er virksomheten registrert i Norge?')).not.toBeInTheDocument();

        const orgnummerInput = screen.getByLabelText('Hva er organisasjonsnummeret?');
        await userEvent.type(orgnummerInput, '997519485');

        const startdatoInput = screen.getByLabelText('Når startet du virksomheten?');
        await userEvent.type(startdatoInput, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        const næringsresultatInput = screen.getByLabelText(
            'Hva var næringsresultatet ditt før skatt de siste 12 månedene?',
        );
        await userEvent.type(næringsresultatInput, '1000');

        expect(screen.getByText('Har du vært yrkesaktiv i mindre enn tre år?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]!);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi organisasjonsnummer.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi næringsresultat de siste 12 månedene.')).not.toBeInTheDocument();

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            fom: '2023-04-30',
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
            navnPåNæringen: 'Virksomhetsnavn AS',
            næringsinntekt: '1000',
            næringstype: 'JORDBRUK_SKOGBRUK',
            organisasjonsnummer: '997519485',
            registrertINorge: true,
        });
    });

    it('skal ikke vise fiske som valg for selvstendig næring', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvilken type næring har du hatt?')).toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: 'Fiske' })).not.toBeInTheDocument();
    });

    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText('Når startet du virksomheten?')).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText('Når startet du virksomheten?');
        await userEvent.type(startdatoInput, 'ikemfke');
        await userEvent.tab();

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]!);

        expect(screen.getByText('Når avsluttet du virksomheten?')).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText('Når avsluttet du virksomheten?');
        await userEvent.type(sluttdatoInput, 'sjnkf');
        await userEvent.tab();

        expect(screen.getByText('Har du vært yrkesaktiv i mindre enn tre år?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(screen.getByText('Når ble du yrkesaktiv?')).toBeInTheDocument();
        const yrkesaktidDatoInput = screen.getByLabelText('Når ble du yrkesaktiv?');
        await userEvent.type(yrkesaktidDatoInput, 'sjnkf');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Startdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText('Sluttdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });

    it('skal skjule spørsmål om registreringsland i ordinært næringssteg', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvilken type næring har du hatt?')).toBeInTheDocument();
        expect(screen.queryByText('Er virksomheten registrert i Norge?')).not.toBeInTheDocument();
        expect(screen.queryByText('I hvilket land er virksomheten din registrert i?')).not.toBeInTheDocument();
    });

    it('skal vise feilmelding ved desimaltall i næringsinntekt etter varig endring', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvilken type næring har du hatt?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Gårdsdrift'));

        const virksomhetsnavnInput = screen.getByLabelText('Hva heter virksomheten?');
        await userEvent.type(virksomhetsnavnInput, 'Gården AS');

        const orgnummerInput = screen.getByLabelText('Hva er organisasjonsnummeret?');
        await userEvent.type(orgnummerInput, '997519485');

        const startdatoInput = screen.getByLabelText('Når startet du virksomheten?');
        await userEvent.type(startdatoInput, dayjs().subtract(5, 'year').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(
            screen.getByText(
                'Har du hatt en varig endring i virksomheten eller arbeidssituasjonen din de siste 4 årene?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const inntektInput = screen.getByLabelText('Hva var næringsinntekten din etter endringen?');
        await userEvent.type(inntektInput, '123.45');

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Inntekten din etter endring må være et tall i hele kroner.')[0],
        ).toBeInTheDocument();
    });

    it('skal avslutte søknad', async () => {
        const onAvsluttOgSlett = vi.fn();

        render(<Default onFortsettSenere={vi.fn()} onAvsluttOgSlett={onAvsluttOgSlett} />);

        expect(await screen.findByText('Hvilken type næring har du hatt?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Slett søknaden')[0]!);
        await userEvent.click(screen.getAllByText('Slett søknaden')[1]!);

        expect(onAvsluttOgSlett).toHaveBeenCalledTimes(1);
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<Default onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Barnet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'BARNET_PATH');
    });
});
