import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { sorterPerioder } from './forslag/deltUttak';

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

    // FIXME (TOR) Mogleg ein må justera periodar gitt seinare saker. Men kanskje dette blir gjort backend?
    // const andreSakerEtterValgtSak = sakerQuery.data.foreldrepenger
    //     .filter(
    //         (sak) =>
    //             sak.saksnummer !== valgtSak.saksnummer &&
    //             dayjs(getRelevantFamiliehendelseDato(sak)).isAfter(getRelevantFamiliehendelseDato(valgtSak), 'day'),
    //     )
    //     .sort(sorter);

    // const startdatoFørsteStønadsperiode =
    //     andreSakerEtterValgtSak.length > 0 && andreSakerEtterValgtSak.at(0)!.gjeldendeVedtak?.perioder[0]!.fom
    //         ? UttaksdagenString.denneEllerNeste(
    //               andreSakerEtterValgtSak.at(0)!.gjeldendeVedtak?.perioder[0]!.fom,
    //           ).getDato()
    //         : undefined;

    const uttaksplan = [...valgtSak.gjeldendeVedtak.perioder];

    if (valgtSak.gjeldendeVedtak?.perioderAnnenpartEøs) {
        uttaksplan.push(...valgtSak.gjeldendeVedtak.perioderAnnenpartEøs);
    }
    if (perioderAnnenPart) {
        uttaksplan.push(...perioderAnnenPart);
    }

    return uttaksplan.sort(sorterPerioder);
};

// const getRelevantFamiliehendelseDato = (sak: FpSak_fpoversikt): string => {
//     const { omsorgsovertakelse, fødselsdato, termindato } = sak.familiehendelse;
//     if (omsorgsovertakelse !== undefined) {
//         return omsorgsovertakelse;
//     } else if (fødselsdato !== undefined) {
//         return fødselsdato;
//     } else if (termindato !== undefined) {
//         return termindato;
//     } else {
//         throw new Error('Mangler fødselsdato/termindato/adopsjonsdato for barnet.');
//     }
// };

// // FIXME (TOR) burde ein ikkje bruka getRelevantFamiliehendelseDato her og?
// const sorter = (sak1: FpSak_fpoversikt, sak2: FpSak_fpoversikt) => {
//     return dayjs(sak1.familiehendelse.termindato).isBefore(sak2.familiehendelse.termindato, 'd')
//         ? 1
//         : dayjs(sak1.familiehendelse.termindato).isAfter(sak2.familiehendelse.termindato, 'd')
//           ? -1
//           : 0;
// };
