import { FormattedMessage } from 'react-intl';
import DelOversikt from './del-oversikt/DelOversikt';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';
import { Block, StønadskontoType, TilgjengeligStønadskonto, guid } from '@navikt/fp-common';
import { getFordelingForScenario } from './fordelingOversiktUtils';
import BeggeHarRettGraf from './begge-har-rett-graf/BeggeHarRettGraf';
import { useState } from 'react';

export enum FordelingType {
    Mor = 'MOR',
    FarMedmor = 'FARMEDMOR',
    Felles = 'FELLES',
}

export interface KvoteFordeling {
    uker: number;
    tekst: React.ReactNode;
}

export interface KvoteInformasjon {
    antallUker: number;
    kvoteTittel: string;
    kvoteNavn: string;
    colorClass: string;
    fordeling: KvoteFordeling[];
    konto: StønadskontoType;
    type: FordelingType;
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
    erFarEllerMedmor: boolean;
    navnFarMedmor: string;
    navnMor: string;
    erAdopsjon: boolean;
}

const FordelingOversikt: React.FunctionComponent<Props> = ({
    kontoer,
    scenario,
    erFarEllerMedmor,
    navnFarMedmor,
    navnMor,
    erAdopsjon,
}) => {
    const kvoteListe = getFordelingForScenario(scenario, kontoer);
    const [currentUthevet, setCurrentUthevet] = useState<FordelingType | undefined>(undefined);
    return (
        <>
            <Block padBottom="l">
                <BeggeHarRettGraf
                    kontoer={kontoer}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAdopsjon={erAdopsjon}
                    sumUker={49}
                    currentUthevet={currentUthevet}
                    navnMor={navnMor}
                    navnFarMedmor={navnFarMedmor}
                    setCurrentUthevet={setCurrentUthevet}
                ></BeggeHarRettGraf>
            </Block>
            <Block padBottom="xl">
                {kvoteListe.map((kvoteInfo) => {
                    return (
                        <DelOversikt
                            key={guid()}
                            kvoteInformasjon={kvoteInfo}
                            currentUthevet={currentUthevet}
                            erFarEllerMedmor={erFarEllerMedmor}
                            setCurrentUthevet={setCurrentUthevet}
                        />
                    );
                })}
            </Block>
        </>
    );
};

export default FordelingOversikt;
