import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Heading, List, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

import { FpEllerEsSituasjon } from '../../situasjon/SituasjonSide';
import KravinfoBoks from '../KravinfoBoks';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    grunnbeløpet: number;
}

const HvorforHarJegIkkeRettEsPanel: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, grunnbeløpet }) => {
    const minstelønn = grunnbeløpet / 2;
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
                                    values={{ minstelønn: formatCurrencyWithKr(minstelønn) }}
                                />
                            }
                            boxBodyText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.DuHarOppgittMånedslønn"
                                    values={{
                                        månedslønn: formatCurrencyWithKr(fpEllerEsSituasjon.lønnPerMåned),
                                        minstelønn: formatCurrencyWithKr(minstelønn),
                                        hvorMye: fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn,
                                    }}
                                />
                            }
                            erOppfylt={fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn}
                        />
                        <KravinfoBoks
                            testId="harIkkeRettEs"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåVæreMedlem" />}
                            boxBodyText={
                                <>
                                    {fpEllerEsSituasjon.borDuINorge === false &&
                                    fpEllerEsSituasjon.jobberDuINorge === false ? (
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
                                            values={{ borINorge: fpEllerEsSituasjon.borDuINorge }}
                                        />
                                    )}
                                </>
                            }
                            erOppfylt={fpEllerEsSituasjon.jobberDuINorge || fpEllerEsSituasjon.borDuINorge}
                            jobberINorge={fpEllerEsSituasjon.jobberDuINorge}
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
