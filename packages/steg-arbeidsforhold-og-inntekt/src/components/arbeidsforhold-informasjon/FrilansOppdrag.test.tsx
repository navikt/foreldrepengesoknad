import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import nbMessages from '../../intl/messages/nb_NO.json';
import { FrilansOppdrag } from './FrilansOppdrag';

const lagOppdrag = ({
    arbeidsgiverId = '123456789',
    arbeidsgiverNavn = 'OPPDRAGSGIVER AS',
    fom,
    tom,
}: {
    arbeidsgiverId?: string;
    arbeidsgiverNavn?: string;
    fom: string;
    tom?: string;
}) =>
    ({
        arbeidsgiverId,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn,
        fom,
        stillingsprosent: 0,
        tom,
    }) satisfies EksternArbeidsforholdDto_fpoversikt;

const renderOppdrag = async (frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[]) => {
    render(
        <IntlProvider locale="nb" messages={nbMessages}>
            <FrilansOppdrag frilansoppdrag={frilansoppdrag} />
        </IntlProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Vis mine oppdrag' }));
};

describe('<FrilansOppdrag>', () => {
    it('skal beholde periodevisningen for ett oppdrag', async () => {
        await renderOppdrag([lagOppdrag({ fom: '2024-01-15', tom: '2024-02-20' })]);

        expect(screen.getByText('Oppdragsgiver AS')).toBeInTheDocument();
        expect(screen.getByText('15.01.2024 - 20.02.2024')).toBeInTheDocument();
        expect(screen.queryByText(/1 oppdrag/)).not.toBeInTheDocument();
    });

    it('skal oppsummere flere avsluttede oppdrag med antall og ytterperiode', async () => {
        await renderOppdrag([
            lagOppdrag({ fom: '2024-03-01', tom: '2024-04-30' }),
            lagOppdrag({ fom: '2024-01-15', tom: '2024-02-20' }),
        ]);

        expect(screen.getByText('Oppdragsgiver AS')).toBeInTheDocument();
        expect(screen.getByText('2 oppdrag: 15.01.2024 - 30.04.2024')).toBeInTheDocument();
        expect(screen.queryByText('01.03.2024 - 30.04.2024')).not.toBeInTheDocument();
    });

    it('skal vise pågående når minst ett av flere oppdrag mangler sluttdato', async () => {
        await renderOppdrag([lagOppdrag({ fom: '2024-03-01' }), lagOppdrag({ fom: '2024-01-15', tom: '2024-02-20' })]);

        expect(screen.getByText('2 oppdrag: 15.01.2024 - Pågående')).toBeInTheDocument();
    });

    it('skal gruppere på stabil arbeidsgiveridentitet og vise flere arbeidsgivere hver for seg', async () => {
        await renderOppdrag([
            lagOppdrag({ arbeidsgiverId: '111111111', arbeidsgiverNavn: 'FØRSTE AS', fom: '2024-01-01' }),
            lagOppdrag({
                arbeidsgiverId: '111111111',
                arbeidsgiverNavn: 'FØRSTE AS',
                fom: '2024-02-01',
                tom: '2024-02-29',
            }),
            lagOppdrag({
                arbeidsgiverId: '222222222',
                arbeidsgiverNavn: 'ANDRE AS',
                fom: '2024-03-01',
                tom: '2024-03-31',
            }),
        ]);

        const oppdragsliste = screen.getByRole('list');
        expect(within(oppdragsliste).getAllByRole('listitem')).toHaveLength(2);
        expect(screen.getByText('Første AS')).toBeInTheDocument();
        expect(screen.getByText('2 oppdrag: 01.01.2024 - Pågående')).toBeInTheDocument();
        expect(screen.getByText('Andre AS')).toBeInTheDocument();
        expect(screen.getByText('01.03.2024 - 31.03.2024')).toBeInTheDocument();
    });

    it('skal ikke slå sammen ulike arbeidsgiveridentiteter som har samme navn', async () => {
        await renderOppdrag([
            lagOppdrag({ arbeidsgiverId: '111111111', fom: '2024-01-01', tom: '2024-01-31' }),
            lagOppdrag({ arbeidsgiverId: '222222222', fom: '2024-02-01', tom: '2024-02-29' }),
        ]);

        const oppdragsliste = screen.getByRole('list');
        expect(within(oppdragsliste).getAllByRole('listitem')).toHaveLength(2);
        expect(screen.getAllByText('Oppdragsgiver AS')).toHaveLength(2);
        expect(screen.queryByText(/2 oppdrag/)).not.toBeInTheDocument();
    });
});
