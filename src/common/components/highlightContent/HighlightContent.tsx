import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import './highlightContent.less';

interface Props {
    watchValue: string | number | Date | undefined;
    style?: 'shake' | 'glow';
    invalid?: boolean;
}

interface State {
    active: boolean;
}

const DURATION = 400;

class HighlightContent extends React.Component<Props, State> {
    timeoutId: number | undefined;
    constructor(props: Props) {
        super(props);
        this.state = {
            active: false,
        };
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.shake = this.shake.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (`${nextProps.watchValue}` !== `${this.props.watchValue}`) {
            this.start();
        }
    }
    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    start() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.setState({ active: true });
        this.timeoutId = window.setTimeout(this.stop, 500);
    }
    stop() {
        this.setState({ active: false });
        this.timeoutId = undefined;
    }
    shake() {
        this.start();
    }
    render() {
        const { style = 'glow', invalid, children } = this.props;
        const classNames = `${style}${invalid ? `-invalid` : ''}`;
        return (
            <CSSTransition in={this.state.active} classNames={classNames} timeout={DURATION}>
                {children}
            </CSSTransition>
        );
    }
}
export default HighlightContent;
