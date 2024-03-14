import * as Sentry from '@sentry/browser';
import { Component, ReactElement } from 'react';

import { links } from '@navikt/fp-constants';
import { Søker } from '@navikt/fp-types';

import { FOR_MANGE_VEDLEGG_ERROR } from 'app/api/apiUtils';
import Feilside from 'app/pages/feilside/Feilside';

interface Props {
    søker?: Søker;
    children: ReactElement;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
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
                    dokumenttittel="NAV Foreldrepengesøknad"
                    ingress={`${this.state.error?.message}`}
                    tittel={feilsideTittel}
                    søker={this.props.søker}
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
