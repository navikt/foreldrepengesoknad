/// <reference types="react" />
export type StatusKey = 'suksess' | 'advarsel' | 'feil';
export interface OwnProps {
    status: StatusKey;
    title?: string;
    size?: number;
}
type Props = OwnProps;
declare const StatusIkon: (props: Props) => JSX.Element;
export default StatusIkon;
