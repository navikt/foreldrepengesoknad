import { CheckmarkIcon, CircleBrokenIcon, ExclamationmarkIcon } from '@navikt/aksel-icons';
import { sum, sumBy } from 'lodash';
import { ReactNode, createContext, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HGrid, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Familiehendelse, FpSak, KontoBeregningDto, KontoDto, SaksperiodeNy, UttaksplanModus } from '@navikt/fp-types';
import { TidsperiodenString, formatOppramsing } from '@navikt/fp-utils';

import { getVarighetString } from './utils/dateUtils';

type Props = {
    konto: KontoBeregningDto;
    perioder: SaksperiodeNy[];
    rettighetType: FpSak['rettighetType'];
    forelder: FpSak['forelder'];
    visStatusIkoner: boolean;
    familiehendelse?: Familiehendelse;
    navnPåForeldre: NavnPåForeldre;
    modus: UttaksplanModus;
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
    const { konto, perioder, familiehendelse } = useKvote();
    const intl = useIntl();
    const kvoter = ['FORELDREPENGER_FØR_FØDSEL', 'FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'].map((kontoType) => {
        const aktuellKonto = konto.kontoer.find((k) => k.konto === kontoType);
        if (!aktuellKonto) {
            return null;
        }

        const ubrukteDagerSkalTrekkes = kontoType === 'FORELDREPENGER_FØR_FØDSEL' && !!familiehendelse?.fødselsdato;
        const brukteDager = summerDagerIPerioder(
            perioder.filter((p) => {
                // Aktivitetsfri kvote har spesialhåndtering
                if (kontoType === 'AKTIVITETSFRI_KVOTE') {
                    // I planlegger og søknad brukes denne kontoen på periodene.
                    const harMatchendeKonto = p.kontoType === 'AKTIVITETSFRI_KVOTE';

                    // Perioder som kommer fra søknad i innsyn ligger på foreldrepengerkontoen av en eller annen grunn.
                    const harMatchendePeriode = p.kontoType === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT';
                    return harMatchendePeriode || harMatchendeKonto;
                }

                // Disse periodene skal kun telles for aktivitetsfri kvoter
                if (p.kontoType === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT') {
                    return false;
                }

                return kontoType === p.kontoType;
            }),
        );
        const ubrukteDager = aktuellKonto.dager - brukteDager;
        const overtrukketDager = ubrukteDager * -1;

        return {
            kontoType,
            brukteDager,
            ubrukteDager: ubrukteDagerSkalTrekkes ? 0 : ubrukteDager,
            overtrukketDager,
        };
    });

    const antallOvertrukketDager = sumBy(
        kvoter.filter((kvote) => (kvote?.overtrukketDager ?? 0) > 0),
        (kvote) => kvote?.overtrukketDager ?? 0,
    );
    const antallUbrukteDager = sumBy(
        kvoter.filter((kvote) => (kvote?.ubrukteDager ?? 0) > 0),
        (kvote) => kvote?.ubrukteDager ?? 0,
    );
    const antallBrukteDager = sumBy(
        kvoter.filter((kvote) => (kvote?.brukteDager ?? 0) > 0),
        (kvote) => kvote?.brukteDager ?? 0,
    );

    if (antallOvertrukketDager > 0) {
        return (
            <TittelKomponent
                ikon={<ForMyeTidBruktIPlanIkon size="stor" />}
                tittel={
                    <FormattedMessage
                        id="kvote.tittel.forMyeTidIPlan"
                        values={{ varighet: getVarighetString(antallOvertrukketDager, intl) }}
                    />
                }
                beskrivelse={
                    <FormattedMessage
                        id="kvote.enRett.beskrivelse.forMyeTidIPlan"
                        values={{ varighet: getVarighetString(antallOvertrukketDager, intl) }}
                    />
                }
            />
        );
    }

    if (antallUbrukteDager === 0) {
        return (
            <TittelKomponent
                ikon={<AllTidIPlanIkon size="stor" />}
                tittel={<FormattedMessage id="kvote.tittel.allTidIPlan" />}
                beskrivelse={
                    <FormattedMessage
                        id="kvote.enRett.beskrivelse.allTidIPlan"
                        values={{ varighet: getVarighetString(antallBrukteDager, intl) }}
                    />
                }
            />
        );
    }

    return (
        <TittelKomponent
            ikon={<MerTidÅBrukeIPlanIkon size="stor" />}
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
    const { konto, perioder, familiehendelse, modus, navnPåForeldre, forelder } = useKvote();
    const intl = useIntl();

    const dagerBruktAvMorFørFødsel = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FORELDREPENGER_FØR_FØDSEL'),
    );
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

    const barnetErFødt = !!familiehendelse?.fødselsdato;

    const fedreKonto = konto.kontoer.find((k) => k.konto === 'FEDREKVOTE');
    const førFødselKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødreKonto = konto.kontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fellesKonto = konto.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    // Dersom barnet er født skal vi se bortifra ubrukte dager på mor sin "3 uker før fødsel" konto.
    const ubrukteDagerMor =
        mødreKonto && førFødselKonto
            ? mødreKonto.dager + (barnetErFødt ? dagerBruktAvMorFørFødsel : førFødselKonto.dager) - dagerBruktAvMor
            : 0;
    const ubrukteDagerFar = fedreKonto ? fedreKonto.dager - dagerBruktAvFar : 0;
    const ubrukteDagerFelles = fellesKonto ? fellesKonto.dager - dagerFellesBrukt : 0;
    const antallUbrukteDager = sum([ubrukteDagerFar, ubrukteDagerMor, ubrukteDagerFelles]);

    const antallOvertrukketDager =
        sum([ubrukteDagerFar, ubrukteDagerMor, ubrukteDagerFelles].filter((d) => d < 0)) * -1;

    if (antallOvertrukketDager > 0) {
        const beskrivelseMor =
            ubrukteDagerMor < 0
                ? intl.formatMessage(
                      {
                          id: 'kvote.varighet.tilForelder',
                      },
                      { varighet: getVarighetString(ubrukteDagerMor * -1, intl), forelder: navnPåForeldre.mor },
                  )
                : '';
        const beskrivelseFelles =
            ubrukteDagerFelles < 0
                ? intl.formatMessage(
                      { id: 'kvote.varighet.fellesperiode' },
                      { varighet: getVarighetString(ubrukteDagerFelles * -1, intl) },
                  )
                : '';
        const beskrivelseFar =
            ubrukteDagerFar < 0
                ? intl.formatMessage(
                      {
                          id: 'kvote.varighet.tilForelder',
                      },
                      {
                          varighet: getVarighetString(ubrukteDagerFar * -1, intl),
                          navnPåForeldre: navnPåForeldre.farMedmor,
                      },
                  )
                : '';

        return (
            <TittelKomponent
                ikon={<ForMyeTidBruktIPlanIkon size="stor" />}
                tittel={
                    <FormattedMessage
                        id="kvote.tittel.forMyeTidIPlan"
                        values={{ varighet: getVarighetString(antallOvertrukketDager, intl) }}
                    />
                }
                beskrivelse={
                    <FormattedMessage
                        id="kvote.beskrivelse.forMyeTidIPlan"
                        values={{
                            varighet: formatOppramsing(
                                [beskrivelseFelles, beskrivelseMor, beskrivelseFar].filter(Boolean),
                                intl,
                            ),
                        }}
                    />
                }
            />
        );
    }

    if (antallUbrukteDager === 0) {
        const beskrivelseMor =
            dagerBruktAvMor > 0
                ? intl.formatMessage(
                      {
                          id: 'kvote.varighet.tilForelder',
                      },
                      { varighet: getVarighetString(dagerBruktAvMor, intl), forelder: navnPåForeldre.mor },
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
                      {
                          id: 'kvote.varighet.tilForelder',
                      },
                      { varighet: getVarighetString(dagerBruktAvFar, intl), forelder: navnPåForeldre.farMedmor },
                  )
                : '';

        return (
            <TittelKomponent
                ikon={<AllTidIPlanIkon size="stor" />}
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
        );
    }

    const beskrivelseMor =
        ubrukteDagerMor > 0
            ? intl.formatMessage(
                  {
                      id: 'kvote.varighet.tilForelder',
                  },
                  { varighet: getVarighetString(ubrukteDagerMor, intl), forelder: navnPåForeldre.mor },
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
                  {
                      id: 'kvote.varighet.tilForelder',
                  },
                  { varighet: getVarighetString(ubrukteDagerFar, intl), forelder: navnPåForeldre.farMedmor },
              )
            : '';

    const visInformasjonOmHvordanEndre = modus === 'innsyn';

    const navnPåAnnenForelder = forelder === 'MOR' ? navnPåForeldre.farMedmor : navnPåForeldre.mor;

    return (
        <TittelKomponent
            ikon={<MerTidÅBrukeIPlanIkon size="stor" />}
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
                    {visInformasjonOmHvordanEndre && (
                        <>
                            <FormattedMessage id="kvote.beskrivelse.endre.du" />{' '}
                            <FormattedMessage
                                id="kvote.beskrivelse.endre.annenPart"
                                values={{ forelder: navnPåAnnenForelder }}
                            />
                        </>
                    )}
                </>
            }
        />
    );
};

const TittelKomponent = ({
    tittel,
    beskrivelse,
    ikon,
}: {
    tittel: ReactNode;
    beskrivelse: ReactNode;
    ikon: ReactNode;
}) => {
    const { visStatusIkoner } = useKvote();
    return (
        <ExpansionCard.Header>
            <HStack wrap={false} gap="4" align="start">
                {visStatusIkoner ? ikon : null}
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

    const relevantePerioder = perioder.filter((p) => {
        // I planlegger og søknad brukes denne kontoen på periodene.
        const harMatchendeKonto = p.kontoType === 'AKTIVITETSFRI_KVOTE';

        // Perioder som kommer fra søknad i innsyn ligger på foreldrepengerkontoen av en eller annen grunn.
        const harMatchendePeriode = p.kontoType === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT';
        return harMatchendePeriode || harMatchendeKonto;
    });

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
    const { konto, perioder, forelder, visStatusIkoner, navnPåForeldre } = useKvote();
    const fellesKonto = konto.kontoer.find((k) => k.konto === 'FELLESPERIODE');

    if (!fellesKonto) {
        return null;
    }
    const dagerBruktAvDeg = summerDagerIPerioder(
        perioder.filter((p) => p.kontoType === 'FELLESPERIODE' && p.forelder === forelder),
    );
    const dagerBruktAvAnnenPart = summerDagerIPerioder(
        perioder.filter((p) => {
            const somOppholdsÅrsak = p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER';
            // const somFellesperiode = p.kontoType === 'FELLESPERIODE'; // Før fars søknad er vedtatt så vil mors fellesperioder vises uten oppholdsårsak

            return somOppholdsÅrsak;
        }),
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

    const finnIkon = () => {
        if (overtrukketDager > 0) {
            return <ForMyeTidBruktIPlanIkon size="liten" />;
        }
        if (samletBrukteDager === fellesKonto.dager) {
            return <AllTidIPlanIkon size="liten" />;
        }
        return <MerTidÅBrukeIPlanIkon size="liten" />;
    };

    return (
        <VStack gap="4">
            <HStack gap="2" align="center">
                {visStatusIkoner ? finnIkon() : null}
                <BodyShort weight="semibold">
                    {getVarighetString(fellesKonto.dager, intl)} for å dele, fellesperiode
                </BodyShort>
            </HStack>
            <VStack gap="1" className="ml-4">
                <FordelingsBar
                    fordelinger={[
                        {
                            kontoType: forelder === 'MOR' ? 'MØDREKVOTE' : 'FEDREKVOTE',
                            prosent: prosentBruktAvDeg,
                        },
                        {
                            kontoType: forelder === 'FAR_MEDMOR' ? 'MØDREKVOTE' : 'FEDREKVOTE',
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
                                { id: 'kvote.varighet.fellesperiode.forelder' },
                                {
                                    varighet: getVarighetString(dagerBruktAvDeg, intl),
                                    forelder: forelder === 'MOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor,
                                },
                            ),
                            intl.formatMessage(
                                { id: 'kvote.varighet.fellesperiode.forelder' },
                                {
                                    varighet: getVarighetString(dagerBruktAvAnnenPart, intl),
                                    forelder: forelder !== 'MOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor,
                                },
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

const StandardVisning = ({ konto, perioder }: { konto?: KontoDto; perioder: SaksperiodeNy[] }) => {
    const intl = useIntl();
    const { visStatusIkoner, familiehendelse } = useKvote();

    if (!konto) {
        return null;
    }

    // Dersom barnet er født vil ubrukte dager på mor sin "3 uker før fødsel" konto utløpe og ikke kunne brukes.
    const ubrukteDagerErUtløpt = konto.konto === 'FORELDREPENGER_FØR_FØDSEL' && !!familiehendelse?.fødselsdato;

    const dagerBrukt = summerDagerIPerioder(perioder);
    const ubrukteDager = konto.dager - dagerBrukt;
    const overtrukketDager = ubrukteDager * -1;
    const prosentBruktAvkvote = Math.floor((dagerBrukt / konto.dager) * 100);
    const prosentOvertrukketKvote = Math.floor((konto.dager / dagerBrukt) * 100);

    const finnIkon = () => {
        if (overtrukketDager > 0) {
            return <ForMyeTidBruktIPlanIkon size="liten" />;
        }
        if (dagerBrukt === konto.dager || ubrukteDagerErUtløpt) {
            return <AllTidIPlanIkon size="liten" />;
        }
        return <MerTidÅBrukeIPlanIkon size="liten" />;
    };

    return (
        <VStack gap="4">
            <HStack gap="2" align="center">
                {visStatusIkoner ? finnIkon() : null}
                <BodyShort weight="semibold">
                    <VisningsnavnForKvote kontoType={konto.konto} />
                    {' - '}
                    {getVarighetString(konto.dager, intl)}
                </BodyShort>
            </HStack>
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
                                erUtløpt: ubrukteDagerErUtløpt,
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
                        ubrukteDager > 0 && ubrukteDagerErUtløpt
                            ? `${getVarighetString(ubrukteDager, intl)} har falt bort`
                            : '',
                        ubrukteDager > 0 && !ubrukteDagerErUtløpt
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

const VisningsnavnForKvote = ({ kontoType }: { kontoType: KontoDto['konto'] }) => {
    switch (kontoType) {
        case 'AKTIVITETSFRI_KVOTE':
            return <FormattedMessage id="kvote.konto.Aktivitetsfrikvote" />;
        case 'FEDREKVOTE':
            return <FormattedMessage id="kvote.konto.Fedrekvote" />;
        case 'MØDREKVOTE':
            return <FormattedMessage id="kvote.konto.Mødrekvote" />;
        case 'FORELDREPENGER_FØR_FØDSEL':
            return <FormattedMessage id="kvote.konto.ForeldrepengerFørFødsel" />;
        case 'FORELDREPENGER':
            return <FormattedMessage id="kvote.konto.Foreldrepenger" />;
        case 'FELLESPERIODE':
            return <FormattedMessage id="kvote.konto.Fellesperioder" />;
    }
};

const FordelingsBar = ({ fordelinger }: { fordelinger: FordelingSegmentProps[] }) => {
    return (
        <HGrid
            columns={fordelinger
                .filter((f) => f.prosent > 0)
                .map((f) => `${f.prosent}% `)
                .join('')}
        >
            {fordelinger.map((fordeling) => (
                <FordelingSegment key={Object.values(fordeling).join('-')} {...fordeling} />
            ))}
        </HGrid>
    );
};

type FordelingSegmentProps = {
    kontoType?: KontoDto['konto'];
    prosent: number;
    erFyllt?: boolean;
    erOvertrukket?: boolean;
    erUtløpt?: boolean;
};
const FordelingSegment = ({
    kontoType,
    prosent,
    erFyllt = true,
    erOvertrukket = false,
    erUtløpt,
}: FordelingSegmentProps) => {
    const { forelder } = useKvote();
    if (prosent <= 0) {
        return null;
    }

    if (erOvertrukket) {
        return <div className={`first:rounded-l-lg last:rounded-r-lg h-4 border-2 bg-red-300 border-red-300`} />;
    }

    if (erUtløpt) {
        return <div className={`first:rounded-l-lg last:rounded-r-lg h-4 border-2 bg-gray-300 border-gray-300`} />;
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
                    className={`first:rounded-l-lg last:rounded-r-lg h-4 border-2 ${erFyllt ? 'bg-blue-400' : 'bg-bg-default'} border-blue-400`}
                />
            );
        }
        if (kontoType === 'FEDREKVOTE') {
            return (
                <div
                    className={`first:rounded-l-lg last:rounded-r-lg h-4 border-2 ${erFyllt ? 'bg-green-200' : 'bg-bg-default'} border-green-200`}
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
                className={`first:rounded-l-lg last:rounded-r-lg h-4 border-2 ${erFyllt ? 'bg-green-400' : 'bg-bg-default'} border-green-400`}
            />
        );
    }
    if (kontoType === 'MØDREKVOTE' || kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return (
            <div
                className={`first:rounded-l-lg last:rounded-r-lg h-4 border-2 ${erFyllt ? 'bg-deepblue-200' : 'bg-bg-default'} border-deepblue-200`}
            />
        );
    }

    return (
        <div className="first:rounded-l-lg last:rounded-r-lg h-4 border-2 bg-bg-default border-surface-neutral-hover" />
    );
};

type IkonProps = { size: 'stor' | 'liten' };
const AllTidIPlanIkon = ({ size }: IkonProps) => (
    <div className="rounded-full bg-surface-success-subtle">
        <CheckmarkIcon fontSize={size === 'stor' ? '2.5rem' : '1.5rem'} className="text-icon-success p-1" aria-hidden />
    </div>
);

const MerTidÅBrukeIPlanIkon = ({ size }: IkonProps) => (
    <div className="rounded-full bg-surface-selected">
        <CircleBrokenIcon
            fontSize={size === 'stor' ? '2.5rem' : '1.5rem'}
            className="text-text-action p-1"
            aria-hidden
        />
    </div>
);

const ForMyeTidBruktIPlanIkon = ({ size }: IkonProps) => (
    <div className="rounded-full bg-surface-danger-subtle">
        <ExclamationmarkIcon
            fontSize={size === 'stor' ? '2.5rem' : '1.5rem'}
            className="text-text-danger p-05"
            aria-hidden
        />
    </div>
);

const finnAntallDagerÅTrekke = (periode: SaksperiodeNy) => {
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
