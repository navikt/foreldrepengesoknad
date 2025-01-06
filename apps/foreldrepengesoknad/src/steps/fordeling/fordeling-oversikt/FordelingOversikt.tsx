import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { DelInformasjon, FordelingEier } from 'types/FordelingOversikt';
import { getFamiliehendelsedato } from 'utils/barnUtils';
import { ISOStringToDate, førsteOktober2021ReglerGjelder } from 'utils/dateUtils';
import { guid } from 'utils/guid';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getAntallUker } from 'utils/stønadskontoerUtils';

import { VStack } from '@navikt/ds-react';

import { isAnnenForelderOppgitt, isFødtBarn, isUfødtBarn } from '@navikt/fp-common';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { FlerbarnsdagerInformasjon } from './Flerbarnsdagerinformasjon';
import { FordelingPåvirkninger } from './FordelingPåvirkninger';
import { OversiktPerDel } from './OversiktPerDel';
import { SammenhengendeUttakInformasjon } from './SammenhengendeUttakInformasjon';
import { getFarTekst, getMorTekst } from './fordelingOversiktUtils';
import { BeggeHarRettGraf } from './grafer/begge-har-rett-graf/BeggeHarRettGraf';

interface Props {
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad;
    navnFarMedmor: string;
    navnMor: string;
    deltUttak: boolean;
    fordelingScenario: DelInformasjon[];
}

export const FordelingOversikt = ({ kontoer, navnFarMedmor, navnMor, deltUttak, fordelingScenario }: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
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
    const annenForelderHarKunRettIEØS = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerIEØS
        : false;

    const [currentUthevet, setCurrentUthevet] = useState<FordelingEier | undefined>(undefined);
    const antallFlerbarnsdager = kontoer.tillegg?.flerbarn;
    const sumDager = getAntallUker(kontoer) * 5;
    const visBeggeHarRettGraf = deltUttak && !annenForelderHarKunRettIEØS;
    const visFlerbarnsdagerInformasjon = deltUttak && !!antallFlerbarnsdager && antallFlerbarnsdager > 0;
    return (
        <VStack gap="1">
            {visBeggeHarRettGraf && (
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
            )}
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
                        erDeltUttak={deltUttak}
                    />
                );
            })}
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
        </VStack>
    );
};
