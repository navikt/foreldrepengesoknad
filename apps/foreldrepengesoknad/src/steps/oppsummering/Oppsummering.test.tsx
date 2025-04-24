import { composeStories } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { AnnenForelderOppgitt, BarnType, MorsAktivitet, Periode, UfødtBarn } from '@navikt/fp-common';
import { AttachmentType, DDMMYYYY_DATE_FORMAT, InnsendingsType, Skjemanummer } from '@navikt/fp-constants';
import { IntlProvider } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import nbMessages from '../../intl/nb_NO.json';
import { Oppsummering } from './Oppsummering';
import * as stories from './Oppsummering.stories';

const {
    Default,
    MorMedAnnenForelderUgift,
    FarMedUførMorUgift,
    FarMedMorSomHarRettIEØS,
    FarMedMorSomHarRettINorge,
    MorMedAdoptertBarn,
    MorMedUtenlandsopphold,
    MorMedArbeidsforholdOgAndreInntekter,
    MorMedAleneOmsorg,
    FarMedAleneOmsorg,
    ErEndringssøknad,
} = composeStories(stories);

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const mockBarn: UfødtBarn = {
    type: BarnType.UFØDT,
    termindato: '2024-01-01',
    antallBarn: 1,
};

const mockUttaksplan: Periode[] = [
    {
        type: 'UTTAK',
        tidsperiode: {
            fom: new Date('2024-01-01'),
            tom: new Date('2024-01-31'),
        },
        morsAktivitetIPerioden: {
            type: 'arbeid',
            prosent: 50,
        } as unknown as MorsAktivitet,
        årsak: 'UTTAK',
        erArbeidstaker: true,
        forelder: 'mor',
        id: '1',
    } as unknown as Periode,
];

const mockAnnenForelder: AnnenForelderOppgitt = {
    fnr: '09876543210',
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    erAleneOmOmsorg: false,
    kanIkkeOppgis: false,
};

const mockContext = {
    [ContextDataType.OM_BARNET]: mockBarn,
    [ContextDataType.UTTAKSPLAN]: mockUttaksplan,
    [ContextDataType.ANNEN_FORELDER]: mockAnnenForelder,
    [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
        harJobbetSomFrilans: false,
        harHattAndreInntektskilder: false,
        harJobbetSomSelvstendigNæringsdrivende: false,
    },
    [ContextDataType.VEDLEGG]: {
        [Skjemanummer.DOK_ARBEID_MOR]: [
            {
                id: '1',
                filename: 'arbeidsavtale.pdf',
                url: 'http://example.com/arbeidsavtale.pdf',
                innsendingsType: InnsendingsType.SEND_SENERE,
                type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
                filesize: 1234,
                file: new File(['abc'.repeat(100000)], 'arbeidsavtale.pdf'),
                pending: false,
                uploaded: true,
            },
        ],
        [Skjemanummer.DOK_UTDANNING_MOR]: [
            {
                id: '2',
                filename: 'utdanning.pdf',
                url: 'http://example.com/utdanning.pdf',
                innsendingsType: InnsendingsType.SEND_SENERE,
                type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                skjemanummer: Skjemanummer.DOK_UTDANNING_MOR,
                filesize: 1234,
                file: new File(['abc'.repeat(100000)], 'utdanning.pdf'),
                pending: false,
                uploaded: true,
            },
        ],
    },
};

const mockNavnPåForeldre = {
    mor: 'Mor',
    farMedmor: 'Far',
};

const mockUttaksperioderSomManglerVedlegg: Periode[] = [];

const defaultProps = {
    erEndringssøknad: false,
    sendSøknad: () => Promise.resolve(),
    avbrytSøknad: () => {},
    mellomlagreSøknadOgNaviger: () => Promise.resolve(),
    søkerInfo: {
        søker: {
            fnr: '12345678910',
            fornavn: 'Kari',
            etternavn: 'Nordmann',
        },
    },
};

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: nbMessages,
};

const renderWithContext = (props: any) => {
    return render(
        <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
                    <FpDataContext
                        initialState={{
                            [ContextDataType.OM_BARNET]: mockBarn,
                            [ContextDataType.UTTAKSPLAN]: mockUttaksplan,
                            [ContextDataType.ANNEN_FORELDER]: mockAnnenForelder,
                            [ContextDataType.SØKERSITUASJON]: {
                                situasjon: 'fødsel',
                                rolle: 'far',
                            },
                            [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                                harJobbetSomFrilans: false,
                                harHattAndreInntektskilder: false,
                                harJobbetSomSelvstendigNæringsdrivende: false,
                            },
                            [ContextDataType.VEDLEGG]: mockContext[ContextDataType.VEDLEGG],
                        }}
                    >
                        <Oppsummering {...props} />
                    </FpDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        </IntlProvider>,
    );
};

describe('<Oppsummering>', () => {
    const getParentDiv = (element: HTMLElement) => within(notEmpty(element.closest('div')));
    const checkAndGetParentDiv = (element: HTMLElement) => {
        expect(element).toBeInTheDocument();
        return getParentDiv(element);
    };

    it('skal bekrefte vilkårene og sende inn søknad', async () => {
        const sendSøknad = vi.fn();

        render(<Default sendSøknad={sendSøknad} />);

        expect(screen.queryByText('Du må bekrefte at du har oppgitt riktige opplysninger')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknaden'));

        expect(screen.getByText('Du må bekrefte at du har oppgitt riktige opplysninger')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'Jeg har gjort meg kjent med vilkårene for å motta foreldrepenger, og skal ha omsorgen for barnet i perioden jeg søker om.',
            ),
        );

        expect(screen.queryByText('Du må bekrefte at du har oppgitt riktige opplysninger')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknaden'));

        expect(sendSøknad).toHaveBeenCalledTimes(1);
    });

    it('skal vise informasjon om barnet, men har ikke info om andre foreldre eller arbeidsforhold', async () => {
        render(<Default />);

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        const barnetDiv = getParentDiv(screen.getAllByText('Barnet')[1]);

        expect(checkAndGetParentDiv(barnetDiv.getByText('Er barnet født?')).getByText('Ja')).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText('Hvor mange barn har du fått?')).getByText('Ett barn'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText('Når ble barnet født?')).getByText('15.03.2021'),
        ).toBeInTheDocument();

        expect(screen.getByText('Jeg kan ikke oppgi den andre forelderen')).toBeInTheDocument();
        expect(screen.getByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();
    });

    it('skal vise informasjon om farskapserklæring', async () => {
        render(<MorMedAnnenForelderUgift />);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getParentDiv(screen.getAllByText('Den andre forelderen')[1]);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Navn og fødselsnummer')).getByText(
                'Espen Utvikler, 08099017784',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Er dere sammen om omsorgen for barnet?')).getByText(
                'Ja',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText('Har den andre forelderen rett til foreldrepenger i Norge?'),
            ).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText('Har du orientert den andre forelderen om søknaden din?'),
            ).getByText('Nei'),
        ).toBeInTheDocument();
    });

    it('Skal vise riktig informasjon om aleneomsorg', async () => {
        render(<MorMedAleneOmsorg />);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getParentDiv(screen.getAllByText('Den andre forelderen')[1]);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Navn og fødselsnummer')).getByText(
                'Ingen Omsorg, 08099017784',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Er dere sammen om omsorgen for barnet?')).getByText(
                'Nei',
            ),
        ).toBeInTheDocument();
    });

    it('Skal vise riktig informasjon om aleneomsorg og info om farskapserklæring', async () => {
        render(<FarMedAleneOmsorg />);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getParentDiv(screen.getAllByText('Den andre forelderen')[1]);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Navn og fødselsnummer')).getByText(
                'Ingen Omsorg, 02520489226',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Er dere sammen om omsorgen for barnet?')).getByText(
                'Nei',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise informasjon om adoptert barn', async () => {
        render(<MorMedAdoptertBarn />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(await screen.findAllByText('Barnet')).toHaveLength(2);
        const barnetDiv = getParentDiv(screen.getAllByText('Barnet')[1]);

        expect(
            checkAndGetParentDiv(barnetDiv.getByText('Gjelder søknaden din stebarnsadopsjon?')).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText('Oppgi datoen for stebarnsadopsjon')).getByText('01.10.2021'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText('Hvor mange barn skal du adoptere?')).getByText('Ett barn'),
        ).toBeInTheDocument();
    });

    it('skal vise informasjon om utenlandsopphold', async () => {
        render(<MorMedUtenlandsopphold />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(screen.getAllByText('Bo i utlandet')[1]);

        expect(screen.getByText('Hvilket land har du bodd i de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getAllByText('Sverige')).toHaveLength(2);
        expect(
            screen.getByText(
                'Fra ' +
                    dayjs().subtract(10, 'months').format(DDMMYYYY_DATE_FORMAT) +
                    ' til ' +
                    dayjs().subtract(1, 'days').format(DDMMYYYY_DATE_FORMAT),
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Hvilket land skal du bo i de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getAllByText('Sverige')).toHaveLength(2);
        expect(
            screen.getByText('Fra i dag til ' + dayjs().add(100, 'days').format(DDMMYYYY_DATE_FORMAT)),
        ).toBeInTheDocument();
    });

    it('skal vise informasjon om arbeidsforhold og andre inntekter', async () => {
        render(<MorMedArbeidsforholdOgAndreInntekter />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        const arbeidsforholdOgInntektDiv = getParentDiv(screen.getAllByText('Arbeidsforhold og inntekt')[1]);

        expect(
            checkAndGetParentDiv(arbeidsforholdOgInntektDiv.getByText('Auto Joachim Bilpleie, 80%')).getByText(
                'Org nr: 1, 01.01.2015 - Pågående',
            ),
        ).toBeInTheDocument();

        expect(
            checkAndGetParentDiv(
                arbeidsforholdOgInntektDiv.getByText(
                    'Har du jobbet og hatt inntekt som frilanser de siste 10 månedene?',
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();

        expect(
            checkAndGetParentDiv(
                arbeidsforholdOgInntektDiv.getByText(
                    'Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 10 månedene?',
                ),
            ).getByText('Nei'),
        ).toBeInTheDocument();

        expect(
            checkAndGetParentDiv(
                arbeidsforholdOgInntektDiv.getByText('Har du hatt andre inntektskilder de siste 10 månedene?'),
            ).getByText('Nei'),
        ).toBeInTheDocument();
    });

    it('skal vise informasjon om uttaksplan', async () => {
        render(<FarMedUførMorUgift />);

        const dinPlanDiv = getParentDiv(screen.getByText('Din plan'));

        expect(
            checkAndGetParentDiv(dinPlanDiv.getByText('Du har planlagt')).getByText(
                '1 uke med 100 prosent foreldrepenger',
            ),
        ).toBeInTheDocument();
        //TODO (TOR) dag og tidspunkt er forskjellig lokalt vs github
        // expect(
        //     checkAndGetParentDiv(dinPlanDiv.getAllByText(/Tirsdag/)[0]).getByText('Foreldrepenger før fødsel'),
        // ).toBeInTheDocument();
        // expect(checkAndGetParentDiv(dinPlanDiv.getAllByText(/Tirsdag/)[1]).getByText('Utsettelse')).toBeInTheDocument();
        // expect(
        //     checkAndGetParentDiv(dinPlanDiv.getAllByText(/Tirsdag/)[2]).getByText('Fellesperiode'),
        // ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                dinPlanDiv.getByText(
                    'Ønsker du at vi endrer perioden som starter på termin til å starte fra fødselsdato når barnet blir født?',
                ),
            ).getByText('Nei'),
        ).toBeInTheDocument();
    });

    it('Skal vise informasjon om at mor har rett til foreldrepenger i EØS', async () => {
        render(<FarMedMorSomHarRettIEØS />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getParentDiv(screen.getAllByText('Den andre forelderen')[1]);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Navn og fødselsnummer')).getByText(
                'Anne Forelder, 02520489226',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Er dere sammen om omsorgen for barnet?')).getByText(
                'Ja',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText('Har den andre forelderen rett til foreldrepenger i Norge?'),
            ).getByText('Nei'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(
                    'Har den andre forelderen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(
                    'Har den andre forelderen arbeidet eller mottatt pengestøtte i et EØS-land i 6 eller mer måneder før barnet blir født?',
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
    });

    it('Skal vise informasjon om at mor har hatt opphold men ikke rett til foreldrepenger i EØS', async () => {
        render(<FarMedMorSomHarRettIEØS />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getParentDiv(screen.getAllByText('Den andre forelderen')[1]);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Navn og fødselsnummer')).getByText(
                'Anne Forelder, 02520489226',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Er dere sammen om omsorgen for barnet?')).getByText(
                'Ja',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText('Har den andre forelderen rett til foreldrepenger i Norge?'),
            ).getByText('Nei'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(
                    'Har den andre forelderen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(
                    'Har den andre forelderen arbeidet eller mottatt pengestøtte i et EØS-land i 6 eller mer måneder før barnet blir født?',
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
    });

    it('skal vise informasjon om at mor har rett til foreldrepenger i Norge og ikke vise info om EØS eller uføretrygd', async () => {
        render(<FarMedMorSomHarRettINorge />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        const denAndreForelderenDiv = getParentDiv(screen.getAllByText('Den andre forelderen')[1]);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Navn og fødselsnummer')).getByText(
                'Frida Norsk, 02520489226',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText('Er dere sammen om omsorgen for barnet?')).getByText(
                'Ja',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText('Har den andre forelderen rett til foreldrepenger i Norge?'),
            ).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText('Har du orientert den andre forelderen om søknaden din?'),
            ).getByText('Nei'),
        ).toBeInTheDocument();
    });

    it('skal gå til dokumentasjon når førstegangssøknad og en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.DOKUMENTASJON,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til uttaksplan når endringssøknad og en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <ErEndringssøknad
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.DOKUMENTASJON,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal vise dokumentasjon for mors arbeid når mor trenger å dokumentere arbeid', async () => {
        server.use(
            http.post('/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid', async () => {
                return HttpResponse.json(true);
            }),
        );

        renderWithContext({
            ...defaultProps,
            vedlegg: mockContext[ContextDataType.VEDLEGG],
            erSøkerFarEllerMedmor: true,
            navnPåForeldre: mockNavnPåForeldre,
            uttaksperioderSomManglerVedlegg: mockUttaksperioderSomManglerVedlegg,
            onVilEndreSvar: () => Promise.resolve(),
        });

        expect(await screen.findByText('arbeidsavtale.pdf')).toBeInTheDocument();
    });

    it('skal vise dokumentasjon for både mors arbeid og utdanning når mor ikke trenger å dokumentere arbeid, men må dokumentere utdanning', async () => {
        server.use(
            http.post('/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid', async () => {
                return HttpResponse.json(false);
            }),
        );

        renderWithContext({
            ...defaultProps,
            vedlegg: mockContext[ContextDataType.VEDLEGG],
            erSøkerFarEllerMedmor: true,
            navnPåForeldre: mockNavnPåForeldre,
            uttaksperioderSomManglerVedlegg: mockUttaksperioderSomManglerVedlegg,
            onVilEndreSvar: () => Promise.resolve(),
        });

        expect(await screen.findByText('arbeidsavtale.pdf')).toBeInTheDocument();
        expect(await screen.findByText('utdanning.pdf')).toBeInTheDocument();
    });
});
