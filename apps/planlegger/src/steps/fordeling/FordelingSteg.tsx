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
import {
    HvemPlanlegger,
    Situasjon,
    erFarDelAvSøknaden,
    erMorDelAvSøknaden,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
} from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { formatError } from 'utils/customErrorFormatter';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import {
    getAntallUkerFellesperiode,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import useScrollBehaviour from 'utils/useScrollBehaviour';
import { finnUttaksdata } from 'utils/uttakHjelper';

import { BodyLong, Heading, Spacer, VStack } from '@navikt/ds-react';

import { Form, Select, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { LocaleAll } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import FordelingsdetaljerPanel from './FordelingsdetaljerPanel';

const finnPart1Tekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string =>
    erMorDelAvSøknaden(hvemPlanlegger.type)
        ? intl.formatMessage({ id: 'FordelingSteg.Mor' })
        : intl.formatMessage({ id: 'FordelingSteg.Far' });

const finnPart2Tekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'FordelingSteg.Medmor' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger.type)) {
        return intl.formatMessage({ id: 'FordelingSteg.Far' });
    }
    return undefined;
};

type Fellesperiodefordeling = {
    antallUkerSøker1: number;
    antallUkerSøker2: number;
};

export const getFellesperiodefordelingSelectOptions = (antallUkerFellesperiode: number): Fellesperiodefordeling[] => {
    const values = [];
    for (let i = 0; i <= antallUkerFellesperiode; i++) {
        values.push({ antallUkerSøker2: antallUkerFellesperiode - i, antallUkerSøker1: i });
    }
    return values;
};

export const finnFellesperiodeFordelingOptionTekst = (
    intl: IntlShape,
    value: Fellesperiodefordeling,
    hvemPlanlegger: HvemPlanlegger,
) => {
    const part1Tekst = finnPart1Tekst(intl, hvemPlanlegger);
    const part2Tekst = finnPart2Tekst(intl, hvemPlanlegger);

    if (value.antallUkerSøker1 === 0) {
        return (
            <FormattedMessage
                id="FordelingSteg.FordelingOptionAlt"
                values={{ hvem: part2Tekst, uker: value.antallUkerSøker2 }}
            />
        );
    }
    if (value.antallUkerSøker2 === 0) {
        return (
            <FormattedMessage
                id="FordelingSteg.FordelingOptionAlt"
                values={{ hvem: part1Tekst, uker: value.antallUkerSøker1 }}
            />
        );
    }
    return (
        <FormattedMessage
            id="FordelingSteg.FordelingOptions"
            values={{
                hvem: part1Tekst,
                hvem2: part2Tekst,
                uker: value.antallUkerSøker1,
                uker2: value.antallUkerSøker2,
            }}
        />
    );
};

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
    locale: LocaleAll;
}

const FordelingSteg: FunctionComponent<Props> = ({ stønadskontoer, locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
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

    const valgtStønadskonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[dekningsgrad]);

    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const uttaksdata100 = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallUkerSøker1);
    const uttaksdata80 = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallUkerSøker1);

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading size="large" spacing level="2">
                            <FormattedMessage id="FordelingSteg.Tittel" />
                        </Heading>
                        <Infobox
                            header={<FormattedMessage id="FordelingSteg.Infoboks.HvordanFordeleTittel" />}
                            icon={
                                <SectorChartIcon
                                    height={28}
                                    width={28}
                                    color="#020C1CAD"
                                    fontSize="1.5rem"
                                    aria-hidden
                                />
                            }
                            isGray
                        >
                            <BodyLong>
                                <FormattedMessage id="FordelingSteg.Infoboks.HvordanFordeleTekst" />
                            </BodyLong>
                        </Infobox>
                        <GreenPanel isDarkGreen={fordeling === undefined}>
                            <Select
                                name="antallUkerSøker1"
                                label={<FormattedMessage id="FordelingSteg.FordelingTittel" />}
                                autofocusWhenEmpty
                                validate={[isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' }))]}
                                customErrorFormatter={formatError}
                                onChange={scrollToBottom}
                            >
                                {getFellesperiodefordelingSelectOptions(antallUkerFellesperiode).map((value) => (
                                    <option key={value.antallUkerSøker1} value={value.antallUkerSøker1}>
                                        {finnFellesperiodeFordelingOptionTekst(intl, value, hvemPlanlegger)}
                                    </option>
                                ))}
                            </Select>
                        </GreenPanel>
                        {antallUkerSøker1 > 0 && (
                            <FordelingsdetaljerPanel
                                fornavnPart1={getFornavnPåSøker(hvemPlanlegger, intl)}
                                fornavnPart2={getFornavnPåAnnenPart(hvemPlanlegger, intl)}
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
