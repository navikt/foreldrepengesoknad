/// <reference types="react" />
import './stepFooter.less';
interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}
declare function StepFooter({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }: Props): JSX.Element;
export default StepFooter;
