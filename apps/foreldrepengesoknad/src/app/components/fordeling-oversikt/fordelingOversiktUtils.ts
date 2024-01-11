import { KvoteFordeling, KvoteInformasjon, getFormattedMessage } from './FordelingOversikt';
import { getAntallUkerMødrekvote } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligStønadskonto } from '@navikt/fp-common';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';

const MORS_UKER_FØR_FØDSEL = 3;
const MORS_UKER_ETTER_FØDSEL = 6;
export const MØDREKVOTE_FARGE = '#3386E0';
export const FEDREKVOTE_FARGE = '#99DEAD';
export const FELLESPERIODE_FARGE = '#ECEEF0';

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

    const restAntallUkerMor = antallUkerMor - MORS_UKER_FØR_FØDSEL - MORS_UKER_ETTER_FØDSEL;
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
        kvoteTittel: `${antallUkerMor} uker til deg`,
        kvoteNavn: 'DIN KVOTE',
        kvoteFarge: MØDREKVOTE_FARGE,
        fordeling: [førFødsel, seksUkerEtterFødsel, restUkerMor],
    };

    const kvoteInformasjonFarsKvote = {
        antallUker: 19,
        kvoteTittel: '19 uker til Petter',
        kvoteNavn: 'PETTER SIN KVOTE',
        kvoteFarge: FEDREKVOTE_FARGE,
        fordeling: [far],
    };

    const kvoteInformasjonFellesKvote = {
        antallUker: 16,
        kvoteTittel: '16 uker skal deles',
        kvoteNavn: 'FELLESPERIODE',
        kvoteFarge: FELLESPERIODE_FARGE,
        fordeling: [felles],
    };
    return [kvoteInformasjonMorsKvote, kvoteInformasjonFarsKvote, kvoteInformasjonFellesKvote];
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
