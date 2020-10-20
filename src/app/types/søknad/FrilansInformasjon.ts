import { TidsperiodeDatoInputVerdiMedValgfriSluttdato } from 'common/types';
import { DatoInputVerdi } from '../../../common/components/skjema/elements/dato-input/DatoInput';

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: Partial<TidsperiodeDatoInputVerdiMedValgfriSluttdato>;
    pågående: boolean;
}

export interface FrilansInformasjon {
    jobberFremdelesSomFrilans: boolean;
    oppstart: DatoInputVerdi;
    driverFosterhjem?: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdrag[];
}

export type FrilansInformasjonPartial = Partial<FrilansInformasjon>;
export type FrilansOppdragPartial = Partial<FrilansOppdrag>;
