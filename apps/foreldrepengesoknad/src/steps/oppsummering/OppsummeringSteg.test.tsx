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

import messages from '../../intl/nb_NO.json';

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

        expect(screen.getAllByText(messages['steps.label.omBarnet'])).toHaveLength(2);
        const barnetDiv = getCardDiv(screen.getAllByText(messages['steps.label.omBarnet'])[1]!);

        expect(checkAndGetParentDiv(barnetDiv.getByText(messages['omBarnet.erBarnetFødt'])).getByText('Ja')).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText(messages['omBarnet.antallBarn.født'])).getByText(messages['omBarnet.radiobutton.ettBarn']),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText(messages['omBarnet.fødselsdato'])).getByText('15.03.2021'),
        ).toBeInTheDocument();

        expect(screen.getByText(messages['annenForelder.spørsmål.kanOppgis'])).toBeInTheDocument();
        expect(screen.getByText(/Arbeidsgiver AS/)).toBeInTheDocument();
        expect(
            screen.getByText(
                'Arbeidsgiveren din blir kontaktet av Nav for å sende opplysninger om din inntekt. Dette vil skje fire uker før du skal starte permisjonen.',
            ),
        ).toBeInTheDocument();
    });

    it('Skal vise informasjon om farskapserklæring', () => {
        render(<MorMedAnnenForelderUgift />);

        expect(screen.getAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText(messages['steps.label.annenForelder'])[1]!);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['oppsummering.annenForelder.navn'])).getByText(
                'Espen Utvikler, 08099017784',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['annenForelder.aleneOmOmsorg'])).getByText(
                'Ja',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.harRettPåForeldrepengerINorge']),
            ).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.spørsmål.erAnnenForelderInformert']),
            ).getByText(messages['nei']),
        ).toBeInTheDocument();
    });

    it('Skal vise riktig informasjon om aleneomsorg', () => {
        render(<MorMedAleneOmsorg />);

        expect(screen.getAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText(messages['steps.label.annenForelder'])[1]!);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['oppsummering.annenForelder.navn'])).getByText(
                'Ingen Omsorg, 08099017784',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['annenForelder.aleneOmOmsorg'])).getByText(messages['nei'],
            ),
        ).toBeInTheDocument();
    });

    it('Skal vise riktig informasjon om aleneomsorg og info om farskapserklæring', () => {
        render(<FarMedAleneOmsorg />);

        expect(screen.getAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText(messages['steps.label.annenForelder'])[1]!);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['oppsummering.annenForelder.navn'])).getByText(
                'Ingen Omsorg, 02520489226',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['annenForelder.aleneOmOmsorg'])).getByText(messages['nei'],
            ),
        ).toBeInTheDocument();
    });

    it('Skal vise informasjon om adoptert barn', async () => {
        render(<MorMedAdoptertBarn />);

        expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);

        expect(await screen.findAllByText(messages['steps.label.omBarnet'])).toHaveLength(2);
        const barnetDiv = getCardDiv(screen.getAllByText(messages['steps.label.omBarnet'])[1]!);

        expect(
            checkAndGetParentDiv(barnetDiv.getByText(messages['omBarnet.adopsjonGjelder'])).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText(messages['omBarnet.adopsjonsdato.stebarn'])).getByText('01.10.2021'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(barnetDiv.getByText(messages['omBarnet.antallBarn.adopsjon.født'])).getByText(messages['omBarnet.radiobutton.ettBarn']),
        ).toBeInTheDocument();
    });

    it('Skal vise informasjon om utenlandsopphold', async () => {
        render(<MorMedUtenlandsopphold />);

        expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);
        await userEvent.click(screen.getAllByText(messages['steps.label.utenlandsopphold'])[1]!);

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

        expect(await screen.findAllByText(messages['steps.label.inntektsinformasjon'])).toHaveLength(2);
        expect(
            screen.queryByText('blir kontaktet av Nav for å sende opplysninger om din inntekt', { exact: false }),
        ).toBeInTheDocument();

        const arbeidsforholdOgInntektDiv = getCardDiv(screen.getAllByText(messages['steps.label.inntektsinformasjon'])[1]!);

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
            ).getByText(messages['nei']),
        ).toBeInTheDocument();

        expect(
            checkAndGetParentDiv(
                arbeidsforholdOgInntektDiv.getByText('Har du hatt andre inntektskilder de siste 10 månedene?'),
            ).getByText(messages['nei']),
        ).toBeInTheDocument();
    });

    it(
        'Skal vise informasjon om uttaksplan',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedUførMorUgift.parameters.msw);
            render(<FarMedUførMorUgift />);

            const dinPlanDiv = getCardDiv(screen.getByText(messages['oppsummering.uttak']));
            await dinPlanDiv.findByText('49 uker med 100 prosent foreldrepenger');

            expect(
                checkAndGetParentDiv(dinPlanDiv.getByText(messages['oppsummering.uttak.dekningsgrad.label'])).getByText(
                    '49 uker med 100 prosent foreldrepenger',
                ),
            ).toBeInTheDocument();
            expect(
                checkAndGetParentDiv(dinPlanDiv.getByText('Onsdag 24.11.21 - tirsdag 14.12.21')).getByText(
                    /Foreldrepenger uten aktivitetskrav/,
                ),
            ).toBeInTheDocument();
            expect(
                checkAndGetParentDiv(dinPlanDiv.getByText('Onsdag 15.12.21 - tirsdag 07.06.22')).getByText(
                    /Foreldrepenger med aktivitetskrav/,
                ),
            ).toBeInTheDocument();
            expect(
                checkAndGetParentDiv(
                    dinPlanDiv.getByText(
                        'Ønsker du at vi endrer perioden som starter ved termin til å starte fra fødselsdato når barnet blir født?',
                    ),
                ).getByText(messages['nei']),
            ).toBeInTheDocument();
        }),
    );

    it('Skal vise "Foreldrepenger uten aktivitetskrav" når mor er ufør', async () => {
        render(<FarMedUførMorUgift />);

        const dinPlanDiv = getCardDiv(screen.getByText(messages['oppsummering.uttak']));
        const periodeRow = await screen.findByText('Onsdag 24.11.21 - tirsdag 14.12.21');

        expect(
            checkAndGetParentDiv(
                dinPlanDiv.getByText(
                    'Ønsker du at vi endrer perioden som starter ved termin til å starte fra fødselsdato når barnet blir født?',
                ),
            ).getByText(messages['nei']),
        ).toBeInTheDocument();
        expect(checkAndGetParentDiv(periodeRow).getByText(/Foreldrepenger uten aktivitetskrav/)).toBeInTheDocument();
    });

    it('Skal vise informasjon om at mor har rett til foreldrepenger i EØS', async () => {
        render(<FarMedMorSomHarRettIEØS />);

        expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);

        expect(screen.getAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText(messages['steps.label.annenForelder'])[1]!);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['oppsummering.annenForelder.navn'])).getByText(
                'Anne Forelder, 02520489226',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['annenForelder.aleneOmOmsorg'])).getByText(
                'Ja',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.harRettPåForeldrepengerINorge']),
            ).getByText(messages['nei']),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.harOppholdtSegIEØS'],
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.harRettPåForeldrepengerIEØS'],
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
    });

    it(
        'Skal ikke vise spørsmål om annen forelder har rett hvis de har innvilget perioder fra vedtak',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedMorSomHarVedtak.parameters.msw);
            render(<FarMedMorSomHarVedtak />);

            expect(screen.getAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);
            await waitFor(() => {
                expect(
                    screen.queryByText(messages['annenForelder.harRettPåForeldrepengerINorge'], { exact: false }),
                ).not.toBeInTheDocument();
            });
        }),
    );

    it('Skal vise informasjon om at mor har hatt opphold men ikke rett til foreldrepenger i EØS', async () => {
        render(<FarMedMorSomHarRettIEØS />);

        expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);

        expect(screen.getAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);
        const denAndreForelderenDiv = getCardDiv(screen.getAllByText(messages['steps.label.annenForelder'])[1]!);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['oppsummering.annenForelder.navn'])).getByText(
                'Anne Forelder, 02520489226',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['annenForelder.aleneOmOmsorg'])).getByText(
                'Ja',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.harRettPåForeldrepengerINorge']),
            ).getByText(messages['nei']),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.harOppholdtSegIEØS'],
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.harRettPåForeldrepengerIEØS'],
                ),
            ).getByText('Ja'),
        ).toBeInTheDocument();
    });

    it('Skal vise informasjon om at mor har rett til foreldrepenger i Norge og ikke vise info om EØS eller uføretrygd', async () => {
        render(<FarMedMorSomHarRettINorge />);

        expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);

        const denAndreForelderenDiv = getCardDiv(screen.getAllByText(messages['steps.label.annenForelder'])[1]!);

        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['oppsummering.annenForelder.navn'])).getByText(
                'Frida Norsk, 02520489226',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(denAndreForelderenDiv.getByText(messages['annenForelder.aleneOmOmsorg'])).getByText(
                'Ja',
            ),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.harRettPåForeldrepengerINorge']),
            ).getByText('Ja'),
        ).toBeInTheDocument();
        expect(
            checkAndGetParentDiv(
                denAndreForelderenDiv.getByText(messages['annenForelder.spørsmål.erAnnenForelderInformert']),
            ).getByText(messages['nei']),
        ).toBeInTheDocument();
    });

    it('Skal gå til dokumentasjon når førstegangssøknad og en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);
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

        expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.DOKUMENTASJON,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it(
        'Far er hovedsøker - Skal vise krav om dokumentasjon for mors arbeid når hun jobber mindre enn 75%',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarSøkerMorMåDokumentereArbeid.parameters.msw);
            render(<FarSøkerMorMåDokumentereArbeid />);

            expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);

            expect(screen.getByText(messages['oppsummering.annenForelder.navn'])).toBeInTheDocument();
            expect(screen.getByText('Kari Nordmann, 02520489226')).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.spørsmål.erAnnenForelderInformert'])).toBeInTheDocument();
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

            expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);

            expect(screen.getByText(messages['oppsummering.annenForelder.navn'])).toBeInTheDocument();
            expect(screen.getByText('Kari Nordmann, 02520489226')).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.spørsmål.erAnnenForelderInformert'])).toBeInTheDocument();
            expect(screen.getAllByText('Ja')).toHaveLength(5);

            expect(
                screen.getByText(messages['oppsummering.AnnenPartPerioderInfomelding'],
                ),
            ).toBeInTheDocument();

            expect(screen.getByText(messages['oppsummering.uttak.dine.perioder.annenpart'])).toBeInTheDocument();
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

            expect(await screen.findAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);

            expect(screen.getByText(messages['oppsummering.annenForelder.navn'])).toBeInTheDocument();
            expect(screen.getByText('Kari Nordmann, 02520489226')).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.spørsmål.erAnnenForelderInformert'])).toBeInTheDocument();
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

            expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);

            expect(screen.getByText(messages['oppsummering.annenForelder.navn'])).toBeInTheDocument();
            expect(screen.getByText('Kari Nordmann, 02520489226')).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
            expect(screen.getByText(messages['annenForelder.spørsmål.erAnnenForelderInformert'])).toBeInTheDocument();
            expect(screen.getAllByText('Ja')).toHaveLength(4);

            expect(screen.queryByText(messages['manglendeVedlegg.morJobber.label'])).not.toBeInTheDocument();
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

            expect(screen.getByText(messages['manglendeVedlegg.studerer.description.punkt1'])).toBeInTheDocument();
            expect(screen.getByText(messages['manglendeVedlegg.studerer.description.punkt2'])).toBeInTheDocument();
            expect(screen.getByText(messages['manglendeVedlegg.studerer.description.punkt3'])).toBeInTheDocument();
            expect(
                screen.getByText(messages['manglendeVedlegg.studerer.description.punkt4'],
                ),
            ).toBeInTheDocument();
        }),
    );
});
