import { CalendarIcon, ChatElipsisIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infoboks from 'components/Infoboks';
import IconCircle from 'components/ikoner/IconCircle';
import OversiktKalender from 'components/kalender/OversiktKalender';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { Fellesperiodefordeling } from 'types/Fordeling';
import { getNavnPåAnnenPart, getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import {
    getAntallUkerFellesperiode,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';

import { Alert, BodyLong, Box, ExpansionCard, HStack, Heading, Link, Loader, VStack } from '@navikt/ds-react';

import { Dekningsgrad } from '@navikt/fp-common';
import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

const getFellesperiodefordelingOptionValues = (antallUkerFellesperiode: number): Fellesperiodefordeling[] => {
    const values = [{ id: 0, antallUkerSøker1: undefined, antallUkerSøker2: undefined }] as Fellesperiodefordeling[];
    console.log(antallUkerFellesperiode);

    for (let i = 0; i <= antallUkerFellesperiode; i++) {
        const value = { id: i + 1, antallUkerSøker2: antallUkerFellesperiode - i, antallUkerSøker1: i };
        values.push(value);
    }
    return values;
};

interface Props {
    stønadskontoer80?: TilgjengeligeStønadskontoerDTO;
    stønadskontoer100?: TilgjengeligeStønadskontoerDTO;
}

const Oppsummering: FunctionComponent<Props> = ({ stønadskontoer80, stønadskontoer100 }) => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const { dekningsgrad } = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const erAleneforsørger = isAlene(hvemPlanlegger);
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const harRett = () => {
        if (
            arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER &&
            arbeidssituasjon.arbeidssituasjonAnnenPart === true
        ) {
            return true;
        }
        return false;
    };
    const ingenHarRett = !harRett();

    if (!stønadskontoer80 || !stønadskontoer100) {
        return <Loader />;
    }

    const selectedKonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskontoer100 : stønadskontoer80,
    );

    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);

    const list = getFellesperiodefordelingOptionValues(antallUkerFellesperiode);
    console.log('test', fordeling ? list[fordeling.fellesperiodefordeling].antallUkerSøker1 : '');

    //TODO: dra ut expansioncards til egne komponenter
    //TODO: bruk input data til å vise riktig i kalenderen
    return (
        <PlanleggerPage steps={stepConfig}>
            <VStack gap="10">
                {ingenHarRett && (
                    <Infoboks
                        header={
                            erAleneforsørger ? (
                                <FormattedMessage id="oppsummering.infoboks.ingenHarRettDeg" />
                            ) : (
                                <FormattedMessage id="oppsummering.infoboks.ingenHarRett" />
                            )
                        }
                        icon={<TasklistStartIcon height="24" width="24" color="#236B7D" />}
                    >
                        <BodyLong>
                            {erAleneforsørger ? (
                                <FormattedMessage id="oppsummering.infoboks.basertPåSvareneDeg" />
                            ) : (
                                <FormattedMessage id="oppsummering.infoboks.basertPåSvarene" />
                            )}
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage
                                id="oppsummering.infoboks.engangsstønad"
                                values={{ a: (msg: any) => <Link>{msg}</Link> }}
                            />
                        </BodyLong>
                    </Infoboks>
                )}
                <Alert variant="info">
                    {erAleneforsørger ? (
                        <FormattedMessage id="oppsummering.informasjonPlanleggerErUnderUtviklingDeg" />
                    ) : (
                        <FormattedMessage
                            id="oppsummering.informasjonPlanleggerErUnderUtvikling"
                            values={{ a: (msg: any) => <Link>{msg}</Link> }}
                        />
                    )}
                </Alert>

                <ExpansionCard aria-label="">
                    <ExpansionCard.Header>
                        <HStack gap="5" align="center">
                            <IconCircle size="large" color="green">
                                <CalendarIcon height={22} width={22} fontSize="1.5rem" />
                            </IconCircle>
                            <ExpansionCard.Title size="medium">
                                {isAlene(hvemPlanlegger) ? (
                                    <FormattedMessage id="oppsummering.planenDin" />
                                ) : (
                                    <FormattedMessage id="oppsummering.planenDeres" />
                                )}
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <OversiktKalender
                            valgtStønadskonto={selectedKonto}
                            omBarnet={barnet}
                            fellesperiodefordeling={fordeling?.fellesperiodefordeling}
                        />
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard aria-label="">
                    <ExpansionCard.Header>
                        <HStack gap="5" align="center">
                            <IconCircle size="large" color="green">
                                <ChatElipsisIcon height={22} width={22} fontSize="1.5rem" />
                            </IconCircle>
                            <ExpansionCard.Title size="medium">
                                {isAlene(hvemPlanlegger) ? (
                                    <FormattedMessage id="oppsummering.oppgittInformasjonDeg" />
                                ) : (
                                    <FormattedMessage id="oppsummering.oppgittInformasjon" />
                                )}
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <InnholdOppgittInfo />
                    </ExpansionCard.Content>
                </ExpansionCard>

                <VStack gap="10">
                    <VStack gap="10">
                        <StepButtons
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonOnClick={() => undefined}
                            useSimplifiedTexts
                        ></StepButtons>
                    </VStack>
                </VStack>
            </VStack>
        </PlanleggerPage>
    );
};

const InnholdOppgittInfo = () => {
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    const antallBarn = barnet.antallBarn;

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const erAleneforsørger = isAlene(hvemPlanlegger);
    const navn1 = getNavnPåSøker(hvemPlanlegger);
    const navn2 = getNavnPåAnnenPart(hvemPlanlegger);

    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE)?.dekningsgrad);
    // const fordeling = notEmpty(useContextGetData(ContextDataType.FORDELING));
    // const antallUkerFellesperiodeSøker1 = fordeling.antallUkerSøker1;
    // const antallUkerFellesperiodeSøker2 = fordeling.antallUkerSøker2;
    //TODO: hent ut riktige tall

    return (
        <VStack gap="5">
            <Box padding="4" borderWidth="2" borderColor="border-default" borderRadius="large">
                <Heading size="small">
                    {erAleneforsørger ? (
                        <FormattedMessage id="oppsummering.forelder" values={{ navn: navn1 }} />
                    ) : (
                        <FormattedMessage id="oppsummering.foreldre" values={{ navn1: navn1, navn2: navn2 }} />
                    )}
                </Heading>
            </Box>
            <Box padding="4" borderWidth="2" borderColor="border-default" borderRadius="large">
                <Heading size="small">
                    <FormattedMessage id="barnet.tittel" />
                </Heading>
                {erAdoptert && (
                    <BodyLong>
                        <FormattedMessage id="barnet.adopsjon" />
                    </BodyLong>
                )}
                <BodyLong>
                    <FormattedMessage id="oppsummering.antallBarn" values={{ antall: antallBarn }} />
                </BodyLong>
                {erFødt && (
                    <BodyLong>
                        <FormattedMessage
                            id="oppsummering.fødselsdato"
                            values={{ dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT) }}
                        />
                    </BodyLong>
                )}
                {(erIkkeFødt || (erFødt && !erAdoptert)) && (
                    <BodyLong>
                        <FormattedMessage
                            id="oppsummering.termindato"
                            values={{ dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT) }}
                        />
                    </BodyLong>
                )}
                {erAdoptert && (
                    <BodyLong>
                        <FormattedMessage
                            id="oppsummering.overtakelsesdato"
                            values={{ dato: dayjs(barnet.overtakelsesdato).format(DDMMYYYY_DATE_FORMAT) }}
                        />
                    </BodyLong>
                )}
            </Box>
            <Box padding="4" borderWidth="2" borderColor="border-default" borderRadius="large">
                <VStack gap="5">
                    <div>
                        <Heading size="small">
                            <FormattedMessage id="periode" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="oppsummering.dekningsgrad" values={{ grad: dekningsgrad }} />
                        </BodyLong>
                    </div>
                    {!erAleneforsørger && (
                        <div>
                            <Heading size="small">
                                <FormattedMessage id="oppsummering.fordeling" />
                            </Heading>
                            <BodyLong>
                                <FormattedMessage
                                    id="fordeling.fordelingOptions"
                                    values={{
                                        // uker: antallUkerFellesperiodeSøker1,
                                        // uker2: antallUkerFellesperiodeSøker2,
                                        uker: 1,
                                        uker2: 2,
                                        hvem: navn1,
                                        hvem2: navn2,
                                    }}
                                />
                            </BodyLong>
                        </div>
                    )}
                </VStack>
            </Box>
        </VStack>
    );
};

export default Oppsummering;
