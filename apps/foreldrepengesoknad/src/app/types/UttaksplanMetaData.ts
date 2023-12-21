import { Periode, Tilleggsopplysninger } from '@navikt/fp-common';

export type UttaksplanMetaData = {
    annenPartsUttakErLagtTilIPlan?: boolean;
    harUttaksplanBlittSlettet?: boolean;
    perioderSomSkalSendesInn?: Periode[];
    antallUkerIUttaksplan?: number;
    endringstidspunkt?: Date;
    tilleggsopplysninger?: Tilleggsopplysninger;
    ønskerJustertUttakVedFødsel?: boolean;
};
