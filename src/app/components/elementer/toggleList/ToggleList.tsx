import * as React from 'react';

export type onToggleItemProp = (id: string, open?: boolean) => void;

export type ToggleListRenderProps = (onToggleItem: onToggleItemProp, isOpen: (id: string) => boolean) => JSX.Element;

export interface Props {
    render: ToggleListRenderProps;
    singleMode?: boolean;
    onItemToggle?: (itemId: string, open: boolean) => void;
}

type ToggleItem = Map<string, boolean>;

interface State {
    openItems: ToggleItem;
}

class ToggleList<T> extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onItemToggle = this.onItemToggle.bind(this);
        this.isOpen = this.isOpen.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.state = {
            openItems: new Map(),
        };
    }

    collapseAll() {
        this.setState({
            openItems: new Map(),
        });
    }

    open(id: string) {
        this.onItemToggle(id, true);
    }

    onItemToggle(id: string, open?: boolean) {
        const { singleMode = true } = this.props;
        if (open !== undefined) {
            this.setState({
                openItems: singleMode ? new Map().set(id, open) : new Map(this.state.openItems).set(id, open),
            });
        } else {
            const currState = this.state.openItems.get(id);
            const newState = currState === true ? false : true;
            this.setState({
                openItems: singleMode ? new Map().set(id, newState) : new Map(this.state.openItems).set(id, newState),
            });
        }
        if (this.props.onItemToggle) {
            this.props.onItemToggle(id, this.state.openItems.get(id) === true);
        }
    }

    isOpen(id: string): boolean {
        return this.state.openItems.get(id) === true;
    }

    render() {
        return this.props.render(this.onItemToggle, this.isOpen);
    }
}
export default ToggleList;
