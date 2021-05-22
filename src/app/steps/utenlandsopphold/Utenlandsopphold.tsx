import React from 'react';
import {
    Block,
    date1YearAgo,
    date1YearFromNow,
    dateToday,
    intlUtils,
    Step,
    UtvidetInformasjon,
} from '@navikt/fp-common';
import {
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormData,
} from './utenlandsoppholdFormTypes';
import { useIntl } from 'react-intl';
import actionCreator from 'app/context/action/actionCreator';
import { useHistory } from 'react-router-dom';
import { utenlandsoppholdFormQuestions } from './utenlandsoppholdFormQuestions';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { onAvbrytSøknad } from 'app/utils/globalUtil';
import { getFieldErrorRenderer } from 'app/utils/validationUtil';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    getInitialUtenlandsoppholdValuesFromState,
    mapUtenlandsoppholdFormDataToState,
} from './utenlandsoppholdFormUtils';

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const history = useHistory();

    const { state, dispatch } = useForeldrepengesøknadContext();
    const initialValues = state.søknad.informasjonOmUtenlandsopphold;

    const onValidSubmit = (values: Partial<UtenlandsoppholdFormData>) => {
        const utenlandsopphold = mapUtenlandsoppholdFormDataToState(values);

        dispatch(actionCreator.setInformasjonOmUtenlandsopphold(utenlandsopphold));
    };

    return (
        <UtenlandsoppholdFormComponents.FormikWrapper
            initialValues={getInitialUtenlandsoppholdValuesFromState(initialValues)}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = utenlandsoppholdFormQuestions.getVisbility(formValues);

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="utenlandsopphold"
                        pageTitle={intlUtils(intl, 'søknad.utenlandsopphold')}
                        stepTitle={intlUtils(intl, 'søknad.utenlandsopphold')}
                        backLinkHref={getPreviousStepHref('utenlandsopphold')}
                        onCancel={() => onAvbrytSøknad(dispatch, history)}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <UtenlandsoppholdFormComponents.Form
                            includeButtons={false}
                            fieldErrorHandler={getFieldErrorRenderer(intl)}
                        >
                            <Block
                                visible={visibility.isVisible(UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd)}
                                padBottom="l"
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.neste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd}
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
                                        no: intlUtils(
                                            intl,
                                            'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddINorge'
                                        ),
                                        yes: intlUtils(
                                            intl,
                                            'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddIUtlandet'
                                        ),
                                    }}
                                    // validate={validateYesOrNoIsAnswered}
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
                                    // validate={validateUtenlandsoppholdNeste12Mnd}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd)}
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.siste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd}
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
                                        no: intlUtils(
                                            intl,
                                            'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddINorge'
                                        ),
                                        yes: intlUtils(
                                            intl,
                                            'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddIUtlandet'
                                        ),
                                    }}
                                    // validate={validateYesOrNoIsAnswered}
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
                                    // validate={validateUtenlandsoppholdSiste12Mnd}
                                />
                            </Block>
                            <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                            </Block>
                        </UtenlandsoppholdFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Utenlandsopphold;
