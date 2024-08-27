import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { FpEllerEsSituasjon } from 'veivisere/fpEllerEs/situasjon/SituasjonSide';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { IconCircleWrapper } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

import KravinfoBoks from '../KravinfoBoks';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    grunnbeløpet: number;
}

const HvorforHarJegIkkeRettPanel: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, grunnbeløpet }) => {
    const minstelønn = grunnbeløpet / 2;

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
                            boxBodyText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.DuHarOppgittInntekt"
                                    values={{ harHatt: fpEllerEsSituasjon.harHattInntekt }}
                                />
                            }
                            erOppfylt={!!fpEllerEsSituasjon.harHattInntekt}
                        />
                        <KravinfoBoks
                            testId="harIkkeRettFp"
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
                            testId="harIkkeRettFp"
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
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default HvorforHarJegIkkeRettPanel;
