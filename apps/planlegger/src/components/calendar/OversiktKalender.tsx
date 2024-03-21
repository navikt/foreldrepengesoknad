import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import Calendar, { Period } from 'components/calendar/Calendar';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { getFellesperiodefordelingOptionValues } from 'steps/fordeling/FordelingSteg';
import { ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { OmBarnet, erBarnetIkkeFødt } from 'types/Barnet';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import {
    TilgjengeligStønadskonto,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerMødrekvote,
} from 'utils/stønadskontoer';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from 'utils/uttakHjelper';

import { notEmpty } from '@navikt/fp-validation';

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
        hvemPlanlegger.type !== SøkersituasjonEnum.FAR &&
        hvemPlanlegger.type !== SøkersituasjonEnum.FAR_OG_FAR &&
        arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER &&
        arbeidssituasjon.arbeidssituasjonAnnenPart !== true;
    if (kunMorHarRett) {
        const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindatoEllerFødselsdato).toDate());
        const sluttdatoSøker1 =
            antallUkerFellesperiode && antallUkerFellesperiode
                ? dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks').add(antallUkerFellesperiode, 'weeks')
                : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');

        perioder.push({
            fom: dayjs(startdatoSøker1),
            tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day'),
            type: 'førTermin',
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato),
            tom: dayjs(termindatoEllerFødselsdato),
            type: 'familiehendelse',
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato).add(1, 'day'),
            tom: dayjs(sluttdatoSøker1),
            type: 'søker',
        });
    }

    const beggeHarRett =
        arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER &&
        arbeidssituasjon.arbeidssituasjonAnnenPart === true;
    if (beggeHarRett) {
        const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindatoEllerFødselsdato).toDate());
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

        if (hvemPlanlegger.type !== SøkersituasjonEnum.FAR_OG_FAR) {
            perioder.push({
                fom: dayjs(startdatoSøker1),
                tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day'),
                type: 'førTermin',
            });
        }
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato),
            tom: dayjs(termindatoEllerFødselsdato),
            type: 'familiehendelse',
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato).add(1, 'day'),
            tom: dayjs(sluttdatoSøker1),
            type: 'søker',
        });
        perioder.push({
            fom: dayjs(startdatoSøker2),
            tom: dayjs(sluttdatoSøker2),
            type: 'medsøker',
        });

        console.log(perioder);
    }

    //1. Far har rett, mor ikkje har rett => familiehandelse , medAktivitetskrav, utenAktivitetskrav
    const aleneforsørgerFar =
        hvemPlanlegger.type === SøkersituasjonEnum.FAR &&
        arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER;
    if (aleneforsørgerFar) {
        const totalUker = getAntallUkerForeldrepenger(valgtStønadskonto);

        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato),
            tom: dayjs(termindatoEllerFødselsdato),
            type: 'familiehendelse',
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato).add(1, 'day'),
            tom: dayjs(termindatoEllerFødselsdato).add(totalUker, 'weeks'),
            type: 'søker',
        });
    }

    const kunFarHarRettHovedsøker =
        hvemPlanlegger.type === SøkersituasjonEnum.FAR_OG_FAR &&
        (arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER ||
            arbeidssituasjon.arbeidssituasjonAnnenPart);

    const kunFarHarRettMedsøker =
        hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_FAR &&
        arbeidssituasjon.arbeidssituasjon !== ArbeidssituasjonEnum.JOBBER &&
        arbeidssituasjon.arbeidssituasjonAnnenPart;
    if (kunFarHarRettHovedsøker || kunFarHarRettMedsøker) {
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const totalUker = getAntallUkerForeldrepenger(valgtStønadskonto);
        const aktivitetskravUker = totalUker - aktivitetsfriUker;

        const sluttAktivitetsfri = dayjs(termindatoEllerFødselsdato).add(aktivitetsfriUker, 'weeks');

        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato),
            tom: dayjs(termindatoEllerFødselsdato),
            type: 'familiehendelse',
        });
        perioder.push({
            fom: dayjs(termindatoEllerFødselsdato).add(1, 'day'),
            tom: sluttAktivitetsfri,
            type: 'utenAktivitetskrav',
        });
        perioder.push({
            fom: sluttAktivitetsfri.add(1, 'day'),
            tom: sluttAktivitetsfri.add(aktivitetskravUker, 'weeks'),
            type: 'aktivitetskrav',
        });
    }
    console.log(perioder);
    return <Calendar periods={perioder} />;
};
export default OversiktKalender;
