import { CalendarIcon, SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import InfoboksGenerell from 'components/InfoboksGenerell';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnHvemPlanlegger } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';
import { erBarnetIkkeFødt } from 'types/Barnet';
import { HvemPlanlegger, isAlene, isFar, isFarOgFar, isMor, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';
import { Fellesperiodefordeling, Periode } from 'types/Periode';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';

import { BodyLong, Heading, Radio, VStack } from '@navikt/ds-react';

import { Dekningsgrad, getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/fp-common';
import { Form, RadioGroup, Select, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

export const finnNavn = (hvemPlanlegger: HvemPlanlegger) => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor, hvemPlanlegger.navnPåMedmor];
    }
    if (isMorOgFar(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor, hvemPlanlegger.navnPåFar];
    }
    if (isMor(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor];
    }
    if (isFar(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåFar];
    }
    if (!isFarOgFar(hvemPlanlegger)) {
        throw new Error('Feil i kode: Ugyldig finnNavn');
    }
    return [hvemPlanlegger.navnPåFar, hvemPlanlegger.navnPåMedfar];
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

export const getFellesperiodefordelingSelectOptions = (selectValues: Fellesperiodefordeling[]) => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const hvem = finnHvemPlanlegger(hvemPlanlegger);

    const options = selectValues.map((value) => {
        if (value.antallUkerSøker1 === undefined && value.antallUkerSøker2 === undefined) {
            return <option value={value.id}></option>;
        }
        if (value.antallUkerSøker1 === 0) {
            return (
                <option value={value.id}>
                    <FormattedMessage
                        id="periode.fordelingOptionAlt"
                        values={{ hvem: hvem[1], uker: value.antallUkerSøker2 }}
                    />
                </option>
            );
        }
        if (value.antallUkerSøker2 === 0) {
            return (
                <option value={value.id}>
                    <FormattedMessage
                        id="periode.fordelingOptionAlt"
                        values={{ hvem: hvem[0], uker: value.antallUkerSøker1 }}
                    />
                </option>
            );
        }
        return (
            <option value={value.id}>
                <FormattedMessage
                    id="periode.fordelingOptions"
                    values={{
                        hvem: hvem[0],
                        hvem2: hvem[1],
                        uker: value.antallUkerSøker1,
                        uker2: value.antallUkerSøker2,
                    }}
                />
            </option>
        );
    });

    return options;
};

const PeriodeSteg: FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const periode = useContextGetData(ContextDataType.PERIODE);
    const formMethods = useForm<Periode>({ defaultValues: periode });

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const lagrePeriode = useContextSaveData(ContextDataType.PERIODE);

    const lagre = (formValues: Periode) => {
        lagrePeriode(formValues);
        return navigator.goToNextDefaultStep();
    };

    const intl = useIntl();
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const navneliste = finnNavn(hvemPlanlegger);

    const fornavnFørste = navneliste[0].split(' ')[0];
    const fornavnAndre = navneliste.length > 1 ? navneliste[1].split(' ')[0] : undefined;

    const fellesperiodefordeling = formMethods.watch('fellesperiodefordeling');
    console.log(fellesperiodefordeling);
    const [currentOption, setCurrentOption] = useState('');

    // TODO: hent fra api
    const konto100 = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 80,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };
    const konto80 = {
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 90,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };

    const mappedKonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100);
    const mappedKonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80);
    const dekningsgrad = formMethods.watch('dekningsgrad');
    const selectedKonto = dekningsgrad
        ? dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? mappedKonto100
            : mappedKonto80
        : mappedKonto100;
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
    console.log('antallUkerFellesperiodeSøker1: ', antallUkerFellesperiodeSøker1);
    console.log('fellesperiodefordeling: ', fellesperiodefordeling);

    const sluttdatoSøker1 =
        antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1.antallUkerSøker1
            ? dayjs(startdatoSøker1)
                  .add(antallUkerMødrekvote, 'weeks')
                  .add(antallUkerFellesperiodeSøker1.antallUkerSøker1, 'weeks')
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');
    console.log('sluttdato: ', sluttdatoSøker1);
    console.log('antallUkerFellesperiodeSøker1: ', antallUkerFellesperiodeSøker1);
    console.log('antallUkerFellesperiodeSøker2: ', antallUkerFellesperiodeSøker2);
    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1) : undefined;
    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
            ? dayjs(startdatoSøker2)
                  .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
            : undefined;
    console.log('startdatoSøker1: ', startdatoSøker1);
    console.log('sluttdatoSøker1: ', sluttdatoSøker1);
    console.log('startdatoSøker2: ', startdatoSøker2);
    console.log('sluttdatoSøker2: ', sluttdatoSøker2);
    const fellesperiodeSelectOptions = getFellesperiodefordelingSelectOptions(fellesperiodeOptionValues);
    const sluttdatoForeldrepenger = startdatoSøker1
        ? dayjs(startdatoSøker1)
              .add(antallUkerMødrekvote, 'weeks')
              .add(antallUkerFedrekvote, 'weeks')
              .add(antallUkerFellesperiode, 'weeks')
        : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="20">
                    <VStack gap="10">
                        <Heading size="large" spacing>
                            <FormattedMessage id="periode.tittel" />
                        </Heading>
                        <InfoboksGenerell
                            header={<FormattedMessage id="periode.infoboks.hvorLangPeriodeTittel" />}
                            icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                        >
                            <BodyLong>
                                {isAlene(hvemPlanlegger) ? (
                                    <FormattedMessage id="periode.infoboks.hvorLangPeriodeTekstDeg" />
                                ) : (
                                    <FormattedMessage id="periode.infoboks.hvorLangPeriodeTekst" />
                                )}
                            </BodyLong>
                        </InfoboksGenerell>
                        <VStack gap="2">
                            <GreenPanel>
                                <RadioGroup
                                    label={
                                        isAlene(hvemPlanlegger) ? (
                                            <FormattedMessage id="periode.hvorLangPeriodeDeg" />
                                        ) : (
                                            <FormattedMessage id="periode.hvorLangPeriode" />
                                        )
                                    }
                                    name="dekningsgrad"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.periode.hvorLangPeriode.duMåOppgi',
                                            }),
                                        ),
                                    ]}
                                >
                                    <Radio value={Dekningsgrad.HUNDRE_PROSENT}>
                                        <FormattedMessage id="periode.100" />
                                    </Radio>
                                    <Radio value={Dekningsgrad.ÅTTI_PROSENT}>
                                        <FormattedMessage id="periode.80" />
                                    </Radio>
                                </RadioGroup>
                            </GreenPanel>
                        </VStack>
                        {!isAlene(hvemPlanlegger) && dekningsgrad && (
                            <VStack gap="10">
                                <Infoboks
                                    header={
                                        <FormattedMessage
                                            id="periode.infoboks.sisteDagTittel"
                                            values={{
                                                dato: dayjs(sluttdatoForeldrepenger).format('dddd DD. MMMM YYYY'),
                                            }}
                                        />
                                    }
                                >
                                    <BodyLong>
                                        <FormattedMessage id="periode.infoboks.sisteDagTekst" />
                                    </BodyLong>
                                </Infoboks>
                                <VStack gap="10">
                                    <InfoboksGenerell
                                        header={<FormattedMessage id="periode.infoboks.hvordanFordeleTittel" />}
                                        icon={
                                            <SectorChartIcon
                                                height={28}
                                                width={28}
                                                color="#020C1CAD"
                                                fontSize="1.5rem"
                                            />
                                        }
                                    >
                                        <BodyLong>
                                            <FormattedMessage id="periode.infoboks.hvordanFordeleTekst" />
                                        </BodyLong>
                                    </InfoboksGenerell>
                                </VStack>

                                <VStack gap="10">
                                    <GreenPanel>
                                        <Select
                                            label={<FormattedMessage id="periode.fordelingTittel" />}
                                            name="fellesperiodefordeling"
                                            onChange={(e) => {
                                                setCurrentOption(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                        >
                                            {fellesperiodeSelectOptions}
                                        </Select>
                                    </GreenPanel>

                                    {currentOption !== undefined && currentOption > '0' && (
                                        <Infoboks header={<FormattedMessage id="periode.infoboksTittel" />}>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="periode.infoboksTekst.førsteDag"
                                                    values={{
                                                        hvem: fornavnFørste,
                                                        dag: dayjs(startdatoSøker1).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong spacing>
                                                <FormattedMessage
                                                    id="periode.infoboksTekst.sisteDag"
                                                    values={{
                                                        hvem: fornavnFørste,
                                                        dag: sluttdatoSøker1.format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>

                                            <BodyLong>
                                                <FormattedMessage
                                                    id="periode.infoboksTekst.førsteDag"
                                                    values={{
                                                        hvem: fornavnAndre,
                                                        dag: dayjs(startdatoSøker2).add(1, 'day').format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong spacing>
                                                <FormattedMessage
                                                    id="periode.infoboksTekst.sisteDag"
                                                    values={{
                                                        hvem: fornavnAndre,
                                                        dag: dayjs(sluttdatoSøker2).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong size="small">
                                                <FormattedMessage id="periode.infoboksTekst.hvis" />
                                            </BodyLong>
                                        </Infoboks>
                                    )}
                                </VStack>
                            </VStack>
                        )}
                    </VStack>

                    <VStack gap="10">
                        <HvorforSpørNAVOmDette text="TODO" />
                        <VStack gap="10">
                            <StepButtonsHookForm<Periode>
                                saveDataOnPreviousClick={lagrePeriode}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                useSimplifiedTexts
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerPage>
    );
};

export default PeriodeSteg;
