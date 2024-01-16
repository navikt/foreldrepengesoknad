import { FordelingType, DelInformasjon, getFormattedMessage } from './FordelingOversikt';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { StønadskontoType, TilgjengeligStønadskonto, intlUtils, uttaksConstants } from '@navikt/fp-common';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';
import { IntlShape } from 'react-intl';

export const getErAnnenForeldersDel = (erFarEllerMedmor: boolean, type: FordelingType): boolean | undefined => {
    if (type === FordelingType.Felles) {
        return undefined;
    }
    if ((erFarEllerMedmor && type === FordelingType.Mor) || (!erFarEllerMedmor && type === FordelingType.FarMedmor)) {
        return true;
    }
    return false;
};

export const getFordelingType = (konto: StønadskontoType, erFarEllerMedmor: boolean): FordelingType => {
    switch (konto) {
        case StønadskontoType.ForeldrepengerFørFødsel:
            return FordelingType.Mor;
        case StønadskontoType.Mødrekvote:
            return FordelingType.Mor;
        case StønadskontoType.Fedrekvote:
            return FordelingType.FarMedmor;
        case StønadskontoType.Fellesperiode:
            return FordelingType.Felles;
        case StønadskontoType.Foreldrepenger:
        case StønadskontoType.Flerbarnsdager:
            return erFarEllerMedmor ? FordelingType.FarMedmor : FordelingType.Mor;
        case StønadskontoType.AktivitetsfriKvote:
            return FordelingType.FarMedmor;
    }
};

export const getFordelingDelTittel = (
    delInfo: DelInformasjon,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
    navnMor: string,
    navnFarMedmor: string,
): string => {
    switch (delInfo.type) {
        case FordelingType.Mor:
            return !erFarEllerMedmor
                ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                      antallUker: delInfo.sumUker,
                  })
                : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                      antallUker: delInfo.sumUker,
                      navn: navnMor,
                  });
        case FordelingType.FarMedmor:
            return erFarEllerMedmor
                ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                      antallUker: delInfo.sumUker,
                  })
                : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                      antallUker: delInfo.sumUker,
                      navn: navnFarMedmor,
                  });
        case FordelingType.Felles:
            return intlUtils(intl, 'fordeling.antallUkerFelles', { antallUker: delInfo.sumUker });
    }
};

export const getFordelingBoxColorClass = (fordelingType: FordelingType, erAnnenForeldersDel?: boolean): string => {
    switch (fordelingType) {
        case FordelingType.Mor:
            return erAnnenForeldersDel ? 'mor-passiv' : 'mor-aktiv';
        case FordelingType.FarMedmor:
            return erAnnenForeldersDel ? 'far-passiv' : 'far-aktiv';
        case FordelingType.Felles:
            return 'fellesperiode';
    }
};

export const getShadowClass = (isUthevet: boolean): string => {
    return isUthevet ? 'shadow' : 'no-shadow';
};

export const getFordelingTekst = (
    konto: StønadskontoType,
    navnMor: string,
    navnFarMedmor: string,
    erAnnenForeldersKvote?: boolean,
): string => {
    switch (konto) {
        case StønadskontoType.Mødrekvote:
            return erAnnenForeldersKvote ? `${navnMor}s del` : 'Din del';
        case StønadskontoType.Fedrekvote:
            return erAnnenForeldersKvote ? `${navnFarMedmor}s del` : 'Din del';
        case StønadskontoType.Fellesperiode:
            return 'Fellesperiode';
        default:
            return '';
    }
};

export const getMorsFordelingBeggeHarRett = (kontoer: TilgjengeligStønadskonto[]): DelInformasjon => {
    const antallUkerMødrekvote = getAntallUkerMødrekvote(kontoer);
    const antallUkerMor = antallUkerMødrekvote + uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL;
    const restAntallUkerMor = antallUkerMødrekvote - uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL;

    return {
        type: FordelingType.Mor,
        sumUker: antallUkerMor,
        fordelingUker: [
            uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
            uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL,
            restAntallUkerMor,
        ],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.mor.førFødsel'),
            getFormattedMessage('fordeling.info.mor.første6Uker'),
            getFormattedMessage('fordeling.info.mor.resterendeUker', { antallUker: restAntallUkerMor }),
        ],
    };
};

export const getFarsFordelingBeggeHarRett = (kontoer: TilgjengeligStønadskonto[]): DelInformasjon => {
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    return {
        type: FordelingType.FarMedmor,
        sumUker: antallUkerFar,
        fordelingUker: [antallUkerFar],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.farMedmor', { antallUker: antallUkerFar }),
            getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', { antallUker: antallUkerFar }),
        ],
    };
};

export const getFellesFordelingBeggeHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    ukerBruktAvAnnenPart?: number,
    annenPartNavn?: string,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const fordelingUker: number[] = [];
    const fordelingInfo = [getFormattedMessage('fordeling.info.felles', { antallUker: antallUkerFelles })];
    if (ukerBruktAvAnnenPart && ukerBruktAvAnnenPart > 0) {
        const gjenståendeUker = antallUkerFelles - ukerBruktAvAnnenPart;
        fordelingUker.push(gjenståendeUker);
        fordelingUker.push(ukerBruktAvAnnenPart);
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.felles.annenForelder.del1', {
                ukerBruktAvAnnenPart,
                annenPartNavn,
                gjenståendeUker,
            }),
        );
        fordelingInfo.push(getFormattedMessage('fordeling.info.felles.annenForelder.del2', { annenPartNavn }));
    } else {
        fordelingUker.push(antallUkerFelles);
    }
    return {
        type: FordelingType.Felles,
        sumUker: antallUkerFelles,
        fordelingUker,
        fordelingInfo,
    };
};

export const getFordelingMorFødsel = (kontoer: TilgjengeligStønadskonto[]): DelInformasjon[] => {
    const morsDel = getMorsFordelingBeggeHarRett(kontoer);
    const farsDel = getFarsFordelingBeggeHarRett(kontoer);
    const fellesDel = getFellesFordelingBeggeHarRett(kontoer);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingFarMedmorFørstegangssøknadMedAnnenPart = (
    kontoer: TilgjengeligStønadskonto[],
): DelInformasjon[] => {
    const morsDel = getMorsFordelingBeggeHarRett(kontoer);
    const farsDel = getFarsFordelingBeggeHarRett(kontoer);
    const fellesDel = getFellesFordelingBeggeHarRett(kontoer);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingForScenario = (
    scenario: UttaksplanInfoScenario,
    kontoer: TilgjengeligStønadskonto[],
): DelInformasjon[] => {
    switch (scenario) {
        case 'morFødsel':
            return getFordelingMorFødsel(kontoer);
        case 'farMedmorFørstegangssøknadMedAnnenPart':
            return getFordelingFarMedmorFørstegangssøknadMedAnnenPart(kontoer);
        default:
            return getFordelingMorFødsel(kontoer);
        // case 'farMedmorAleneomsorgFødselAdopsjon':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'farMedmorFødselMorHarIkkeRett':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'farMedmorFørstegangssøknadMedAnnenPart':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'morFarAdopsjon':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'morFarFødselAnnenForelderHarRettIEØS':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'morFarAdopsjonAnnenForelderHarRettIEØS':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
    }
};
