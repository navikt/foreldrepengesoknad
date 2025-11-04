import { PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-constants';
import { RhfForm } from '@navikt/fp-form-hooks';
import { KontoTypeUttak, UtsettelseÅrsakType } from '@navikt/fp-types';
import { formatDate, getFloatFromString } from '@navikt/fp-utils';

import { PanelButtons } from '../../components/panel-buttons/PanelButtons';
import { GraderingSpørsmål } from '../../components/spørsmål/GraderingSpørsmål';
import { KontotypeSpørsmål } from '../../components/spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../../components/spørsmål/SamtidigUttakSpørsmål';
import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { getGradering } from '../../utils/graderingUtils';

type LeggTilPeriodePanelFormValues = {
    kontoType?: KontoTypeUttak;
    forelder: Forelder;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
    hvaVilDuGjøre: 'leggTilPeriode' | 'leggTilOpphold' | 'leggTilFerie' | undefined;
};

interface Props {
    valgtePerioder: Array<{
        fom: string;
        tom: string;
    }>;
    onCancel?: () => void;
    handleAddPeriode: (oppdatertePerioder: Planperiode[]) => void;
}

export const LeggTilPeriodePanel = ({ valgtePerioder, onCancel, handleAddPeriode }: Props) => {
    const { aleneOmOmsorg, familiehendelsedato, valgtStønadskonto } = useUttaksplanData();

    const formMethods = useForm<LeggTilPeriodePanelFormValues>();

    const hvaVilDuGjøre = formMethods.watch('hvaVilDuGjøre');

    const onSubmit = (values: LeggTilPeriodePanelFormValues) => {
        const perioder: Planperiode[] = [];

        for (const element of valgtePerioder) {
            const fomValue = element.fom;
            const tomValue = element.tom;

            const felles = {
                fom: fomValue,
                tom: tomValue,
                readOnly: false,
            };

            if (hvaVilDuGjøre === 'leggTilFerie') {
                perioder.push({
                    ...felles,
                    id: `${fomValue} - ${tomValue} - ${UtsettelseÅrsakType.Ferie}`,
                    forelder: Forelder.mor,
                    utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
                });
            } else if (hvaVilDuGjøre === 'leggTilOpphold') {
                perioder.push({
                    ...felles,
                    id: `${fomValue} - ${tomValue} - ${PeriodeHullType.PERIODE_UTEN_UTTAK}`,
                    forelder: Forelder.mor,
                    periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                });
            } else {
                perioder.push({
                    ...felles,
                    id: `${fomValue} - ${tomValue} - ${values.kontoType}`,
                    kontoType: values.kontoType,
                    forelder: getForelderFromKontoType(values.kontoType, values.forelder),
                    gradering: getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType),
                    samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
                });
            }
        }

        handleAddPeriode(perioder);

        onCancel?.();
    };

    const kanHaFerie = !valgtePerioder.some((p) => erFerieLovlig(p, familiehendelsedato));
    const kanHaFellesperiode = valgtePerioder.some((p) => erFellesperiodeLovlig(p, familiehendelsedato));
    const kanHaForeldrepengerFørFødsel = !valgtePerioder.some(
        (p) =>
            dayjs(p.fom).isBefore(dayjs(familiehendelsedato).startOf('day').subtract(21, 'days')) ||
            dayjs(p.tom).isAfter(dayjs(familiehendelsedato).subtract(1, 'days').startOf('day')),
    );

    const gyldigeKontotyper = valgtStønadskonto.kontoer
        .map((k) => k.konto)
        .filter((kt) => {
            if (kt === 'FORELDREPENGER_FØR_FØDSEL') {
                return kanHaForeldrepengerFørFødsel;
            }
            if (kt === 'FELLESPERIODE') {
                return kanHaFellesperiode;
            }
            return kanHaFerie;
        });

    return (
        <Box.New
            borderWidth="1"
            borderRadius="4"
            borderColor="neutral-subtle"
            padding="4"
            width="400px"
            height="fit-content"
        >
            <VStack gap="space-8">
                <HStack gap="space-8" align="center">
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium">
                        <FormattedMessage id="uttaksplan.leggTilPeriode" />
                    </Heading>
                </HStack>
                <BodyShort>
                    <FormattedMessage id="LeggTilPeriodePanel.Dager" />
                    {valgtePerioder.map((p) => (
                        <BodyShort key={p.fom + p.tom}>
                            {p.fom === p.tom ? formatDate(p.fom) : formatDate(p.fom) + ' - ' + formatDate(p.tom)}
                        </BodyShort>
                    ))}
                </BodyShort>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-16">
                        <KontotypeSpørsmål gyldigeKontotyper={gyldigeKontotyper} />
                        {!aleneOmOmsorg && <SamtidigUttakSpørsmål />}
                        <GraderingSpørsmål />
                        <PanelButtons onCancel={() => onCancel?.()} isFinalStep={true} />
                    </VStack>
                </RhfForm>
            </VStack>
        </Box.New>
    );
};

const getForelderFromKontoType = (
    ktValue: KontoTypeUttak | undefined,
    fValue: Forelder | undefined,
): Forelder | undefined => {
    switch (ktValue) {
        case 'FEDREKVOTE':
            return Forelder.farMedmor;
        case 'MØDREKVOTE':
        case 'FORELDREPENGER_FØR_FØDSEL':
            return Forelder.mor;
        default:
            return fValue;
    }
};

export const erFerieLovlig = (periode: { fom: string; tom: string }, familiehendelsedato: string): boolean => {
    return dayjs(periode.tom).isBefore(familiehendelsedato);
};

const erFellesperiodeLovlig = (periode: { fom: string; tom: string }, familiehendelsedato: string): boolean => {
    return dayjs(periode.fom).isAfter(dayjs(familiehendelsedato).subtract(12, 'weeks'));
};
