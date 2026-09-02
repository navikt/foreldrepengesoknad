import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import {
    filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger,
    finnAntallDagerDerKunEnHarForeldrepenger,
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

export const useTellDagerIUttaksPeriodene = () => {
    const { uttakPerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();

    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    return tellDagerIUttaksPeriodene(filtrertePerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato);
};

export const useUbrukteDagerPerKontoKunEnHarRett = () => {
    const { uttakPerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();
    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    const aktivitetsfriKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const foreldrepengerKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const førFødselKonto = valgtStønadskvote.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');

    const bruktAktivitetsfri = aktivitetsfriKonto
        ? summerDagerIPerioder(
              filtrertePerioder.filter((p) => {
                  const erAktivitetsfriPeriode =
                      erVanligUttakPeriode(p) &&
                      getUttaksKontoType(p) === 'FORELDREPENGER' &&
                      p.morsAktivitet === 'IKKE_OPPGITT';
                  return erAktivitetsfriPeriode || getUttaksKontoType(p) === 'AKTIVITETSFRI_KVOTE';
              }),
              valgtStønadskvote.kontoer,
              familiesituasjon,
              familiehendelsedato,
          )
        : 0;

    const bruktMedAktivitetskrav = foreldrepengerKonto
        ? summerDagerIPerioder(
              filtrertePerioder.filter((p) => {
                  const erAktivitetsfriPeriode =
                      erVanligUttakPeriode(p) &&
                      getUttaksKontoType(p) === 'FORELDREPENGER' &&
                      p.morsAktivitet === 'IKKE_OPPGITT';
                  if (erAktivitetsfriPeriode) {
                      return false;
                  }
                  return getUttaksKontoType(p) === 'FORELDREPENGER';
              }),
              valgtStønadskvote.kontoer,
              familiesituasjon,
              familiehendelsedato,
          )
        : 0;

    const bruktFørFødsel = førFødselKonto
        ? summerDagerIPerioder(
              filtrertePerioder.filter((p) => getUttaksKontoType(p) === 'FORELDREPENGER_FØR_FØDSEL'),
              valgtStønadskvote.kontoer,
              familiesituasjon,
              familiehendelsedato,
          )
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
