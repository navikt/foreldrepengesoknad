import {
    getFørsteUttaksdagAnkomstdatoNorge,
    getFørsteUttaksdagDatoForAleneomsorg,
    getFørsteUttaksdagForeldrepengerFørFødsel,
} from '@navikt/uttaksplan/src/utils/uttaksdatoerUtils';

import { Uttaksdagen } from '@navikt/fp-common';
import { ISOStringToDate, getNumberFromNumberInputValue } from '@navikt/fp-formik';

import Fordeling, { FellesperiodeFordelingValg, OppstartValg } from 'app/context/types/Fordeling';

export const getNesteUttaksdagEtterAnnenForelder = (sisteDagAnnenForelder: Date | undefined) => {
    if (!sisteDagAnnenForelder) {
        throw new Error('Mangler informasjon om annen forelders siste dag.');
    }
    const sisteUttaksdagAnnenForelder = Uttaksdagen(sisteDagAnnenForelder).denneEllerForrige();
    return Uttaksdagen(sisteUttaksdagAnnenForelder).neste();
};

export const getAntallUkerFellesperiodeTilSøker = (
    antallUkerFellesperiode: number,
    fordeling: Fordeling,
): number | undefined => {
    if (fordeling.fordelingValg === FellesperiodeFordelingValg.LIKT) {
        return antallUkerFellesperiode / 2;
    }
    if (fordeling.fordelingValg === FellesperiodeFordelingValg.VIL_VELGE) {
        return getNumberFromNumberInputValue(fordeling.antallUkerFellesperiodeTilSøker);
    }
    return undefined;
};

export const getOppstartsdatoFromFordelingValg = (
    oppstartValg: OppstartValg | undefined,
    oppstartDato: string | undefined,
    termindato: Date | undefined,
    familiehendelsesdato: Date,
    ankomstDatoNorge: Date | undefined,
    sisteDagAnnenForelder: Date | undefined,
    datoForAleneomsorg: Date | undefined,
): Date => {
    if ((!oppstartValg || oppstartValg === OppstartValg.ANNEN_DATO) && oppstartDato) {
        return ISOStringToDate(oppstartDato)!;
    }
    switch (oppstartValg) {
        case OppstartValg.TRE_UKER_FØR_TERMIN:
            return getFørsteUttaksdagForeldrepengerFørFødsel(termindato);
        case OppstartValg.TRE_UKER_FØR_FØDSEL:
            return getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
        case OppstartValg.FAMILIEHENDELSESDATO:
            return familiehendelsesdato;
        case OppstartValg.ANKOMSTDATO_NORGE:
            return getFørsteUttaksdagAnkomstdatoNorge(ankomstDatoNorge);
        case OppstartValg.DAGEN_ETTER_ANNEN_FORELDER:
            return getNesteUttaksdagEtterAnnenForelder(sisteDagAnnenForelder);
        case OppstartValg.DATO_FOR_ALENEOMSORG:
            return getFørsteUttaksdagDatoForAleneomsorg(datoForAleneomsorg);
        default:
            throw new Error('Ukjent verdi på oppstartValg.');
    }
};
