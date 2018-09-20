import * as React from 'react';
import Block from 'common/components/block/Block';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

export interface Props {
    tittel: string;
    tittelProps: string;
    children: React.ReactNode;
}

class Summary extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { tittel, tittelProps, children } = this.props;
        return (
            <Block animated={false}>
                <Ekspanderbartpanel tittel={tittel} tittelProps={tittelProps}>
                    <div className="summary">{children}</div>
                </Ekspanderbartpanel>
            </Block>
        );
    }
}

export default Summary;
