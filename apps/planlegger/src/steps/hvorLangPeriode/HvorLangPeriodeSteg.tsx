import { CalendarIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import BlueRadioGroup from 'components/formWrappers/BlueRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Situasjon } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { erAlenesøker as erAlene, getTekstForDeSomHarRett } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { finnAntallUkerOgDagerMedForeldrepenger, finnUttaksdata } from 'utils/uttakUtils';

import { BodyShort, Heading, Link, Radio, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import NårBareEnPartHarRettInfoboks from './infoboks/NårBareEnPartHarRettInfoboks';
import ValgtDekningsgradInfoboks from './infoboks/ValgtDekningsgradInfoboks';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
}

const HvorLangPeriodeSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const periode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));

    const oppdaterPeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);

    const formMethods = useForm<HvorLangPeriode>({ defaultValues: periode });

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erAdopsjon = erBarnetAdoptert(barnet);

    const onSubmit = (formValues: HvorLangPeriode) => {
        oppdaterPeriode(formValues);
        const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;
        const beggeHarRett = arbeidssituasjon.status === Arbeidsstatus.JOBBER && !!arbeidssituasjon.jobberAnnenPart;
        const nextRoute =
            beggeHarRett && !(erFarOgFar && barnet.erFødsel)
                ? PlanleggerRoutes.FORDELING
                : PlanleggerRoutes.PLANEN_DERES;

        if (nextRoute === PlanleggerRoutes.PLANEN_DERES) {
            oppdaterFordeling(undefined);
        }

        return navigator.goToNextStep(nextRoute);
    };

    const dekningsgrad = formMethods.watch('dekningsgrad');
    const valgtDekningsgrad = dekningsgrad || periode?.dekningsgrad;

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const deSomHarRett = getTekstForDeSomHarRett(hvemPlanlegger, hvemHarRett, intl);

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];

    const stønadskonto = valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;
    const valgtStønadskonto = valgtDekningsgrad ? stønadskonto : undefined;

    const uttaksdata100 = finnUttaksdata(hvemHarRett, hvemPlanlegger, stønadskonto100, barnet);
    const uttaksdata80 = finnUttaksdata(hvemHarRett, hvemPlanlegger, stønadskonto80, barnet);

    const antallUkerOgDager100 = finnAntallUkerOgDagerMedForeldrepenger(uttaksdata100);
    const antallUkerOgDager80 = finnAntallUkerOgDagerMedForeldrepenger(uttaksdata80);
    const antallUkerOgDager =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? antallUkerOgDager100 : antallUkerOgDager80;

    const kunEnAvSøkereneHarRett = hvemHarRett === 'kunSøker1HarRett' || hvemHarRett === 'kunSøker2HarRett';

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="HvorLangPeriodeSteg.Tittel" />
                        </Heading>
                        <Infobox
                            header={<FormattedMessage id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel" />}
                            icon={
                                <CalendarIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />
                            }
                            isGray
                        >
                            <BodyShort>
                                <FormattedMessage
                                    id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst"
                                    values={{
                                        beggeHarRett: hvemHarRett === 'beggeHarRett',
                                        uker100: antallUkerOgDager100.uker,
                                        dager100: antallUkerOgDager100.dager,
                                        uker80: antallUkerOgDager80.uker,
                                        dager80: antallUkerOgDager80.dager,
                                    }}
                                />
                            </BodyShort>
                        </Infobox>
                        {!erAlenesøker && kunEnAvSøkereneHarRett && hvemPlanlegger.type !== Situasjon.FAR_OG_FAR && (
                            <NårBareEnPartHarRettInfoboks
                                hvemPlanlegger={hvemPlanlegger}
                                arbeidssituasjon={arbeidssituasjon}
                            />
                        )}
                        {kunEnAvSøkereneHarRett && hvemPlanlegger.type === Situasjon.FAR_OG_FAR && erAdopsjon && (
                            <Infobox
                                header={<FormattedMessage id="HvorLangPeriodeSteg.Infoboks.KunEnAvFedreneHarRett" />}
                                isGray
                            >
                                <BodyShort>
                                    <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.NårBareEnHarRett" />
                                </BodyShort>
                                <BodyShort>
                                    <FormattedMessage
                                        id="HvorLangPeriodeSteg.Infoboks.ManFårEnDel"
                                        values={{
                                            a: (msg: any) => (
                                                <Link
                                                    inlineText
                                                    href={links.godkjentAktivitet}
                                                    className="lenke"
                                                    rel="noreferrer"
                                                    target="_blank"
                                                >
                                                    {msg}
                                                </Link>
                                            ),
                                        }}
                                    />
                                </BodyShort>
                            </Infobox>
                        )}
                        <BlueRadioGroup
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
                                <FormattedMessage
                                    id="HvorLangPeriodeSteg.100"
                                    values={{
                                        uker100: antallUkerOgDager100.uker,
                                        dager100: antallUkerOgDager100.dager,
                                    }}
                                />
                            </Radio>
                            <Radio value={Dekningsgrad.ÅTTI_PROSENT}>
                                <FormattedMessage
                                    id="HvorLangPeriodeSteg.80"
                                    values={{ uker80: antallUkerOgDager80.uker, dager80: antallUkerOgDager80.dager }}
                                />
                            </Radio>
                        </BlueRadioGroup>
                        {valgtStønadskonto && (
                            <ValgtDekningsgradInfoboks
                                key={valgtDekningsgrad}
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                arbeidssituasjon={arbeidssituasjon}
                                valgtStønadskonto={valgtStønadskonto}
                                uttaksdata100={uttaksdata100}
                                uttaksdata80={uttaksdata80}
                                valgtDekningsgrad={valgtDekningsgrad}
                                antallUkerOgDager={antallUkerOgDager}
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
