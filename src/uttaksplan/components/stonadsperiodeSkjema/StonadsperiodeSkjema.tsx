import * as React from 'react';
import { Stonadsperiode } from 'uttaksplan/types';

export interface Props {
    periode?: Stonadsperiode;
}

class StonadsperiodeSkjema extends React.Component<Props, {}> {
    render() {
        return <div>Stønadsperiode</div>;
    }
}
export default StonadsperiodeSkjema;
