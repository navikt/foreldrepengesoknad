import { composeStories } from '@storybook/react-vite';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataMap, ContextDataType, SvpDataContext, useContextComplete } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { TilOgMedDatoType } from 'types/Tilrettelegging';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { IntlProvider, uiMessages } from '@navikt/fp-ui';

import nbMessages from '../../intl/nb_NO.json';
import { VelgArbeidSteg } from './VelgArbeidSteg';
import * as stories from './VelgArbeidSteg.stories';

const { Default } = composeStories(stories);

describe('<VelgArbeidSteg>', () => {
    it.each([
        { tidligereValg: 'implisitt', valgteArbeidsforhold: undefined, lagredeArbeidsforhold: ['990322244'] },
        {
            tidligereValg: 'eksplisitt',
            valgteArbeidsforhold: ['975326209', '990322244'],
            lagredeArbeidsforhold: ['975326209', '990322244'],
        },
    ])('skal rydde alle arbeidsgiverdata etter et $tidligereValg valg', async (scenario) => {
        const { valgteArbeidsforhold, lagredeArbeidsforhold } = scenario;
        const valgtId = '975326209';
        const fjernetId = '990322244';
        const arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] = [
            {
                arbeidsgiverId: valgtId,
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Vestfold',
                fom: '2025-01-01',
                tom: '2026-03-05',
                stillingsprosent: 100,
            },
            {
                arbeidsgiverId: fjernetId,
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
                fom: '2025-01-01',
                stillingsprosent: 100,
            },
        ];
        const initialState: ContextDataMap = {
            [ContextDataType.OM_BARNET]: {
                erBarnetFødt: false,
                fødselsdato: undefined,
                termindato: '2026-12-01',
            },
            [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                harHattArbeidIUtlandet: false,
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: false,
            },
            [ContextDataType.VALGTE_ARBEIDSFORHOLD]: valgteArbeidsforhold,
            [ContextDataType.TILRETTELEGGINGER]: Object.fromEntries(
                lagredeArbeidsforhold.map((id) => [
                    id,
                    {
                        behovForTilretteleggingFom: '2026-03-01',
                        type: 'ingen',
                        enPeriodeMedTilretteleggingFom: '2026-03-01',
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                    },
                ]),
            ),
            [ContextDataType.TILRETTELEGGINGER_PERIODER]: Object.fromEntries(
                lagredeArbeidsforhold.map((id) => [
                    id,
                    [{ fom: '2026-03-01', tomType: TilOgMedDatoType.SISTE_DAG_MED_SVP, stillingsprosent: '0' }],
                ]),
            ),
            [ContextDataType.TILRETTELEGGINGER_VEDLEGG]: Object.fromEntries(
                lagredeArbeidsforhold.map((id) => [
                    id,
                    [
                        {
                            id,
                            file: new File(['skjema'], `${id}.pdf`, { type: 'application/pdf' }),
                            filename: `${id}.pdf`,
                            filesize: 6,
                            pending: false,
                            uploaded: true,
                            innsendingsType: 'LASTET_OPP',
                            skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                            type: AttachmentType.TILRETTELEGGING,
                        },
                    ],
                ]),
            ),
            [ContextDataType.FERIE]: Object.fromEntries(
                lagredeArbeidsforhold.map((id) => [
                    id,
                    {
                        skalHaFerie: true,
                        feriePerioder: [
                            {
                                fom: '2026-03-02',
                                tom: '2026-03-04',
                                arbeidsforhold: { id, type: 'virksomhet' },
                            },
                        ],
                    },
                ]),
            ),
        };
        const { result } = renderHook(() => useContextComplete(), {
            wrapper: ({ children }: { children: ReactNode }) => (
                <IntlProvider
                    locale="nb"
                    messagesGroupedByLocale={{ nb: { ...nbMessages, ...uiMessages.nb, ...formHookMessages.nb } }}
                >
                    <MemoryRouter initialEntries={[SøknadRoute.VELG_ARBEID]}>
                        <SvpDataContext initialState={initialState}>
                            <VelgArbeidSteg
                                arbeidsforhold={arbeidsforhold}
                                harRegistrertNæring={false}
                                mellomlagreSøknadOgNaviger={vi.fn()}
                                avbrytSøknad={vi.fn()}
                            />
                            {children}
                        </SvpDataContext>
                    </MemoryRouter>
                </IntlProvider>
            ),
        });

        if (valgteArbeidsforhold) {
            await userEvent.click(screen.getByRole('checkbox', { name: 'Omsorgspartner Vestfold AS' }));
        } else {
            await userEvent.click(screen.getByRole('checkbox', { name: 'Sykehuset i Vestfold' }));
        }
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        expect(result.current[ContextDataType.VALGTE_ARBEIDSFORHOLD]).toEqual([valgtId]);
        for (const key of [
            ContextDataType.TILRETTELEGGINGER,
            ContextDataType.TILRETTELEGGINGER_PERIODER,
            ContextDataType.TILRETTELEGGINGER_VEDLEGG,
            ContextDataType.FERIE,
        ] as const) {
            expect(result.current[key]).toEqual(
                lagredeArbeidsforhold.includes(valgtId) ? { [valgtId]: initialState[key]?.[valgtId] } : {},
            );
        }
        expect(result.current[ContextDataType.APP_ROUTE]).toBe(
            addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, valgtId),
        );
    });

    it('skal vise feilmelding hvis ingen arbeidsforhold er avhuket', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(
            screen.getByText('Hvor skal du jobbe mindre eller slutte å jobbe midlertidig på grunn av svangerskapet?'),
        ).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.'),
        ).toHaveLength(2);
    });

    it('skal ikke vise feilmelding', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.queryByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.'),
        ).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: ['975326209'],
            key: ContextDataType.VALGTE_ARBEIDSFORHOLD,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, '975326209'),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal ikke vise infoboks når kunn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.queryByText('Du vil nå gå gjennom hvert arbeidsforhold og gjøre dette:')).not.toBeInTheDocument();
    });

    it('skal vise infoboks når mer enn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));
        await userEvent.click(screen.getByText('Omsorgspartner Vestfold AS'));

        expect(screen.getByText('Du vil nå gå gjennom hvert arbeidsforhold og gjøre dette:')).toBeInTheDocument();
    });

    it('skal fjerne tilrettelegging når en har gått tilbake og valgt bort tilrettelegging', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <Default
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                valgteArbeidsforhold={['975326209', '990322244']}
                tilrettelegginger={{
                    '975326209': {
                        behovForTilretteleggingFom: '2024-01-01',
                        type: 'ingen',
                        enPeriodeMedTilretteleggingFom: '2024-01-01',
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                    },
                    '990322244': {
                        behovForTilretteleggingFom: '2024-10-01',
                        type: 'ingen',
                        enPeriodeMedTilretteleggingFom: '2024-11-01',
                        enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                    },
                }}
            />,
        );

        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: ['990322244'],
            key: ContextDataType.VALGTE_ARBEIDSFORHOLD,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: {
                '990322244': {
                    behovForTilretteleggingFom: '2024-10-01',
                    type: 'ingen',
                    enPeriodeMedTilretteleggingFom: '2024-11-01',
                    enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                },
            },
            key: ContextDataType.TILRETTELEGGINGER,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, '990322244'),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
});
