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
    mapArbeidsforholdToSøknadsgrunnlagOptions,
    mapInntektsinformasjonFormDataToState,
} from './inntektsinformasjonFormUtils';
import inntektsinforMasjonQuestionsConfig from './inntektsInformasjonQuestionsConfig';
import { Alert, BodyShort, Button, GuidePanel } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import { Frilans } from 'app/types/Frilans';
import HvemKanVæreFrilanser from './components/frilans/HvemKanVæreFrilanser';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import HvemKanDriveMedEgenNæring from './components/egen-næring/HvemKanDriveMedEgenNæring';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import ArbeidIUtlandetDetaljer from './components/arbeid-i-utlandet/ArbeidIUtlandetDetaljer';
import FrilansDetaljer from './components/frilans/FrilansDetaljer';
import { Næring } from 'app/types/Næring';
import EgenNæringDetaljer from './components/egen-næring/EgenNæringDetaljer';
import ArbeidIUtlandetReadMore from './components/arbeid-i-utlandet/ArbeidIUtlandetReadMore';
import { VelgSøknadsgrunnlag } from 'app/types/VelgSøknadsgrunnlag';

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

    const [allArbeidIUtlandet, setAllArbeidIUtlandet] = useState<ArbeidIUtlandet[]>(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : []
    );

    const [selectedAnnenInntekt, setSelectedAnnenInntekt] = useState<ArbeidIUtlandet | undefined>(undefined);

    const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(values, frilans, næring, allArbeidIUtlandet);

        return [actionCreator.setSøker(updatedSøker)];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.PERIODE);

    const skalViseInfoOmInntektsmelding = arbeidsforhold.length > 0;

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility(
                    formValues as InntektsinformasjonFormData
                );

                const søknadsgrunnlagOptions = mapArbeidsforholdToSøknadsgrunnlagOptions(
                    frilans,
                    næring,
                    arbeidsforhold,
                    barn.termindato!
                );

                const kanIkkeSøke =
                    arbeidsforhold.length === 0 &&
                    formValues.hattInntektSomFrilans === YesOrNo.NO &&
                    formValues.hattInntektSomNæringsdrivende === YesOrNo.NO;

                const visSøknadsgrunnlagValg =
                    visibility.areAllQuestionsAnswered() && søknadsgrunnlagOptions.length > 0;
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
                            <Block padBottom="xl">
                                <BodyShort>
                                    {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV')}
                                </BodyShort>
                            </Block>

                            <ArbeidsforholdInformasjon
                                arbeidsforhold={getAktiveArbeidsforhold(arbeidsforhold, termindato)}
                            />
                            <Block visible={skalViseInfoOmInntektsmelding} padBottom="xl">
                                <GuidePanel>
                                    {intlUtils(intl, 'inntektsinformasjon.veileder.inntektsmelding')}
                                </GuidePanel>
                            </Block>
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
                            <FrilansDetaljer formValues={formValues} frilans={frilans} setFrilans={setFrilans} />
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
                            <EgenNæringDetaljer
                                næring={næring}
                                formValues={formValues as InntektsinformasjonFormData}
                                setNæring={setNæring}
                            />
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(InntektsinformasjonFormField.hattArbeidIUtlandet)}
                            >
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattArbeidIUtlandet}
                                    legend={intlUtils(intl, 'inntektsinformasjon.annenInntekt')}
                                    validate={(value) => {
                                        if (value === YesOrNo.YES) {
                                            if (allArbeidIUtlandet.length === 0) {
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
                            {formValues.hattArbeidIUtlandet === YesOrNo.YES && (
                                <ArbeidIUtlandetDetaljer
                                    allArbeidIUtlandet={allArbeidIUtlandet}
                                    formValues={formValues as InntektsinformasjonFormData}
                                    selectedAnnenInntekt={selectedAnnenInntekt}
                                    setArbeidIUtlandet={setAllArbeidIUtlandet}
                                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                                />
                            )}
                            <Block padBottom="xl">
                                <InfoTilFiskere />
                            </Block>
                            <Block padBottom="xl">
                                <InfoOmFørstegangstjeneste />
                            </Block>

                            <Block visible={visSøknadsgrunnlagValg} padBottom="xl">
                                <VelgSøknadsgrunnlag
                                    label={intlUtils(intl, 'inntektsinformasjon.grunnlag.label')}
                                    options={søknadsgrunnlagOptions}
                                />
                            </Block>
                            <Block visible={kanIkkeSøke}>
                                <Alert variant="warning">
                                    <div>
                                        <Block>
                                            <FormattedMessage
                                                id="inntektsinformasjon.alert.ingenArbeidsforhold.tittel"
                                                values={{
                                                    b: (msg: any) => <b>{msg}</b>,
                                                }}
                                            />
                                        </Block>
                                        <FormattedMessage
                                            id="inntektsinformasjon.alert.ingenArbeidsforhold"
                                            values={{
                                                a: (msg: any) => (
                                                    <a
                                                        className="lenke"
                                                        rel="noopener noreferrer"
                                                        href="https://familie.nav.no/om-svangerskapspenger"
                                                    >
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                        <FormattedMessage
                                            id="inntektsinformasjon.alert.ingenArbeidsforhold.forsettelse"
                                            values={{
                                                a: (msg: any) => (
                                                    <a
                                                        className="lenke"
                                                        rel="noopener noreferrer"
                                                        href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/chat-med-oss-om-foreldrepenger"
                                                    >
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                    </div>
                                </Alert>
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
