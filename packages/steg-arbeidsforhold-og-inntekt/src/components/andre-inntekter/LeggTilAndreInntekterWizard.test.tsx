import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { IntlProvider } from 'react-intl';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { uiMessages } from '@navikt/fp-ui';

import nbMessages from '../../intl/messages/nb_NO.json';
import { LeggTilAndreInntekterWizard } from './LeggTilAndreInntekterWizard';

interface RenderWizardProps {
    appOrigin?: ComponentProps<typeof LeggTilAndreInntekterWizard>['appOrigin'];
    harRegistrertNæring?: ComponentProps<typeof LeggTilAndreInntekterWizard>['harRegistrertNæring'];
    harEgenNæring?: ComponentProps<typeof LeggTilAndreInntekterWizard>['harEgenNæring'];
    onSaveAndreInntekt?: ComponentProps<typeof LeggTilAndreInntekterWizard>['onSaveAndreInntekt'];
    onSaveEgenNæring?: ComponentProps<typeof LeggTilAndreInntekterWizard>['onSaveEgenNæring'];
}

const renderWizard = (props: RenderWizardProps = {}) =>
    render(
        <IntlProvider
            locale="nb"
            messages={{ ...formHookMessages.nb, ...egenNæringMessages.nb, ...uiMessages.nb, ...nbMessages }}
        >
            <LeggTilAndreInntekterWizard appOrigin="foreldrepengesoknad" {...props} />
        </IntlProvider>,
    );

describe('<LeggTilAndreInntekterWizard>', () => {
    it('skal navigere eksplisitt og avbryte wizarden', async () => {
        renderWizard();

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));

        expect(screen.queryByRole('button', { name: 'Tilbake' })).not.toBeInTheDocument();
        const neste = screen.getByRole('button', { name: 'Fortsett' });
        expect(neste).toBeDisabled();

        await userEvent.click(screen.getByText('Jeg er fisker eller mannskap på båt'));

        expect(screen.getByText('Hvilken type inntekt har du hatt?')).toBeInTheDocument();
        expect(neste).toBeEnabled();

        await userEvent.click(neste);

        expect(screen.getByText('Hvilken ordning har du som fisker eller mannskap?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Tilbake' })).toBeInTheDocument();
        expect(screen.queryByText('Inntekt fra lott')).not.toBeInTheDocument();

        const nesteFiskersteg = screen.getByRole('button', { name: 'Fortsett' });
        expect(nesteFiskersteg).toBeDisabled();

        await userEvent.click(screen.getByRole('radio', { name: 'Lott' }));

        expect(screen.queryByText('Inntekt fra lott')).not.toBeInTheDocument();
        expect(nesteFiskersteg).toBeEnabled();

        await userEvent.click(nesteFiskersteg);

        expect(screen.getByText('Inntekt fra lott')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Legg til' })).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Tilbake' }));

        expect(screen.getByText('Hvilken ordning har du som fisker eller mannskap?')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Lott' })).toBeChecked();

        await userEvent.click(screen.getByRole('button', { name: 'Tilbake' }));

        expect(screen.getByText('Hvilken type inntekt har du hatt?')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: /Jeg er fisker eller mannskap på båt/ })).toBeChecked();

        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(screen.getByRole('button', { name: 'Legg til inntekt' })).toBeInTheDocument();
    });

    it.each([
        ['Lott', 'Inntekt fra lott', true],
        ['Hyre', 'Du må be arbeidsgiver må registrere deg som arbeidstaker', false],
        ['Lott og hyre', 'Inntekt fra lott og hyre', true],
        ['Egen båt', 'Fiske med egen båt', true],
    ])('skal vise riktig informasjonssteg for %s', async (radioLabel, expectedText, skalViseEgenNæring) => {
        renderWizard();

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(
            screen.getByRole('radio', {
                name: /Jeg er fisker eller mannskap på båt/,
            }),
        );
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.click(screen.getByRole('radio', { name: radioLabel }));

        expect(screen.queryByText(expectedText)).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        expect(screen.getByText(expectedText)).toBeInTheDocument();
        expect(screen.queryByText('Hvilken type næring har du hatt?')).not.toBeInTheDocument();
        expect(screen.queryByText('Hva heter virksomheten? (valgfritt)') !== null).toBe(skalViseEgenNæring);
        expect(screen.getByRole('button', { name: 'Legg til' }).hasAttribute('disabled')).toBe(!skalViseEgenNæring);
    });

    it('skal validere og lagre annen inntekt før wizarden avsluttes', async () => {
        const onSaveAndreInntekt = vi.fn();
        renderWizard({ onSaveAndreInntekt });

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.click(screen.getByRole('radio', { name: 'Etterlønn eller sluttvederlag' }));

        expect(screen.queryByLabelText('Perioden den gjelder fra')).not.toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));
        expect(onSaveAndreInntekt).not.toHaveBeenCalled();
        expect(screen.getAllByText('Du må oppgi perioden den gjelder fra').length).toBeGreaterThan(0);

        await userEvent.type(screen.getByLabelText('Perioden den gjelder fra'), '01.01.2024');
        await userEvent.type(screen.getByLabelText('Til'), '31.01.2024');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onSaveAndreInntekt).toHaveBeenCalledWith({
            type: 'ETTERLØNN_SLUTTPAKKE',
            fom: '2024-01-01',
            tom: '2024-01-31',
        });
        expect(screen.getByRole('button', { name: 'Legg til inntekt' })).toBeInTheDocument();
    });

    it('skal gå direkte til annen pensjonsgivende inntekt når næring finnes i registeret', async () => {
        renderWizard({ harRegistrertNæring: true });

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));

        expect(
            screen.getByRole('radiogroup', {
                name: 'Hvilken annen type pensjonsgivende inntekt har du hatt de siste 10 månedene?',
            }),
        ).toBeInTheDocument();
        expect(screen.queryByText('Hvilken type inntekt har du hatt?')).not.toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: /ektefelles næring/ })).not.toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: /fisker eller mannskap/ })).not.toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: 'Næring i utlandet' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Tilbake' })).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(screen.getByRole('button', { name: 'Legg til inntekt' })).toBeInTheDocument();
    });

    it('skal skjule valg som kan opprette ny egen næring når egen næring allerede er lagt til', async () => {
        renderWizard({ harEgenNæring: true });

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));

        expect(screen.queryByRole('radio', { name: /ektefelles næring/ })).not.toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: /fisker eller mannskap/ })).not.toBeInTheDocument();
        expect(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ })).toBeInTheDocument();

        await userEvent.click(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        expect(screen.queryByRole('radio', { name: 'Næring i utlandet' })).not.toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Jobb i utlandet' })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Etterlønn eller sluttvederlag' })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Førstegangstjeneste' })).toBeInTheDocument();
    });

    it('skal vise skjema for næring i utlandet', async () => {
        const onSaveEgenNæring = vi.fn();
        renderWizard({ onSaveEgenNæring });

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        const inntektstyper = screen.getAllByRole('radio');
        expect(inntektstyper.map((radio) => radio.nextElementSibling?.textContent)).toEqual([
            'Jobb i utlandet',
            'Næring i utlandet',
            'Etterlønn eller sluttvederlag',
            'Førstegangstjeneste',
        ]);

        await userEvent.click(screen.getByRole('radio', { name: 'Næring i utlandet' }));

        expect(screen.queryByText('I hvilket land er virksomheten din registrert i?')).not.toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        expect(screen.queryByText('Er virksomheten registrert i Norge?')).not.toBeInTheDocument();
        expect(screen.getByText('I hvilket land er virksomheten din registrert i?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Tilbake' })).toBeInTheDocument();

        await userEvent.click(screen.getByRole('radio', { name: 'Annet' }));
        await userEvent.type(screen.getByLabelText('Hva heter virksomheten?'), 'Svensk virksomhet');
        await userEvent.selectOptions(screen.getByLabelText('I hvilket land er virksomheten din registrert i?'), 'SE');
        await userEvent.type(screen.getByLabelText('Når startet du virksomheten?'), '30.04.2023');
        await userEvent.click(
            within(screen.getByRole('radiogroup', { name: 'Jobber du der fortsatt?' })).getByRole('radio', {
                name: 'Ja',
            }),
        );
        await userEvent.type(
            screen.getByLabelText('Hva var næringsresultatet ditt før skatt de siste 12 månedene?'),
            '1000',
        );
        await userEvent.click(
            within(
                screen.getByRole('radiogroup', {
                    name: 'Har du vært yrkesaktiv i mindre enn tre år?',
                }),
            ).getByRole('radio', { name: 'Nei' }),
        );
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onSaveEgenNæring).toHaveBeenCalledWith(
            expect.objectContaining({
                næringstype: 'ANNEN',
                registrertINorge: false,
                registrertILand: 'SE',
            }),
        );
        expect(screen.getByRole('button', { name: 'Legg til inntekt' })).toBeInTheDocument();
    });

    it('skal skjule etterlønn og førstegangstjeneste for svangerskapspengesøknaden', async () => {
        renderWizard({ appOrigin: 'svangerskapspengesoknad' });

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));

        expect(screen.getByRole('radio', { name: 'Annen pensjonsgivende inntekt' })).toBeVisible();
        expect(screen.getByText('Arbeid i utlandet')).toBeVisible();
        expect(screen.queryByText('Etterlønn eller sluttvederlag')).not.toBeInTheDocument();
        expect(screen.queryByText('Førstegangstjeneste')).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        expect(screen.getByRole('radio', { name: 'Jobb i utlandet' })).toBeVisible();
        expect(screen.getByRole('radio', { name: 'Næring i utlandet' })).toBeVisible();
        expect(screen.queryByRole('radio', { name: 'Etterlønn eller sluttvederlag' })).not.toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: 'Førstegangstjeneste' })).not.toBeInTheDocument();
    });

    it('skal lagre fisker som EGEN_NÆRING', async () => {
        const onSaveEgenNæring = vi.fn();
        renderWizard({ onSaveEgenNæring });

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(screen.getByRole('radio', { name: /Jeg er fisker eller mannskap på båt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.click(screen.getByRole('radio', { name: 'Lott' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        expect(screen.queryByText('Er virksomheten registrert i Norge?')).not.toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Når startet du virksomheten?'), '30.04.2023');
        await userEvent.click(
            within(screen.getByRole('radiogroup', { name: 'Jobber du der fortsatt?' })).getByRole('radio', {
                name: 'Ja',
            }),
        );
        await userEvent.type(
            screen.getByLabelText('Hva var næringsresultatet ditt før skatt de siste 12 månedene?'),
            '1000',
        );
        await userEvent.click(
            within(
                screen.getByRole('radiogroup', {
                    name: 'Har du vært yrkesaktiv i mindre enn tre år?',
                }),
            ).getByRole('radio', { name: 'Nei' }),
        );
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onSaveEgenNæring).toHaveBeenCalledWith(
            expect.objectContaining({
                næringstype: 'FISKE',
                fom: '2023-04-30',
                næringsinntekt: '1000',
                registrertINorge: true,
            }),
        );
        expect(screen.getByRole('button', { name: 'Legg til inntekt' })).toBeInTheDocument();
    });
});
