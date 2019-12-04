import { Næring } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import visibility from '../../steg/andreInntekter/selvstendigNæringsdrivendeModal/visibility';

const cleanupNæring = (næring: Næring): Næring => {
    const {
        registrertILand,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        oppstartsdato,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        harRegnskapsfører,
        harRevisor,
        næringsinntekt,
        kanInnhenteOpplsyningerFraRevisor,
        regnskapsfører,
        revisor,
        organisasjonsnummer,
        endringAvNæringsinntektInformasjon,
        ...rest
    } = næring;

    const hattVarigEndring = visibility.varigEndringAvNæringsinntekt(næring)
        ? hattVarigEndringAvNæringsinntektSiste4Kalenderår
        : undefined;

    const newNæring: Partial<Næring> = {
        næringsinntekt: visibility.næringsinntekt(næring) ? næringsinntekt : undefined,
        registrertILand: visibility.næringRegistrertILand(næring) ? registrertILand : undefined,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: visibility.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene(
            næring
        )
            ? harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
            : undefined,
        organisasjonsnummer: næring.registrertINorge === true ? organisasjonsnummer : undefined,
        oppstartsdato: visibility.oppstartsdato(næring) ? oppstartsdato : undefined,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: hattVarigEndring,
        harRevisor: visibility.revisorBolk(næring) ? harRevisor : undefined,
        regnskapsfører: harRegnskapsfører ? regnskapsfører : undefined,
        harRegnskapsfører,
        revisor: harRevisor ? revisor : undefined,
        kanInnhenteOpplsyningerFraRevisor:
            harRevisor && visibility.kanInnhenteOpplysningerFraRevisor(næring)
                ? kanInnhenteOpplsyningerFraRevisor
                : undefined,
        endringAvNæringsinntektInformasjon: hattVarigEndring ? endringAvNæringsinntektInformasjon : undefined,
        ...rest
    };

    return newNæring as Næring;
};

export default cleanupNæring;
