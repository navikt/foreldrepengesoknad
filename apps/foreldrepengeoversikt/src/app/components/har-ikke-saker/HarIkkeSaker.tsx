import { ExternalLink } from '@navikt/ds-icons';
import { Alert, BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';

import ContentSection from '../content-section/ContentSection';

import './har-ikke-saker.css';
import { FunctionComponent } from 'react';

interface Props {
    oppdatertData: boolean;
}

const HarIkkeSaker: FunctionComponent<Props> = ({ oppdatertData }) => {
    const bem = bemUtils('har-ikke-saker');
    useSetBackgroundColor('blue');

    return (
        <>
            {oppdatertData && (
                <Alert variant="info" className={bem.element('ingen-søknad')}>
                    Vi finner ingen søknader fra deg om foreldrepenger. Hvis du har sendt en søknad i posten kan det ta
                    to uker før søknaden registreres i NAVs systemer.{' '}
                </Alert>
            )}
            <ContentSection>
                <Heading level="2" size="large" className={bem.element('overskrift')}>
                    Kort om foreldrepenger
                </Heading>
                <BodyShort className={bem.element('om-foreldrepenger')}>
                    Foreldrepenger skal erstatte inntekten din når du skal være hjemme med barnet i forbindelse med
                    fødsel eller adopsjon.
                </BodyShort>
                <div className={bem.element('link')}>
                    <Link href="https://www.nav.no/foreldrepenger">
                        Les mer om foreldrepenger <ExternalLink />
                    </Link>
                </div>
                <Button as="a" href="https://foreldrepengesoknad.nav.no">
                    Søk om foreldrepenger
                </Button>
            </ContentSection>
        </>
    );
};

export default HarIkkeSaker;
