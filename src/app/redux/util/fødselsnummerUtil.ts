import { RegistrertBarn } from 'app/types/Person';

export const getFødselsnummerForAnnenPartPåRegistrerteBarn = (registrerteBarn: RegistrertBarn[]): string | undefined => {
    const fnrArray = Array.from(new Set(registrerteBarn
        .map((b) => b.annenForelder && b.annenForelder.fnr)));

    if (fnrArray.length > 1) {
        return undefined;
    }

    return fnrArray[0]
};
