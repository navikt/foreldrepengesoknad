import {
    BandageFillIcon,
    HeartFillIcon,
    ParasolBeachFillIcon,
    PersonPregnantFillIcon,
    StrollerFillIcon,
} from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';

import { BodyShort, HGrid, HStack, Heading, VStack } from '@navikt/ds-react';

import {
    TidsperiodenString,
    capitalizeFirstLetter,
    capitalizeFirstLetterInEveryWordOnly,
    formatDateMedUkedag,
    formatDateShortMonth,
    treUkerSiden,
} from '@navikt/fp-utils';

import { Tilretteleggingstype } from '../../types/ArbeidsforholdSVP';
import { SvangerskapspengeSak } from '../../types/SvangerskapspengeSak';

type SvangerskapspengerProps = {
    svpSak: SvangerskapspengeSak;
};
export const Svangerskapspenger = ({ svpSak }: SvangerskapspengerProps) => {
    const erVedtatt = !svpSak.gjeldendeVedtak?.avslagÅrsak;
    const arbeidsforhold = svpSak.åpenBehandling?.søknad.arbeidsforhold ?? svpSak.gjeldendeVedtak?.arbeidsforhold;
    const terminDato = svpSak.familiehendelse.termindato;

    if (!arbeidsforhold || !terminDato) {
        return null;
    }

    const perioder = lagKronologiskeSvpPerioder(svpSak).sort((a, b) => a.fom.localeCompare(b.fom));

    return (
        <VStack>
            <Heading level="2" size="medium" spacing>
                {erVedtatt ? 'Dette har du fått vedtatt' : 'Dette har du søkt om'}
            </Heading>
            <VStack gap="4" className="bg-white p-4">
                {Object.values(groupBy(perioder, 'fom')).map((gruppertePerioder) => (
                    <>
                        <PeriodeAccordion perioder={gruppertePerioder} />
                        <div className="h-[1] bg-border-divider" />
                    </>
                ))}
                <HGrid gap="2" columns={{ md: '1fr 1fr 300px' }} align="center">
                    <BodyShort>
                        {formatDateShortMonth(treUkerSiden(terminDato))} - {formatDateShortMonth(terminDato)}
                    </BodyShort>
                    <BodyShort> </BodyShort>
                    <BodyShort>
                        <TreUkerFørTermin />
                    </BodyShort>
                </HGrid>
                <div className="h-[1] bg-border-divider" />
                <HGrid gap="2" columns={{ md: '1fr 1fr 300px' }} align="center">
                    <BodyShort>{capitalizeFirstLetter(formatDateMedUkedag(terminDato))}</BodyShort>
                    <BodyShort> </BodyShort>
                    <BodyShort>
                        <Termin />
                    </BodyShort>
                </HGrid>
            </VStack>
        </VStack>
    );
};

const PeriodeAccordion = ({ perioder }: { perioder: ReturnType<typeof lagKronologiskeSvpPerioder> }) => {
    return (
        <HGrid gap="2" columns={{ md: '1fr 1fr 300px' }} align="center">
            {perioder.map((p, index) => (
                <>
                    {index === 0 ? (
                        <BodyShort className="whitespace-nowrap">
                            {formatDateShortMonth(p.fom)} - {formatDateShortMonth(p.tom)}
                        </BodyShort>
                    ) : (
                        <BodyShort> </BodyShort>
                    )}
                    <BodyShort>
                        {capitalizeFirstLetterInEveryWordOnly(p.aktivitet.arbeidsgiverNavn) ??
                            p.aktivitet.arbeidsgiver.id}
                    </BodyShort>
                    <BodyShort>
                        {p.type && <DuHarSvp type={p.type} arbeidstidprosent={p.arbeidstidprosent} />}
                        {p.årsak === 'FERIE' && <DuHarFerie />}
                        {p.årsak === 'SYKEPENGER' && <DuErSykemeldt />}
                    </BodyShort>
                </>
            ))}
        </HGrid>
    );
};

const DuHarSvp = ({ arbeidstidprosent, type }: { arbeidstidprosent?: number; type: Tilretteleggingstype }) => {
    const prosentSvangerskapspenger = type === 'HEL' ? 0 : type === 'INGEN' ? 100 : 100 - (arbeidstidprosent ?? 0);

    return (
        <HStack
            wrap={false}
            gap="4"
            align="center"
            justify="space-between"
            className="pt-2 pb-2 pl-4 pr-4 bg-green-100 rounded-3xl"
        >
            <BodyShort>{prosentSvangerskapspenger}% svangerskapspenger</BodyShort>
            <GravidIkon />
        </HStack>
    );
};

const DuHarFerie = () => {
    return (
        <HStack
            gap="4"
            align="center"
            justify="space-between"
            className="pt-2 pb-2 pl-4 pr-4 bg-orange-100 rounded-3xl"
            wrap={false}
        >
            <BodyShort>Du har ferie</BodyShort>
            <ParasollIkon />
        </HStack>
    );
};

const DuErSykemeldt = () => {
    return (
        <HStack
            gap="4"
            align="center"
            justify="space-between"
            className="pt-2 pb-2 pl-4 pr-4 bg-orange-100 rounded-3xl"
            wrap={false}
        >
            <BodyShort>Du er sykemeldt</BodyShort>
            <BandasjeIkon />
        </HStack>
    );
};

const TreUkerFørTermin = () => {
    return (
        <HStack
            gap="4"
            align="center"
            justify="space-between"
            className="pt-2 pb-2 pl-4 pr-4 bg-purple-50 rounded-3xl"
            wrap={false}
        >
            <BodyShort>Du kan søke om foreldrepenger</BodyShort>
            <BarnevognIkon />
        </HStack>
    );
};

const Termin = () => {
    return (
        <HStack gap="4" align="center" justify="space-between" className="pt-2 pb-2 pl-4 pr-4 bg-red-50 rounded-3xl">
            <BodyShort>Termin</BodyShort>
            <HeartFillIcon fontSize={'2.5rem'} className="text-icon-danger p-05" aria-hidden />
        </HStack>
    );
};

const BandasjeIkon = () => (
    <div className="rounded-3xl bg-orange-200">
        <BandageFillIcon fontSize={'2.5rem'} className=" text-orange-500 p-05" aria-hidden />
    </div>
);

const ParasollIkon = () => (
    <div className="rounded-3xl bg-orange-200">
        <ParasolBeachFillIcon fontSize={'2.5rem'} className=" text-orange-500 p-05" aria-hidden />
    </div>
);

const GravidIkon = () => (
    <div className="rounded-3xl bg-green-200">
        <PersonPregnantFillIcon fontSize={'2.5rem'} className=" text-surface-success p-05" aria-hidden />
    </div>
);

const BarnevognIkon = () => (
    <div className="rounded-3xl bg-purple-100">
        <StrollerFillIcon fontSize={'2.5rem'} className=" text-purple-500 p-05" aria-hidden />
    </div>
);

const lagKronologiskeSvpPerioder = (svpSak: SvangerskapspengeSak) => {
    const arbeidsforhold = svpSak.åpenBehandling?.søknad.arbeidsforhold ?? svpSak.gjeldendeVedtak?.arbeidsforhold;
    const perioder = (arbeidsforhold ?? [])
        .map((af) =>
            [...af.tilrettelegginger, ...af.oppholdsperioder].map((p) => ({
                ...p,
                arbeidstidprosent: 'arbeidstidprosent' in p ? p.arbeidstidprosent : undefined,
                type: 'type' in p ? p.type : undefined,
                årsak: 'årsak' in p ? p.årsak : undefined,
                fom: p.fom,
                tom: p.tom,
                aktivitet: af.aktivitet,
                behovFrom: af.behovFrom,
                avslutningÅrsak: af.avslutningÅrsak,
            })),
        )
        .flat()
        .sort((a, b) => a.fom.localeCompare(b.fom));

    const endeligePerioder = [];
    const perioderÅBruke = [...perioder];
    let i = 0;

    while (perioderÅBruke.length > 0) {
        const nestePeriode = perioderÅBruke.shift();
        if (!nestePeriode) {
            break;
        }

        const index = perioderÅBruke.findIndex((p) => {
            if (p.fom === nestePeriode.fom && p.tom === nestePeriode.tom) return false;
            return TidsperiodenString(p).inneholderDato(nestePeriode.tom);
        });
        const intersekterMedAnnenPeriode = index !== -1 ? perioderÅBruke.splice(index, 1)[0] : undefined;

        if (intersekterMedAnnenPeriode) {
            const a = {
                ...intersekterMedAnnenPeriode,
                tom: nestePeriode.tom,
            };
            const b = {
                ...intersekterMedAnnenPeriode,
                fom: dayjs(nestePeriode.tom).add(1, 'day').format('YYYY-MM-DD'),
            };
            perioderÅBruke.push(a, b);
        }

        if (!intersekterMedAnnenPeriode) {
            endeligePerioder.push(nestePeriode);
        } else {
            perioderÅBruke.unshift(nestePeriode);
        }

        // failsafe under utvikling
        if (i > 50) {
            console.log(endeligePerioder);
            console.log('limit break');
            break;
        }
        i = i + 1;
    }

    return endeligePerioder;
};
