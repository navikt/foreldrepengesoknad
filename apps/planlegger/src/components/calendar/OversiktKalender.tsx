import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import Calendar, { Period } from 'components/calendar/Calendar';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { getFellesperiodefordelingOptionValues } from 'steps/fordeling/FordelingSteg';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet, erBarnetIkkeFødt } from 'types/Barnet';
import { Situasjon } from 'types/Søkersituasjon';
import {
    TilgjengeligStønadskonto,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerMødrekvote,
} from 'utils/stønadskontoer';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from 'utils/uttakHjelper';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { notEmpty } from '@navikt/fp-validation';

import { DayColor } from './Day';

interface Props {
    omBarnet: OmBarnet;
    fellesperiodefordeling?: number;
    valgtStønadskonto: TilgjengeligStønadskonto[];
}

const OversiktKalender: FunctionComponent<Props> = ({ valgtStønadskonto, omBarnet, fellesperiodefordeling }) => {
    const termindatoEllerFødselsdato = erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : omBarnet.fødselsdato;

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));

    if (!termindatoEllerFødselsdato) {
        throw Error('Det er feil i data om barnet. Ingen termindato. (oversikt steg: kalender)');
    }

    const antallUkerMødrekvote = getAntallUkerMødrekvote(valgtStønadskonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(valgtStønadskonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);

    const fellesperiodeOptionValues = getFellesperiodefordelingOptionValues(antallUkerFellesperiode);

    const antallUkerFellesperiodeSøker1 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;
    const antallUkerFellesperiodeSøker2 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;

    const perioder = [] as Period[];

    const kunMorHarRett =
        hvemPlanlegger.type !== Situasjon.FAR &&
        hvemPlanlegger.type !== Situasjon.FAR_OG_FAR &&
        arbeidssituasjon.status === Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart !== true;
    if (kunMorHarRett) {
        const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindatoEllerFødselsdato).toDate());
        const sluttdatoSøker1 =
            antallUkerFellesperiode && antallUkerFellesperiode
                ? dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks').add(antallUkerFellesperiode, 'weeks')
                : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');

        perioder.push({
            fom: dayjs(startdatoSøker1).format(ISO_DATE_FORMAT),
            tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day').format(ISO_DATE_FORMAT),
            color: DayColor.BLUE,
        });
        perioder.push({
            fom: termindatoEllerFødselsdato,
            tom: termindatoEllerFødselsdato,
            color: DayColor.PINK,
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato).add(1, 'day').format(ISO_DATE_FORMAT),
            tom: sluttdatoSøker1.format(ISO_DATE_FORMAT),
            color: DayColor.BLUE,
        });
    }

    const beggeHarRett = arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;
    if (beggeHarRett) {
        const startdatoSøker1 = dayjs(
            getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindatoEllerFødselsdato).toDate()),
        );
        const sluttdatoSøker1 =
            antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1.antallUkerSøker1
                ? dayjs(startdatoSøker1)
                      .add(antallUkerMødrekvote, 'weeks')
                      .add(antallUkerFellesperiodeSøker1.antallUkerSøker1, 'weeks')
                : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');

        const startdatoSøker2 = dayjs(sluttdatoSøker1).add(1, 'day');
        const sluttdatoSøker2 =
            antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
                ? dayjs(startdatoSøker2)
                      .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                      .add(antallUkerFedrekvote, 'weeks')
                : dayjs(startdatoSøker2).add(antallUkerFedrekvote, 'weeks');

        if (hvemPlanlegger.type !== Situasjon.FAR_OG_FAR) {
            perioder.push({
                fom: startdatoSøker1.format(ISO_DATE_FORMAT),
                tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day').format(ISO_DATE_FORMAT),
                color: DayColor.BLUE,
            });
        }
        perioder.push({
            fom: termindatoEllerFødselsdato,
            tom: termindatoEllerFødselsdato,
            color: DayColor.PINK,
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato).add(1, 'day').format(ISO_DATE_FORMAT),
            tom: sluttdatoSøker1.format(ISO_DATE_FORMAT),
            color: DayColor.BLUE,
        });
        perioder.push({
            fom: startdatoSøker2.format(ISO_DATE_FORMAT),
            tom: sluttdatoSøker2.format(ISO_DATE_FORMAT),
            color: DayColor.GREEN,
        });
    }

    //1. Far har rett, mor ikkje har rett => familiehandelse , medAktivitetskrav, utenAktivitetskrav
    const aleneforsørgerFar = hvemPlanlegger.type === Situasjon.FAR && arbeidssituasjon.status === Arbeidsstatus.JOBBER;
    if (aleneforsørgerFar) {
        const totalUker = getAntallUkerForeldrepenger(valgtStønadskonto);

        perioder.push({
            fom: termindatoEllerFødselsdato,
            tom: termindatoEllerFødselsdato,
            color: DayColor.PINK,
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato).add(1, 'day').format(ISO_DATE_FORMAT),
            tom: dayjs(termindatoEllerFødselsdato).add(totalUker, 'weeks').format(ISO_DATE_FORMAT),
            color: DayColor.BLUE,
        });
    }

    const kunFarHarRettHovedsøker =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR &&
        (arbeidssituasjon.status === Arbeidsstatus.JOBBER || arbeidssituasjon.jobberAnnenPart);

    const kunFarHarRettMedsøker =
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR &&
        arbeidssituasjon.status !== Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart;
    if (kunFarHarRettHovedsøker || kunFarHarRettMedsøker) {
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const totalUker = getAntallUkerForeldrepenger(valgtStønadskonto);
        const aktivitetskravUker = totalUker - aktivitetsfriUker;

        const sluttAktivitetsfri = dayjs(termindatoEllerFødselsdato).add(aktivitetsfriUker, 'weeks');

        perioder.push({
            fom: termindatoEllerFødselsdato,
            tom: termindatoEllerFødselsdato,
            color: DayColor.PINK,
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato).add(1, 'day').format(ISO_DATE_FORMAT),
            tom: sluttAktivitetsfri.format(ISO_DATE_FORMAT),
            color: DayColor.BLUE,
        });
        perioder.push({
            fom: sluttAktivitetsfri.add(1, 'day').format(ISO_DATE_FORMAT),
            tom: sluttAktivitetsfri.add(aktivitetskravUker, 'weeks').format(ISO_DATE_FORMAT),
            color: DayColor.GREEN,
        });
    }
    return <Calendar periods={perioder} />;
};
export default OversiktKalender;
