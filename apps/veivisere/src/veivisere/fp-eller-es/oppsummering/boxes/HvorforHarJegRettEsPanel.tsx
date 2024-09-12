import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { FpEllerEsSituasjon } from 'veivisere/fp-eller-es/situasjon/SituasjonSide';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import KravinfoBoks from '../KravinfoBoks';
import KravFarEllerMedmor from './KravFarEllerMedmor';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
}

const HvorforHarJegRettEsPanel: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon }) => {
    const { borDuINorge, jobberDuINorge } = fpEllerEsSituasjon;

    return (
        <ExpansionCard aria-label="" size="small">
            <ExpansionCard.Header>
                <HStack gap="6" align="center" wrap={false}>
                    <IconCircleWrapper size="medium" color="lightBlue">
                        <QuestionmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                    </IconCircleWrapper>
                    <ExpansionCard.Title size="small">
                        {fpEllerEsSituasjon.situasjon === 'mor' ? (
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
                        <FormattedMessage id="HvorforHarJegRettPanel.OppfylleKravEs" values={{ erFlereKrav: false }} />
                    </BodyShort>
                    <VStack gap="4">
                        <KravinfoBoks
                            testId="harRettEs"
                            headerText={<FormattedMessage id="HvorforHarJegRettPanel.DuMåVæreMedlem" />}
                            boxBodyText={
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.OppgittAtDuBorINorge"
                                    values={{ borINorge: borDuINorge }}
                                />
                            }
                            erOppfylt={borDuINorge || jobberDuINorge}
                        />
                    </VStack>

                    {fpEllerEsSituasjon.situasjon !== 'mor' && <KravFarEllerMedmor />}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default HvorforHarJegRettEsPanel;
