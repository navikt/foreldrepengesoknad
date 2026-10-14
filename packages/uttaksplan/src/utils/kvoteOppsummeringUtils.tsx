import { useUttaksplanData } from '../context/UttaksplanDataContext';
import {
    filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger,
    finnAntallDagerDerKunEnHarForeldrepenger,
    summerDagerIPerioder,
    tellDagerIUttaksPeriodene,
} from './kvoteBeregning';

export const useErAntallDagerOvertrukketIUttaksplan = () => {
    const {
        foreldreInfo: { rettighetType },
        perioder,
        familiesituasjon,
        valgtStønadskvote,
        familiehendelsedato,
    } = useUttaksplanData();

    const filtrertePerioder = perioder.map(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    if (rettighetType === 'ALENEOMSORG' || rettighetType === 'BARE_SØKER_RETT') {
        return (
            finnAntallDagerDerKunEnHarForeldrepenger(
                filtrertePerioder,
                familiesituasjon,
                valgtStønadskvote,
                familiehendelsedato,
            ).antallOvertrukketDager > 0
        );
    }

    return (
        tellDagerIUttaksPeriodene(filtrertePerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato)
            .antallOvertrukketDager > 0
    );
};

export const useTellDagerIUttaksPeriodene = () => {
    const { perioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();

    const filtrertePerioder = perioder.map(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    return tellDagerIUttaksPeriodene(filtrertePerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato);
};

export const useUbrukteDagerPerKontoKunEnHarRett = () => {
    const { perioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();
    const filtrertePerioder = perioder.map(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    const aktivitetsfriKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const foreldrepengerKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const førFødselKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');

    // summerDagerIPerioder avgrensar sjølv til kontoen sin kontotype (sjå kvoteBeregning.ts),
    // så periodene under treng ikkje forhandsfiltrerast per konto slik det gamle, flate
    // periodeformatet krevde.
    const bruktAktivitetsfri = aktivitetsfriKonto
        ? summerDagerIPerioder(filtrertePerioder, [aktivitetsfriKonto], familiesituasjon, familiehendelsedato)
        : 0;

    const bruktMedAktivitetskrav = foreldrepengerKonto
        ? summerDagerIPerioder(filtrertePerioder, [foreldrepengerKonto], familiesituasjon, familiehendelsedato)
        : 0;

    const bruktFørFødsel = førFødselKonto
        ? summerDagerIPerioder(filtrertePerioder, [førFødselKonto], familiesituasjon, familiehendelsedato)
        : 0;

    const ubrukteFørFødselDager =
        førFødselKonto && familiesituasjon !== 'fødsel' ? Math.max(0, førFødselKonto.dager - bruktFørFødsel) : 0;

    const aktivitetsfriDiff = aktivitetsfriKonto ? aktivitetsfriKonto.dager - bruktAktivitetsfri : 0;
    const medAktivitetskravDiff = foreldrepengerKonto
        ? foreldrepengerKonto.dager - bruktMedAktivitetskrav + ubrukteFørFødselDager
        : 0;

    return {
        ubrukteDagerAktivitetsfri: Math.max(0, aktivitetsfriDiff),
        ubrukteDagerMedAktivitetskrav: Math.max(0, medAktivitetskravDiff),
        overtrukketDagerAktivitetsfri: aktivitetsfriDiff < 0 ? aktivitetsfriDiff * -1 : 0,
        overtrukketDagerMedAktivitetskrav: medAktivitetskravDiff < 0 ? medAktivitetskravDiff * -1 : 0,
    };
};
