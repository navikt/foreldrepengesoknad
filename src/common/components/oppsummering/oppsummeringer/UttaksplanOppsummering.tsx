import * as React from 'react';
import { Periode } from '../../../../app/types/uttaksplan/periodetyper';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import UttaksplanOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/UttaksplanOppsummeringsliste';

interface UttaksplanOppsummeringProps {
    perioder: Periode[];
}

class UttaksplanOppsummering extends React.Component<UttaksplanOppsummeringProps> {
    render() {
        return (
            <Oppsummeringsseksjon>
                <UttaksplanOppsummeringsliste perioder={this.props.perioder} />
            </Oppsummeringsseksjon>
        );
    }
}

export default UttaksplanOppsummering;
