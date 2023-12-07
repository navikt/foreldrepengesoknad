import { Dekningsgrad, Periode, Tilleggsopplysninger } from '@navikt/fp-common';

export type UttaksplanMetaData = {
    annenPartsUttakErLagtTilIPlan?: boolean;
    harUttaksplanBlittSlettet?: boolean;
    dekningsgrad?: Dekningsgrad;
    perioderSomSkalSendesInn?: Periode[];
    antallUkerIUttaksplan?: number;
    endringstidspunkt?: Date;
    tilleggsopplysninger?: Tilleggsopplysninger;
    ønskerJustertUttakVedFødsel?: boolean;
};
