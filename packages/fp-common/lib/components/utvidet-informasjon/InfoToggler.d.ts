/// <reference types="react" />
import './infoToggler.less';
interface Props {
    children: React.ReactNode;
    onToggle: () => void;
    apen?: boolean;
}
declare const InfoToggler: React.FunctionComponent<Props>;
export default InfoToggler;
