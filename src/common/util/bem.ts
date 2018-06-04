const BEMHelper = (cls: string) => ({
    className: cls,
    element: (p?: string) => `${cls}__${p}`,
    modifier: (p?: string) => `${cls}--${p}`
});

export default BEMHelper;
