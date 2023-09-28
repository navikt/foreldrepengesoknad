import { Alert, Loader } from '@navikt/ds-react';
import { Block, intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

interface Props {
    fetchCounter: number;
    allowedToFetch: boolean;
    saksnummer: string;
}

const MinidialogVenterPåSvar: FunctionComponent<Props> = ({ fetchCounter, allowedToFetch, saksnummer }) => {
    const intl = useIntl();

    if (fetchCounter < 30 && allowedToFetch) {
        return (
            <Block padBottom="l">
                <Alert variant="info">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <Loader />
                        Svaret ditt registreres i våre systemer.
                    </div>
                </Alert>
            </Block>
        );
    }

    if (fetchCounter < 30 && !allowedToFetch) {
        return (
            <>
                <Block padBottom="l">
                    <Alert variant="success">Svaret ditt er registrert</Alert>
                </Block>
                <Block padBottom="l">
                    <Link to={`/sak/${saksnummer}`}>{intlUtils(intl, 'miniDialog.kvittering.gåTilbakeTilSaken')}</Link>
                </Block>
            </>
        );
    }

    return (
<<<<<<< HEAD
        <Block padBottom="l">
            <Alert variant="info">
                Vi har fått svaret ditt, men det tar litt lenger tid enn vanlig å oppdatere saken. Du trenger ikke å
                sende igjen.
            </Alert>
        </Block>
=======
        <>
            <Block padBottom="l">
                <Alert variant="info">
                    Vi har fått ditt svar, men det tar litt lenger tid enn vanlig å oppdatere saken. Du trenger ikke å
                    sende igjen.
                </Alert>
            </Block>
            <Block padBottom="l">
                <Link to={`/sak/${saksnummer}`}>{intlUtils(intl, 'miniDialog.kvittering.gåTilbakeTilSaken')}</Link>
            </Block>
        </>
>>>>>>> b7aa31feb (Fjernet link til saken)
    );
};

export default MinidialogVenterPåSvar;
