import { FellesUttaksplanDto, FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { erLikUansettRekkefølge } from '@navikt/fp-utils';

// Mellomlagringa blir ugyldig berre når felt som søknaden faktisk brukar er endra.
// Vi plukkar ut felta eksplisitt (allowlist) i staden for å fjerne kjende ubrukte felt,
// slik at nye eller fjerna felt i backend-kontrakten ikkje kastar ut brukarar med
// «grunnlaget er endret». Nøsta objekt (t.d. barn og arbeidsforhold) blir framleis
// samanlikna i sin heilskap.
// Perioder i vedtak/søknad er ikkje med her: dei blir dekte av samanlikninga av fellesUttaksplan.
const relevanteSaksfelt = (sak: FpSak_fpoversikt) => ({
    saksnummer: sak.saksnummer,
    sakTilhørerMor: sak.sakTilhørerMor,
    sakAvsluttet: sak.sakAvsluttet,
    kanSøkeOmEndring: sak.kanSøkeOmEndring,
    gjelderAdopsjon: sak.gjelderAdopsjon,
    familiehendelse: sak.familiehendelse,
    annenPart: sak.annenPart,
    barn: sak.barn,
    dekningsgrad: sak.dekningsgrad,
    rettighetType: sak.rettighetType,
    morUføretrygd: sak.morUføretrygd,
    harAnnenForelderTilsvarendeRettEØS: sak.harAnnenForelderTilsvarendeRettEØS,
    ønskerJustertUttakVedFødsel: sak.ønskerJustertUttakVedFødsel,
    harGjeldendeVedtak: sak.gjeldendeVedtak !== undefined,
});

const relevanteSøkerInfoFelt = (søkerInfo: FpPersonopplysningerDto_fpoversikt) => ({
    fnr: søkerInfo.fnr,
    fødselsdato: søkerInfo.fødselsdato,
    kjønn: søkerInfo.kjønn,
    navn: søkerInfo.navn,
    erGift: søkerInfo.erGift,
    barn: søkerInfo.barn,
    arbeidsforhold: søkerInfo.arbeidsforhold,
    frilansoppdrag: søkerInfo.frilansoppdrag,
    selvstendigNæring: søkerInfo.selvstendigNæring,
});

export const erSakerEndret = (lagredeSaker: FpSak_fpoversikt[], ferskeSaker: FpSak_fpoversikt[]) =>
    !erLikUansettRekkefølge(lagredeSaker.map(relevanteSaksfelt), ferskeSaker.map(relevanteSaksfelt));

export const erSøkerInfoEndret = (
    lagretSøkerInfo: FpPersonopplysningerDto_fpoversikt,
    ferskSøkerInfo: FpPersonopplysningerDto_fpoversikt,
) =>
    !erLikUansettRekkefølge(
        relevanteSøkerInfoFelt({
            ...lagretSøkerInfo,
            // frilansoppdrag/selvstendigNæring kan mangle på lagra søkerInfo dersom mellomlagringa vart gjort
            // før desse felta fanst i kontrakten. Då fell vi tilbake på ferske data i staden for å be brukaren
            // starte på nytt berre fordi den lagra søknaden manglar felt ho aldri fekk høve til å ha.
            frilansoppdrag: lagretSøkerInfo.frilansoppdrag ?? ferskSøkerInfo.frilansoppdrag ?? [],
            selvstendigNæring: lagretSøkerInfo.selvstendigNæring ?? ferskSøkerInfo.selvstendigNæring ?? [],
        }),
        relevanteSøkerInfoFelt(ferskSøkerInfo),
    );

type UttakIFellesUttaksplan = NonNullable<FellesUttaksplanDto['perioder'][number]['søker']>;

// TODO: Mellombels, saman med fjernAnnetGraderingsaktivitetFraMellomlagring. Mellomlagra 'ANNET' blir gjort om
// til at aktivitet manglar, medan backend kan sende aktivitet: null. Vi ser difor bort frå null her, slik at
// mellomlagra søknader ikkje blir forkasta berre på grunn av den overgangen.
const utanNullAktivitet = (uttak: UttakIFellesUttaksplan | undefined): UttakIFellesUttaksplan | undefined => {
    if (!uttak?.gradering || (uttak.gradering.aktivitet as unknown) !== null) {
        return uttak;
    }
    return { ...uttak, gradering: { arbeidstidprosent: uttak.gradering.arbeidstidprosent } };
};

const normaliserFellesUttaksplan = (plan: FellesUttaksplanDto): FellesUttaksplanDto => ({
    ...plan,
    perioder: plan.perioder.map((periode) => ({
        ...periode,
        søker: utanNullAktivitet(periode.søker),
        annenPart: utanNullAktivitet(periode.annenPart),
    })),
});

export const erFellesUttaksplanEndret = (
    lagretPlan: FellesUttaksplanDto,
    ferskPlan: FellesUttaksplanDto | undefined,
) =>
    ferskPlan === undefined ||
    !erLikUansettRekkefølge(normaliserFellesUttaksplan(lagretPlan), normaliserFellesUttaksplan(ferskPlan));
