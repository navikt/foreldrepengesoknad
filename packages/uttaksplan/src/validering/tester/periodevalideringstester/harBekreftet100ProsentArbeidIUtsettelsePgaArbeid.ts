import { Søknadsinfo, isUtsettelsePgaArbeid } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../../utils/types/regelTypes';

export const harBekreftet100ProsentArbeidIUtsettelsePgaArbeid: RegelTest = (
    grunnlag: Søknadsinfo,
): RegelTestresultat => {
    const utsettelserPgaArbeidUtenBekreftelse = grunnlag.perioder
        .filter(isUtsettelsePgaArbeid)
        .filter((periode) => periode.bekrefterArbeidIPerioden === false);

    return {
        passerer: utsettelserPgaArbeidUtenBekreftelse.length === 0,
        info: utsettelserPgaArbeidUtenBekreftelse.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
