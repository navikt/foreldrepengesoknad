import classNames from 'classnames';

interface ClassNames {
    (...args: classNames.ArgumentArray): string;
    default: ClassNames;
}
export interface IPlanBemUtils {
    block: string;
    element: (e?: string, m?: string) => string;
    modifier: (m?: string) => string;
    modifierConditional: (m: string | undefined, condition: boolean | undefined) => string | undefined;
    child: (c: string) => IPlanBemUtils;
    classNames: ClassNames;
}

export const planBemUtils = (cls: string): IPlanBemUtils => ({
    block: cls,
    element: (e?: string, m?: string) => `${cls}__${e}${m ? ` ${cls}__${e}--${m}` : ''}`,
    modifier: (m?: string) => `${cls}--${m}`,
    modifierConditional: (m: string | undefined, condition: boolean | undefined) =>
        condition === true && m !== undefined ? `${cls}--${m}` : undefined,
    child: (c: string) => planBemUtils(planBemUtils(cls).element(c)),
    classNames,
});
