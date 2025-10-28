import { CheckmarkIcon, CircleBrokenIcon, ExclamationmarkIcon } from '@navikt/aksel-icons';
import { sum, sumBy } from 'lodash';
import { ReactNode, createContext, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HGrid, HStack, VStack } from '@navikt/ds-react';

import { Forelder, NavnPåForeldre } from '@navikt/fp-common';
import {
    BrukerRolleSak_fpoversikt,
    Familiehendelse_fpoversikt,
    KontoBeregningDto,
    KontoDto,
    KontoTypeUttak,
    RettighetType_fpoversikt,
    SaksperiodeNy,
    UttakOppholdÅrsak_fpoversikt,
    UttaksplanModus,
} from '@navikt/fp-types';
import { TidsperiodenString, formatOppramsing } from '@navikt/fp-utils';

import { useUttaksplanData } from './context/UttaksplanDataContext';
import { useUttaksplan } from './context/useUttaksplan';
import { Planperiode } from './types/Planperiode';
import { getVarighetString } from './utils/dateUtils';
import { isUttaksperiodeAnnenpartEøs } from './utils/periodeUtils';

//TODO (TOR) Fjern denne wrapperen og skriv om story
export const KvoteOppsummeringWrapper = (props: {
    saksperioder: SaksperiodeNy[];
    rettighetType: FpSak['rettighetType'];
    visStatusIkoner: boolean;
}) => {
    const { familiesituasjon, valgtStønadskonto, navnPåForeldre, erFarEllerMedmor, modus, erMedmorDelAvSøknaden } =
        useUttaksplanData();

    const uttaksplan = useUttaksplan(props.saksperioder);

    return (
        <KvoteOppsummering
            konto={valgtStønadskonto}
            perioder={uttaksplan}
            rettighetType={props.rettighetType}
            forelder={erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor}
            visStatusIkoner={props.visStatusIkoner}
            familiesituasjon={familiesituasjon}
            navnPåForeldre={navnPåForeldre}
            modus={modus}
            erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
        />
    );
};

type Props = {
    konto: KontoBeregningDto;
    perioder: Planperiode[];
    rettighetType: RettighetType_fpoversikt;
    forelder: BrukerRolleSak_fpoversikt;
    visStatusIkoner: boolean;
    familiehendelse?: Familiehendelse_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
    modus: UttaksplanModus;
    erMedmorDelAvSøknaden?: boolean;
};
const KvoteContext = createContext<Props | null>(null);

const useKvote = () => {
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
                    <VStack gap="space-16">
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
    const { konto, perioder, familiesituasjon, modus } = useKvote();
    const intl = useIntl();
    const kvoter = ['FORELDREPENGER_FØR_FØDSEL', 'FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'].map((kontoType) => {
        const aktuellKonto = konto.kontoer.find((k) => k.konto === kontoType);
        if (!aktuellKonto) {
            return null;
        }

        const ubrukteDagerSkalTrekkes = kontoType === 'FORELDREPENGER_FØR_FØDSEL' && familiesituasjon === 'fødsel';
        const brukteDager = summerDagerIPerioder(
            perioder.filter((p) => {
                // Aktivitetsfri kvote har spesialhåndtering
                if (kontoType === 'AKTIVITETSFRI_KVOTE') {
                    // I planlegger og søknad brukes denne kontoen på periodene.
                    const harMatchendeKonto = getUttaksKontoType(p) === 'AKTIVITETSFRI_KVOTE';

                    // Perioder som kommer fra søknad i innsyn ligger på foreldrepengerkontoen av en eller annen grunn.
                    const harMatchendePeriode =
                        getUttaksKontoType(p) === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT';
                    return harMatchendePeriode || harMatchendeKonto;
                }

                // Disse periodene skal kun telles for aktivitetsfri kvoter
                if (getUttaksKontoType(p) === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT') {
                    return false;
                }

                return kontoType === getUttaksKontoType(p);
            }),
            konto.kontoer,
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
            beskrivelse={modus === 'innsyn' ? <FormattedMessage id="kvote.beskrivelse.endre.du" /> : null}
        />
    );
};

const KvoteTittel = () => {
    const { konto, perioder, familiesituasjon, modus, navnPåForeldre, forelder } = useKvote();
    const intl = useIntl();

    const dagerBruktAvMorFørFødsel = summerDagerIPerioder(
        perioder.filter((p) => getUttaksKontoType(p) === 'FORELDREPENGER_FØR_FØDSEL'),
        konto.kontoer,
    );
    const dagerBruktAvMor = summerDagerIPerioder(
        perioder.filter(
            (p) =>
                getUttaksKontoType(p) === 'FORELDREPENGER_FØR_FØDSEL' ||
                getUttaksKontoType(p) === 'MØDREKVOTE' ||
                p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER',
        ),
        konto.kontoer,
    );
    const dagerBruktAvFar = summerDagerIPerioder(
        perioder.filter(
            (p) => getUttaksKontoType(p) === 'FEDREKVOTE' || p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER',
        ),
        konto.kontoer,
    );
    const dagerFellesBrukt = summerDagerIPerioder(
        perioder.filter(
            (p) => getUttaksKontoType(p) === 'FELLESPERIODE' || p.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER',
        ),
        konto.kontoer,
    );

    const barnetErFødt = familiesituasjon === 'fødsel';

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
                          forelder: navnPåForeldre.farMedmor,
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
            <HStack wrap={false} gap="space-16" align="start">
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

    const relevantePerioder = perioder.filter((p) => getUttaksKontoType(p) === 'FORELDREPENGER_FØR_FØDSEL');
    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const KunEnHarForeldrepengeKvoter = () => {
    const { konto, perioder } = useKvote();
    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FORELDREPENGER');
    const relevantePerioder = perioder.filter(
        (p) => getUttaksKontoType(p) === 'FORELDREPENGER' && p.morsAktivitet !== 'IKKE_OPPGITT',
    );

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const FedreKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantKonto = konto.kontoer.find((k) => k.konto === 'FEDREKVOTE');
    const relevantePerioder = perioder.filter(
        (p) => getUttaksKontoType(p) === 'FEDREKVOTE' || p.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER',
    );

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const AktivitetsfriKvoter = () => {
    const { konto, perioder } = useKvote();
    const relevantKonto = konto.kontoer.find((k) => k.konto === 'AKTIVITETSFRI_KVOTE');

    const relevantePerioder = perioder.filter((p) => {
        // I planlegger og søknad brukes denne kontoen på periodene.
        const harMatchendeKonto = getUttaksKontoType(p) === 'AKTIVITETSFRI_KVOTE';

        // Perioder som kommer fra søknad i innsyn ligger på foreldrepengerkontoen av en eller annen grunn.
        const harMatchendePeriode = getUttaksKontoType(p) === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT';
        return harMatchendePeriode || harMatchendeKonto;
    });

    return <StandardVisning perioder={relevantePerioder} konto={relevantKonto} />;
};

const MødreKvoter = () => {
    const { konto, perioder } = useKvote();

    const relevantKonto = konto.kontoer.find((k) => k.konto === 'MØDREKVOTE');
    const relevantePerioder = perioder.filter(
        (p) => getUttaksKontoType(p) === 'MØDREKVOTE' || p.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER',
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
        perioder.filter((p) => getUttaksKontoType(p) === 'FELLESPERIODE' && p.forelder === forelder),
        konto.kontoer,
    );
    const dagerBruktAvAnnenPart = summerDagerIPerioder(
        perioder.filter((p) => getUttaksKontoType(p) === 'FELLESPERIODE' && p.forelder !== forelder),
        konto.kontoer,
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
        <VStack gap="space-16">
            <HStack gap="space-8" align="center">
                {visStatusIkoner ? finnIkon() : null}
                <BodyShort weight="semibold">
                    {getVarighetString(fellesKonto.dager, intl)} for å dele, fellesperiode
                </BodyShort>
            </HStack>
            <VStack gap="space-4" className="ml-4">
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
                                    forelder: forelder === 'MOR' ? navnPåForeldre.farMedmor : navnPåForeldre.mor,
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
    const { visStatusIkoner, familiesituasjon, erMedmorDelAvSøknaden } = useKvote();

    if (!konto) {
        return null;
    }

    // Dersom barnet er født vil ubrukte dager på mor sin "3 uker før fødsel" konto utløpe og ikke kunne brukes.
    const ubrukteDagerErUtløpt = konto.konto === 'FORELDREPENGER_FØR_FØDSEL' && familiesituasjon === 'fødsel';

    const dagerBrukt = summerDagerIPerioder(perioder, [konto]);
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
        <VStack gap="space-16">
            <HStack gap="space-8" align="center">
                {visStatusIkoner ? finnIkon() : null}
                <BodyShort weight="semibold">
                    <VisningsnavnForKvote kontoType={konto.konto} erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} />
                    {' - '}
                    {getVarighetString(konto.dager, intl)}
                </BodyShort>
            </HStack>
            <VStack gap="space-4" className="ml-4">
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

const VisningsnavnForKvote = ({
    kontoType,
    erMedmorDelAvSøknaden,
}: {
    kontoType: KontoTypeUttak;
    erMedmorDelAvSøknaden?: boolean;
}) => {
    switch (kontoType) {
        case 'AKTIVITETSFRI_KVOTE':
            return <FormattedMessage id="kvote.konto.Aktivitetsfrikvote" />;
        case 'FEDREKVOTE':
            return erMedmorDelAvSøknaden ? (
                <FormattedMessage id="kvote.konto.Medmorkvote" />
            ) : (
                <FormattedMessage id="kvote.konto.Fedrekvote" />
            );
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
    kontoType?: KontoTypeUttak;
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
        return (
            <div
                className={`bg-ax-danger-400 border-ax-danger-400 h-4 border-2 first:rounded-l-lg last:rounded-r-lg`}
            />
        );
    }

    if (erUtløpt) {
        return (
            <div
                className={`bg-ax-neutral-400 border-ax-neutral-400 h-4 border-2 first:rounded-l-lg last:rounded-r-lg`}
            />
        );
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
                    className={`h-4 border-2 first:rounded-l-lg last:rounded-r-lg ${erFyllt ? 'bg-ax-accent-500' : 'bg-ax-bg-default'} border-ax-accent-500`}
                />
            );
        }
        if (kontoType === 'FEDREKVOTE') {
            return (
                <div
                    className={`h-4 border-2 first:rounded-l-lg last:rounded-r-lg ${erFyllt ? 'bg-ax-success-300' : 'bg-ax-bg-default'} border-ax-success-300`}
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
                className={`h-4 border-2 first:rounded-l-lg last:rounded-r-lg ${erFyllt ? 'bg-ax-success-500' : 'bg-ax-bg-default'} border-ax-success-500`}
            />
        );
    }
    if (kontoType === 'MØDREKVOTE' || kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return (
            <div
                className={`h-4 border-2 first:rounded-l-lg last:rounded-r-lg ${
                    erFyllt ? 'bg-ax-brand-blue-300' : 'bg-ax-bg-default'
                } border-ax-brand-blue-300`}
            />
        );
    }

    return (
        <div className="bg-ax-bg-default border-ax-bg-neutral-strong-hover h-4 border-2 first:rounded-l-lg last:rounded-r-lg" />
    );
};

type IkonProps = { size: 'stor' | 'liten' };
const AllTidIPlanIkon = ({ size }: IkonProps) => (
    <div className="bg-ax-bg-success-moderate rounded-full">
        <CheckmarkIcon
            fontSize={size === 'stor' ? '2.5rem' : '1.5rem'}
            className="text-ax-text-success-decoration p-1"
            aria-hidden
        />
    </div>
);

const MerTidÅBrukeIPlanIkon = ({ size }: IkonProps) => (
    <div className="bg-ax-bg-accent-moderate rounded-full">
        <CircleBrokenIcon
            fontSize={size === 'stor' ? '2.5rem' : '1.5rem'}
            className="text-ax-text-accent-subtle p-1"
            aria-hidden
        />
    </div>
);

const ForMyeTidBruktIPlanIkon = ({ size }: IkonProps) => (
    <div className="bg-ax-bg-danger-moderate rounded-full">
        <ExclamationmarkIcon
            fontSize={size === 'stor' ? '2.5rem' : '1.5rem'}
            className="text-ax-text-danger-subtle p-05"
            aria-hidden
        />
    </div>
);

const finnAntallDagerÅTrekke = (periode: SaksperiodeNy) => {
    if (periode.trekkdager !== undefined) {
        return periode.trekkdager;
    }

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

const getStønadskontoTypeFromOppholdÅrsakType = (årsak: UttakOppholdÅrsak_fpoversikt): KontoTypeUttak | undefined => {
    switch (årsak) {
        case 'FEDREKVOTE_ANNEN_FORELDER':
            return 'FEDREKVOTE';
        case 'FELLESPERIODE_ANNEN_FORELDER':
            return 'FELLESPERIODE';
        case 'MØDREKVOTE_ANNEN_FORELDER':
            return 'MØDREKVOTE';
        case 'FORELDREPENGER_ANNEN_FORELDER':
            return 'FORELDREPENGER';
        default:
            return undefined;
    }
};

const summerDagerIPerioder = (perioder: SaksperiodeNy[], konto: KontoDto[]) => {
    const aktuelleKontotyper = new Set(
        perioder.map((p) => {
            if (p.oppholdÅrsak) {
                return getStønadskontoTypeFromOppholdÅrsakType(p.oppholdÅrsak);
            }

            return getUttaksKontoType(p);
        }),
    );

    if (aktuelleKontotyper === undefined) {
        return 0;
    }

    let dagerTotalt = 0;

    for (const aktuellKontoType of aktuelleKontotyper) {
        const gjeldendeKonto = konto.find((k) => k.konto === aktuellKontoType);

        if (!gjeldendeKonto) {
            continue;
        }

        const dagerEøs = Math.min(
            sum(
                perioder
                    .filter((p) => isUttaksperiodeAnnenpartEøs(p) && getUttaksKontoType(p) === aktuellKontoType)
                    .map(finnAntallDagerÅTrekke),
            ),
            gjeldendeKonto.dager,
        );
        const dagerNorge = sum(
            perioder
                .filter((p) => !isUttaksperiodeAnnenpartEøs(p) && getUttaksKontoType(p) === aktuellKontoType)
                .map(finnAntallDagerÅTrekke),
        );
        dagerTotalt += dagerEøs + dagerNorge;
    }

    return Math.floor(dagerTotalt);
};

const getUttaksKontoType = (p: SaksperiodeNy): KontoTypeUttak | undefined => {
    if (p.kontoType === 'FORELDREPENGER' && p.morsAktivitet === 'IKKE_OPPGITT') {
        return 'AKTIVITETSFRI_KVOTE';
    }

    return p.kontoType;
};
