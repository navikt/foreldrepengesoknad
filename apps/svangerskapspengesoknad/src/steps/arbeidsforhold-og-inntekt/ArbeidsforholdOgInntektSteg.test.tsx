import { composeStories } from '@storybook/react-vite';
import { renderHook, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataMap, ContextDataType, SvpDataContext, useContextComplete } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { EksternArbeidsforholdDto_fpoversikt, FRILANS_ID } from '@navikt/fp-types';
import { IntlProvider, uiMessages } from '@navikt/fp-ui';

import nbMessages from '../../intl/nb_NO.json';
import { ArbeidsforholdOgInntektSteg } from './ArbeidsforholdOgInntektSteg';
import * as stories from './ArbeidsforholdOgInntektSteg.stories';

const { Default, MedFrilansoppdrag } = composeStories(stories);

describe('<ArbeidsforholdOgInntektSteg>', () => {
    beforeEach(() => {
        // jsdom implementerer ikke scrollIntoView, og komponenten kaller denne når ny inntektskilde legges til.
        HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    const egenNæringFraInntektsstepper = {
        navnPåNæringen: 'Fiskebåten',
        næringstype: 'FISKE',
        fom: '2024-01-01',
        registrertINorge: true,
        organisasjonsnummer: '998877665',
    } as const;

    it('skal vise frilansoppdrag', async () => {
        await MedFrilansoppdrag.run();

        expect(await screen.findByText('Mine frilansoppdrag')).toBeInTheDocument();
    });

    it('skal gå til neste steg når informasjon er korrekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Default.run({
            args: { ...Default.args, gåTilNesteSide, mellomlagreSøknadOgNaviger },
        });

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        expect(screen.queryByRole('radio', { name: 'Etterlønn eller sluttvederlag' })).not.toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: 'Førstegangstjeneste' })).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('radio', { name: 'Jobb i utlandet' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.selectOptions(screen.getByLabelText('Hvilket land har du jobbet i?'), 'SWE');
        await userEvent.type(screen.getByLabelText('Hva er navnet på arbeidsgiveren?'), 'Svensk arbeidsgiver');
        await userEvent.click(
            within(screen.getByRole('radiogroup', { name: 'Jobber du der nå?' })).getByRole('radio', {
                name: 'Ja',
            }),
        );
        await userEvent.type(screen.getByLabelText('Fra'), '01.01.2024');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                arbeidIUtlandet: [
                    {
                        arbeidsgiverNavn: 'Svensk arbeidsgiver',
                        fom: '2024-01-01',
                        land: 'SWE',
                        pågående: true,
                        tom: undefined,
                        type: 'JOBB_I_UTLANDET',
                    },
                ],
            },
            key: ContextDataType.ARBEID_I_UTLANDET,
            type: 'update',
        });

        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: {
                harHattArbeidIUtlandet: true,
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: true,
            },
            key: ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: undefined,
            key: ContextDataType.FRILANS,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(4, {
            data: SøknadRoute.NÆRING,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal hoppe over eget SN-steg når næringen er ferdig utfylt via Legg til inntekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Default.run({
            args: {
                ...Default.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
                egenNæring: egenNæringFraInntektsstepper,
                registrerteNæringer: [],
            },
        });

        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        await waitFor(() => expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce());
        expect(gåTilNesteSide).not.toHaveBeenCalledWith(
            expect.objectContaining({
                data: SøknadRoute.NÆRING,
                key: ContextDataType.APP_ROUTE,
            }),
        );
    });

    describe('opprydding når frilans fjernes etter at arbeid er valgt', () => {
        const lagVedlegg = (id: string) => [
            {
                id,
                file: new File(['skjema'], `${id}.pdf`, { type: 'application/pdf' }),
                filename: `${id}.pdf`,
                filesize: 6,
                pending: false,
                uploaded: true,
                innsendingsType: 'LASTET_OPP' as const,
                skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                type: AttachmentType.TILRETTELEGGING,
            },
        ];

        const lagArbeidsforhold = (id: string, navn: string): EksternArbeidsforholdDto_fpoversikt => ({
            arbeidsgiverId: id,
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: navn,
            fom: '2025-01-01',
            stillingsprosent: 100,
        });

        const renderSteg = (arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[], valgteArbeidsforhold: string[]) => {
            const initialState: ContextDataMap = {
                [ContextDataType.OM_BARNET]: { erBarnetFødt: false, fødselsdato: undefined, termindato: '2026-12-01' },
                [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                    harHattArbeidIUtlandet: false,
                    harJobbetSomFrilans: true,
                    harJobbetSomSelvstendigNæringsdrivende: false,
                },
                [ContextDataType.VALGTE_ARBEIDSFORHOLD]: valgteArbeidsforhold,
                [ContextDataType.TILRETTELEGGINGER_VEDLEGG]: Object.fromEntries(
                    valgteArbeidsforhold.map((id) => [id, lagVedlegg(id)]),
                ),
            };
            return renderHook(() => useContextComplete(), {
                wrapper: ({ children }: { children: ReactNode }) => (
                    <IntlProvider
                        locale="nb"
                        messagesGroupedByLocale={{ nb: { ...nbMessages, ...uiMessages.nb, ...formHookMessages.nb } }}
                    >
                        <MemoryRouter initialEntries={[SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT]}>
                            <SvpDataContext initialState={initialState}>
                                <ArbeidsforholdOgInntektSteg
                                    søkerInfo={{
                                        arbeidsforhold,
                                        fnr: '12345678901',
                                        fødselsdato: '1990-01-01',
                                        kjønn: 'K',
                                        navn: { fornavn: 'Kari', etternavn: 'Nordmann' },
                                        frilansoppdrag: [],
                                        selvstendigNæring: [],
                                    }}
                                    mellomlagreSøknadOgNaviger={vi.fn()}
                                    avbrytSøknad={vi.fn()}
                                />
                                {children}
                            </SvpDataContext>
                        </MemoryRouter>
                    </IntlProvider>
                ),
            });
        };

        it('skal nullstille valgte arbeidsforhold og fjerne frilans-vedlegg når kun ett arbeid gjenstår', async () => {
            const arbeidsgiverId = '975326209';
            const { result } = renderSteg(
                [lagArbeidsforhold(arbeidsgiverId, 'Sykehuset i Vestfold')],
                [arbeidsgiverId, FRILANS_ID],
            );

            await userEvent.click(await screen.findByRole('button', { name: 'Neste steg' }));

            await waitFor(() =>
                expect(result.current[ContextDataType.APP_ROUTE]).toBe(`${SøknadRoute.SKJEMA}/${arbeidsgiverId}`),
            );
            expect(result.current[ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]?.harJobbetSomFrilans).toBe(false);
            expect(result.current[ContextDataType.VALGTE_ARBEIDSFORHOLD]).toBeUndefined();
            expect(Object.keys(result.current[ContextDataType.TILRETTELEGGINGER_VEDLEGG] ?? {})).toEqual([
                arbeidsgiverId,
            ]);
        });

        it('skal fjerne frilans fra valgte arbeidsforhold når flere arbeid gjenstår', async () => {
            const { result } = renderSteg(
                [
                    lagArbeidsforhold('975326209', 'Sykehuset i Vestfold'),
                    lagArbeidsforhold('990322244', 'Omsorgspartner'),
                ],
                ['975326209', '990322244', FRILANS_ID],
            );

            await userEvent.click(await screen.findByRole('button', { name: 'Neste steg' }));

            await waitFor(() => expect(result.current[ContextDataType.APP_ROUTE]).toBe(SøknadRoute.VELG_ARBEID));
            expect(result.current[ContextDataType.VALGTE_ARBEIDSFORHOLD]).toEqual(['975326209', '990322244']);
            expect(Object.keys(result.current[ContextDataType.TILRETTELEGGINGER_VEDLEGG] ?? {})).toEqual([
                '975326209',
                '990322244',
            ]);
        });
    });
});
