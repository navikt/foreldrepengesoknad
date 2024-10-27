import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { Alert, BodyShort, Button, Heading, Link, VStack } from '@navikt/ds-react';

import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import ContentSection from '../content-section/ContentSection';

interface Props {
    harOppdatertSak: boolean;
}

const HarIkkeSaker: FunctionComponent<Props> = ({ harOppdatertSak }) => {
    useSetBackgroundColor('blue');

    return (
        <>
            {harOppdatertSak && (
                <Alert variant="info">
                    Vi finner ingen søknader fra deg. Hvis du har sendt en søknad i posten kan det ta to uker før
                    søknaden registreres i NAVs systemer.
                </Alert>
            )}
            <ContentSection>
                <Heading level="2" size="medium" spacing>
                    Kort om foreldrepenger
                </Heading>
                <VStack gap="4">
                    <BodyShort>
                        Foreldrepenger skal erstatte inntekten din når du skal være hjemme med barnet i forbindelse med
                        fødsel eller adopsjon.
                    </BodyShort>
                    <Link href="https://www.nav.no/foreldrepenger">
                        Les mer om foreldrepenger <ExternalLinkIcon aria-hidden={true} />
                    </Link>
                    <Button as="a" href="https://foreldrepengesoknad.nav.no" className="w-fit">
                        Søk om foreldrepenger
                    </Button>
                </VStack>
            </ContentSection>
        </>
    );
};

export default HarIkkeSaker;
