import { FormattedMessage } from 'react-intl';
import { BodyLong, ExpansionCard, Link } from '@navikt/ds-react';
import Block from '@navikt/fp-common/src/common/components/block/Block';
import links from 'app/links/links';

const InfoScanneDokument = () => {
    return (
        <ExpansionCard size="small" aria-label="Hvordan ta bilde av vedlegg med mobilen?">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small" as="h2">
                    <FormattedMessage id="scanneDokument.tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="scanneDokument.del1" />
                    </BodyLong>
                </Block>
                <Block padBottom="l">
                    <ul>
                        <BodyLong>
                            <FormattedMessage tagName="li" id="scanneDokument.liste.punkt1" />{' '}
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage tagName="li" id="scanneDokument.liste.punkt2" />{' '}
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage tagName="li" id="scanneDokument.liste.punkt3" />{' '}
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage tagName="li" id="scanneDokument.liste.punkt4" />{' '}
                        </BodyLong>
                    </ul>
                </Block>
                <Block padBottom="l">
                    <BodyLong>
                        <FormattedMessage id="scanneDokument.del2" />
                    </BodyLong>
                </Block>
                <Block>
                    <BodyLong>
                        <Link href={links.scanneDokument} target="_blank">
                            <FormattedMessage id="scanneDokument.link" />
                        </Link>
                    </BodyLong>
                </Block>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default InfoScanneDokument;
