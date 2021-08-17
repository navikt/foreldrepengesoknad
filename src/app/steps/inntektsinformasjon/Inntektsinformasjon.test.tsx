import React from 'react';
import Modal from 'react-modal';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/inntektsinformasjon/Inntektsinformasjon.stories';
import dayjs from 'dayjs';

const { Default, HarArbeidsforhold } = composeStories(stories);

const IKKE_ARBEIDSFORHOLD_INFO = 'Du er ikke registrert med noen arbeidsforhold.';
const FRILANS_SISTE_10_MÅNEDER_LABEL = 'Har du jobbet og hatt inntekt som frilanser de siste 10 månedene?';
const SELVSTENDIG_SISTE_10_MÅNEDER_LABEL =
    'Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 10 månedene?';
const ANDRE_SISTE_10_MÅNEDER_LABEL = 'Har du hatt andre inntektskilder de siste 10 månedene?';
const GÅ_VIDERE_KNAPP = 'Gå videre';
const JA = 'Ja';
const NEI = 'Nei';
const NÆRINGSRESULTAT_FØR_SKATT =
    'Hva har du hatt i næringsresultat før skatt de siste 12 månedene? Hvis virksomheten har vart i kortere tid, kan du bruke denne perioden og regne om til årsinntekt. Oppgi beløpet i hele kroner.';

//TODO (TOR) Bør ikkje ligga i test
Modal.setAppElement(document.createElement('div'));

describe('<Inntektsinformasjon>', () => {
    it('skal ikke ha arbeidsforhold og velger nei på alle spørsmål', async () => {
        render(<Default />);

        expect(await screen.findByText(IKKE_ARBEIDSFORHOLD_INFO)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        expect(screen.getByText(FRILANS_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText(SELVSTENDIG_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[1]);

        expect(await screen.findByText(ANDRE_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[2]);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ikke ha arbeidsforhold men velger at en har jobbet som frilanser', async () => {
        render(<Default />);

        expect(await screen.findByText(IKKE_ARBEIDSFORHOLD_INFO)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        expect(screen.getByText(FRILANS_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(JA));

        expect(await screen.findByText('Når startet du som frilanser?')).toBeInTheDocument();

        const startetInput = screen.getByRole('textbox');
        userEvent.type(startetInput, dayjs().subtract(5, 'M').format('DD.MM.YYYY'));
        fireEvent.blur(startetInput);

        expect(await screen.findByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[1]);

        expect(
            await screen.findByText('Har du hatt oppdrag for nær venn eller familie de 10 siste månedene?')
        ).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[2]);

        expect(await screen.findByText('Har du inntekt som fosterforelder?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[3]);

        expect(await screen.findByText(SELVSTENDIG_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[4]);

        expect(await screen.findByText(ANDRE_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[5]);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ikke ha arbeidsforhold men velger at en har jobbet som frilanser for nær venn', async () => {
        const utils = render(<Default />);

        expect(await screen.findByText(IKKE_ARBEIDSFORHOLD_INFO)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        expect(screen.getByText(FRILANS_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(JA));

        expect(await screen.findByText('Når startet du som frilanser?')).toBeInTheDocument();

        const startetInput = screen.getByRole('textbox');
        userEvent.type(startetInput, dayjs().subtract(5, 'M').format('DD.MM.YYYY'));
        fireEvent.blur(startetInput);

        expect(await screen.findByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[1]);

        expect(
            await screen.findByText('Har du hatt oppdrag for nær venn eller familie de 10 siste månedene?')
        ).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[2]);

        expect(await screen.findByText('Legg til oppdrag')).toBeInTheDocument();
        userEvent.click(screen.getByText('Legg til oppdrag'));

        const virksomhetInput = utils.getByLabelText('Navn på oppdragsgiver');
        userEvent.type(virksomhetInput, 'Espens landhandel');

        const fraOgMedInput = utils.getByLabelText('Fra og med');
        userEvent.type(fraOgMedInput, dayjs().subtract(5, 'M').format('DD.MM.YYYY'));
        fireEvent.blur(fraOgMedInput);

        expect(await screen.findByText('Er oppdraget pågående?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[5]);

        expect(await screen.findByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = utils.getByLabelText('Til og med');
        userEvent.type(tilOgMedInput, dayjs().subtract(1, 'M').format('DD.MM.YYYY'));
        fireEvent.blur(tilOgMedInput);

        expect(await screen.findByText('Ok')).toBeInTheDocument();
        userEvent.click(screen.getByText('Ok'));

        expect(await screen.findByText('Har du inntekt som fosterforelder?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[3]);

        expect(await screen.findByText(SELVSTENDIG_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[4]);

        expect(await screen.findByText(ANDRE_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[5]);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ikke ha arbeidsforhold men velger at en har jobbet som selvstendig næringsdrivende', async () => {
        const utils = render(<Default />);

        expect(await screen.findByText(IKKE_ARBEIDSFORHOLD_INFO)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        expect(screen.getByText(FRILANS_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText(SELVSTENDIG_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText('Legg til virksomhet')).toBeInTheDocument();
        userEvent.click(screen.getByText('Legg til virksomhet'));

        expect(await screen.findByText('Fiske')).toBeInTheDocument();
        userEvent.click(screen.getByText('Fiske'));

        expect(await screen.findByText('Hva heter virksomheten din?')).toBeInTheDocument();
        const virksomhetInput = utils.getByLabelText('Hva heter virksomheten din?');
        userEvent.type(virksomhetInput, 'Espens landhandel');

        expect(await screen.findByText('Er Espens landhandel registrert i Norge?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[3]);

        expect(await screen.findByText('Hva er organisasjonsnummeret?')).toBeInTheDocument();
        const orgnrInput = utils.getByLabelText('Hva er organisasjonsnummeret?');
        userEvent.type(orgnrInput, '997519485');

        expect(await screen.findByText('Når startet du Espens landhandel?')).toBeInTheDocument();
        const startetInput = utils.getByLabelText('Når startet du Espens landhandel?');
        userEvent.type(startetInput, '01.01.2021');
        fireEvent.blur(startetInput);

        expect(await screen.findByText('Er Espens landhandel pågående?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[4]);

        expect(await screen.findByText(NÆRINGSRESULTAT_FØR_SKATT)).toBeInTheDocument();
        const næringsresultatText = utils.getByLabelText(NÆRINGSRESULTAT_FØR_SKATT);
        userEvent.type(næringsresultatText, '100000');

        expect(
            await screen.findByText('Har du begynt å jobbe i løpet av de 3 siste ferdigliknede årene?')
        ).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[5]);

        expect(await screen.findByText('Oppgi dato for når du ble yrkesaktiv')).toBeInTheDocument();
        const yrkesaktivDatoInput = utils.getByLabelText('Oppgi dato for når du ble yrkesaktiv');
        userEvent.type(yrkesaktivDatoInput, dayjs().subtract(5, 'M').format('DD.MM.YYYY'));
        fireEvent.blur(yrkesaktivDatoInput);

        expect(await screen.findByText('Har du regnskapsfører?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[6]);

        expect(await screen.findByText('Regnskapsførers navn')).toBeInTheDocument();
        const regnskapsførerNavnInput = utils.getByLabelText('Regnskapsførers navn');
        userEvent.type(regnskapsførerNavnInput, 'Joakim Tester');

        expect(await screen.findByText('Regnskapsførers telefonnummer')).toBeInTheDocument();
        const regnskapsførerTlfInput = utils.getByLabelText('Regnskapsførers telefonnummer');
        userEvent.type(regnskapsførerTlfInput, '555934344');

        expect(await screen.findByText('Er egnskapsfører er nær venn eller familie?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[7]);

        // Lukker dialog
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        expect(await screen.findByText(ANDRE_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[2]);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ikke ha arbeidsforhold men velger at en har hatt andre inntektskilder (Sluttvederlag) de siste 10 månedene', async () => {
        const utils = render(<Default />);

        expect(await screen.findByText(IKKE_ARBEIDSFORHOLD_INFO)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        expect(screen.getByText(FRILANS_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText(SELVSTENDIG_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[1]);

        expect(await screen.findByText(ANDRE_SISTE_10_MÅNEDER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[2]);

        expect(await screen.findByText('Legg til oppdrag')).toBeInTheDocument();
        userEvent.click(screen.getByText('Legg til oppdrag'));

        expect(await screen.findByText('Sluttvederlag')).toBeInTheDocument();
        userEvent.click(screen.getByText('Sluttvederlag'));

        expect(await screen.findByText('Fra og med')).toBeInTheDocument();
        const fraOgMedInput = utils.getByLabelText('Fra og med');
        userEvent.type(fraOgMedInput, dayjs().subtract(4, 'M').format('DD.MM.YYYY'));
        fireEvent.blur(fraOgMedInput);

        expect(await screen.findByText('Pågående')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(NEI)[3]);

        expect(await screen.findByText('Til og med')).toBeInTheDocument();
        const tilOgMedInput = utils.getByLabelText('Til og med');
        userEvent.type(tilOgMedInput, dayjs().subtract(1, 'M').format('DD.MM.YYYY'));
        fireEvent.blur(tilOgMedInput);

        expect(
            await screen.findByText(
                'Du må legge ved dokumentasjon fra arbeidsgiveren din. Den må vise inntekten og perioden den gjelder for.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Last opp dokumentasjon')).toBeInTheDocument();

        expect(screen.getAllByText(GÅ_VIDERE_KNAPP)[0]).toBeInTheDocument();
    });

    it('skal ha to arbeidsforhold', async () => {
        render(<HarArbeidsforhold />);

        expect(await screen.findByText('Auto Joachim Bilpleie')).toBeInTheDocument();
        expect(screen.getByText('Taco Express')).toBeInTheDocument();
    });
});
