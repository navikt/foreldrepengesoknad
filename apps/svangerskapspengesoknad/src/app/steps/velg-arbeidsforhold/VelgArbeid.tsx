import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Checkbox, VStack } from '@navikt/ds-react';

import { CheckboxGroup, ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';

import FlereArbeidsforholdGuidePanel from './FlereArbeidsforholdGuidePanel';
import { getOptionNavn, mapArbeidsforholdToVelgArbeidOptions } from './velgArbeidFormUtils';

type VelgArbeidFormData = {
    arbeidMedTilrettelegging: string[];
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const VelgArbeid: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const { termindato } = barnet;

    const tilretteleggingOptions = mapArbeidsforholdToVelgArbeidOptions(
        tilrettelegginger || [],
        inntektsinformasjon,
        arbeidsforhold,
        termindato,
        intl,
        frilans,
        egenNæring,
    );

    const onSubmit = (formValues: VelgArbeidFormData) => {
        const valgteTilrettelegginger = tilretteleggingOptions.filter((o) =>
            formValues.arbeidMedTilrettelegging.some((t) => t === o.id),
        );
        oppdaterTilrettelegginger(valgteTilrettelegginger);

        oppdaterValgtTilretteleggingId(valgteTilrettelegginger[0].id);
        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<VelgArbeidFormData>({
        defaultValues: {
            arbeidMedTilrettelegging: tilrettelegginger ? tilrettelegginger.map((t) => t.id) : undefined,
        },
    });

    const arbeidMedTilrettelegging = formMethods.watch('arbeidMedTilrettelegging');
    const visInfo = arbeidMedTilrettelegging && arbeidMedTilrettelegging.length > 1;

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <CheckboxGroup
                        name="arbeidMedTilrettelegging"
                        label={intl.formatMessage({ id: 'velgArbeid.hvor' })}
                        validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.tilrettelegging.påkrevd' }))]}
                    >
                        {tilretteleggingOptions.map((option) => (
                            <Checkbox key={option.id} value={option.id}>
                                {getOptionNavn(option.arbeidsforhold.type, option.arbeidsforhold.navn, intl)}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                    {visInfo && <FlereArbeidsforholdGuidePanel />}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default VelgArbeid;
