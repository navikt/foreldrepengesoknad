import { FormattedMessage } from 'react-intl';
import KvoteOversikt from './kvote-oversikt/KvoteOversikt';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';
import { TilgjengeligStønadskonto, guid } from '@navikt/fp-common';
import { getAntallUkerMødrekvote } from 'app/steps/uttaksplan-info/utils/stønadskontoer';

export interface KvoteFordeling {
    uker: number;
    tekst: React.ReactNode;
}

export interface KvoteInformasjon {
    antallUker: number;
    kvoteTittel: string;
    kvoteNavn: string;
    kvoteFarge: string;
    fordeling: KvoteFordeling[];
}

const MORS_UKER_FØR_FØDSEL = 3;
const MORS_UKER_ETTER_FØDSEL = 6;

const getFormattedMessage = (id: string, values?: any, link?: string): React.ReactNode => {
    return (
        <FormattedMessage
            id={id}
            values={{
                ...values,
                b: (msg: any) => <b>{msg}</b>,
                a: (msg: any) =>
                    link ? (
                        <a href={link} className="lenke" rel="noreferrer" target="_blank">
                            {msg}
                        </a>
                    ) : undefined,
            }}
        />
    );
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
        kvoteFarge: '#3386E0',
        fordeling: [førFødsel, seksUkerEtterFødsel, restUkerMor],
    };

    const kvoteInformasjonFarsKvote = {
        antallUker: 19,
        kvoteTittel: '19 uker til Petter',
        kvoteNavn: 'PETTER SIN KVOTE',
        kvoteFarge: '#99DEAD',
        fordeling: [far],
    };

    const kvoteInformasjonFellesKvote = {
        antallUker: 16,
        kvoteTittel: '16 uker skal deles',
        kvoteNavn: 'FELLESPERIODE',
        kvoteFarge: '#ECEEF0',
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

interface Props {
    kontoer: TilgjengeligStønadskonto[];
}

const FordelingOversikt: React.FunctionComponent<Props> = ({ kontoer }) => {
    const scenario = 'farMedmorFødselBeggeHarRett'; //getUttaksplanScenario()
    const kvoteListe = getFordelingForScenario(scenario, kontoer);
    return kvoteListe.map((kvoteInfo) => {
        return <KvoteOversikt key={guid()} kvoteInformasjon={kvoteInfo} />;
    });
};

export default FordelingOversikt;
