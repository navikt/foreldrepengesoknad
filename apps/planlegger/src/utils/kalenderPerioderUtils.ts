import { Period } from 'components/calendar/Calendar';
import { DayColor } from 'components/calendar/Day';
import dayjs from 'dayjs';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerForDekningsgrad } from 'types/TilgjengeligeStønadskontoer';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { erBarnetAdoptert } from './barnetUtils';
import { utledHvemSomHarRett } from './hvemHarRettUtils';
import { finnUttaksdata } from './uttakUtils';

export const lagKalenderPerioder = (
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad,
    barnet: OmBarnet,
    hvemPlanlegger: HvemPlanlegger,
    arbeidssituasjon: Arbeidssituasjon,
    antallUkerFellesperiodeSøker1?: number,
): Period[] => {
    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);

    const { startdatoPeriode1, sluttdatoPeriode1, familiehendelsedato, startdatoPeriode2, sluttdatoPeriode2 } =
        finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallUkerFellesperiodeSøker1);

    const erAdoptert = erBarnetAdoptert(barnet);
    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;

    if (hvemHarRett === 'kunMorHarRett') {
        const perioder = [] as Period[];
        if (!erAdoptert) {
            perioder.push({
                fom: startdatoPeriode1,
                tom: dayjs(familiehendelsedato).subtract(1, 'day').format(ISO_DATE_FORMAT),
                color: DayColor.BLUE,
            });
        }
        return perioder.concat([
            {
                fom: familiehendelsedato,
                tom: familiehendelsedato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
                tom: sluttdatoPeriode1,
                color: DayColor.BLUE,
            },
        ]);
    }

    if (hvemHarRett === 'beggeHarRett') {
        if (erFarOgFar && !erAdoptert) {
            return [
                {
                    fom: familiehendelsedato,
                    tom: familiehendelsedato,
                    color: DayColor.PINK,
                },
                {
                    fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
                    tom: sluttdatoPeriode1,
                    color: DayColor.BLUE,
                },
            ];
        }
        if (startdatoPeriode2 && sluttdatoPeriode2) {
            const perioder = [] as Period[];
            if (!erAdoptert) {
                perioder.push({
                    fom: startdatoPeriode1,
                    tom: dayjs(familiehendelsedato).subtract(1, 'day').format(ISO_DATE_FORMAT),
                    color: DayColor.BLUE,
                });
            }
            return perioder.concat(
                {
                    fom: familiehendelsedato,
                    tom: familiehendelsedato,
                    color: DayColor.PINK,
                },
                {
                    fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
                    tom: sluttdatoPeriode1,
                    color: DayColor.BLUE,
                },
                {
                    fom: startdatoPeriode2,
                    tom: sluttdatoPeriode2,
                    color: DayColor.GREEN,
                },
            );
        }
    }

    if (hvemHarRett === 'kunFarSøker1HarRett' && (!erFarOgFar || !erAdoptert)) {
        return [
            {
                fom: familiehendelsedato,
                tom: familiehendelsedato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
                tom: sluttdatoPeriode1,
                color: DayColor.BLUE,
            },
        ];
    }

    if (
        hvemHarRett === 'kunMedmorEllerFarSøker2HarRett' ||
        hvemHarRett === 'kunMedfarHarRett' ||
        hvemHarRett === 'kunFarSøker1HarRett' ||
        !erAdoptert
    ) {
        if (erFarOgFar && !erAdoptert) {
            return [
                {
                    fom: familiehendelsedato,
                    tom: familiehendelsedato,
                    color: DayColor.PINK,
                },
                {
                    fom: startdatoPeriode1,
                    tom: sluttdatoPeriode1,
                    color: DayColor.BLUE,
                },
            ];
        }

        if (startdatoPeriode2 && sluttdatoPeriode2) {
            return [
                {
                    fom: familiehendelsedato,
                    tom: familiehendelsedato,
                    color: DayColor.PINK,
                },
                {
                    fom: startdatoPeriode1,
                    tom: sluttdatoPeriode1,
                    color: DayColor.BLUE,
                },
                {
                    fom: startdatoPeriode2,
                    tom: sluttdatoPeriode2,
                    color: DayColor.GREEN,
                },
            ];
        }
    }

    if ((hvemHarRett === 'kunMedmorEllerFarSøker2HarRett' || hvemHarRett === 'kunMedfarHarRett') && erAdoptert) {
        return [
            {
                fom: familiehendelsedato,
                tom: familiehendelsedato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
                tom: sluttdatoPeriode1,
                color: DayColor.BLUE,
            },
        ];
    }

    throw Error('Ingen perioder');
};
