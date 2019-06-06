import { RegelStatus, RegelAvvik } from 'shared/regler/regelTypes';
import { Dictionary } from 'lodash';
import { Periode, Stønadskontouttak, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import { Søknadsinfo } from 'app/selectors/types';
import { Tilleggsopplysninger } from 'app/types/søknad/Søknad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

export type UttaksplanAvvikType = 'forretning' | 'skjema';

export interface UttaksplanRegelTestresultat {
    resultat: RegelStatus[];
    avvikPerPeriode: Dictionary<RegelAvvik[]>;
    avvik: RegelAvvik[];
    harFeil: boolean;
}

export interface UttaksplanRegelgrunnlag {
    perioder: Periode[];
    søknadsinfo: Søknadsinfo;
    uttaksstatusStønadskontoer: Stønadskontouttak[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    tilleggsopplysninger: Tilleggsopplysninger;
    perioderSomSkalSendesInn: Periode[];
    eksisterendeUttaksplan: Periode[] | undefined;
    arbeidsforhold: Arbeidsforhold[];
}
