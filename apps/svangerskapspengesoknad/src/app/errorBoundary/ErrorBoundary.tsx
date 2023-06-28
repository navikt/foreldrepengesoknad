import * as Sentry from '@sentry/browser';
import links from 'app/links/links';
import Feilside from 'app/pages/feilside/Feilside';
import { Component } from 'react';

export const FOR_MANGE_VEDLEGG_ERROR =
    'Søknaden kan ikke inneholde flere enn 40 vedlegg. Vennligst gå tilbake, slett noen vedlegg og prøv å sende inn søknaden på nytt. Du kan ettersende vedlegg senere.';

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState({ ...this.state, hasError: true, error });

            Sentry.withScope((scope) => {
                scope.setExtras(errorInfo);
                Sentry.captureException(error);
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
                    dokumenttittel="NAV Svangerskapspengesøknad"
                    ingress={`${this.state.error?.message}`}
                    tittel={feilsideTittel}
                    illustrasjon={{
                        tittel: 'Hei!',
                        tekst: 'Noe har gått galt med søknaden.',
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
