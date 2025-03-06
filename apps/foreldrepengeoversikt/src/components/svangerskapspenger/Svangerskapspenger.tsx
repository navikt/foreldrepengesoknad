import {
    BandageFillIcon,
    HeartFillIcon,
    ParasolBeachFillIcon,
    PersonPregnantFillIcon,
    StrollerFillIcon,
} from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import React from 'react';

import { BodyShort, HGrid, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import {
    TidsperiodenString,
    capitalizeFirstLetter,
    capitalizeFirstLetterInEveryWordOnly,
    formatDateMedUkedag,
    formatDateShortMonth,
    treUkerSiden,
} from '@navikt/fp-utils';

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
                    <React.Fragment key={gruppertePerioder[0].fom}>
                        <GruppertePerioder perioder={gruppertePerioder} />
                        <div className="    h-[1] bg-border-divider" />
                    </React.Fragment>
                ))}
                <HGrid gap="2" columns={{ md: '1fr 1fr 300px' }} align="center">
                    <BodyShort>
                        {formatDateShortMonth(treUkerSiden(terminDato))} - {formatDateShortMonth(terminDato)}
                    </BodyShort>
                    <BodyShort> </BodyShort>
                    <TreUkerFørTermin />
                </HGrid>
                <div className="h-[1] bg-border-divider" />
                <HGrid gap="2" columns={{ md: '1fr 1fr 300px' }} align="center">
                    <BodyShort>{capitalizeFirstLetter(formatDateMedUkedag(terminDato))}</BodyShort>
                    <BodyShort> </BodyShort>
                    <Termin />
                </HGrid>
            </VStack>
        </VStack>
    );
};

const GruppertePerioder = ({ perioder }: { perioder: ReturnType<typeof lagKronologiskeSvpPerioder> }) => {
    return (
        <HGrid gap="2" columns={{ xs: '1fr 40px', md: '1fr 1fr 300px' }} align="center">
            {perioder.map((p, index) => {
                const arbeidsgiverNavn =
                    capitalizeFirstLetterInEveryWordOnly(p.aktivitet.arbeidsgiverNavn) ?? p.aktivitet.arbeidsgiver.id;
                const dato = index === 0 ? `${formatDateShortMonth(p.fom)} - ${formatDateShortMonth(p.tom)}` : '';
                const prosentSvangerskapspenger =
                    p.type === 'HEL' ? 0 : p.type === 'INGEN' ? 100 : 100 - (p.arbeidstidprosent ?? 0);

                return (
                    <React.Fragment key={p.aktivitet.arbeidsgiverNavn}>
                        <Show above="md" asChild>
                            <div className="contents">
                                <BodyShort className="whitespace-nowrap">{dato}</BodyShort>
                                <BodyShort>{arbeidsgiverNavn}</BodyShort>
                                {p.type && (
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
                                )}
                                {p.årsak === 'FERIE' && <DuHarFerie />}
                                {p.årsak === 'SYKEPENGER' && <DuErSykemeldt />}
                            </div>
                        </Show>
                        <Show below="md" asChild>
                            <div className="contents">
                                <BodyShort className="col-span-2">{dato}</BodyShort>
                                <VStack>
                                    <strong>{arbeidsgiverNavn}</strong>
                                    <BodyShort>
                                        {p.type && `${prosentSvangerskapspenger}% svangerskapspenger`}
                                        {p.årsak === 'FERIE' && 'Ferie'}
                                        {p.årsak === 'SYKEPENGER' && 'Sykepenger'}
                                    </BodyShort>
                                </VStack>
                                {p.type && <GravidIkon />}
                                {p.årsak === 'FERIE' && <ParasollIkon />}
                                {p.årsak === 'SYKEPENGER' && <BandasjeIkon />}
                            </div>
                        </Show>
                    </React.Fragment>
                );
            })}
        </HGrid>
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
    <div className="rounded-3xl bg-orange-200 justify-self-end">
        <BandageFillIcon fontSize={'2.5rem'} className=" text-orange-500 p-05" aria-hidden />
    </div>
);

const ParasollIkon = () => (
    <div className="rounded-3xl bg-orange-200 justify-self-end">
        <ParasolBeachFillIcon fontSize={'2.5rem'} className=" text-orange-500 p-05" aria-hidden />
    </div>
);

const GravidIkon = () => (
    <div className="rounded-3xl bg-green-200 justify-self-end">
        <PersonPregnantFillIcon fontSize={'2.5rem'} className=" text-surface-success p-05" aria-hidden />
    </div>
);

const BarnevognIkon = () => (
    <div className="rounded-3xl bg-purple-100 justify-self-end">
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
            if (p.tom === nestePeriode.tom) return false;
            return TidsperiodenString(p).inneholderDato(nestePeriode.tom);
        });
        const intersekterMedAnnenPeriode = index !== -1 ? perioderÅBruke.splice(index, 1)[0] : undefined;

        if (intersekterMedAnnenPeriode) {
            // Hvis nestePeriode ikke overlapper med annen periode
            const overlapperIkke =
                dayjs(nestePeriode.fom).isSameOrAfter(intersekterMedAnnenPeriode.fom) &&
                dayjs(nestePeriode.tom).isSameOrBefore(intersekterMedAnnenPeriode.tom);
            const a = {
                ...nestePeriode,
                tom: dayjs(intersekterMedAnnenPeriode.fom).subtract(1, 'day').format('YYYY-MM-DD'),
            };
            const b = {
                ...nestePeriode,
                fom: intersekterMedAnnenPeriode.fom,
            };

            const c = {
                ...intersekterMedAnnenPeriode,
                tom: nestePeriode.tom,
            };
            const d = {
                ...intersekterMedAnnenPeriode,
                fom: dayjs(nestePeriode.tom).add(1, 'day').format('YYYY-MM-DD'),
            };

            if (overlapperIkke) {
                perioderÅBruke.unshift(nestePeriode, c, d);
            } else {
                perioderÅBruke.unshift(a, b, c, d);
            }
            // perioderÅBruke.unshift(nestePeriode);
        }

        if (!intersekterMedAnnenPeriode) {
            endeligePerioder.push(nestePeriode);
        }

        // failsafe under utvikling
        if (i > 500) {
            console.log(endeligePerioder, i);
            console.log('limit break');
            break;
        }
        i = i + 1;
    }

    return endeligePerioder;
};
