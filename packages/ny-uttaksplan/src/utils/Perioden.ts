import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { UttaksdagenString } from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';
import { isForeldrepengerFørFødselPeriode, isHull, isUtsettelsesperiode } from './periodeUtils';

export const Perioden = (periode: Planperiode) => ({
    erLik: (periode2: Planperiode, inkluderTidsperiode = false, inkluderUtsettelser = false) =>
        erPerioderLike(periode, periode2, inkluderTidsperiode, inkluderUtsettelser),
    erSammenhengende: (periode2: Planperiode) => erPerioderSammenhengende(periode, periode2),
});

function erPerioderSammenhengende(p1: Planperiode, p2: Planperiode) {
    const p1NesteUttaksdato = UttaksdagenString(p1.tom).neste();
    const p2Startdato = p2.fom;
    return dayjs(p1NesteUttaksdato).isSame(p2Startdato, 'day');
}

function erPerioderLike(p1: Planperiode, p2: Planperiode, inkluderTidsperiode = false, inkluderUtsettelser = false) {
    if (inkluderUtsettelser === false && (isUtsettelsesperiode(p1) || isUtsettelsesperiode(p2))) {
        return false;
    }

    if (isHull(p1) && isHull(p2)) {
        return true;
    }

    if (isForeldrepengerFørFødselPeriode(p1) && isForeldrepengerFørFødselPeriode(p2)) {
        const fff1 = getPeriodeFootprint(
            { ...p1, skalIkkeHaUttakFørTermin: p1.skalIkkeHaUttakFørTermin || false },
            inkluderTidsperiode,
        );
        const fff2 = getPeriodeFootprint(
            { ...p2, skalIkkeHaUttakFørTermin: p2.skalIkkeHaUttakFørTermin || false },
            inkluderTidsperiode,
        );
        return fff1 === fff2;
    }
    const k1 = getPeriodeFootprint(p1, inkluderTidsperiode);
    const k2 = getPeriodeFootprint(p2, inkluderTidsperiode);

    return k1 === k2;
}

function getPeriodeFootprint(periode: Planperiode, inkluderTidsperiode = false) {
    const { fom, tom, ...rest } = periode;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const sortedPeriode = {} as any;
    Object.keys(rest)
        .sort((a, b) => a.localeCompare(b))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .filter((key) => (rest as any)[key] !== undefined)
        .forEach((key) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            sortedPeriode[key] = (rest as any)[key];
        });
    if (inkluderTidsperiode) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        sortedPeriode.fom = fom ? dayjs(fom).format(DDMMYYYY_DATE_FORMAT) : undefined;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        sortedPeriode.tom = tom ? dayjs(tom).format(DDMMYYYY_DATE_FORMAT) : undefined;
    }
    return JSON.stringify({ ...sortedPeriode });
}
