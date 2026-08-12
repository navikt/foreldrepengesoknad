import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import nbMessages from '../../intl/messages/nb_NO.json';
import { SelvstendigNæring } from './SelvstendigNæring';

const næringer = [
    {
        arbeidsgiverId: '998877665',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Kari Konsulent',
        fom: '2024-01-01T00:00:00.000Z',
        stillingsprosent: 100,
    },
    {
        arbeidsgiverId: '998877666',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Ola Fisk',
        fom: '2023-02-01T00:00:00.000Z',
        tom: '2025-03-31T00:00:00.000Z',
        stillingsprosent: 100,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const renderNæringer = (selvstendigNæring: EksternArbeidsforholdDto_fpoversikt[]) =>
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
        expect(screen.getByText('01.01.2024 - Pågående')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Dine næringer' })).not.toBeInTheDocument();
    });

    it('skal samle flere næringer i én readmore', async () => {
        renderNæringer(næringer);

        expect(screen.getByRole('heading', { name: 'Mine næringer' })).toBeInTheDocument();
        expect(screen.getAllByText('Selvstendig næringsdrivende')).toHaveLength(1);
        expect(
            screen.getAllByText('Vi trenger flere opplysninger om næringen din. Dette kan du fylle ut i neste steg.'),
        ).toHaveLength(1);

        await userEvent.click(screen.getByRole('button', { name: 'Dine næringer' }));

        expect(screen.getByText('Kari Konsulent')).toBeInTheDocument();
        expect(screen.getByText('Org.nummer: 998877665')).toBeInTheDocument();
        expect(screen.getByText('01.01.2024 - Pågående')).toBeInTheDocument();
        expect(screen.getByText('Ola Fisk')).toBeInTheDocument();
        expect(screen.getByText('Org.nummer: 998877666')).toBeInTheDocument();
        expect(screen.getByText('01.02.2023 - 31.03.2025')).toBeInTheDocument();
    });
});
