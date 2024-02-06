import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { Skjemanummer } from '@navikt/fp-constants';

import { ContextDataType } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import * as stories from './Inntektsinformasjon.stories';

const { HarIkkeArbeidsforhold, HarArbeidsforhold } = composeStories(stories);

//TODO (TOR) Testane her må i større grad testa output frå onSubmit-funksjonen. Kan testast gjennom 'gåTilNesteSide'

describe('<Inntektsinformasjon>', () => {
    it('skal ikke ha arbeidsforhold og velger nei på alle spørsmål', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <HarIkkeArbeidsforhold
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(
            screen.getByText('Har du jobbet og hatt inntekt som frilanser de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(
            screen.getByText('Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[1]);

        expect(screen.getByText('Har du hatt andre inntektskilder de siste 10 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[2]);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(3);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                andreInntekterSiste10Mnd: [],
                frilansInformasjon: undefined,
                harHattAnnenInntektSiste10Mnd: false,
                harJobbetSomFrilansSiste10Mnd: false,
                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                selvstendigNæringsdrivendeInformasjon: [],
            },
            key: ContextDataType.SØKER_DATA,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: {
                [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: [],
                [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: [],
            },
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: SøknadRoutes.OPPSUMMERING,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til senere utenlandsopphold når en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <HarIkkeArbeidsforhold
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.SENERE_UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til tidligere utenlandsopphold når en ikke har senere utenlandsopphold og går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <HarIkkeArbeidsforhold
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                utenlandsopphold={{
                    iNorgeNeste12Mnd: true,
                    iNorgeSiste12Mnd: false,
                }}
            />,
        );

        expect(await screen.findByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til utenlandsopphold-oversikt når en ikke har tidligere eller senere utenlandsopphold og går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <HarIkkeArbeidsforhold
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                utenlandsopphold={{
                    iNorgeNeste12Mnd: true,
                    iNorgeSiste12Mnd: true,
                }}
            />,
        );

        expect(await screen.findByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal ikke ha arbeidsforhold men velger at en har jobbet som frilanser', async () => {
        render(<HarIkkeArbeidsforhold />);

        expect(await screen.findByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(
            screen.getByText('Har du jobbet og hatt inntekt som frilanser de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Når startet du som frilanser?')).toBeInTheDocument();

        const startetInput = screen.getByRole('textbox');
        await userEvent.type(startetInput, dayjs().subtract(5, 'M').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(
            screen.getByText('Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Har du hatt andre inntektskilder de siste 10 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[3]);

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    test.skip('skal ikke ha arbeidsforhold men velger at en har jobbet som frilanser for nær venn', async () => {
        render(<HarIkkeArbeidsforhold />);

        expect(await screen.findByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(
            screen.getByText('Har du jobbet og hatt inntekt som frilanser de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Når startet du som frilanser?')).toBeInTheDocument();

        const startetInput = screen.getByRole('textbox');
        await userEvent.type(startetInput, dayjs().subtract(5, 'M').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(
            screen.getByText('Har du hatt oppdrag for nær venn eller familie de 10 siste månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[2]);

        expect(screen.getByText('Legg til oppdrag')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til oppdrag'));

        const virksomhetInput = screen.getByLabelText('Navn på oppdragsgiver');
        await userEvent.type(virksomhetInput, 'Espens landhandel');

        const fraOgMedInput = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMedInput, dayjs().subtract(5, 'M').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Er oppdraget pågående?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[5]);

        expect(screen.getByText('Til og med')).toBeInTheDocument();

        const tilOgMedInput = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMedInput, dayjs().subtract(1, 'M').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Ok')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ok'));

        expect(screen.getByText('Har du inntekt som fosterforelder?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[3]);

        expect(
            screen.getByText('Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[4]);

        expect(screen.getByText('Har du hatt andre inntektskilder de siste 10 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[5]);

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    test.skip('skal ikke ha arbeidsforhold men velger at en har jobbet som selvstendig næringsdrivende', async () => {
        render(<HarIkkeArbeidsforhold />);

        expect(await screen.findByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(
            screen.getByText('Har du jobbet og hatt inntekt som frilanser de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(
            screen.getByText('Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Legg til virksomhet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til virksomhet'));

        expect(screen.getByText('Fiske')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Fiske'));

        expect(screen.getByText('Hva heter virksomheten din?')).toBeInTheDocument();
        const virksomhetInput = screen.getByLabelText('Hva heter virksomheten din?');
        await userEvent.type(virksomhetInput, 'Espens landhandel');

        expect(screen.getByText('Er Espens landhandel registrert i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[3]);

        expect(screen.getByText('Hva er organisasjonsnummeret?')).toBeInTheDocument();

        const orgnrInput = screen.getByLabelText('Hva er organisasjonsnummeret?');
        await userEvent.type(orgnrInput, '997519485');

        expect(screen.getByText('Når startet du Espens landhandel?')).toBeInTheDocument();

        const startetInput = screen.getByLabelText('Når startet du Espens landhandel?');
        await userEvent.type(startetInput, '01.01.2021');
        await userEvent.tab();

        expect(screen.getByText('Er Espens landhandel pågående?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[4]);

        expect(
            screen.getByText(
                'Hva har du hatt i næringsresultat før skatt de siste 12 månedene? Hvis virksomheten har vart i kortere tid, kan du bruke denne perioden og regne om til årsinntekt. Oppgi beløpet i hele kroner.',
            ),
        ).toBeInTheDocument();
        const næringsresultatText = screen.getByLabelText(
            'Hva har du hatt i næringsresultat før skatt de siste 12 månedene? Hvis virksomheten har vart i kortere tid, kan du bruke denne perioden og regne om til årsinntekt. Oppgi beløpet i hele kroner.',
        );
        await userEvent.type(næringsresultatText, '100000');

        expect(
            screen.getByText('Har du begynt å jobbe i løpet av de 3 siste ferdigliknede årene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[5]);

        expect(screen.getByText('Oppgi dato for når du ble yrkesaktiv')).toBeInTheDocument();
        const yrkesaktivDatoInput = screen.getByLabelText('Oppgi dato for når du ble yrkesaktiv');
        await userEvent.type(yrkesaktivDatoInput, dayjs().subtract(5, 'M').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Har du regnskapsfører?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[6]);

        expect(screen.getByText('Regnskapsførers navn')).toBeInTheDocument();
        const regnskapsførerNavnInput = screen.getByLabelText('Regnskapsførers navn');
        await userEvent.type(regnskapsførerNavnInput, 'Joakim Tester');

        expect(screen.getByText('Regnskapsførers telefonnummer')).toBeInTheDocument();
        const regnskapsførerTlfInput = screen.getByLabelText('Regnskapsførers telefonnummer');
        await userEvent.type(regnskapsførerTlfInput, '555934344');

        expect(screen.getByText('Er regnskapsfører nær venn eller familie?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[7]);

        // Lukker dialog
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Har du hatt andre inntektskilder de siste 10 månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    test.skip('skal ikke ha arbeidsforhold men velger at en har hatt andre inntektskilder (Sluttvederlag) de siste 10 månedene', async () => {
        render(<HarIkkeArbeidsforhold />);

        expect(await screen.findByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        expect(
            screen.getByText('Har du jobbet og hatt inntekt som frilanser de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        expect(
            screen.getByText('Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]);

        expect(screen.getByText('Har du hatt andre inntektskilder de siste 10 månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        expect(screen.getByText('Legg til oppdrag')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legg til oppdrag'));

        expect(screen.getByText('Sluttvederlag')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Sluttvederlag'));

        expect(screen.getByText('Fra og med')).toBeInTheDocument();
        const fraOgMedInput = screen.getByLabelText('Fra og med');
        await userEvent.type(fraOgMedInput, dayjs().subtract(4, 'M').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Pågående')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[3]);

        expect(screen.getByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = screen.getByLabelText('Til og med');
        await userEvent.type(tilOgMedInput, dayjs().subtract(1, 'M').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(
                'Du må legge ved dokumentasjon fra arbeidsgiveren din. Den må vise inntekten og perioden den gjelder for.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Last opp dokumentasjon')).toBeInTheDocument();

        expect(screen.getAllByText('Neste steg')[0]).toBeInTheDocument();
    });

    it('skal ha to arbeidsforhold', async () => {
        render(<HarArbeidsforhold />);

        expect(await screen.findByText('Auto Joachim Bilpleie')).toBeInTheDocument();
        expect(screen.queryByText('Taco Express')).not.toBeInTheDocument();
    });
});
