import { Alert } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';

const BrukerKanIkkeSøke = () => {
    return (
        <Alert variant="warning">
            <div>
                <Block>
                    <FormattedMessage
                        id="inntektsinformasjon.alert.ingenArbeidsforhold.tittel"
                        values={{
                            b: (msg: any) => <b>{msg}</b>,
                        }}
                    />
                </Block>
                <FormattedMessage
                    id="inntektsinformasjon.alert.ingenArbeidsforhold"
                    values={{
                        a: (msg: any) => (
                            <a
                                className="lenke"
                                rel="noopener noreferrer"
                                href="https://familie.nav.no/om-svangerskapspenger"
                            >
                                {msg}
                            </a>
                        ),
                    }}
                />
                <FormattedMessage
                    id="inntektsinformasjon.alert.ingenArbeidsforhold.forsettelse"
                    values={{
                        a: (msg: any) => (
                            <a
                                className="lenke"
                                rel="noopener noreferrer"
                                href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/chat-med-oss-om-foreldrepenger"
                            >
                                {msg}
                            </a>
                        ),
                    }}
                />
            </div>
        </Alert>
    );
};

export default BrukerKanIkkeSøke;
