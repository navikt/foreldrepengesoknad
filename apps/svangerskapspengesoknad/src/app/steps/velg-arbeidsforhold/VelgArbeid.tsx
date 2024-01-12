import { useState } from 'react';
import { VelgArbeidFormComponents, VelgArbeidFormData, VelgArbeidFormField } from './velgArbeidFormConfig';
import { Block, Step, StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { getBackLinkForVelgArbeidSteg, useStepConfig } from 'app/steps/stepsConfig';
import { Button } from '@navikt/ds-react';
import SøknadRoutes from 'app/routes/routes';
import {
    cleanupOmValgArbeidFormData,
    getInitialVelgArbeidFormValues,
    getOptionNavn,
    mapArbeidsforholdToVelgArbeidOptions,
    validateVelgArbeidIsAnswered,
} from './velgArbeidFormUtils';
import FlereArbeidsforholdGuidePanel from './components/guidepanel/FlereArbeidsforholdGuidePanel';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import { Søkerinfo } from 'app/types/Søkerinfo';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import BackButton from '../BackButton';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const VelgArbeid: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        søkerInfo.arbeidsforhold,
        termindato,
        intl,
        frilans,
        egenNæring,
    );

    const onSubmit = (formValues: Partial<VelgArbeidFormData>) => {
        setIsSubmitting(true);

        const valgteTilrettelegginger = tilretteleggingOptions.filter((o) =>
            formValues.arbeidMedTilrettelegging!.some((t) => t === o.id),
        );
        oppdaterTilrettelegginger(valgteTilrettelegginger);

        oppdaterValgtTilretteleggingId(valgteTilrettelegginger[0].id);
        oppdaterAppRoute(SøknadRoutes.SKJEMA);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <VelgArbeidFormComponents.FormikWrapper
            initialValues={getInitialVelgArbeidFormValues(tilrettelegginger)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visInfo = formValues.arbeidMedTilrettelegging && formValues.arbeidMedTilrettelegging.length > 1;
                return (
                    <Step
                        bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
                        activeStepId="velgArbeid"
                        pageTitle={intl.formatMessage({ id: 'steps.label.velgArbeid' })}
                        onCancel={avbrytSøknad}
                        steps={stepConfig}
                        onContinueLater={onFortsettSøknadSenere}
                    >
                        <VelgArbeidFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmValgArbeidFormData(values, tilretteleggingOptions)}
                        >
                            <Block padBottom="l">
                                <VelgArbeidFormComponents.CheckboxGroup
                                    name={VelgArbeidFormField.arbeidMedTilrettelegging}
                                    legend={intl.formatMessage({ id: 'velgArbeid.hvor' })}
                                    checkboxes={tilretteleggingOptions.map((option) => ({
                                        label: getOptionNavn(
                                            option.arbeidsforhold.type,
                                            option.arbeidsforhold.navn,
                                            intl,
                                        ),
                                        value: option.id,
                                    }))}
                                    validate={(value) => validateVelgArbeidIsAnswered(value, intl)}
                                />
                            </Block>
                            {visInfo && <FlereArbeidsforholdGuidePanel />}

                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={getBackLinkForVelgArbeidSteg(inntektsinformasjon)}
                                    />
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        <FormattedMessage id="søknad.gåVidere" />
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </VelgArbeidFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default VelgArbeid;
