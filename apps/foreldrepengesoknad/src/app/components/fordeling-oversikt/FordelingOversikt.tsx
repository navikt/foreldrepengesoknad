import { FormattedMessage } from 'react-intl';
import KvoteOversikt from './kvote-oversikt/KvoteOversikt';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';
import { Block, StønadskontoType, TilgjengeligStønadskonto, guid } from '@navikt/fp-common';
import {
    FEDREKVOTE_FARGE,
    FELLESPERIODE_FARGE,
    MØDREKVOTE_FARGE,
    getFordelingForScenario,
} from './fordelingOversiktUtils';
import FordelingGraf from './fordeling-graf/FordelingGraf';
import { useState } from 'react';

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
    konto: StønadskontoType;
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
    const [currentUthevet, setCurrentUthevet] = useState<StønadskontoType | undefined>(undefined);
    return (
        <>
            <Block padBottom="l">
                <FordelingGraf
                    sumUker={49}
                    fordelingList={[
                        { tekst: '', uker: 3, farge: MØDREKVOTE_FARGE, konto: StønadskontoType.Mødrekvote },
                        { tekst: 'Adopsjon', uker: 0, farge: '' },
                        {
                            tekst: 'Heidis kvote',
                            uker: 16,
                            farge: MØDREKVOTE_FARGE,
                            konto: StønadskontoType.Mødrekvote,
                        },
                        { tekst: 'Din kvote', uker: 16, farge: FEDREKVOTE_FARGE, konto: StønadskontoType.Fedrekvote },
                        {
                            tekst: 'Fellesperiode',
                            uker: 15,
                            farge: FELLESPERIODE_FARGE,
                            konto: StønadskontoType.Fellesperiode,
                        },
                    ]}
                    currentUthevet={currentUthevet}
                    setCurrentUthevet={setCurrentUthevet}
                ></FordelingGraf>
            </Block>
            <Block padBottom="xl">
                {kvoteListe.map((kvoteInfo) => {
                    return (
                        <KvoteOversikt
                            key={guid()}
                            kvoteInformasjon={kvoteInfo}
                            currentUthevet={currentUthevet}
                            setCurrentUthevet={setCurrentUthevet}
                        />
                    );
                })}
            </Block>
        </>
    );
};

export default FordelingOversikt;
