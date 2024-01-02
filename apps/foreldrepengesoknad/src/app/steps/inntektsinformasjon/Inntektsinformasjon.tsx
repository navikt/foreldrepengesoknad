import { useState } from 'react';
import { useIntl } from 'react-intl';
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
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import BackButton from '../BackButton';
import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { AttachmentMetadataType } from '@navikt/fp-types/src/AttachmentMetadata';

const findPreviousUrl = (informasjonOmUtenlandsopphold: Opphold) => {
    if (!informasjonOmUtenlandsopphold.iNorgeNeste12Mnd) {
        return SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
    } else if (!informasjonOmUtenlandsopphold.iNorgeSiste12Mnd) {
        return SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
    }
    return SøknadRoutes.UTENLANDSOPPHOLD;
};

const leggTilMetadataPåAndreInntekter = (vedlegg: Attachment[] | undefined) => {
    if (!vedlegg || vedlegg.length === 0) {
        return vedlegg;
    }

    return vedlegg.map((v) => {
        return {
            ...v,
            dokumenterer: {
                type: AttachmentMetadataType.OPPTJENING,
            },
        } as Attachment;
    });
};

type Props = {
    søkerInfo: Søkerinfo;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const Inntektsinformasjon: React.FunctionComponent<Props> = ({
    søkerInfo,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);

    const oppdaterSøker = useContextSaveData(ContextDataType.SØKER);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterVedlegg = useContextSaveData(ContextDataType.VEDLEGG);

    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const [egenNæringInformasjon, setEgenNæringsInformasjon] = useState(
        søker.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : [],
    );
    const [andreInntekterInformasjon, setAndreInntekterInformasjon] = useState(
        søker.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : [],
    );
    const [andreInntekterVedlegg, setAndreInntekerVedlegg] = useState(vedlegg ? vedlegg[Skjemanummer.ANNET] : []);

    const onSubmit = (values: Partial<InntektsinformasjonFormData>) => {
        setIsSubmitting(true);

        const updatedSøker = mapInntektsinformasjonFormDataToState(
            values,
            søker,
            andreInntekterInformasjon,
            egenNæringInformasjon,
        );

        oppdaterSøker(updatedSøker);

        if (vedlegg) {
            oppdaterVedlegg({
                ...vedlegg,
                [Skjemanummer.ANNET]: leggTilMetadataPåAndreInntekter(andreInntekterVedlegg),
            });
        }

        if (!vedlegg) {
            oppdaterVedlegg({
                [Skjemanummer.ANNET]: leggTilMetadataPåAndreInntekter(andreInntekterVedlegg),
            });
        }

        oppdaterAppRoute(SøknadRoutes.OPPSUMMERING);

        mellomlagreSøknadOgNaviger();
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
                                    setAndreInntekerVedlegg={setAndreInntekerVedlegg}
                                    andreInntekterVedlegg={andreInntekterVedlegg || []}
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <InfoTilFiskere />
                            </Block>

                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={findPreviousUrl(utenlandsopphold)}
                                    />
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
