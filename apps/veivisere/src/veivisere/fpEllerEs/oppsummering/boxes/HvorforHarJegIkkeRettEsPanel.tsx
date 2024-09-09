import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Heading, List, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';

import { FpEllerEsSituasjon } from '../../situasjon/SituasjonSide';
import KravinfoBoks from '../KravinfoBoks';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
}

const HvorforHarJegIkkeRettEsPanel: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon }) => {
    const { borDuINorge, jobberDuINorge } = fpEllerEsSituasjon;

    return (
        <ExpansionCard aria-label="" size="small">
            <ExpansionCard.Header>
                <HStack gap="6" align="center" wrap={false}>
                    <IconCircleWrapper size="medium" color="lightBlue">
                        <QuestionmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                    </IconCircleWrapper>
                    <ExpansionCard.Title size="small">
                        <FormattedMessage id="HvorforHarJegRettPanel.HvorforHarJegIkkeRettPåEs" />
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    <BodyShort>
                        <FormattedMessage id="HvorforHarJegRettPanel.OppfylleKravEs" values={{ erFlereKrav: false }} />
                    </BodyShort>
                    <VStack gap="4">
                        <KravinfoBoks
                            testId="harIkkeRettEs"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåVæreMedlem" />}
                            boxBodyText={
                                <>
                                    {borDuINorge === false && jobberDuINorge === false ? (
                                        <FormattedMessage
                                            id="HvorforHarJegRettPanel.IkkeMedlem"
                                            values={{
                                                a: (msg: any) => (
                                                    <a href={links.folketrygden} target="_blank" rel="noreferrer">
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                    ) : (
                                        <FormattedMessage
                                            id="HvorforHarJegRettPanel.OppgittAtDuBorINorge"
                                            values={{ borINorge: borDuINorge }}
                                        />
                                    )}
                                </>
                            }
                            erOppfylt={jobberDuINorge || borDuINorge}
                            jobberINorge={jobberDuINorge}
                        />
                        {fpEllerEsSituasjon.situasjon !== 'mor' && (
                            <>
                                <Heading size="small">
                                    <FormattedMessage id="HvorforHarJegRettPanel.FarEllerMedmor" />
                                </Heading>
                                <Infobox
                                    icon={
                                        <QuestionmarkIcon
                                            height={24}
                                            width={24}
                                            color="#020C1CAD"
                                            fontSize="1.5rem"
                                            aria-hidden
                                        />
                                    }
                                    color="gray"
                                >
                                    <VStack gap="2">
                                        <BodyShort>
                                            <FormattedMessage id="HvorforHarJegRettPanel.HvisDuErFarEllerMedmor" />
                                        </BodyShort>
                                        <List as="ul">
                                            <List.Item>
                                                <FormattedMessage id="HvorforHarJegRettPanel.AdoptererAlene" />
                                            </List.Item>
                                            <List.Item>
                                                <FormattedMessage
                                                    id="HvorforHarJegRettPanel.OvertarOmsorgMorDød"
                                                    values={{
                                                        a: (msg: any) => (
                                                            <a
                                                                href="https://lovdata.no/dokument/NL/lov/1981-04-08-7"
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                {msg}
                                                            </a>
                                                        ),
                                                    }}
                                                />
                                            </List.Item>
                                            <List.Item>
                                                <FormattedMessage id="HvorforHarJegRettPanel.OvertarOmsorgMorDødFødsel" />
                                            </List.Item>
                                            <List.Item>
                                                <FormattedMessage id="HvorforHarJegRettPanel.Innen56Uker" />
                                            </List.Item>
                                        </List>
                                        <BodyShort>
                                            <FormattedMessage id="HvorforHarJegRettPanel.DersomEtAvTilfellene" />
                                        </BodyShort>
                                    </VStack>
                                </Infobox>
                            </>
                        )}
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default HvorforHarJegIkkeRettEsPanel;
