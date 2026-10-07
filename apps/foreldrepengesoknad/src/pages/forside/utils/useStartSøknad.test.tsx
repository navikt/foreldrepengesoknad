import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    ContextDataMap,
    ContextDataType,
    FpDataContext,
    useContextComplete,
    useContextSaveAnyData,
} from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useResetUttaksplanData } from 'appData/useResetUttaksplanData';
import { ReactNode } from 'react';
import { createIntl } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { OmBarnetSteg } from 'steps/om-barnet/OmBarnetSteg';
import { lagSøknadFraValgteBarnMedSak } from 'utils/eksisterendeSakUtils';

import { BarnType } from '@navikt/fp-constants';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { FellesUttaksplanDto_fpoversikt, FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { IntlProvider, uiMessages } from '@navikt/fp-ui';

import messages from '../../../intl/nb_NO.json';
import { SelectableBarnOptions } from '../types/ForsideFormValues';
import { getSelectableBarnOptions } from './forsideUtils';
import { useStartSøknad } from './useStartSøknad';

const sak: FpSak_fpoversikt = {
    saksnummer: '123456',
    dekningsgrad: 'HUNDRE',
    familiehendelse: { termindato: '2026-06-28', antallBarn: 1 },
    forelder: 'MOR',
    harAnnenForelderTilsvarendeRettEØS: false,
    gjelderAdopsjon: false,
    kanSøkeOmEndring: false,
    morUføretrygd: false,
    rettighetType: 'BEGGE_RETT',
    sakAvsluttet: false,
    sakTilhørerMor: true,
    oppdatertTidspunkt: '2026-05-06',
    annenPart: { fnr: '123456789' },
};
const søkerInfo: FpPersonopplysningerDto_fpoversikt = {
    fnr: '26499118626',
    navn: { fornavn: 'Olga', etternavn: 'Utvikler' },
    kjønn: 'K',
    fødselsdato: '1988-04-19',
    erGift: false,
    barn: [],
    arbeidsforhold: [],
    frilansoppdrag: [],
    selvstendigNæring: [],
};
const tidligerePlan: FellesUttaksplanDto_fpoversikt = {
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    perioder: [
        {
            fom: '2026-06-08',
            tom: '2026-06-26',
            søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
        },
    ],
};
const queryKey = [
    'UTTAKSPLAN',
    { barnIdentifikator: { familiehendelse: '2026-06-28' }, annenPartFødselsnummer: '123456789' },
];
const adopsjonssak: FpSak_fpoversikt = {
    ...sak,
    gjelderAdopsjon: true,
    familiehendelse: { fødselsdato: '2024-01-15', omsorgsovertakelse: '2026-06-01', antallBarn: 1 },
};
const adopsjonQueryKey = [
    'UTTAKSPLAN',
    { barnIdentifikator: { familiehendelse: '2026-06-01' }, annenPartFødselsnummer: '123456789' },
];

const OmBarnetEtterStart = ({ person }: { person: FpPersonopplysningerDto_fpoversikt }) => {
    const state = useContextComplete();
    return state.OM_BARNET ? (
        <OmBarnetSteg
            søkerInfo={person}
            søknadGjelderNyttBarn={false}
            mellomlagreSøknadOgNaviger={() => Promise.resolve()}
            avbrytSøknad={vi.fn()}
        />
    ) : null;
};

const setup = (
    initialState: ContextDataMap = {},
    valgtSak = sak,
    tidligereSaker: FpSak_fpoversikt[] = [],
    {
        visOmBarnet = false,
        registrerteBarn = [],
    }: { visOmBarnet?: boolean; registrerteBarn?: FpPersonopplysningerDto_fpoversikt['barn'] } = {},
) => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
    client.setQueryData(queryKey, tidligerePlan);
    const saker = [valgtSak, ...tidligereSaker];
    client.setQueryData(['SAKER'], { foreldrepenger: saker, engangsstønad: [], svangerskapspenger: [] });
    const selectableBarn = getSelectableBarnOptions([valgtSak], registrerteBarn);
    const person = { ...søkerInfo, barn: registrerteBarn };
    const metadata = vi.fn();
    const naviger = vi.fn().mockResolvedValue(undefined);
    const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={client}>
            <IntlProvider
                locale="nb"
                messagesGroupedByLocale={{ nb: { ...messages, ...uiMessages.nb, ...formHookMessages.nb } }}
            >
                <MemoryRouter initialEntries={[visOmBarnet ? SøknadRoutes.OM_BARNET : SøknadRoutes.VELKOMMEN]}>
                    <FpDataContext initialState={initialState}>
                        {children}
                        {visOmBarnet && <OmBarnetEtterStart person={person} />}
                    </FpDataContext>
                </MemoryRouter>
            </IntlProvider>
        </QueryClientProvider>
    );
    const hook = renderHook(
        () => ({
            ...useStartSøknad({
                saker,
                selectableBarn,
                søkerInfo: person,
                harPlanleggerData: false,
                oppdaterSøknadsmetadata: metadata,
                mellomlagreSøknadOgNaviger: naviger,
            }),
            state: useContextComplete(),
            reset: useResetUttaksplanData(),
            lagre: useContextSaveAnyData(),
        }),
        { wrapper },
    );
    const values = { harForståttRettigheterOgPlikter: true, valgteBarn: selectableBarn[0]!.id };
    return { ...hook, client, values, metadata, naviger, wrapper };
};

describe('useStartSøknad', () => {
    it.each([false, true])('beholder eldre adopsjonsmapping uten opt-in, med vedtak: %s', (harVedtak) => {
        const valgtSak = { ...adopsjonssak, gjeldendeVedtak: harVedtak ? { perioder: [] } : undefined };
        const [valgtBarn] = getSelectableBarnOptions([valgtSak], []);
        const søknad = lagSøknadFraValgteBarnMedSak(
            { ...valgtBarn!, sak: valgtSak },
            createIntl({ locale: 'nb', messages: messages as Record<string, string> }),
            [],
            søkerInfo.fnr,
        );
        expect(søknad.barn).toEqual({
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-01-15'],
            termindato: undefined,
            fnr: undefined,
        });
    });

    it.each(['2024-01-15', undefined])(
        'henter adopsjonsplan uten barnets fødselsnummer, med fødselsdato %s',
        async (fødselsdato) => {
            const { result, values, client } = setup(
                {},
                { ...adopsjonssak, familiehendelse: { ...adopsjonssak.familiehendelse, fødselsdato } },
            );
            client.setQueryData(adopsjonQueryKey, tidligerePlan);
            const fetch = vi.spyOn(client, 'fetchQuery');
            await act(() => result.current.startSøknad(values));

            expect(fetch).toHaveBeenCalledWith(expect.objectContaining({ queryKey: adopsjonQueryKey }));
            expect(result.current.state.OM_BARNET).toEqual({
                type: BarnType.ADOPTERT_STEBARN,
                antallBarn: 1,
                adopsjonsdato: '2026-06-01',
                fødselsdatoer: fødselsdato ? [fødselsdato] : [],
                fnr: undefined,
            });
            expect(result.current.state.UTTAKSPLAN).toEqual(tidligerePlan.perioder);
        },
    );

    it.each([
        { registrert: false, endretDato: false },
        { registrert: false, endretDato: true },
        { registrert: true, endretDato: false },
        { registrert: true, endretDato: true },
    ])('nullstiller adopsjonsplan bare ved endret dato: %j', async ({ registrert, endretDato }) => {
        const { result, values, client } = setup({}, adopsjonssak, [], {
            visOmBarnet: true,
            registrerteBarn: registrert
                ? [
                      {
                          fnr: '15412400000',
                          fødselsdato: '2024-01-15',
                          kjønn: 'K',
                          navn: { fornavn: 'Barn', etternavn: 'Test' },
                      },
                  ]
                : [],
        });
        client.setQueryData(adopsjonQueryKey, tidligerePlan);
        client.setQueryData(
            [
                'UTTAKSPLAN',
                { barnIdentifikator: { familiehendelse: '2026-06-02' }, annenPartFødselsnummer: '123456789' },
            ],
            null,
        );
        await act(() => result.current.startSøknad(values));
        expect(result.current.state.UTTAKSPLAN).toEqual(tidligerePlan.perioder);

        const adopsjonsdato = await screen.findByLabelText('Oppgi datoen for stebarnsadopsjon');
        expect(adopsjonsdato).toHaveValue('01.06.2026');
        if (endretDato) {
            await userEvent.clear(adopsjonsdato);
            await userEvent.type(adopsjonsdato, '02.06.2026');
            await userEvent.tab();
        }
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        await waitFor(() => expect(result.current.state.APP_ROUTE).toBe(SøknadRoutes.UTENLANDSOPPHOLD));
        expect(result.current.state.UTTAKSPLAN).toEqual(endretDato ? undefined : tidligerePlan.perioder);
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual(
            endretDato ? undefined : { saksnummer: adopsjonssak.saksnummer, perioder: tidligerePlan.perioder },
        );
        expect(result.current.state.OM_BARNET).toMatchObject({
            adopsjonsdato: endretDato ? '2026-06-02' : '2026-06-01',
            antallBarn: 1,
        });
    });

    it('initialiserer barnet på nytt for samme vedtatte sak uten å nullstille planen', async () => {
        const snapshot = { saksnummer: sak.saksnummer, perioder: tidligerePlan.perioder };
        const { result, values, client } = setup(
            {
                [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: sak.saksnummer,
                [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel', rolle: 'mor' },
                [ContextDataType.OM_BARNET]: { type: BarnType.UFØDT, antallBarn: 2, termindato: '2026-07-01' },
                [ContextDataType.UTTAKSPLAN]: [],
                [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: snapshot,
            },
            { ...sak, gjeldendeVedtak: { perioder: [] } },
        );
        const fetch = vi.spyOn(client, 'fetchQuery');
        await act(() => result.current.startSøknad(values));
        expect(fetch).not.toHaveBeenCalled();
        expect(result.current.state.OM_BARNET?.antallBarn).toBe(1);
        expect(result.current.state.UTTAKSPLAN).toEqual([]);
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual(snapshot);
    });

    it.each([
        { utenVedtak: false, neste: 'nytt barn' },
        { utenVedtak: false, neste: 'endring' },
        { utenVedtak: false, neste: 'vedtatt sak' },
        { utenVedtak: true, neste: 'nytt barn' },
        { utenVedtak: true, neste: 'endring' },
        { utenVedtak: true, neste: 'vedtatt sak' },
    ])('nullstiller bare når en søknad uten vedtak forlates: %j', async ({ utenVedtak, neste }) => {
        const forrigeSak: FpSak_fpoversikt = {
            ...sak,
            saksnummer: 'forrige',
            gjeldendeVedtak: utenVedtak ? undefined : { perioder: [] },
        };
        const snapshot = { saksnummer: forrigeSak.saksnummer, perioder: tidligerePlan.perioder };
        const { result, values } = setup(
            {
                [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: forrigeSak.saksnummer,
                [ContextDataType.UTTAKSPLAN]: tidligerePlan.perioder,
                [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: snapshot,
            },
            { ...sak, gjeldendeVedtak: { perioder: [] }, kanSøkeOmEndring: neste === 'endring' },
            [forrigeSak],
        );
        await act(() =>
            result.current.startSøknad({
                ...values,
                valgteBarn: neste === 'nytt barn' ? SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN : values.valgteBarn,
            }),
        );
        expect(result.current.state.UTTAKSPLAN).toEqual(utenVedtak ? undefined : tidligerePlan.perioder);
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual(utenVedtak ? undefined : snapshot);
        expect(result.current.state.VALGT_EKSISTERENDE_SAKSNR).toBe(
            neste === 'nytt barn' ? (utenVedtak ? undefined : forrigeSak.saksnummer) : sak.saksnummer,
        );
    });

    it('henter og lagrer eksisterende plan før vanlige steg åpnes', async () => {
        const { result, values, client, naviger, metadata } = setup();
        const fetch = vi.spyOn(client, 'fetchQuery');
        await act(() => result.current.startSøknad(values));

        expect(fetch).toHaveBeenCalledWith(expect.objectContaining({ queryKey }));
        expect(result.current.state.UTTAKSPLAN).toEqual(tidligerePlan.perioder);
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual({
            saksnummer: sak.saksnummer,
            perioder: tidligerePlan.perioder,
        });
        expect(result.current.state.APP_ROUTE).toBe(SøknadRoutes.SØKERSITUASJON);
        expect(metadata).toHaveBeenCalledWith({
            harGodkjentVilkår: true,
            erEndringssøknad: false,
            søknadGjelderNyttBarn: false,
        });
        expect(naviger).toHaveBeenCalledOnce();
    });

    it('venter på planen og starter ikke søknaden ved hentefeil', async () => {
        const { result, values, client, naviger, metadata } = setup();
        const response = Promise.withResolvers<FellesUttaksplanDto_fpoversikt>();
        vi.spyOn(client, 'fetchQuery').mockReturnValueOnce(response.promise);
        let start: Promise<void>;
        act(() => {
            start = result.current.startSøknad(values);
        });
        expect(naviger).not.toHaveBeenCalled();
        expect(result.current.state).toEqual({});
        await act(async () => {
            response.reject(new Error('Kunne ikke hente planen'));
            await start;
        });
        expect(result.current.startFeilet).toBe(true);
        expect(metadata).not.toHaveBeenCalled();
        expect(result.current.state).toEqual({});

        act(() => result.current.nullstillStartFeilet());
        await act(() => result.current.startSøknad(values));
        expect(result.current.state.UTTAKSPLAN).toEqual(tidligerePlan.perioder);
    });

    it.each([
        null,
        { ...tidligerePlan, perioder: [] },
        {
            ...tidligerePlan,
            perioder: tidligerePlan.perioder.map(({ fom, tom, søker }) => ({ fom, tom, annenPart: søker })),
        },
    ])('håndterer et vellykket svar uten egne perioder: %j', async (svar) => {
        const { result, values, client } = setup();
        client.setQueryData(queryKey, svar);
        await act(() => result.current.startSøknad(values));
        expect(result.current.state.UTTAKSPLAN).toBeUndefined();
        expect(result.current.state.APP_ROUTE).toBe(SøknadRoutes.SØKERSITUASJON);
        expect(result.current.startFeilet).toBe(false);
    });

    it.each(['endret', 'tømt', 'forkastet'] as const)(
        'starter ikke initialisering på nytt etter at planen er %s',
        async (type) => {
            const { result, values, client, rerender } = setup();
            const fetch = vi.spyOn(client, 'fetchQuery');
            await act(() => result.current.startSøknad(values));
            act(() => {
                if (type === 'forkastet') {
                    result.current.reset();
                } else {
                    result.current.lagre(
                        ContextDataType.UTTAKSPLAN,
                        type === 'tømt' ? [] : [{ ...tidligerePlan.perioder[0]!, fom: '2026-06-01' }],
                    );
                }
            });
            const plan = result.current.state.UTTAKSPLAN;
            rerender();
            await act(() => result.current.startSøknad(values));
            expect(result.current.state.UTTAKSPLAN).toEqual(plan);
            expect(fetch).toHaveBeenCalledOnce();
        },
    );

    it('henter ikke gammel plan ved gjenopptak av en eldre lagring uten snapshot', async () => {
        const { result, values, client } = setup({
            [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: sak.saksnummer,
            [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel', rolle: 'mor' },
            [ContextDataType.OM_BARNET]: { type: BarnType.UFØDT, antallBarn: 2, termindato: '2026-07-01' },
        });
        const fetch = vi.spyOn(client, 'fetchQuery');
        await act(() => result.current.startSøknad(values));
        expect(fetch).not.toHaveBeenCalled();
        expect(result.current.state.UTTAKSPLAN).toBeUndefined();
        expect(result.current.state.OM_BARNET?.antallBarn).toBe(2);
    });

    it('beholder direkte start på uttaksplan for endringssøknad med vedtak', async () => {
        const { result, values, client } = setup(
            {},
            {
                ...sak,
                kanSøkeOmEndring: true,
                gjeldendeVedtak: { perioder: [] },
            },
        );
        const fetch = vi.spyOn(client, 'fetchQuery');
        await act(() => result.current.startSøknad(values));
        expect(fetch).not.toHaveBeenCalled();
        expect(result.current.state.APP_ROUTE).toBe(SøknadRoutes.UTTAKSPLAN);
    });
});
