import * as React from 'react';
import Block from 'common/components/block/Block';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

export interface Props {
    tittel: string;
    tittelProps: string;
    children: React.ReactNode;
}
interface State {
    isOpen: boolean;
}

class Summary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    render() {
        const { tittel, tittelProps, children } = this.props;
        return (
            <Block animated={false}>
                <Ekspanderbartpanel
                    tittel={tittel}
                    tittelProps={tittelProps}
                    onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
                    <div className="summary">{children}</div>
                </Ekspanderbartpanel>
            </Block>
        );
    }
}

export default Summary;
