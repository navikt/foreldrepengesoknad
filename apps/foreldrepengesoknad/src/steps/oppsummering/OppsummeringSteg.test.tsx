import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { vi } from 'vitest';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';
import { notEmpty } from '@navikt/fp-validation';

import * as stories from './OppsummeringSteg.stories';

const {
    Default,
    MorMedAnnenForelderUgift,
    FarMedUførMorUgift,
    FarMedMorSomHarRettIEØS,
    FarMedMorSomHarRettINorge,
    MorMedAdoptertBarn,
    MorMedUtenlandsopphold,
    FarMedMorSomHarVedtak,
    MorMedArbeidsforholdOgAndreInntekter,
    MorMedAleneOmsorg,
    FarMedAleneOmsorg,
    ErEndringssøknad,
    FarSøkerMorMåIkkeDokumentereArbeid,
    FarSøkerMorMåDokumentereArbeid,
    FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning,
    FarErSøkerMorSøkerSamtidigUttakIFellesperiodeKreverDokumentasjon,
} = composeStories(stories);

describe('<Oppsummering>', () => {
    const getCardDiv = (element: HTMLElement) =>
        within(notEmpty(element.closest('div')?.parentElement?.closest('div')));
    const checkAndGetParentDiv = (element: HTMLElement) => {
        expect(element).toBeInTheDocument();
        return within(notEmpty(element.closest('div')));
    };

    it('Skal bekrefte vilkårene og sende inn søknad', async () => {
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

    it('Skal vise informasjon om barnet, men har ikke info om andre foreldre eller arbeidsforhold', () => {
        render(<Default />);

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        const barnetDiv = getCardDiv(screen.getAllByText('Barnet')[1]!);

        expect(checkAndGetParentDiv(barnetDiv.getByText('Er barnet født?')).getByText('Ja')).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText('Hvor mange barn har du fått?')).getByText('Ett barn'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText('Når ble barnet født?')).getByText('15.03.2021'),
        ).toBeInTheDocument();

        expect(screen.getByText('Jeg kan ikke oppgi den andre forelderen')).toBeInTheDocument();
        expect(screen.getByText(/Arbeidsgiver AS/)).toBeInTheDocument();
        expect(
            screen.getByText(
                'Arbeidsgiveren din blir kontaktet av Nav for å sende opplysninger om din inntekt. Dette vil skje fire uker før du skal starte permisjonen.',
            ),
        ).toBeInTheDocument();
    });

    it('Skal vise informasjon om farskapserklæring', () => {
        render(<MorMedAnnenForelderUgift />);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText('Den andre forelderen')[1]!);

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

    it('Skal vise riktig informasjon om aleneomsorg', () => {
        render(<MorMedAleneOmsorg />);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText('Den andre forelderen')[1]!);

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

    it('Skal vise riktig informasjon om aleneomsorg og info om farskapserklæring', () => {
        render(<FarMedAleneOmsorg />);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText('Den andre forelderen')[1]!);

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

    it('Skal vise informasjon om adoptert barn', async () => {
        render(<MorMedAdoptertBarn />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(await screen.findAllByText('Barnet')).toHaveLength(2);
        const barnetDiv = getCardDiv(screen.getAllByText('Barnet')[1]!);

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

    it('Skal vise informasjon om utenlandsopphold', async () => {
        render(<MorMedUtenlandsopphold />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(screen.getAllByText('Bo i utlandet')[1]!);

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

    it('Skal vise informasjon om arbeidsforhold og andre inntekter', async () => {
        render(<MorMedArbeidsforholdOgAndreInntekter />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(
            screen.queryByText('blir kontaktet av Nav for å sende opplysninger om din inntekt', { exact: false }),
        ).toBeInTheDocument();

        const arbeidsforholdOgInntektDiv = getCardDiv(screen.getAllByText('Arbeidsforhold og inntekt')[1]!);

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

    it('Skal vise informasjon om uttaksplan', () => {
        render(<FarMedUførMorUgift />);

        const dinPlanDiv = getCardDiv(screen.getByText('Din plan'));

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
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText('Den andre forelderen')[1]!);

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
                    'Har den andre forelderen rett til pengestøtte i et annet EØS-land som tilsvarer foreldrepenger i Norge?',
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
    });

    it(
        'Skal ikke vise spørsmål om annen forelder har rett hvis de har innvilget perioder fra vedtak',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedMorSomHarVedtak.parameters.msw);
            render(<FarMedMorSomHarVedtak />);

            expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
            await waitFor(() => {
                expect(
                    screen.queryByText('Har den andre forelderen rett til foreldrepenger i Norge?', { exact: false }),
                ).not.toBeInTheDocument();
            });
        }),
    );

    it('Skal vise informasjon om at mor har hatt opphold men ikke rett til foreldrepenger i EØS', async () => {
        render(<FarMedMorSomHarRettIEØS />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText('Den andre forelderen')[1]!);

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
                    'Har den andre forelderen rett til pengestøtte i et annet EØS-land som tilsvarer foreldrepenger i Norge?',
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
    });

    it('Skal vise informasjon om at mor har rett til foreldrepenger i Norge og ikke vise info om EØS eller uføretrygd', async () => {
        render(<FarMedMorSomHarRettINorge />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        const denAndreForelderenDiv = getCardDiv(screen.getAllByText('Den andre forelderen')[1]!);

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

    it('Skal gå til dokumentasjon når førstegangssøknad og en går til forrige steg', async () => {
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

    it('Skal gå til uttaksplan når endringssøknad og en går til forrige steg', async () => {
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

    // TODO: De gjenværende må det oppdateres slik at testene gjennomføres uavhengig av rekkefølge, msw-handler virker ikke å resettes som de skal.

    it(
        'Far er hovedsøker - Skal vise krav om dokumentasjon for mors arbeid når hun jobber mindre enn 75%',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarSøkerMorMåDokumentereArbeid.parameters.msw);
            render(<FarSøkerMorMåDokumentereArbeid />);

            expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

            expect(screen.getByText('Navn og fødselsnummer')).toBeInTheDocument();
            expect(screen.getByText('Kari Nordmann, 02520489226')).toBeInTheDocument();
            expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
            expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
            expect(screen.getByText('Har du orientert den andre forelderen om søknaden din?')).toBeInTheDocument();
            expect(screen.getAllByText('Ja')).toHaveLength(4);

            expect(screen.getByText('Dokumentasjon på at mor er i arbeid (mangler)')).toBeInTheDocument();
            expect(
                screen.getByText(
                    'Du må legge ved bekreftelse fra Kari sin arbeidsgiver som viser hvilken periode hun skal jobbe og i hvilken stillingsprosent.' +
                        ' Dersom Kari er selvstendig næringsdrivende, frilanser eller er ansatt i eget AS skriver hun denne bekreftelsen selv.',
                ),
            ).toBeInTheDocument();
        }),
    );

    it(
        'Far er hovedsøker - Skal vise krav om dokumentasjon for mors arbeid når far ønsker samtidig uttak i fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarErSøkerMorSøkerSamtidigUttakIFellesperiodeKreverDokumentasjon.parameters.msw);
            render(<FarErSøkerMorSøkerSamtidigUttakIFellesperiodeKreverDokumentasjon />);

            expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

            expect(screen.getByText('Navn og fødselsnummer')).toBeInTheDocument();
            expect(screen.getByText('Kari Nordmann, 02520489226')).toBeInTheDocument();
            expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
            expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
            expect(screen.getByText('Har du orientert den andre forelderen om søknaden din?')).toBeInTheDocument();
            expect(screen.getAllByText('Ja')).toHaveLength(5);

            expect(screen.getByText('Dine perioder med foreldrepenger')).toBeInTheDocument();
            expect(screen.getByText('Fellesperiode', { selector: 'dd' })).toBeInTheDocument();
            expect(screen.getByText('Vi skal ha samtidig uttak:')).toBeInTheDocument();
            expect(screen.getByText('Vi skal ha samtidig uttak:').nextSibling).toHaveTextContent('Ja');
        }),
    );

    it(
        'Far er hovedsøker - Skal ikke vise krav om dokumentasjon når mor jobber 75% eller mer',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarSøkerMorMåIkkeDokumentereArbeid.parameters.msw);

            render(<FarSøkerMorMåIkkeDokumentereArbeid />);

            expect(await screen.findAllByText('Den andre forelderen')).toHaveLength(2);

            expect(screen.getByText('Navn og fødselsnummer')).toBeInTheDocument();
            expect(screen.getByText('Kari Nordmann, 02520489226')).toBeInTheDocument();
            expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
            expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
            expect(screen.getByText('Har du orientert den andre forelderen om søknaden din?')).toBeInTheDocument();
            expect(screen.getAllByText('Ja')).toHaveLength(4);

            expect(screen.queryByText('Dokumentasjon på at mor er i arbeid (mangler)')).not.toBeInTheDocument();
            expect(
                screen.queryByText(
                    'Du må legge ved bekreftelse fra Kari sin arbeidsgiver som viser hvilken periode hun skal jobbe og i hvilken stillingsprosent.' +
                        ' Dersom Kari er selvstendig næringsdrivende, frilanser eller er ansatt i eget AS skriver hun denne bekreftelsen selv.',
                ),
            ).not.toBeInTheDocument();
        }),
    );

    it(
        'Far er hovedsøker - Skal vise krav om dokumentasjon for utdanning men ikke for arbeid',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning.parameters.msw);
            render(<FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning />);

            expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

            expect(screen.getByText('Navn og fødselsnummer')).toBeInTheDocument();
            expect(screen.getByText('Kari Nordmann, 02520489226')).toBeInTheDocument();
            expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
            expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
            expect(screen.getByText('Har du orientert den andre forelderen om søknaden din?')).toBeInTheDocument();
            expect(screen.getAllByText('Ja')).toHaveLength(4);

            expect(screen.queryByText('Dokumentasjon på at mor er i arbeid')).not.toBeInTheDocument();
            expect(
                screen.queryByText(
                    'Du må legge ved bekreftelse fra Kari sin arbeidsgiver som viser hvilken periode hun skal jobbe og i hvilken stillingsprosent.',
                ),
            ).not.toBeInTheDocument();
            expect(screen.queryByText('Dokumentasjon på at mor er i arbeid (mangler)')).not.toBeInTheDocument();
            expect(screen.getByText('Dokumentasjon på at mor studerer (mangler)')).toBeInTheDocument();

            expect(
                screen.getByText('Du må legge ved bekreftelse på at Kari er fulltidsstudent. Bekreftelsen må vise', {
                    exact: false,
                }),
            ).toBeInTheDocument();

            expect(screen.getByText('navn og fødselsnummer')).toBeInTheDocument();
            expect(screen.getByText('studiested, fag eller studieprogram')).toBeInTheDocument();
            expect(screen.getByText('oppstart og varighet av studiet')).toBeInTheDocument();
            expect(
                screen.getByText(
                    'har mor søkt om permisjon fra studiet en periode må dette komme frem i dokumentasjonen',
                ),
            ).toBeInTheDocument();
        }),
    );
});
