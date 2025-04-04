import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Alert, HStack, Loader, VStack } from '@navikt/ds-react';

import { ScrollToTop } from './../../scroll-to-top/ScrollToTop';

interface Props {
    fetchCounter: number;
    allowedToFetch: boolean;
    saksnummer: string;
}

export const MinidialogVenterPåSvar = ({ fetchCounter, allowedToFetch, saksnummer }: Props) => {
    if (fetchCounter < 30 && allowedToFetch) {
        return (
            <>
                <ScrollToTop />
                <Alert variant="info">
                    <HStack gap="4" justify="center">
                        <Loader />
                        Svaret ditt registreres i våre systemer.
                    </HStack>
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
