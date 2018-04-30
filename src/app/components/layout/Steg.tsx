import * as React from 'react';

export interface Props {
    tittel: string;
}

class Steg extends React.Component<Props, {}> {
    render() {
        return (
            <div className="steg">
                <h1>{this.props.tittel}</h1>
                {this.props.children}
            </div>
        );
    }
}
export default Steg;
