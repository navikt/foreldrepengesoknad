import React from 'react';
import {
    Block,
    date1YearAgo,
    date1YearFromNow,
    dateToday,
    intlUtils,
    Step,
    UtvidetInformasjon,
    validateYesOrNoIsAnswered,
} from '@navikt/fp-common';
import {
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormData,
} from './utenlandsoppholdFormTypes';
import { useIntl } from 'react-intl';
import actionCreator from 'app/context/action/actionCreator';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { utenlandsoppholdFormQuestions } from './utenlandsoppholdFormQuestions';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    getInitialUtenlandsoppholdValuesFromState,
    mapUtenlandsoppholdFormDataToState,
} from './utenlandsoppholdFormUtils';
import SøknadRoutes from 'app/routes/routes';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './utenlandsoppholdValidering';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveCurrentRoute';

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const { informasjonOmUtenlandsopphold } = useSøknad();

    const onValidSubmitHandler = (values: Partial<UtenlandsoppholdFormData>) => {
        const utenlandsopphold = mapUtenlandsoppholdFormDataToState(values);
        return [actionCreator.setInformasjonOmUtenlandsopphold(utenlandsopphold)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.INNTEKTSINFORMASJON,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    useSaveLoadedRoute(SøknadRoutes.UTENLANDSOPPHOLD);

    return (
        <UtenlandsoppholdFormComponents.FormikWrapper
            initialValues={getInitialUtenlandsoppholdValuesFromState(informasjonOmUtenlandsopphold)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = utenlandsoppholdFormQuestions.getVisbility(formValues);

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="utenlandsopphold"
                        pageTitle={intlUtils(intl, 'søknad.utenlandsopphold')}
                        stepTitle={intlUtils(intl, 'søknad.utenlandsopphold')}
                        backLinkHref={getPreviousStepHref('utenlandsopphold')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl)}
                        kompakt={true}
                    >
                        <UtenlandsoppholdFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block
                                visible={visibility.isVisible(UtenlandsoppholdFieldNames.skalBoINorgeNeste12Mnd)}
                                padBottom="l"
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.neste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdFieldNames.skalBoINorgeNeste12Mnd}
                                    description={
                                        <UtvidetInformasjon
                                            apneLabel={intlUtils(
                                                intl,
                                                'utenlandsopphold.neste12MånederInfotekst.apneLabel'
                                            )}
                                        >
                                            {intlUtils(intl, 'utenlandsopphold.neste12MånederInfotekst')}
                                        </UtvidetInformasjon>
                                    }
                                    labels={{
                                        yes: intlUtils(
                                            intl,
                                            'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddINorge'
                                        ),
                                        no: intlUtils(
                                            intl,
                                            'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddIUtlandet'
                                        ),
                                    }}
                                    validate={(skalBoINorgeNeste12Mnd) =>
                                        validateYesOrNoIsAnswered(
                                            skalBoINorgeNeste12Mnd,
                                            'valideringsfeil.utenlandsopphold.skalBoINorgePåkrevd'
                                        )
                                    }
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd)}
                            >
                                <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                    name={UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd}
                                    minDate={dateToday}
                                    maxDate={date1YearFromNow}
                                    labels={{
                                        addLabel: intlUtils(intl, 'utenlandsopphold.knapp.leggTilLand'),
                                        modalTitle: 'Utenlandsopphold neste 12 måneder',
                                    }}
                                    erFremtidigOpphold={true}
                                    validate={validateUtenlandsoppholdNeste12Mnd(intl)}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(UtenlandsoppholdFieldNames.harBoddINorgeSiste12Mnd)}
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.siste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdFieldNames.harBoddINorgeSiste12Mnd}
                                    description={
                                        <UtvidetInformasjon
                                            apneLabel={intlUtils(
                                                intl,
                                                'utenlandsopphold.siste12MånederInfotekst.apneLabel'
                                            )}
                                        >
                                            {intlUtils(intl, 'utenlandsopphold.siste12MånederInfotekst')}
                                        </UtvidetInformasjon>
                                    }
                                    labels={{
                                        yes: intlUtils(
                                            intl,
                                            'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddINorge'
                                        ),
                                        no: intlUtils(
                                            intl,
                                            'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddIUtlandet'
                                        ),
                                    }}
                                    validate={(harBoddINorgeSiste12Mnd) =>
                                        validateYesOrNoIsAnswered(
                                            harBoddINorgeSiste12Mnd,
                                            'valideringsfeil.utenlandsopphold.harBoddINorgePåkrevd'
                                        )
                                    }
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd)}
                            >
                                <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                    minDate={date1YearAgo}
                                    maxDate={dateToday}
                                    name={UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd}
                                    labels={{
                                        addLabel: intlUtils(intl, 'utenlandsopphold.knapp.leggTilLand'),
                                        modalTitle: 'Utenlandsopphold siste 12 måneder',
                                    }}
                                    erFremtidigOpphold={false}
                                    validate={validateUtenlandsoppholdSiste12Mnd(intl)}
                                />
                            </Block>
                            <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                    {intlUtils(intl, 'søknad.gåVidere')}
                                </Hovedknapp>
                            </Block>
                        </UtenlandsoppholdFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Utenlandsopphold;
