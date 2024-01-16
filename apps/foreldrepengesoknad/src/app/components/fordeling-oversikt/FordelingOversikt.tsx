import { FormattedMessage } from 'react-intl';
import OversiktPerDel from './oversikt-per-del/OversiktPerDel';
import { Block, TilgjengeligStønadskonto, guid } from '@navikt/fp-common';
import BeggeHarRettGraf from './grafer/begge-har-rett-graf/BeggeHarRettGraf';
import { useState } from 'react';

export enum FordelingType {
    Mor = 'MOR',
    FarMedmor = 'FARMEDMOR',
    Felles = 'FELLES',
}
export interface DelInformasjon {
    type: FordelingType;
    sumUker: number;
    fordelingUker: number[];
    fordelingInfo: React.ReactNode[];
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
    erFarEllerMedmor: boolean;
    navnFarMedmor: string;
    navnMor: string;
    erAdopsjon: boolean;
    annenForeldrerHarRett: boolean;
    fordelingScenario: DelInformasjon[];
}

const FordelingOversikt: React.FunctionComponent<Props> = ({
    kontoer,
    erFarEllerMedmor,
    navnFarMedmor,
    navnMor,
    erAdopsjon,
    annenForeldrerHarRett,
    fordelingScenario,
}) => {
    const [currentUthevet, setCurrentUthevet] = useState<FordelingType | undefined>(undefined);

    return (
        <>
            {annenForeldrerHarRett && (
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
                {fordelingScenario.map((del) => {
                    return (
                        <OversiktPerDel
                            key={guid()}
                            delInformasjon={del}
                            currentUthevet={currentUthevet}
                            erFarEllerMedmor={erFarEllerMedmor}
                            navnMor={navnMor}
                            navnFarMedmor={navnFarMedmor}
                            setCurrentUthevet={setCurrentUthevet}
                        />
                    );
                })}
            </Block>
        </>
    );
};

export default FordelingOversikt;
