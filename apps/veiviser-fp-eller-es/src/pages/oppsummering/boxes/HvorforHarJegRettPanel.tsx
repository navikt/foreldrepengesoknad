import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';
import { isValidNumber } from '@navikt/fp-validation';

import { FpEllerEsSituasjon } from '../../situasjon/SituasjonSide';
import { KravinfoBoks } from '../KravinfoBoks';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    grunnbeløpet: number;
}

export const HvorforHarJegRettPanel = ({ fpEllerEsSituasjon, grunnbeløpet }: Props) => {
    const { borDuINorge, jobberDuINorge, lønnPerMåned } = fpEllerEsSituasjon;

    const minstelønn = grunnbeløpet / 2;
    const årslønn = isValidNumber(lønnPerMåned) ? Number(lønnPerMåned) * 12 : 0;

    return (
        <ExpansionCard aria-label="" size="small">
            <ExpansionCard.Header>
                <HStack gap="6" align="center" wrap={false}>
                    <IconCircleWrapper size="medium" color="lightBlue">
                        <QuestionmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                    </IconCircleWrapper>
                    <ExpansionCard.Title size="small" as="h2">
                        {fpEllerEsSituasjon.situasjon === 'mor' ? (
                            <FormattedMessage id="HvorforHarJegRettPanel.HvorforHarJegRett" />
                        ) : (
                            <FormattedMessage id="HvorforHarJegRettPanel.HvorforKanJegHaRett" />
                        )}
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    <BodyShort>
                        <FormattedMessage id="HvorforHarJegRettPanel.OppfylleKrav" values={{ erFlereKrav: true }} />
                    </BodyShort>
                    <VStack gap="4">
                        <KravinfoBoks
                            testId="harRettFp"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåHaInntekt" />}
                            headerLevel="3"
                            boxBodyText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.DuHarOppgittInntekt"
                                    values={{ harHatt: fpEllerEsSituasjon.harHattInntekt }}
                                />
                            }
                            erOppfylt={!!fpEllerEsSituasjon.harHattInntekt}
                        />
                        <KravinfoBoks
                            testId="harRettFp"
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
                            testId="harRettFp"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåVæreMedlem" />}
                            headerLevel="3"
                            boxBodyText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.OppgittAtDuBorINorge"
                                    values={{ borINorge: borDuINorge }}
                                />
                            }
                            erOppfylt={borDuINorge || jobberDuINorge}
                        />
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
