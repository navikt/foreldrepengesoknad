import React from 'react';
import * as Sentry from '@sentry/browser';
import Feilside from 'app/pages/feilside/Feilside';
import links from 'app/links/links';
import { FOR_MANGE_VEDLEGG_ERROR } from 'app/api/apiUtils';

interface State {
    eventId: string | null;
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { eventId: null, hasError: false, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState({ ...this.state, hasError: true, error });

            Sentry.withScope((scope) => {
                scope.setExtras(errorInfo);
                const eventId = Sentry.captureException(error);
                this.setState({ eventId });
            });
        }
    }

    render() {
        if (this.state.hasError) {
            const feilPgaForMangeVedlegg =
                !!this.state.error &&
                !!this.state.error.message &&
                this.state.error.message === FOR_MANGE_VEDLEGG_ERROR;
            const feilsideTittel = feilPgaForMangeVedlegg ? 'Feil: for mange vedlegg' : 'Informasjon om feilen';
            return (
                <Feilside
                    dokumenttittel="NAV Foreldrepengesøknad"
                    ingress={`${this.state.error?.message}`}
                    tittel={feilsideTittel}
                    illustrasjon={{
                        tittel: 'Hei!',
                        tekst: 'Noe har gått galt med søknaden.',
                        veileder: {
                            ansikt: 'skeptisk',
                        },
                        lenke: { tekst: 'Her finner du en lenke til brukerstøtte', url: links.brukerstøtte },
                    }}
                    skalKunneGåTilbakeTilSøknad={feilPgaForMangeVedlegg}
                />
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
