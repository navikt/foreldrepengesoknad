import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { IconCircleWrapper } from '@navikt/fp-ui';

import { FpEllerEsSituasjon } from '../../situasjon/SituasjonSide';
import { KravinfoBoks } from '../KravinfoBoks';
import { KravFarEllerMedmor } from './KravFarEllerMedmor';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
}

export const HvorforHarJegIkkeRettEsPanel = ({ fpEllerEsSituasjon }: Props) => {
    const { borDuINorge, jobberDuINorge } = fpEllerEsSituasjon;

    return (
        <ExpansionCard aria-label="" size="small">
            <ExpansionCard.Header>
                <HStack gap="6" align="center" wrap={false}>
                    <IconCircleWrapper size="medium" color="lightBlue">
                        <QuestionmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                    </IconCircleWrapper>
                    <ExpansionCard.Title size="small" as="h2">
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
                        {fpEllerEsSituasjon.situasjon !== 'mor' && <KravFarEllerMedmor />}
                    </VStack>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
