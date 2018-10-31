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
    arbeidsform: Arbeidsform,
    orgnr?: string,
    arbeidsforhold?: Arbeidsforhold[]
) => {
    if (orgnr && arbeidsforhold && arbeidsforhold.length > 0) {
        const arbeidsgiverNavn = getValgtArbeidsgiverNavn(arbeidsforhold, orgnr);
        return getMessage(intl, `oppsummering.uttak.arbeidstaker`, { orgnr, arbeidsgiverNavn });
    }
    return getMessage(intl, `oppsummering.uttak.${arbeidsform.toLowerCase()}`);
};

export const getÅrsakTekst = (
    intl: InjectedIntl,
    { type, årsak }: Utsettelsesperiode | Overføringsperiode,
    messageValues?: { [key: string]: MessageValue }
) => {
    const intlKeyPrefix = type === Periodetype.Utsettelse ? 'utsettelsesårsak.' : 'overføringsårsaktype.';
    return getMessage(intl, `${intlKeyPrefix + årsak}`, messageValues);
};
