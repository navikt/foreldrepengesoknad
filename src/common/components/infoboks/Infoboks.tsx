import * as React from 'react';
import Sirkelknapp, { Stil } from 'common/components/sirkelknapp/Sirkelknapp';
import LukkInfoIkon from 'common/components/ikoner/LukkInfoIkon';
import InfoIkon from 'common/components/ikoner/InfoIkon';
import { Collapse } from 'react-collapse';
const classNames = require('classnames');
import getMessage from 'common/util/i18nUtils';
import { injectIntl, IntlShape } from 'react-intl';

import './infoboks.less';

interface InfoboksProps {
    tekst: string | React.ReactNode;
    stil?: Stil;
    contentFullWidth?: boolean;
    fieldsetClsName?: string;
    intl: IntlShape;
}

interface InfoboksState {
    isExpanded: boolean;
    windowPos: number;
}

type Props = InfoboksProps;

class Infoboks extends React.Component<Props, InfoboksState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isExpanded: false,
            windowPos: 0,
        };
        this.toggleIsExpanded = this.toggleIsExpanded.bind(this);
    }

    toggleIsExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    componentDidMount(): void {
        this.getComponentSize();
        window.addEventListener('resize', this.getComponentSize);
    }
    componentWillUnmount(): void {
        window.removeEventListener('resize', this.getComponentSize);
    }

    getComponentSize = () => {
        const cls = this.props.fieldsetClsName ? this.props.fieldsetClsName : '';
        if (cls.length > 1) {
            const overskriftTilblockElement = document.querySelector('.' + cls + ' .skjema__legend');
            const overskriftTilblockElementBredde = overskriftTilblockElement
                ? overskriftTilblockElement.clientWidth + 16
                : 0;
            this.setState({ windowPos: overskriftTilblockElementBredde });
        }
    };

    render() {
        const { tekst, stil = 'info', contentFullWidth, intl } = this.props;
        const { isExpanded } = this.state;

        const ikon = isExpanded ? <LukkInfoIkon /> : <InfoIkon />;
        return (
            <React.Fragment>
                <span className="infoboks__sirkel">
                    <Sirkelknapp
                        posisjoneringFraHøyre={this.state.windowPos !== 0 ? this.state.windowPos : undefined}
                        stil={stil}
                        ariaLabel={getMessage(intl, 'infoboks.sirkeltekst')}
                        onClick={this.toggleIsExpanded}
                        ikon={ikon}
                        toggle={{ pressed: isExpanded }}
                    />
                </span>
                <Collapse
                    hasNestedCollapse={true}
                    className={classNames('infoboks', {
                        'infoboks--open': isExpanded,
                        'infoboks__content--fullWidth': contentFullWidth,
                    })}
                    isOpened={isExpanded}
                    springConfig={{ stiffness: 250, damping: 30 }}
                >
                    {isExpanded ? <div className="infoboks__wrapper typo-normal">{tekst}</div> : <span />}
                </Collapse>
            </React.Fragment>
        );
    }
}

export default injectIntl(Infoboks);
