import * as React from 'react';
import { Periode } from '../../../../app/types/uttaksplan/periodetyper';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import UttaksplanOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/UttaksplanOppsummeringsliste';
import { NavnPåForeldre } from 'common/types';
import Arbeidsforhold from '../../../../app/types/Arbeidsforhold';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';

interface UttaksplanOppsummeringProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    uttaksplanValidering: UttaksplanValideringState;
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
