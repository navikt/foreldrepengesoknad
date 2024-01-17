import { Dekningsgrad, Periode } from '@navikt/fp-common';

export type UttaksplanMetaData = {
    annenPartsUttakErLagtTilIPlan?: boolean;
    harUttaksplanBlittSlettet?: boolean;
    dekningsgrad?: Dekningsgrad;
    perioderSomSkalSendesInn?: Periode[];
    antallUkerIUttaksplan?: number;
    endringstidspunkt?: Date;
    ønskerJustertUttakVedFødsel?: boolean;
};
