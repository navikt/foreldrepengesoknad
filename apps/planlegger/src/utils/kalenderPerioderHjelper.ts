import { Period } from 'components/calendar/Calendar';
import { DayColor } from 'components/calendar/Day';
import dayjs from 'dayjs';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet, erBarnetAdoptert } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { utledHvemSomHarRett } from './hvemHarRettHjelper';
import { TilgjengeligStønadskonto } from './stønadskontoer';
import { finnUttaksdata } from './uttakHjelper';

export const lagKalenderPerioder = (
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
    hvemPlanlegger: HvemPlanlegger,
    arbeidssituasjon: Arbeidssituasjon,
    antallUkerFellesperiodeSøker1?: number,
): Period[] => {
    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);

    const { startdatoSøker1, sluttdatoSøker1, familiehendelsedato, startdatoSøker2, sluttdatoSøker2 } = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        valgtStønadskonto,
        barnet,
        antallUkerFellesperiodeSøker1,
    );

    const erAdoptert = erBarnetAdoptert(barnet);

    if (hvemHarRett === 'kunMorHarRett') {
        const perioder = [] as Period[];
        if (!erAdoptert) {
            perioder.push({
                fom: startdatoSøker1,
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
                tom: sluttdatoSøker1,
                color: DayColor.BLUE,
            },
        ]);
    }

    if (hvemHarRett === 'beggeHarRett' && startdatoSøker2 && sluttdatoSøker2) {
        const perioder = [] as Period[];
        if (hvemPlanlegger.type !== Situasjon.FAR_OG_FAR && !erBarnetAdoptert(barnet)) {
            perioder.push({
                fom: startdatoSøker1,
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
                tom: sluttdatoSøker1,
                color: DayColor.BLUE,
            },
            {
                fom: startdatoSøker2,
                tom: sluttdatoSøker2,
                color: DayColor.GREEN,
            },
        );
    }

    if (hvemHarRett === 'kunFarHarRett') {
        return [
            {
                fom: familiehendelsedato,
                tom: familiehendelsedato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
                tom: sluttdatoSøker1,
                color: DayColor.BLUE,
            },
        ];
    }

    if (
        (hvemHarRett === 'kunFarHarRettMorHovedsøker' || hvemHarRett === 'kunMedfarEllerMedmorHarRett') &&
        !erAdoptert &&
        startdatoSøker2 &&
        sluttdatoSøker2
    ) {
        return [
            {
                fom: familiehendelsedato,
                tom: familiehendelsedato,
                color: DayColor.PINK,
            },
            {
                fom: startdatoSøker1,
                tom: sluttdatoSøker1,
                color: DayColor.BLUE,
            },
            {
                fom: startdatoSøker2,
                tom: sluttdatoSøker2,
                color: DayColor.GREEN,
            },
        ];
    }

    if ((hvemHarRett === 'kunFarHarRettMorHovedsøker' || hvemHarRett === 'kunMedfarEllerMedmorHarRett') && erAdoptert) {
        return [
            {
                fom: familiehendelsedato,
                tom: familiehendelsedato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
                tom: sluttdatoSøker1,
                color: DayColor.BLUE,
            },
        ];
    }

    throw Error('Ingen perioder');
};
