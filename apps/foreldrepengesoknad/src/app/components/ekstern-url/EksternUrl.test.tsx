import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './EksternUrl.stories';

const { Default, EkstraTekst } = composeStories(stories);

describe('<EksternUrl>', () => {
    it('skal vise ekstern url men ikke overskrift', () => {
        render(<Default />);
        const lenketekst = screen.getByText('Dette er en lenketekst');
        expect(lenketekst).toBeInTheDocument();
        expect(lenketekst.closest('a')).toHaveAttribute('href', 'www.test.no');
        expect(screen.queryByText('hjemmeside')).not.toBeInTheDocument();
    });

    it('skal vise ekstern url med overskrift', () => {
        render(<EkstraTekst />);
        expect(screen.getByText('hjemmeside')).toBeInTheDocument();
    });
});
