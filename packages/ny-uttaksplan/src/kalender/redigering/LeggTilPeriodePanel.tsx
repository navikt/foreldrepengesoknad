import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import type { BrukerRolleSak_fpoversikt, KontoBeregningDto, KontoTypeUttak } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { getFloatFromString } from '@navikt/fp-utils';

import { PanelButtons } from '../../components/panel-buttons/PanelButtons';
import { GraderingSpørsmål } from '../../components/spørsmål/GraderingSpørsmål';
import { KontotypeSpørsmål } from '../../components/spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../../components/spørsmål/SamtidigUttakSpørsmål';
import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { getGradering } from '../../utils/graderingUtils';
import { InfoPanel } from './InfoPanel';

type LeggTilPeriodePanelFormValues = {
    kontoType?: KontoTypeUttak;
    forelder: BrukerRolleSak_fpoversikt;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
};

interface Props {
    valgtePerioder: CalendarPeriod[];
    komplettPlan: Planperiode[];
    lukk: () => void;
    handleAddPeriode: (oppdatertePerioder: Planperiode[]) => void;
    sammenslåtteValgtePerioder: CalendarPeriod[];
    oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void;
    setSelectedPeriods: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    erMinimert: boolean;
    setErMinimert: (erMinimert: boolean) => void;
}

export const LeggTilPeriodePanel = ({
    valgtePerioder,
    komplettPlan,
    lukk,
    handleAddPeriode,
    sammenslåtteValgtePerioder,
    oppdaterUttaksplan,
    setSelectedPeriods,
    erMinimert,
    setErMinimert,
}: Props) => {
    const intl = useIntl();

    const { aleneOmOmsorg, familiehendelsedato, valgtStønadskonto } = useUttaksplanData();

    const formMethods = useForm<LeggTilPeriodePanelFormValues>();

    const onSubmit = (values: LeggTilPeriodePanelFormValues) => {
        handleAddPeriode(
            valgtePerioder.map((periode) => ({
                fom: periode.fom,
                tom: periode.tom,
                readOnly: false,
                id: `${periode.fom} - ${periode.tom} - ${values.kontoType}`,
                kontoType: values.kontoType,
                forelder: getForelderFraKontoType(values.kontoType, values.forelder),
                gradering: getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType),
                samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
            })),
        );

        lukk();
    };

    const gyldigeKontotyper = finnGyldigeKontotyper(valgtePerioder, familiehendelsedato, valgtStønadskonto);

    return (
        <InfoPanel
            valgtePerioder={valgtePerioder}
            komplettPlan={komplettPlan}
            sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
            oppdaterUttaksplan={oppdaterUttaksplan}
            setSelectedPeriods={setSelectedPeriods}
            erMinimert={erMinimert}
            setErMinimert={setErMinimert}
            skalVisePeriodedetaljerSomStandard={false}
        >
            <div className={erMinimert ? 'hidden' : 'block'}>
                <div className="px-4 pb-4 pt-4">
                    <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                        <VStack gap="space-16">
                            <KontotypeSpørsmål gyldigeKontotyper={gyldigeKontotyper} skalViseTittel={false} />
                            {!aleneOmOmsorg && <SamtidigUttakSpørsmål />}
                            <GraderingSpørsmål />
                            <PanelButtons
                                onCancel={lukk}
                                isFinalStep={true}
                                addButtonText={intl.formatMessage({ id: 'LeggTilPeriodePanel.LeggTil' })}
                            />
                        </VStack>
                    </RhfForm>
                </div>
            </div>
        </InfoPanel>
    );
};

const getForelderFraKontoType = (
    ktValue: KontoTypeUttak | undefined,
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

const erMødrekvoteLovlig = (periode: CalendarPeriod, familiehendelsedato: string): boolean => {
    return dayjs(periode.tom).isSameOrAfter(familiehendelsedato);
};

const erFedrekvoteLovlig = (periode: CalendarPeriod, familiehendelsedato: string): boolean => {
    return dayjs(periode.tom).isSameOrAfter(familiehendelsedato);
};

const erFellesperiodeLovlig = (periode: CalendarPeriod, familiehendelsedato: string): boolean => {
    return dayjs(periode.fom).isAfter(dayjs(familiehendelsedato).subtract(12, 'weeks'));
};

const finnGyldigeKontotyper = (
    valgtePerioder: CalendarPeriod[],
    familiehendelsedato: string,
    valgtStønadskonto: KontoBeregningDto,
) => {
    const kanHaMødrekvote = valgtePerioder.some((p) => erMødrekvoteLovlig(p, familiehendelsedato));
    const kanHaFedrekvote = valgtePerioder.some((p) => erFedrekvoteLovlig(p, familiehendelsedato));
    const kanHaFellesperiode = valgtePerioder.some((p) => erFellesperiodeLovlig(p, familiehendelsedato));
    const kanHaForeldrepengerFørFødsel = !valgtePerioder.some(
        (p) =>
            dayjs(p.fom).isBefore(dayjs(familiehendelsedato).startOf('day').subtract(21, 'days')) ||
            dayjs(p.tom).isAfter(dayjs(familiehendelsedato).subtract(1, 'days').startOf('day')),
    );

    return valgtStønadskonto.kontoer
        .map((k) => k.konto)
        .filter((kt) => {
            if (kt === 'FORELDREPENGER_FØR_FØDSEL') {
                return kanHaForeldrepengerFørFødsel;
            }
            if (kt === 'FELLESPERIODE') {
                return kanHaFellesperiode;
            }
            if (kt === 'FEDREKVOTE' || kt === 'AKTIVITETSFRI_KVOTE') {
                return kanHaFedrekvote;
            }
            if (kt === 'MØDREKVOTE' || kt === 'FORELDREPENGER') {
                return kanHaMødrekvote;
            }
            return true;
        });
};
