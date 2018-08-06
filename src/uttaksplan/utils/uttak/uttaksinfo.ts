import { Tidsperiode } from 'common/types';
import { getTidsperiode, Periodene } from 'uttaksplan/utils';
import { Periode } from 'uttaksplan/types';

export interface Uttaksinfo {
    /** Tidsperiode ut fra første og siste registrerte uttak eller utsettelse */
    registrertTidsperiode: Tidsperiode;
    /** Tidsperiode ut fra første og siste registrerte uttak, utsettelse eller opphold */
    registrertTidsperiodeInkludertOpphold: Tidsperiode;
    /** Siste permisjonsdag ut fra registrerte perioder  */
    sluttdatoGittUttaksdager: Date;
    /** Antall dager som er registrert som uttak */
    antallDagerUttak: number;
    /** Antall uttaksdagerdager som er registrert som utsettelser */
    antallDagerUtsettelser: number;
    /** Antall uttaksdager som ikke er registrert som uttak eller utsettelse i permisjonsperioden */
    antallDagerOpphold: number;
    /** Antall dager som er registrert som uttak, utsettelse eller opphold */
    antallDagerTotalt: number;
}

export const getUttaksinfo = (perioder: Periode[]): Uttaksinfo | undefined => {
    if (perioder.length === 0) {
        return undefined;
    }
    const periodene = Periodene(perioder);
    const antallDagerOpphold = periodene.getAntallDagerOpphold();
    const antallDagerUtsettelser = periodene.getAntallDagerUtsatt();
    const antallDagerUttak = periodene.getAntallDagerUttak();
    const antallDagerTotalt =
        antallDagerOpphold + antallDagerUtsettelser + antallDagerUttak;
    const registrertTidsperiode = periodene.getFørsteOgSisteRegistrerteUttaksdager() as Tidsperiode;
    const registrertTidsperiodeInkludertOpphold = periodene.getFørsteOgSisteRegistrerteUttaksdager(
        true
    ) as Tidsperiode;
    const sluttdatoGittUttaksdager = getTidsperiode(
        registrertTidsperiode.startdato,
        antallDagerTotalt
    ).sluttdato;
    return {
        antallDagerTotalt,
        antallDagerOpphold,
        antallDagerUtsettelser,
        antallDagerUttak,
        registrertTidsperiode,
        registrertTidsperiodeInkludertOpphold,
        sluttdatoGittUttaksdager
    };
};
