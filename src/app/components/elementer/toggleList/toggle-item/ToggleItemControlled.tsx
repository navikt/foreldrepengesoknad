import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import ToggleArrow from './ToggleArrow';

import './toggleItem.less';

export interface Props {
    id: string;
    isExpanded: boolean;
    expandedHeaderClassName?: string;
    expandedContentClassName?: string;
    onToggle: () => void;
    renderHeader: () => JSX.Element;
    renderContent: () => JSX.Element;
}

const BEM = BEMHelper('toggleItem');

class ToggleItemControlled extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.state = {
            expanded: false,
        };
    }
    toggleExpanded(evt: React.MouseEvent<HTMLElement>) {
        evt.stopPropagation();
        evt.preventDefault();
        this.props.onToggle();
    }
    render() {
        const {
            id,
            isExpanded,
            renderContent,
            renderHeader,
            expandedHeaderClassName,
            expandedContentClassName,
        } = this.props;

        return (
            <div
                className={classnames(
                    BEM.block,
                    isExpanded && expandedHeaderClassName ? expandedHeaderClassName : undefined
                )}
            >
                <a
                    id={id}
                    href="#"
                    className={BEM.element('header')}
                    onClick={this.toggleExpanded}
                    tabIndex={0}
                    aria-expanded={isExpanded}
                >
                    <div className={BEM.element('header__content')}>{renderHeader()}</div>
                    <div className={BEM.element('header__arrow')}>
                        <ToggleArrow expanded={isExpanded} />
                    </div>
                </a>
                {isExpanded ? (
                    <div className={classnames(BEM.element('content'), expandedContentClassName)}>
                        {renderContent()}
                    </div>
                ) : undefined}
            </div>
        );
    }
}

export default ToggleItemControlled;
