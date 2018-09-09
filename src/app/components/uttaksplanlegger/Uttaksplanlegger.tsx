import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { Systemtittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import Periodeliste from '../periodeliste/Periodeliste';
import NyPeriodeBolk from '../../bolker/ny-periode-bolk/NyPeriodeBolk';

import './uttaksplanlegger.less';

export interface Props {
    uttaksplan: Periode[];
    navnForelder1: string;
    navnForelder2?: string;
    onAdd: (periode: Periode) => void;
    onUpdate?: (periode: Periode) => void;
    onDelete?: (periode: Periode) => void;
}

class Uttaksplanlegger extends React.Component<Props, {}> {
    render() {
        const { uttaksplan, navnForelder1, navnForelder2, onAdd } = this.props;
        return (
            <div className="uttaksplanlegger">
                <Block margin="s">
                    <Systemtittel>Din uttaksplan</Systemtittel>
                </Block>
                <Block margin="m">
                    <Periodeliste perioder={uttaksplan} navnForelder1={navnForelder1} navnForelder2={navnForelder2} />
                </Block>
                <NyPeriodeBolk onSubmit={onAdd} />
            </div>
        );
    }
}
export default Uttaksplanlegger;
