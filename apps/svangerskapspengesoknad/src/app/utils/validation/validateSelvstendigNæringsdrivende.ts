import { FormikErrors } from 'formik';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import { erGyldigNorskOrgnummer } from './utils/organisasjonsnummer';
import Valideringsfeil from 'app/types/Valideringsfeil';
import { set } from 'lodash';

type SelvstendigNæringsdrivendeFeil = FormikErrors<Næring>;

const validateSelvstendigNæringsdrivende =
    () =>
    (næring: Partial<Næring>): SelvstendigNæringsdrivendeFeil => {
        const errors: SelvstendigNæringsdrivendeFeil = {};

        if (næring.navnPåNæringen && næring.navnPåNæringen.length > 100) {
            errors.navnPåNæringen = 'valideringsfeil.feltetKanVæreMax100Tegn';
        }

        if (næring.organisasjonsnummer && !erGyldigNorskOrgnummer(næring.organisasjonsnummer)) {
            errors.organisasjonsnummer =
                næring.organisasjonsnummer.length !== 9
                    ? 'valideringsfeil.måBeståAv9Siffer'
                    : 'valideringsfeil.ugyldigOrganisasjonsnummer';
        }

        if (
            (næring.næringsinntekt && isNaN(Number(næring.næringsinntekt))) ||
            (næring.næringsinntekt && (næring.næringsinntekt.includes(',') || næring.næringsinntekt.includes('.')))
        ) {
            errors.næringsinntekt = Valideringsfeil.MÅ_VÆRE_HELTALL;
        }

        if (næring.revisor) {
            const revisor = næring.revisor;
            if (revisor.navn && revisor.navn.length > 100) {
                set(errors, ['revisor', 'navn'], 'valideringsfeil.feltetKanVæreMax100Tegn');
            }
            if (revisor.navn && revisor.telefonnummer.length > 100) {
                set(errors, ['revisor', 'telefonnummer'], 'valideringsfeil.feltetKanVæreMax100Tegn');
            }
        }

        if (næring.regnskapsfører) {
            const regnskapsfører = næring.regnskapsfører;
            if (regnskapsfører.navn && regnskapsfører.navn.length > 100) {
                set(errors, ['regnskapsfører', 'navn'], 'valideringsfeil.feltetKanVæreMax100Tegn');
            }
            if (regnskapsfører.navn && regnskapsfører.telefonnummer.length > 100) {
                set(errors, ['regnskapsfører', 'telefonnummer'], 'valideringsfeil.feltetKanVæreMax100Tegn');
            }
        }

        if (næring.endringAvNæringsinntektInformasjon) {
            if (
                næring.endringAvNæringsinntektInformasjon.forklaring &&
                næring.endringAvNæringsinntektInformasjon.forklaring.length > 1000
            ) {
                set(
                    errors,
                    ['endringAvNæringsinntektInformasjon', 'forklaring'],
                    'valideringsfeil.feltetKanVæreMax1000Tegn'
                );
            }

            const næringsinntektEtterEndring = næring.endringAvNæringsinntektInformasjon.næringsinntektEtterEndring;
            if (
                (næringsinntektEtterEndring && isNaN(Number(næringsinntektEtterEndring))) ||
                (næringsinntektEtterEndring &&
                    (næringsinntektEtterEndring.includes(',') || næringsinntektEtterEndring.includes('.')))
            ) {
                set(
                    errors,
                    ['endringAvNæringsinntektInformasjon', 'næringsinntektEtterEndring'],
                    Valideringsfeil.MÅ_VÆRE_HELTALL
                );
            }
        }

        return errors;
    };
export default validateSelvstendigNæringsdrivende;
