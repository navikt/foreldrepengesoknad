import { Block, intlUtils, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import useSøknad from 'app/utils/hooks/useSøknad';
import stepConfig, { getNextRouteForUtenlandsopphold, getPreviousSetStepHref } from '../stepsConfig';
import { BodyShort, Button } from '@navikt/ds-react';
import { Link as RouterLink } from 'react-router-dom';
import {
    UtenlandsoppholdField,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormData,
} from './utenlandsoppholdFormTypes';
import {
    getInitialUtenlandsoppholdValuesFromState,
    mapUtenlandsoppholdFormDataToState,
} from './utenlandsoppholdFormUtils';
import { utenlandsoppholdFormQuestions } from './utenlandsoppholdFormQuestions';
import InformasjonOmUtenlandsopphold from './components/InformasjonOmUtenlandsopphold';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import SøknadRoutes from 'app/routes/routes';
import actionCreator from 'app/context/action/actionCreator';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { useState } from 'react';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const søknad = useSøknad();
    const { informasjonOmUtenlandsopphold } = søknad;
    const [nextRoute, setNextRoute] = useState(SøknadRoutes.ARBEID);

    const onAvbrytSøknad = useAvbrytSøknad();

    const onValidSubmitHandler = (values: Partial<UtenlandsoppholdFormData>) => {
        const utenlandsopphold = mapUtenlandsoppholdFormDataToState(values, informasjonOmUtenlandsopphold);
        return [actionCreator.setUtenlandsopphold(utenlandsopphold)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    return (
        <UtenlandsoppholdFormComponents.FormikWrapper
            initialValues={getInitialUtenlandsoppholdValuesFromState(informasjonOmUtenlandsopphold)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = utenlandsoppholdFormQuestions.getVisbility(formValues as UtenlandsoppholdFormData);
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="utenlandsopphold"
                        pageTitle={intlUtils(intl, 'steps.label.utenlandsopphold')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, søknad, arbeidsforhold)}
                        useNoTempSavingText={true}
                    >
                        <UtenlandsoppholdFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block padBottom="xxl">
                                <BodyShort size="medium">{intlUtils(intl, 'utenlandsopphold.infotekst')}</BodyShort>
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(UtenlandsoppholdField.harBoddINorgeSiste12Mnd)}
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.siste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdField.harBoddINorgeSiste12Mnd}
                                    labels={{
                                        yes: intlUtils(
                                            intl,
                                            'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddINorge',
                                        ),
                                        no: intlUtils(
                                            intl,
                                            'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddIUtlandet',
                                        ),
                                    }}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.utenlandsopphold.harBoddINorge.påkrevd'),
                                        )
                                    }
                                />
                            </Block>
                            <Block
                                visible={visibility.isVisible(UtenlandsoppholdField.skalBoINorgeNeste12Mnd)}
                                padBottom="xxl"
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.neste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdField.skalBoINorgeNeste12Mnd}
                                    labels={{
                                        yes: intlUtils(
                                            intl,
                                            'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddINorge',
                                        ),
                                        no: intlUtils(
                                            intl,
                                            'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddIUtlandet',
                                        ),
                                    }}
                                    validate={(skalBoINorgeNeste12Mnd) =>
                                        validateYesOrNoIsAnswered(
                                            skalBoINorgeNeste12Mnd,
                                            intlUtils(intl, 'valideringsfeil.utenlandsopphold.skalBoINorge.påkrevd'),
                                        )
                                    }
                                />
                            </Block>

                            <Block padBottom="xxl">
                                <InformasjonOmUtenlandsopphold />
                            </Block>
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={RouterLink}
                                        to={getPreviousSetStepHref('utenlandsopphold')}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                        onClick={() => {
                                            setNextRoute(getNextRouteForUtenlandsopphold(formValues));
                                        }}
                                    >
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </UtenlandsoppholdFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Utenlandsopphold;
