import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import nbMessages from '../../intl/messages/nb_NO.json';
import { type AndreInntektskilder, AnnenInntektType } from '../../types/AndreInntektskilder';
import { AndreInntektskilderBox } from './AndreInntektskilderBox';

const inntektskilder = [
    {
        type: AnnenInntektType.JOBB_I_UTLANDET,
        land: 'DK',
        arbeidsgiverNavn: 'Københavns kommune',
        pågående: true,
        fom: '2024-01-01',
    },
    {
        type: AnnenInntektType.SLUTTPAKKE,
        fom: '2024-02-01',
        tom: '2024-03-31',
    },
    {
        type: AnnenInntektType.MILITÆRTJENESTE,
        pågående: false,
        fom: '2023-04-01',
        tom: '2023-10-31',
    },
] satisfies AndreInntektskilder[];

const renderInntektskilder = (andreInntektskilder: AndreInntektskilder[], onRemove = vi.fn()) =>
    render(
        <IntlProvider locale="nb" messages={nbMessages}>
            <AndreInntektskilderBox andreInntektskilder={andreInntektskilder} onRemove={onRemove} />
        </IntlProvider>,
    );

describe('<AndreInntektskilderBox>', () => {
    it('skal ikke vise noe uten andre inntekter', () => {
        const { container } = renderInntektskilder([]);

        expect(container).toBeEmptyDOMElement();
    });

    it('skal vise andre inntekter i samme kortstil som øvrige arbeidsforhold', () => {
        const { container } = renderInntektskilder(inntektskilder);

        expect(container.querySelectorAll('.border-ax-border-info-subtle')).toHaveLength(3);
        expect(container.querySelectorAll('.bg-ax-bg-info-soft')).toHaveLength(3);
        expect(screen.getAllByText('Annen inntekt')).toHaveLength(3);

        expect(screen.getByRole('heading', { name: 'Jobb i utlandet' })).toBeInTheDocument();
        expect(screen.getByText('Københavns Kommune')).toBeInTheDocument();
        expect(screen.getByText('01.01.2024 - Pågående')).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: 'Etterlønn eller sluttvederlag' })).toBeInTheDocument();
        expect(screen.getByText('01.02.2024 - 31.03.2024')).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: 'Førstegangstjeneste' })).toBeInTheDocument();
        expect(screen.getByText('01.04.2023 - 31.10.2023')).toBeInTheDocument();
    });

    it('skal fjerne valgt annen inntekt', async () => {
        const onRemove = vi.fn();
        renderInntektskilder(inntektskilder, onRemove);

        await userEvent.click(screen.getByRole('button', { name: 'Fjern Etterlønn eller sluttvederlag' }));

        expect(onRemove).toHaveBeenCalledWith(1);
    });
});
