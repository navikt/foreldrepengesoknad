import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, HStack, Heading, Spacer, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import type { BrukerRolleSak_fpoversikt, KontoTypeUttak_fpoversikt } from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';

import { PanelButtons } from '../../components/panel-buttons/PanelButtons';
import { GraderingSpørsmål } from '../../components/spørsmål/GraderingSpørsmål';
import { KontotypeSpørsmål } from '../../components/spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../../components/spørsmål/SamtidigUttakSpørsmål';
import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { getGradering } from '../../utils/graderingUtils';

type LeggTilPeriodePanelFormValues = {
    kontoType?: KontoTypeUttak_fpoversikt;
    forelder: BrukerRolleSak_fpoversikt;
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
    erMinimert: boolean;
    setErMinimert: (erMinimert: boolean) => void;
}

export const LeggTilPeriodePanel = ({
    valgtePerioder,
    onCancel,
    handleAddPeriode,
    erMinimert,
    setErMinimert,
}: Props) => {
    const intl = useIntl();

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
                    id: `${fomValue} - ${tomValue} - LOVBESTEMT_FERIE`,
                    forelder: 'MOR',
                    utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                });
            } else if (hvaVilDuGjøre === 'leggTilOpphold') {
                perioder.push({
                    ...felles,
                    id: `${fomValue} - ${tomValue} - ${PeriodeHullType.PERIODE_UTEN_UTTAK}`,
                    forelder: 'MOR',
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
        <>
            <VStack gap="space-8">
                <Box.New background="accent-soft" padding="4">
                    <HStack gap="space-8" align="center">
                        <PencilIcon aria-hidden={true} width={24} height={24} />
                        <Heading size="small">
                            <FormattedMessage id="uttaksplan.leggTilPeriode" />
                        </Heading>
                        <Spacer />
                        <div className="block sm:hidden">
                            {erMinimert ? (
                                <ChevronUpIcon
                                    title="a11y-title"
                                    fontSize="1.5rem"
                                    onClick={() => setErMinimert(false)}
                                />
                            ) : (
                                <ChevronDownIcon
                                    title="a11y-title"
                                    fontSize="1.5rem"
                                    onClick={() => setErMinimert(true)}
                                />
                            )}
                        </div>
                    </HStack>
                </Box.New>

                <div className={erMinimert ? 'hidden' : 'block'}>
                    <div className="px-4 pb-4 pt-4">
                        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                            <VStack gap="space-16">
                                <KontotypeSpørsmål gyldigeKontotyper={gyldigeKontotyper} skalViseTittel={false} />
                                {!aleneOmOmsorg && <SamtidigUttakSpørsmål />}
                                <GraderingSpørsmål />
                                <PanelButtons
                                    onCancel={() => onCancel?.()}
                                    isFinalStep={true}
                                    addButtonText={intl.formatMessage({ id: 'LeggTilPeriodePanel.LeggTil' })}
                                />
                            </VStack>
                        </RhfForm>
                    </div>
                </div>
            </VStack>
        </>
    );
};

const getForelderFromKontoType = (
    ktValue: KontoTypeUttak_fpoversikt | undefined,
    fValue: BrukerRolleSak_fpoversikt | undefined,
): BrukerRolleSak_fpoversikt | undefined => {
    switch (ktValue) {
        case 'FEDREKVOTE':
            return 'FAR_MEDMOR';
        case 'MØDREKVOTE':
        case 'FORELDREPENGER_FØR_FØDSEL':
            return 'MOR';
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
