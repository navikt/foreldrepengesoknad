import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { IconCircleWrapper } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';
import { isValidNumber } from '@navikt/fp-validation';

import { FpEllerEsSituasjon } from '../../../pages/situasjon/SituasjonSide';
import { KravinfoBoks } from '../KravinfoBoks';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    grunnbeløpet: number;
}

export const HvorforHarJegIkkeRettPanel = ({ fpEllerEsSituasjon, grunnbeløpet }: Props) => {
    const { borDuINorge, jobberDuINorge, lønnPerMåned, harHattInntekt } = fpEllerEsSituasjon;

    const minstelønn = grunnbeløpet / 2;
    const årslønn = lønnPerMåned && isValidNumber(lønnPerMåned) ? Number(lønnPerMåned) * 12 : 0;

    return (
        <ExpansionCard aria-label="" size="small">
            <ExpansionCard.Header>
                <HStack gap="space-24" align="center" wrap={false}>
                    <IconCircleWrapper size="medium" color="lightBlue">
                        <QuestionmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                    </IconCircleWrapper>
                    <ExpansionCard.Title size="small" as="h2">
                        <FormattedMessage id="HvorforHarJegRettPanel.HvorforHarJegIkkeRett" />
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="space-20">
                    <BodyShort>
                        <FormattedMessage id="HvorforHarJegRettPanel.OppfylleKrav" values={{ erFlereKrav: true }} />
                    </BodyShort>
                    <VStack gap="space-16">
                        <KravinfoBoks
                            testId="harIkkeRettFp"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåHaInntekt" />}
                            headerLevel="3"
                            boxBodyText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.DuHarOppgittInntekt"
                                    values={{ harHatt: harHattInntekt }}
                                />
                            }
                            erOppfylt={!!harHattInntekt}
                        />
                        <KravinfoBoks
                            testId="harIkkeRettFp"
                            headerText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.DuMåTeneOver"
                                    values={{ minstelønn: formatCurrencyWithKr(minstelønn) }}
                                />
                            }
                            headerLevel="3"
                            boxBodyText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.DuHarOppgittMånedslønn"
                                    values={{
                                        månedslønn: formatCurrencyWithKr(lønnPerMåned),
                                        minstelønn: formatCurrencyWithKr(minstelønn),
                                        hvorMye: årslønn > minstelønn,
                                    }}
                                />
                            }
                            erOppfylt={årslønn > minstelønn}
                        />
                        <KravinfoBoks
                            testId="harIkkeRettFp"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåVæreMedlem" />}
                            headerLevel="3"
                            boxBodyText={
                                <>
                                    {borDuINorge === false && jobberDuINorge === false ? (
                                        <FormattedMessage
                                            id="HvorforHarJegRettPanel.IkkeMedlem"
                                            values={{
                                                a: (msg) => (
                                                    <Link href={links.folketrygden} target="_blank" rel="noreferrer">
                                                        {msg}
                                                    </Link>
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
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
