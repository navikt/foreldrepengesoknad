import * as React from 'react';
import stegConfig, { StegID } from '../../util/stegConfig';
import { søknadStegPath } from '../../connected-components/steg/StegRoutes';
import { History } from 'history';
import FortsettKnapp from 'common/components/fortsett-knapp/FortsettKnapp';

export interface StegProps {
    id: StegID;
    renderFortsettKnapp?: boolean;
    history: History;
}

class Steg extends React.Component<StegProps, {}> {
    render() {
        const { id, renderFortsettKnapp, history } = this.props;
        return (
            <div className="steg">
                <h1 className="steg__tittel">{stegConfig[id].tittel}</h1>
                {this.props.children}

                {renderFortsettKnapp === true && (
                    <FortsettKnapp
                        history={history}
                        location={søknadStegPath(stegConfig[id].nesteSteg)}>
                        {stegConfig[id].fortsettKnappLabel}
                    </FortsettKnapp>
                )}
            </div>
        );
    }
}

export default Steg;
