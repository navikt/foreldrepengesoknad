import * as React from 'react';
import VeilederinfoKnappContainer from 'uttaksplan/connectedComponents/VeilederinfoKnappContainer';

import './sporsmal.less';

export interface Props {
    info?: {
        id: string;
        label: string;
    };
}

const Sporsmal: React.StatelessComponent<Props> = (props) => (
    <span className="skjemasporsmal__wrapper">
        <span className="skjemasporsmal">
            <span className="skjemasporsmal__sporsmal">{props.children}</span>
            {props.info && (
                <span className="skjemasporsmal__info">
                    <VeilederinfoKnappContainer {...props.info} />
                </span>
            )}
        </span>
    </span>
);

export default Sporsmal;
