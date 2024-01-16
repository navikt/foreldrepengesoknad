import { FordelingType, KvoteFordeling, KvoteInformasjon, getFormattedMessage } from './FordelingOversikt';
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

export const getFordelingFødselBeggeHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    intl: IntlShape,
    navnMor: string,
    navnFarMedmor: string,
    erFarEllerMedmor: boolean,
): KvoteInformasjon[] => {
    const antallUkerMødrekvote = getAntallUkerMødrekvote(kontoer);
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const førFødsel: KvoteFordeling = {
        uker: uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
        tekst: getFormattedMessage('fordeling.info.mor.førFødsel'),
    };

    const seksUkerEtterFødsel: KvoteFordeling = {
        uker: uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL,
        tekst: getFormattedMessage('fordeling.info.mor.første6Uker'),
    };

    const restAntallUkerMor = antallUkerMødrekvote - uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL;
    const antallUkerMor = antallUkerMødrekvote + uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL;
    const restUkerMor: KvoteFordeling = {
        uker: restAntallUkerMor,
        tekst: getFormattedMessage('fordeling.info.mor.resterendeUker', { antallUker: restAntallUkerMor }),
    };

    const far: KvoteFordeling = {
        uker: antallUkerFar,
        tekst: getFormattedMessage('fordeling.info.farMedmor', { antallUker: antallUkerFar }),
    };

    const felles: KvoteFordeling = {
        uker: antallUkerFelles,
        tekst: getFormattedMessage('fordeling.info.felles', { antallUker: antallUkerFelles }),
    };

    const kvoteInformasjonMorsKvote = {
        antallUker: antallUkerMødrekvote,
        kvoteTittel: erFarEllerMedmor //TODO: Remove  this and figure out when displaying?
            ? intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                  antallUker: antallUkerMor,
                  navn: navnMor,
              })
            : intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                  antallUker: antallUkerFar,
              }),
        colorClass: getFordelingBoxColorClass(FordelingType.Mor, false), //TODO: Remove  this and figure out when displaying?
        fordeling: [førFødsel, seksUkerEtterFødsel, restUkerMor], //TODO: Må splittes i fordelingUker og fordelingTekster
        konto: StønadskontoType.Mødrekvote, //TODO: skal man heller beholde type? Dette er boks per hva en person skal ha.
        type: FordelingType.Mor, //TODO: Type kan man finne senere ved display hvis konto beholdes? men heller beholde denne.
    };

    const kvoteInformasjonFarsKvote = {
        antallUker: 15,
        kvoteTittel: erFarEllerMedmor
            ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                  antallUker: antallUkerFar,
              })
            : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                  antallUker: antallUkerFar,
                  navn: navnFarMedmor,
              }),
        colorClass: getFordelingBoxColorClass(FordelingType.FarMedmor, true),
        fordeling: [far],
        konto: StønadskontoType.Fedrekvote,
        type: FordelingType.FarMedmor,
    };

    const kvoteInformasjonFellesKvote = {
        antallUker: 16,
        kvoteTittel: intlUtils(intl, 'fordeling.antallUkerFelles', { antallUker: antallUkerFelles }),
        colorClass: getFordelingBoxColorClass(FordelingType.Felles),
        fordeling: [felles],
        konto: StønadskontoType.Fellesperiode,
        type: FordelingType.Felles,
    };
    return [kvoteInformasjonMorsKvote, kvoteInformasjonFellesKvote, kvoteInformasjonFarsKvote];
};

export const getFordelingForScenario = (
    scenario: UttaksplanInfoScenario,
    kontoer: TilgjengeligStønadskonto[],
    intl: IntlShape,
    navnMor: string,
    navnFarMedmor: string,
): KvoteInformasjon[] => {
    switch (scenario) {
        case 'morFødsel':
            return getFordelingFødselBeggeHarRett(kontoer, intl, navnMor, navnFarMedmor, false);
        default:
            return getFordelingFødselBeggeHarRett(kontoer, intl, navnMor, navnFarMedmor, true);
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
