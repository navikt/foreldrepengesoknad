import { FordelingStatusHeaderProps } from './components/FordelingStatusHeader';
import { InjectedIntl } from 'react-intl';
import { RegelAvvik, RegelAlvorlighet } from 'shared/types/regelTypes';
import getMessage from 'common/util/i18nUtils';
import { GrafDeltOmsorgProps } from './components/GrafDeltOmsorg';
import { GrafAleneomsorgProps } from './components/GrafAleneomsorg';
import { FordelingTitlerProps } from './components/FordelingTitler';
import { FordelingStatus, getFordelingStatus } from './fordelingStatusUtils';
import { TilgjengeligeDager, Forbruk, OmForeldre, MorsForbruk, Forelder, ForelderForbruk } from 'shared/types';

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
    const pstFarMedmor = pstMultiplikator * tilgjengeligeDager.dagerFar;
    const pstFelles = 100 - pstMor - pstFarMedmor;

    return {
        pstMor,
        pstFarMedmor,
        pstFelles
    };
};

export const getFordelingStatusHeaderProps = (
    regelAvvik: RegelAvvik[],
    forbruk: Forbruk,
    omForeldre: OmForeldre,
    intl: InjectedIntl
): FordelingStatusHeaderProps => {
    const planenHarFordelingsavvik =
        regelAvvik.filter(
            (avvik) => avvik.regel.alvorlighet !== RegelAlvorlighet.INFO && avvik.regel.kategori === 'fordeling'
        ).length > 0;
    const planenHarAvvikSomErFeil =
        regelAvvik.filter(
            (avvik) => avvik.regel.alvorlighet === RegelAlvorlighet.FEIL && avvik.regel.kategori !== 'fordeling'
        ).length > 0;

    const fordelingStatus: FordelingStatus =
        planenHarAvvikSomErFeil && !planenHarFordelingsavvik
            ? { status: 'feil', tittel: { key: 'regel.feil.uttaksplanStatusTittel' } }
            : getFordelingStatus(forbruk, omForeldre, intl);

    return {
        ariaTitle: 'Status på planen',
        status: fordelingStatus.status,
        tittel: getMessage(intl, `fordeling.tittel.${omForeldre.erDeltOmsorg ? 'deres' : 'din'}`),
        statusTekst: getMessage(intl, fordelingStatus.tittel.key, fordelingStatus.tittel.values)
    };
};

export const getGrafAleneomsorgMorProps = (
    dagerTotalt: number,
    dagerForeldrepengerFørFødsel: number,
    ekstradagerFørTermin: number,
    mor: MorsForbruk,
    tilgjengeligeDager: TilgjengeligeDager
): GrafAleneomsorgProps => {
    const tg = tilgjengeligeDager;
    const maksTillatt = tg.dagerForeldrepenger + dagerForeldrepengerFørFødsel;
    const maksBrukt = mor.dagerUtenForeldrepengerFørFødsel + dagerForeldrepengerFørFødsel + ekstradagerFørTermin;

    const enDagIProsent = 100 / Math.max(maksBrukt, maksTillatt);
    const brukIProsent = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, dagerTotalt));
    const pstForMye = mor.dagerForMye > 0 ? Math.min(100, enDagIProsent * mor.dagerForMye) : undefined;
    return {
        pstBrukt: brukIProsent,
        pstForMye,
        forelder: Forelder.farMedmor
    };
};

export const getGrafAleneomsorgFarMedmorProps = (
    dagerTotalt: number,
    farMedmor: ForelderForbruk,
    tilgjengeligeDager: TilgjengeligeDager
): GrafAleneomsorgProps => {
    const tg = tilgjengeligeDager;
    const enDagIProsent = 100 / Math.max(tg.dagerTotalt, farMedmor.dagerTotalt);
    const brukIProsent = Math.min(100, enDagIProsent * Math.min(tg.dagerTotalt, dagerTotalt));
    const pstForMye = farMedmor.dagerForMye > 0 ? Math.min(100, enDagIProsent * farMedmor.dagerForMye) : undefined;
    return {
        pstBrukt: brukIProsent,
        pstForMye,
        forelder: Forelder.farMedmor
    };
};

export const getGrafDeltOmsorgProps = (
    mor: MorsForbruk,
    farMedmor: ForelderForbruk,
    dagerForeldrepengerFørFødsel: number,
    ekstradagerFørTermin: number,
    tilgjengeligeDager: TilgjengeligeDager
): GrafDeltOmsorgProps => {
    const tg = tilgjengeligeDager;
    const morsBrukteDager = mor.dagerEtterTermin + mor.ekstradagerFørTermin;
    const farsBrukteDager = farMedmor.dagerTotalt;
    const { pstMor, pstFarMedmor, pstFelles } = getProsentFordelingPerDel(tilgjengeligeDager, false);
    const morsDagerAvFellesdel = Math.max(0, morsBrukteDager - tg.dagerMor);
    const farsDagerAvFellesdel = Math.max(0, farsBrukteDager - tg.dagerFar);
    const farsForbrukAvEgenKvote = farsBrukteDager >= tg.dagerFar ? 100 : 100 / tg.dagerFar * farsBrukteDager;
    const maksMorsKvoteBar = tg.dagerMor + dagerForeldrepengerFørFødsel + ekstradagerFørTermin;
    const morsBarIPst = Math.min(100, 100 / maksMorsKvoteBar * (morsBrukteDager + dagerForeldrepengerFørFødsel));

    // Felles
    const maksDager = Math.max(tg.dagerFelles, farsDagerAvFellesdel + morsDagerAvFellesdel);
    const dagerForMye = maksDager > tg.dagerFelles ? maksDager - tg.dagerFelles : 0;
    const fellesPst = 100 / (maksDager + dagerForMye);

    return {
        mor: {
            pstAvTotal: pstMor,
            pstBrukt: morsBarIPst
        },
        felles: {
            pstAvTotal: pstFelles,
            pstBruktMor: fellesPst * morsDagerAvFellesdel,
            pstBruktFar: fellesPst * farsDagerAvFellesdel,
            pstForMye: fellesPst * dagerForMye
        },
        farMedmor: {
            pstAvTotal: pstFarMedmor,
            pstBrukt: farsForbrukAvEgenKvote
        }
    };
};

export const getGrafFordelingTitler = (
    omForeldre: OmForeldre,
    mor?: MorsForbruk,
    farMedmor?: ForelderForbruk
): FordelingTitlerProps => {
    return {
        mor:
            mor && !omForeldre.farMedmor && farMedmor !== undefined
                ? {
                      navn: omForeldre.mor.navn,
                      ikonRef: omForeldre.mor.ikonRef,
                      dagerTotalt: mor.dagerTotalt,
                      dagerForLite: mor.dagerForLite,
                      dagerForMye: mor.dagerForMye
                  }
                : undefined,
        farMedmor:
            farMedmor && omForeldre.farMedmor
                ? {
                      navn: omForeldre.farMedmor.navn,
                      ikonRef: omForeldre.farMedmor.ikonRef,
                      dagerTotalt: farMedmor.dagerTotalt,
                      dagerForLite: farMedmor.dagerForLite,
                      dagerForMye: farMedmor.dagerForMye
                  }
                : undefined
    };
};
