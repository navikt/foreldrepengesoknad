import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { FordelingFargekode } from 'types/FordelingOversikt';

import nbMessages from '../../../../intl/nb_NO.json';
import { FellesperiodeValgVisning } from './FellesperiodeValgVisning';

const renderComponent = (props: React.ComponentProps<typeof FellesperiodeValgVisning>) => {
    return render(
        <IntlProvider locale="nb" messages={nbMessages}>
            <FellesperiodeValgVisning {...props} />
        </IntlProvider>,
    );
};

describe('FellesperiodeValgVisning', () => {
    it('skal vise "X uker fellesperiode" når ingenting er fordelt', () => {
        renderComponent({
            fordelingsdager: [{ antallDager: 100, fargekode: FordelingFargekode.IKKE_TILDELT }],
            dagerMedFellesperiode: 100,
            erFarEllerMedmor: false,
        });

        expect(screen.getByText('20 uker fellesperiode')).toBeInTheDocument();
    });

    it('skal vise "til deg" og "igjen" når mor har fordelt', () => {
        renderComponent({
            fordelingsdager: [
                { antallDager: 50, fargekode: FordelingFargekode.SØKER_MOR },
                { antallDager: 50, fargekode: FordelingFargekode.IKKE_TILDELT },
            ],
            dagerMedFellesperiode: 100,
            erFarEllerMedmor: false,
        });

        expect(screen.getByText('10 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('10 uker igjen')).toBeInTheDocument();
    });

    it('skal vise "til deg" og "igjen" når far har fordelt', () => {
        renderComponent({
            fordelingsdager: [
                { antallDager: 30, fargekode: FordelingFargekode.SØKER_FAR },
                { antallDager: 70, fargekode: FordelingFargekode.IKKE_TILDELT },
            ],
            dagerMedFellesperiode: 100,
            erFarEllerMedmor: true,
        });

        expect(screen.getByText('6 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('14 uker igjen')).toBeInTheDocument();
    });

    it('skal vise kun varighetString uten "til deg" når antall dager er 10 eller mindre', () => {
        renderComponent({
            fordelingsdager: [
                { antallDager: 10, fargekode: FordelingFargekode.SØKER_MOR },
                { antallDager: 90, fargekode: FordelingFargekode.IKKE_TILDELT },
            ],
            dagerMedFellesperiode: 100,
            erFarEllerMedmor: false,
        });

        expect(screen.getByText('2 uker')).toBeInTheDocument();
        expect(screen.getByText('18 uker igjen')).toBeInTheDocument();
    });

    it('skal vise uker og dager når det ikke er hele uker', () => {
        renderComponent({
            fordelingsdager: [{ antallDager: 101, fargekode: FordelingFargekode.IKKE_TILDELT }],
            dagerMedFellesperiode: 101,
            erFarEllerMedmor: false,
        });

        expect(screen.getByText('20 uker og 1 dag fellesperiode')).toBeInTheDocument();
    });

    it('skal ha aria-hidden på rot-elementet', () => {
        const { container } = renderComponent({
            fordelingsdager: [{ antallDager: 100, fargekode: FordelingFargekode.IKKE_TILDELT }],
            dagerMedFellesperiode: 100,
            erFarEllerMedmor: false,
        });

        expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    });
});
