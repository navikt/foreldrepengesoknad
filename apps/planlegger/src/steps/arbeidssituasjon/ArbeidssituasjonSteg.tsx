import { CheckmarkIcon, XMarkIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infobox from 'components/boxes/Infobox';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { Situasjon, getFornavnPåAnnenPart, getFornavnPåSøker, getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';

import { BodyLong, Heading, Link, Radio, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterArbeidssituasjon = useContextSaveData(ContextDataType.ARBEIDSSITUASJON);
    const oppdaterPeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
        shouldUnregister: true,
    });

    const status = formMethods.watch('status');
    const jobberAnnenPart = formMethods.watch('jobberAnnenPart');

    const erAlenesøker = isAlene(hvemPlanlegger);
    const fornavnSøker = getFornavnPåSøker(hvemPlanlegger, intl);
    const fornavnAnnenPart = getFornavnPåAnnenPart(hvemPlanlegger, intl);

    const lagre = (formValues: Arbeidssituasjon) => {
        oppdaterArbeidssituasjon(formValues);

        const kunFar2HarRettForFødsel =
            hvemPlanlegger.type === Situasjon.FAR_OG_FAR &&
            formValues.status !== Arbeidsstatus.JOBBER &&
            omBarnet.erFødsel;

        const nextStep =
            (formValues.status !== Arbeidsstatus.JOBBER && formValues.jobberAnnenPart !== true) ||
            kunFar2HarRettForFødsel
                ? PlanleggerRoutes.OPPSUMMERING
                : PlanleggerRoutes.HVOR_LANG_PERIODE;

        if (nextStep === PlanleggerRoutes.OPPSUMMERING) {
            oppdaterPeriode(undefined);
            oppdaterFordeling(undefined);
        }

        navigator.goToNextStep(nextStep);
    };

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading level="2" size="medium">
                            <FormattedMessage id="ArbeidssituasjonSteg.Tittel" />
                        </Heading>
                        <GreenRadioGroup
                            label={
                                <FormattedMessage
                                    id="ArbeidssituasjonSteg.HvaGjelder"
                                    values={{ erAlenesøker, navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                                />
                            }
                            name="status"
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'ValidationMessage.Required',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value={Arbeidsstatus.JOBBER} autoFocus>
                                <FormattedMessage id="ArbeidssituasjonSteg.Jobber" />
                            </Radio>
                            <Radio value={Arbeidsstatus.UFØR}>
                                <FormattedMessage id="ArbeidssituasjonSteg.Ufør" />
                            </Radio>
                            <Radio value={Arbeidsstatus.INGEN}>
                                <FormattedMessage id="ArbeidssituasjonSteg.Ingen" />
                            </Radio>
                        </GreenRadioGroup>

                        {status === Arbeidsstatus.JOBBER && (
                            <Infobox
                                header={
                                    <FormattedMessage
                                        id="Arbeidssituasjon.Jobber.Infoboks.HarRettTilForeldrepenger"
                                        values={{ erAlenesøker, navn: fornavnSøker }}
                                    />
                                }
                                icon={<CheckmarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                                shouldFadeIn
                            >
                                <BodyLong>
                                    <FormattedMessage
                                        id="Arbeidssituasjon.Jobber.Infoboks.HarJobbetSeksAvTiMnd"
                                        values={{ erAlenesøker, navn: fornavnSøker }}
                                    />
                                </BodyLong>
                            </Infobox>
                        )}
                        {status === Arbeidsstatus.UFØR && (
                            <Infobox
                                header={
                                    <FormattedMessage
                                        id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                                        values={{ erAlenesøker, navn: fornavnSøker }}
                                    />
                                }
                                icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                                shouldFadeIn
                            >
                                <BodyLong>
                                    <FormattedMessage
                                        id="Arbeidssituasjon.Ufør.Infoboks.ErUfør"
                                        values={{ erAlenesøker, navn: fornavnSøker }}
                                    />
                                </BodyLong>
                                <BodyLong>
                                    <FormattedMessage
                                        id="Arbeidssituasjon.Ufør.Infoboks.LesMer"
                                        values={{
                                            a: (msg: any) => (
                                                <Link
                                                    inlineText
                                                    href={links.hvorLenge}
                                                    className="lenke"
                                                    rel="noreferrer"
                                                    target="_blank"
                                                >
                                                    {msg}
                                                </Link>
                                            ),
                                            navn: fornavnSøker,
                                            erAlenesøker,
                                        }}
                                    />
                                </BodyLong>
                            </Infobox>
                        )}
                        <></>
                        {status === Arbeidsstatus.INGEN && (
                            <Infobox
                                header={
                                    <FormattedMessage
                                        id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                                        values={{ erAlenesøker, navn: fornavnSøker }}
                                    />
                                }
                                icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                                shouldFadeIn
                            >
                                <BodyLong>
                                    <FormattedMessage
                                        id="Arbeidssituasjon.Ingen.Infoboks.ManHarIkkeRett"
                                        values={{ erAlenesøker, navn: fornavnSøker }}
                                    />
                                </BodyLong>
                                <BodyLong>
                                    <FormattedMessage
                                        id="Arbeidssituasjon.Ingen.Infoboks.Engangsstønad"
                                        values={{
                                            a: (msg: any) => (
                                                <Link
                                                    inlineText
                                                    href={links.veiviser}
                                                    className="lenke"
                                                    rel="noreferrer"
                                                    target="_blank"
                                                >
                                                    {msg}
                                                </Link>
                                            ),
                                            navn: fornavnSøker,
                                            erAlenesøker,
                                        }}
                                    />
                                </BodyLong>
                            </Infobox>
                        )}
                        {!isAlene(hvemPlanlegger) && (
                            <>
                                {status && (
                                    <>
                                        <GreenRadioGroup
                                            name="jobberAnnenPart"
                                            label={
                                                <FormattedMessage
                                                    id="Arbeidssituasjon.AndreForelder"
                                                    values={{ navn: fornavnAnnenPart }}
                                                />
                                            }
                                            validate={[
                                                isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' })),
                                            ]}
                                            shouldFadeIn
                                        >
                                            <Radio value={true} autoFocus>
                                                <FormattedMessage id="DefaultMessage.Ja" />
                                            </Radio>
                                            <Radio value={false}>
                                                <FormattedMessage id="DefaultMessage.Nei" />
                                            </Radio>
                                        </GreenRadioGroup>
                                        {jobberAnnenPart === true && (
                                            <Infobox
                                                header={
                                                    <FormattedMessage
                                                        id="Arbeidssituasjon.Jobber.Infoboks.HarRettTilForeldrepenger"
                                                        values={{ erAlenesøker, navn: fornavnAnnenPart }}
                                                    />
                                                }
                                                icon={
                                                    <CheckmarkIcon
                                                        height={28}
                                                        width={28}
                                                        color="#020C1CAD"
                                                        fontSize="1.5rem"
                                                    />
                                                }
                                                shouldFadeIn
                                            >
                                                <BodyLong>
                                                    <FormattedMessage id="Arbeidssituasjon.Jobber.Infoboks.HarJobbetSeksAvTiMnd" />
                                                </BodyLong>
                                            </Infobox>
                                        )}
                                        {jobberAnnenPart === false && (
                                            <Infobox
                                                header={
                                                    <FormattedMessage
                                                        id="Arbeidssituasjon.Infoboks.HarIkkeRettTilForeldrepenger"
                                                        values={{ erAlenesøker, navn: fornavnAnnenPart }}
                                                    />
                                                }
                                                icon={
                                                    <XMarkIcon
                                                        height={28}
                                                        width={28}
                                                        color="#020C1CAD"
                                                        fontSize="1.5rem"
                                                    />
                                                }
                                                shouldFadeIn
                                            >
                                                <BodyLong>
                                                    <FormattedMessage id="Arbeidssituasjon.Ingen.Infoboks.ManHarIkkeRett" />
                                                </BodyLong>
                                            </Infobox>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </VStack>
                    <Spacer />
                    <StepButtonsHookForm
                        saveDataOnPreviousClick={oppdaterArbeidssituasjon}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default ArbeidssituasjonSteg;
