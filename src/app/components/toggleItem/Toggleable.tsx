import * as React from 'react';

const initialState = { show: false };
type State = Readonly<typeof initialState>;

interface DefaultProps<P extends object = object> {
    props: P;
}
const defaultProps: DefaultProps = { props: {} };

type Props<P extends object = object> = Partial<
    {
        children: RenderCallback | React.ReactNode;
        render: RenderCallback;
        component: React.ComponentType<ToggleableComponentProps<P>>;
    } & DefaultProps<P>
>;

type RenderCallback = (args: ToggleableComponentProps) => JSX.Element;

export type ToggleableComponentProps<T extends object = object> = {
    show: State['show'];
    toggle: Toggleable['toggle'];
} & T;

const updateShowState = (prevState: State) => ({ show: !prevState.show });

class Toggleable<T extends object = object> extends React.Component<Props<T>, State> {
    static readonly defaultProps: Props = defaultProps;
    readonly state: State = initialState;
    render() {
        const { component: InjectedComponent, children, render, props } = this.props;
        const renderProps = { show: this.state.show, toggle: this.toggle };

        if (InjectedComponent) {
            return (
                <InjectedComponent {...props} {...renderProps}>
                    {children}
                </InjectedComponent>
            );
        }
        if (render) {
            return render(renderProps);
        }
        // return isFunction(children) ? children(renderProps) : null;
        return null;
    }
    private toggle = (event: React.MouseEvent<HTMLElement>) => this.setState(updateShowState);
}
export default Toggleable;
