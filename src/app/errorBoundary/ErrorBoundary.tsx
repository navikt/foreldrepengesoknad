import React from 'react';
import * as Sentry from '@sentry/browser';
import Feilside from 'app/pages/feilside/Feilside';
import links from 'app/links/links';

interface State {
    eventId: string | null;
    hasError: boolean;
}

class ErrorBoundary extends React.Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { eventId: null, hasError: false };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        this.setState({ ...this.state, hasError: true });

        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <Feilside
                    dokumenttittel="NAV Engangsstønad"
                    ingress="Noe ingress her"
                    tittel="Superkul tekst"
                    illustrasjon={{
                        tittel: 'Test',
                        tekst: 'Noe annet',
                        veileder: {
                            ansikt: 'skeptisk',
                        },
                        lenke: { tekst: 'Lenke her', url: links.brukerstøtte },
                    }}
                />
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
