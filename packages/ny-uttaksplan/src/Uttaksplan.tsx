import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { Periode } from '@navikt/fp-common';

import PeriodeListe from './components/periode-liste/PeriodeListe';

interface Props {
    uttaksplan: Periode[];
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
}

const UttaksplanNy: FunctionComponent<Props> = ({ uttaksplan, familiehendelsedato, erFarEllerMedmor }) => {
    return (
        <div style={{ padding: '2rem 0' }}>
            <PeriodeListe
                perioder={uttaksplan}
                familiehendelsedato={familiehendelsedato}
                erFarEllerMedmor={erFarEllerMedmor}
            />
        </div>
    );
};

export default UttaksplanNy;
