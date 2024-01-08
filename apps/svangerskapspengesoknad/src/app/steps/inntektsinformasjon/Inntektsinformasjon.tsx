import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { BodyShort, Button } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { notEmpty } from '@navikt/fp-validation';
import { Block, intlUtils, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { getBackLinkForArbeidSteg, getNextRouteForInntektsinformasjon, useStepConfig } from '../stepsConfig';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from './inntektsinformasjonFormConfig';
import {
    getInitialInntektsinformasjonFormValues,
    mapInntektsinformasjonFormDataToState,
} from './inntektsinformasjonFormUtils';

import {
    getAktiveArbeidsforhold,
    getAutomatiskValgtTilretteleggingHvisKunEtArbeid,
} from 'app/utils/arbeidsforholdUtils';
import { Søkerinfo } from 'app/types/Søkerinfo';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import HvemKanDriveMedEgenNæring from './components/hvem-kan-drive-egen-næring/HvemKanDriveMedEgenNæring';
import BrukerKanIkkeSøke from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import InfoOmArbeidIUtlandet from './components/info-om-arbeid-i-utlandet/InfoOmArbeidIUtlandet';
import HvemKanVæreFrilanser from './components/hvem-kan-være-frilanser/HvemKanVæreFrilanser';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const Inntektsinformasjon: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søker = useContextGetData(ContextDataType.SØKER);
    const tilrettelegging = useContextGetData(ContextDataType.TILRETTELEGGING);
    const { termindato } = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterSøker = useContextSaveData(ContextDataType.SØKER);
    const oppdaterTilrettelegging = useContextSaveData(ContextDataType.TILRETTELEGGING);

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(søkerInfo.arbeidsforhold, termindato);

    const onSubmit = (values: Partial<InntektsinformasjonFormData>) => {
        setIsSubmitting(true);

        const automatiskValgtTilrettelegging = getAutomatiskValgtTilretteleggingHvisKunEtArbeid(
            values,
            aktiveArbeidsforhold,
            termindato,
            tilrettelegging || [],
            intl,
        );

        if (automatiskValgtTilrettelegging) {
            oppdaterTilrettelegging([automatiskValgtTilrettelegging]);
        }

        const updatedSøker = mapInntektsinformasjonFormDataToState(values, søker);
        oppdaterSøker(updatedSøker);

        const neste = getNextRouteForInntektsinformasjon(automatiskValgtTilrettelegging, values);
        oppdaterAppRoute(neste);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={søker ? getInitialInntektsinformasjonFormValues(søker) : {}}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const kanIkkeSøke =
                    søkerInfo.arbeidsforhold.length === 0 &&
                    formValues.hattInntektSomFrilans === YesOrNo.NO &&
                    formValues.hattInntektSomNæringsdrivende === YesOrNo.NO;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="arbeid"
                        pageTitle={intlUtils(intl, 'steps.label.arbeid')}
                        onCancel={avbrytSøknad}
                        steps={stepConfig}
                        supportsTempSaving={false}
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
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        to={getBackLinkForArbeidSteg(utenlandsopphold)}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
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
