import { Block, intlUtils, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import stepConfig, { getNextRouteForInntektsinformasjon, getPreviousStepHref } from '../stepsConfig';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from './inntektsinformasjonFormConfig';
import {
    cleanupInntektsinformasjonForm,
    getInitialInntektsinformasjonFormValues,
    mapInntektsinformasjonFormDataToState,
} from './inntektsinformasjonFormUtils';

import { BodyShort, Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import HvemKanVæreFrilanser from './components/frilans-visning/HvemKanVæreFrilanser';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import HvemKanDriveMedEgenNæring from './components/egen-næring/HvemKanDriveMedEgenNæring';
import BrukerKanIkkeSøke from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import inntektsinforMasjonQuestionsConfig from './inntektsInformasjonQuestionsConfig';
import SøknadRoutes from 'app/routes/routes';
import { useState } from 'react';
import ArbeidIUtlandetReadMore from '../arbeid_i_utlandet/components/ArbeidIUtlandetReadMore';

const Inntektsinformasjon = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn, tilrettelegging } = useSøknad();
    const [nextRoute, setNextRoute] = useState(SøknadRoutes.SKJEMA);
    const onAvbrytSøknad = useAvbrytSøknad();
    const { termindato } = barn;
    const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(values, søker);
        return [actionCreator.setSøker(updatedSøker)];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker, tilrettelegging)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility({
                    ...formValues,
                } as InntektsinformasjonFormData);

                const kanIkkeSøke =
                    arbeidsforhold.length === 0 &&
                    formValues.hattInntektSomFrilans === YesOrNo.NO &&
                    formValues.hattInntektSomNæringsdrivende === YesOrNo.NO;
                setNextRoute(getNextRouteForInntektsinformasjon(formValues));
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="arbeid"
                        pageTitle={intlUtils(intl, 'steps.label.arbeid')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                    >
                        <InntektsinformasjonFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupInntektsinformasjonForm(values, visibility)}
                        >
                            <Block padBottom="xl">
                                <BodyShort>
                                    {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV')}
                                </BodyShort>
                            </Block>
                            <ArbeidsforholdInformasjon
                                arbeidsforhold={getAktiveArbeidsforhold(arbeidsforhold, termindato)}
                            />
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(InntektsinformasjonFormField.hattInntektSomFrilans)}
                            >
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattInntektSomFrilans}
                                    legend={intlUtils(intl, 'inntektsinformasjon.harDuJobbetSomFrilans')}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.utenlandsopphold.frilans.påkrevd')
                                        )
                                    }
                                />
                                <HvemKanVæreFrilanser />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(
                                    InntektsinformasjonFormField.hattInntektSomNæringsdrivende
                                )}
                            >
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattInntektSomNæringsdrivende}
                                    legend={intlUtils(
                                        intl,
                                        'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende'
                                    )}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(
                                                intl,
                                                'valideringsfeil.utenlandsopphold.hattInntektSomNæringsdrivende.påkrevd'
                                            )
                                        )
                                    }
                                />
                                <HvemKanDriveMedEgenNæring />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(InntektsinformasjonFormField.hattArbeidIUtlandet)}
                            >
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattArbeidIUtlandet}
                                    legend={intlUtils(intl, 'inntektsinformasjon.annenInntekt')}
                                />
                                <ArbeidIUtlandetReadMore />
                            </Block>
                            {/* <Block
                                visible={visibility.isVisible(InntektsinformasjonFormField.tilrettelegging)}
                                padBottom="xl"
                            >
                                <VelgSøknadsgrunnlag
                                    formValues={formValues}
                                    label={intlUtils(intl, 'inntektsinformasjon.grunnlag.label')}
                                    options={tilretteleggingsValg}
                                    intl={intl}
                                />
                            </Block> */}
                            <Block padBottom="xl">
                                <InfoTilFiskere />
                            </Block>
                            <Block padBottom="xl">
                                <InfoOmFørstegangstjeneste />
                            </Block>
                            <Block visible={kanIkkeSøke}>
                                <BrukerKanIkkeSøke />
                            </Block>
                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousStepHref('arbeid')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    {!kanIkkeSøke && (
                                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                            {intlUtils(intl, 'søknad.gåVidere')}
                                        </Button>
                                    )}
                                </StepButtonWrapper>
                            </Block>
                        </InntektsinformasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Inntektsinformasjon;
