import { default as Søker } from '../../types/søknad/Søker';
import cleanupNæring from './cleanupNæring';
import cleanupFrilansInformasjon from './cleanupFrilansInformasjon';
import cleanupAnnenInntekt from './cleanupAnnenInntekt';

const cleanupAndreInntekterSteg = (søker: Søker): Søker => {
    const {
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        selvstendigNæringsdrivendeInformasjon,
        harJobbetSomFrilansSiste10Mnd,
        frilansInformasjon,
        harHattAnnenInntektSiste10Mnd,
        andreInntekterSiste10Mnd,
    } = søker;

    if (selvstendigNæringsdrivendeInformasjon) {
        søker.selvstendigNæringsdrivendeInformasjon =
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true
                ? (søker.selvstendigNæringsdrivendeInformasjon = selvstendigNæringsdrivendeInformasjon.map((næring) =>
                      cleanupNæring(næring)
                  ))
                : undefined;
    }

    if (frilansInformasjon) {
        søker.frilansInformasjon =
            harJobbetSomFrilansSiste10Mnd === true ? cleanupFrilansInformasjon(søker) : undefined;
    }

    if (andreInntekterSiste10Mnd) {
        søker.andreInntekterSiste10Mnd =
            harHattAnnenInntektSiste10Mnd === true
                ? (søker.andreInntekterSiste10Mnd = andreInntekterSiste10Mnd.map((inntekt) =>
                      cleanupAnnenInntekt(inntekt)
                  ))
                : undefined;
    }

    return søker;
};

export default cleanupAndreInntekterSteg;
