import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Heading, List, VStack } from '@navikt/ds-react';

import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

import { FpEllerEsSituasjon } from '../../situasjon/SituasjonSide';
import KravinfoBoks from '../KravinfoBoks';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    grunnbeløpet: number;
}

const HvorforHarJegIkkeRettEsPanel: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, grunnbeløpet }) => {
    const erMor = fpEllerEsSituasjon.situasjon === 'mor';
    const jobberIkkeINorge =
        fpEllerEsSituasjon.borDuINorge !== undefined && fpEllerEsSituasjon.jobberDuINorge === false;
    const folketrygdenlenke =
        'https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden';
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
                        <FormattedMessage id="HvorforHarJegRettPanel.OppfylleKravEs" />
                    </BodyShort>
                    <VStack gap="4">
                        <KravinfoBoks
                            testId="harIkkeRettEs"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåHaInntekt" />}
                            boxBodyText={<FormattedMessage id="HvorforHarJegRettPanel.DuHarOppgittInntekt" />}
                            erOppfylt={!!fpEllerEsSituasjon.harHattInntekt}
                        />

                        <KravinfoBoks
                            testId="harIkkeRettEs"
                            headerText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.DuMåTeneOver"
                                    values={{ minstelønn: formatCurrencyWithKr(grunnbeløpet / 2) }}
                                />
                            }
                            boxBodyText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.DuHarOppgittMånedslønn"
                                    values={{
                                        månedslønn: formatCurrencyWithKr(fpEllerEsSituasjon.lønnPerMåned),
                                        minstelønn: formatCurrencyWithKr(grunnbeløpet / 2),
                                    }}
                                />
                            }
                            erOppfylt={fpEllerEsSituasjon.lønnPerMåned * 12 > grunnbeløpet / 2}
                        />
                        <KravinfoBoks
                            testId="harIkkeRettEs"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåVæreMedlem" />}
                            boxBodyText={
                                <>
                                    {jobberIkkeINorge ? (
                                        <FormattedMessage
                                            id="HvorforHarJegRettPanel.IkkeMedlem"
                                            values={{
                                                a: (msg: any) => (
                                                    <a href={folketrygdenlenke} target="_blank" rel="noreferrer">
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                    ) : (
                                        <FormattedMessage id="HvorforHarJegRettPanel.OppgittAtDuBorINorge" />
                                    )}
                                </>
                            }
                            erOppfylt={fpEllerEsSituasjon.jobberDuINorge}
                            jobberIkkeINorge={
                                fpEllerEsSituasjon.jobberDuINorge === false && fpEllerEsSituasjon.borDuINorge === false
                            }
                        />
                        {!erMor && (
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
