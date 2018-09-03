import * as React from 'react';
import { Dekningsgrad } from 'common/types';
import { Søkersituasjon, SøkerRolle } from '../../types/søknad/Søknad';

export interface Props {
    søkerrolle: SøkerRolle;
    erAleneOmOmsorg: boolean;
    søkersituasjon: Søkersituasjon;
    antallBarn: number;
    navnForelder1: string;
    navnForelder2?: string;
    dekningsgrad: Dekningsgrad;
    familiehendelsesdato: Date;
}

class Uttaksplanlegger extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <h1>Uttaksplanlegger</h1>
            </div>
        );
    }
}
export default Uttaksplanlegger;
