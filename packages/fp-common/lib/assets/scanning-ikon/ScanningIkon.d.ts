/// <reference types="react" />
interface ScanProps {
    title?: string;
    height?: number;
}
type ScanIconStatus = 'good' | 'keystone' | 'horizontal' | 'shadow';
export interface Props extends ScanProps {
    status: ScanIconStatus;
}
declare const ScanningIkon: (props: Props) => JSX.Element;
export default ScanningIkon;
