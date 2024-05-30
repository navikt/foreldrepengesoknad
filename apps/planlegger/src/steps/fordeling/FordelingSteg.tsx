import { SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/boxes/GreenPanel';
import Infobox from 'components/boxes/Infobox';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { finnSøker1Tekst, finnSøker2Tekst, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { formatError } from 'utils/customErrorFormatter';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerFellesperiode } from 'utils/stønadskontoerUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';
import { finnUttaksdata } from 'utils/uttakUtils';

import { BodyShort, Heading, Spacer, VStack } from '@navikt/ds-react';

import { Form, Select, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import FordelingsdetaljerPanel from './FordelingsdetaljerPanel';

type Fellesperiodefordeling = {
    antallUkerSøker1: number;
    antallUkerSøker2: number;
};

export const getFellesperiodefordelingSelectOptions = (antallUkerFellesperiode: number): Fellesperiodefordeling[] => {
    const values = [];
    for (let i = 0; i <= antallUkerFellesperiode; i++) {
        values.push({ antallUkerSøker2: i, antallUkerSøker1: antallUkerFellesperiode - i });
    }
    return values;
};

export const finnFellesperiodeFordelingOptionTekst = (
    intl: IntlShape,
    value: Fellesperiodefordeling,
    hvemPlanlegger: HvemPlanlegger,
    fornavnSøker1?: string,
    fornavnSøker2?: string,
    erOversiktSteg?: boolean,
) => {
    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;
    const søker1Tekst = erFarOgFar && fornavnSøker1 ? fornavnSøker1 : finnSøker1Tekst(intl, hvemPlanlegger);
    const søker2Tekst = erFarOgFar && fornavnSøker2 ? fornavnSøker2 : finnSøker2Tekst(intl, hvemPlanlegger);

    if (value.antallUkerSøker1 === 0) {
        return (
            <FormattedMessage
                id="FordelingSteg.FordelingOptionAlt"
                values={{ hvem: søker2Tekst, uker: value.antallUkerSøker2, erOversiktSteg }}
            />
        );
    }
    if (value.antallUkerSøker2 === 0) {
        return (
            <FormattedMessage
                id="FordelingSteg.FordelingOptionAlt"
                values={{ hvem: søker1Tekst, uker: value.antallUkerSøker1, erOversiktSteg }}
            />
        );
    }
    return (
        <FormattedMessage
            id="FordelingSteg.FordelingOptions"
            values={{
                hvem: søker1Tekst,
                hvem2: søker2Tekst,
                uker: value.antallUkerSøker1,
                uker2: value.antallUkerSøker2,
                erOversiktSteg,
            }}
        />
    );
};

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
}

const FordelingSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const { dekningsgrad } = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);

    const formMethods = useForm<Fordeling>({
        defaultValues: fordeling,
    });

    const antallUkerSøker1 = formMethods.watch('antallUkerSøker1');

    const lagre = (formValues: Fordeling) => {
        oppdaterFordeling(formValues);
        navigator.goToNextDefaultStep();
    };

    const valgtStønadskonto = stønadskontoer[dekningsgrad];

    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const uttaksdata100 = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallUkerSøker1);
    const uttaksdata80 = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallUkerSøker1);

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="FordelingSteg.Tittel" />
                        </Heading>
                        <Infobox
                            header={<FormattedMessage id="FordelingSteg.Infoboks.HvordanFordeleTittel" />}
                            icon={
                                <SectorChartIcon
                                    height={24}
                                    width={24}
                                    color="#020C1CAD"
                                    fontSize="1.5rem"
                                    aria-hidden
                                />
                            }
                            isGray
                        >
                            <BodyShort>
                                <FormattedMessage id="FordelingSteg.Infoboks.HvordanFordeleTekst" />
                            </BodyShort>
                        </Infobox>
                        <GreenPanel isDarkGreen={fordeling === undefined}>
                            <Select
                                name="antallUkerSøker1"
                                label={
                                    <FormattedMessage
                                        id="FordelingSteg.FordelingTittel"
                                        values={{ uker: antallUkerFellesperiode }}
                                    />
                                }
                                autofocusWhenEmpty
                                validate={[
                                    isRequired(intl.formatMessage({ id: 'FordelingSteg.FordelingTittel.Required' })),
                                ]}
                                customErrorFormatter={formatError}
                                onChange={scrollToBottom}
                            >
                                {getFellesperiodefordelingSelectOptions(antallUkerFellesperiode).map((value) => (
                                    <option key={value.antallUkerSøker1} value={value.antallUkerSøker1}>
                                        {finnFellesperiodeFordelingOptionTekst(
                                            intl,
                                            value,
                                            hvemPlanlegger,
                                            fornavnSøker1,
                                            fornavnSøker2,
                                        )}
                                    </option>
                                ))}
                            </Select>
                        </GreenPanel>
                        {antallUkerSøker1 !== undefined && (
                            <FordelingsdetaljerPanel
                                key={antallUkerSøker1}
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                fornavnSøker1={fornavnSøker1}
                                fornavnSøker2={fornavnSøker2}
                                uttaksdata={dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? uttaksdata100 : uttaksdata80}
                            />
                        )}
                    </VStack>
                    <Spacer />
                    <StepButtonsHookForm<Fordeling>
                        saveDataOnPreviousClick={oppdaterFordeling}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default FordelingSteg;
