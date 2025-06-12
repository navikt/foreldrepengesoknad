import { useQuery } from '@tanstack/react-query';
import {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
    getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'api/getStønadskontoParams';
import { useAnnenPartVedtakOptions, useStønadsKontoerOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getIsDeltUttak } from 'utils/annenForelderUtils';
import { getFamiliehendelsedato, getTermindato } from 'utils/barnUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'utils/eksisterendeSakUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getNavnPåForeldre } from 'utils/personUtils';
import { getAntallUkerFellesperiode } from 'utils/stønadskontoerUtils';

import { Loader, VStack } from '@navikt/ds-react';

import { isFødtBarn } from '@navikt/fp-common';
import { Arbeidsforhold, PersonFrontend } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { Uttaksdagen } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { FordelingForm } from './fordeling-form/FordelingForm';
import { FordelingOversikt } from './fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer, getSisteUttaksdagAnnenForelder } from './fordeling-oversikt/fordelingOversiktUtils';
import { MorsSisteDag } from './mors-siste-dag/MorsSisteDag';

type Props = {
    søker: PersonFrontend;
    arbeidsforhold: Arbeidsforhold[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const FordelingSteg = ({ søker, arbeidsforhold, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const oppdaterBarn = notEmpty(useContextSaveData(ContextDataType.OM_BARNET));

    const termindato = getTermindato(barn);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const førsteUttaksdagNesteBarnsSak = barnFraNesteSak?.startdatoFørsteStønadsperiode;
    const navnPåForeldre = getNavnPåForeldre(søker, annenForelder, erFarEllerMedmor, intl);
    const navnMor = navnPåForeldre.mor;
    const navnFarMedmor = navnPåForeldre.farMedmor;
    const deltUttak = getIsDeltUttak(annenForelder);

    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    const annenPartsVedtakQuery = useQuery({
        ...annenPartVedtakOptions,
        select: (data) => {
            return mapAnnenPartsEksisterendeSakFromDTO(
                data,
                barn,
                erFarEllerMedmor,
                familiehendelsesdato,
                førsteUttaksdagNesteBarnsSak,
            );
        },
    });
    const eksisterendeVedtakAnnenPart = annenPartsVedtakQuery.data;

    const kontoerOptions = useStønadsKontoerOptions();
    const valgtStønadskonto = useQuery({
        ...kontoerOptions,
        select: (kontoer) => {
            return kontoer[dekningsgrad];
        },
    }).data;

    const minsterett = valgtStønadskonto?.minsteretter;

    const fordelingScenario =
        valgtStønadskonto && minsterett
            ? getFordelingFraKontoer(
                  valgtStønadskonto,
                  minsterett,
                  søkersituasjon,
                  barn,
                  navnPåForeldre,
                  annenForelder,
                  intl,
                  eksisterendeVedtakAnnenPart?.uttaksplan,
              )
            : [];
    const ukerMedFellesperiode = valgtStønadskonto ? getAntallUkerFellesperiode(valgtStønadskonto) : 0;
    const dagerMedFellesperiode = ukerMedFellesperiode * 5;
    const sisteDagAnnenForelder = getSisteUttaksdagAnnenForelder(
        erFarEllerMedmor,
        deltUttak,
        eksisterendeVedtakAnnenPart?.uttaksplan,
    );

    const førsteDagEtterAnnenForelder = sisteDagAnnenForelder ? Uttaksdagen(sisteDagAnnenForelder).neste() : undefined;
    const visMorsSisteDag = erFarEllerMedmor && sisteDagAnnenForelder;

    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.grunnlag.antallBarn,
    );
    const saksgrunnlagsTermindato = getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        termindato,
        eksisterendeVedtakAnnenPart?.grunnlag.termindato,
    );

    useEffect(() => {
        if (erFarEllerMedmor && barn.antallBarn !== saksgrunnlagsAntallBarn) {
            oppdaterBarn({ ...barn, antallBarn: saksgrunnlagsAntallBarn });
        }
        if (
            erFarEllerMedmor &&
            isFødtBarn(barn) &&
            saksgrunnlagsTermindato &&
            barn.termindato !== saksgrunnlagsTermindato
        ) {
            oppdaterBarn({ ...barn, termindato: saksgrunnlagsTermindato });
        }
    }, [erFarEllerMedmor, saksgrunnlagsAntallBarn, barn, oppdaterBarn, saksgrunnlagsTermindato]);

    if (!valgtStønadskonto || annenPartsVedtakQuery.isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader size="2xlarge" />
            </div>
        );
    }

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <VStack gap="5">
                <FordelingOversikt
                    kontoer={valgtStønadskonto}
                    navnFarMedmor={navnFarMedmor}
                    navnMor={navnMor}
                    deltUttak={deltUttak}
                    fordelingScenario={fordelingScenario}
                ></FordelingOversikt>
                {visMorsSisteDag && <MorsSisteDag morsSisteDag={sisteDagAnnenForelder} navnMor={navnMor} />}
                <FordelingForm
                    erDeltUttak={deltUttak}
                    navnPåForeldre={navnPåForeldre}
                    dagerMedFellesperiode={dagerMedFellesperiode}
                    goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                    goToNextDefaultStep={navigator.goToNextDefaultStep}
                    førsteDagEtterAnnenForelder={førsteDagEtterAnnenForelder}
                />
            </VStack>
        </Step>
    );
};
