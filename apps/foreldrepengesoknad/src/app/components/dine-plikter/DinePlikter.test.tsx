import React from 'react';
import { render, screen } from '@testing-library/react';
import DinePlikter from './DinePlikter';
import IntlProvider from 'app/intl/IntlProvider';

describe('<DinePlikter>', () => {
    it('skal returnere spinner når data blir hentet', () => {
        render(
            <IntlProvider locale="nb">
                <DinePlikter />
            </IntlProvider>
        );

        expect(
            screen.queryByText(
                'Jeg forstår at hvis jeg gir uriktige eller holder tilbake opplysninger kan det få konsekvenser for retten min til foreldrepenger.'
            )
        ).toBeInTheDocument();
    });
});
