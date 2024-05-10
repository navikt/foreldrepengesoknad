import { Period } from 'components/calendar/Calendar';
import { DayColor } from 'components/calendar/Day';
import dayjs from 'dayjs';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerForDekningsgrad } from 'types/TilgjengeligeStønadskontoer';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { erMorDelAvSøknaden } from './HvemPlanleggerUtils';
import { erBarnetAdoptert } from './barnetUtils';
import { HvemHarRett, harMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from './hvemHarRettUtils';
import { finnUttaksdata } from './uttakUtils';

const finnPerioderForKunEnHarRett = (familiehendelsedato: string, sluttdatoPeriode1: string): Period[] => {
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
};

const finnPerioderForBeggeHarRettEllerKunMorHarRett = (
    erAdoptert: boolean,
    startdatoPeriode1: string,
    sluttdatoPeriode1: string,
    familiehendelsedato: string,
    startdatoPeriode2?: string,
    sluttdatoPeriode2?: string,
): Period[] => {
    const perioder = [] as Period[];

    if (!erAdoptert) {
        perioder.push({
            fom: startdatoPeriode1,
            tom: dayjs(familiehendelsedato).subtract(1, 'day').format(ISO_DATE_FORMAT),
            color: DayColor.BLUE,
        });
    }

    perioder.push({
        fom: familiehendelsedato,
        tom: familiehendelsedato,
        color: DayColor.PINK,
    });
    perioder.push({
        fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
        tom: sluttdatoPeriode1,
        color: DayColor.BLUE,
    });

    if (startdatoPeriode2 && sluttdatoPeriode2) {
        perioder.push({
            fom: startdatoPeriode2,
            tom: sluttdatoPeriode2,
            color: DayColor.GREEN,
        });
    }

    return perioder;
};

const finnPerioderOppdeltIAktivitetskrav = (
    startdatoPeriode1: string,
    sluttdatoPeriode1: string,
    familiehendelsedato: string,
    startdatoPeriode2: string,
    sluttdatoPeriode2: string,
) => {
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
};

const erFarOgFarFødsel = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett, erAdoptert: boolean): boolean =>
    hvemPlanlegger.type === Situasjon.FAR_OG_FAR && !erAdoptert && hvemHarRett !== 'ingenHarRett';

const erFarOgFarKunSøker1HarRett = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett): boolean =>
    hvemHarRett === 'kunSøker1HarRett' && hvemPlanlegger.type === Situasjon.FAR_OG_FAR;

const erFarAlenesøkerOgHarRett = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett): boolean =>
    hvemHarRett === 'kunSøker1HarRett' && hvemPlanlegger.type === Situasjon.FAR;

export const lagKalenderPerioder = (
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad,
    barnet: OmBarnet,
    hvemPlanlegger: HvemPlanlegger,
    arbeidssituasjon: Arbeidssituasjon,
    antallUkerFellesperiodeSøker1?: number,
): Period[] => {
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const { startdatoPeriode1, sluttdatoPeriode1, familiehendelsedato, startdatoPeriode2, sluttdatoPeriode2 } =
        finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallUkerFellesperiodeSøker1);

    const erAdoptert = erBarnetAdoptert(barnet);

    const harPeriode2 = startdatoPeriode2 && sluttdatoPeriode2;

    if (
        erFarOgFarFødsel(hvemPlanlegger, hvemHarRett, erAdoptert) ||
        erFarAlenesøkerOgHarRett(hvemPlanlegger, hvemHarRett)
    ) {
        return finnPerioderForKunEnHarRett(familiehendelsedato, sluttdatoPeriode1);
    }

    if (hvemHarRett === 'beggeHarRett' && harPeriode2) {
        return finnPerioderForBeggeHarRettEllerKunMorHarRett(
            erAdoptert,
            startdatoPeriode1,
            sluttdatoPeriode1,
            familiehendelsedato,
            startdatoPeriode2,
            sluttdatoPeriode2,
        );
    }

    if (hvemHarRett === 'kunSøker1HarRett' && erMorDelAvSøknaden(hvemPlanlegger)) {
        return finnPerioderForBeggeHarRettEllerKunMorHarRett(
            erAdoptert,
            startdatoPeriode1,
            sluttdatoPeriode1,
            familiehendelsedato,
        );
    }

    if (
        (hvemHarRett === 'kunSøker2HarRett' ||
            erFarOgFarKunSøker1HarRett(hvemPlanlegger, hvemHarRett) ||
            !erAdoptert) &&
        harPeriode2
    ) {
        return finnPerioderOppdeltIAktivitetskrav(
            startdatoPeriode1,
            sluttdatoPeriode1,
            familiehendelsedato,
            startdatoPeriode2,
            sluttdatoPeriode2,
        );
    }

    if (harMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) && erAdoptert) {
        return finnPerioderForKunEnHarRett(sluttdatoPeriode1, familiehendelsedato);
    }

    throw Error('Ingen perioder finnes');
};
