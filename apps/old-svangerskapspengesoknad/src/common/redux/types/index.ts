// tslint:disable-next-line no-any
export type Dispatch = (action: any) => any;

export interface DispatchProps {
    dispatch: Dispatch;
}
