import { sum, sumBy } from 'lodash';
import { createContext, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { Forelder, RettighetType } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, Stønadskonto, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { TidsperiodenString, formatOppramsing } from '@navikt/fp-utils';

import { getVarighetString } from './utils/dateUtils';

type Props = {
    readonly konto: TilgjengeligeStønadskontoerForDekningsgrad;
    readonly perioder: SaksperiodeNy[];
    readonly rettighetType: RettighetType;
    readonly forelder: Forelder;
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
                <OppsummeringsTittel {...props} />
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

const OppsummeringsTittel = (props: Props) => {
    if (props.rettighetType === 'ALENEOMSORG' || props.rettighetType === 'BARE_SØKER_RETT') {
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
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">
                    <FormattedMessage id="kvote.tittel.allTidIPlan" />
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    <FormattedMessage
                        id="kvote.enRett.beskrivelse.allTidIPlan"
                        values={{ varighet: getVarighetString(dagerBrukt, intl) }}
                    />
                </ExpansionCard.Description>
            </ExpansionCard.Header>
        );
    }

    return (
        <ExpansionCard.Header>
            <ExpansionCard.Title size="small">
                <FormattedMessage
                    id="kvote.beskrivelse.gjenståendeTid"
                    values={{ varighet: getVarighetString(antallUbrukteDager, intl) }}
                />
            </ExpansionCard.Title>
            <ExpansionCard.Description>
                <FormattedMessage id="kvote.beskrivelse.endre.du" />
            </ExpansionCard.Description>
        </ExpansionCard.Header>
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
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">
                    <FormattedMessage id="kvote.tittel.allTidIPlan" />
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    <FormattedMessage
                        id="kvote.beskrivelse.allTidIPlan"
                        values={{
                            varighet: formatOppramsing(
                                [beskrivelseFelles, beskrivelseMor, beskrivelseFar].filter(Boolean),
                                intl,
                            ),
                        }}
                    />
                </ExpansionCard.Description>
            </ExpansionCard.Header>
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
        <ExpansionCard.Header>
            <ExpansionCard.Title size="small">
                <FormattedMessage
                    id="kvote.tittel.gjenståendeTid"
                    values={{ varighet: getVarighetString(antallUbrukteDager, intl) }}
                />
            </ExpansionCard.Title>
            <ExpansionCard.Description>
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
            </ExpansionCard.Description>
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
    const ubrukteDager = fellesKonto.dager - (dagerBruktAvDeg + dagerBruktAvAnnenPart);

    const prosentBruktAvDeg = Math.round((dagerBruktAvDeg / fellesKonto.dager) * 100);
    const prosentBruktAvAnnenPart = Math.round((dagerBruktAvAnnenPart / fellesKonto.dager) * 100);

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
                            prosent: 100 - (prosentBruktAvAnnenPart + prosentBruktAvDeg),
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
    const prosentBruktAvFedrekvote = Math.floor((dagerBrukt / konto.dager) * 100);

    return (
        <VStack gap="4">
            <BodyShort weight="semibold">
                <VisningsnavnForKvote kontoType={konto.konto} />
                {' - '}
                {getVarighetString(konto.dager, intl)}
            </BodyShort>
            <VStack gap="1" className="ml-4">
                <FordelingsBar
                    fordelinger={[
                        {
                            kontoType: konto.konto,
                            prosent: prosentBruktAvFedrekvote,
                        },
                        {
                            kontoType: konto.konto,
                            prosent: 100 - prosentBruktAvFedrekvote,
                            erFyllt: false,
                        },
                    ]}
                />
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
};
const FordelingSegment = ({ kontoType, prosent, erFyllt = true }: FordelingSegmentProps) => {
    const { forelder } = useKvote();
    if (prosent === 0) {
        return null;
    }
    const style = { width: `${prosent - 1.5}%` };
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

const summerDagerIPerioder = (perioder: SaksperiodeNy[]) => {
    return sum(perioder.map((p) => TidsperiodenString(p).getAntallUttaksdager()));
};
