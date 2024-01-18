import { FordelingEier, DelInformasjon, getFormattedMessage, FordeligFargekode } from './FordelingOversikt';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligStønadskonto, getVarighetString, intlUtils, uttaksConstants } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { links } from '@navikt/fp-constants';

export const getFordelingDelTittel = (
    delInfo: DelInformasjon,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
    navnMor: string,
    navnFarMedmor: string,
): string => {
    switch (delInfo.eier) {
        case FordelingEier.Mor:
            return !erFarEllerMedmor
                ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                      antallUker: delInfo.sumUker,
                  })
                : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                      antallUker: delInfo.sumUker,
                      navn: navnMor,
                  });
        case FordelingEier.FarMedmor:
            return erFarEllerMedmor
                ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                      antallUker: delInfo.sumUker,
                  })
                : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                      antallUker: delInfo.sumUker,
                      navn: navnFarMedmor,
                  });
        case FordelingEier.Felles:
            return intlUtils(intl, 'fordeling.antallUkerFelles', { antallUker: delInfo.sumUker });
    }
};

export const getShadowClass = (isUthevet: boolean): string => {
    return isUthevet ? 'shadow' : 'no-shadow';
};

export const getMorsFordelingBeggeHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
): DelInformasjon => {
    const antallUkerMødrekvote = getAntallUkerMødrekvote(kontoer);
    const antallUkerMor = antallUkerMødrekvote + uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL;
    const restAntallUkerMor = antallUkerMødrekvote - uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL;
    const fargekode = erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR;
    return {
        eier: FordelingEier.Mor,
        sumUker: antallUkerMor,
        fordelingUker: [
            {
                antallUker: uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
                fargekode,
            },
            { antallUker: uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL, fargekode },
            { antallUker: restAntallUkerMor, fargekode },
        ],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.mor.førFødsel'),
            getFormattedMessage('fordeling.info.mor.første6Uker'),
            getFormattedMessage('fordeling.info.mor.resterendeUker', { antallUker: restAntallUkerMor }),
        ],
    };
};

export const getFarsFordelingBeggeHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
): DelInformasjon => {
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    const fargekode = erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR;
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: antallUkerFar,
        fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.farMedmor', { antallUker: antallUkerFar }),
            getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', { antallUker: antallUkerFar }),
        ],
    };
};

export const getFellesFordelingBeggeHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const varighetFelles = getVarighetString(antallUkerFelles * 5, intl);
    return {
        eier: FordelingEier.Felles,
        sumUker: antallUkerFelles,
        fordelingUker: [{ antallUker: antallUkerFelles, fargekode: FordeligFargekode.IKKE_TILDELT }],
        fordelingInfo: [getFormattedMessage('fordeling.info.felles', { varighet: varighetFelles }, links.farMedmor)],
    };
};

export const getFellesFordelingMedAnnenPart = (
    kontoer: TilgjengeligStønadskonto[],
    dagerBruktAvAnnenPart: number,
    annenPartNavn: string,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const varighetStringFellesperiode = getVarighetString(antallUkerFelles * 5, intl);
    const gjenståendeUker = antallUkerFelles - dagerBruktAvAnnenPart / 5;
    const varighetStringAnnenPart = getVarighetString(dagerBruktAvAnnenPart, intl);
    return {
        eier: FordelingEier.Felles,
        sumUker: antallUkerFelles,
        fordelingUker: [
            {
                antallUker: dagerBruktAvAnnenPart / 5,
                fargekode: erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.ANNEN_PART_FAR,
            },
            { antallUker: gjenståendeUker, fargekode: FordeligFargekode.IKKE_TILDELT },
        ],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.felles', { varighet: varighetStringFellesperiode }, links.farMedmor),
            getFormattedMessage('fordeling.info.felles.annenForelder.del1', {
                varighet: varighetStringAnnenPart,
                annenPartNavn,
                gjenståendeUker,
            }),
            getFormattedMessage('fordeling.info.felles.annenForelder.del2', { annenPartNavn }),
        ],
    };
};

export const getFordelingMorFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    const morsDel = getMorsFordelingBeggeHarRett(kontoer, erFarEllerMedmor);
    const farsDel = getFarsFordelingBeggeHarRett(kontoer, erFarEllerMedmor);
    const fellesDel = getFellesFordelingBeggeHarRett(kontoer, intl);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingFarMedmorFørstegangssøknadMedAnnenPart = (
    kontoer: TilgjengeligStønadskonto[],
    dagerFellesperiodeBruktAvAnnenPart: number,
    navnMor: string,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    const morsDel = getMorsFordelingBeggeHarRett(kontoer, erFarEllerMedmor);
    const farsDel = getFarsFordelingBeggeHarRett(kontoer, erFarEllerMedmor);
    const fellesDel =
        dagerFellesperiodeBruktAvAnnenPart > 0
            ? getFellesFordelingMedAnnenPart(kontoer, dagerFellesperiodeBruktAvAnnenPart, navnMor, true, intl)
            : getFellesFordelingBeggeHarRett(kontoer, intl);
    return [morsDel, fellesDel, farsDel];
};
