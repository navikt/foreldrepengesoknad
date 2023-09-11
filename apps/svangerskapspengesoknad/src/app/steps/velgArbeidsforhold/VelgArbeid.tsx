import { VelgArbeidFormComponents, VelgArbeidFormData, VelgArbeidFormField } from './velgArbeidFormConfig';
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
import { mapTilrettelegging } from 'app/utils/tilretteleggingUtils';
import SøknadRoutes from 'app/routes/routes';
import {
    getInitialVelgArbeidFormValues,
    mapArbeidsforholdToVelgArbeidOptions,
    validateVelgArbeidIsAnswered,
} from './velgArbeidFormUtils';

const VelgArbeid: React.FunctionComponent = () => {
    const intl = useIntl();
    const { søker, tilrettelegging, barn } = useSøknad();
    const { arbeidsforhold } = useSøkerinfo();
    const {
        frilansInformasjon,
        selvstendigNæringsdrivendeInformasjon,
        harJobbetSomFrilansSiste10Mnd,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
    } = søker;
    const onValidSubmitHandler = (values: Partial<VelgArbeidFormData>) => {
        const mappedTilrettelegging = mapTilrettelegging(
            tilrettelegging,
            values.arbeidMedTilrettelegging!,
            søker,
            arbeidsforhold,
            barn.termindato
        );
        return [actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.SKJEMA);
    const onAvbrytSøknad = useAvbrytSøknad();
    const options = mapArbeidsforholdToVelgArbeidOptions(
        tilrettelegging,
        harJobbetSomFrilansSiste10Mnd,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        frilansInformasjon,
        selvstendigNæringsdrivendeInformasjon,
        arbeidsforhold,
        barn.termindato
    );

    return (
        <VelgArbeidFormComponents.FormikWrapper
            initialValues={getInitialVelgArbeidFormValues(tilrettelegging)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="velgArbeid"
                        pageTitle={intlUtils(intl, 'steps.label.velgArbeid')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                    >
                        <VelgArbeidFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            // cleanup={(values) => cleanupFrilansFormData(values, visibility)} //TODO
                        >
                            <Block padBottom="l">
                                <VelgArbeidFormComponents.CheckboxGroup
                                    name={VelgArbeidFormField.arbeidMedTilrettelegging}
                                    legend={intlUtils(intl, 'velgArbeid.hvor')}
                                    checkboxes={options.map((option) => ({
                                        label: option.arbeidsforhold.navn,
                                        value: option.id,
                                        defaultChecked: !!(
                                            formValues && formValues.arbeidMedTilrettelegging!.includes(option.id)
                                        ),
                                    }))}
                                    validate={(value) => validateVelgArbeidIsAnswered(value, intl)}
                                />
                            </Block>

                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getBackLinkForVelgArbeidSteg(søker)}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
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
