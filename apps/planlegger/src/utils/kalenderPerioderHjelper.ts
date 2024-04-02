import { Period } from 'components/calendar/Calendar';
import { DayColor } from 'components/calendar/Day';
import dayjs from 'dayjs';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet, erBarnetIkkeFødt } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { utledHvemSomHarRett } from './hvemHarRettHjelper';
import {
    TilgjengeligStønadskonto,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerForeldrepenger,
} from './stønadskontoer';
import { finnUttaksdata } from './uttakHjelper';

export const lagKalenderPerioder = (
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
    hvemPlanlegger: HvemPlanlegger,
    arbeidssituasjon: Arbeidssituasjon,
    antallUkerFellesperiodeSøker1?: number,
): Period[] => {
    //TODO Kva med adopsjon?
    const termindatoEllerFødselsdato = erBarnetIkkeFødt(barnet) ? barnet.termindato : barnet.fødselsdato;

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);

    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2 } = finnUttaksdata(
        hvemHarRett,
        valgtStønadskonto,
        barnet,
        antallUkerFellesperiodeSøker1,
    );

    if (hvemHarRett === 'kunMorHarRett') {
        return [
            {
                fom: startdatoSøker1,
                tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day').format(ISO_DATE_FORMAT),
                color: DayColor.BLUE,
            },
            {
                fom: termindatoEllerFødselsdato,
                tom: termindatoEllerFødselsdato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(termindatoEllerFødselsdato).add(1, 'day').format(ISO_DATE_FORMAT),
                tom: sluttdatoSøker1,
                color: DayColor.BLUE,
            },
        ];
    }

    if (hvemHarRett === 'beggeHarRett' && startdatoSøker2) {
        const perioder = [];
        if (hvemPlanlegger.type !== Situasjon.FAR_OG_FAR) {
            perioder.push({
                fom: startdatoSøker1,
                tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day').format(ISO_DATE_FORMAT),
                color: DayColor.BLUE,
            });
        }
        return perioder.concat(
            {
                fom: termindatoEllerFødselsdato,
                tom: termindatoEllerFødselsdato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(termindatoEllerFødselsdato).add(1, 'day').format(ISO_DATE_FORMAT),
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

    if (hvemHarRett === 'kunFarHarRettAleneforsørger') {
        const totalUker = getAntallUkerForeldrepenger(valgtStønadskonto);

        return [
            {
                fom: termindatoEllerFødselsdato,
                tom: termindatoEllerFødselsdato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(termindatoEllerFødselsdato).add(1, 'day').format(ISO_DATE_FORMAT),
                tom: dayjs(termindatoEllerFødselsdato).add(totalUker, 'weeks').format(ISO_DATE_FORMAT),
                color: DayColor.BLUE,
            },
        ];
    }

    if (hvemHarRett === 'kunFarHarRett') {
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const totalUker = getAntallUkerForeldrepenger(valgtStønadskonto);
        const aktivitetskravUker = totalUker - aktivitetsfriUker;

        const sluttAktivitetsfri = dayjs(termindatoEllerFødselsdato).add(aktivitetsfriUker, 'weeks');

        return [
            {
                fom: termindatoEllerFødselsdato,
                tom: termindatoEllerFødselsdato,
                color: DayColor.PINK,
            },
            {
                fom: dayjs(termindatoEllerFødselsdato).add(1, 'day').format(ISO_DATE_FORMAT),
                tom: sluttAktivitetsfri.format(ISO_DATE_FORMAT),
                color: DayColor.BLUE,
            },
            {
                fom: sluttAktivitetsfri.add(1, 'day').format(ISO_DATE_FORMAT),
                tom: sluttAktivitetsfri.add(aktivitetskravUker, 'weeks').format(ISO_DATE_FORMAT),
                color: DayColor.GREEN,
            },
        ];
    }

    return [];
};
