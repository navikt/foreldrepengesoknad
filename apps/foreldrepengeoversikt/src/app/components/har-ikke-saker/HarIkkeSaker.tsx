import { FunctionComponent } from 'react';

import { ExternalLink } from '@navikt/ds-icons';
import { Alert, BodyShort, Button, Heading, Link } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';

import ContentSection from '../content-section/ContentSection';
import './har-ikke-saker.css';

interface Props {
    harOppdatertSak: boolean;
}

const HarIkkeSaker: FunctionComponent<Props> = ({ harOppdatertSak }) => {
    const bem = bemUtils('har-ikke-saker');
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
                <Heading level="2" size="large" className={bem.element('overskrift')}>
                    Kort om foreldrepenger
                </Heading>
                <BodyShort className={bem.element('om-foreldrepenger')}>
                    Foreldrepenger skal erstatte inntekten din når du skal være hjemme med barnet i forbindelse med
                    fødsel eller adopsjon.
                </BodyShort>
                <div className={bem.element('link')}>
                    <Link href="https://www.nav.no/foreldrepenger">
                        Les mer om foreldrepenger <ExternalLink aria-hidden={true} />
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
