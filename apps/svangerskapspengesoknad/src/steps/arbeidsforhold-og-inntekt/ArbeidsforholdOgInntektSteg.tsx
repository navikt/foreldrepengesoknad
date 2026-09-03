import { useQuery } from '@tanstack/react-query';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { mineFrilansoppdragOptions, selvstendigNæringOptions } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { useTilretteleggingerHelper } from 'appData/useTilretteleggingerHelper';
import { FormattedMessage } from 'react-intl';
import { ArbeidIUtlandetType } from 'types/ArbeidIUtlandet';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { getRuteVelgArbeidEllerSkjema } from 'utils/tilretteleggingUtils';

import { AndreInntektskilder, ArbeidsforholdOgInntektPanel } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EGEN_NÆRING_ID, skalViseEgenNæringSteg } from '@navikt/fp-steg-egen-naering';
import {
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektSvp,
    EksternArbeidsforholdDto_fpoversikt,
    FRILANS_ID,
    isArbeidsforholdOgInntektSvp,
} from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

const getNextRoute = (
    termindato: string,
    aktiveArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    values: ArbeidsforholdOgInntektSvp,
    skalViseNæringSteg: boolean,
): SøknadRoute | string => {
    if (values.harJobbetSomFrilans) {
        return SøknadRoute.FRILANS;
    }
    if (skalViseNæringSteg) {
        return SøknadRoute.NÆRING;
    }
    return getRuteVelgArbeidEllerSkjema(termindato, aktiveArbeidsforhold, values);
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

export const ArbeidsforholdOgInntektSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);
    const { fjernTilrettelegginger } = useTilretteleggingerHelper();

    const arbeidsforholdOgInntekt = useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidIUtlandet = useContextGetData(ContextDataType.ARBEID_I_UTLANDET);
    const { termindato } = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterArbeidsforholdOgInntekt = useContextSaveData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterArbeidIUtlandet = useContextSaveData(ContextDataType.ARBEID_I_UTLANDET);

    const selvstendigNæringQuery = useQuery(selvstendigNæringOptions());
    const selvstendigNæring = selvstendigNæringQuery.data ?? [];

    const frilansoppdragQuery = useQuery(mineFrilansoppdragOptions());
    const frilansoppdrag = frilansoppdragQuery.data ?? [];

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const andreInntektskilder: AndreInntektskilder[] =
        arbeidIUtlandet?.arbeidIUtlandet.map((inntekt) => ({
            ...inntekt,
            type: 'JOBB_I_UTLANDET',
        })) ?? [];

    const lagreAndreInntektskilder = (inntektskilder: AndreInntektskilder[]) => {
        const jobbIUtlandet = inntektskilder
            .filter((inntekt) => inntekt.type === 'JOBB_I_UTLANDET')
            .map((inntekt) => {
                if (
                    inntekt.arbeidsgiverNavn === undefined ||
                    inntekt.land === undefined ||
                    inntekt.pågående === undefined
                ) {
                    throw new Error('Arbeid i utlandet mangler påkrevde opplysninger');
                }
                return {
                    type: ArbeidIUtlandetType.JOBB_I_UTLANDET,
                    arbeidsgiverNavn: inntekt.arbeidsgiverNavn,
                    land: inntekt.land,
                    fom: inntekt.fom,
                    tom: inntekt.tom,
                    pågående: inntekt.pågående,
                };
            });

        oppdaterArbeidIUtlandet(jobbIUtlandet.length > 0 ? { arbeidIUtlandet: jobbIUtlandet } : undefined);
    };

    const onSubmit = (values: ArbeidsforholdOgInntekt) => {
        if (!isArbeidsforholdOgInntektSvp(values)) {
            throw new Error('values er på feil format');
        }

        oppdaterArbeidsforholdOgInntekt(values);

        const tilretteleggingerSomSkalFjernes = [];

        if (values.harHattArbeidIUtlandet === false) {
            oppdaterArbeidIUtlandet(undefined);
        }
        if (values.harJobbetSomFrilans === false) {
            oppdaterFrilans(undefined);
            tilretteleggingerSomSkalFjernes.push(FRILANS_ID);
        }
        if (values.harJobbetSomSelvstendigNæringsdrivende === false) {
            oppdaterEgenNæring(undefined);
            tilretteleggingerSomSkalFjernes.push(EGEN_NÆRING_ID);
        }

        if (tilretteleggingerSomSkalFjernes.length > 0) {
            fjernTilrettelegginger(tilretteleggingerSomSkalFjernes);
        }

        return navigator.goToStep(
            getNextRoute(
                termindato,
                aktiveArbeidsforhold,
                values,
                skalViseEgenNæringSteg({
                    harJobbetSomSelvstendigNæringsdrivende: values.harJobbetSomSelvstendigNæringsdrivende,
                    harRegistrertNæring: selvstendigNæring.length > 0,
                    egenNæring,
                }),
            ),
        );
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <ArbeidsforholdOgInntektPanel
                aktiveArbeidsforhold={aktiveArbeidsforhold}
                frilansoppdrag={frilansoppdrag}
                selvstendigNæring={selvstendigNæring}
                egenNæring={egenNæring}
                andreInntektskilder={andreInntektskilder}
                arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                saveOnNext={onSubmit}
                saveAndreInntektskilder={lagreAndreInntektskilder}
                saveEgenNæring={oppdaterEgenNæring}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
                appOrigin="svangerskapspengesoknad"
            />
        </SkjemaRotLayout>
    );
};
