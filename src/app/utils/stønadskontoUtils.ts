import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

const opprettAktivitetsFriKonto = (
    kontoer: TilgjengeligStønadskonto[],
    generellMinsterett: number
): TilgjengeligStønadskonto[] => {
    const nyeKontoer: TilgjengeligStønadskonto[] = [];
    nyeKontoer.push({ ...kontoer[0], dager: kontoer[0].dager - generellMinsterett });
    nyeKontoer.push({ konto: StønadskontoType.AktivitetsfriKvote, dager: generellMinsterett });
    return nyeKontoer;
};

const mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto = (
    stønadskontoerDTO: TilgjengeligeStønadskontoerDTO
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
    kontoer100: TilgjengeligeStønadskontoerDTO
) => {
    const åttiProsent = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(kontoer80);
    const hundreProsent = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(kontoer100);
    return {
        [Dekningsgrad.ÅTTI_PROSENT]: åttiProsent,
        [Dekningsgrad.HUNDRE_PROSENT]: hundreProsent,
    };
};
