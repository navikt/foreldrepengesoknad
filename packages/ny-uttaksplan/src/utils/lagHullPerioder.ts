import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { ForeldreInfo } from '../types/ForeldreInfo';
import { PeriodeHullType } from '../types/Planperiode';
import { UttaksplanHull } from '../types/UttaksplanPeriode';

dayjs.extend(isSameOrAfter);

export const lagHullPerioder = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    foreldreInfo: ForeldreInfo,
): UttaksplanHull[] => {
    if (
        foreldreInfo.søker === 'FAR_ELLER_MEDMOR' &&
        (foreldreInfo.rettighetType === 'ALENEOMSORG' || foreldreInfo.rettighetType === 'BARE_SØKER_RETT')
    ) {
        const førstePeriodeSomStarterEtterFamiliehendelsedato = sortertePerioder
            .filter((p) => dayjs(p.fom).isSameOrAfter(familiehendelsedato))
            .at(0);

        if (førstePeriodeSomStarterEtterFamiliehendelsedato?.fom) {
            const fom =
                familiesituasjon === 'fødsel'
                    ? dayjs(familiehendelsedato).add(6, 'week').add(1, 'day')
                    : dayjs(familiehendelsedato);
            const periodeSomSkalSjekkesForHull = {
                fom: fom.format(ISO_DATE_FORMAT),
                tom: førstePeriodeSomStarterEtterFamiliehendelsedato.fom,
            };
            return lagHull(sortertePerioder, 'FAR_MEDMOR', periodeSomSkalSjekkesForHull);
        }
    } else if (familiesituasjon === 'fødsel') {
        const periodeSomSkalSjekkesForHull = {
            fom: familiehendelsedato,
            tom: dayjs(familiehendelsedato).add(6, 'week').format(ISO_DATE_FORMAT),
        };
        const forelder = foreldreInfo.søker === 'MOR' ? 'MOR' : 'FAR_MEDMOR';
        return lagHull(sortertePerioder, forelder, periodeSomSkalSjekkesForHull);
    }

    return [];
};

const lagHull = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    forelder: BrukerRolleSak_fpoversikt,
    periodeSomSkalSjekkesForHull: { fom: string; tom: string },
): UttaksplanHull[] => {
    const start = dayjs(periodeSomSkalSjekkesForHull.fom);
    const slutt = dayjs(periodeSomSkalSjekkesForHull.tom);

    const hull: UttaksplanHull[] = [];

    let pågåandeHullStart: dayjs.Dayjs | null = null;

    for (let dato = start; dato.isBefore(slutt, 'day'); dato = dato.add(1, 'day')) {
        if (erUkedag(dato)) {
            const erDatoDekket = sortertePerioder.some(
                (p) => dato.isSameOrAfter(p.fom, 'day') && dato.isSameOrBefore(p.tom, 'day'),
            );

            if (!erDatoDekket) {
                if (!pågåandeHullStart) {
                    pågåandeHullStart = dato;
                }
            } else if (pågåandeHullStart) {
                hull.push({
                    fom: pågåandeHullStart.format(ISO_DATE_FORMAT),
                    tom: dato.subtract(1, 'day').format(ISO_DATE_FORMAT),
                    hullType: PeriodeHullType.TAPTE_DAGER,
                    forelder,
                });
                pågåandeHullStart = null;
            }
        }
    }

    // Avslutt hull som ikkje er avslutta av andre periodar
    if (pågåandeHullStart) {
        hull.push({
            fom: pågåandeHullStart.format(ISO_DATE_FORMAT),
            tom: slutt.subtract(1, 'day').format(ISO_DATE_FORMAT),
            hullType: PeriodeHullType.TAPTE_DAGER,
            forelder,
        });
    }

    return hull;
};

const erUkedag = (dato: dayjs.Dayjs) => {
    const dag = dato.day();
    return dag !== 0 && dag !== 6;
};
