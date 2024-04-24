import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import PeriodeListe from './periode-liste/PeriodeListe';

const UttaksplanNy: FunctionComponent = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <PeriodeListe />
        </div>
    );
};

export default UttaksplanNy;
