import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, getNavnPåSøker, isAlene, isMor, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

const finnSøkerTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string =>
    isMorOgFar(hvemPlanlegger) || isMorOgMedmor(hvemPlanlegger) || isMor(hvemPlanlegger)
        ? intl.formatMessage({ id: 'FlereForsørgere.Mor' })
        : intl.formatMessage({ id: 'FlereForsørgere.Far' });

// TODO Desse to bør leggast i links-fila i constants-pakka
export const HVOR_LENGE_LENKE = 'https://www.nav.no/foreldrepenger#hvor-lenge';
export const VEIVISER_LENKE = 'https://familie.nav.no/veiviser';

const ArbeidssituasjonSteg: FunctionComponent = () => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const lagreArbeidssituasjon = useContextSaveData(ContextDataType.ARBEIDSSITUASJON);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
    });

    const lagre = (formValues: Arbeidssituasjon) => {
        lagreArbeidssituasjon(formValues);
        return navigator.goToNextDefaultStep();
    };

    const erAlenesøker = isAlene(hvemPlanlegger);

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <Heading level="2" size="medium">
                        <FormattedMessage id="arbeid.tittel" />
                    </Heading>
                    <GreenRadioGroup
                        label={
                            erAlenesøker ? (
                                <FormattedMessage id="barnet.hvaGjelderDeg" />
                            ) : (
                                <FormattedMessage
                                    id={'arbeid.hvaGjelder'}
                                    values={{ navn: getNavnPåSøker(hvemPlanlegger) }}
                                />
                            )
                        }
                        name="arbeidssituasjon"
                        validate={[
                            isRequired(
                                erAlenesøker
                                    ? intl.formatMessage({
                                          id: 'feilmelding.arbeidssituasjonAlene.duMåOppgi',
                                      })
                                    : intl.formatMessage(
                                          {
                                              id: 'feilmelding.arbeidssituasjonFlere.duMåOppgi',
                                          },
                                          { hvem: finnSøkerTekst(intl, hvemPlanlegger) },
                                      ),
                            ),
                        ]}
                    >
                        <Radio value={ArbeidssituasjonEnum.JOBBER} autoFocus>
                            <FormattedMessage id="arbeid.jobber" />
                        </Radio>
                        <Radio value={ArbeidssituasjonEnum.UFØR}>
                            <FormattedMessage id="arbeid.ufør" />
                        </Radio>
                        <Radio value={ArbeidssituasjonEnum.INGEN}>
                            <FormattedMessage id="arbeid.ingen" />
                        </Radio>
                    </GreenRadioGroup>
                    {erAlenesøker && <Aleneforsørger />}
                    {!erAlenesøker && <FlereForsørgere hvemPlanlegger={hvemPlanlegger} />}
                    <VStack gap="20">
                        <HvorforSpørNAVOmDette text="TODO" />
                        <StepButtonsHookForm
                            saveDataOnPreviousClick={lagreArbeidssituasjon}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            useSimplifiedTexts
                        />
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerPage>
    );
};

export default ArbeidssituasjonSteg;
