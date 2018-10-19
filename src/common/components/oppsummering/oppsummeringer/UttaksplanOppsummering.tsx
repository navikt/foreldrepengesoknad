import * as React from 'react';
import { Periode } from '../../../../app/types/uttaksplan/periodetyper';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import UttaksplanOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/UttaksplanOppsummeringsliste';
import { NavnPåForeldre } from 'common/types';

interface UttaksplanOppsummeringProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
}

class UttaksplanOppsummering extends React.Component<UttaksplanOppsummeringProps> {
    render() {
        return (
            <Oppsummeringsseksjon>
                <UttaksplanOppsummeringsliste {...this.props} />
            </Oppsummeringsseksjon>
        );
    }
}

export default UttaksplanOppsummering;
