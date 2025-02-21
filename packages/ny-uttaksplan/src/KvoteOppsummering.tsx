import { CircleBrokenIcon } from '@navikt/aksel-icons';
import { sum, sumBy } from 'lodash';
import { ReactNode, createContext, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { Forelder, RettighetType } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, Stønadskonto, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { TidsperiodenString, formatOppramsing } from '@navikt/fp-utils';

import { getVarighetString } from './utils/dateUtils';

type Props = {
    konto: TilgjengeligeStønadskontoerForDekningsgrad;
    perioder: SaksperiodeNy[];
    rettighetType: RettighetType;
    forelder: Forelder;
    visStatusIkoner: boolean;
};
const KvoteContext = createContext<Props | null>(null);

export const useKvote = () => {
    const context = useContext(KvoteContext);
    if (!context) {
        throw new Error('useKvote må brukes i en KvoteContext.Provider');
    }

    return context;
};

export const KvoteOppsummering = (props: Props) => {
    return (
        <KvoteContext.Provider value={props}>
            <ExpansionCard aria-label="Kvoteoversikt" size="small">
                <OppsummeringsTittel />
                <ExpansionCard.Content>
                    <VStack gap="4">
                        <ForeldrepengerFørFødselKvoter />
                        <MødreKvoter />
                        <AktivitetsfriKvoter />
                        <FedreKvoter />
                        <KunEnHarForeldrepengeKvoter />
                        <FellesKvoter />
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </KvoteContext.Provider>
    );
};

const OppsummeringsTittel = () => {
    const { rettighetType } = useKvote();

    if (rettighetType === 'ALENEOMSORG' || rettighetType === 'BARE_SØKER_RETT') {
        return <KvoteTittelKunEnHarForeldrepenger />;
    }
    return <KvoteTittel />;
};

const KvoteTittelKunEnHarForeldrepenger = () => {
    const { konto, perioder } = useKvote();
    const intl = useIntl();

    const dagerBrukt = summerDagerIPerioder(
        perioder.filter(
            (p) =>
                p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
                p.kontoType === 'FORELDREPENGER' ||
                p.kontoType === 'AKTIVITETSFRI_KVOTE',
        ),
    );

    const fpKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const aktivitetsfriKonto = konto.kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const førFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');

    const totaltTilgjengeligeDager = sumBy([fpKonto, aktivitetsfriKonto, førFødselKonto], (k) => k?.dager ?? 0);

    const antallUbrukteDager = totaltTilgjengeligeDager - dagerBrukt;
    if (antallUbrukteDager === 0) {
        return (
            <TittelKomponent
                tittel={<FormattedMessage id="kvote.tittel.allTidIPlan" />}
                beskrivelse={
                    <FormattedMessage
                        id="kvote.enRett.beskrivelse.allTidIPlan"
                        values={{ varighet: getVarighetString(dagerBrukt, intl) }}
                    />
                }
            />
        );
    }

    return (
        <TittelKomponent
            tittel={
                <FormattedMessage
                    id="kvote.beskrivelse.gjenståendeTid"
                    values={{ varighet: getVarighetString(antallUbrukteDager, intl) }}
                />
            }
            beskrivelse={<FormattedMessage id="kvote.beskrivelse.endre.du" />}
        />
    );
};

const KvoteTittel = () => {
    const { konto, perioder } = useKvote();
    const intl = useIntl();

    const dagerBruktAvMor = summerDagerIPerioder(
        perioder.filter(
            (p) =>
                p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
                p.kontoType === 'MØDREKVOTE' ||
                p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER',
        ),
    );
    const dagerBruktAvFar = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FEDREKVOTE' || p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'),
    );
    const dagerFellesBrukt = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FELLESPERIODE' || p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER'),
    );

    const fedreKonto = konto.kontoer.find((k) => k.konto === 'FEDREKVOTE');
    const førFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødreKonto = konto.kontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fellesKonto = konto.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    const ubrukteDagerMor =
        mødreKonto && førFødselKonto ? mødreKonto.dager + førFødselKonto.dager - dagerBruktAvMor : 0;
    const ubrukteDagerFar = fedreKonto ? fedreKonto.dager - dagerBruktAvFar : 0;
    const ubrukteDagerFelles = fellesKonto ? fellesKonto.dager - dagerFellesBrukt : 0;

    const antallUbrukteDager = sum([ubrukteDagerFar, ubrukteDagerMor, ubrukteDagerFelles]);

    if (antallUbrukteDager === 0) {
        const beskrivelseMor =
            dagerBruktAvMor > 0
                ? intl.formatMessage(
                      { id: 'kvote.varighet.tilMor' },
                      { varighet: getVarighetString(dagerBruktAvMor, intl) },
                  )
                : '';
        const beskrivelseFelles =
            dagerFellesBrukt > 0
                ? intl.formatMessage(
                      { id: 'kvote.varighet.fellesperiode' },
                      { varighet: getVarighetString(dagerFellesBrukt, intl) },
                  )
                : '';
        const beskrivelseFar =
            dagerBruktAvFar > 0
                ? intl.formatMessage(
                      { id: 'kvote.varighet.tilFar' },
                      { varighet: getVarighetString(dagerBruktAvFar, intl) },
                  )
                : '';

        return (
            <TittelKomponent
                tittel={<FormattedMessage id="kvote.tittel.allTidIPlan" />}
                beskrivelse={
                    <FormattedMessage
                        id="kvote.beskrivelse.allTidIPlan"
                        values={{
                            varighet: formatOppramsing(
                                [beskrivelseFelles, beskrivelseMor, beskrivelseFar].filter(Boolean),
                                intl,
                            ),
                        }}
                    />
                }
            />
            // <div className="rounded-full bg-surface-success-subtle">
            //     <CheckmarkIcon fontSize="2rem" className="text-icon-success p-1" aria-hidden />
            //
            // </div>
        );
    }

    const beskrivelseMor =
        ubrukteDagerMor > 0
            ? intl.formatMessage(
                  { id: 'kvote.varighet.tilMor' },
                  { varighet: getVarighetString(ubrukteDagerMor, intl) },
              )
            : '';
    const beskrivelseFelles =
        ubrukteDagerFelles > 0
            ? intl.formatMessage(
                  { id: 'kvote.varighet.fellesperiode' },
                  { varighet: getVarighetString(ubrukteDagerFelles, intl) },
              )
            : '';
    const beskrivelseFar =
        ubrukteDagerFar > 0
            ? intl.formatMessage(
                  { id: 'kvote.varighet.tilFar' },
                  { varighet: getVarighetString(ubrukteDagerFar, intl) },
              )
            : '';

    return (
        <TittelKomponent
            tittel={
                <FormattedMessage
                    id="kvote.tittel.gjenståendeTid"
                    values={{ varighet: getVarighetString(antallUbrukteDager, intl) }}
                />
            }
            beskrivelse={
                <>
                    <FormattedMessage
                        id="kvote.beskrivelse.gjenståendeTid"
                        values={{
                            varighet: formatOppramsing(
                                [beskrivelseFelles, beskrivelseMor, beskrivelseFar].filter(Boolean),
                                intl,
                            ),
                        }}
                    />{' '}
                    <FormattedMessage id="kvote.beskrivelse.endre.du" />{' '}
                    <FormattedMessage id="kvote.beskrivelse.endre.annenPart" />
                </>
            }
        />
    );
};

const TittelKomponent = ({ tittel, beskrivelse }: { tittel: ReactNode; beskrivelse: ReactNode }) => {
    const { visStatusIkoner } = useKvote();
    return (
        <ExpansionCard.Header>
            <HStack wrap={false} gap="4" align="start">
                {visStatusIkoner && (
                    <div className="rounded-full bg-surface-selected">
                        <CircleBrokenIcon fontSize="2rem" className="text-text-action p-1" aria-hidden />
                    </div>
                )}
                <div>
                    <ExpansionCard.Title size="small">{tittel}</ExpansionCard.Title>
                    <ExpansionCard.Description>{beskrivelse}</ExpansionCard.Description>
                </div>
            </HStack>
        </ExpansionCard.Header>
    );
};

const ForeldrepengerFørFødselKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantePerioder = perioder.filter((p) => p.kontoType === 'FORELDREPENGER_FØR_FØDSEL');
    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const KunEnHarForeldrepengeKvoter = () => {
    const { konto, perioder } = useKvote();
    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const relevantePerioder = perioder.filter(
        (p) => p.kontoType === 'FORELDREPENGER' && p.morsAktivitet !== 'IKKE_OPPGITT',
    );

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const FedreKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FEDREKVOTE');
    const relevantePerioder = perioder.filter(
        (p) => p.kontoType === 'FEDREKVOTE' || p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER',
    );

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const AktivitetsfriKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantKonto = konto.kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');
    const relevantePerioder = perioder.filter(
        (p) => p.kontoType === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT',
    );

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const MødreKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantKonto = konto.kontoer.find((k) => k.konto === 'MØDREKVOTE');
    const relevantePerioder = perioder.filter(
        (p) => p.kontoType === 'MØDREKVOTE' || p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER',
    );
    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const FellesKvoter = () => {
    const intl = useIntl();
    const { konto, perioder, forelder } = useKvote();
    const fellesKonto = konto.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    if (!fellesKonto) {
        return null;
    }

    const dagerBruktAvDeg = summerDagerIPerioder(perioder.filter((p) => p.kontoType === 'FELLESPERIODE'));
    const dagerBruktAvAnnenPart = summerDagerIPerioder(
        perioder.filter((p) => p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER'),
    );
    const samletBrukteDager = dagerBruktAvDeg + dagerBruktAvAnnenPart;
    const ubrukteDager = fellesKonto.dager - samletBrukteDager;
    const overtrukketDager = ubrukteDager * -1;

    const prosentOvertrukketKvote = Math.floor((fellesKonto.dager / samletBrukteDager) * 100);
    const prosentBruktAvDeg =
        overtrukketDager <= 0
            ? Math.round((dagerBruktAvDeg / fellesKonto.dager) * 100)
            : (Math.round((dagerBruktAvDeg / samletBrukteDager) * 100) * prosentOvertrukketKvote) / 100;
    const prosentBruktAvAnnenPart =
        overtrukketDager <= 0
            ? Math.round((dagerBruktAvAnnenPart / fellesKonto.dager) * 100)
            : (Math.round((dagerBruktAvAnnenPart / samletBrukteDager) * 100) * prosentOvertrukketKvote) / 100;

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">
                {getVarighetString(fellesKonto.dager, intl)} for å dele, fellesperiode
            </BodyShort>
            <VStack gap="1" className="ml-4">
                <FordelingsBar
                    fordelinger={[
                        {
                            kontoType: forelder === 'MOR' ? StønadskontoType.Mødrekvote : StønadskontoType.Fedrekvote,
                            prosent: prosentBruktAvDeg,
                        },
                        {
                            kontoType:
                                forelder === 'FAR_MEDMOR' ? StønadskontoType.Mødrekvote : StønadskontoType.Fedrekvote,
                            prosent: prosentBruktAvAnnenPart,
                        },
                        {
                            kontoType: undefined,
                            erFyllt: false,
                            prosent: overtrukketDager > 0 ? 0 : 100 - (prosentBruktAvAnnenPart + prosentBruktAvDeg),
                        },
                        {
                            kontoType: undefined,
                            prosent: 100 - prosentOvertrukketKvote,
                            erOvertrukket: true,
                        },
                    ]}
                />
                <BodyShort>
                    {formatOppramsing(
                        [
                            intl.formatMessage(
                                { id: 'kvote.varighet.fellesperiode.deg' },
                                { varighet: getVarighetString(dagerBruktAvDeg, intl) },
                            ),
                            intl.formatMessage(
                                { id: 'kvote.varighet.fellesperiode.annenForeldre' },
                                { varighet: getVarighetString(dagerBruktAvAnnenPart, intl) },
                            ),
                            ubrukteDager > 0
                                ? intl.formatMessage(
                                      { id: 'kvote.varighet.gjenstår' },
                                      { varighet: getVarighetString(ubrukteDager, intl) },
                                  )
                                : '',
                        ].filter(Boolean),
                        intl,
                    )}
                </BodyShort>
            </VStack>
        </VStack>
    );
};

const StandardVisning = ({ konto, perioder }: { konto?: Stønadskonto; perioder: SaksperiodeNy[] }) => {
    const intl = useIntl();

    if (!konto) {
        return null;
    }

    const dagerBrukt = summerDagerIPerioder(perioder);
    const ubrukteDager = konto.dager - dagerBrukt;
    const overtrukketDager = ubrukteDager * -1;
    const prosentBruktAvkvote = Math.floor((dagerBrukt / konto.dager) * 100);
    const prosentOvertrukketKvote = Math.floor((konto.dager / dagerBrukt) * 100);

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">
                <VisningsnavnForKvote kontoType={konto.konto} />
                {' - '}
                {getVarighetString(konto.dager, intl)}
            </BodyShort>
            <VStack gap="1" className="ml-4">
                {overtrukketDager <= 0 ? (
                    <FordelingsBar
                        fordelinger={[
                            {
                                kontoType: konto.konto,
                                prosent: prosentBruktAvkvote,
                            },
                            {
                                kontoType: konto.konto,
                                prosent: 100 - prosentBruktAvkvote,
                                erFyllt: false,
                            },
                        ]}
                    />
                ) : (
                    <FordelingsBar
                        fordelinger={[
                            {
                                kontoType: konto.konto,
                                prosent: prosentOvertrukketKvote,
                            },
                            {
                                kontoType: konto.konto,
                                prosent: 100 - prosentOvertrukketKvote,
                                erOvertrukket: true,
                            },
                        ]}
                    />
                )}
                <BodyShort>
                    {[
                        intl.formatMessage(
                            { id: 'kvote.varighet.erLagtTil' },
                            { varighet: getVarighetString(dagerBrukt, intl) },
                        ),
                        ubrukteDager > 0
                            ? intl.formatMessage(
                                  { id: 'kvote.varighet.gjenstår' },
                                  { varighet: getVarighetString(ubrukteDager, intl) },
                              )
                            : '',
                        overtrukketDager > 0
                            ? intl.formatMessage(
                                  { id: 'kvote.varighet.overtrukket' },
                                  { varighet: getVarighetString(overtrukketDager, intl) },
                              )
                            : '',
                    ]
                        .filter(Boolean)
                        .join(', ')}
                </BodyShort>
            </VStack>
        </VStack>
    );
};

const VisningsnavnForKvote = ({ kontoType }: { kontoType: StønadskontoType }) => {
    switch (kontoType) {
        case StønadskontoType.AktivitetsfriKvote:
            return <FormattedMessage id="kvote.konto.Aktivitetsfrikvote" />;
        case StønadskontoType.Fedrekvote:
            return <FormattedMessage id="kvote.konto.Fedrekvote" />;
        case StønadskontoType.Mødrekvote:
            return <FormattedMessage id="kvote.konto.Mødrekvote" />;
        case StønadskontoType.ForeldrepengerFørFødsel:
            return <FormattedMessage id="kvote.konto.ForeldrepengerFørFødsel" />;
        case StønadskontoType.Foreldrepenger:
            return <FormattedMessage id="kvote.konto.Foreldrepenger" />;
        case StønadskontoType.Fellesperiode:
            return <FormattedMessage id="kvote.konto.Fellesperioder" />;
    }
};

const FordelingsBar = ({ fordelinger }: { fordelinger: FordelingSegmentProps[] }) => {
    return (
        <HStack gap="2">
            {fordelinger.map((fordeling) => (
                <FordelingSegment key={Object.values(fordeling).join('-')} {...fordeling} />
            ))}
        </HStack>
    );
};

type FordelingSegmentProps = {
    kontoType?: StønadskontoType;
    prosent: number;
    erFyllt?: boolean;
    erOvertrukket?: boolean;
};
const FordelingSegment = ({ kontoType, prosent, erFyllt = true, erOvertrukket = false }: FordelingSegmentProps) => {
    const { forelder } = useKvote();
    if (prosent <= 0) {
        return null;
    }
    const style = { width: `${prosent - 1.5}%` };

    if (erOvertrukket) {
        return <div className={`rounded-full h-4 border-2 bg-red-300 border-red-300`} style={style} />;
    }

    if (forelder === 'MOR') {
        if (
            kontoType === 'MØDREKVOTE' ||
            kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
            kontoType === 'FORELDREPENGER' ||
            kontoType === 'FELLESPERIODE'
        ) {
            return (
                <div
                    className={`rounded-full h-4 border-2 ${erFyllt ? 'bg-blue-400' : 'bg-bg-default'} border-blue-400`}
                    style={style}
                />
            );
        }
        if (kontoType === 'FEDREKVOTE') {
            return (
                <div
                    className={`rounded-full h-4 border-2 ${erFyllt ? 'bg-green-200' : 'bg-bg-default'} border-green-200`}
                    style={style}
                />
            );
        }
    }

    // Logget inn som far
    if (
        kontoType === 'FEDREKVOTE' ||
        kontoType === 'AKTIVITETSFRI_KVOTE' ||
        kontoType === 'FORELDREPENGER' ||
        kontoType === 'FELLESPERIODE'
    ) {
        return (
            <div
                className={`rounded-full h-4 border-2 ${erFyllt ? 'bg-green-400' : 'bg-bg-default'} border-green-400`}
                style={style}
            />
        );
    }
    if (kontoType === 'MØDREKVOTE' || kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return (
            <div
                className={`rounded-full h-4 border-2 ${erFyllt ? 'bg-deepblue-200' : 'bg-bg-default'} border-deepblue-200`}
                style={style}
            />
        );
    }

    return <div className="rounded-full h-4 border-2 bg-bg-default border-surface-neutral-hover" style={style} />;
};

export const finnAntallDagerÅTrekke = (periode: SaksperiodeNy) => {
    const arbeidstidprosent = periode.gradering?.arbeidstidprosent;
    const samtidigUttak = periode.samtidigUttak;
    const dager = TidsperiodenString(periode).getAntallUttaksdager();

    if (arbeidstidprosent) {
        const graderingsProsent = (100 - arbeidstidprosent) / 100;
        return dager * graderingsProsent;
    }
    if (samtidigUttak) {
        return dager * (samtidigUttak / 100);
    }
    return dager;
};

const summerDagerIPerioder = (perioder: SaksperiodeNy[]) => {
    return Math.floor(sum(perioder.map(finnAntallDagerÅTrekke)));
};
