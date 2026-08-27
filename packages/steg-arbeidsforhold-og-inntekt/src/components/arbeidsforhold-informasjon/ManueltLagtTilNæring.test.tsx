import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import type { NæringDto } from '@navikt/fp-types';

import nbMessages from '../../intl/messages/nb_NO.json';
import { ManueltLagtTilNæring } from './ManueltLagtTilNæring';

const egenNæring = {
    navnPåNæringen: 'Fiskebåten',
    næringstype: 'FISKE',
    fom: '2023-01-01',
    næringsinntekt: 1000,
    registrertINorge: true,
    organisasjonsnummer: '998877665',
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
} satisfies NæringDto;

describe('<ManueltLagtTilNæring>', () => {
    const scrollIntoView = vi.fn();

    beforeEach(() => {
        HTMLElement.prototype.scrollIntoView = scrollIntoView;
    });

    afterEach(() => {
        scrollIntoView.mockReset();
    });

    it('skal vise og fjerne manuelt lagt til næring', async () => {
        const onRemove = vi.fn();

        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <ManueltLagtTilNæring egenNæring={egenNæring} onRemove={onRemove} />
            </IntlProvider>,
        );

        expect(screen.getByRole('heading', { name: 'Fiskebåten' })).toBeInTheDocument();
        expect(screen.getByText('998877665')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Fjern Fiskebåten' }));

        expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('skal scrolle ny næring inn i synsfeltet', () => {
        const { rerender } = render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <ManueltLagtTilNæring onRemove={vi.fn()} />
            </IntlProvider>,
        );

        rerender(
            <IntlProvider locale="nb" messages={nbMessages}>
                <ManueltLagtTilNæring egenNæring={egenNæring} onRemove={vi.fn()} />
            </IntlProvider>,
        );

        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    });

    it('skal kunne vise næringen uten fjern-knapp', () => {
        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <ManueltLagtTilNæring egenNæring={egenNæring} />
            </IntlProvider>,
        );

        expect(screen.getByRole('heading', { name: 'Fiskebåten' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Fjern Fiskebåten' })).not.toBeInTheDocument();
    });
});
