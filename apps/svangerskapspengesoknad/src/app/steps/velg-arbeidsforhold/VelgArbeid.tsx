import { VelgArbeidFormComponents, VelgArbeidFormField } from './velgArbeidFormConfig';
import { Block, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getBackLinkForVelgArbeidSteg } from 'app/steps/stepsConfig';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { getValgtTilrettelegging } from 'app/utils/tilretteleggingUtils';
import SøknadRoutes from 'app/routes/routes';
import {
    cleanupOmValgArbeidFormData,
    getInitialVelgArbeidFormValues,
    getOptionNavn,
    mapArbeidsforholdToVelgArbeidOptions,
    validateVelgArbeidIsAnswered,
} from './velgArbeidFormUtils';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import { useMemo, useState } from 'react';
import Tilrettelegging from 'app/types/Tilrettelegging';
import FlereArbeidsforholdGuidePanel from './components/guidepanel/FlereArbeidsforholdGuidePanel';

const VelgArbeid: React.FunctionComponent = () => {
    useUpdateCurrentTilretteleggingId(undefined);
    const intl = useIntl();
    const søknad = useSøknad();
    const { søker, tilrettelegging, barn } = søknad;
    const { termindato } = barn;
    const { arbeidsforhold } = useSøkerinfo();

    const [nextRoute, setNextRoute] = useState(SøknadRoutes.SKJEMA.toString());
    const [valgtTilrettelegging, setValgtTilrettelegging] = useState<Tilrettelegging[]>([]);
    const tilretteleggingOptions = useMemo(
        () => mapArbeidsforholdToVelgArbeidOptions(tilrettelegging, søker, arbeidsforhold, termindato, intl),
        [tilrettelegging, søker, arbeidsforhold, termindato, intl],
    );
    const onValidSubmitHandler = () => {
        return [actionCreator.setTilrettelegging(valgtTilrettelegging)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <VelgArbeidFormComponents.FormikWrapper
            initialValues={getInitialVelgArbeidFormValues(tilrettelegging)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visInfo = formValues.arbeidMedTilrettelegging && formValues.arbeidMedTilrettelegging.length > 1;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="velgArbeid"
                        pageTitle={intlUtils(intl, 'steps.label.velgArbeid')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, søknad, arbeidsforhold)}
                        supportsTempSaving={false}
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
                                    <Button variant="secondary" as={Link} to={getBackLinkForVelgArbeidSteg(søker)}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                        onClick={() => {
                                            const tilretteleggingValg = getValgtTilrettelegging(
                                                tilretteleggingOptions,
                                                formValues.arbeidMedTilrettelegging!,
                                            );
                                            setValgtTilrettelegging(tilretteleggingValg);
                                            const førsteTilretteleggingId =
                                                tilretteleggingValg.length > 0 ? tilretteleggingValg[0].id : undefined;
                                            if (førsteTilretteleggingId) {
                                                setNextRoute(`${SøknadRoutes.SKJEMA}/${førsteTilretteleggingId}`);
                                            }
                                        }}
                                    >
                                        {intlUtils(intl, 'søknad.gåVidere')}
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
