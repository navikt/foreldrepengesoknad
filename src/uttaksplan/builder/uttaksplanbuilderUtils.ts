import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import { sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { getTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Periode } from 'uttaksplan/types/Periode';

export const resetTidsperioder = (perioder: Periode[]): Periode[] => {
    let forrigePeriode: Periode;
    const sammenslåttePerioder = slåSammenLikePerioder(perioder.sort(sorterPerioder));
    const resattePerioder = sammenslåttePerioder.map((periode) => {
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return periode;
        }
        forrigePeriode = {
            ...periode,
            tidsperiode: getTidsperiode(
                Uttaksdagen(forrigePeriode.tidsperiode.tom).neste(),
                Tidsperioden(periode.tidsperiode).getAntallUttaksdager()
            ),
        };
        return {
            ...periode,
            tidsperiode: { ...forrigePeriode.tidsperiode },
        };
    });

    return resattePerioder;
};

export const slåSammenLikePerioder = (perioder: Periode[]): Periode[] => {
    if (perioder.length <= 1) {
        return perioder;
    }
    const nyePerioder: Periode[] = [];
    let forrigePeriode: Periode | undefined = { ...perioder[0] };
    perioder.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }
        if (Perioden(forrigePeriode).erLik(periode) && Perioden(forrigePeriode).erSammenhengende(periode)) {
            forrigePeriode.tidsperiode.tom = periode.tidsperiode.tom;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
            forrigePeriode = undefined;
        }
        forrigePeriode = periode;
    });
    nyePerioder.push(forrigePeriode);

    return nyePerioder;
};
