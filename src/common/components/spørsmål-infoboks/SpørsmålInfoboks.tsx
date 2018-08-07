import * as React from 'react';
import Sirkelknapp, { Stil } from 'common/components/sirkelknapp/Sirkelknapp';
import LukkInfoIkon from 'common/components/ikoner/LukkInfoIkon';
import InfoIkon from 'common/components/ikoner/InfoIkon';
import { Collapse } from 'react-collapse';
const classNames = require('classnames');
import './spørsmålInfoboks.less';

interface SpørsmålInfoboksProps {
    tekst: string;
    stil?: Stil;
}

interface SpørsmålInfoboksState {
    isExpanded: boolean;
}

class SpørsmålInfoboks extends React.Component<
    SpørsmålInfoboksProps,
    SpørsmålInfoboksState
> {
    constructor(props: SpørsmålInfoboksProps) {
        super(props);

        this.state = {
            isExpanded: false
        };

        this.toggleIsExpanded = this.toggleIsExpanded.bind(this);
    }

    toggleIsExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    render() {
        const { tekst, stil = 'info' } = this.props;
        const { isExpanded } = this.state;

        const ikon = isExpanded ? <LukkInfoIkon /> : <InfoIkon />;

        return (
            <React.Fragment>
                <Sirkelknapp
                    stil={stil}
                    ariaLabel={tekst}
                    onClick={this.toggleIsExpanded}
                    ikon={ikon}
                    toggle={{ pressed: isExpanded }}
                />
                <Collapse
                    hasNestedCollapse={true}
                    className={classNames('spørsmålInfoboks', {
                        'spørsmålInfoboks--open': isExpanded
                    })}
                    isOpened={isExpanded}
                    springConfig={{ stiffness: 250, damping: 30 }}>
                    <div className="spørsmålInfoboks__wrapper">{tekst}</div>
                </Collapse>
            </React.Fragment>
        );
    }
}

export default SpørsmålInfoboks;
