import { CalendarIcon, SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/boxes/GreenPanel';
import Infoboks from 'components/boxes/Infoboks';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { erBarnetIkkeFødt } from 'types/Barnet';
import { Fellesperiodefordeling, Fordeling } from 'types/Fordeling';
import {
    HvemPlanlegger,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
    isAlene,
    isFar,
    isFarOgFar,
    isMor,
    isMorOgFar,
    isMorOgMedmor,
} from 'types/HvemPlanlegger';
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

import { Form, Select, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

const finnSøkerTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string =>
    isMorOgFar(hvemPlanlegger) || isMorOgMedmor(hvemPlanlegger) || isMor(hvemPlanlegger)
        ? intl.formatMessage({ id: 'FlereForsørgere.Mor' })
        : intl.formatMessage({ id: 'FlereForsørgere.Far' });

const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Medmor' });
    }
    if (isFar(hvemPlanlegger) || isFarOgFar(hvemPlanlegger) || isMorOgFar(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Far' });
    }
    return undefined;
};

export const getFellesperiodefordelingOptionValues = (antallUkerFellesperiode: number): Fellesperiodefordeling[] => {
    const values = [{ id: 0, antallUkerSøker1: undefined, antallUkerSøker2: undefined }] as Fellesperiodefordeling[];
    console.log(antallUkerFellesperiode);

    for (let i = 0; i <= antallUkerFellesperiode; i++) {
        const value = { id: i + 1, antallUkerSøker2: antallUkerFellesperiode - i, antallUkerSøker1: i };
        values.push(value);
    }
    return values;
};

export const getFellesperiodefordelingSelectOptions = (
    intl: IntlShape,
    selectValues: Fellesperiodefordeling[],
    hvemPlanlegger: HvemPlanlegger,
) => {
    const søkerTekst = finnSøkerTekst(intl, hvemPlanlegger);
    const annenPartTekst = finnAnnenPartTekst(intl, hvemPlanlegger);

    const options = selectValues.map((value) => {
        if (value.antallUkerSøker1 === undefined && value.antallUkerSøker2 === undefined) {
            return <option key={value.id} value={value.id}></option>;
        }
        if (value.antallUkerSøker1 === 0) {
            return (
                <option key={value.id} value={value.id}>
                    <FormattedMessage
                        id="fordeling.fordelingOptionAlt"
                        values={{ hvem: annenPartTekst, uker: value.antallUkerSøker2 }}
                    />
                </option>
            );
        }
        if (value.antallUkerSøker2 === 0) {
            return (
                <option key={value.id} value={value.id}>
                    <FormattedMessage
                        id="fordeling.fordelingOptionAlt"
                        values={{ hvem: søkerTekst, uker: value.antallUkerSøker1 }}
                    />
                </option>
            );
        }
        return (
            <option key={value.id} value={value.id}>
                <FormattedMessage
                    id="fordeling.fordelingOptions"
                    values={{
                        hvem: søkerTekst,
                        hvem2: annenPartTekst,
                        uker: value.antallUkerSøker1,
                        uker2: value.antallUkerSøker2,
                    }}
                />
            </option>
        );
    });

    return options;
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

    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);

    const lagre = (formValues: Fordeling) => {
        lagreFordeling(formValues);
        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<Fordeling>({ defaultValues: fordeling });

    const fornavnSøker = getFornavnPåSøker(hvemPlanlegger, intl);
    const fornavnAnnenPart = getFornavnPåAnnenPart(hvemPlanlegger, intl);

    const fellesperiodefordeling = formMethods.watch('fellesperiodefordeling');
    const [currentOption, setCurrentOption] = useState('');

    if (!stønadskontoer) {
        return <Loader />;
    }

    const selectedKonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[dekningsgrad]);

    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;
    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);

    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindato).toDate());

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
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');
    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1) : undefined;
    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
            ? dayjs(startdatoSøker2)
                  .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
            : undefined;
    const fellesperiodeSelectOptions = getFellesperiodefordelingSelectOptions(
        intl,
        fellesperiodeOptionValues,
        hvemPlanlegger,
    );

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="20">
                    <VStack gap="10">
                        <Heading size="large" spacing>
                            <FormattedMessage id="fordeling.tittel" />
                        </Heading>
                        {!isAlene(hvemPlanlegger) && dekningsgrad && (
                            <VStack gap="10">
                                <VStack gap="10">
                                    <Infoboks
                                        header={<FormattedMessage id="fordeling.infoboks.hvordanFordeleTittel" />}
                                        icon={
                                            <SectorChartIcon
                                                height={28}
                                                width={28}
                                                color="#020C1CAD"
                                                fontSize="1.5rem"
                                            />
                                        }
                                        isGray
                                    >
                                        <BodyLong>
                                            <FormattedMessage id="fordeling.infoboks.hvordanFordeleTekst" />
                                        </BodyLong>
                                    </Infoboks>
                                </VStack>

                                <VStack gap="10">
                                    <GreenPanel isDarkGreen={fordeling === undefined}>
                                        <Select
                                            label={<FormattedMessage id="fordeling.fordelingTittel" />}
                                            name="fellesperiodefordeling"
                                            onChange={(e) => {
                                                setCurrentOption(e.target.value);
                                            }}
                                            autofocusWhenEmpty
                                            validate={[isRequired(intl.formatMessage({ id: 'validation.required' }))]}
                                            customErrorFormatter={formatError}
                                        >
                                            {fellesperiodeSelectOptions}
                                        </Select>
                                    </GreenPanel>

                                    {currentOption !== undefined && currentOption > '0' && (
                                        <Infoboks
                                            header={<FormattedMessage id="fordeling.infoboksTittel" />}
                                            icon={
                                                <CalendarIcon
                                                    height={28}
                                                    width={28}
                                                    color="#020C1CAD"
                                                    fontSize="1.5rem"
                                                />
                                            }
                                        >
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="fordeling.infoboksTekst.førsteDag"
                                                    values={{
                                                        hvem: fornavnSøker,
                                                        dag: dayjs(startdatoSøker1).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong spacing>
                                                <FormattedMessage
                                                    id="fordeling.infoboksTekst.sisteDag"
                                                    values={{
                                                        hvem: fornavnSøker,
                                                        dag: sluttdatoSøker1.format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>

                                            <BodyLong>
                                                <FormattedMessage
                                                    id="fordeling.infoboksTekst.førsteDag"
                                                    values={{
                                                        hvem: fornavnAnnenPart,
                                                        dag: dayjs(startdatoSøker2).add(1, 'day').format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong spacing>
                                                <FormattedMessage
                                                    id="fordeling.infoboksTekst.sisteDag"
                                                    values={{
                                                        hvem: fornavnAnnenPart,
                                                        dag: dayjs(sluttdatoSøker2).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong size="small">
                                                <FormattedMessage id="fordeling.infoboksTekst.hvis" />
                                            </BodyLong>
                                        </Infoboks>
                                    )}
                                </VStack>
                            </VStack>
                        )}
                    </VStack>

                    <VStack gap="10">
                        <VStack gap="10">
                            <StepButtonsHookForm<Fordeling>
                                saveDataOnPreviousClick={lagreFordeling}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                useSimplifiedTexts
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default FordelingSteg;
