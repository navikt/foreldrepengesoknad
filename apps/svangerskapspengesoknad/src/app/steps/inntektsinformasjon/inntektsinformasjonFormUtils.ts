import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Næring } from 'app/types/Næring';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { Frilans } from 'app/types/Frilans';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { Søker, Søkerrolle } from 'app/types/Søker';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { SøknadsgrunnlagOption } from 'app/types/VelgSøknadsgrunnlag';
import { getUnikeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';

export const initialInntektsinformasjonFormValues: InntektsinformasjonFormData = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattArbeidIUtlandet]: YesOrNo.UNANSWERED,
};

export const mapArbeidsforholdToSøknadsgrunnlagOptions = (
    frilans: Frilans | undefined,
    næring: Næring | undefined,
    arbeidsforhold: Arbeidsforhold[],
    termindato: Date
): SøknadsgrunnlagOption[] => {
    const unikeArbeidsforhold = [
        ...getUnikeArbeidsforhold(arbeidsforhold, termindato).map((forhold) => ({
            value: forhold.id,
            label: forhold.arbeidsgiverNavn || 'privat arbeidsgiver',
            type: forhold.arbeidsgiverIdType === 'orgnr' ? Arbeidsforholdstype.VIRKSOMHET : Arbeidsforholdstype.PRIVAT,
        })),
    ];
    const næringValg = næring
        ? [
              {
                  value: næring.organisasjonsnummer || `${næring.navnPåNæringen}${næring.registrertILand}`,
                  label: næring.navnPåNæringen,
                  type: Arbeidsforholdstype.SELVSTENDIG,
              },
          ]
        : [];
    const frilansValg =
        frilans !== undefined
            ? [
                  {
                      value: 'Frilans',
                      label: 'Frilans',
                      type: Arbeidsforholdstype.FRILANSER,
                  },
              ]
            : [];
    return [...unikeArbeidsforhold, ...næringValg, ...frilansValg];
};

export const cleanupInvisibleCharsFromNæring = (næring: Næring): Næring => {
    const cleanedNavn = replaceInvisibleCharsWithSpace(næring.navnPåNæringen);
    return {
        ...næring,
        navnPåNæringen: cleanedNavn,
    };
};

export const mapInntektsinformasjonFormDataToState = (
    values: Partial<InntektsinformasjonFormData>,
    frilans: Frilans | undefined,
    næring: Næring | undefined,
    arbeidIUtlandet: ArbeidIUtlandet[]
): Søker => {
    return {
        rolle: Søkerrolle.MOR,
        harHattAnnenInntektSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattArbeidIUtlandet)!,
        harJobbetSomFrilansSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomFrilans)!,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(
            values.hattInntektSomNæringsdrivende
        )!,
        andreInntekterSiste10Mnd: values.hattArbeidIUtlandet === YesOrNo.YES ? arbeidIUtlandet : [],
        selvstendigNæringsdrivendeInformasjon:
            values.hattInntektSomNæringsdrivende === YesOrNo.YES ? cleanupInvisibleCharsFromNæring(næring!) : undefined,
        frilansInformasjon: values.hattInntektSomFrilans === YesOrNo.YES ? frilans : undefined,
    };
};

export const getInitialInntektsinformasjonFormValues = (søker: Søker): InntektsinformasjonFormData => {
    const init = {
        ...initialInntektsinformasjonFormValues,
        hattArbeidIUtlandet: convertBooleanOrUndefinedToYesOrNo(søker.harHattAnnenInntektSiste10Mnd),
        hattInntektSomNæringsdrivende: convertBooleanOrUndefinedToYesOrNo(
            søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
        ),
        hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(søker.harJobbetSomFrilansSiste10Mnd),
    };
    return init;
};

export const cleanupInntektsinformasjonForm = (
    values: InntektsinformasjonFormData,
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>
): InntektsinformasjonFormData => {
    return {
        hattInntektSomFrilans: visibility.isVisible(InntektsinformasjonFormField.hattInntektSomFrilans)
            ? values.hattInntektSomFrilans
            : initialInntektsinformasjonFormValues.hattInntektSomFrilans,
        hattArbeidIUtlandet: visibility.isVisible(InntektsinformasjonFormField.hattArbeidIUtlandet)
            ? values.hattArbeidIUtlandet
            : initialInntektsinformasjonFormValues.hattArbeidIUtlandet,
        hattInntektSomNæringsdrivende: visibility.isVisible(InntektsinformasjonFormField.hattInntektSomNæringsdrivende)
            ? values.hattInntektSomNæringsdrivende
            : initialInntektsinformasjonFormValues.hattInntektSomNæringsdrivende,
    };
};
