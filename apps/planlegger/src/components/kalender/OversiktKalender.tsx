import Calendar from 'components/kalender/Calendar';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { getFellesperiodefordelingOptionValues } from 'steps/fordeling/FordelingSteg';
import { OmBarnet, erBarnetIkkeFødt } from 'types/Barnet';
import {
    TilgjengeligStønadskonto,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'utils/stønadskontoer';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from 'utils/uttakHjelper';

interface Props {
    omBarnet: OmBarnet;
    fellesperiodefordeling?: number;
    valgtStønadskonto: TilgjengeligStønadskonto[];
}

const OversiktKalender: FunctionComponent<Props> = ({ valgtStønadskonto, omBarnet, fellesperiodefordeling }) => {
    const termindatoEllerFødselsdato = erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : omBarnet.fødselsdato;

    if (!termindatoEllerFødselsdato) {
        throw Error('Det er feil i data om barnet. Ingen termindato. (oversikt steg: kalender)');
    }

    const antallUkerMødrekvote = getAntallUkerMødrekvote(valgtStønadskonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(valgtStønadskonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);

    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindatoEllerFødselsdato).toDate());

    const fellesperiodeOptionValues = getFellesperiodefordelingOptionValues(antallUkerFellesperiode);

    const antallUkerFellesperiodeSøker1 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;
    const antallUkerFellesperiodeSøker2 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;

    const sluttdatoSøker1 =
        antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1.antallUkerSøker1
            ? dayjs(startdatoSøker1)
                  .add(antallUkerMødrekvote, 'weeks')
                  .add(antallUkerFellesperiodeSøker1.antallUkerSøker1, 'weeks')
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');

    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1) : undefined;

    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
            ? dayjs(startdatoSøker2)
                  .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
            : dayjs(startdatoSøker2).add(antallUkerFedrekvote, 'weeks');

    const perioder = [
        { fom: dayjs(startdatoSøker1), tom: dayjs(termindatoEllerFødselsdato).subtract(1, 'day') },
        { fom: dayjs(termindatoEllerFødselsdato).add(1, 'day'), tom: dayjs(sluttdatoSøker1).subtract(1, 'day') },
        { fom: dayjs(startdatoSøker2), tom: dayjs(sluttdatoSøker2).subtract(1, 'day') },
    ];

    return (
        <Calendar
            startdatoSøker1={startdatoSøker1}
            sluttdatoSøker2={sluttdatoSøker2}
            sluttdatoSøker1={sluttdatoSøker1}
            startdatoSøker2={startdatoSøker2}
            termindatoEllerFødselsdato={termindatoEllerFødselsdato}
            perioder={perioder}
        />
    );
};
export default OversiktKalender;
