import { Alert, Loader } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { FunctionComponent } from 'react';

interface Props {
    fetchCounter: number;
    allowedToFetch: boolean;
}

const MinidialogVenterPåSvar: FunctionComponent<Props> = ({ fetchCounter, allowedToFetch }) => {
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
            <Block padBottom="l">
                <Alert variant="success">Svaret ditt er registrert.</Alert>
            </Block>
        );
    }

    return (
        <Block padBottom="l">
            <Alert variant="info">
                Vi har fått svaret ditt, men det tar litt lenger tid enn vanlig å oppdatere saken. Du trenger ikke å
                sende igjen.
            </Alert>
        </Block>
    );
};

export default MinidialogVenterPåSvar;
