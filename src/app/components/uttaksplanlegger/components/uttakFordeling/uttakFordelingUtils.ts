import { TilgjengeligeDager } from 'shared/types';
import { Forelder } from 'common/types';
import { FordelingIkkeDeltOmsorg, FordelingDeltOmsorg } from 'shared/components/fordelingGraf/types';
import { BrukteDager } from './brukteDagerUtils';

export const getProsentFordelingPerDel = (
    tilgjengeligeDager: TilgjengeligeDager,
    inkluderForeldrepengerFørTermin: boolean
): {
    pstMor: number;
    pstFelles: number;
    pstFarMedmor: number;
} => {
    const pstMultiplikator =
        100 / (inkluderForeldrepengerFørTermin ? tilgjengeligeDager.dagerTotalt : tilgjengeligeDager.dagerEtterTermin);

    const pstMor =
        pstMultiplikator * tilgjengeligeDager.dagerMor +
        (inkluderForeldrepengerFørTermin ? tilgjengeligeDager.dagerForeldrepengerFørFødsel : 0);
    const pstFarMedmor = pstMultiplikator * tilgjengeligeDager.dagerFarMedmor;
    const pstFelles = 100 - pstMor - pstFarMedmor;

    return {
        pstMor,
        pstFarMedmor,
        pstFelles,
    };
};

export const getFordelingDeltOmsorg = (
    tilgjengeligeDager: TilgjengeligeDager,
    brukteDager: BrukteDager
): FordelingDeltOmsorg | undefined => {
    const tg = tilgjengeligeDager;
    const morsDager = brukteDager.mor;
    const farMedmorsDager = brukteDager.farMedmor;

    const pstTildelt = 100 / tilgjengeligeDager.dagerTotalt;

    const dagerTildeltMor = tg.dagerMor + tg.dagerForeldrepengerFørFødsel;
    const dagerBruktMorsDel = morsDager.dagerEgneKvoter + farMedmorsDager.dagerAnnenForeldersKvote;
    const dagerForMyeBruktAvMorsDel = Math.max(0, dagerBruktMorsDel - dagerTildeltMor);

    const dagerTildeltFarMedmor = tg.dagerFarMedmor;
    const dagerBruktFarMedmorsDel = farMedmorsDager.dagerEgneKvoter + morsDager.dagerAnnenForeldersKvote;
    const dagerForMyeBruktAvFarMedmorsDel = Math.max(0, dagerBruktFarMedmorsDel - dagerTildeltFarMedmor);

    const dagerTildeltFelles = tg.dagerFelles;

    const pstTildeltMor = dagerTildeltMor * pstTildelt;
    const pstTildeltFarMedmor = dagerTildeltFarMedmor * pstTildelt;
    const pstTildeltFelles = dagerTildeltFelles * pstTildelt;

    const pstIMorsDel = 100 / Math.max(dagerTildeltMor, dagerBruktMorsDel + dagerForMyeBruktAvMorsDel);
    const pstIFarMedmorsDel =
        100 / Math.max(dagerTildeltFarMedmor, dagerBruktFarMedmorsDel + dagerForMyeBruktAvFarMedmorsDel);
    const pstIFellesdel =
        100 / Math.max(dagerTildeltFelles, morsDager.dagerFellesperiode + farMedmorsDager.dagerFellesperiode);

    return {
        type: 'deltOmsorg',
        mor: {
            pstAvTotal: pstTildeltMor,
            pstBrukt: (morsDager.dagerEgneKvoter + farMedmorsDager.dagerAnnenForeldersKvote) * pstIMorsDel,
            pstOverførtTilAnnenForelder: 0, // farMedmorsDager.dagerAnnenForeldersKvote * pstIMorsDel,
            pstForMye: dagerForMyeBruktAvMorsDel * pstIMorsDel,
        },
        felles: {
            pstAvTotal: pstTildeltFelles,
            pstBruktMor: morsDager.dagerFellesperiode * pstIFellesdel,
            pstBruktFar: farMedmorsDager.dagerFellesperiode * pstIFellesdel,
            pstForMye: 0,
        },
        farMedmor: {
            pstAvTotal: pstTildeltFarMedmor,
            pstBrukt: (dagerBruktFarMedmorsDel + morsDager.dagerAnnenForeldersKvote) * pstIFarMedmorsDel,
            pstOverførtTilAnnenForelder: 0, // farMedmorsDager.dagerAnnenForeldersKvote * pstIFarMedmorsDel,
            pstForMye: dagerForMyeBruktAvFarMedmorsDel * pstIFarMedmorsDel,
        },
    };
    return undefined;
};

export const getFordelingIkkeDeltOmsorg = (
    tilgjengeligeDager: TilgjengeligeDager,
    dagerBrukt: number,
    forelder: Forelder
): FordelingIkkeDeltOmsorg => {
    const tg = tilgjengeligeDager;
    const enDagIProsent = 100 / Math.max(tg.dagerTotalt, dagerBrukt);
    const dagerForMye = Math.max(0, dagerBrukt - tg.dagerTotalt);
    const pstBrukt = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, dagerBrukt));
    const pstForMye = dagerForMye > 0 ? Math.min(100, enDagIProsent * dagerForMye) : undefined;

    return {
        type: 'ikkeDeltOmsorg',
        forelder,
        pstBrukt,
        pstForMye,
    };
};
