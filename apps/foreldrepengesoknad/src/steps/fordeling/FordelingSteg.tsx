import { useQuery } from '@tanstack/react-query';
import {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
    getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'api/getStønadskvoteParams';
import { useAnnenPartVedtakOptions, useStønadsKontoerOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useResetUttaksplanData } from 'appData/useResetUttaksplanData';
import { useStepConfig } from 'appData/useStepConfig';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { getIsDeltUttak } from 'utils/annenForelderUtils';
import { getTermindato } from 'utils/barnUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getNavnPåForeldre } from 'utils/personUtils';
import { getAntallUkerFellesperiode } from 'utils/stønadskvoterUtils';

import { VStack } from '@navikt/ds-react';

import { EksternArbeidsforholdDto_fpoversikt, FpPersonopplysningerDto_fpoversikt, isFødtBarn } from '@navikt/fp-types';
import { SkjemaRotLayout, Spinner, Step } from '@navikt/fp-ui';
import { Uttaksdagen } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { FordelingForm } from './fordeling-form/FordelingForm';
import { FordelingOversikt } from './fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer, getSisteUttaksdagAnnenForelder } from './fordeling-oversikt/fordelingOversiktUtils';
import { MorsSisteDag } from './mors-siste-dag/MorsSisteDag';

type Props = {
    person: FpPersonopplysningerDto_fpoversikt;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const FordelingSteg = ({ person, arbeidsforhold, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const oppdaterBarn = notEmpty(useContextSaveData(ContextDataType.OM_BARNET));
    const resetUttaksplanData = useResetUttaksplanData();

    const termindato = getTermindato(barn);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, intl);
    const navnMor = navnPåForeldre.mor;
    const navnFarMedmor = navnPåForeldre.farMedmor;
    const deltUttak = getIsDeltUttak(annenForelder);

    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    const annenPartsVedtakQuery = useQuery({
        ...annenPartVedtakOptions,
    });
    const eksisterendeVedtakAnnenPart = annenPartsVedtakQuery.data;

    const uttaksplanAnnenPart = annenPartsVedtakQuery.data?.perioder;

    const kontoerOptions = useStønadsKontoerOptions();
    const valgtStønadskvote = useQuery({
        ...kontoerOptions,
        select: (kontoer) => {
            return kontoer[dekningsgrad];
        },
    }).data;

    const minsterett = valgtStønadskvote?.minsteretter;

    const fordelingScenario = useMemo(
        () =>
            valgtStønadskvote && minsterett
                ? getFordelingFraKontoer(
                      valgtStønadskvote,
                      minsterett,
                      søkersituasjon,
                      barn,
                      { mor: navnMor, farMedmor: navnFarMedmor },
                      annenForelder,
                      intl,
                      uttaksplanAnnenPart,
                  )
                : [],
        [valgtStønadskvote, minsterett, søkersituasjon, barn, navnMor, navnFarMedmor, annenForelder, intl, uttaksplanAnnenPart],
    );
    const ukerMedFellesperiode = valgtStønadskvote ? getAntallUkerFellesperiode(valgtStønadskvote) : 0;
    const dagerMedFellesperiode = ukerMedFellesperiode * 5;
    const sisteDagAnnenForelder = getSisteUttaksdagAnnenForelder(erFarEllerMedmor, deltUttak, uttaksplanAnnenPart);

    const førsteDagEtterAnnenForelder = sisteDagAnnenForelder
        ? Uttaksdagen.neste(sisteDagAnnenForelder).getDato()
        : undefined;
    const visMorsSisteDag = erFarEllerMedmor && sisteDagAnnenForelder;

    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.antallBarn,
    );
    const saksgrunnlagsTermindato = getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        termindato,
        eksisterendeVedtakAnnenPart?.termindato,
    );

    useEffect(() => {
        let oppdatertBarn = barn;
        let barnEndret = false;
        if (erFarEllerMedmor && barn.antallBarn !== saksgrunnlagsAntallBarn) {
            oppdatertBarn = { ...oppdatertBarn, antallBarn: saksgrunnlagsAntallBarn };
            barnEndret = true;
        }
        if (
            erFarEllerMedmor &&
            isFødtBarn(oppdatertBarn) &&
            saksgrunnlagsTermindato &&
            oppdatertBarn.termindato !== saksgrunnlagsTermindato
        ) {
            oppdatertBarn = { ...oppdatertBarn, termindato: saksgrunnlagsTermindato };
            barnEndret = true;
        }
        if (barnEndret) {
            oppdaterBarn(oppdatertBarn);
            resetUttaksplanData();
        }
    }, [erFarEllerMedmor, saksgrunnlagsAntallBarn, barn, oppdaterBarn, saksgrunnlagsTermindato, resetUttaksplanData]);

    if (!valgtStønadskvote || annenPartsVedtakQuery.isLoading) {
        return <Spinner />;
    }

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig} onStepChange={navigator.goToStep}>
                <VStack gap="space-20">
                    <FordelingOversikt
                        kontoer={valgtStønadskvote}
                        navnFarMedmor={navnFarMedmor}
                        navnMor={navnMor}
                        deltUttak={deltUttak}
                        fordelingScenario={fordelingScenario}
                    />
                    {visMorsSisteDag && <MorsSisteDag morsSisteDag={sisteDagAnnenForelder} navnMor={navnMor} />}
                    <FordelingForm
                        erDeltUttak={deltUttak}
                        navnPåForeldre={navnPåForeldre}
                        dagerMedFellesperiode={dagerMedFellesperiode}
                        goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                        goToNextDefaultStep={navigator.goToNextStep}
                        onAvsluttOgSlett={avbrytSøknad}
                        onFortsettSenere={navigator.fortsettSøknadSenere}
                        førsteDagEtterAnnenForelder={førsteDagEtterAnnenForelder}
                    />
                </VStack>
            </Step>
        </SkjemaRotLayout>
    );
};
