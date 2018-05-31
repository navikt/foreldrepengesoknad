import * as React from 'react';
import './søknadstittel.less';

interface Props {
    children: string;
}

export default class Søknadstittel extends React.Component<Props> {
    render() {
        const { children } = this.props;

        return (
            <div className="søknadstittel">
                <h1 className="typo-undertittel">{children}</h1>
            </div>
        );
    }
}
