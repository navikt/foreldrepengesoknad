import { FormattedMessage, useIntl } from 'react-intl';
import OversiktPerDel from './oversikt-per-del/OversiktPerDel';
import { UttaksplanInfoScenario } from 'app/steps/uttaksplan-info/components/scenarios/scenarios';
import { Block, StønadskontoType, TilgjengeligStønadskonto, guid } from '@navikt/fp-common';
import { getFordelingForScenario } from './fordelingOversiktUtils';
import BeggeHarRettGraf from './grafer/begge-har-rett-graf/BeggeHarRettGraf';
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
    const intl = useIntl();
    const kvoteListe = getFordelingForScenario(scenario, kontoer, intl, navnMor, navnFarMedmor);
    const [currentUthevet, setCurrentUthevet] = useState<FordelingType | undefined>(undefined);
    const beggeHarRett = [
        'farMedmorFødselBeggeHarRett',
        'farMedmorFørstegangssøknadMedAnnenPart',
        'morFarAdopsjon',
        'morFarFødselAnnenForelderHarRettIEØS',
        'morFarAdopsjonAnnenForelderHarRettIEØS',
        'morFødsel',
    ].includes(scenario);

    return (
        <>
            {beggeHarRett && (
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
            )}
            <Block padBottom="xl">
                {kvoteListe.map((kvoteInfo) => {
                    return (
                        <OversiktPerDel
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
