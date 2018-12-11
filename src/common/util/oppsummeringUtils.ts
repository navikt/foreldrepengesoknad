import {
    Arbeidsform,
    Overføringsperiode,
    Periodetype,
    Utsettelsesperiode
} from '../../app/types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import { MessageValue, InjectedIntl } from 'react-intl';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

const getValgtArbeidsgiverNavn = (arbeidsforhold: Arbeidsforhold[], orgnr?: string) => {
    if (orgnr) {
        const valgtArbeidsgiver = arbeidsforhold.find(
            ({ arbeidsgiverId, arbeidsgiverIdType }) => arbeidsgiverIdType === 'orgnr' && arbeidsgiverId === orgnr
        );
        if (valgtArbeidsgiver) {
            return valgtArbeidsgiver.arbeidsgiverNavn;
        }
    }
    return '';
};

export const getArbeidsformTekst = (
    intl: InjectedIntl,
    arbeidsform: Arbeidsform[],
    orgnummere?: string[],
    arbeidsforhold?: Arbeidsforhold[]
) => {
    if (orgnummere !== undefined && orgnummere.length > 0 && arbeidsforhold && arbeidsforhold.length > 0) {
        const arbeidsgiverNavn = getValgtArbeidsgiverNavn(arbeidsforhold, orgnummere[0]);
        return getMessage(intl, `oppsummering.uttak.arbeidstaker`, { orgnr: orgnummere[0], arbeidsgiverNavn });
    }
    return getMessage(intl, `oppsummering.uttak.${arbeidsform[0].toLowerCase()}`);
};

export const getÅrsakTekst = (
    intl: InjectedIntl,
    { type, årsak }: Utsettelsesperiode | Overføringsperiode,
    messageValues?: { [key: string]: MessageValue }
) => {
    const intlKeyPrefix = type === Periodetype.Utsettelse ? 'utsettelsesårsak.' : 'overføringsårsaktype.';
    return getMessage(intl, `${intlKeyPrefix + årsak}`, messageValues);
};
