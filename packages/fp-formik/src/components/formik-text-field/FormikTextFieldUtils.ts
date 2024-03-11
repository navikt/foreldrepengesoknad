export type TextFieldWidths = '100%' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs';

export const getTextFieldWidthClassName = (
    width: TextFieldWidths | undefined,
    otherClassName: string | undefined,
): string | undefined => {
    const allClassNames: string[] = [];
    if (width) {
        allClassNames.push(`formikTextField--${width}`);
    }
    if (otherClassName) {
        allClassNames.push(otherClassName);
    }
    return allClassNames.length > 0 ? allClassNames.join(' ') : undefined;
};
