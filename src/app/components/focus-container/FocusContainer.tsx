import * as React from 'react';

export interface Props {
    focusOnContainer?: {
        ariaLabelId: string;
    };
}

import './focusContainer.less';
import { focusFirstElement } from '../../util/focusUtils';

class FocusContainer extends React.Component<Props> {
    container: HTMLElement | null;
    focus() {
        if (this.container) {
            const { focusOnContainer } = this.props;
            focusOnContainer === undefined ? focusFirstElement(this.container) : this.container.focus();
        }
    }
    render() {
        const { children, focusOnContainer } = this.props;
        return (
            <div
                ref={(c) => (this.container = c)}
                className="focusContainer"
                tabIndex={focusOnContainer === undefined ? undefined : -1}
                aria-labelledby={focusOnContainer ? focusOnContainer.ariaLabelId : undefined}>
                {children}
            </div>
        );
    }
}
export default FocusContainer;
