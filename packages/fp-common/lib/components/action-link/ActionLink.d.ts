/// <reference types="react" />
interface Props {
    className?: string;
    onClick: () => void;
    ariaLabel?: string;
    children: React.ReactNode;
}
declare const ActionLink: React.FunctionComponent<Props>;
export default ActionLink;
