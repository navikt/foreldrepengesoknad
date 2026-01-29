import dayjs from 'dayjs';

import { Periode, Periodetype, Situasjon, Uttaksperiode, isUttaksperiode } from '@navikt/fp-common';
import { KontoDto } from '@navikt/fp-types';
import { Tidsperioden, Uttaksdagen, getTidsperiode } from '@navikt/fp-utils';
import {
    farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato,
    sorterPerioder,
    splittPeriodePåDato,
    splittUttaksperiodePåFamiliehendelsesdato,
    tidperiodeOverlapperDato,
} from '@navikt/fp-uttaksplan';

import { andreAugust2022ReglerGjelder } from '../dateUtils';
import { guid } from '../guid';

const ikkeDeltUttakAdopsjonFarMedmor = (
    familiehendelsesdato: Date,
    foreldrepengerKonto: KontoDto,
    startdatoPermisjon: Date | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || familiehendelsesdato).denneEllerNeste();
    const perioder: Uttaksperiode[] = [];

    if (erMorUfør !== true) {
        let startDatoNestePeriode = førsteUttaksdag;
        if (andreAugust2022ReglerGjelder(familiehendelsesdato) && !!bareFarMedmorHarRett) {
            const aktivitetsFriPeriode: Uttaksperiode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: 'FAR_MEDMOR',
                konto: 'AKTIVITETSFRI_KVOTE',
                tidsperiode: getTidsperiode(førsteUttaksdag, aktivitetsfriKvote!.dager),
                vedlegg: [],
                gradert: false,
                harIkkeAktivitetskrav: true,
            };
            if (
                førsteUttaksdagNesteBarnsSak !== undefined &&
                tidperiodeOverlapperDato(aktivitetsFriPeriode.tidsperiode, førsteUttaksdagNesteBarnsSak)
            ) {
                const splittetPeriode = splittPeriodePåDato(
                    aktivitetsFriPeriode,
                    førsteUttaksdagNesteBarnsSak,
                ) as Uttaksperiode[];

                for (const periode of splittetPeriode) {
                    perioder.push(periode);
                }
            } else {
                perioder.push(aktivitetsFriPeriode);
            }
            startDatoNestePeriode = Uttaksdagen(aktivitetsFriPeriode.tidsperiode.tom).neste();
        }
        const periode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'FAR_MEDMOR',
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(startDatoNestePeriode, foreldrepengerKonto.dager),
            vedlegg: [],
            gradert: false,
        };
        if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(periode.tidsperiode, førsteUttaksdagNesteBarnsSak)
        ) {
            const splittetPeriode = splittPeriodePåDato(periode, førsteUttaksdagNesteBarnsSak) as Uttaksperiode[];

            for (const sp of splittetPeriode) {
                perioder.push(sp);
            }
        } else {
            perioder.push(periode);
        }
    } else {
        const aktivitetsFriPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'FAR_MEDMOR',
            konto: 'AKTIVITETSFRI_KVOTE',
            tidsperiode: getTidsperiode(førsteUttaksdag, aktivitetsfriKvote!.dager),
            vedlegg: [],
            gradert: false,
            harIkkeAktivitetskrav: true,
        };

        if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(aktivitetsFriPeriode.tidsperiode, førsteUttaksdagNesteBarnsSak)
        ) {
            const splittetPeriode = splittPeriodePåDato(
                aktivitetsFriPeriode,
                førsteUttaksdagNesteBarnsSak,
            ) as Uttaksperiode[];

            for (const sp of splittetPeriode) {
                perioder.push(sp);
            }
        } else {
            perioder.push(aktivitetsFriPeriode);
        }

        const aktivitetskravPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'FAR_MEDMOR',
            konto: 'FORELDREPENGER',
            tidsperiode: getTidsperiode(
                Uttaksdagen(aktivitetsFriPeriode.tidsperiode.tom).neste(),
                foreldrepengerKonto.dager,
            ),
            vedlegg: [],
            gradert: false,
        };

        if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(aktivitetskravPeriode.tidsperiode, førsteUttaksdagNesteBarnsSak)
        ) {
            const splittetPeriode = splittPeriodePåDato(
                aktivitetskravPeriode,
                førsteUttaksdagNesteBarnsSak,
            ) as Uttaksperiode[];

            for (const sp of splittetPeriode) {
                perioder.push(sp);
            }
        } else {
            perioder.push(aktivitetskravPeriode);
        }
    }

    return perioder;
};

const ikkeDeltUttakAdopsjonMor = (
    familiehendelsesdato: Date,
    foreldrepengerKonto: KontoDto,
    startdatoPermisjon: Date | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || familiehendelsesdato).denneEllerNeste();
    const periode: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        forelder: 'MOR',
        konto: foreldrepengerKonto.konto,
        tidsperiode: getTidsperiode(førsteUttaksdag, foreldrepengerKonto.dager),
        vedlegg: [],
        gradert: false,
    };
    if (
        førsteUttaksdagNesteBarnsSak !== undefined &&
        tidperiodeOverlapperDato(periode.tidsperiode, førsteUttaksdagNesteBarnsSak)
    ) {
        return splittPeriodePåDato(periode, førsteUttaksdagNesteBarnsSak);
    }
    return [periode];
};

const ikkeDeltUttakAdopsjon = (
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: KontoDto,
    startdatoPermisjon: Date | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakAdopsjonMor(
            familiehendelsesdato,
            foreldrepengerKonto,
            startdatoPermisjon,
            førsteUttaksdagNesteBarnsSak,
        );
    } else {
        return ikkeDeltUttakAdopsjonFarMedmor(
            familiehendelsesdato,
            foreldrepengerKonto,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            førsteUttaksdagNesteBarnsSak,
        );
    }
};

const ikkeDeltUttakFødselMor = (
    familiehendelsesdato: Date,
    foreldrepengerKonto: KontoDto,
    startdatoPermisjon: Date | undefined,
    foreldrePengerFørFødselKonto: KontoDto,
) => {
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = dayjs(startdatoPermisjon).isBefore(dayjs(familiehendelsesdato), 'd');

    if (foreldrePengerFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && startdatoPermisjon) {
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(førsteUttaksdag);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel,
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: 'MOR',
                konto: 'FORELDREPENGER',
                tidsperiode: getTidsperiode(startdatoPermisjon, dagerFørFødsel - 15),
                vedlegg: [],
            };

            perioder.push(ekstraPeriodeFørFødsel);
        }

        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'MOR',
            konto: foreldrePengerFørFødselKonto.konto,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(førsteUttaksdag).forrige(),
            },
            vedlegg: [],
        };

        perioder.push(periodeFørFødsel);
    } else {
        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'MOR',
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            skalIkkeHaUttakFørTermin: true,
            tidsperiode: {
                fom: Uttaksdagen(førsteUttaksdag).trekkFra(15),
                tom: Uttaksdagen(førsteUttaksdag).forrige(),
            },
            vedlegg: [],
        };

        perioder.push(periodeFørFødsel);
    }

    const ekstraPermisjonFørFødsel = perioder.find((p) => isUttaksperiode(p) && p.konto === 'FORELDREPENGER');

    const antallDagerIForeldrepenger = ekstraPermisjonFørFødsel
        ? getTidsperiode(
              førsteUttaksdag,
              foreldrepengerKonto.dager - Tidsperioden(ekstraPermisjonFørFødsel.tidsperiode).getAntallUttaksdager(),
          )
        : getTidsperiode(førsteUttaksdag, foreldrepengerKonto.dager);

    const foreldrepengerPeriode: Periode = {
        id: guid(),
        type: Periodetype.Uttak,
        forelder: 'MOR',
        konto: foreldrepengerKonto.konto,
        tidsperiode: antallDagerIForeldrepenger,
        vedlegg: [],
        gradert: false,
    };

    perioder.push(foreldrepengerPeriode);

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødselFarMedmor = (
    familiehendelsesdato: Date,
    foreldrepengerKonto: KontoDto,
    startdatoPermisjon: Date | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    termindato: Date | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    const startDato = Uttaksdagen(startdatoPermisjon || familiehendelsesdato).denneEllerNeste();
    const morHarRett = false;
    const perioder: Periode[] = [];

    if (erMorUfør !== true) {
        let startDatoNestePeriode = startDato;
        if (andreAugust2022ReglerGjelder(familiehendelsesdato) && !!bareFarMedmorHarRett) {
            const aktivitetsFriPeriode: Uttaksperiode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: 'FAR_MEDMOR',
                konto: 'AKTIVITETSFRI_KVOTE',
                tidsperiode: getTidsperiode(startDato, aktivitetsfriKvote!.dager),
                vedlegg: [],
                harIkkeAktivitetskrav: true,
            };
            if (
                farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
                    aktivitetsFriPeriode,
                    familiehendelsesdato,
                    morHarRett,
                    termindato,
                )
            ) {
                const aktivitetsFriePerioder = splittUttaksperiodePåFamiliehendelsesdato(
                    aktivitetsFriPeriode,
                    familiehendelsesdato,
                );

                for (const p of aktivitetsFriePerioder) {
                    perioder.push(p);
                }
            } else if (
                førsteUttaksdagNesteBarnsSak !== undefined &&
                tidperiodeOverlapperDato(aktivitetsFriPeriode.tidsperiode, førsteUttaksdagNesteBarnsSak)
            ) {
                const aktivitetsFriePerioder = splittPeriodePåDato(aktivitetsFriPeriode, førsteUttaksdagNesteBarnsSak);

                for (const p of aktivitetsFriePerioder) {
                    perioder.push(p);
                }
            } else {
                perioder.push(aktivitetsFriPeriode);
            }
            startDatoNestePeriode = Uttaksdagen(aktivitetsFriPeriode.tidsperiode.tom).neste();
        }

        const periode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'FAR_MEDMOR',
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(startDatoNestePeriode, foreldrepengerKonto.dager),
            vedlegg: [],
            gradert: false,
        };

        perioder.push(periode);
    } else {
        const aktivitetsFriPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'FAR_MEDMOR',
            konto: 'AKTIVITETSFRI_KVOTE',
            tidsperiode: getTidsperiode(startDato, aktivitetsfriKvote!.dager),
            vedlegg: [],
            gradert: false,
            harIkkeAktivitetskrav: true,
        };

        if (
            farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
                aktivitetsFriPeriode,
                familiehendelsesdato,
                morHarRett,
                termindato,
            )
        ) {
            const aktivitetsFriePerioder = splittUttaksperiodePåFamiliehendelsesdato(
                aktivitetsFriPeriode,
                familiehendelsesdato,
            );

            for (const p of aktivitetsFriePerioder) {
                perioder.push(p);
            }
        } else {
            perioder.push(aktivitetsFriPeriode);
        }

        const aktivitetskravPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'FAR_MEDMOR',
            konto: 'FORELDREPENGER',
            tidsperiode: getTidsperiode(
                Uttaksdagen(aktivitetsFriPeriode.tidsperiode.tom).neste(),
                foreldrepengerKonto.dager,
            ),
            vedlegg: [],
            gradert: false,
        };
        perioder.push(aktivitetskravPeriode);
    }

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødsel = (
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: KontoDto,
    startdatoPermisjon: Date | undefined,
    foreldrePengerFørFødselKonto: KontoDto | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: KontoDto | undefined,
    bareFarMedmorHarRett: boolean,
    termindato: Date | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakFødselMor(
            familiehendelsesdato,
            foreldrepengerKonto,
            startdatoPermisjon,
            foreldrePengerFørFødselKonto!,
        );
    } else {
        return ikkeDeltUttakFødselFarMedmor(
            familiehendelsesdato,
            foreldrepengerKonto,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            termindato,
            førsteUttaksdagNesteBarnsSak,
        );
    }
};

export const ikkeDeltUttak = (
    situasjon: Situasjon,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: KontoDto[],
    startdatoPermisjon: Date | undefined,
    erMorUfør: boolean | undefined,
    bareFarMedmorHarRett: boolean,
    termindato: Date | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    const foreldrepengerKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === 'FORELDREPENGER');
    const foreldrePengerFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === 'FORELDREPENGER_FØR_FØDSEL',
    );
    const aktivitetsfriKvote = tilgjengeligeStønadskontoer.find((konto) => konto.konto === 'AKTIVITETSFRI_KVOTE');

    if (situasjon === 'adopsjon') {
        return ikkeDeltUttakAdopsjon(
            familiehendelsesdato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            førsteUttaksdagNesteBarnsSak,
        );
    }

    if (situasjon === 'fødsel') {
        return ikkeDeltUttakFødsel(
            familiehendelsesdato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            startdatoPermisjon,
            foreldrePengerFørFødselKonto,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett,
            termindato,
            førsteUttaksdagNesteBarnsSak,
        );
    }

    return [];
};
