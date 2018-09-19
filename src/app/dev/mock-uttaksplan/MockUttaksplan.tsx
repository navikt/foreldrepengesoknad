import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import Periodeliste from '../../components/periodeliste/Periodeliste';

export interface Props {
    perioder: Periode[];
    navnMor: string;
    navnFarMedmor?: string;
}

const MockUttaksplan: React.StatelessComponent<Props> = (props) => (
    <div className="typo-normal m-gray-block blokk-m">
        <h2>Mock uttaksplan er generert for innsending</h2>
        <p>
            Frem til ny ny uttaksplan er på plass, genereres en mock-uttaksplan basert på antall foreldre og
            familiehendelsesdato og legges til i søknaden. Det genererers kun for fødsel-situasjonen.
        </p>
        <h3>Perioder:</h3>
        <Periodeliste {...props} />
    </div>
);

export default MockUttaksplan;
