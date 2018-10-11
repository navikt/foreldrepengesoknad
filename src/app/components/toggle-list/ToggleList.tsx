import * as React from 'react';

export type onToggleItemProp = (id: string, open?: boolean) => void;

export type ToggleListRenderProps = (onToggleItem: onToggleItemProp, isOpen: (id: string) => boolean) => JSX.Element;

export interface Props {
    render: ToggleListRenderProps;
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
        this.state = {
            openItems: new Map()
        };
    }

    onItemToggle(id: string, open?: boolean) {
        if (open !== undefined) {
            this.setState({
                openItems: new Map(this.state.openItems).set(id, open)
            });
        } else {
            const currState = this.state.openItems.get(id);
            this.setState({
                openItems: new Map(this.state.openItems).set(id, currState === true ? false : true)
            });
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
