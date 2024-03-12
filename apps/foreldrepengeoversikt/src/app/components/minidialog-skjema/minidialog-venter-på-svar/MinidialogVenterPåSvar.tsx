import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Alert, Loader, VStack } from '@navikt/ds-react';

import ScrollToTop from 'app/components/scroll-to-top/ScrollToTop';

interface Props {
    fetchCounter: number;
    allowedToFetch: boolean;
    saksnummer: string;
}

const MinidialogVenterPåSvar: FunctionComponent<Props> = ({ fetchCounter, allowedToFetch, saksnummer }) => {
    if (fetchCounter < 30 && allowedToFetch) {
        return (
            <>
                <ScrollToTop />
                <Alert variant="info">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <Loader />
                        Svaret ditt registreres i våre systemer.
                    </div>
                </Alert>
            </>
        );
    }

    if (fetchCounter < 30 && !allowedToFetch) {
        return (
            <>
                <ScrollToTop />
                <VStack gap="2">
                    <Alert variant="success">Svaret ditt er registrert</Alert>
                    <Link to={`/sak/${saksnummer}`}>
                        <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                    </Link>
                </VStack>
            </>
        );
    }

    return (
        <>
            <ScrollToTop />
            <VStack gap="2">
                <Alert variant="info">
                    Vi har fått svaret ditt, men det tar litt lenger tid enn vanlig å oppdatere saken. Du trenger ikke å
                    sende igjen.
                </Alert>
                <Link to={`/sak/${saksnummer}`}>
                    <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                </Link>
            </VStack>
        </>
    );
};

export default MinidialogVenterPåSvar;
