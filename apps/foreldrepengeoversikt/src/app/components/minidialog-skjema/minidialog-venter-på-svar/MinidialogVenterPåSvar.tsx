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
                        Vi venter på svar fra backend
                    </div>
                </Alert>
            </Block>
        );
    }

    if (fetchCounter < 30 && !allowedToFetch) {
        return (
            <Block padBottom="l">
                <Alert variant="success">Suksess!</Alert>
            </Block>
        );
    }

    return (
        <Block padBottom="l">
            <Alert variant="info">Vi fikk ingen respons. Dette betyr ikke at noe gikk galt.</Alert>
        </Block>
    );
};

export default MinidialogVenterPåSvar;
