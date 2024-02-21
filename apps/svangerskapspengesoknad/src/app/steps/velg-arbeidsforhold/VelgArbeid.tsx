import { Checkbox, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';
import { CheckboxGroup, ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import { getBackLinkForVelgArbeidSteg, useStepConfig } from 'app/steps/stepsConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
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
    const stepConfig = useStepConfig(intl, arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

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
        oppdaterAppRoute(SøknadRoutes.SKJEMA);

        return mellomlagreSøknadOgNaviger();
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
            activeStepId="velgArbeid"
            pageTitle={intl.formatMessage({ id: 'steps.label.velgArbeid' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
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
                    <StepButtonsHookForm
                        goToPreviousStep={() => {
                            oppdaterAppRoute(getBackLinkForVelgArbeidSteg(inntektsinformasjon));
                            mellomlagreSøknadOgNaviger();
                        }}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default VelgArbeid;
