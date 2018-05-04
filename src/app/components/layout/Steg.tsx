import * as React from 'react';
import stegConfig, { StegID } from '../../util/stegConfig';

export interface Props {
    id: StegID;
}

class Steg extends React.Component<Props, {}> {
    render() {
        const { id } = this.props;
        return (
            <div className="steg">
                <h1 className="steg__tittel">{stegConfig[id].tittel}</h1>
                {this.props.children}
            </div>
        );
    }
}

export default Steg;
