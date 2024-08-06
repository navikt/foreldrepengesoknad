import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { FpEllerEsSituasjon } from 'veivisere/fpEllerEs/situasjon/SituasjonSide';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

import KravinfoBoks from '../KravinfoBoks';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    grunnbeløpet: number;
}

const HvorforHarJegRettEsPanel: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, grunnbeløpet }) => {
    const erMor = fpEllerEsSituasjon.situasjon === 'mor';
    const minstelønn = grunnbeløpet / 2;
    return (
        <ExpansionCard aria-label="" size="small">
            <ExpansionCard.Header>
                <HStack gap="6" align="center" wrap={false}>
                    <IconCircleWrapper size="medium" color="lightBlue">
                        <QuestionmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                    </IconCircleWrapper>
                    <ExpansionCard.Title size="small">
                        {erMor ? (
                            <FormattedMessage id="HvorforHarJegRettPanel.HvorforHarJegRettPåEs" />
                        ) : (
                            <FormattedMessage id="HvorforHarJegRettPanel.HvorforKanJegHaRettPåEs" />
                        )}
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    <BodyShort>
                        <FormattedMessage id="HvorforHarJegRettPanel.OppfylleKravEs" />
                    </BodyShort>
                    <VStack gap="4">
                        {fpEllerEsSituasjon.harHattInntekt && (
                            <KravinfoBoks
                                headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåHaInntekt" />}
                                boxBodyText={<FormattedMessage id="HvorforHarJegRettPanel.DuHarOppgittInntekt" />}
                                erOppfylt={!!fpEllerEsSituasjon.harHattInntekt}
                            />
                        )}
                        {fpEllerEsSituasjon.lønnPerMåned > minstelønn && (
                            <KravinfoBoks
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
                        )}
                        {fpEllerEsSituasjon.erDuMedlemAvFolketrygden && (
                            <KravinfoBoks
                                headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåVæreMedlem" />}
                                boxBodyText={<FormattedMessage id="HvorforHarJegRettPanel.OppgittAtDuBorINorge" />}
                                erOppfylt={fpEllerEsSituasjon.erDuMedlemAvFolketrygden}
                            />
                        )}
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default HvorforHarJegRettEsPanel;
