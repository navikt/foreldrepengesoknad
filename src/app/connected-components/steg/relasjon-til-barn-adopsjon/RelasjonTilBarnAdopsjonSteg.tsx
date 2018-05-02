import * as React from 'react';
import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';

class RelasjonTilBarnAdopsjonSteg extends React.Component {
    render() {
        return (
            <Steg id={StegID.RELASJON_TIL_BARN_ADOPSJON}>
                Relasjon til barn content
            </Steg>
        );
    }
}

export default RelasjonTilBarnAdopsjonSteg;
