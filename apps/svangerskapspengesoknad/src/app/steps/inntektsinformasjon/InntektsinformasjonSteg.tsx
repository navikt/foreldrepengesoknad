import { BodyShort, Button, Radio, VStack } from '@navikt/ds-react';
import { Step, StepButtonWrapper } from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, RadioGroup } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import SøknadRoutes from 'app/routes/routes';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import BackButton from '../BackButton';
import { getBackLinkForArbeidSteg, useStepConfig } from '../stepsConfig';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import BrukerKanIkkeSøke from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import HvemKanDriveMedEgenNæring from './components/hvem-kan-drive-egen-næring/HvemKanDriveMedEgenNæring';
import HvemKanVæreFrilanser from './components/hvem-kan-være-frilanser/HvemKanVæreFrilanser';
import InfoOmArbeidIUtlandet from './components/info-om-arbeid-i-utlandet/InfoOmArbeidIUtlandet';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import { getArbeidsforholdTilretteleggingOptions } from '../velg-arbeidsforhold/velgArbeidFormUtils';
import { Inntektsinformasjon } from 'app/types/Inntektsinformasjon';

const søkerHarKunEttARegArbeidsforholdForTilrettelegging = (
    formValues: Inntektsinformasjon,
    aktiveArbeidsforhold: Arbeidsforhold[],
    termindato: string,
) => {
    const kunEttAktivt = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        formValues.harJobbetSomFrilans,
        formValues.harJobbetSomSelvstendigNæringsdrivende,
    );
    return (
        formValues.harJobbetSomFrilans &&
        formValues.harJobbetSomSelvstendigNæringsdrivende &&
        kunEttAktivt &&
        aktiveArbeidsforhold.length > 0
    );
};

export const getAutomatiskValgtTilretteleggingHvisKunEtArbeid = (
    formValues: Inntektsinformasjon,
    aktiveArbeidsforhold: Arbeidsforhold[],
    termindato: string,
    tilrettelegging: Tilrettelegging[],
    intl: IntlShape,
) => {
    let automatiskValgtTilrettelegging = undefined;
    const kunEtAregArbeidsforholdForTilrettelegging = søkerHarKunEttARegArbeidsforholdForTilrettelegging(
        formValues,
        aktiveArbeidsforhold,
        termindato,
    );
    if (kunEtAregArbeidsforholdForTilrettelegging) {
        automatiskValgtTilrettelegging = getArbeidsforholdTilretteleggingOptions(
            aktiveArbeidsforhold,
            tilrettelegging,
            termindato,
            intl,
        )[0];
    }
    return automatiskValgtTilrettelegging;
};

const getNextRouteForInntektsinformasjon = (
    automatiskValgtTilrettelegging: Tilrettelegging | undefined,
    values: Inntektsinformasjon,
): SøknadRoutes => {
    if (values.harJobbetSomFrilans) {
        return SøknadRoutes.FRILANS;
    }
    if (values.harJobbetSomSelvstendigNæringsdrivende) {
        return SøknadRoutes.NÆRING;
    }
    if (values.harHattArbeidIUtlandet) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    return automatiskValgtTilrettelegging ? SøknadRoutes.SKJEMA : SøknadRoutes.VELG_ARBEID;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const InntektsinformasjonSteg: React.FunctionComponent<Props> = ({
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

    const onSubmit = (values: Inntektsinformasjon) => {
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

        oppdaterInntektsinformasjon(values);

        if (values.harHattArbeidIUtlandet === false) {
            oppdaterArbeidIUtlandet(undefined);
        }
        if (values.harJobbetSomFrilans === false) {
            oppdaterFrilans(undefined);
        }
        if (values.harJobbetSomSelvstendigNæringsdrivende === false) {
            oppdaterEgenNæring(undefined);
        }

        const neste = getNextRouteForInntektsinformasjon(automatiskValgtTilrettelegging, values);
        if (neste === SøknadRoutes.SKJEMA && automatiskValgtTilrettelegging) {
            oppdaterValgtTilretteleggingId(automatiskValgtTilrettelegging.id);
        }

        oppdaterAppRoute(neste);

        return mellomlagreSøknadOgNaviger();
    };

    const formMethods = useForm<Inntektsinformasjon>({
        defaultValues: inntektsinformasjon,
    });

    const hattInntektSomFrilans = formMethods.watch('harJobbetSomFrilans');
    const hattInntektSomNæringsdrivende = formMethods.watch('harJobbetSomSelvstendigNæringsdrivende');

    const kanIkkeSøke =
        arbeidsforhold.length === 0 && hattInntektSomFrilans === false && hattInntektSomNæringsdrivende === false;

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="arbeid"
            pageTitle={intl.formatMessage({ id: 'steps.label.arbeid' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV" />
                    </BodyShort>
                    <div>
                        <BodyShort style={{ fontWeight: 'bold' }}>
                            <FormattedMessage id="inntektsinformasjon.arbeidsforhold.label" />
                        </BodyShort>
                        <ArbeidsforholdInformasjon arbeidsforhold={aktiveArbeidsforhold} />
                    </div>
                    <div>
                        <RadioGroup
                            name="harJobbetSomFrilans"
                            label={intl.formatMessage({ id: 'inntektsinformasjon.harDuJobbetSomFrilans' })}
                            validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.frilans.påkrevd' }))]}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="nei" />
                            </Radio>
                        </RadioGroup>
                        <HvemKanVæreFrilanser />
                    </div>
                    <div>
                        <RadioGroup
                            name="harJobbetSomSelvstendigNæringsdrivende"
                            label={intl.formatMessage({
                                id: 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende',
                            })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'valideringsfeil.hattInntektSomNæringsdrivende.påkrevd' }),
                                ),
                            ]}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="nei" />
                            </Radio>
                        </RadioGroup>
                        <HvemKanDriveMedEgenNæring />
                    </div>
                    <div>
                        <RadioGroup
                            name="harHattArbeidIUtlandet"
                            label={intl.formatMessage({ id: 'inntektsinformasjon.annenInntekt' })}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.hattArbeidIUtlandet.påkrevd' })),
                            ]}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="nei" />
                            </Radio>
                        </RadioGroup>
                        <InfoOmArbeidIUtlandet />
                    </div>
                    <VStack gap="4">
                        <InfoOmFørstegangstjeneste />
                        <InfoTilFiskere />
                    </VStack>
                    {kanIkkeSøke && <BrukerKanIkkeSøke />}
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
                </VStack>
            </Form>
        </Step>
    );
};

export default InntektsinformasjonSteg;
