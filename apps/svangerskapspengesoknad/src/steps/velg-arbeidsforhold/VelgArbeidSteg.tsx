import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { useTilretteleggingerHelper } from 'appData/useTilretteleggingerHelper';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Checkbox, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfCheckboxGroup, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { FlereArbeidsforholdGuidePanel } from './FlereArbeidsforholdGuidePanel';
import { getOptionNavn, mapArbeidsforholdToVelgArbeidOptions } from './velgArbeidFormUtils';

type VelgArbeidForm = {
    arbeidMedTilrettelegging: string[];
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

export const VelgArbeidSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);
    const { fjernTilrettelegginger } = useTilretteleggingerHelper();

    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterValgteArbeidsforhold = useContextSaveData(ContextDataType.VALGTE_ARBEIDSFORHOLD);

    const arbeidsforholdOptions = mapArbeidsforholdToVelgArbeidOptions(
        arbeidsforholdOgInntekt,
        arbeidsforhold,
        barnet.termindato,
        intl,
        frilans,
        egenNæring,
    );

    const onSubmit = (formValues: VelgArbeidForm) => {
        const sorterteArbeidsforholdIder = arbeidsforholdOptions
            .filter((a) => formValues.arbeidMedTilrettelegging.includes(a.id))
            .map((a) => a.id);
        oppdaterValgteArbeidsforhold(sorterteArbeidsforholdIder);

        if (valgteArbeidsforhold && tilrettelegginger) {
            const valgSomSkalFjernes = valgteArbeidsforhold.filter(
                (x) => !formValues.arbeidMedTilrettelegging.includes(x),
            );
            fjernTilrettelegginger(valgSomSkalFjernes);
        }

        return navigator.goToStep(SøknadRoute.SKJEMA + '/' + sorterteArbeidsforholdIder[0]);
    };

    const formMethods = useForm<VelgArbeidForm>({
        defaultValues: valgteArbeidsforhold ? { arbeidMedTilrettelegging: valgteArbeidsforhold } : undefined,
    });

    const arbeidMedTilrettelegging = formMethods.watch('arbeidMedTilrettelegging');
    const visInfo = arbeidMedTilrettelegging && arbeidMedTilrettelegging.length > 1;

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig} onStepChange={navigator.goToStep}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        <RhfCheckboxGroup
                            name="arbeidMedTilrettelegging"
                            control={formMethods.control}
                            label={intl.formatMessage({ id: 'velgArbeid.hvor' })}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.tilrettelegging.påkrevd' })),
                            ]}
                        >
                            {arbeidsforholdOptions.map((option) => (
                                <Checkbox key={option.id} value={option.id}>
                                    {getOptionNavn(option.arbeidsforholdType, intl, option.arbeidsforholdNavn)}
                                </Checkbox>
                            ))}
                        </RhfCheckboxGroup>
                        {visInfo && <FlereArbeidsforholdGuidePanel />}
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
