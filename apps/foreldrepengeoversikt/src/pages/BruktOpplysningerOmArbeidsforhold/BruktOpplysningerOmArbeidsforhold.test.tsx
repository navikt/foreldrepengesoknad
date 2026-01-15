import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './BruktOpplysningerOmArbeidsforhold.stories';

const { Default } = composeStories(stories);

describe('<BruktOpplysningerOmArbeidsforhold>', () => {
    it('Skal vise side som informerer om at Nav har brukt opplysninger om arbeidsforholdet', async () => {
        render(<Default />);

        expect(await screen.findByText('Nav har hentet opplysninger om arbeidsforholdet ditt')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Den andre forelderen har søkt om foreldrepenger. For at den andre forelderen skal kunne få ' +
                    'foreldrepenger i enkelte perioder, forutsetter regelverket at du er i aktivitet, ' +
                    'for eksempel i arbeid. I søknaden har den andre forelderen oppgitt at du er i arbeid i en eller flere av disse periodene.',
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                /Nav har derfor hentet informasjon om arbeidsforholdene dine fra Arbeidsgiver- og arbeidstakerregisteret \(Aa-registeret\)\./i,
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /Vi bruker opplysningene når vi behandler søknaden. Vi kan også bruke opplysningene for andre perioder i nye søknader\./i,
            ),
        ).toBeInTheDocument();
        expect(screen.getByText(/Du kan selv sjekke hva som er registrert på deg i/i)).toBeInTheDocument();
        expect(screen.getByText('Aa-registeret (åpner i en ny fane)')).toBeInTheDocument();
        expect(screen.getByText('Aa-registeret (åpner i en ny fane)')).toHaveAttribute(
            'href',
            'https://www.nav.no/person/personopplysninger/nb/#arbeidsforhold',
        );

        expect(screen.getByText(/Dette har vi gjort med hjemmel i folketrygdloven § 21-4\./)).toBeInTheDocument();
        expect(screen.getByText('om behandling av personvernopplysninger (åpner i en ny fane)')).toBeInTheDocument();
        expect(screen.getByText('om behandling av personvernopplysninger (åpner i en ny fane)')).toHaveAttribute(
            'href',
            'https://www.nav.no/personvernerklaering#om',
        );

        expect(screen.getByText(/Regelverket for aktivitetskrav står i folketrygdloven § 14-13\./)).toBeInTheDocument();
        expect(screen.getByText('nav.no/foreldrepenger (åpner i en ny fane)')).toBeInTheDocument();
        expect(screen.getByText('nav.no/foreldrepenger (åpner i en ny fane)')).toHaveAttribute(
            'href',
            'https://www.nav.no/foreldrepenger#hvor-lenge',
        );
    });
});
