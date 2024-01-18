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
    const varighetTekst = getVarighetString(delInfo.sumUker * 5, intl);
    switch (delInfo.eier) {
        case FordelingEier.Mor:
            return !erFarEllerMedmor
                ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                      varighetTekst,
                  })
                : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                      varighetTekst,
                      navn: navnMor,
                  });
        case FordelingEier.FarMedmor:
            return erFarEllerMedmor
                ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                      varighetTekst,
                  })
                : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                      varighetTekst,
                      navn: navnFarMedmor,
                  });
        case FordelingEier.Felles:
            return intlUtils(intl, 'fordeling.antallUkerFelles', { varighetTekst });
    }
};

export const getShadowClass = (isUthevet: boolean): string => {
    return isUthevet ? 'shadow' : 'no-shadow';
};

export const getMorsFordelingBeggeHarRettFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerMødrekvote = getAntallUkerMødrekvote(kontoer);
    const antallUkerMor = antallUkerMødrekvote + uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL;
    const restAntallUkerMor = antallUkerMødrekvote - uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL;
    const fargekode = erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR;
    const varighetTekst = getVarighetString(restAntallUkerMor * 5, intl);
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
            getFormattedMessage('fordeling.info.mor.resterendeUker', { varighetTekst }),
        ],
    };
};

export const getMorsFordelingBeggeHarRettAdopsjon = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUker = getAntallUkerMødrekvote(kontoer);
    const fargekode = erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR;
    const varighetTekst = getVarighetString(antallUker * 5, intl);
    return {
        eier: FordelingEier.Mor,
        sumUker: antallUker,
        fordelingUker: [{ antallUker, fargekode }],
        fordelingInfo: [getFormattedMessage('fordeling.info.mor.adopsjon', { varighetTekst })],
    };
};

export const getFarsFordelingBeggeHarRettFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erBarnetFødt: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    const fargekode = erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR;
    const terminEllerFødsel = erBarnetFødt ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
    const varighetTekst = getVarighetString(antallUkerFar * 5, intl);
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: antallUkerFar,
        fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.farMedmor.fødsel', { varighetTekst }),
            getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', { terminEllerFødsel }),
        ],
    };
};

export const getFarsFordelingBeggeHarRettAdopsjon = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    const varighetTekst = getVarighetString(antallUkerFar * 5, intl);
    const fargekode = erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR;
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: antallUkerFar,
        fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
        fordelingInfo: [getFormattedMessage('fordeling.info.farMedmor.adopsjon', { varighetTekst })],
    };
};

export const getFellesFordelingBeggeHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    erAdopsjon: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const varighetFelles = getVarighetString(antallUkerFelles * 5, intl);
    const innen3ÅrTekst = erAdopsjon
        ? intlUtils(intl, 'innen3ÅrSidenAdopsjon')
        : intlUtils(intl, 'innenBarnetFyller3År');
    return {
        eier: FordelingEier.Felles,
        sumUker: antallUkerFelles,
        fordelingUker: [{ antallUker: antallUkerFelles, fargekode: FordeligFargekode.IKKE_TILDELT }],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.felles', { varighet: varighetFelles, innen3ÅrTekst }, links.farMedmor),
        ],
    };
};

export const getFellesFordelingMedAnnenPart = (
    kontoer: TilgjengeligStønadskonto[],
    dagerBruktAvAnnenPart: number,
    annenPartNavn: string,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const varighetStringFellesperiode = getVarighetString(antallUkerFelles * 5, intl);
    const gjenståendeUker = antallUkerFelles - dagerBruktAvAnnenPart / 5;
    const varighetStringAnnenPart = getVarighetString(dagerBruktAvAnnenPart, intl);
    const innen3ÅrTekst = erAdopsjon
        ? intlUtils(intl, 'innen3ÅrSidenAdopsjon')
        : intlUtils(intl, 'innenBarnetFyller3År');
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
            getFormattedMessage(
                'fordeling.info.felles',
                { varighet: varighetStringFellesperiode, innen3ÅrTekst },
                links.farMedmor,
            ),
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
    erBarnetFødt: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    const morsDel = getMorsFordelingBeggeHarRettFødsel(kontoer, erFarEllerMedmor, intl);
    const farsDel = getFarsFordelingBeggeHarRettFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, intl);
    const fellesDel = getFellesFordelingBeggeHarRett(kontoer, false, intl);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingFarMedmorFørstegangssøknadMedAnnenPart = (
    kontoer: TilgjengeligStønadskonto[],
    dagerFellesperiodeBruktAvAnnenPart: number,
    navnMor: string,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    erBarnetFødt: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    const morsDel = erAdopsjon
        ? getMorsFordelingBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, intl)
        : getMorsFordelingBeggeHarRettFødsel(kontoer, erFarEllerMedmor, intl);
    const farsDel = erAdopsjon
        ? getFarsFordelingBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, intl)
        : getFarsFordelingBeggeHarRettFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, intl);
    const fellesDel =
        dagerFellesperiodeBruktAvAnnenPart > 0
            ? getFellesFordelingMedAnnenPart(
                  kontoer,
                  dagerFellesperiodeBruktAvAnnenPart,
                  navnMor,
                  true,
                  erAdopsjon,
                  intl,
              )
            : getFellesFordelingBeggeHarRett(kontoer, erAdopsjon, intl);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingMorFarAdopsjon = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
) => {
    const morsDel = getMorsFordelingBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, intl);
    const farsDel = getFarsFordelingBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, intl);
    const fellesDel = getFellesFordelingBeggeHarRett(kontoer, true, intl);
    return [morsDel, fellesDel, farsDel];
};
