import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Alert, Loader } from '@navikt/ds-react';

import { Block } from '@navikt/fp-common';

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
                <Block padBottom="l">
                    <Alert variant="info">
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Loader />
                            Svaret ditt registreres i våre systemer.
                        </div>
                    </Alert>
                </Block>
            </>
        );
    }

    if (fetchCounter < 30 && !allowedToFetch) {
        return (
            <>
                <ScrollToTop />
                <Block padBottom="l">
                    <Alert variant="success">Svaret ditt er registrert</Alert>
                </Block>
                <Block padBottom="l">
                    <Link to={`/sak/${saksnummer}`}>
                        <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                    </Link>
                </Block>
            </>
        );
    }

    return (
        <>
            <ScrollToTop />
            <Block padBottom="l">
                <Alert variant="info">
                    Vi har fått svaret ditt, men det tar litt lenger tid enn vanlig å oppdatere saken. Du trenger ikke å
                    sende igjen.
                </Alert>
            </Block>
            <Block padBottom="l">
                <Link to={`/sak/${saksnummer}`}>
                    <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                </Link>
            </Block>
        </>
    );
};

export default MinidialogVenterPåSvar;
