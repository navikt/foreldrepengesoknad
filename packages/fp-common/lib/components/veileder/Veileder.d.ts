/// <reference types="react" />
import './veileder.less';
export interface VeilederProps {
    ansikt?: 'glad' | 'undrende' | 'skeptisk';
    farge?: 'lilla' | 'gronn' | 'bla';
    stil?: 'normal' | 'kompakt';
}
interface OwnProps {
    className?: string;
}
type Props = VeilederProps & OwnProps;
declare const Veileder: (props: Props) => JSX.Element;
export default Veileder;
