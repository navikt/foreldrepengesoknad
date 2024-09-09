import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Heading, List, VStack } from '@navikt/ds-react';

import { Infobox } from '@navikt/fp-ui';

const KravFarEllerMedmor: React.FunctionComponent = () => {
    return (
        <>
            <Heading size="small">
                <FormattedMessage id="HvorforHarJegRettPanel.FarEllerMedmor" />
            </Heading>
            <Infobox
                icon={<QuestionmarkIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
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
    );
};

export default KravFarEllerMedmor;
