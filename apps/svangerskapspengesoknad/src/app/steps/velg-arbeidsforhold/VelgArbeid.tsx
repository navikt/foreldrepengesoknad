import { useState } from 'react';
import { VelgArbeidFormComponents, VelgArbeidFormData, VelgArbeidFormField } from './velgArbeidFormConfig';
import { Block, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
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
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
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
    useUpdateCurrentTilretteleggingId(undefined);
    const intl = useIntl();
    const stepConfig = useStepConfig(intl);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const tilrettelegging = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGING));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterTilrettelegging = useContextSaveData(ContextDataType.TILRETTELEGGING);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const { termindato } = barnet;

    const tilretteleggingOptions = mapArbeidsforholdToVelgArbeidOptions(
        tilrettelegging,
        søker,
        søkerInfo.arbeidsforhold,
        termindato,
        intl,
    );

    const onSubmit = (formValues: Partial<VelgArbeidFormData>) => {
        setIsSubmitting(true);

        const tilretteleggingValg = tilretteleggingOptions.filter((o) =>
            formValues.arbeidMedTilrettelegging!.find((t) => t === o.id),
        );
        oppdaterTilrettelegging(tilretteleggingValg);

        if (tilretteleggingValg.length > 0) {
            oppdaterAppRoute(`${SøknadRoutes.SKJEMA}/${tilretteleggingValg[0].id}`);
        } else {
            oppdaterAppRoute(SøknadRoutes.SKJEMA);
        }

        mellomlagreSøknadOgNaviger();
    };

    return (
        <VelgArbeidFormComponents.FormikWrapper
            initialValues={getInitialVelgArbeidFormValues(tilrettelegging)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visInfo = formValues.arbeidMedTilrettelegging && formValues.arbeidMedTilrettelegging.length > 1;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="velgArbeid"
                        pageTitle={intlUtils(intl, 'steps.label.velgArbeid')}
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
                                    legend={intlUtils(intl, 'velgArbeid.hvor')}
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
                                        route={getBackLinkForVelgArbeidSteg(søker)}
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
