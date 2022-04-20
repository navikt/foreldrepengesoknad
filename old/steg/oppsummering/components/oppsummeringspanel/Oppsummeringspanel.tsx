import * as React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './oppsummeringspanel.less';
import { Undertittel } from 'nav-frontend-typografi';

export interface Props {
    tittel: string;
    children: React.ReactNode;
    apen?: boolean;
}

class Oppsummeringspanel extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { tittel, apen, children } = this.props;
        return (
            <div className="oppsummeringPanel">
                <Ekspanderbartpanel tittel={<Undertittel>{tittel}</Undertittel>} apen={apen}>
                    <div className="oppsummeringspanel">{children}</div>
                </Ekspanderbartpanel>
            </div>
        );
    }
}

export default Oppsummeringspanel;
