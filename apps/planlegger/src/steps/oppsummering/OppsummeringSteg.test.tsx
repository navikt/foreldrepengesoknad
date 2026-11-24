import { composeStories, composeStory } from '@storybook/react-vite';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { getLenker } from '@navikt/fp-utils';

import * as stories from './OppsummeringSteg.stories';

const {
    KunMorHarRett,
    FlereForsørgereHundreProsentTermin,
    FlereForsørgereHundreProsentAdopsjon,
    AleneforsørgerMorErUfør,
    FarOgFarFødsel,
    FarOgFarAdopsjonKunFar1HarRett,
    HarIkkeRett,
    OppsummeringFarOgFarKunFar2HarRett,
    MorOgFarKunFarHarRett,
    AleneforsørgerÅttiProsentFødselToBarn,
} = composeStories(stories);

describe('<OppsummeringSteg>', () => {
    it('skal vise info der det er flere forsørgere og ingen har rett til foreldrepenger', async () => {
        render(<HarIkkeRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Ingen av dere har rett til foreldrepenger')).toBeInTheDocument();

        expect(
            screen.getByText('Basert på svarene deres har ingen av dere rett på foreldrepenger.'),
        ).toBeInTheDocument();
    });

    it('skal vise info der det er flere forsørgere og begge har rett til foreldrepenger - fødsel', async () => {
        render(<FlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Både Klara og Espen har jobbet minst 6 av de siste 10 månedene, og har tjent 68 275 kr eller mer det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde og fordeling')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Dere valgte 100 % foreldrepenger i 49 uker og fordeler fellesperioden med 5 uker til Klara og 11 uker til Espen.',
            ),
        ).toBeInTheDocument();

        const søknadUrl = new URL(screen.getByRole<HTMLAnchorElement>('link', { name: 'Send digitalt' }).href);
        expect(`${søknadUrl.origin}${søknadUrl.pathname}`).toBe(`${getLenker().foreldrepengesoknad}/`);
        expect(søknadUrl.searchParams.get('planleggerData')).toBeTruthy();
    });

    it('skal vise info der det er flere forsørgere og begge har rett til foreldrepenger - adopsjon', async () => {
        render(<FlereForsørgereHundreProsentAdopsjon />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(
            screen.getByText('Barnet skal adopteres med omsorgsovertakelse 10. okt. 2024 og ble født 10. juli 2024.'),
        ).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Både Klara og Esther har jobbet minst 6 av de siste 10 månedene, og har tjent 68 275 kr eller mer det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde og fordeling')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Dere valgte 100 % foreldrepenger i 49 uker og fordeler fellesperioden med 5 uker til Klara og 11 uker til Esther.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise en periode ved fødsel far og far', async () => {
        render(<FarOgFarFødsel />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dere valgte 100 % i 40 uker.')).toBeInTheDocument();
        expect(screen.getByText(/Periode:/)).toBeInTheDocument();
        expect(screen.getByText(/25. nov. 2024 – 31. jan. 2025/)).toBeInTheDocument();
    });

    it('skal vise perioder for begge fedrene ved adopsjon far og far', async () => {
        render(<FarOgFarAdopsjonKunFar1HarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Periode:')).toBeInTheDocument();
        expect(screen.getByText('14. okt. 2024 – 18. juli 2025')).toBeInTheDocument();
        expect(screen.getByText('Dine foreldrepenger uten aktivitetskrav')).toBeInTheDocument();
    });

    it('skal vise info der det er flere forsørgere og kun mor har rett til foreldrepenger', async () => {
        render(<KunMorHarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Klara har jobbet minst 6 av de siste 10 månedene og tjent 68 275 kr eller mer det siste året.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Espen har ikke jobbet minst 6 av de siste 10 månedene og tjent 68 275 kr eller mer det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % foreldrepenger i 49 uker.')).toBeInTheDocument();
    });

    it('skal vise at mor som er ufør aleneforsørger ikke har rett på foreldrepenger', async () => {
        render(<AleneforsørgerMorErUfør />);
        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Du har ikke rett til foreldrepenger')).toBeInTheDocument();
    });

    it('skal vise info for far og far, kun far 2 har rett', async () => {
        render(<OppsummeringFarOgFarKunFar2HarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Barnet har termin 24. okt. 2024.')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Espen har ikke jobbet minst 6 av de siste 10 månedene og tjent 68 275 kr eller mer det siste året.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Hugo har jobbet minst 6 av de siste 10 månedene og tjent 68 275 kr eller mer det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % foreldrepenger i 46 uker.')).toBeInTheDocument();

        expect(screen.getByText('Dere valgte 100 % i 46 uker.')).toBeInTheDocument();
        expect(screen.getByText('24. okt. 2024 – 10. sep. 2025')).toBeInTheDocument();
    });
    it('skal vise info om hvor mye-steget der det er flere forsørgere og begge har rett til foreldrepenger - fødsel', async () => {
        render(<FlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getAllByText('Hvor mye?')).toHaveLength(2);
        expect(
            screen.getByText(
                'Klara vil få rundt 2 308 kr per dag hvis dere velger 100 % foreldrepenger eller 1 846 kr per dag med 80 %.',
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                'Espen vil få rundt 3 151 kr per dag hvis dere velger 100 % foreldrepenger eller 2 521 kr per dag med 80 %.',
            ),
        ).toBeInTheDocument();
    });

    it('skal ikke vise info om hvor mye-steget lønn ikke er oppgitt for noen av foreldrene', async () => {
        render(<FlereForsørgereHundreProsentTermin hvorMye={{}} />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        // Sjekk at ExpansionCard med "Hvor mye?" ikke finnes
        const hvorMyeExpansionCard = screen.queryByRole('heading', { name: 'Hvor mye?' });
        expect(hvorMyeExpansionCard).not.toBeInTheDocument();
    });

    it('skal vise info om barnehage - fødsel', async () => {
        render(<FlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mye?')).toHaveLength(2);
        expect(screen.getAllByText('Barnehageplass')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();
    });
    it('skal ikke vise info om barnehage –\u{A0}adopsjon', async () => {
        render(<FarOgFarAdopsjonKunFar1HarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mye?')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.queryByText('Barnehageplass')).not.toBeInTheDocument();
    });
    it('skal kun vise fars uttak i hvor mye-steget, der det er mor og far, men kun far rett til foreldrepenger', async () => {
        render(<MorOgFarKunFarHarRett />);
        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        const hvorMyeHeading = screen.getAllByText('Hvor mye?')[0]!;
        const expansionCard = hvorMyeHeading.closest('.navds-expansioncard');
        if (expansionCard) {
            const vismerButton = expansionCard.querySelector('button[aria-expanded="false"]');
            if (vismerButton) {
                await userEvent.click(vismerButton);
            }
        }
        expect(
            screen.getByText(
                'Espen vil få rundt 46 kr per dag hvis dere velger 100 % foreldrepenger eller 37 kr per dag med 80 %.',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Klara vil få rundt')).not.toBeInTheDocument();
    });

    it('Skal vise "du" og ikke fornavn når søker er aleneforsørger', async () => {
        render(<AleneforsørgerÅttiProsentFødselToBarn />);
        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        const hvorMyeHeading = screen.getAllByText('Dette svarte du')[0]!;
        const expansionCard = hvorMyeHeading.closest('.navds-expansioncard');
        if (expansionCard) {
            const vismerButton = expansionCard.querySelector('button[aria-expanded="false"]');
            if (vismerButton) {
                await userEvent.click(vismerButton);
            }
        }
        expect(
            screen.getByText(
                'Du vil få rundt 3 151 kr per dag hvis du velger 100 % foreldrepenger eller 2 521 kr per dag med 80 %.',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Klara vil få rundt')).not.toBeInTheDocument();
    });

    describe('Skyra-undersøkelse', () => {
        const SURVEY_SLUG = 'arbeids-og-velferdsetaten-nav/planlegg-foreldrepenger-inline';

        const settSamtykke = (surveys: boolean) =>
            vi.stubGlobal('webStorageController', {
                getCurrentConsent: () => ({ consent: { analytics: surveys, surveys } }),
            });

        // Skyra-scriptet registrerer elementet når det lastes. Registreringen kan ikke angres,
        // så testen for ulastet script må kjøre før de andre.
        const lastSkyraScript = () => {
            if (!customElements.get('skyra-survey')) {
                customElements.define('skyra-survey', class extends HTMLElement {});
            }
        };

        const renderOppsummering = async (locale: 'nb' | 'nn' | 'en' = 'nb') => {
            const Story = composeStory({ ...stories.FlereForsørgereHundreProsentTermin }, stories.default, {
                initialGlobals: { locale },
            });
            const result = render(<Story />);
            expect(await screen.findAllByText(locale === 'en' ? 'Summary' : 'Oppsummering')).toHaveLength(2);
            return result;
        };

        const sendSkyraHendelse = (type: string) =>
            act(() => {
                document.querySelector('skyra-survey')?.dispatchEvent(new CustomEvent(type, { bubbles: true }));
            });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('skal ikke vise lasting før Skyra-scriptet er lastet, og vise undersøkelsen når det er lastet', async () => {
            settSamtykke(true);
            await renderOppsummering();

            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
            expect(document.querySelector('skyra-survey')).not.toBeInTheDocument();

            lastSkyraScript();

            expect(await screen.findByText('Frivillig spørreundersøkelse')).toBeInTheDocument();
        });

        it('skal ikke vise undersøkelsen uten samtykke, og følge samtykkeendringer', async () => {
            lastSkyraScript();
            settSamtykke(false);
            await renderOppsummering();

            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
            expect(document.querySelector('skyra-survey')).not.toBeInTheDocument();

            act(() => {
                dispatchEvent(new CustomEvent('consentAllWebStorage'));
            });
            expect(screen.getByText('Frivillig spørreundersøkelse')).toBeInTheDocument();

            act(() => {
                dispatchEvent(new CustomEvent('refuseOptionalWebStorage'));
            });
            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
            expect(document.querySelector('skyra-survey')).not.toBeInTheDocument();
        });

        it('skal vise undersøkelsen når dekoratøren lastes etter siden', async () => {
            lastSkyraScript();
            await renderOppsummering();
            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();

            settSamtykke(true);

            expect(await screen.findByText('Frivillig spørreundersøkelse')).toBeInTheDocument();
        });

        it('skal vise undersøkelsen når Skyra sender skyra-ready', async () => {
            lastSkyraScript();
            settSamtykke(true);
            await renderOppsummering();

            const element = document.querySelector<HTMLElement>('skyra-survey');
            expect(element?.style.opacity).toBe('0');
            expect(element?.getAttribute('slug')).toBe(SURVEY_SLUG);

            sendSkyraHendelse('skyra-ready');

            expect(document.querySelector<HTMLElement>('skyra-survey')?.style.opacity).toBe('1');
        });

        it('skal skjule undersøkelsen når Skyra sender skyra-unavailable', async () => {
            lastSkyraScript();
            settSamtykke(true);
            await renderOppsummering();
            expect(screen.getByText('Frivillig spørreundersøkelse')).toBeInTheDocument();

            sendSkyraHendelse('skyra-unavailable');

            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
        });

        it('skal vise feilmelding når Skyra sender skyra-error', async () => {
            lastSkyraScript();
            settSamtykke(true);
            await renderOppsummering();

            sendSkyraHendelse('skyra-error');

            expect(screen.getByText('Kunne ikke laste undersøkelsen.')).toBeInTheDocument();
            expect(document.querySelector('skyra-survey')).not.toBeInTheDocument();
        });

        it('skal laste undersøkelsen på nytt når samtykke gis igjen etter skyra-unavailable', async () => {
            lastSkyraScript();
            settSamtykke(true);
            await renderOppsummering();

            sendSkyraHendelse('skyra-unavailable');
            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();

            act(() => {
                dispatchEvent(new CustomEvent('refuseOptionalWebStorage'));
            });
            act(() => {
                dispatchEvent(new CustomEvent('consentAllWebStorage'));
            });

            expect(screen.getByText('Frivillig spørreundersøkelse')).toBeInTheDocument();
            expect(document.querySelector('skyra-survey')).toBeInTheDocument();
        });

        it('skal lese samtykket på nytt når dekoratøren lastes før effekten kjører', async () => {
            lastSkyraScript();
            // Første kall skjer under render, før dekoratøren har lastet samtykket.
            const getCurrentConsent = vi
                .fn()
                .mockReturnValueOnce({ consent: { analytics: false, surveys: false } })
                .mockReturnValue({ consent: { analytics: true, surveys: true } });
            vi.stubGlobal('webStorageController', { getCurrentConsent });

            await renderOppsummering();

            expect(await screen.findByText('Frivillig spørreundersøkelse')).toBeInTheDocument();
        });

        it('skal vise Skyra-undersøkelse for nynorsk', async () => {
            lastSkyraScript();
            settSamtykke(true);
            await renderOppsummering('nn');

            expect(screen.getByText('Frivillig spørjeundersøking')).toBeInTheDocument();
        });

        it('skal ikke vise Skyra-undersøkelse for engelsk', async () => {
            lastSkyraScript();
            settSamtykke(true);
            await renderOppsummering('en');

            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
            expect(screen.queryByText('Frivillig spørjeundersøking')).not.toBeInTheDocument();
            expect(screen.queryByText('Optional survey')).not.toBeInTheDocument();
        });

        it('skal takke og melde av lytteren når riktig undersøkelse er fullført', async () => {
            lastSkyraScript();
            settSamtykke(true);
            const callbacks = new Map<string, (event: { slug: string }) => void>();
            const off = vi.fn();
            vi.stubGlobal('skyra', {
                on: vi.fn((event: string, callback: (event: { slug: string }) => void) => {
                    callbacks.set(event, callback);
                }),
                off,
            });
            const { unmount } = await renderOppsummering();

            act(() => {
                callbacks.get('surveyCompleted')?.({ slug: 'en-annen-undersokelse' });
            });
            expect(screen.queryByText('Takk for at du svarte på undersøkelsen')).not.toBeInTheDocument();

            act(() => {
                callbacks.get('surveyCompleted')?.({ slug: SURVEY_SLUG });
            });
            expect(screen.getByText('Takk for at du svarte på undersøkelsen')).toBeInTheDocument();
            expect(Object.keys(sessionStorage).some((key) => key.includes('skyra'))).toBe(false);

            unmount();
            expect(off).toHaveBeenCalledWith('surveyCompleted', callbacks.get('surveyCompleted'));
        });
    });
});
