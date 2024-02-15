import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort, Button } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { notEmpty } from '@navikt/fp-validation';
import {
    Block,
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
    intlUtils,
    Step,
    StepButtonWrapper,
    validateYesOrNoIsAnswered,
} from '@navikt/fp-common';
import {
    getAktiveArbeidsforhold,
    getAutomatiskValgtTilretteleggingHvisKunEtArbeid,
} from 'app/utils/arbeidsforholdUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { getBackLinkForArbeidSteg, getNextRouteForInntektsinformasjon, useStepConfig } from '../stepsConfig';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from './inntektsinformasjonFormConfig';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import HvemKanDriveMedEgenNæring from './components/hvem-kan-drive-egen-næring/HvemKanDriveMedEgenNæring';
import BrukerKanIkkeSøke from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import InfoOmArbeidIUtlandet from './components/info-om-arbeid-i-utlandet/InfoOmArbeidIUtlandet';
import HvemKanVæreFrilanser from './components/hvem-kan-være-frilanser/HvemKanVæreFrilanser';
import BackButton from '../BackButton';
import { Arbeidsforhold } from '@navikt/fp-types';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const Inntektsinformasjon: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inntektsinformasjon = useContextGetData(ContextDataType.INNTEKTSINFORMASJON);
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const { termindato } = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterInntektsinformasjon = useContextSaveData(ContextDataType.INNTEKTSINFORMASJON);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterArbeidIUtlandet = useContextSaveData(ContextDataType.ARBEID_I_UTLANDET);

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);

    const onSubmit = (values: Partial<InntektsinformasjonFormData>) => {
        setIsSubmitting(true);

        const automatiskValgtTilrettelegging = getAutomatiskValgtTilretteleggingHvisKunEtArbeid(
            values,
            aktiveArbeidsforhold,
            termindato,
            tilrettelegginger || [],
            intl,
        );

        if (automatiskValgtTilrettelegging) {
            oppdaterTilrettelegginger([automatiskValgtTilrettelegging]);
        }

        oppdaterInntektsinformasjon({
            harHattAnnenInntekt: convertYesOrNoOrUndefinedToBoolean(values.hattArbeidIUtlandet)!,
            harJobbetSomFrilans: convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomFrilans)!,
            harJobbetSomSelvstendigNæringsdrivende: convertYesOrNoOrUndefinedToBoolean(
                values.hattInntektSomNæringsdrivende,
            )!,
        });

        if (values.hattArbeidIUtlandet === YesOrNo.NO) {
            oppdaterArbeidIUtlandet(undefined);
        }
        if (values.hattInntektSomFrilans === YesOrNo.NO) {
            oppdaterFrilans(undefined);
        }
        if (values.hattInntektSomNæringsdrivende === YesOrNo.NO) {
            oppdaterEgenNæring(undefined);
        }

        const neste = getNextRouteForInntektsinformasjon(automatiskValgtTilrettelegging, values);
        if (neste === SøknadRoutes.SKJEMA && automatiskValgtTilrettelegging) {
            oppdaterValgtTilretteleggingId(automatiskValgtTilrettelegging.id);
        }

        oppdaterAppRoute(neste);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={
                inntektsinformasjon
                    ? {
                          hattArbeidIUtlandet: convertBooleanOrUndefinedToYesOrNo(
                              inntektsinformasjon.harHattAnnenInntekt,
                          ),
                          hattInntektSomNæringsdrivende: convertBooleanOrUndefinedToYesOrNo(
                              inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
                          ),
                          hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(
                              inntektsinformasjon.harJobbetSomFrilans,
                          ),
                      }
                    : {}
            }
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const kanIkkeSøke =
                    arbeidsforhold.length === 0 &&
                    formValues.hattInntektSomFrilans === YesOrNo.NO &&
                    formValues.hattInntektSomNæringsdrivende === YesOrNo.NO;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="arbeid"
                        pageTitle={intlUtils(intl, 'steps.label.arbeid')}
                        onCancel={avbrytSøknad}
                        steps={stepConfig}
                        onContinueLater={onFortsettSøknadSenere}
                    >
                        <InntektsinformasjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block padBottom="xl">
                                <BodyShort>
                                    <FormattedMessage id="inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV" />
                                </BodyShort>
                            </Block>
                            <Block padBottom="m">
                                <BodyShort style={{ fontWeight: 'bold' }}>
                                    <FormattedMessage id="inntektsinformasjon.arbeidsforhold.label" />
                                </BodyShort>
                            </Block>
                            <Block padBottom="xxl">
                                <ArbeidsforholdInformasjon arbeidsforhold={aktiveArbeidsforhold} />
                            </Block>
                            <Block padBottom="xxl">
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattInntektSomFrilans}
                                    legend={intlUtils(intl, 'inntektsinformasjon.harDuJobbetSomFrilans')}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.frilans.påkrevd'),
                                        )
                                    }
                                />
                                <HvemKanVæreFrilanser />
                            </Block>
                            <Block padBottom="xxl">
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattInntektSomNæringsdrivende}
                                    legend={intlUtils(
                                        intl,
                                        'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende',
                                    )}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.hattInntektSomNæringsdrivende.påkrevd'),
                                        )
                                    }
                                />
                                <HvemKanDriveMedEgenNæring />
                            </Block>
                            <Block padBottom="xxl">
                                <InntektsinformasjonFormComponents.YesOrNoQuestion
                                    name={InntektsinformasjonFormField.hattArbeidIUtlandet}
                                    legend={intlUtils(intl, 'inntektsinformasjon.annenInntekt')}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.hattArbeidIUtlandet.påkrevd'),
                                        )
                                    }
                                />
                                <InfoOmArbeidIUtlandet />
                            </Block>
                            <Block padBottom="l">
                                <InfoOmFørstegangstjeneste />
                            </Block>
                            <Block padBottom="xxl">
                                <InfoTilFiskere />
                            </Block>
                            <Block padBottom="l" visible={kanIkkeSøke}>
                                <BrukerKanIkkeSøke />
                            </Block>
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={getBackLinkForArbeidSteg(utenlandsopphold)}
                                    />
                                    {!kanIkkeSøke && (
                                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                            <FormattedMessage id="søknad.gåVidere" />
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
