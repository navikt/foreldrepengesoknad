import classNames from 'classnames';

const BEMHelper = (cls: string) => ({
    className: cls,
    element: (p?: string) => `${cls}__${p}`,
    modifier: (p?: string) => `${cls}--${p}`,
    modifierConditional: (m: string | undefined, condition: boolean | undefined) =>
        condition === true && m !== undefined ? `${cls}--${m}` : undefined,
    child: (c: string) => BEMHelper(BEMHelper(cls).element(c)),
    classNames,
});

export default BEMHelper;
