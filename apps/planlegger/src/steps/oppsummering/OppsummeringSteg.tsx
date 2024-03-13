import { CalendarIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import Infoboks from 'components/Infoboks';
import OppsummeringHeader from 'components/OppsummeringHeader';
import OppgittInformasjon from 'components/expansionCard/OppgittInformasjon';
import IconCircle from 'components/ikoner/IconCircle';
import OversiktKalender from 'components/kalender/OversiktKalender';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { isAlene } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto } from 'utils/stønadskontoer';

import { Alert, BodyLong, ExpansionCard, HStack, Link, Loader, VStack } from '@navikt/ds-react';

import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

interface Props {
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
}

const Oppsummering: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const navigator = usePlanleggerNavigator();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const { dekningsgrad } = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const erAleneforsørger = isAlene(hvemPlanlegger);
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const harRettEllerIkke = () => {
        if (
            arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.INGEN ||
            (arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.UFØR &&
                arbeidssituasjon.arbeidssituasjonAnnenPart === false)
        ) {
            return false;
        }
        return true;
    };
    const harRett = harRettEllerIkke();

    if (!stønadskontoer) {
        return <Loader />;
    }

    const selectedKonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[dekningsgrad]);

    //TODO: dra ut expansioncards til egne komponenter
    //TODO: bruk input data til å vise riktig i kalenderen
    return (
        <OppsummeringHeader>
            <VStack gap="10">
                {!harRett && (
                    <VStack gap="5">
                        <Infoboks
                            header={
                                erAleneforsørger ? (
                                    <FormattedMessage id="oppsummering.infoboks.ingenHarRettDeg" />
                                ) : (
                                    <FormattedMessage id="oppsummering.infoboks.ingenHarRett" />
                                )
                            }
                            icon={<TasklistStartIcon height={28} width={28} color="#236B7D" />}
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
                    </VStack>
                )}

                <Alert variant="info">
                    {!harRett ? (
                        <FormattedMessage id="oppsummering.informasjonPlanleggerErUnderUtviklingIkkeRett" />
                    ) : (
                        <FormattedMessage
                            id="oppsummering.informasjonPlanleggerErUnderUtvikling"
                            values={{ a: (msg: any) => <Link>{msg}</Link> }}
                        />
                    )}
                </Alert>

                <VStack gap="5">
                    {harRett && (
                        <ExpansionCard aria-label="">
                            <ExpansionCard.Header>
                                <HStack gap="5" align="center">
                                    <IconCircle size="large" color="green">
                                        <CalendarIcon height={28} width={28} fontSize="1.5rem" />
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
                    )}
                    <OppgittInformasjon stønadskontoer={stønadskontoer} />
                </VStack>

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
        </OppsummeringHeader>
    );
};
export default Oppsummering;
