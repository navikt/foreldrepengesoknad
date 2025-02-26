import { BandageFillIcon, HeartFillIcon, ParasolBeachFillIcon, PersonPregnantFillIcon } from '@navikt/aksel-icons';

import { BodyShort, HStack, Heading, Table, VStack } from '@navikt/ds-react';

import { formatDateShortMonth, treUkerSiden } from '@navikt/fp-utils';

import { Tilretteleggingstype } from '../../types/ArbeidsforholdSVP';
import { SvangerskapspengeSak } from '../../types/SvangerskapspengeSak';

type SvangerskapspengerProps = {
    svpSak: SvangerskapspengeSak;
};
export const Svangerskapspenger = ({ svpSak }: SvangerskapspengerProps) => {
    return <SvpVedtak svpSak={svpSak} />;
};

const SvpVedtak = ({ svpSak }: SvangerskapspengerProps) => {
    const arbeidsforhold = svpSak.åpenBehandling?.søknad.arbeidsforhold ?? svpSak.gjeldendeVedtak?.arbeidsforhold;
    const terminDato = svpSak.familiehendelse?.termindato; // TODO: kan denne faktisk være null?
    if (!arbeidsforhold || !terminDato) {
        return null;
    }

    const perioder = arbeidsforhold
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
        .sort((a, b) => new Date(a.fom) - new Date(b.fom));

    return (
        <VStack>
            <Heading level="2" size="medium">
                Dette har du fått vedtatt
            </Heading>
            <Table className="bg-white">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Bedrift</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {perioder.map((p) => (
                        <Table.Row className="whitespace-nowrap">
                            <Table.HeaderCell scope="row">
                                {formatDateShortMonth(p.fom)} - {formatDateShortMonth(p.tom)}
                            </Table.HeaderCell>
                            <Table.DataCell>{p.aktivitet.arbeidsgiver.id}</Table.DataCell>
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
                        <Table.HeaderCell scope="row">{formatDateShortMonth(terminDato)}</Table.HeaderCell>
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
        <HStack gap="4" align="center" justify="space-between" className="pt-2 pb-2 pl-4 pr-4 bg-green-100 rounded-3xl">
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
            <BodyShort>Du kan søke om foreldrepenger (Du har rett til foreldrepenger tre uker før termin</BodyShort>
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
