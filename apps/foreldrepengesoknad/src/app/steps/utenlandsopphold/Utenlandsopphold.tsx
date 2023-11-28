import {
    Block,
    date1YearAgo,
    date1YearFromNow,
    dateToday,
    intlUtils,
    Step,
    StepButtonWrapper,
    validateYesOrNoIsAnswered,
} from '@navikt/fp-common';
import {
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormData,
} from './utenlandsoppholdFormTypes';
import { FormattedMessage, useIntl } from 'react-intl';
import actionCreator from 'app/context/action/actionCreator';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { utenlandsoppholdFormQuestions } from './utenlandsoppholdFormQuestions';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import {
    getInitialUtenlandsoppholdValuesFromState,
    mapUtenlandsoppholdFormDataToState,
} from './utenlandsoppholdFormUtils';
import SøknadRoutes from 'app/routes/routes';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './utenlandsoppholdValidering';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import { BodyLong, BodyShort, Button, ExpansionCard, Heading, Link } from '@navikt/ds-react';
import { Link as RouterLink } from 'react-router-dom';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const { informasjonOmUtenlandsopphold } = useSøknad();
    const { state } = useForeldrepengesøknadContext();

    const onValidSubmitHandler = (values: Partial<UtenlandsoppholdFormData>) => {
        const utenlandsopphold = mapUtenlandsoppholdFormDataToState(values);
        return [actionCreator.setInformasjonOmUtenlandsopphold(utenlandsopphold)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.INNTEKTSINFORMASJON,
        (state: ForeldrepengesøknadContextState) => storeAppState(state),
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    useSaveLoadedRoute(SøknadRoutes.UTENLANDSOPPHOLD);

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
                        pageTitle={intlUtils(intl, 'søknad.utenlandsopphold')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, state.søknad.erEndringssøknad)}
                    >
                        <UtenlandsoppholdFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block
                                visible={visibility.isVisible(UtenlandsoppholdFieldNames.skalBoINorgeNeste12Mnd)}
                                padBottom="l"
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.neste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdFieldNames.skalBoINorgeNeste12Mnd}
                                    description={intlUtils(intl, 'utenlandsopphold.neste12MånederInfotekst')}
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
                                            'valideringsfeil.utenlandsopphold.skalBoINorgePåkrevd',
                                        )
                                    }
                                />
                            </Block>
                            <Block
                                padBottom="xl"
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
                                    description={intlUtils(intl, 'utenlandsopphold.siste12MånederInfotekst')}
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
                                    validate={(harBoddINorgeSiste12Mnd) =>
                                        validateYesOrNoIsAnswered(
                                            harBoddINorgeSiste12Mnd,
                                            'valideringsfeil.utenlandsopphold.harBoddINorgePåkrevd',
                                        )
                                    }
                                />
                            </Block>
                            <Block
                                padBottom="xl"
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
                            <Block padBottom="xl">
                                <ExpansionCard aria-label="Informasjon om utenlandsopphold">
                                    <ExpansionCard.Header>
                                        <ExpansionCard.Title>
                                            <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.header.tittel" />
                                        </ExpansionCard.Title>
                                        <BodyLong>
                                            <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.header.ingress" />
                                        </BodyLong>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <Block padBottom="l">
                                            <BodyLong>
                                                <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.seksjon1" />
                                            </BodyLong>
                                        </Block>
                                        <Block padBottom="l">
                                            <BodyLong>
                                                <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.seksjon2" />
                                            </BodyLong>
                                        </Block>
                                        <Block padBottom="xl">
                                            <BodyLong>
                                                <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.seksjon3" />
                                            </BodyLong>
                                        </Block>
                                        <Block padBottom="l">
                                            <Heading as="h4" size="medium">
                                                <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.undertittel" />
                                            </Heading>
                                        </Block>
                                        <Block padBottom="l">
                                            <BodyLong>
                                                <FormattedMessage id="utenlandsopphold.oppholdOgStøtte.seksjon4" />
                                            </BodyLong>
                                        </Block>
                                        <BodyShort>
                                            <FormattedMessage
                                                id="utenlandsopphold.oppholdOgStøtte.seksjon5"
                                                values={{
                                                    a: (msg: any) => (
                                                        <Link
                                                            href="https://nav.no/foreldrepenger#utland"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </Link>
                                                    ),
                                                }}
                                            />
                                        </BodyShort>
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            </Block>
                            <Block>
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={RouterLink}
                                        to={getPreviousStepHref('utenlandsopphold', state.manglerDokumentasjon)}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    {visibility.areAllQuestionsAnswered() && (
                                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                            {intlUtils(intl, 'søknad.gåVidere')}
                                        </Button>
                                    )}
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
