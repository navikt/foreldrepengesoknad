import { FormattedMessage } from 'react-intl';
import OversiktPerDel from './oversikt-per-del/OversiktPerDel';
import {
    Block,
    Dekningsgrad,
    TilgjengeligStønadskonto,
    førsteOktober2021ReglerGjelder,
    getFlerbarnsuker,
    guid,
} from '@navikt/fp-common';
import BeggeHarRettGraf from './grafer/begge-har-rett-graf/BeggeHarRettGraf';
import { useState } from 'react';
import FlerbarnsdagerInformasjon from 'app/steps/uttaksplan-info/components/flerbarnsdagerInformasjon/FlerbarnsdagerInformasjon';
import SammenhengendeUttakInformasjon from 'app/steps/uttaksplan-info/components/sammenhengendeUttakInformasjon/SammenhengendeUttakInformasjon';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { DelInformasjon, FordelingEier } from 'app/types/FordelingOversikt';

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
    erBarnetFødt: boolean;
    annenForeldrerHarRett: boolean;
    antallBarn: number;
    dekningsgrad: Dekningsgrad;
    familiehendelsesdato: Date;
    fordelingScenario: DelInformasjon[];
}

const FordelingOversikt: React.FunctionComponent<Props> = ({
    kontoer,
    erFarEllerMedmor,
    navnFarMedmor,
    navnMor,
    erAdopsjon,
    erBarnetFødt,
    annenForeldrerHarRett,
    antallBarn,
    dekningsgrad,
    familiehendelsesdato,
    fordelingScenario,
}) => {
    const [currentUthevet, setCurrentUthevet] = useState<FordelingEier | undefined>(undefined);
    const antallFlerbarnsdager = antallBarn > 1 ? getFlerbarnsuker(dekningsgrad, antallBarn) * 5 : undefined;
    const sumDager = getAntallUker(kontoer) * 5;
    return (
        <>
            {annenForeldrerHarRett && (
                <Block padBottom="l">
                    <BeggeHarRettGraf
                        kontoer={kontoer}
                        erFarEllerMedmor={erFarEllerMedmor}
                        erAdopsjon={erAdopsjon}
                        erBarnetFødt={erBarnetFødt}
                        sumDager={sumDager}
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
            {annenForeldrerHarRett && antallFlerbarnsdager && antallFlerbarnsdager > 0 && (
                <FlerbarnsdagerInformasjon
                    flerbarnsDager={antallFlerbarnsdager}
                    antallBarn={antallBarn}
                    erAdopsjon={erAdopsjon}
                />
            )}
            {!førsteOktober2021ReglerGjelder(familiehendelsesdato) && (
                <SammenhengendeUttakInformasjon annenForeldrerHarRett={annenForeldrerHarRett} />
            )}
        </>
    );
};

export default FordelingOversikt;
