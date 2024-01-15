import { FordelingType, KvoteFordeling, KvoteInformasjon, getFormattedMessage } from './FordelingOversikt';
import { getAntallUkerMødrekvote } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { StønadskontoType, TilgjengeligStønadskonto } from '@navikt/fp-common';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';

const MORS_UKER_FØR_FØDSEL = 3;
const MORS_UKER_ETTER_FØDSEL = 6;

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

export const getFordelingFarMedmorFødselBeggeHarRett = (kontoer: TilgjengeligStønadskonto[]): KvoteInformasjon[] => {
    const antallUkerMor = getAntallUkerMødrekvote(kontoer);

    const førFødsel: KvoteFordeling = {
        uker: MORS_UKER_FØR_FØDSEL,
        tekst: getFormattedMessage('fordeling.info.mor.førFødsel'),
    };

    const seksUkerEtterFødsel: KvoteFordeling = {
        uker: MORS_UKER_ETTER_FØDSEL,
        tekst: getFormattedMessage('fordeling.info.mor.første6Uker'),
    };

    const restAntallUkerMor = antallUkerMor - MORS_UKER_ETTER_FØDSEL;
    const restUkerMor: KvoteFordeling = {
        uker: restAntallUkerMor,
        tekst: getFormattedMessage('fordeling.info.mor.resterendeUker', { antallUker: restAntallUkerMor }),
    };

    const far: KvoteFordeling = {
        uker: 15,
        tekst: getFormattedMessage('fordeling.info.farMedmor', { antallUker: 15 }),
    };

    const felles: KvoteFordeling = {
        uker: 16,
        tekst: getFormattedMessage('fordeling.info.felles', { antallUker: 16 }),
    };

    const kvoteInformasjonMorsKvote = {
        antallUker: antallUkerMor,
        kvoteTittel: `${antallUkerMor + MORS_UKER_FØR_FØDSEL} uker til deg`, //TODO: Remove  this and figure out when displaying?
        kvoteNavn: 'DIN KVOTE', //TODO: Remove  this and figure out when displaying?
        colorClass: getFordelingBoxColorClass(FordelingType.Mor, false), //TODO: Remove  this and figure out when displaying?
        fordeling: [førFødsel, seksUkerEtterFødsel, restUkerMor],
        konto: StønadskontoType.Mødrekvote,
        type: FordelingType.Mor,
    };

    const kvoteInformasjonFarsKvote = {
        antallUker: 15,
        kvoteTittel: '15 uker til Petter',
        kvoteNavn: 'PETTER SIN KVOTE',
        colorClass: getFordelingBoxColorClass(FordelingType.FarMedmor, true),
        fordeling: [far],
        konto: StønadskontoType.Fedrekvote,
        type: FordelingType.FarMedmor,
    };

    const kvoteInformasjonFellesKvote = {
        antallUker: 16,
        kvoteTittel: '16 uker skal deles, fellesperiode',
        kvoteNavn: 'FELLESPERIODE',
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
): KvoteInformasjon[] => {
    switch (scenario) {
        case 'farMedmorFødselBeggeHarRett':
            return getFordelingFarMedmorFødselBeggeHarRett(kontoer);
        default:
            return getFordelingFarMedmorFødselBeggeHarRett(kontoer);
        // case 'farMedmorAleneomsorgFødselAdopsjon':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'farMedmorFødselMorHarIkkeRett':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'farMedmorFørstegangssøknadMedAnnenPart':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'morFarAdopsjon':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'morFødsel':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'morFarFødselAnnenForelderHarRettIEØS':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
        // case 'morFarAdopsjonAnnenForelderHarRettIEØS':
        //     return getFordelingFarMedmorFødselBeggeHarRett();
    }
};
