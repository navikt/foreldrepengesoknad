import { Block, intlUtils, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import stepConfig, { getBackLinkForArbeidSteg, getNextRouteForInntektsinformasjon } from '../stepsConfig';
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

import { BodyShort, Button, Label } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import {
    getAktiveArbeidsforhold,
    getAutomatiskValgtTilretteleggingHvisKunEtArbeid,
    getUnikeArbeidsforhold,
} from 'app/utils/arbeidsforholdUtils';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import HvemKanDriveMedEgenNæring from './components/hvem-kan-drive-egen-næring/HvemKanDriveMedEgenNæring';
import BrukerKanIkkeSøke from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import SøknadRoutes from 'app/routes/routes';
import { useState } from 'react';
import InfoOmArbeidIUtlandet from './components/info-om-arbeid-i-utlandet/InfoOmArbeidIUtlandet';
import HvemKanVæreFrilanser from './components/hvem-kan-være-frilanser/HvemKanVæreFrilanser';
import Tilrettelegging from 'app/types/Tilrettelegging';

const Inntektsinformasjon: React.FunctionComponent = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const søknad = useSøknad();
    const { søker, barn, tilrettelegging, informasjonOmUtenlandsopphold } = søknad;
    const [nextRoute, setNextRoute] = useState(SøknadRoutes.ARBEID.toString());
    const [autoValgtTilrettelegging, setAutoValgtTilrettelegging] = useState<Tilrettelegging | undefined>(undefined);
    const onAvbrytSøknad = useAvbrytSøknad();
    const { termindato } = barn;
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const aktiveUnikeArbeidsforhold = getUnikeArbeidsforhold(arbeidsforhold, termindato);
    const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
        const updatedSøker = mapInntektsinformasjonFormDataToState(values, søker);
        if (autoValgtTilrettelegging) {
            return [actionCreator.setSøker(updatedSøker), actionCreator.setTilrettelegging([autoValgtTilrettelegging])];
        }

        return [actionCreator.setSøker(updatedSøker)];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={handleSubmit}
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
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, søknad, arbeidsforhold)}
                        useNoTempSavingText={true}
                    >
                        <InntektsinformasjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block padBottom="xl">
                                <BodyShort>
                                    {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV')}
                                </BodyShort>
                            </Block>
                            <Block padBottom="m">
                                <Label>{intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.label')}</Label>
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
                                        to={getBackLinkForArbeidSteg(informasjonOmUtenlandsopphold)}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    {!kanIkkeSøke && (
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            loading={isSubmitting}
                                            onClick={() => {
                                                const automatiskValgtTilrettelegging =
                                                    getAutomatiskValgtTilretteleggingHvisKunEtArbeid(
                                                        formValues,
                                                        aktiveUnikeArbeidsforhold,
                                                        termindato,
                                                        tilrettelegging,
                                                        intl,
                                                    );
                                                setAutoValgtTilrettelegging(automatiskValgtTilrettelegging);
                                                setNextRoute(
                                                    getNextRouteForInntektsinformasjon(
                                                        automatiskValgtTilrettelegging,
                                                        formValues,
                                                    ),
                                                );
                                            }}
                                        >
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
