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
import { PlanperiodeMedAntallDager } from './Periodeoversikt';

type FormValues = {
    kontoType?: KontoTypeUttak;
    forelder?: BrukerRolleSak_fpoversikt;
    skalDuJobbe?: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
};

interface Props {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    erMinimert: boolean;
    erKunEnHelEksisterendePeriodeValgt: boolean;
    eksisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    lukkRedigeringsmodus: () => void;
    setErMinimert: (erMinimert: boolean) => void;
}

export const LeggTilEllerEndrePeriodePanel = ({
    sammenslåtteValgtePerioder,
    erMinimert,
    erKunEnHelEksisterendePeriodeValgt,
    eksisterendePerioderSomErValgt,
    oppdaterUttaksplan,
    setValgtePerioder,
    lukkRedigeringsmodus,
    setErMinimert,
}: Props) => {
    const intl = useIntl();

    const { uttaksplan, aleneOmOmsorg, familiehendelsedato, valgtStønadskonto } = useUttaksplanData();

    const formMethods = useForm<FormValues>({
        defaultValues: erKunEnHelEksisterendePeriodeValgt
            ? lagDefaultValues(uttaksplan, sammenslåtteValgtePerioder[0])
            : undefined,
    });

    const onSubmit = (values: FormValues) => {
        oppdaterUttaksplan(
            sammenslåtteValgtePerioder.map((periode) => ({
                fom: periode.fom,
                tom: periode.tom,
                readOnly: false,
                id: `${periode.fom} - ${periode.tom} - ${values.kontoType}`,
                kontoType: values.kontoType,
                forelder: getForelderFraKontoType(values.kontoType, values.forelder),
                gradering: values.skalDuJobbe
                    ? getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType)
                    : undefined,
                samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
            })),
        );
        setValgtePerioder([]);

        lukkRedigeringsmodus();
    };

    const gyldigeKontotyper = finnGyldigeKontotyper(sammenslåtteValgtePerioder, familiehendelsedato, valgtStønadskonto);

    return (
        <InfoPanel
            sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
            erMinimert={erMinimert}
            eksisterendePerioderSomErValgt={eksisterendePerioderSomErValgt}
            oppdaterUttaksplan={oppdaterUttaksplan}
            setValgtePerioder={setValgtePerioder}
            setErMinimert={setErMinimert}
            erEnkelRedigeringPanel={false}
        >
            <div className={erMinimert ? 'hidden' : 'block'}>
                <div className="px-4 pb-4 pt-4">
                    <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                        <VStack gap="space-16">
                            <KontotypeSpørsmål gyldigeKontotyper={gyldigeKontotyper} skalViseTittel={false} />
                            {!aleneOmOmsorg && <SamtidigUttakSpørsmål />}
                            <GraderingSpørsmål />
                            <PanelButtons
                                onCancel={lukkRedigeringsmodus}
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

const lagDefaultValues = (uttaksplan: Planperiode[], valgtPeriode: CalendarPeriod): FormValues | undefined => {
    const eksisterendePeriode = uttaksplan.find(
        (periode) =>
            dayjs(periode.fom).isSame(dayjs(valgtPeriode.fom), 'day') &&
            dayjs(periode.tom).isSame(dayjs(valgtPeriode.tom), 'day'),
    );

    if (!eksisterendePeriode) {
        return undefined;
    }

    return {
        kontoType: eksisterendePeriode.kontoType,
        forelder: eksisterendePeriode.forelder,
        skalDuJobbe: eksisterendePeriode.gradering ? true : false,
        stillingsprosent: eksisterendePeriode.gradering?.arbeidstidprosent.toString(),
        samtidigUttak: eksisterendePeriode.samtidigUttak ? true : false,
        samtidigUttaksprosent: eksisterendePeriode.samtidigUttak?.toString(),
    };
};
