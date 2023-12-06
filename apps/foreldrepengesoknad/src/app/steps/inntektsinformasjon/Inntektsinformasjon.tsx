import {
    Block,
    getAktiveArbeidsforhold,
    intlUtils,
    isFarEllerMedmor,
    ISOStringToDate,
    Step,
    StepButtonWrapper,
} from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig from '../stepsConfig';
import AndreInntekter from './components/andre-inntekter/AndreInntekter';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import EgenNæring from './components/egen-næring/EgenNæring';
import Frilans from './components/frilans/Frilans';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import { InntektsinformasjonFormComponents, InntektsinformasjonFormData } from './inntektsinformasjonFormConfig';
import {
    getInitialInntektsinformasjonFormValues,
    mapInntektsinformasjonFormDataToState,
} from './inntektsinformasjonFormUtils';
import inntektsinforMasjonQuestionsConfig from './inntektsInformasjonQuestionsConfig';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import { BodyShort, Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import InformasjonOmUtenlandsopphold from 'app/context/types/InformasjonOmUtenlandsopphold';

const findPreviousUrl = (informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold) => {
    if (!informasjonOmUtenlandsopphold.iNorgeNeste12Mnd) {
        return SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
    } else if (!informasjonOmUtenlandsopphold.iNorgeSiste12Mnd) {
        return SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
    }
    return SøknadRoutes.UTENLANDSOPPHOLD;
};

const Inntektsinformasjon = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn, søkersituasjon, informasjonOmUtenlandsopphold } = useSøknad();
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const [egenNæringInformasjon, setEgenNæringsInformasjon] = useState(
        søker.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : [],
    );
    const [andreInntekterInformasjon, setAndreInntekterInformasjon] = useState(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : [],
    );

    const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(
            values,
            søker,
            andreInntekterInformasjon,
            egenNæringInformasjon,
        );

        return [actionCreator.setSøker(updatedSøker)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.OPPSUMMERING,
        (state: ForeldrepengesøknadContextState) => storeAppState(state),
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    useSaveLoadedRoute(SøknadRoutes.INNTEKTSINFORMASJON);

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility(
                    formValues as InntektsinformasjonFormData,
                );

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="inntektsinformasjon"
                        pageTitle={intlUtils(intl, 'søknad.inntektsinformasjon')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, false)}
                    >
                        <InntektsinformasjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block padBottom="l">
                                <BodyShort>
                                    Hvis du får utbetalinger fra NAV, trenger du ikke å opplyse om det i søknaden
                                </BodyShort>
                            </Block>

                            <ArbeidsforholdInformasjon
                                arbeidsforhold={getAktiveArbeidsforhold(
                                    arbeidsforhold,
                                    erAdopsjon,
                                    erFarEllerMedmor,
                                    ISOStringToDate(familiehendelsesdato),
                                )}
                            />

                            <Block padBottom="l">
                                <Frilans
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

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

                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        to={findPreviousUrl(informasjonOmUtenlandsopphold)}
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
                        </InntektsinformasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Inntektsinformasjon;
