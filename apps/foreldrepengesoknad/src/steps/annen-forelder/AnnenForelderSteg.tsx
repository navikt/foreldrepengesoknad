import { useQuery } from '@tanstack/react-query';
import { useAnnenPartUttaksplanOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useResetUttaksplanData } from 'appData/useResetUttaksplanData';
import { useStepConfig } from 'appData/useStepConfig';
import { useValgtSak } from 'appData/useValgtSak';
import { isEqual } from 'es-toolkit';
import { RegistrertePersonalia } from 'pages/registrerte-personalia/RegistrertePersonalia';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { AnnenForelder, AnnenForelderOppgitt, isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { annenPartHarInnvilgetUttak, getErMorUfør } from 'utils/annenForelderUtils';
import { getRegistrerteBarnOmDeFinnes } from 'utils/barnUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

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

const getUttaksplangrunnlag = (
    annenForelder: AnnenForelder | undefined,
    erNySøknadPåEksisterendeSak: boolean,
    erFarEllerMedmor: boolean,
    sammenlignDatoForAleneomsorg: boolean,
) => {
    if (!annenForelder || !isAnnenForelderOppgitt(annenForelder)) {
        return erNySøknadPåEksisterendeSak ? annenForelder : undefined;
    }

    const grunnlag = {
        kanIkkeOppgis: false as const,
        harRettPåForeldrepengerINorge: annenForelder.harRettPåForeldrepengerINorge,
        harRettPåForeldrepengerIEØS: annenForelder.harRettPåForeldrepengerIEØS,
        erAleneOmOmsorg: annenForelder.erAleneOmOmsorg,
    };
    if (!erNySøknadPåEksisterendeSak) {
        return grunnlag;
    }

    return {
        ...grunnlag,
        harRettPåForeldrepengerINorge: !!annenForelder.harRettPåForeldrepengerINorge,
        harRettPåForeldrepengerIEØS: !!annenForelder.harRettPåForeldrepengerIEØS,
        erAleneOmOmsorg: !!annenForelder.erAleneOmOmsorg,
        erMorUfør: getErMorUfør(annenForelder, erFarEllerMedmor),
        datoForAleneomsorg:
            sammenlignDatoForAleneomsorg && annenForelder.erAleneOmOmsorg
                ? annenForelder.datoForAleneomsorg
                : undefined,
        fnr: replaceInvisibleCharsWithSpace(annenForelder.fnr)?.trim() ?? '',
        utenlandskFnr: !!annenForelder.utenlandskFnr,
    };
};

const erUttaksplangrunnlagetEndret = (
    annenForelder: AnnenForelder | undefined,
    oppdatertAnnenForelder: AnnenForelderOppgitt,
    erNySøknadPåEksisterendeSak: boolean,
    erFarEllerMedmor: boolean,
) => {
    const sammenlignDatoForAleneomsorg =
        annenForelder !== undefined &&
        isAnnenForelderOppgitt(annenForelder) &&
        annenForelder.datoForAleneomsorg !== undefined;
    const gjeldendeGrunnlag = getUttaksplangrunnlag(
        annenForelder,
        erNySøknadPåEksisterendeSak,
        erFarEllerMedmor,
        sammenlignDatoForAleneomsorg,
    );
    const nyttGrunnlag = getUttaksplangrunnlag(
        oppdatertAnnenForelder,
        erNySøknadPåEksisterendeSak,
        erFarEllerMedmor,
        sammenlignDatoForAleneomsorg,
    );
    return gjeldendeGrunnlag !== undefined && !isEqual(gjeldendeGrunnlag, nyttGrunnlag);
};

type Props = {
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const AnnenForelderSteg = ({ søkerInfo, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig({
        arbeidsforhold: søkerInfo.arbeidsforhold,
        harRegistrertNæring: søkerInfo.selvstendigNæring.length > 0,
    });
    const navigator = useFpNavigator({
        arbeidsforhold: søkerInfo.arbeidsforhold,
        harRegistrertNæring: søkerInfo.selvstendigNæring.length > 0,
        mellomlagreOgNaviger: mellomlagreSøknadOgNaviger,
    });

    const { rolle } = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);

    const oppdaterAnnenForeldre = useContextSaveData(ContextDataType.ANNEN_FORELDER);
    const resetUttaksplanData = useResetUttaksplanData();
    const { erNySøknadPåEksisterendeSak } = useValgtSak();

    const annenForelderFraRegistrertBarn = getRegistrertAnnenForelder(barn, søkerInfo);

    const annenPartHarVedtak =
        useQuery({
            ...useAnnenPartUttaksplanOptions(),
            select: annenPartHarInnvilgetUttak,
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
            return navigator.goToNextStep();
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
        const oppdatertAnnenForelder: AnnenForelderOppgitt = {
            ...values,
            harRettPåForeldrepengerINorge,
            kanIkkeOppgis: false, // NOTE: må settes eksplisitt
            fornavn: replaceInvisibleCharsWithSpace(fornavn)?.trim() ?? '',
            etternavn: replaceInvisibleCharsWithSpace(etternavn)?.trim() ?? '',
            fnr: replaceInvisibleCharsWithSpace(fnr)?.trim() ?? '',
            harRettPåForeldrepengerIEØS,
        };

        if (
            erUttaksplangrunnlagetEndret(
                annenForelder,
                oppdatertAnnenForelder,
                erNySøknadPåEksisterendeSak,
                isFarEllerMedmor(rolle),
            )
        ) {
            resetUttaksplanData();
        }

        oppdaterAnnenForeldre(oppdatertAnnenForelder);

        return navigator.goToNextStep();
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
            <Step steps={stepConfig} onStepChange={navigator.goToStep}>
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
                        {!kanIkkeOppgis && <AnnenForelderOppgittPanel rolle={rolle} barn={barn} />}
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
