import {
    Periode,
    UtsettelseÅrsakType,
    StønadskontoType,
    Uttaksperiode,
    Utsettelsesperiode,
} from '../../../types/uttaksplan/periodetyper';
import { Periodene } from '../../uttaksplan/Periodene';
import { isValidTidsperiode, Tidsperioden } from '../../uttaksplan/Tidsperioden';
import { Forelder } from 'common/types';
import { uttaksdatoer } from '../../uttaksplan/uttaksdatoer';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

const periodeErFørDato = ({ tidsperiode }: Periode, dato: Date): boolean => {
    return isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(dato);
};

export const harMorSøktUgyldigUttakFørsteSeksUker = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    situasjon: Søkersituasjon,
    flerbarnsFødsel?: boolean
): boolean => {
    return (
        getUgyldigUttak(perioder, familiehendelsesdato, situasjon, flerbarnsFødsel, 'førsteSeksUkerForMor').length > 0
    );
};

export const getUgyldigUttak = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    situasjon: Søkersituasjon,
    flerbarnsFødsel?: boolean,
    value?: string
): Periode[] => {
    if (situasjon === Søkersituasjon.ADOPSJON) {
        return [];
    }

    const førsteUttaksdag = uttaksdatoer(familiehendelsesdato).førsteUttaksdagPåEllerEtterFødsel;
    const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdag).leggTil(30);
    const førsteUttaksdagEtterÅtteUker = Uttaksdagen(førsteUttaksdag).leggTil(40);

    let ugyldigUttakRegelFørsteDato: Date;
    let ugyldigUttakRegelSisteDato: Date;

    if (value === 'førsteSeksUkerForMor') {
        ugyldigUttakRegelFørsteDato = førsteUttaksdag;
        ugyldigUttakRegelSisteDato = førsteUttaksdagEtterSeksUker;
    } else if (value === 'mellomSyvOgÅtteUkerForMor') {
        ugyldigUttakRegelFørsteDato! = førsteUttaksdagEtterSeksUker;
        ugyldigUttakRegelSisteDato! = førsteUttaksdagEtterÅtteUker;
    }

    const ugyldigPeriode = Periodene(perioder)
        .getPerioderEtterFamiliehendelsesdato(ugyldigUttakRegelFørsteDato!)
        .filter((p) => periodeErFørDato(p, ugyldigUttakRegelSisteDato));

    let ugyldigeUtsettelser: Utsettelsesperiode[] = [];

    if (value === 'mellomSyvOgÅtteUkerForMor') {
        ugyldigeUtsettelser = Periodene(ugyldigPeriode)
            .getUtsettelser()
            .filter(
                (p) =>
                    p.forelder === Forelder.mor &&
                    (p.årsak === UtsettelseÅrsakType.Ferie || p.årsak === UtsettelseÅrsakType.Arbeid)
            );
    } else if (value === 'førsteSeksUkerForMor') {
        ugyldigeUtsettelser = Periodene(ugyldigPeriode)
            .getUtsettelser()
            .filter(
                (p) =>
                    p.forelder === Forelder.mor &&
                    p.årsak !== UtsettelseÅrsakType.InstitusjonSøker &&
                    p.årsak !== UtsettelseÅrsakType.InstitusjonBarnet &&
                    p.årsak !== UtsettelseÅrsakType.Sykdom
            );
    }
    const gradertePerioder = Periodene(ugyldigPeriode)
        .getUttak()
        .filter((p) => p.forelder === Forelder.mor && p.gradert === true);

    const flernbarnsPerioder = Periodene(ugyldigPeriode)
        .getUttak()
        .filter((p) => p.forelder === Forelder.mor && p.ønskerFlerbarnsdager === true);

    const fellesPerioder = Periodene(ugyldigPeriode)
        .getUttak()
        .filter((p) => p.forelder === Forelder.mor && p.konto === StønadskontoType.Fellesperiode);

    let samtidigUttaksperioder: Uttaksperiode[] = [];

    if (!flerbarnsFødsel && flerbarnsFødsel !== undefined) {
        samtidigUttaksperioder = Periodene(ugyldigPeriode)
            .getUttak()
            .filter((p) => p.forelder === Forelder.mor && p.ønskerSamtidigUttak);
    }

    return [
        ...flernbarnsPerioder,
        ...gradertePerioder,
        ...ugyldigeUtsettelser,
        ...fellesPerioder,
        ...samtidigUttaksperioder,
    ];
};
