import { Block, intlUtils, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
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
import HvemKanVæreFrilanser from './components/frilans/HvemKanVæreFrilanser';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import HvemKanDriveMedEgenNæring from './components/egen-næring/HvemKanDriveMedEgenNæring';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import ArbeidIUtlandetReadMore from './components/arbeid-i-utlandet/components/ArbeidIUtlandetReadMore';
import ArbeidIUtlandetComponent from './components/arbeid-i-utlandet/ArbeidIUtlandetComponent';
import FrilansSubform from './components/frilans/FrilansSubform';
import { Næring } from 'app/types/Næring';
import EgenNæringSubform from './components/egen-næring/EgenNæringSubform';

const Inntektsinformasjon = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn } = useSøknad();
    const { termindato } = barn;
    const [frilans, setFrilans] = useState<Frilans | undefined>(
        søker.frilansInformasjon ? søker.frilansInformasjon : undefined
    );

    const [næring, setNæring] = useState<Næring | undefined>(
        søker.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : undefined
    );

    const [arbeidIUtlandet, setArbeidIUtlandet] = useState<ArbeidIUtlandet[]>(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : []
    );

    const [selectedAnnenInntekt, setSelectedAnnenInntekt] = useState<ArbeidIUtlandet | undefined>(undefined);

    const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(values, frilans, næring, arbeidIUtlandet);

        return [actionCreator.setSøker(updatedSøker)];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.PERIODE);

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, errors, setFieldValue, validateForm }) => {
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
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.utenlandsopphold.frilans.påkrevd')
                                        )
                                    }
                                />
                                <HvemKanVæreFrilanser />
                            </Block>
                            <FrilansSubform
                                frilans={frilans}
                                visibility={visibility}
                                formValues={formValues as InntektsinformasjonFormData}
                                errors={errors}
                                setFieldValue={setFieldValue}
                                setFrilans={setFrilans}
                                validateForm={validateForm}
                            />
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
                            <EgenNæringSubform
                                næring={næring}
                                visibility={visibility}
                                formValues={formValues as InntektsinformasjonFormData}
                                errors={errors}
                                setFieldValue={setFieldValue}
                                setNæring={setNæring}
                                validateForm={validateForm}
                            />
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(InntektsinformasjonFormField.hattArbeidIUtlandet)}
                            >
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattArbeidIUtlandet}
                                    legend={intlUtils(intl, 'inntektsinformasjon.annenInntekt')}
                                    validate={(value) => {
                                        if (value === YesOrNo.YES) {
                                            if (arbeidIUtlandet.length === 0) {
                                                return intlUtils(
                                                    intl,
                                                    'valideringsfeil.inntektsinformasjon.måOppgiArbeidIUtlandet'
                                                );
                                            }
                                        }
                                        return validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(
                                                intl,
                                                'valideringsfeil.utenlandsopphold.hattArbeidIUtlandet.påkrevd'
                                            )
                                        );
                                    }}
                                />
                                <ArbeidIUtlandetReadMore />
                            </Block>
                            <ArbeidIUtlandetComponent
                                arbeidIUtlandet={arbeidIUtlandet}
                                formValues={formValues as InntektsinformasjonFormData}
                                errors={errors}
                                selectedAnnenInntekt={selectedAnnenInntekt}
                                setArbeidIUtlandet={setArbeidIUtlandet}
                                setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                            />
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
