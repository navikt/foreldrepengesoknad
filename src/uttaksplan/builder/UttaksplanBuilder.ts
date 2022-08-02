import {
    isForeldrepengerFørFødselUttaksperiode,
    isInfoPeriode,
    isUtsettelsesperiode,
    Periode,
} from 'uttaksplan/types/Periode';
import { leggTilPeriode } from './leggTilPeriode';
import { oppdaterPeriode } from './oppdaterPeriode';
import { slettPeriode } from './slettPeriode';
import {
    finnOgSettInnHull,
    fjernUnødvendigeHull,
    resetTidsperioder,
    settInnAnnenPartsUttakOmNødvendig,
    slåSammenLikePerioder,
} from './uttaksplanbuilderUtils';

const leggTilPeriodeOgBuild = (
    bevegeligePerioder: Periode[],
    fastePerioder: Periode[],
    nyPeriode: Periode,
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Periode[] | undefined
) => {
    let nyePerioder = slåSammenLikePerioder(
        leggTilPeriode({
            perioder: bevegeligePerioder,
            nyPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
        }),
        familiehendelsesdato
    );

    fastePerioder.forEach((fastPeriode) => {
        nyePerioder = leggTilPeriode({
            perioder: nyePerioder,
            nyPeriode: fastPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
        });
    });

    if (annenPartsUttak) {
        nyePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttakOmNødvendig(nyePerioder, annenPartsUttak, familiehendelsesdato),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor
        );
    }

    return nyePerioder;
};

const oppdaterPeriodeOgBuild = (
    endretPeriode: Periode,
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Periode[] | undefined
) => {
    const originalPeriode = perioder.find((p) => p.id === endretPeriode.id)!;

    let oppdatertePerioder = fjernUnødvendigeHull(
        oppdaterPeriode({
            perioder,
            endretPeriode,
            originalPeriode,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
        })
    );

    if (annenPartsUttak) {
        oppdatertePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttakOmNødvendig(oppdatertePerioder, annenPartsUttak, familiehendelsesdato),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor
        );
    }

    return oppdatertePerioder;
};

const slettPeriodeOgBuild = (
    perioder: Periode[],
    slettetPeriode: Periode,
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    annenPartsUttak: Periode[] | undefined
) => {
    let nyePerioder = fjernUnødvendigeHull(
        slåSammenLikePerioder(
            slettPeriode({
                perioder,
                slettetPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
            }),
            familiehendelsesdato
        )
    );

    if (annenPartsUttak) {
        nyePerioder = finnOgSettInnHull(
            settInnAnnenPartsUttakOmNødvendig(nyePerioder, annenPartsUttak, familiehendelsesdato),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor
        );
    }

    return nyePerioder;
};

const UttaksplanbuilderNew = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    opprinneligPlan?: Periode[]
) => {
    const fastePerioder = perioder.filter((p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p));
    const bevegeligePerioder = resetTidsperioder(
        perioder.filter((p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p)),
        familiehendelsesdato
    );
    let annenPartsUttak: Periode[] | undefined = undefined;

    if (opprinneligPlan) {
        annenPartsUttak = opprinneligPlan.filter((p) => isInfoPeriode(p));
    }

    return {
        leggTilPeriode: (nyPeriode: Periode) =>
            leggTilPeriodeOgBuild(
                bevegeligePerioder,
                fastePerioder,
                nyPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
                annenPartsUttak
            ),
        leggTilPerioder: (nyePerioder: Periode[]) => {
            let resultat: Periode[] = [];
            nyePerioder.forEach((periode, index) => {
                if (index === 0) {
                    resultat = leggTilPeriodeOgBuild(
                        bevegeligePerioder,
                        fastePerioder,
                        periode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak
                    );
                } else {
                    const uttaksplanUtenAnnenPartsSamtidigUttak = resultat.filter(
                        (p) => !(isInfoPeriode(p) && !p.visPeriodeIPlan)
                    );
                    const nyFastePerioder = uttaksplanUtenAnnenPartsSamtidigUttak.filter(
                        (p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p)
                    );
                    const nyBevegeligePerioder = resetTidsperioder(
                        uttaksplanUtenAnnenPartsSamtidigUttak.filter(
                            (p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p)
                        ),
                        familiehendelsesdato
                    );
                    resultat = leggTilPeriodeOgBuild(
                        nyBevegeligePerioder,
                        nyFastePerioder,
                        periode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak
                    );
                }
            });
            return resultat;
        },
        oppdaterPeriode: (endretPeriode: Periode) =>
            oppdaterPeriodeOgBuild(
                endretPeriode,
                perioder,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
                annenPartsUttak
            ),
        oppdaterPerioder: (oppdatertePerioder: Periode[]) => {
            let resultat: Periode[] = [];
            oppdatertePerioder.forEach((endretPeriode, index) => {
                if (index === 0) {
                    resultat = oppdaterPeriodeOgBuild(
                        endretPeriode,
                        perioder,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak
                    );
                } else {
                    const uttaksplanUtenAnnenPartsSamtidigUttak = resultat.filter(
                        (p) => !(isInfoPeriode(p) && !p.visPeriodeIPlan)
                    );
                    const nyFastePerioder = uttaksplanUtenAnnenPartsSamtidigUttak.filter(
                        (p) => isUtsettelsesperiode(p) || isForeldrepengerFørFødselUttaksperiode(p)
                    );
                    const nyBevegeligePerioder = resetTidsperioder(
                        uttaksplanUtenAnnenPartsSamtidigUttak.filter(
                            (p) => !isUtsettelsesperiode(p) && !isForeldrepengerFørFødselUttaksperiode(p)
                        ),
                        familiehendelsesdato
                    );
                    resultat = leggTilPeriodeOgBuild(
                        nyBevegeligePerioder,
                        nyFastePerioder,
                        endretPeriode,
                        familiehendelsesdato,
                        harAktivitetskravIPeriodeUtenUttak,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        annenPartsUttak
                    );
                }
            });
            return resultat;
        },
        slettPeriode: (slettetPeriode: Periode) =>
            slettPeriodeOgBuild(
                perioder,
                slettetPeriode,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
                annenPartsUttak
            ),
    };
};

export default UttaksplanbuilderNew;
