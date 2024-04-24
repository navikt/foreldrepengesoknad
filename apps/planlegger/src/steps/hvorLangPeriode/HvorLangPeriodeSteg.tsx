import { CalendarIcon } from '@navikt/aksel-icons';
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
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { erAlenesøker as erAlene, getTekstForDeSomHarRett } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto } from 'utils/stønadskontoerUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';
import { finnAntallUkerMedForeldrepenger, finnUttaksdata } from 'utils/uttakUtils';

import { BodyLong, Heading, Radio, Spacer, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { LocaleAll } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import NårBareEnPartHarRettInfoboks from './infoboks/NårBareEnPartHarRettInfoboks';
import ValgtDekningsgradInfoboks from './infoboks/ValgtDekningsgradInfoboks';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
    locale: LocaleAll;
}

const HvorLangPeriodeSteg: FunctionComponent<Props> = ({ stønadskontoer, locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();

    const periode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));

    const oppdaterPeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);

    const formMethods = useForm<HvorLangPeriode>({ defaultValues: periode });

    const erAlenesøker = erAlene(hvemPlanlegger);
    const lagre = (formValues: HvorLangPeriode) => {
        oppdaterPeriode(formValues);
        const nextRoute =
            arbeidssituasjon.status === Arbeidsstatus.JOBBER && !!arbeidssituasjon.jobberAnnenPart
                ? PlanleggerRoutes.FORDELING
                : PlanleggerRoutes.OVERSIKT;

        if (nextRoute === PlanleggerRoutes.OVERSIKT) {
            oppdaterFordeling(undefined);
        }

        return navigator.goToNextStep(nextRoute);
    };

    const dekningsgrad = formMethods.watch('dekningsgrad');

    const valgtDekningsgrad = dekningsgrad || periode?.dekningsgrad;

    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;

    const farHarIkkeRett = arbeidssituasjon.jobberAnnenPart === false;
    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const kunEnPartSkalHa = erAlenesøker || morHarIkkeRett || farHarIkkeRett;
    const deSomHarRett = getTekstForDeSomHarRett(hvemPlanlegger, arbeidssituasjon, intl);

    const stønadskonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.HUNDRE_PROSENT],
    );
    const stønadskonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.ÅTTI_PROSENT],
    );

    const uttaksdata100 = finnUttaksdata(hvemHarRett, hvemPlanlegger, stønadskonto100, barnet);
    const uttaksdata80 = finnUttaksdata(hvemHarRett, hvemPlanlegger, stønadskonto80, barnet);

    const antallUker100 = finnAntallUkerMedForeldrepenger(uttaksdata100);
    const antallUker80 = finnAntallUkerMedForeldrepenger(uttaksdata80);

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="HvorLangPeriodeSteg.Tittel" />
                        </Heading>
                        <Infobox
                            header={<FormattedMessage id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel" />}
                            icon={
                                <CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" aria-hidden />
                            }
                            isGray
                        >
                            <BodyLong>
                                <FormattedMessage
                                    id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst"
                                    values={{
                                        kunEnPartSkalHa,
                                        uker100: antallUker100,
                                        uker80: antallUker80,
                                    }}
                                />
                            </BodyLong>
                        </Infobox>
                        {!erAlenesøker && hvemHarRett !== 'beggeHarRett' && (
                            <NårBareEnPartHarRettInfoboks
                                hvemPlanlegger={hvemPlanlegger}
                                arbeidssituasjon={arbeidssituasjon}
                            />
                        )}
                        <GreenRadioGroup
                            label={
                                <FormattedMessage id="HvorLangPeriodeSteg.HvorLangPeriode" values={{ deSomHarRett }} />
                            }
                            name="dekningsgrad"
                            validate={[
                                isRequired(
                                    intl.formatMessage(
                                        {
                                            id: 'HvorLangPeriodeSteg.HvorLangPeriode.Required',
                                        },
                                        { deSomHarRett },
                                    ),
                                ),
                            ]}
                            onChange={scrollToBottom}
                        >
                            <Radio value={Dekningsgrad.HUNDRE_PROSENT} autoFocus>
                                <FormattedMessage id="HvorLangPeriodeSteg.100" values={{ uker100: antallUker100 }} />
                            </Radio>
                            <Radio value={Dekningsgrad.ÅTTI_PROSENT}>
                                <FormattedMessage id="HvorLangPeriodeSteg.80" values={{ uker80: antallUker80 }} />
                            </Radio>
                        </GreenRadioGroup>
                        {dekningsgrad && (
                            <ValgtDekningsgradInfoboks
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                arbeidssituasjon={arbeidssituasjon}
                                stønadskontoer={stønadskontoer}
                                uttaksdata100={uttaksdata100}
                                uttaksdata80={uttaksdata80}
                                valgtDekningsgrad={valgtDekningsgrad}
                            />
                        )}
                    </VStack>
                    <Spacer />
                    <StepButtonsHookForm<HvorLangPeriode>
                        saveDataOnPreviousClick={oppdaterPeriode}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default HvorLangPeriodeSteg;
