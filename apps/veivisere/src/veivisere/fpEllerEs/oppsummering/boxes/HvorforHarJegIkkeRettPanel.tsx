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

const HvorforHarJegIkkeRettPanel: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, grunnbeløpet }) => {
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
                        <FormattedMessage id="HvorforHarJegRettPanel.HvorforHarJegIkkeRett" />
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    <BodyShort>
                        <FormattedMessage id="HvorforHarJegRettPanel.OppfylleKrav" />
                    </BodyShort>
                    <VStack gap="4">
                        <KravinfoBoks
                            testId="harIkkeRettFp"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåHaInntekt" />}
                            boxBodyText={<FormattedMessage id="HvorforHarJegRettPanel.DuHarOppgittInntekt" />}
                            erOppfylt={!!fpEllerEsSituasjon.harHattInntekt}
                        />
                        <KravinfoBoks
                            testId="harIkkeRettFp"
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
                            testId="harIkkeRettFp"
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
                            erOppfylt={fpEllerEsSituasjon.jobberDuINorge || fpEllerEsSituasjon.borDuINorge}
                            jobberIkkeINorge={
                                fpEllerEsSituasjon.jobberDuINorge === false && fpEllerEsSituasjon.borDuINorge === false
                            }
                        />
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default HvorforHarJegIkkeRettPanel;
