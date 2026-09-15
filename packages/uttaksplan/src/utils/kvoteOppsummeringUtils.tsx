import { useUttaksplanData } from '../context/UttaksplanDataContext';
import {
    filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger,
    finnAntallDagerDerKunEnHarForeldrepenger,
    finnOverførteDagerFraAktivitetsfriKvote,
    getUttaksKontoType,
    summerDagerIPerioder,
    tellDagerIUttaksPeriodene,
} from './kvoteBeregning';

export const useErAntallDagerOvertrukketIUttaksplan = () => {
    const {
        foreldreInfo: { rettighetType },
        uttakPerioder,
        familiesituasjon,
        valgtStønadskvote,
        familiehendelsedato,
    } = useUttaksplanData();

    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

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

/** Talet på dagar som er omfordelte frå kvoten med aktivitetskrav til den aktivitetsfrie kvoten. */
export const useOverførteDagerFraAktivitetsfriKvote = () => {
    const { uttakPerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();

    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    return finnOverførteDagerFraAktivitetsfriKvote(
        filtrertePerioder,
        valgtStønadskvote.kontoer,
        familiesituasjon,
        familiehendelsedato,
    );
};

export const useTellDagerIUttaksPeriodene = () => {
    const { uttakPerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();

    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    return tellDagerIUttaksPeriodene(filtrertePerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato);
};

export const useUbrukteDagerPerKontoKunEnHarRett = () => {
    const { uttakPerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();
    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    const kontoer = valgtStønadskvote.kontoer;
    const aktivitetsfriKonto = kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const foreldrepengerKonto = kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const førFødselKonto = kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');

    const overførteDager = finnOverførteDagerFraAktivitetsfriKvote(
        filtrertePerioder,
        kontoer,
        familiesituasjon,
        familiehendelsedato,
    );

    const bruktAktivitetsfri = aktivitetsfriKonto
        ? summerDagerIPerioder(
              filtrertePerioder.filter((p) => getUttaksKontoType(p, kontoer) === 'AKTIVITETSFRI_KVOTE'),
              kontoer,
              familiesituasjon,
              familiehendelsedato,
          )
        : 0;

    const bruktMedAktivitetskrav = foreldrepengerKonto
        ? summerDagerIPerioder(
              filtrertePerioder.filter((p) => getUttaksKontoType(p, kontoer) === 'FORELDREPENGER'),
              kontoer,
              familiesituasjon,
              familiehendelsedato,
          )
        : 0;

    const bruktFørFødsel = førFødselKonto
        ? summerDagerIPerioder(
              filtrertePerioder.filter((p) => getUttaksKontoType(p, kontoer) === 'FORELDREPENGER_FØR_FØDSEL'),
              kontoer,
              familiesituasjon,
              familiehendelsedato,
          )
        : 0;

    const ubrukteFørFødselDager =
        førFødselKonto && familiesituasjon !== 'fødsel' ? Math.max(0, førFødselKonto.dager - bruktFørFødsel) : 0;

    const aktivitetsfriDiff = aktivitetsfriKonto ? aktivitetsfriKonto.dager + overførteDager - bruktAktivitetsfri : 0;
    const medAktivitetskravDiff = foreldrepengerKonto
        ? foreldrepengerKonto.dager - overførteDager - bruktMedAktivitetskrav + ubrukteFørFødselDager
        : 0;

    return {
        ubrukteDagerAktivitetsfri: Math.max(0, aktivitetsfriDiff),
        ubrukteDagerMedAktivitetskrav: Math.max(0, medAktivitetskravDiff),
        overtrukketDagerAktivitetsfri: aktivitetsfriDiff < 0 ? aktivitetsfriDiff * -1 : 0,
        overtrukketDagerMedAktivitetskrav: medAktivitetskravDiff < 0 ? medAktivitetskravDiff * -1 : 0,
    };
};
