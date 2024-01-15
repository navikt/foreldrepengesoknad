import { FordelingType, KvoteFordeling, KvoteInformasjon, getFormattedMessage } from './FordelingOversikt';
import { getAntallUkerMødrekvote } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { StønadskontoType, TilgjengeligStønadskonto } from '@navikt/fp-common';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';

const MORS_UKER_FØR_FØDSEL = 3;
const MORS_UKER_ETTER_FØDSEL = 6;
export const MØDREKVOTE_FARGE_AKTIV = '#3386E0';
export const MØDREKVOTE_FARGE_PASSIV = '#99C4DD';
export const FEDREKVOTE_FARGE_AKTIV = '#33AA5F';
export const FEDREKVOTE_FARGE_PASSIV = '#99DEAD';
export const FELLESPERIODE_FARGE = '#ECEEF0';
export const MØDREKVOTE_ID = 'MOR';
export const FEDREKVOTE_ID = 'FAR';
export const FELLESPERIODE_ID = 'FEL';

export const getKvoteFarge = (delType: FordelingType, erAnnenForeldersKvote?: boolean): string => {
    switch (delType) {
        case FordelingType.Mor:
            return erAnnenForeldersKvote ? MØDREKVOTE_FARGE_PASSIV : MØDREKVOTE_FARGE_AKTIV;
        case FordelingType.FarMedmor:
            return erAnnenForeldersKvote ? FEDREKVOTE_FARGE_PASSIV : FEDREKVOTE_FARGE_AKTIV;
        default:
            return FELLESPERIODE_FARGE;
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
        kvoteFarge: getKvoteFarge(FordelingType.Mor, false), //TODO: Remove  this and figure out when displaying?
        fordeling: [førFødsel, seksUkerEtterFødsel, restUkerMor],
        konto: StønadskontoType.Mødrekvote,
        type: FordelingType.Mor,
    };

    const kvoteInformasjonFarsKvote = {
        antallUker: 15,
        kvoteTittel: '15 uker til Petter',
        kvoteNavn: 'PETTER SIN KVOTE',
        kvoteFarge: getKvoteFarge(FordelingType.FarMedmor, true),
        fordeling: [far],
        konto: StønadskontoType.Fedrekvote,
        type: FordelingType.FarMedmor,
    };

    const kvoteInformasjonFellesKvote = {
        antallUker: 16,
        kvoteTittel: '16 uker skal deles, fellesperiode',
        kvoteNavn: 'FELLESPERIODE',
        kvoteFarge: getKvoteFarge(FordelingType.Felles),
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
