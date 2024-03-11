import {
    ValidateListError,
    ValidateCheckedError,
    ValidateDateRangeError,
    ValidateDateError,
    ValidateFødselsnummerError,
    ValidateNumberError,
    ValidateOrgNumberError,
    ValidateRequiredFieldError,
    ValidateStringError,
    ValidateYesOrNoError,
} from '.';

export const validationMessages = {
    [ValidateRequiredFieldError.noValue]: ({ hva }: { hva: string }) => `Du må svare på ${hva}.`,

    [ValidateCheckedError.notChecked]: ({ hva }: { hva: string }) => `Du må krysse av for ${hva}.`,

    /** Du må oppgi {hva}. Skriv inn eller velg dato. */
    [ValidateDateError.dateHasNoValue]: ({ hva }: { hva: string }) => `Du må oppgi ${hva}. Skriv inn eller velg dato.`,

    /** Du må oppgi {hva} i et gyldig format. Gyldig format er dd.mm.åååå. */
    [ValidateDateError.dateHasInvalidFormat]: ({ hva }: { hva: string }) =>
        `Du må oppgi ${hva} i et gyldig format. Gyldig format er dd.mm.åååå.`,

    /** ${hva} kan ikke være før ${min}. Skriv inn eller velg sluttdato fra datovelgeren. */
    [ValidateDateError.dateIsBeforeMin]: ({ hva, min }: { hva: string; min: string }) =>
        `${hva} kan ikke være før ${min}. Skriv inn eller velg sluttdato fra datovelgeren.`,

    /** ${hva} kan ikke være etter ${maks}. Skriv inn eller velg dato fra datovelgeren. */
    [ValidateDateError.dateIsAfterMax]: ({ hva, maks }: { hva: string; maks: string }) =>
        `${hva} kan ikke være etter ${maks}. Skriv inn eller velg dato fra datovelgeren.`,

    /** Lørdag og søndag kan ikke velges. Velg en annen ukedag. */
    [ValidateDateError.dateIsNotWeekday]: `Lørdag og søndag kan ikke velges. Velg en annen ukedag.`,

    /** ${startdato} kan ikke være etter ${sluttdato}. Skriv inn eller velg dato fra datovelgeren. */
    [ValidateDateRangeError.fromDateIsAfterToDate]: ({
        sluttdato,
        startdato,
    }: {
        sluttdato: string;
        startdato: string;
    }) => `${startdato} kan ikke være etter ${sluttdato}. Skriv inn eller velg dato fra datovelgeren.`,

    /** ${sluttdato} kan ikke være før ${startdato}. Skriv inn eller velg sluttdato fra datovelgeren. */
    [ValidateDateRangeError.toDateIsBeforeFromDate]: ({
        sluttdato,
        startdato,
    }: {
        sluttdato: string;
        startdato: string;
    }) => `${sluttdato} kan ikke være før ${startdato}. Skriv inn eller velg sluttdato fra datovelgeren.`,

    [ValidateFødselsnummerError.fødselsnummerHasNoValue]: ({ fødselsnummeret }: { fødselsnummeret: string }) =>
        `Skriv inn ${fødselsnummeret}.`,
    [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]: ({ fødselsnummeret }: { fødselsnummeret: string }) =>
        `${fødselsnummeret} du har tastet inn er ugyldig. Fødselsnummeret må bestå av 11 siffer.`,
    [ValidateFødselsnummerError.fødselsnummerIsInvalid]: ({ fødselsnummeret }: { fødselsnummeret: string }) =>
        `${fødselsnummeret} du har tastet inn inneholder 11 siffer, men det er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.`,
    [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]: `Du har tastet inn en fødselsnummer som ikke er lov.`,
    [ValidateListError.listIsEmpty]: ({ hva }: { hva: string }) => `Legg til ${hva}.`,
    [ValidateListError.listHasTooFewItems]: ({ hva }: { hva: string }) => `Legg til minst {minAntall} ${hva}.`,
    [ValidateListError.listHasTooManyItems]: ({ hva }: { hva: string }) =>
        `Du har lagt til for mange ${hva}. Maks antall elementer er {maksAntall}.`,
    [ValidateNumberError.numberHasNoValue]: ({ hva }: { hva: string }) => `Skriv inn ${hva}.`,
    [ValidateNumberError.numberHasInvalidFormat]: ({ hva }: { hva: string }) =>
        `Du må oppgi et gyldig tall for ${hva}. Et gyldig tall inneholder kun siffer.`,
    [ValidateNumberError.numberIsTooSmall]: ({ hva }: { hva: string }) =>
        `Tallet du har oppgitt for ${hva} er for lavt. Tallet kan ikke være lavere enn {min}.`,
    [ValidateNumberError.numberIsTooLarge]: ({ hva }: { hva: string }) =>
        `Tallet du har oppgitt for ${hva} er for høyt. Tallet kan ikke være høyere enn {maks}.`,
    [ValidateOrgNumberError.orgNumberHasNoValue]: ({ hva }: { hva: string }) => `Skriv inn ${hva}.`,
    [ValidateOrgNumberError.orgNumberHasInvalidFormat]: `Du har oppgitt et ugyldig organisasjonsnummer. Oppgi et gyldig organsisasjonsnummer som inneholder 9 siffer.`,
    [ValidateStringError.stringHasNoValue]: ({ hva }: { hva: string }) => `Skriv inn ${hva}.`,
    [ValidateStringError.stringIsNotAString]: ({ hva }: { hva: string }) => `${hva} er ikke en gyldig tekst.`,
    [ValidateStringError.stringIsTooShort]: ({ hva, minLengde }: { hva: string; minLengde: number }) =>
        `${hva} må inneholde minst ${minLengde} tegn.`,
    [ValidateStringError.stringIsTooLong]: ({ hva, maksLengde }: { hva: string; maksLengde: number }) =>
        `${hva} kan ikke inneholde flere enn ${maksLengde} tegn.`,
    [ValidateStringError.stringHasInvalidFormat]: () =>
        `Du har oppgitt en ugyldig tekst. Hvis du har limt inn tekst kan det være at du har fått med tegn som ikke vises. Prøv derfor å skrive det inn selv, i stedet for å lime det inn.`,
    [ValidateYesOrNoError.yesOrNoIsUnanswered]: ({ hva }: { hva: string }) => `Du må svare ja eller nei på ${hva}.`,
};
