import { SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/boxes/GreenPanel';
import Infobox from 'components/boxes/Infobox';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { erBarnetIkkeFødt } from 'types/Barnet';
import { Fellesperiodefordeling, Fordeling } from 'types/Fordeling';
import {
    HvemPlanlegger,
    erFarDelAvSøknaden,
    erMorDelAvSøknaden,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
    isAlene,
} from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { formatError } from 'utils/customErrorFormatter';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from 'utils/uttakHjelper';

import { BodyLong, Heading, Loader, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { Form, Select, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import FordelingsdetaljerPanel from './FordelingsdetaljerPanel';

const finnPart1Tekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string =>
    erMorDelAvSøknaden(hvemPlanlegger.type)
        ? intl.formatMessage({ id: 'FlereForsørgere.Mor' })
        : intl.formatMessage({ id: 'FlereForsørgere.Far' });

const finnPart2Tekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'FlereForsørgere.Medmor' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger.type)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Far' });
    }
    return undefined;
};

export const getFellesperiodefordelingOptionValues = (antallUkerFellesperiode: number): Fellesperiodefordeling[] => {
    const values = [{ id: 0, antallUkerSøker1: undefined, antallUkerSøker2: undefined }] as Fellesperiodefordeling[];

    for (let i = 0; i <= antallUkerFellesperiode; i++) {
        values.push({ id: i + 1, antallUkerSøker2: antallUkerFellesperiode - i, antallUkerSøker1: i });
    }
    return values;
};

export const finnFellesperiodeFordelingOptionTekst = (
    intl: IntlShape,
    value: Fellesperiodefordeling,
    hvemPlanlegger: HvemPlanlegger,
) => {
    if (value.antallUkerSøker1 === undefined && value.antallUkerSøker2 === undefined) {
        return null;
    }

    const part1Tekst = finnPart1Tekst(intl, hvemPlanlegger);
    const part2Tekst = finnPart2Tekst(intl, hvemPlanlegger);

    if (value.antallUkerSøker1 === 0) {
        return (
            <FormattedMessage
                id="fordeling.fordelingOptionAlt"
                values={{ hvem: part2Tekst, uker: value.antallUkerSøker2 }}
            />
        );
    }
    if (value.antallUkerSøker2 === 0) {
        return (
            <FormattedMessage
                id="fordeling.fordelingOptionAlt"
                values={{ hvem: part1Tekst, uker: value.antallUkerSøker1 }}
            />
        );
    }
    return (
        <FormattedMessage
            id="fordeling.fordelingOptions"
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
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
}

const FordelingSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const { dekningsgrad } = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);

    const formMethods = useForm<Fordeling>({ defaultValues: fordeling });

    if (!stønadskontoer) {
        return <Loader />;
    }

    if (isAlene(hvemPlanlegger)) {
        throw new Error('Ureachable code');
    }

    const lagre = (formValues: Fordeling) => {
        oppdaterFordeling(formValues);
        return navigator.goToNextDefaultStep();
    };

    const fellesperiodefordeling = formMethods.watch('fellesperiodefordeling');

    const selectedKonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[dekningsgrad]);

    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;
    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);

    const startdatoSøker1 = dayjs(getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindato).toDate())).format(
        ISO_DATE_FORMAT,
    );

    const fellesperiodeOptionValues = getFellesperiodefordelingOptionValues(antallUkerFellesperiode);
    const antallUkerFellesperiodeSøker1 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;
    const antallUkerFellesperiodeSøker2 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;

    const sluttdatoSøker1 =
        antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1.antallUkerSøker1
            ? dayjs(startdatoSøker1)
                  .add(antallUkerMødrekvote, 'weeks')
                  .add(antallUkerFellesperiodeSøker1.antallUkerSøker1, 'weeks')
                  .format(ISO_DATE_FORMAT)
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks').format(ISO_DATE_FORMAT);
    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
            ? dayjs(sluttdatoSøker1)
                  .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
                  .format(ISO_DATE_FORMAT)
            : undefined;

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <Heading size="large" spacing>
                        <FormattedMessage id="fordeling.tittel" />
                    </Heading>
                    <Infobox
                        header={<FormattedMessage id="fordeling.infoboks.hvordanFordeleTittel" />}
                        icon={<SectorChartIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                        isGray
                    >
                        <BodyLong>
                            <FormattedMessage id="fordeling.infoboks.hvordanFordeleTekst" />
                        </BodyLong>
                    </Infobox>
                    <GreenPanel isDarkGreen={fordeling === undefined}>
                        <Select
                            name="fellesperiodefordeling"
                            label={<FormattedMessage id="fordeling.fordelingTittel" />}
                            autofocusWhenEmpty
                            validate={[isRequired(intl.formatMessage({ id: 'validation.required' }))]}
                            customErrorFormatter={formatError}
                        >
                            {fellesperiodeOptionValues.map((value) => (
                                <option key={value.id} value={value.id}>
                                    {finnFellesperiodeFordelingOptionTekst(intl, value, hvemPlanlegger)}
                                </option>
                            ))}
                        </Select>
                    </GreenPanel>
                    {fellesperiodefordeling !== undefined && fellesperiodefordeling > 0 && (
                        <FordelingsdetaljerPanel
                            fornavnPart1={getFornavnPåSøker(hvemPlanlegger, intl)}
                            startdatoPart1={startdatoSøker1}
                            sluttdatoPart1={sluttdatoSøker1}
                            fornavnPart2={getFornavnPåAnnenPart(hvemPlanlegger, intl)}
                            startdatoPart2={sluttdatoSøker1}
                            sluttdatoPart2={sluttdatoSøker2}
                        />
                    )}
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
