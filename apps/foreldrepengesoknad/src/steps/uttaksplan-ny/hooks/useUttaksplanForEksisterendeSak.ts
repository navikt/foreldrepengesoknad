import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils/src/uttak/UttaksdagenString';

import { sorterPerioder } from './forslag/deltUttak';

dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

export const useUttaksplanForEksisterendeSak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    if (!sakerQuery?.data || !valgtEksisterendeSaksnr) {
        return undefined;
    }

    const valgtSak = sakerQuery.data.foreldrepenger.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);

    if (!valgtSak?.gjeldendeVedtak) {
        return undefined;
    }

    const uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> = [
        ...valgtSak.gjeldendeVedtak.perioder,
    ];

    if (valgtSak.gjeldendeVedtak?.perioderAnnenpartEøs) {
        uttaksplan.push(...valgtSak.gjeldendeVedtak.perioderAnnenpartEøs);
    }
    if (perioderAnnenPart) {
        uttaksplan.push(...midlertidigJusteringAvSamtidigUttak(perioderAnnenPart, valgtSak.gjeldendeVedtak.perioder));
    }

    return uttaksplan.sort(sorterPerioder);
};

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Om annen part har søkt først og har lagt til ein periode som overlappar med søkar sin samtidig uttaksperiode (er muligens kun
// synleg om søkar har har lagt til samtidig uttak og så seinare ser på ein endringssøknad), så må en endra
// annen part sin periode til samtidig uttak for å få rett visning i kalender
const midlertidigJusteringAvSamtidigUttak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[],
    perioderSøker: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioderAnnenPart.flatMap((annenPartPeriode) => {
        const overlappendeSøkerPeriode = perioderSøker.find((søker) => harOverlapp(annenPartPeriode, søker));

        if (!overlappendeSøkerPeriode) {
            return [annenPartPeriode];
        }
        const skalEndreAnnenPartTilSamtidigUttak =
            overlappendeSøkerPeriode.samtidigUttak !== undefined && annenPartPeriode.samtidigUttak === undefined;

        if (!skalEndreAnnenPartTilSamtidigUttak) {
            return [annenPartPeriode];
        }

        const annenFom = dayjs(annenPartPeriode.fom);
        const annenTom = dayjs(annenPartPeriode.tom);
        const søkerFom = dayjs(overlappendeSøkerPeriode.fom);
        const søkerTom = dayjs(overlappendeSøkerPeriode.tom);

        const overlappFom = dayjs.max(annenFom, søkerFom);
        const overlappTom = dayjs.min(annenTom, søkerTom);

        const resultat: UttakPeriode_fpoversikt[] = [];

        // Før overlapp
        if (annenFom.isBefore(overlappFom, 'day')) {
            resultat.push({
                ...annenPartPeriode,
                tom: UttaksdagenString.forrige(overlappFom.format(ISO_DATE_FORMAT)).getDato(),
            });
        }

        // Overlapp-del
        resultat.push({
            ...annenPartPeriode,
            fom: overlappFom.format(ISO_DATE_FORMAT),
            tom: overlappTom.format(ISO_DATE_FORMAT),
            samtidigUttak: 100,
        });

        // Etter overlapp
        if (annenTom.isAfter(overlappTom, 'day')) {
            resultat.push({
                ...annenPartPeriode,
                fom: UttaksdagenString.neste(overlappTom.format(ISO_DATE_FORMAT)).getDato(),
            });
        }

        return resultat;
    });
};

const harOverlapp = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt) =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');
