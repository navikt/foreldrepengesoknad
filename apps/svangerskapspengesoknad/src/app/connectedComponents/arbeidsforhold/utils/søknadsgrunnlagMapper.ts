import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Søker from 'app/types/Søker';
import { SøknadsgrunnlagOption } from '../../../formik/wrappers/VelgSøknadsgrunnlag';
import { IntlShape } from 'react-intl';
import { getAnnenInntektElementTitle, getUnikeArbeidsforhold } from '../../../utils/arbeidsforholdUtils';
import { AnnenInntektType } from '../../../types/AnnenInntekt';

export const mapArbeidsforholdToSøknadsgrunnlagOptions = (
    søker: Partial<Søker>,
    arbeidsforhold: Arbeidsforhold[],
    termindato: string,
    intl: IntlShape,
): SøknadsgrunnlagOption[] => {
    const { selvstendigNæringsdrivendeInformasjon = [], andreInntekterSiste10Mnd = [], frilansInformasjon } = søker;
    const førstegangstjeneste = andreInntekterSiste10Mnd.find(
        (inntekt) => inntekt.type === AnnenInntektType.MILITÆRTJENESTE,
    );
    const unikeArbeidsforhold = getUnikeArbeidsforhold(arbeidsforhold, termindato);

    return [
        ...unikeArbeidsforhold.map((forhold) => ({
            value: forhold.guid,
            label: forhold.arbeidsgiverNavn || 'privat arbeidsgiver',
            type: forhold.arbeidsgiverIdType === 'orgnr' ? Arbeidsforholdstype.VIRKSOMHET : Arbeidsforholdstype.PRIVAT,
        })),
        ...selvstendigNæringsdrivendeInformasjon.map((næring) => ({
            value: næring.organisasjonsnummer || `${næring.navnPåNæringen}${næring.registrertILand}`,
            label: næring.navnPåNæringen,
            type: Arbeidsforholdstype.SELVSTENDIG,
        })),
        ...(førstegangstjeneste
            ? [
                  {
                      value: førstegangstjeneste.type,
                      label: getAnnenInntektElementTitle(førstegangstjeneste, intl),
                      type: Arbeidsforholdstype.PRIVAT,
                  },
              ]
            : []),
        ...(frilansInformasjon !== undefined
            ? [
                  {
                      value: 'Frilans',
                      label: 'Frilans',
                      type: Arbeidsforholdstype.FRILANSER,
                  },
              ]
            : []),
    ];
};
