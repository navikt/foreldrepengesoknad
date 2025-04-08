import { useQuery } from '@tanstack/react-query';
import { ContextDataMap, SvpDataContext } from 'appData/SvpDataContext';
import { SvpDataMapAndMetaData, VERSJON_MELLOMLAGRING } from 'appData/useMellomlagreSøknad';
import ky from 'ky';
import { useIntl } from 'react-intl';
import { AvtaltFeriePerArbeidsgiver } from 'types/AvtaltFerie';
import { Barn } from 'types/Barn';
import {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    TilOgMedDatoType,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';

import { ArbeidsforholdOgInntektSvp, LocaleNo, Saker, Søkerinfo } from '@navikt/fp-types';
import { Umyndig } from '@navikt/fp-ui';
import { erMyndig, useDocumentTitle } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ApiErrorHandler, Spinner, SvangerskapspengesøknadRoutes } from './SvangerskapspengesøknadRoutes';
import { IkkeKvinne } from './pages/ikke-kvinne/IkkeKvinne';

interface Props {
    locale: LocaleNo;
    onChangeLocale: any;
}

export const Svangerskapspengesøknad = ({ locale, onChangeLocale }: Props) => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'søknad.pagetitle' }));

    const søkerinfo = useQuery({
        queryKey: ['SOKERINFO'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`).json<Søkerinfo>(),
    });

    const mellomlagretInfo = useQuery({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () =>
            ky.get(`${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`).json<SvpDataMapAndMetaData>(),
    });

    const sak = useQuery({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`).json<Saker>(),
        select: (saker) => {
            const svpSak = saker.svangerskapspenger[0]; //TODO: gal antagelse om bare 1 sak
            if (!svpSak) {
                return undefined;
            }

            const barnet = {
                erBarnetFødt: svpSak.familiehendelse.antallBarn > 0,
                fødselsdato: svpSak.familiehendelse.fødselsdato,
                termindato: svpSak.familiehendelse.termindato!, //TODO: denne skal vel alltid være satt?
            } satisfies Barn;

            const valgteArbeidsforhold = svpSak.gjeldendeVedtak?.arbeidsforhold
                .map((a) => a.aktivitet.arbeidsgiver?.id)
                .filter((s) => s !== undefined);

            const avtalteFeriePerArbeidsgiver = svpSak.gjeldendeVedtak?.arbeidsforhold.reduce((acc, a) => {
                const arbeidsgiverId = a.aktivitet.arbeidsgiver?.id;
                // TODO: dette caset
                if (!arbeidsgiverId) {
                    return acc;
                }
                const b = a.oppholdsperioder
                    .filter((opphold) => opphold.årsak === 'FERIE')
                    .map((ferie) => {
                        return {
                            arbeidsforhold: {
                                type: Arbeidsforholdstype.VIRKSOMHET, // TODO
                                id: arbeidsgiverId,
                            },
                            fom: ferie.fom,
                            tom: ferie.tom,
                        };
                    });

                acc[arbeidsgiverId] = {
                    skalHaFerie: b.length > 0,
                    feriePerioder: b,
                };

                return acc;
            }, {} as AvtaltFeriePerArbeidsgiver);
            const tilrettelegginer = svpSak.gjeldendeVedtak?.arbeidsforhold.reduce(
                (acc, a) => {
                    const arbeidsgiverId = a.aktivitet.arbeidsgiver?.id;
                    // TODO: dette caset
                    if (!arbeidsgiverId) {
                        return acc;
                    }
                    if (a.tilrettelegginger.length === 1) {
                        const tilrettelegging = a.tilrettelegginger[0];

                        if (tilrettelegging.type === 'INGEN') {
                            acc[arbeidsgiverId] = {
                                type: Tilretteleggingstype.INGEN,
                                enPeriodeMedTilretteleggingFom: tilrettelegging.fom,
                                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP, //TODO
                                behovForTilretteleggingFom: a.behovFrom,
                            } satisfies IngenTilrettelegging;
                        }

                        if (tilrettelegging.type === 'DELVIS') {
                            acc[arbeidsgiverId] = {
                                type: Tilretteleggingstype.DELVIS,
                                delvisTilretteleggingPeriodeType:
                                    DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN, //TODO
                                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP, //TODO
                                enPeriodeMedTilretteleggingFom: tilrettelegging.fom,
                                enPeriodeMedTilretteleggingStillingsprosent:
                                    tilrettelegging.arbeidstidprosent?.toString(),
                                behovForTilretteleggingFom: a.behovFrom,
                            } satisfies DelvisTilrettelegging;
                        }
                    }
                    return acc;
                },
                {} as Record<string, IngenTilrettelegging | DelvisTilrettelegging>,
            );

            const arbeidsforholdOgInntekt = {
                //TODO: dynamisk alle felter
                harHattArbeidIUtlandet: false,
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: false,
            } satisfies ArbeidsforholdOgInntektSvp;

            return {
                OM_BARNET: barnet,
                VALGTE_ARBEIDSFORHOLD: valgteArbeidsforhold,
                FERIE: avtalteFeriePerArbeidsgiver,
                TILRETTELEGGINGER: tilrettelegginer,
                ARBEIDSFORHOLD_OG_INNTEKT: arbeidsforholdOgInntekt,
            } satisfies ContextDataMap;
        },
    });
    console.log(sak);

    if (søkerinfo.error || mellomlagretInfo.error) {
        return <ApiErrorHandler error={notEmpty(søkerinfo.error || mellomlagretInfo.error)} />;
    }

    if (!søkerinfo.data || mellomlagretInfo.isPending) {
        return <Spinner />;
    }

    const erPersonKvinne = søkerinfo.data.søker.kjønn === 'K';

    if (!erPersonKvinne) {
        return <IkkeKvinne />;
    }

    const erPersonMyndig = erMyndig(søkerinfo.data.søker.fødselsdato);

    const mellomlagretState =
        mellomlagretInfo.data?.version === VERSJON_MELLOMLAGRING ? mellomlagretInfo.data : undefined;

    const m = {
        version: mellomlagretState?.version ?? 1,
        locale: mellomlagretState?.locale ?? 'nb',
        ...sak.data,
    }; //TODO: temp

    return (
        <div>
            {!erPersonMyndig ? (
                <Umyndig appnavn="Svangerskapspenger" />
            ) : (
                <SvpDataContext initialState={m}>
                    <SvangerskapspengesøknadRoutes
                        locale={locale}
                        onChangeLocale={onChangeLocale}
                        søkerInfo={søkerinfo.data}
                        mellomlagretData={m}
                    />
                </SvpDataContext>
            )}
        </div>
    );
};
