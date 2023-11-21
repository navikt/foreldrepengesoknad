import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort, Button } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import {
    Block,
    getAktiveArbeidsforhold,
    intlUtils,
    isFarEllerMedmor,
    ISOStringToDate,
    Step,
    StepButtonWrapper,
    Søkerinfo,
} from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
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
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { Opphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import { FpDataType, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';

const findPreviousUrl = (informasjonOmUtenlandsopphold: Opphold) => {
    if (!informasjonOmUtenlandsopphold.iNorgeNeste12Mnd) {
        return SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
    } else if (!informasjonOmUtenlandsopphold.iNorgeSiste12Mnd) {
        return SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
    }
    return SøknadRoutes.UTENLANDSOPPHOLD;
};

type Props = {
    søkerInfo: Søkerinfo;
    mellomlagreSøknad: () => void;
    avbrytSøknad: () => void;
};

const Inntektsinformasjon: React.FunctionComponent<Props> = ({ søkerInfo, mellomlagreSøknad, avbrytSøknad }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useFpStateData(FpDataType.SØKERSITUASJON));
    const barn = notEmpty(useFpStateData(FpDataType.OM_BARNET));
    const søker = notEmpty(useFpStateData(FpDataType.SØKER));
    const utenlandsopphold = notEmpty(useFpStateData(FpDataType.UTENLANDSOPPHOLD));

    const lagreSøker = useFpStateSaveFn(FpDataType.SØKER);
    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);

    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const [egenNæringInformasjon, setEgenNæringsInformasjon] = useState(
        søker.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : [],
    );
    const [andreInntekterInformasjon, setAndreInntekterInformasjon] = useState(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : [],
    );

    const onSubmit = async (values: Partial<InntektsinformasjonFormData>) => {
        setIsSubmitting(true);

        const updatedSøker = mapInntektsinformasjonFormDataToState(
            values,
            søker,
            andreInntekterInformasjon,
            egenNæringInformasjon,
        );

        lagreSøker(updatedSøker);

        lagreAppRoute(SøknadRoutes.OPPSUMMERING);

        await mellomlagreSøknad();

        navigate(SøknadRoutes.OPPSUMMERING);
    };

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility(
                    formValues as InntektsinformasjonFormData,
                );

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="inntektsinformasjon"
                        pageTitle={intlUtils(intl, 'søknad.inntektsinformasjon')}
                        onCancel={avbrytSøknad}
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
                                    søkerInfo.arbeidsforhold,
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
                                    <Button variant="secondary" as={Link} to={findPreviousUrl(utenlandsopphold)}>
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
