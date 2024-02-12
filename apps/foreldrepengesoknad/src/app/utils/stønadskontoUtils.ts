import { Dekningsgrad, StønadskontoType, TilgjengeligStønadskonto } from '@navikt/fp-common';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';

const opprettAktivitetsFriKonto = (
    kontoer: TilgjengeligStønadskonto[],
    generellMinsterett: number,
): TilgjengeligStønadskonto[] => {
    const nyeKontoer: TilgjengeligStønadskonto[] = [];
    nyeKontoer.push({ ...kontoer[0], dager: kontoer[0].dager - generellMinsterett });
    nyeKontoer.push({ konto: StønadskontoType.AktivitetsfriKvote, dager: generellMinsterett });
    return nyeKontoer;
};

export const mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto = (
    stønadskontoerDTO: TilgjengeligeStønadskontoerDTO,
): TilgjengeligStønadskonto[] => {
    let tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = [];

    Object.keys(stønadskontoerDTO.kontoer)
        .filter((konto: string) => konto !== StønadskontoType.Flerbarnsdager)
        .forEach((konto) => {
            tilgjengeligeStønadskontoer.push({
                konto: konto as StønadskontoType,
                dager: stønadskontoerDTO.kontoer[konto],
            });
        });

    const generellMinsterett = stønadskontoerDTO.minsteretter.generellMinsterett;

    if (generellMinsterett > 0) {
        tilgjengeligeStønadskontoer = opprettAktivitetsFriKonto(tilgjengeligeStønadskontoer, generellMinsterett);
    }
    return tilgjengeligeStønadskontoer;
};

export const getValgtStønadskontoFor80Og100Prosent = (
    kontoer80: TilgjengeligeStønadskontoerDTO,
    kontoer100: TilgjengeligeStønadskontoerDTO,
) => {
    const åttiProsent = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(kontoer80);
    const hundreProsent = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(kontoer100);
    return {
        [Dekningsgrad.ÅTTI_PROSENT]: åttiProsent,
        [Dekningsgrad.HUNDRE_PROSENT]: hundreProsent,
    };
};

export const getValgtMinsterett = (
    dekningsgrad: Dekningsgrad,
    tilgjengeligeStønadskontoer100: TilgjengeligeStønadskontoerDTO | undefined,
    tilgjengeligeStønadskontoer80: TilgjengeligeStønadskontoerDTO | undefined,
) => {
    if (!tilgjengeligeStønadskontoer100 || !tilgjengeligeStønadskontoer80) {
        return undefined;
    }
    return dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
        ? tilgjengeligeStønadskontoer100.minsteretter
        : tilgjengeligeStønadskontoer80.minsteretter;
};
