import classNames from 'classnames';
declare const bemUtils: (cls: string) => {
    block: string;
    element: (e?: string, m?: string) => string;
    modifier: (m?: string) => string;
    modifierConditional: (m: string | undefined, condition: boolean | undefined) => string | undefined;
    child: (c: string) => any;
    classNames: typeof classNames;
};
export default bemUtils;
