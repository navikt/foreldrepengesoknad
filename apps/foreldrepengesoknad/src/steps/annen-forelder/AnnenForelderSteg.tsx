import isEqual from 'lodash/isEqual';

import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useResetUttaksplanData } from 'appData/useResetUttaksplanData';
import { useStepConfig } from 'appData/useStepConfig';
import { RegistrertePersonalia } from 'pages/registrerte-personalia/RegistrertePersonalia';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import { getRegistrerteBarnOmDeFinnes } from 'utils/barnUtils';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Barn, FpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { AnnenForelderOppgittPanel } from './AnnenForelderOppgittPanel';
import { OppgiPersonalia } from './OppgiPersonalia';

const getRegistrertAnnenForelder = (
    barn: NonNullable<Barn | undefined>,
    person: FpPersonopplysningerDto_fpoversikt,
) => {
    const registrerteBarn = getRegistrerteBarnOmDeFinnes(barn, person.barn);
    const registrertBarnMedAnnenForelder =
        registrerteBarn === undefined || registrerteBarn.length === 0
            ? undefined
            : registrerteBarn.find((registrertBarn) => registrertBarn.annenPart !== undefined);
    return registrertBarnMedAnnenForelder?.annenPart;
};

type Props = {
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const AnnenForelderSteg = ({ søkerInfo, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold);
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger);

    const { rolle } = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);

    const oppdaterAnnenForeldre = useContextSaveData(ContextDataType.ANNEN_FORELDER);
    const resetUttaksplanData = useResetUttaksplanData();

    const annenForelderFraRegistrertBarn = getRegistrertAnnenForelder(barn, søkerInfo);

    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    const annenPartHarVedtak =
        useQuery({
            ...annenPartVedtakOptions,
            select: (vedtak) => vedtak?.perioder.some((p) => p.resultat?.innvilget),
        }).data ?? false;

    const oppgittFnrErUlikRegistrertBarn =
        annenForelder !== undefined &&
        isAnnenForelderOppgitt(annenForelder) &&
        annenForelder.fnr !== annenForelderFraRegistrertBarn?.fnr;
    const skalOppgiPersonalia = annenForelderFraRegistrertBarn === undefined || oppgittFnrErUlikRegistrertBarn;

    const onSubmit = (values: AnnenForelder) => {
        if (values.kanIkkeOppgis) {
            const nyttGrunnlag = { kanIkkeOppgis: true as const };
            const gjeldendeGrunnlag = annenForelder
                ? { kanIkkeOppgis: !isAnnenForelderOppgitt(annenForelder) }
                : undefined;
            if (gjeldendeGrunnlag !== undefined && gjeldendeGrunnlag.kanIkkeOppgis !== nyttGrunnlag.kanIkkeOppgis) {
                resetUttaksplanData();
            }
            oppdaterAnnenForeldre({ kanIkkeOppgis: true });
            return navigator.goToNextDefaultStep();
        }

        const skalIkkeOppgiPersonaliaOgHarFraRegBarn = !skalOppgiPersonalia && annenForelderFraRegistrertBarn;
        const fornavn = skalIkkeOppgiPersonaliaOgHarFraRegBarn
            ? annenForelderFraRegistrertBarn.navn.fornavn
            : values.fornavn;
        const etternavn = skalIkkeOppgiPersonaliaOgHarFraRegBarn
            ? annenForelderFraRegistrertBarn.navn.etternavn
            : values.etternavn;
        const fnr = skalIkkeOppgiPersonaliaOgHarFraRegBarn ? annenForelderFraRegistrertBarn.fnr : values.fnr;

        // Hvis annenPartHarVedtak så har parten rett til foreldrepenger. I det tilfellet vises ikke det valget og verdien er undefined.
        // Derfor settes den true hvis vi har vedtak, og ellers brukes form-verdien
        const harRettPåForeldrepengerINorge = annenPartHarVedtak || values.harRettPåForeldrepengerINorge;
        const harRettPåForeldrepengerIEØS = values.harOppholdtSegIEØS ? values.harRettPåForeldrepengerIEØS : false;

        const nyttGrunnlag = {
            kanIkkeOppgis: false as const,
            harRettPåForeldrepengerINorge,
            harRettPåForeldrepengerIEØS,
            erAleneOmOmsorg: values.erAleneOmOmsorg,
        };
        const gjeldendeGrunnlag =
            annenForelder && isAnnenForelderOppgitt(annenForelder)
                ? {
                      kanIkkeOppgis: false as const,
                      harRettPåForeldrepengerINorge: annenForelder.harRettPåForeldrepengerINorge,
                      harRettPåForeldrepengerIEØS: annenForelder.harRettPåForeldrepengerIEØS,
                      erAleneOmOmsorg: annenForelder.erAleneOmOmsorg,
                  }
                : undefined;

        if (gjeldendeGrunnlag !== undefined && !isEqual(gjeldendeGrunnlag, nyttGrunnlag)) {
            resetUttaksplanData();
        }

        oppdaterAnnenForeldre({
            ...values,
            harRettPåForeldrepengerINorge,
            kanIkkeOppgis: false, // NOTE: må settes eksplisitt
            fornavn: replaceInvisibleCharsWithSpace(fornavn) ?? '',
            etternavn: replaceInvisibleCharsWithSpace(etternavn) ?? '',
            fnr: replaceInvisibleCharsWithSpace(fnr.trim()) ?? '',
            harRettPåForeldrepengerIEØS,
        });

        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<AnnenForelder>({
        shouldUnregister: true,
        defaultValues:
            annenForelder &&
            isAnnenForelderOppgitt(annenForelder) &&
            annenForelder.fornavn === intl.formatMessage({ id: 'annen.forelder' })
                ? {
                      ...annenForelder,
                      fornavn: '',
                  }
                : annenForelder,
    });

    const kanIkkeOppgis = formMethods.watch('kanIkkeOppgis');

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        {skalOppgiPersonalia && (
                            <OppgiPersonalia rolle={rolle} barn={barn} søkersFødselsnummer={søkerInfo.fnr} />
                        )}
                        {!skalOppgiPersonalia && (
                            <RegistrertePersonalia
                                person={annenForelderFraRegistrertBarn}
                                fødselsnummerForVisning={annenForelderFraRegistrertBarn.fnr}
                                visEtternavn
                            />
                        )}
                        {kanIkkeOppgis !== true && <AnnenForelderOppgittPanel rolle={rolle} barn={barn} />}
                        <StepButtonsHookForm
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            onAvsluttOgSlett={avbrytSøknad}
                            onFortsettSenere={navigator.fortsettSøknadSenere}
                        />
                    </VStack>
                </RhfForm>
            </Step>
        </SkjemaRotLayout>
    );
};
