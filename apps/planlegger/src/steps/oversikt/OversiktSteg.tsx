import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import BlåSirkel from 'components/ikoner/BlåSirkel';
import Hjerte from 'components/ikoner/Hjerte';
import GrønnSirkel from 'components/ikoner/RosaSirkel';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { finnHvemPlanlegger } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import {
    getFellesperiodefordelingOptionValues,
    getFellesperiodefordelingSelectOptions,
} from 'steps/periode/PeriodeSteg';
import { OmBarnet, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';
import { Periode } from 'types/Periode';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';

import { BodyShort, HStack, Heading, Spacer, ToggleGroup, VStack } from '@navikt/ds-react';

import { Dekningsgrad, getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/fp-common';
import { capitalizeFirstLetter } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Form, Select } from '@navikt/fp-form-hooks';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import Kalender from './kalender/Kalender';

dayjs.locale('nb');

const termindatoEllerFødselsdato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    if (erFødt || erAdoptert) {
        const dato = barnet.fødselsdato;
        return dayjs(dato).format('DD. MMM');
    }
    if (erIkkeFødt) {
        const dato = barnet.termindato;
        return dayjs(dato).format('DD. MMM');
    }
    return undefined;
};

const OversiktSteg = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const formMethods = useForm<Periode>();
    const fellesperiodefordeling = formMethods.watch('fellesperiodefordeling');

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    const lagrePeriode = useContextSaveData(ContextDataType.PERIODE);
    const periode = notEmpty(useContextGetData(ContextDataType.PERIODE));

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
    const konto100tvillinger = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 165,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };
    const konto80tvillinger = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 200,
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
    const mappedKonto100tvillinger = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100tvillinger);
    const mappedKonto80tvillinger = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80tvillinger);
    const [dekningsgrad, setDekningsgrad] = useState<Dekningsgrad>(Dekningsgrad.HUNDRE_PROSENT);
    const toBarn = barnet.hvorMange === 'to';
    const ettBarn = barnet.hvorMange === 'ett';

    const finnSelectedKonto = () => {
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT && ettBarn) {
            return mappedKonto100;
        }
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && ettBarn) {
            return mappedKonto80;
        }
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT && toBarn) {
            return mappedKonto100tvillinger;
        }
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && toBarn) {
            return mappedKonto80tvillinger;
        }
        return mappedKonto100;
    };

    const selectedKonto = finnSelectedKonto();

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
    console.log('antallUkerFellesperiodeSøker2: ', antallUkerFellesperiodeSøker2);
    console.log('fellesperiodefordeling: ', fellesperiodefordeling);

    const sluttdatoSøker1 =
        antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1.antallUkerSøker1
            ? dayjs(startdatoSøker1)
                  .add(antallUkerMødrekvote, 'weeks')
                  .add(antallUkerFellesperiodeSøker1.antallUkerSøker1, 'weeks')
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');
    console.log('sluttdato: ', sluttdatoSøker1);

    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1) : undefined;
    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
            ? dayjs(startdatoSøker2)
                  .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
            : dayjs(startdatoSøker2).add(antallUkerFedrekvote, 'weeks');

    const fellesperiodeSelectOptions = getFellesperiodefordelingSelectOptions(
        fellesperiodeOptionValues,
        hvemPlanlegger,
    );
    const antallUkerSøker1 = dayjs(sluttdatoSøker1).diff(dayjs(startdatoSøker1), 'weeks');
    const antallUkerSøker2 = dayjs(sluttdatoSøker2).diff(dayjs(startdatoSøker2), 'weeks');

    console.log('antallUkerSøker1: ', antallUkerSøker1);
    console.log('antallUkerSøker2: ', antallUkerSøker2);

    const hvem = finnHvemPlanlegger(hvemPlanlegger);
    const hvem1 = capitalizeFirstLetter(hvem[0]);

    const [currentOption, setCurrentOption] = useState('');
    console.log('currentOption: ', currentOption);

    return (
        <Form formMethods={formMethods}>
            <PlanleggerPage steps={stepConfig}>
                <VStack gap="10">
                    <VStack gap="5">
                        <Heading size="large" spacing>
                            {isAlene(hvemPlanlegger) && <FormattedMessage id="oversikt.tittelDeg" />}
                            {!isAlene(hvemPlanlegger) && <FormattedMessage id="oversikt.tittel" />}
                        </Heading>

                        <ToggleGroup
                            defaultValue={Dekningsgrad.HUNDRE_PROSENT}
                            size="medium"
                            variant="neutral"
                            onChange={(value) => setDekningsgrad(value as Dekningsgrad)}
                        >
                            <ToggleGroup.Item value={Dekningsgrad.HUNDRE_PROSENT}>
                                <FormattedMessage id="oversikt.100" />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value={Dekningsgrad.ÅTTI_PROSENT}>
                                <FormattedMessage id="oversikt.80" />
                            </ToggleGroup.Item>
                        </ToggleGroup>

                        {!isAlene(hvemPlanlegger) && (
                            <Select
                                label=""
                                name="fellesperiodefordeling"
                                onChange={(e) => {
                                    setCurrentOption(e.target.value);
                                    console.log(e.target.value);
                                    lagrePeriode({ ...periode, fellesperiodefordeling: e.target.value });
                                }}
                                selectedValue={periode.fellesperiodefordeling}
                            >
                                {fellesperiodeSelectOptions}
                            </Select>
                        )}
                        <VStack gap="2">
                            <HStack gap="1">
                                <div className="bluePanel">
                                    <HStack gap="2" align="center">
                                        <BlåSirkel />
                                        <BodyShort>
                                            <FormattedMessage
                                                id="ukerForeldrepenger"
                                                values={{
                                                    hvem: hvem1,
                                                    uker: antallUkerSøker1,
                                                    dato: dayjs(startdatoSøker1).add(1, 'day').format('dddd D MMM'),
                                                }}
                                            />
                                        </BodyShort>
                                    </HStack>
                                </div>
                                <Spacer />
                                {!isAlene(hvemPlanlegger) && (
                                    <HStack gap="3" wrap={false}>
                                        <div className="greenPanel">
                                            <HStack gap="2" align="center">
                                                <GrønnSirkel />
                                                <BodyShort>
                                                    <FormattedMessage
                                                        id="ukerForeldrepenger"
                                                        values={{
                                                            hvem: capitalizeFirstLetter(hvem[1]),
                                                            uker: antallUkerSøker2,
                                                            dato: dayjs(startdatoSøker2)
                                                                .add(1, 'day')
                                                                .format('dddd D MMM'),
                                                        }}
                                                    />
                                                </BodyShort>
                                            </HStack>
                                        </div>
                                    </HStack>
                                )}
                            </HStack>
                            <div className="pinkPanel">
                                <HStack gap="2" align="center">
                                    <Hjerte />
                                    <BodyShort>
                                        {(erFødt || erAdoptert) && (
                                            <FormattedMessage
                                                id="fødselsdatoIkontekst"
                                                values={{
                                                    mnd: barnehagestartDato(barnet),
                                                    dato: termindatoEllerFødselsdato(barnet),
                                                }}
                                            />
                                        )}
                                        {erIkkeFødt && (
                                            <FormattedMessage
                                                id="termindatoIkontekst"
                                                values={{
                                                    mnd: barnehagestartDato(barnet),
                                                    dato: termindatoEllerFødselsdato(barnet),
                                                }}
                                            />
                                        )}
                                    </BodyShort>
                                </HStack>
                            </div>
                        </VStack>
                    </VStack>

                    <VStack gap="10">
                        <VStack gap="2">
                            <Kalender />
                        </VStack>
                    </VStack>

                    <VStack gap="10">
                        <StepButtons
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonOnClick={navigator.goToNextDefaultStep}
                            useSimplifiedTexts
                        />
                    </VStack>
                </VStack>
            </PlanleggerPage>
        </Form>
    );
};

export default OversiktSteg;
