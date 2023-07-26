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
import inntektsinforMasjonQuestionsConfig from './inntektsInformasjonQuestionsConfig';
import { BodyShort, Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsgforholdUtils';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import { Frilans } from 'app/types/Frilans';
import FrilansInput from './components/frilans/FrilansInput';
import FrilansVisning from './components/frilans/FrilansVisning';
import HvemKanVæreFrilanser from './components/frilans/HvemKanVæreFrilanser';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import EgenNæringInput from './components/egen-næring/EgenNæringInput';
import { Næring } from 'app/types/Næring';
import HvemKanDriveMedEgenNæring from './components/egen-næring/HvemKanDriveMedEgenNæring';
import EgenNæringVisning from './components/egen-næring/EgenNæringVisning';

const Inntektsinformasjon = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn } = useSøknad();
    const { termindato } = barn;
    const [frilans, setFrilans] = useState<Frilans | undefined>(
        søker.frilansInformasjon ? søker.frilansInformasjon : undefined
    );
    const [redigererFrilans, setRedigererFrilans] = useState(false);
    const [næring, setNæring] = useState<Næring | undefined>(
        søker.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : undefined
    );
    const [redigererNæring, setRedigererNæring] = useState(false);

    const [andreInntekterInformasjon, setAndreInntekterInformasjon] = useState(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : []
    );

    const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(values, andreInntekterInformasjon);

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
                const visFrilansInput =
                    (formValues.hattInntektSomFrilans === YesOrNo.YES && !frilans) || redigererFrilans;
                const visFrilansInfo = frilans && !redigererFrilans && formValues.hattInntektSomFrilans === YesOrNo.YES;
                const visNæringInput =
                    (formValues.hattInntektSomNæringsdrivende === YesOrNo.YES && !næring) || redigererNæring;
                const visNæringInfo =
                    næring && !redigererNæring && formValues.hattInntektSomNæringsdrivende === YesOrNo.YES;

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
                            cleanup={(values) => cleanupInntektsinformasjonForm(values, visibility)}
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
                            {visFrilansInput && (
                                <Block padBottom="l">
                                    <FrilansInput
                                        visibility={visibility}
                                        formValues={formValues as InntektsinformasjonFormData}
                                        setFrilans={setFrilans}
                                        setRedigererFrilans={setRedigererFrilans}
                                        errors={errors}
                                        setFieldValue={setFieldValue}
                                    />
                                </Block>
                            )}
                            {visFrilansInfo && (
                                <Block padBottom="l">
                                    <FrilansVisning frilans={frilans!} setRedigererFrilans={setRedigererFrilans} />
                                </Block>
                            )}
                            <Block
                                padBottom="l"
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
                                />
                                <HvemKanDriveMedEgenNæring />
                            </Block>
                            {visNæringInput && (
                                <Block padBottom="l">
                                    <EgenNæringInput
                                        visibility={visibility}
                                        formValues={formValues as InntektsinformasjonFormData}
                                        setNæring={setNæring}
                                        setRedigererNæring={setRedigererNæring}
                                        errors={errors}
                                        setFieldValue={setFieldValue}
                                    />
                                </Block>
                            )}
                            {visNæringInfo && (
                                <Block padBottom="l">
                                    <EgenNæringVisning næring={næring!} setRedigererNæring={setRedigererNæring} />
                                </Block>
                            )}

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
