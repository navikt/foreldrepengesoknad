import { Næring } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import visibility from '../../components/selvstendig-næringsdrivende-modal/visibility';

const cleanupNæring = (næring: Næring): Næring => {
    const {
        registrertILand,
        nyIArbeidslivet,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        harRegnskapsfører,
        harRevisor,
        kanInnhenteOpplsyningerFraRevisor,
        regnskapsfører,
        revisor,
        ...rest
    } = næring;

    const newNæring = {
        registrertILand: visibility.næringRegistrertILand(næring) ? registrertILand : undefined,
        nyIArbeidslivet: visibility.nyIArbeidslivet(næring) ? nyIArbeidslivet : undefined,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: visibility.varigEndringAvNæringsinntekt(næring)
            ? hattVarigEndringAvNæringsinntektSiste4Kalenderår
            : undefined,
        harRevisor: visibility.revisorBolk(næring) ? harRevisor : undefined,
        regnskapsfører: harRegnskapsfører ? regnskapsfører : undefined,
        harRegnskapsfører,
        revisor: harRevisor ? revisor : undefined,
        kanInnhenteOpplsyningerFraRevisor:
            harRevisor && visibility.kanInnhenteOpplysningerFraRevisor(næring)
                ? kanInnhenteOpplsyningerFraRevisor
                : undefined,
        ...rest
    };

    return newNæring as Næring;
};

export default cleanupNæring;
