import * as React from 'react';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

export interface Props {
    onLagForslag: () => void;
}

const LagForslagInfo: React.StatelessComponent<Props> = ({ onLagForslag }) => (
    <Veilederinfo>
        <Normaltekst tag="p" className="blokk-m">
            Tekst som sier noe om at bruker kan lage forslag til uttaksplan. Dersom det i det hele tatt er nødvendig.
            Muligens kun knapp holder. Og kanskje det skal ligge sammen med veileder i toppen?
        </Normaltekst>
        <div className="m-text-center">
            <Knapp htmlType="button" onClick={() => onLagForslag()}>
                Lag forslag til uttaksplan
            </Knapp>
        </div>
    </Veilederinfo>
);

export default LagForslagInfo;
