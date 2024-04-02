import Calendar, { Period } from 'components/calendar/Calendar';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet, erBarnetIkkeFødt } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import {
    TilgjengeligStønadskonto,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerForeldrepenger,
} from 'utils/stønadskontoer';
import { finnUttaksdata } from 'utils/uttakHjelper';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { DayColor } from './Day';

interface Props {
    omBarnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    antallUkerFellesperiodeSøker1?: number;
    valgtStønadskonto: TilgjengeligStønadskonto[];
}

const OversiktKalender: FunctionComponent<Props> = ({
    valgtStønadskonto,
    omBarnet,
    antallUkerFellesperiodeSøker1,
    hvemPlanlegger,
    arbeidssituasjon,
}) => {
    //TODO Kva med adopsjon?
    const termindatoEllerFødselsdato = erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : omBarnet.fødselsdato;

    if (!termindatoEllerFødselsdato) {
        throw Error('Det er feil i data om barnet. Ingen termindato. (oversikt steg: kalender)');
    }

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);

    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2 } = finnUttaksdata(
        hvemHarRett,
        valgtStønadskonto,
        omBarnet,
        antallUkerFellesperiodeSøker1,
    );

    const perioder = [] as Period[];

    if (hvemHarRett === 'kunMorHarRett') {
        perioder.push(
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
        );
    }

    if (hvemHarRett === 'beggeHarRett' && startdatoSøker2) {
        if (hvemPlanlegger.type !== Situasjon.FAR_OG_FAR) {
            perioder.push({
                fom: startdatoSøker1,
                tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day').format(ISO_DATE_FORMAT),
                color: DayColor.BLUE,
            });
        }
        perioder.push(
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

        perioder.push(
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
        );
    }

    if (hvemHarRett === 'kunFarHarRett') {
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const totalUker = getAntallUkerForeldrepenger(valgtStønadskonto);
        const aktivitetskravUker = totalUker - aktivitetsfriUker;

        const sluttAktivitetsfri = dayjs(termindatoEllerFødselsdato).add(aktivitetsfriUker, 'weeks');

        perioder.push(
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
        );
    }
    return <Calendar periods={perioder} />;
};
export default OversiktKalender;
