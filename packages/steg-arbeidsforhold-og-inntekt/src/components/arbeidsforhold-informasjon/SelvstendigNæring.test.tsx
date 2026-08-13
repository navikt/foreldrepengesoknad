import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

import nbMessages from '../../intl/messages/nb_NO.json';
import { SelvstendigNæring } from './SelvstendigNæring';

const næringer = [
    {
        organisasjonsnummer: '998877665',
        navn: 'Kari Konsulent',
        næringstype: 'ANNEN',
        underAvvikling: false,
    },
    {
        organisasjonsnummer: '998877666',
        navn: 'Ola Fisk',
        næringstype: 'FISKE',
        underAvvikling: true,
    },
    {
        organisasjonsnummer: '998877667',
        navn: 'Tredje Næring',
        næringstype: 'ANNEN',
        underAvvikling: false,
    },
] satisfies SelvstendigNæringDto_fpoversikt[];

const renderNæringer = (selvstendigNæring: SelvstendigNæringDto_fpoversikt[]) =>
    render(
        <IntlProvider locale="nb" messages={nbMessages}>
            <SelvstendigNæring selvstendigNæring={selvstendigNæring} />
        </IntlProvider>,
    );

describe('<SelvstendigNæring>', () => {
    it('skal ikke vise noe når det ikke finnes næringer', () => {
        const { container } = renderNæringer([]);

        expect(container).toBeEmptyDOMElement();
    });

    it('skal beholde eksisterende visning når det finnes én næring', () => {
        renderNæringer([næringer[0]!]);

        expect(screen.getByRole('heading', { name: 'Kari Konsulent' })).toBeInTheDocument();
        expect(screen.getByText('998877665')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Dine næringer' })).not.toBeInTheDocument();
    });

    it('skal samle flere næringer i én readmore', async () => {
        renderNæringer(næringer);

        expect(screen.getByRole('heading', { name: 'Mine næringer' })).toBeInTheDocument();
        expect(screen.getAllByText('Selvstendig næringsdrivende')).toHaveLength(1);
        expect(
            screen.getAllByText('Vi mangler opplysninger om næringen. Dette kan du legge til i neste steg.'),
        ).toHaveLength(1);

        await userEvent.click(screen.getByRole('button', { name: 'Dine næringer' }));

        expect(screen.getByText('Kari Konsulent')).toBeInTheDocument();
        expect(screen.getByText('Org.nummer: 998877665')).toBeInTheDocument();
        expect(screen.getByText('Ola Fisk')).toBeInTheDocument();
        expect(screen.getByText('Org.nummer: 998877666')).toBeInTheDocument();
        expect(screen.getByText('Tredje Næring')).toBeInTheDocument();
        expect(screen.getByText('Org.nummer: 998877667')).toBeInTheDocument();
    });
});
