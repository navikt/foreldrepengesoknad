import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { isUtsettelsePgaArbeid } from 'types/Periode';
import { RegelTest, RegelTestresultat } from 'validering/utils/types/regelTypes';

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
