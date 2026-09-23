import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ComponentProps, useState } from 'react';

import { type Skjemautkast, SkjemautkastProvider } from '@navikt/fp-form-hooks';
import type { NæringDto } from '@navikt/fp-types';

import * as stories from './ArbeidsforholdOgInntektPanel.stories';

const {
    ForSvangerskapspenger,
    ForForeldrepenger,
    ForForeldrepengerMedAndreInntekter,
    ForForeldrepengerMedFrilansoppdrag,
    ForForeldrepengerMedSelvstendigNæring,
    HarIngenArbeidsforhold,
} = composeStories(stories);

const manueltLagtTilNæring = {
    navnPåNæringen: 'Fiskebåten',
    næringstype: 'FISKE',
    fom: '2023-01-01',
    næringsinntekt: 1000,
    registrertINorge: true,
    organisasjonsnummer: '998877665',
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
} satisfies NæringDto;

const renderMedUtkast = (props: ComponentProps<typeof ForForeldrepenger> = {}, lagretUtkast?: Skjemautkast) => {
    let mellomlagretUtkast = lagretUtkast;
    const onFortsettSenere = vi.fn();
    const innhold = <ForForeldrepenger {...props} onFortsettSenere={onFortsettSenere} />;
    const Side = () => {
        const [utkast, setUtkast] = useState(lagretUtkast);
        return (
            <SkjemautkastProvider
                route="/arbeidsforhold"
                utkast={utkast}
                lagre={(verdi) => {
                    mellomlagretUtkast = verdi ? JSON.parse(JSON.stringify(verdi)) : undefined;
                    setUtkast(verdi);
                }}
            >
                {innhold}
            </SkjemautkastProvider>
        );
    };
    return { ...render(<Side />), hentUtkast: () => mellomlagretUtkast, onFortsettSenere };
};

describe('<ArbeidsforholdOgInntektPanel>', () => {
    beforeEach(() => {
        // jsdom implementerer ikke scrollIntoView, og komponenten kaller denne når ny inntektskilde legges til.
        HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    it.each(['foreldrepengesoknad', 'svangerskapspengesoknad'] as const)(
        'skal lagre og gjenåpne ufullført jobb i utlandet fra sideknappen i %s',
        async (appOrigin) => {
            const saveOnNext = vi.fn();
            const saveAndreInntektskilder = vi.fn();
            const props = { appOrigin, saveOnNext, saveAndreInntektskilder };
            const side = renderMedUtkast(props);
            await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
            await userEvent.click(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ }));
            await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
            await userEvent.click(screen.getByRole('radio', { name: 'Jobb i utlandet' }));
            await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
            await userEvent.type(screen.getByLabelText('Hva er navnet på arbeidsgiveren?'), 'Ufullført arbeidsgiver');
            await userEvent.type(screen.getByLabelText('Fra'), '12.');
            await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
            await userEvent.click(screen.getByRole('button', { name: 'Ok' }));

            expect(side.onFortsettSenere).toHaveBeenCalledOnce();
            expect(saveAndreInntektskilder).not.toHaveBeenCalled();
            expect(saveOnNext).not.toHaveBeenCalled();
            const utkast = side.hentUtkast();
            side.unmount();
            renderMedUtkast(props, utkast);

            expect(screen.getByLabelText('Hva er navnet på arbeidsgiveren?')).toHaveValue('Ufullført arbeidsgiver');
            expect(screen.getByLabelText('Fra')).toHaveValue('12.');
            expect(document.querySelectorAll('form')).toHaveLength(1);
            await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));
            expect(saveOnNext).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));
            expect(saveAndreInntektskilder).not.toHaveBeenCalled();
            expect(screen.getAllByText('Du må oppgi hvilket land du har jobbet i').length).toBeGreaterThan(0);
        },
    );

    it.each(['egen næring', 'fisker', 'næring i utlandet'] as const)(
        'skal gjenåpne ufullført %s og slette utkastet ved avbrudd',
        async (gren) => {
            const saveEgenNæring = vi.fn();
            const saveOnNext = vi.fn();
            const props = { saveEgenNæring, saveOnNext };
            const side = renderMedUtkast(props);
            await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
            const valg = {
                'egen næring': /Jeg har jobbet i min ektefelles næring/,
                fisker: /Jeg er fisker eller mannskap på båt/,
                'næring i utlandet': /Annen pensjonsgivende inntekt/,
            };
            await userEvent.click(screen.getByRole('radio', { name: valg[gren] }));
            await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
            if (gren !== 'egen næring') {
                await userEvent.click(
                    screen.getByRole('radio', { name: gren === 'fisker' ? 'Lott' : 'Næring i utlandet' }),
                );
                await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
            }
            await userEvent.type(screen.getByRole('textbox', { name: /Hva heter virksomheten/ }), 'Ufullført næring');
            await userEvent.type(screen.getByLabelText('Når startet du virksomheten?'), '3.');
            await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
            await userEvent.click(screen.getByRole('button', { name: 'Ok' }));
            const utkast = side.hentUtkast();
            side.unmount();
            const gjenåpnetSide = renderMedUtkast(props, utkast);

            expect(screen.getByRole('textbox', { name: /Hva heter virksomheten/ })).toHaveValue('Ufullført næring');
            expect(screen.getByLabelText('Når startet du virksomheten?')).toHaveValue('3.');
            expect(document.querySelectorAll('form')).toHaveLength(1);
            await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));
            await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));
            expect(saveEgenNæring).not.toHaveBeenCalled();
            expect(saveOnNext).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }));
            expect(gjenåpnetSide.hentUtkast()).toBeUndefined();
            await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
            await userEvent.click(screen.getByRole('radio', { name: /Jeg har jobbet i min ektefelles næring/ }));
            await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
            expect(screen.getByRole('textbox', { name: /Hva heter virksomheten/ })).toHaveValue('');
        },
    );

    it('skal gjenåpne valgt fiskerordning før skjemasteget', async () => {
        const side = renderMedUtkast();
        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(screen.getByRole('radio', { name: /Jeg er fisker eller mannskap på båt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.click(screen.getByRole('radio', { name: 'Lott og hyre' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
        await userEvent.click(screen.getByRole('button', { name: 'Ok' }));
        const utkast = side.hentUtkast();
        side.unmount();
        renderMedUtkast({}, utkast);

        expect(screen.getByRole('radio', { name: 'Lott og hyre' })).toBeChecked();
        expect(screen.queryByRole('textbox', { name: /Hva heter virksomheten/ })).not.toBeInTheDocument();
    });

    it('skal fullføre et gjenåpnet utkast og kunne fjerne inntekten uten å gjenopprette utkastet', async () => {
        const saveAndreInntektskilder = vi.fn();
        const saveOnNext = vi.fn();
        const props = { saveAndreInntektskilder, saveOnNext };
        const side = renderMedUtkast(props);
        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.click(screen.getByRole('radio', { name: 'Etterlønn eller sluttvederlag' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.type(screen.getByLabelText('Perioden den gjelder fra'), '01.01.2024');
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
        await userEvent.click(screen.getByRole('button', { name: 'Ok' }));
        const utkast = side.hentUtkast();
        side.unmount();
        const gjenåpnetSide = renderMedUtkast(props, utkast);

        expect(screen.getByLabelText('Perioden den gjelder fra')).toHaveValue('01.01.2024');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));
        expect(saveAndreInntektskilder).not.toHaveBeenCalled();
        expect(gjenåpnetSide.hentUtkast()).toEqual(utkast);
        await userEvent.type(screen.getByLabelText('Til'), '31.01.2024');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));
        expect(saveAndreInntektskilder).toHaveBeenCalledWith([
            { type: 'ETTERLØNN_SLUTTPAKKE', fom: '2024-01-01', tom: '2024-01-31' },
        ]);
        expect(gjenåpnetSide.hentUtkast()).toBeUndefined();
        await userEvent.click(screen.getByRole('button', { name: /Fjern Etterlønn/ }));
        expect(saveAndreInntektskilder).toHaveBeenLastCalledWith([]);
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
        await userEvent.click(screen.getByRole('button', { name: 'Ok' }));
        expect(gjenåpnetSide.hentUtkast()).toBeUndefined();
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));
        expect(saveOnNext).toHaveBeenCalledOnce();
    });

    it('skal vise inntektswizard i stedet for spørsmål om arbeid i utlandet for svangerskapspenger', async () => {
        render(<ForSvangerskapspenger />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(screen.getByRole('button', { name: 'Legg til inntekt' })).toBeInTheDocument();
        expect(screen.queryByText('Har du jobbet i utlandet de siste 4 ukene?')).not.toBeInTheDocument();
        expect(screen.queryByText('Informasjon til deg som er fisker')).not.toBeInTheDocument();
    });

    it('skal vise og åpne wizard for andre inntekter', async () => {
        render(<ForForeldrepenger />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(screen.getByText('Legg til inntekt')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til inntekt'));

        expect(screen.getByText('Hvilken type inntekt har du hatt?')).toBeInTheDocument();
    });

    it('skal vise definisjoner av arbeidsforhold og inntekt i et lukket kort', async () => {
        render(<ForForeldrepenger />);

        await screen.findAllByText('Arbeidsforhold og inntekt');

        const card = screen.getByRole('region', {
            name: 'Hvordan defineres ulike typer arbeidsforhold og inntekt?',
        });
        const toggle = within(card).getByRole('button', { name: 'Vis mer' });

        expect(toggle).toHaveAttribute('aria-expanded', 'false');

        await userEvent.click(toggle);

        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('Hva er selvstendig næring?')).toBeVisible();
        expect(screen.getByText('Hva er frilans?')).toBeVisible();
        expect(screen.getByText('Hva er et ordinært arbeidsforhold?')).toBeVisible();
        expect(screen.getByText('Er du fisker eller mannskap på båt?')).toBeVisible();
        expect(screen.getByText('Har du hatt annen pensjonsgivende inntekt?')).toBeVisible();

        await userEvent.click(toggle);

        expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('skal vise informasjon om arbeidsgiverkontakt under arbeidsforholdene', async () => {
        render(<ForForeldrepengerMedFrilansoppdrag />);

        await screen.findAllByText('Arbeidsforhold og inntekt');

        const arbeidsgiverinfo = screen.getByRole('button', { name: 'Dine arbeidsgivere kontaktes av Nav' });
        const frilansoverskrift = screen.getByRole('heading', { name: 'Mine frilansoppdrag' });

        expect(
            arbeidsgiverinfo.compareDocumentPosition(frilansoverskrift) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
    });

    it('skal ikke vise informasjon om arbeidsgiverkontakt uten arbeidsforhold', async () => {
        render(<HarIngenArbeidsforhold />);

        await screen.findAllByText('Arbeidsforhold og inntekt');

        expect(screen.queryByText(/arbeidsgiver.*kontaktes av Nav/i)).not.toBeInTheDocument();
    });

    it('skal vise andre inntekter som en egen boks i sammendraget', async () => {
        render(<ForForeldrepengerMedAndreInntekter />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

        expect(screen.getByText('Legg til inntekt')).toBeInTheDocument();

        expect(screen.queryByText('Dine andre inntekter')).not.toBeInTheDocument();
        expect(screen.getByText('Jobb i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Københavns Kommune')).toBeInTheDocument();
    });

    it('skal fjerne en annen inntekt fra context-arrayet', async () => {
        const saveAndreInntektskilder = vi.fn();
        render(<ForForeldrepengerMedAndreInntekter saveAndreInntektskilder={saveAndreInntektskilder} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Fjern Jobb i utlandet' }));

        expect(saveAndreInntektskilder).toHaveBeenCalledWith([]);
        expect(screen.queryByRole('heading', { name: 'Jobb i utlandet' })).not.toBeInTheDocument();
    });

    it('skal appende en ny inntekt til eksisterende inntekter', async () => {
        const saveAndreInntektskilder = vi.fn();
        render(<ForForeldrepengerMedAndreInntekter saveAndreInntektskilder={saveAndreInntektskilder} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.click(screen.getByRole('radio', { name: 'Etterlønn eller sluttvederlag' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.type(screen.getByLabelText('Perioden den gjelder fra'), '01.01.2024');
        await userEvent.type(screen.getByLabelText('Til'), '31.01.2024');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(saveAndreInntektskilder).toHaveBeenCalledWith([
            expect.objectContaining({ type: 'JOBB_I_UTLANDET' }),
            {
                type: 'ETTERLØNN_SLUTTPAKKE',
                fom: '2024-01-01',
                tom: '2024-01-31',
            },
        ]);
    });

    it('skal vise selvstendig næring som en egen boks i sammendraget', async () => {
        render(<ForForeldrepengerMedSelvstendigNæring />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(screen.getByRole('heading', { name: 'Kari Konsulent' })).toBeInTheDocument();
        expect(screen.getByText('Selvstendig næringsdrivende')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Fjern Kari Konsulent/ })).not.toBeInTheDocument();
    });

    it('skal fjerne manuelt lagt til egen næring fra context', async () => {
        const saveEgenNæring = vi.fn();
        render(<ForForeldrepenger egenNæring={manueltLagtTilNæring} saveEgenNæring={saveEgenNæring} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Fjern Fiskebåten' }));

        expect(saveEgenNæring).toHaveBeenCalledWith(undefined);
        expect(screen.queryByRole('heading', { name: 'Fiskebåten' })).not.toBeInTheDocument();
    });

    it('skal ikke kunne fjerne egen næring når den kommer fra registeret', async () => {
        render(<ForForeldrepengerMedSelvstendigNæring egenNæring={manueltLagtTilNæring} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');

        expect(screen.queryByRole('button', { name: /Fjern/ })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Fiskebåten' })).not.toBeInTheDocument();
    });

    it('skal lagre selvstendig næringsdrivende når næring finnes i registeret', async () => {
        const saveOnNext = vi.fn();
        render(<ForForeldrepengerMedSelvstendigNæring saveOnNext={saveOnNext} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        expect(saveOnNext).toHaveBeenCalledWith(
            expect.objectContaining({
                harJobbetSomSelvstendigNæringsdrivende: true,
            }),
        );
    });

    it('skal lagre selvstendig næringsdrivende når næring er lagt til manuelt', async () => {
        const saveOnNext = vi.fn();
        render(<ForForeldrepenger egenNæring={manueltLagtTilNæring} saveOnNext={saveOnNext} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        expect(saveOnNext).toHaveBeenCalledWith(
            expect.objectContaining({
                harJobbetSomSelvstendigNæringsdrivende: true,
            }),
        );
    });

    it('skal lagre selvstendig næringsdrivende når registerdata lastes etter første render', async () => {
        const saveOnNext = vi.fn();
        const registrerteNæringer = [
            {
                organisasjonsnummer: '998877665',
                navn: 'Kari Konsulent',
                næringstype: 'ANNEN',
            },
        ] as const;
        const { rerender } = render(<ForForeldrepenger registrerteNæringer={[]} saveOnNext={saveOnNext} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        rerender(<ForForeldrepenger registrerteNæringer={[...registrerteNæringer]} saveOnNext={saveOnNext} />);
        await screen.findByText('Kari Konsulent');
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        expect(saveOnNext).toHaveBeenCalledWith(
            expect.objectContaining({
                harJobbetSomSelvstendigNæringsdrivende: true,
            }),
        );
    });

    it('skal hoppe over inntektstypesteget når selvstendig næring finnes i registeret', async () => {
        render(<ForForeldrepengerMedSelvstendigNæring />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));

        expect(
            screen.getByRole('radiogroup', {
                name: 'Hvilken annen type pensjonsgivende inntekt har du hatt de siste 10 månedene?',
            }),
        ).toBeInTheDocument();
        expect(screen.queryByText('Hvilken type inntekt har du hatt?')).not.toBeInTheDocument();
    });

    it('skal utlede at søker ikke har hatt arbeid i utlandet når ingen slik inntekt er lagt til', async () => {
        const saveOnNext = vi.fn();

        render(<ForSvangerskapspenger saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            harHattArbeidIUtlandet: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        });
    });

    it('skal la SVP-søker gå videre med arbeid i utlandet som eneste inntektskilde', async () => {
        render(
            <ForSvangerskapspenger
                aktiveArbeidsforhold={[]}
                andreInntektskilder={[
                    {
                        type: 'JOBB_I_UTLANDET',
                        arbeidsgiverNavn: 'Svensk arbeidsgiver',
                        land: 'SE',
                        fom: '2024-01-01',
                        pågående: true,
                    },
                ]}
            />,
        );

        expect(await screen.findByRole('button', { name: 'Neste steg' })).toBeInTheDocument();
        expect(
            screen.queryByText('Du kan ikke søke om svangerskapspenger siden du ikke har noen arbeidsforhold.'),
        ).not.toBeInTheDocument();
    });

    it('skal avslutte søknad', async () => {
        const onAvsluttOgSlett = vi.fn();

        render(<ForSvangerskapspenger onFortsettSenere={vi.fn()} onAvsluttOgSlett={onAvsluttOgSlett} />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Slett søknaden')[0]!);
        await userEvent.click(screen.getAllByText('Slett søknaden')[1]!);

        expect(onAvsluttOgSlett).toHaveBeenCalledTimes(1);
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<ForSvangerskapspenger onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Barnet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'BARNET_PATH');
    });
});
