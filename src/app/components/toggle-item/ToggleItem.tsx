import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import ToggleArrow from './ToggleArrow';

import './toggleItem.less';

export interface Props {
    expandedHeaderClassName?: string;
    expandedContentClassName?: string;
    renderHeader: () => JSX.Element;
    renderContent: () => JSX.Element;
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
        const { renderContent, renderHeader, expandedHeaderClassName, expandedContentClassName } = this.props;
        const { expanded } = this.state;

        return (
            <div
                className={classnames(
                    BEM.className,
                    expanded && expandedHeaderClassName ? expandedHeaderClassName : undefined
                )}>
                <a
                    href="#"
                    className={BEM.element('header')}
                    onClick={this.toggleExpanded}
                    tabIndex={0}
                    aria-expanded={expanded}>
                    <div className={BEM.element('header__content')}>{renderHeader()}</div>
                    <div className={BEM.element('header__arrow')}>
                        <ToggleArrow expanded={expanded} />
                    </div>
                </a>
                {expanded ? (
                    <div className={classnames(BEM.element('content'), expandedContentClassName)}>
                        {renderContent()}
                    </div>
                ) : (
                    undefined
                )}
            </div>
        );
    }
}

export default CollapsableItem;
