import * as React from 'react';
import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';

class RelasjonTilBarnSteg extends React.Component {
    render() {
        return (
            <Steg id={StegID.RELASJON_TIL_BARN}>Relasjon til barn content</Steg>
        );
    }
}

export default RelasjonTilBarnSteg;
