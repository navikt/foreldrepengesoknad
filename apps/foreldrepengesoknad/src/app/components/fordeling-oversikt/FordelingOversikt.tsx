import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
    Block,
    ISOStringToDate,
    TilgjengeligStønadskonto,
    førsteOktober2021ReglerGjelder,
    getFlerbarnsuker,
    guid,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import FlerbarnsdagerInformasjon from 'app/steps/uttaksplan-info/components/flerbarnsdagerInformasjon/FlerbarnsdagerInformasjon';
import SammenhengendeUttakInformasjon from 'app/steps/uttaksplan-info/components/sammenhengendeUttakInformasjon/SammenhengendeUttakInformasjon';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { DelInformasjon, FordelingEier } from 'app/types/FordelingOversikt';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import FordelingPåvirkninger from './fordeling-påvirkninger/FordelingPåvirkninger';
import { getFarTekst, getMorTekst } from './fordelingOversiktUtils';
import BeggeHarRettGraf from './grafer/begge-har-rett-graf/BeggeHarRettGraf';
import OversiktPerDel from './oversikt-per-del/OversiktPerDel';

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
    navnFarMedmor: string;
    navnMor: string;
    deltUttak: boolean;
    fordelingScenario: DelInformasjon[];
}

const FordelingOversikt: React.FunctionComponent<Props> = ({
    kontoer,
    navnFarMedmor,
    navnMor,
    deltUttak,
    fordelingScenario,
}) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const { antallBarn } = barn;
    const erBarnetFødt = isFødtBarn(barn);
    const erIkkeFødtBarn = isUfødtBarn(barn);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const navnAnnenForelder = erFarEllerMedmor ? navnMor : navnFarMedmor;
    const morTekst = getMorTekst(erFarEllerMedmor, navnMor, intl);
    const farTekst = getFarTekst(erFarEllerMedmor, navnFarMedmor, intl);
    const { dekningsgrad } = periodeMedForeldrepenger;
    const annenForelderHarKunRettIEØS = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerIEØS
        : false;

    const [currentUthevet, setCurrentUthevet] = useState<FordelingEier | undefined>(undefined);
    const antallFlerbarnsdager = antallBarn > 1 ? getFlerbarnsuker(dekningsgrad, antallBarn) * 5 : undefined;
    const sumDager = getAntallUker(kontoer) * 5;
    const visBeggeHarRettGraf = deltUttak && !annenForelderHarKunRettIEØS;
    const visFlerbarnsdagerInformasjon = deltUttak && !!antallFlerbarnsdager && antallFlerbarnsdager > 0;
    return (
        <>
            {visBeggeHarRettGraf && (
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
            <Block padBottom="s">
                {fordelingScenario.map((del) => {
                    return (
                        <OversiktPerDel
                            key={guid()}
                            delInformasjon={del}
                            currentUthevet={currentUthevet}
                            erFarEllerMedmor={erFarEllerMedmor}
                            navnMor={navnMor}
                            navnFarMedmor={navnFarMedmor}
                            erFødsel={erFødsel}
                            setCurrentUthevet={setCurrentUthevet}
                            annenForelderKunRettIEØS={annenForelderHarKunRettIEØS}
                        />
                    );
                })}
            </Block>
            {visFlerbarnsdagerInformasjon && (
                <FlerbarnsdagerInformasjon
                    flerbarnsDager={antallFlerbarnsdager}
                    antallBarn={antallBarn}
                    erAdopsjon={erAdopsjon}
                    morTekst={morTekst}
                    farTekst={farTekst}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            )}
            {!førsteOktober2021ReglerGjelder(familiehendelsesdato) && (
                <SammenhengendeUttakInformasjon annenForeldrerHarRett={deltUttak} />
            )}
            <Block padBottom="xl">
                <FordelingPåvirkninger
                    deltUttak={deltUttak}
                    erAdopsjon={erAdopsjon}
                    navnAnnenForelder={navnAnnenForelder}
                    morTekst={morTekst}
                    farTekst={farTekst}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erIkkeFødtBarn={erIkkeFødtBarn}
                    familiehendelsesdato={familiehendelsesdato}
                    annenForelderHarKunRettIEØS={!!annenForelderHarKunRettIEØS}
                />
            </Block>
        </>
    );
};

export default FordelingOversikt;
