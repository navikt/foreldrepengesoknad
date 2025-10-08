import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { RegistrertePersonalia } from 'pages/registrerte-personalia/RegistrertePersonalia';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { getRegistrerteBarnOmDeFinnes } from 'utils/barnUtils';

import { VStack } from '@navikt/ds-react';

import { Barn, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { PersonDto_fpoversikt, PersonMedArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { AnnenForelderFormData } from './AnnenForelderFormData';
import { AnnenForelderOppgittPanel } from './AnnenForelderOppgittPanel';
import { OppgiPersonalia } from './OppgiPersonalia';

const getRegistrertAnnenForelder = (barn: NonNullable<Barn | undefined>, person: PersonDto_fpoversikt) => {
    const registrerteBarn = getRegistrerteBarnOmDeFinnes(barn, person.barn);
    const registrertBarnMedAnnenForelder =
        registrerteBarn === undefined || registrerteBarn.length === 0
            ? undefined
            : registrerteBarn.find((registrertBarn) => registrertBarn.annenPart !== undefined);
    return registrertBarnMedAnnenForelder?.annenPart;
};

type Props = {
    søkerInfo: PersonMedArbeidsforholdDto_fpoversikt;
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

    const annenForelderFraRegistrertBarn = getRegistrertAnnenForelder(barn, søkerInfo.person);

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

    const onSubmit = (values: AnnenForelderFormData) => {
        if (values.kanIkkeOppgis === true) {
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

        oppdaterAnnenForeldre({
            ...values,
            harRettPåForeldrepengerINorge,
            kanIkkeOppgis: false,
            fornavn: replaceInvisibleCharsWithSpace(fornavn!) ?? '', // TODO
            etternavn: replaceInvisibleCharsWithSpace(etternavn!) ?? '',
            fnr: replaceInvisibleCharsWithSpace(fnr.trim()) ?? '',
            harRettPåForeldrepengerIEØS: values.harOppholdtSegIEØS ? values.harRettPåForeldrepengerIEØS : false,
        });

        return navigator.goToNextDefaultStep();
    };

    // TODO (TOR) Typen AnnenForelderFormData bør erstattast av AnnenForelder.ts (som bør flyttast til denne appen)
    const formMethods = useForm<AnnenForelderFormData>({
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

    // TODO: denne kan være undefined. Som er misvisende siden typen sier Boolean. Stammer trolig fra at AnnenForelderDto puttes rått inn i state?
    const kanIkkeOppgis = formMethods.watch('kanIkkeOppgis');

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        {skalOppgiPersonalia && (
                            <OppgiPersonalia rolle={rolle} barn={barn} søkersFødselsnummer={søkerInfo.person.fnr} />
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
