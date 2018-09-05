import * as React from 'react';
import BEMHelper from 'common/util/bem';
import ToggleArrow from './ToggleArrow';

import './toggleItem.less';

export interface Props {
    renderHeader: () => JSX.Element;
    renderContent: () => JSX.Element;
    onHeaderClick?: () => void;
}

interface State {
    expanded: boolean;
}

const BEM = BEMHelper('toggleItem');

class CollapsableItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.state = {
            expanded: false
        };
    }
    toggleExpanded(evt: React.MouseEvent<HTMLElement>) {
        evt.stopPropagation();
        evt.preventDefault();
        this.setState({ expanded: !this.state.expanded });
    }
    render() {
        const { renderContent, renderHeader } = this.props;
        const { expanded } = this.state;

        return (
            <div className={BEM.className}>
                <a
                    href="#"
                    className={BEM.element('header')}
                    onClick={this.toggleExpanded}
                    tabIndex={1}
                    aria-expanded={expanded}>
                    <div className={BEM.element('header__content')}>{renderHeader()}</div>
                    <div className={BEM.element('header__arrow')}>
                        <ToggleArrow expanded={expanded} />
                    </div>
                </a>
                {expanded ? <div className={BEM.element('content')}>{renderContent()}</div> : undefined}
            </div>
        );
    }
}

export default CollapsableItem;
