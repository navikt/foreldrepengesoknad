import { BandageFillIcon, HeartFillIcon, ParasolBeachFillIcon, PersonPregnantFillIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';

import { BodyShort, HStack, Heading, Table, VStack } from '@navikt/ds-react';

import {
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

    let perioder = arbeidsforhold
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
    // .sort((a, b) => (a.aktivitet.arbeidsgiverNavn ?? '').localeCompare(b.aktivitet.arbeidsgiverNavn ?? ''));

    let dag = dayjs(
        perioder.reduce((earliest, periode) => {
            return dayjs(periode.fom).isBefore(dayjs(earliest)) ? periode.fom : earliest;
        }, perioder[0]?.fom),
    );

    const sisteDag = perioder.reduce((latest, periode) => {
        return dayjs(periode.tom).isAfter(dayjs(latest)) ? periode.tom : latest;
    }, perioder[0]?.tom);

    test1(svpSak);

    // let res = [];
    // let gruppe = [];
    // let gruppeForrigeDag = [];
    // let perioderCopy = perioder;
    // while (dag.isBefore(sisteDag)) {
    //     console.log('DAG', dayjs(dag).format('YYYY-MM-DD'));
    //     gruppeForrigeDag = [...gruppe];
    //     gruppe = perioderCopy.filter(
    //         (periode) => dag.isSameOrAfter(periode.fom) && dayjs(dag).isSameOrBefore(periode.tom),
    //     );
    //
    //     const varMedIgår = gruppeForrigeDag.filter(
    //         (forrigePeriode) =>
    //             !gruppe.some((periode) => periode.fom === forrigePeriode.fom && periode.tom === forrigePeriode.tom),
    //     );
    //     if (varMedIgår.length > 0) {
    //         const a = gruppeForrigeDag.map((g) => ({ ...g, tom: dag.add(-1, 'day').format('YYYY-MM-DD') }));
    //         res = [...res, [...a]];
    //
    //         // Fjern oppbrukte perioder
    //         perioderCopy = perioderCopy
    //             .filter((p) => !varMedIgår.some((v) => v.fom === p.fom && v.tom === p.tom))
    //             .map((p) => {
    //                 const skalModifisereFom = gruppeForrigeDag.find((g) => g.tom === p.tom && g.fom === p.fom);
    //                 return {
    //                     ...p,
    //                     fom: skalModifisereFom ? dag.format('YYYY-MM-DD') : p.fom,
    //                 };
    //             });
    //         console.log(perioderCopy);
    //     }
    //     dag = dayjs(dag).add(1, 'day');
    // }
    // console.log(res);

    return (
        <VStack>
            <Heading level="2" size="medium" spacing>
                {erVedtatt ? 'Dette har du fått vedtatt' : 'Dette har du søkt om'}
            </Heading>
            <Table className="bg-white p-4">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Bedrift</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {perioder.map((p) => (
                        <Table.Row key={[p.fom, p.tom, p.aktivitet.arbeidsgiverNavn].join('-')}>
                            <Table.HeaderCell scope="row" className="whitespace-nowrap">
                                {formatDateShortMonth(p.fom)} - {formatDateShortMonth(p.tom)}
                            </Table.HeaderCell>
                            <Table.DataCell>
                                {capitalizeFirstLetterInEveryWordOnly(p.aktivitet.arbeidsgiverNavn) ??
                                    p.aktivitet.arbeidsgiver.id}
                            </Table.DataCell>
                            <Table.DataCell>
                                {p.type && <DuHarSvp type={p.type} arbeidstidprosent={p.arbeidstidprosent} />}
                                {p.årsak === 'FERIE' && <DuHarFerie />}
                                {p.årsak === 'SYKEPENGER' && <DuErSykemeldt />}
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                    <Table.Row>
                        <Table.HeaderCell scope="row">
                            {formatDateShortMonth(treUkerSiden(terminDato))} - {formatDateShortMonth(terminDato)}
                        </Table.HeaderCell>
                        <Table.DataCell> </Table.DataCell>
                        <Table.DataCell>
                            <TreUkerFørTermin />
                        </Table.DataCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell scope="row">
                            {capitalizeFirstLetter(formatDateMedUkedag(terminDato))}
                        </Table.HeaderCell>
                        <Table.DataCell> </Table.DataCell>
                        <Table.DataCell>
                            <Termin />
                        </Table.DataCell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </VStack>
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
            className="pt-2 pb-2 pl-4 pr-4 bg-green-100 rounded-3xl"
            wrap={false}
        >
            <BodyShort>Du kan søke om foreldrepenger</BodyShort>
            <GravidIkon />
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

const test1 = (svpSak: SvangerskapspengeSak) => {
    const arbeidsforhold = svpSak.åpenBehandling?.søknad.arbeidsforhold ?? svpSak.gjeldendeVedtak?.arbeidsforhold;
    let perioder = (arbeidsforhold ?? [])
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

    console.log('PERIODER', perioder);

    let res = [];

    perioder.forEach((p1) => {
        perioder.forEach((p2) => {
            if (dayjs(p2.fom).isBefore(p1.fom)) {
                return;
            }

            // p2 krysser p1
            if (dayjs(p2.tom).isBefore(p1.tom)) {
            }
        });
    });
};
