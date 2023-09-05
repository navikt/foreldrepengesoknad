import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
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
import { getUnikeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';

export const initialInntektsinformasjonFormValues: InntektsinformasjonFormData = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattArbeidIUtlandet]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.tilrettelegging]: [],
};

//TODO: Finn bedre løsning for currentId, går det bra at tilretteleggingFraState?.id ikke settes hvis finnes?
export const mapArbeidsforholdToSøknadsgrunnlagOptions = (
    tilrettelegginger: Tilrettelegging[],
    erFrilanser: boolean,
    harNæring: boolean,
    frilans: Frilans | undefined,
    næring: Næring[],
    arbeidsforhold: Arbeidsforhold[],
    termindato: Date
): Tilrettelegging[] => {
    let currentId = 0;
    const unikeArbeidsforhold = [
        ...getUnikeArbeidsforhold(arbeidsforhold, termindato).map((forhold) => {
            const tilretteleggingFraState = tilrettelegginger.find((t) => t.id == forhold.id);
            currentId = currentId + 1;
            return {
                id: currentId.toString(), //tilretteleggingFraState?.id || forhold.id,
                arbeidsforhold: tilretteleggingFraState?.arbeidsforhold || {
                    id: forhold.id,
                    type:
                        forhold.arbeidsgiverIdType === 'orgnr'
                            ? Arbeidsforholdstype.VIRKSOMHET
                            : Arbeidsforholdstype.PRIVAT,
                    navn: forhold.arbeidsgiverNavn || 'privat arbeidsgiver',
                },
                tilrettelegginger: tilretteleggingFraState?.tilrettelegginger || [],
                vedlegg: tilretteleggingFraState?.vedlegg || [],
                behovForTilretteleggingFom: tilretteleggingFraState?.behovForTilretteleggingFom || undefined,
            };
        }),
    ];
    const næringValg = harNæring
        ? næring.map((egenNæring) => {
              const næringId =
                  egenNæring.organisasjonsnummer || `${egenNæring.navnPåNæringen}${egenNæring.registrertILand}`;
              const tilretteleggingFraState = tilrettelegginger.find((t) => t.id == næringId);
              currentId = currentId + 1;
              return {
                  id: currentId.toString(), //tilretteleggingFraState?.id || næringId,
                  arbeidsforhold: tilretteleggingFraState?.arbeidsforhold || {
                      id: egenNæring.organisasjonsnummer || `${egenNæring.navnPåNæringen}${egenNæring.registrertILand}`,
                      type: Arbeidsforholdstype.SELVSTENDIG,
                      navn: egenNæring.navnPåNæringen,
                  },
                  vedlegg: tilretteleggingFraState?.vedlegg || [],
                  behovForTilretteleggingFom: tilretteleggingFraState?.behovForTilretteleggingFom || undefined,
                  tilrettelegginger: tilretteleggingFraState?.tilrettelegginger || [],
              };
          })
        : [];
    const frilansTilretteleggingFraState = tilrettelegginger.find((t) => t.id == 'Frilans');
    currentId = currentId + 1;
    const frilansValg =
        erFrilanser && frilans !== undefined
            ? [
                  {
                      id: currentId.toString(),
                      arbeidsforhold: frilansTilretteleggingFraState?.arbeidsforhold || {
                          id: 'Frilans',
                          navn: 'Frilans',
                          type: Arbeidsforholdstype.FRILANSER,
                      },
                      vedlegg: frilansTilretteleggingFraState?.vedlegg || [],
                      behovForTilretteleggingFom:
                          frilansTilretteleggingFraState?.behovForTilretteleggingFom || undefined,
                      tilrettelegginger: frilansTilretteleggingFraState?.tilrettelegginger || [],
                  },
              ]
            : [];
    return [...unikeArbeidsforhold, ...næringValg, ...frilansValg];
};

export const mapInntektsinformasjonFormDataToState = (
    values: Partial<InntektsinformasjonFormData>,
    frilans: Frilans | undefined,
    næring: Næring[],
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
        selvstendigNæringsdrivendeInformasjon: values.hattInntektSomNæringsdrivende === YesOrNo.YES ? næring : [],
        frilansInformasjon: values.hattInntektSomFrilans === YesOrNo.YES ? frilans : undefined,
    };
};

export const getInitialInntektsinformasjonFormValues = (
    søker: Søker,
    tilretteleggingsBehov: Tilrettelegging[]
): InntektsinformasjonFormData => {
    const init = {
        ...initialInntektsinformasjonFormValues,
        hattArbeidIUtlandet: convertBooleanOrUndefinedToYesOrNo(søker.harHattAnnenInntektSiste10Mnd),
        hattInntektSomNæringsdrivende: convertBooleanOrUndefinedToYesOrNo(
            søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
        ),
        hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(søker.harJobbetSomFrilansSiste10Mnd),
        tilrettelegging: tilretteleggingsBehov.map((t) => t.id),
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
        tilrettelegging: visibility.isVisible(InntektsinformasjonFormField.tilrettelegging)
            ? values.tilrettelegging
            : initialInntektsinformasjonFormValues.tilrettelegging,
    };
};
