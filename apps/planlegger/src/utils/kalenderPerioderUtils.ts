import dayjs from 'dayjs';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT, PeriodeColor } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Period } from '@navikt/fp-ui';

import { erMorDelAvSøknaden } from './HvemPlanleggerUtils';
import { erBarnetAdoptert } from './barnetUtils';
import { HvemHarRett, utledHvemSomHarRett } from './hvemHarRettUtils';
import { finnUttaksdata } from './uttakUtils';

const finnPerioderForKunFarHarRett = (familiehendelsedato: string, sluttdatoPeriode1: string): Period[] => {
    return [
        {
            fom: familiehendelsedato,
            tom: familiehendelsedato,
            color: PeriodeColor.PINK,
        },
        {
            fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
            tom: sluttdatoPeriode1,
            color: PeriodeColor.BLUE,
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
            color: PeriodeColor.BLUE,
        });
    }

    perioder.push({
        fom: familiehendelsedato,
        tom: familiehendelsedato,
        color: PeriodeColor.PINK,
    });
    perioder.push({
        fom: dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT),
        tom: sluttdatoPeriode1,
        color: PeriodeColor.BLUE,
    });

    if (startdatoPeriode2 && sluttdatoPeriode2) {
        perioder.push({
            fom: startdatoPeriode2,
            tom: sluttdatoPeriode2,
            color: PeriodeColor.LIGHTGREEN,
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
            color: PeriodeColor.PINK,
        },
        {
            fom: startdatoPeriode1,
            tom: sluttdatoPeriode1,
            color: PeriodeColor.BLUE,
        },
        {
            fom: startdatoPeriode2,
            tom: sluttdatoPeriode2,
            color: PeriodeColor.LIGHTGREEN,
        },
    ];
};

const erFarOgFarFødsel = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett, erAdoptert: boolean): boolean =>
    hvemPlanlegger.type === Situasjon.FAR_OG_FAR && !erAdoptert && hvemHarRett !== 'ingenHarRett';

const erFarOgFarKunSøker1HarRett = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett): boolean =>
    hvemHarRett === 'kunSøker1HarRett' && hvemPlanlegger.type === Situasjon.FAR_OG_FAR;

const erFarAlenesøkerOgHarRett = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett): boolean =>
    hvemHarRett === 'kunSøker1HarRett' && hvemPlanlegger.type === Situasjon.FAR;

export const leggTilBarnehageplassKalenderPerioder = (uttaksperioder: Period[], barnet: OmBarnet) => {
    const barnehageplassdato = barnehagestartDato(barnet);

    const barnehageperiode = { fom: barnehageplassdato, tom: barnehageplassdato, color: PeriodeColor.PURPLE };
    const res = uttaksperioder.reduce((acc, uttaksperiode) => {
        if (dayjs(barnehageperiode.fom).isBetween(uttaksperiode.fom, uttaksperiode.tom, 'day', '[]')) {
            return [
                ...acc,
                {
                    fom: uttaksperiode.fom,
                    tom: dayjs(barnehageperiode.fom).subtract(1, 'day').format(ISO_DATE_FORMAT),
                    color: uttaksperiode.color,
                },
                {
                    fom: dayjs(barnehageperiode.fom).add(1, 'day').format(ISO_DATE_FORMAT),
                    tom: uttaksperiode.tom,
                    color: uttaksperiode.color,
                },
            ];
        }
        return [...acc, uttaksperiode];
    }, [] as Period[]);

    const perioder = res.concat(barnehageperiode).sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)));

    return perioder;
};
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
        return leggTilBarnehageplassKalenderPerioder(
            finnPerioderForKunFarHarRett(familiehendelsedato, sluttdatoPeriode1),
            barnet,
        );
    }

    if (hvemHarRett === 'beggeHarRett' && harPeriode2) {
        return leggTilBarnehageplassKalenderPerioder(
            finnPerioderForBeggeHarRettEllerKunMorHarRett(
                erAdoptert,
                startdatoPeriode1,
                sluttdatoPeriode1,
                familiehendelsedato,
                startdatoPeriode2,
                sluttdatoPeriode2,
            ),
            barnet,
        );
    }

    if (hvemHarRett === 'kunSøker1HarRett' && erMorDelAvSøknaden(hvemPlanlegger)) {
        return leggTilBarnehageplassKalenderPerioder(
            finnPerioderForBeggeHarRettEllerKunMorHarRett(
                erAdoptert,
                startdatoPeriode1,
                sluttdatoPeriode1,
                familiehendelsedato,
            ),
            barnet,
        );
    }

    if (
        harPeriode2 &&
        (hvemHarRett === 'kunSøker2HarRett' || erFarOgFarKunSøker1HarRett(hvemPlanlegger, hvemHarRett) || !erAdoptert)
    ) {
        return leggTilBarnehageplassKalenderPerioder(
            finnPerioderOppdeltIAktivitetskrav(
                startdatoPeriode1,
                sluttdatoPeriode1,
                familiehendelsedato,
                startdatoPeriode2,
                sluttdatoPeriode2,
            ),
            barnet,
        );
    }

    throw Error('Ingen perioder finnes');
};
