import { FormattedMessage } from 'react-intl';
import KvoteOversikt from './kvote-oversikt/KvoteOversikt';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';
import { Block, TilgjengeligStønadskonto, guid } from '@navikt/fp-common';
import {
    FEDREKVOTE_FARGE,
    FELLESPERIODE_FARGE,
    MØDREKVOTE_FARGE,
    getFordelingForScenario,
} from './fordelingOversiktUtils';
import FordelingGraf from './fordeling-graf/FordelingGraf';

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

export const getFormattedMessage = (id: string, values?: any, link?: string): React.ReactNode => {
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

interface Props {
    kontoer: TilgjengeligStønadskonto[];
    scenario: UttaksplanInfoScenario;
}

const FordelingOversikt: React.FunctionComponent<Props> = ({ kontoer, scenario }) => {
    const kvoteListe = getFordelingForScenario(scenario, kontoer);

    return (
        <>
            <Block padBottom="l">
                <FordelingGraf
                    sumUker={49}
                    fordelingList={[
                        { tekst: '', uker: 3, farge: MØDREKVOTE_FARGE },
                        { tekst: 'Termin', uker: 0, farge: '' },
                        { tekst: 'Heidis kvote', uker: 16, farge: MØDREKVOTE_FARGE },
                        { tekst: 'Din kvote', uker: 16, farge: FEDREKVOTE_FARGE },
                        { tekst: 'Fellesperiode', uker: 15, farge: FELLESPERIODE_FARGE },
                    ]}
                ></FordelingGraf>
            </Block>
            <Block padBottom="xl">
                {kvoteListe.map((kvoteInfo) => {
                    return <KvoteOversikt key={guid()} kvoteInformasjon={kvoteInfo} />;
                })}
            </Block>
        </>
    );
};

export default FordelingOversikt;
