import { RegelStatus, RegelAvvik } from 'shared/regler/regelTypes';
import { Dictionary } from 'lodash';
import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import { Søknadsinfo } from 'app/selectors/types';
import { Tilleggsopplysninger } from 'app/types/søknad/Søknad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Uttaksstatus } from 'app/util/uttaksplan/uttaksstatus';
import { EksisterendeSak } from 'app/types/EksisterendeSak';

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
    uttaksstatus: Uttaksstatus;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    tilleggsopplysninger: Tilleggsopplysninger;
    perioderSomSkalSendesInn: Periode[];
    eksisterendeUttaksplan: Periode[] | undefined;
    arbeidsforhold: Arbeidsforhold[];
    eksisterendeSak?: EksisterendeSak;
}
