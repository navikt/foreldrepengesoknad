import { Block, intlUtils, Step, StepButtonWrapper } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AndreInntekter from './components/andre-inntekter/AndreInntekter';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import EgenNæring from './components/egen-næring/EgenNæring';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from './inntektsinformasjonFormConfig';
import {
    getInitialInntektsinformasjonFormValues,
    mapInntektsinformasjonFormDataToState,
} from './inntektsinformasjonFormUtils';
import inntektsinforMasjonQuestionsConfig from './inntektsInformasjonQuestionsConfig';
import { BodyShort, Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsgforholdUtils';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import { Frilans } from 'app/types/Frilans';
import FrilansSubform from './components/frilans/FrilansSubform';
import FrilansVisning from './components/frilans/FrilansVisning';
import HvemKanVæreFrilanser from './components/frilans/HvemKanVæreFrilanser';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';

export const cleanupInntektsinformasjonFormData = (
    values: InntektsinformasjonFormData,
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>
): InntektsinformasjonFormData => {
    const cleanedData: InntektsinformasjonFormData = {
        hattInntektSomFrilans: visibility.isVisible(InntektsinformasjonFormField.hattInntektSomFrilans)
            ? values.hattInntektSomFrilans
            : YesOrNo.UNANSWERED,
        hattInntektSomNæringsdrivende: visibility.isVisible(InntektsinformasjonFormField.hattInntektSomNæringsdrivende)
            ? values.hattInntektSomNæringsdrivende
            : YesOrNo.UNANSWERED,
        hattAndreInntekter: visibility.isVisible(InntektsinformasjonFormField.hattAndreInntekter)
            ? values.hattAndreInntekter
            : YesOrNo.UNANSWERED,
        frilansOppstartsDato: visibility.isVisible(InntektsinformasjonFormField.frilansOppstartsDato)
            ? values.frilansOppstartsDato
            : '',
        frilansSluttDato: visibility.isVisible(InntektsinformasjonFormField.frilansSluttDato)
            ? values.frilansSluttDato
            : '',
        jobberFremdelesSomFrilanser: visibility.isVisible(InntektsinformasjonFormField.jobberFremdelesSomFrilanser)
            ? values.jobberFremdelesSomFrilanser
            : YesOrNo.UNANSWERED,
    };

    return cleanedData;
};

const Inntektsinformasjon = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn } = useSøknad();
    const { termindato } = barn;
    const [frilans, setFrilans] = useState<Frilans | undefined>(undefined);
    const [redigererFrilans, setRedigererFrilans] = useState(false);

    const [egenNæringInformasjon, setEgenNæringsInformasjon] = useState(
        søker.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : []
    );
    const [andreInntekterInformasjon, setAndreInntekterInformasjon] = useState(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : []
    );

    const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(
            values,
            andreInntekterInformasjon,
            egenNæringInformasjon
        );

        return [actionCreator.setSøker(updatedSøker)];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTENLANDSOPPHOLD);
    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, errors, setFieldValue }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility(
                    formValues as InntektsinformasjonFormData
                );

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="arbeid"
                        pageTitle={intlUtils(intl, 'steps.label.arbeid')}
                        // onCancel={onAvbrytSøknad}
                        // onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl)}
                    >
                        <InntektsinformasjonFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupInntektsinformasjonFormData(values, visibility)}
                        >
                            <Block padBottom="l">
                                <BodyShort>
                                    {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV')}
                                </BodyShort>
                            </Block>

                            <ArbeidsforholdInformasjon
                                arbeidsforhold={getAktiveArbeidsforhold(arbeidsforhold, termindato)}
                            />
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(InntektsinformasjonFormField.hattInntektSomFrilans)}
                            >
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattInntektSomFrilans}
                                    legend={intlUtils(intl, 'inntektsinformasjon.harDuJobbetSomFrilans')}
                                />
                                <HvemKanVæreFrilanser />
                            </Block>
                            {((formValues.hattInntektSomFrilans === YesOrNo.YES && !frilans) || redigererFrilans) && (
                                <Block padBottom="l">
                                    <FrilansSubform
                                        visibility={visibility}
                                        formValues={formValues as InntektsinformasjonFormData}
                                        setFrilans={setFrilans}
                                        setRedigererFrilans={setRedigererFrilans}
                                        errors={errors}
                                        setFieldValue={setFieldValue}
                                    />
                                </Block>
                            )}
                            {frilans && !redigererFrilans && formValues.hattInntektSomFrilans === YesOrNo.YES && (
                                <Block padBottom="l">
                                    <FrilansVisning frilans={frilans} setRedigererFrilans={setRedigererFrilans} />
                                </Block>
                            )}

                            <Block padBottom="l">
                                <EgenNæring
                                    egenNæringInformasjon={egenNæringInformasjon}
                                    setEgenNæringsInformasjon={setEgenNæringsInformasjon}
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <AndreInntekter
                                    andreInntekterInformasjon={andreInntekterInformasjon}
                                    setAndreInntekterInformasjon={setAndreInntekterInformasjon}
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <InfoTilFiskere />
                            </Block>
                            <Block padBottom="l">
                                <InfoOmFørstegangstjeneste />
                            </Block>
                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousStepHref('arbeid')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
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
