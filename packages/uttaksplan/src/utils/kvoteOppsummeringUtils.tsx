import { useUttaksplanData } from '../context/UttaksplanDataContext';
import {
    beregnKvoteFordeling,
    filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger,
    finnAntallDagerDerKunEnHarForeldrepenger,
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

export const useKvoteFordeling = () => {
    const { uttakPerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();

    return beregnKvoteFordeling(uttakPerioder, valgtStønadskvote.kontoer, familiesituasjon, familiehendelsedato);
};

export const useTellDagerIUttaksPeriodene = () => {
    const { uttakPerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato } = useUttaksplanData();

    const filtrertePerioder = uttakPerioder.filter(filtrerBortUtsettelserOgAvslåttePerioderMenBeholdPleiepenger);

    return tellDagerIUttaksPeriodene(filtrertePerioder, familiesituasjon, valgtStønadskvote, familiehendelsedato);
};

export const useUbrukteDagerPerKontoKunEnHarRett = () => {
    const { familiesituasjon } = useUttaksplanData();
    const fordelinger = useKvoteFordeling();
    const aktivitetsfri = fordelinger.find((k) => k.konto.konto === 'AKTIVITETSFRI_KVOTE');
    const medAktivitetskrav = fordelinger.find((k) => k.konto.konto === 'FORELDREPENGER');
    const førFødsel = fordelinger.find((k) => k.konto.konto === 'FORELDREPENGER_FØR_FØDSEL');

    const ubrukteFørFødselDager =
        førFødsel && familiesituasjon !== 'fødsel' ? Math.max(0, førFødsel.konto.dager - førFødsel.brukteDager) : 0;

    const aktivitetsfriDiff = aktivitetsfri ? aktivitetsfri.konto.dager - aktivitetsfri.brukteDager : 0;
    const medAktivitetskravDiff = medAktivitetskrav
        ? medAktivitetskrav.konto.dager - medAktivitetskrav.brukteDager + ubrukteFørFødselDager
        : 0;

    return {
        ubrukteDagerAktivitetsfri: Math.max(0, aktivitetsfriDiff),
        ubrukteDagerMedAktivitetskrav: Math.max(0, medAktivitetskravDiff),
        overtrukketDagerAktivitetsfri: aktivitetsfriDiff < 0 ? aktivitetsfriDiff * -1 : 0,
        overtrukketDagerMedAktivitetskrav: medAktivitetskravDiff < 0 ? medAktivitetskravDiff * -1 : 0,
    };
};
