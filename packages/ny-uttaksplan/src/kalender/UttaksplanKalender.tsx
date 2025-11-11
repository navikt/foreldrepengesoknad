import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { SaksperiodeNy } from '@navikt/fp-types';
import { Calendar, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { omitMany } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { Uttaksplanbuilder } from '../builder/Uttaksplanbuilder';
import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplan } from '../context/useUttaksplan';
import { useUttaksplanBuilder } from '../context/useUttaksplanBuilder';
import { Planperiode } from '../types/Planperiode';
import { isAvslåttPeriode, isAvslåttPeriodeFørsteSeksUkerMor, isHull, isPeriodeUtenUttak } from '../utils/periodeUtils';
import { UttaksplanLegend } from './legend/UttaksplanLegend';
import { RedigeringPanel } from './redigering/RedigeringPanel';
import { usePerioderForKalendervisning } from './utils/usePerioderForKalendervisning';

interface Props {
    saksperioder: SaksperiodeNy[];
    barnehagestartdato?: string;
    readOnly: boolean;
    handleOnPlanChange?: (perioder: SaksperiodeNy[]) => void;
}

export const UttaksplanKalender = ({ saksperioder, barnehagestartdato, readOnly, handleOnPlanChange }: Props) => {
    const { erFarEllerMedmor, familiehendelsedato, navnPåForeldre } = useUttaksplanData();

    const uttaksplan = useUttaksplan(saksperioder);
    const uttaksplanBuilder = useUttaksplanBuilder(saksperioder);

    const [isRangeSelection, setIsRangeSelection] = useState(true);
    const [valgtePerioder, setValgtePerioder] = useState<CalendarPeriod[]>([]);

    const perioderForKalendervisning = usePerioderForKalendervisning(uttaksplan, barnehagestartdato);

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    const harAvslåttePerioderSomIkkeGirTapteDager = saksperioder.some(
        (p) =>
            isAvslåttPeriode(p) &&
            p.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER' &&
            (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsedato)),
    );

    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    return (
        <VStack gap="space-8">
            {harAvslåttePerioderSomIkkeGirTapteDager && (
                <Alert variant="info" className="my-6">
                    <FormattedMessage id="kalender.avslåttePerioder" />
                </Alert>
            )}
            <VStack gap="space-16" ref={targetRef}>
                <div className="mb-4 flex flex-wrap max-[768px]:pb-2" id="legend">
                    <UttaksplanLegend
                        perioderForKalendervisning={perioderForKalendervisning}
                        navnAnnenPart={navnAnnenPart}
                        unikeUtsettelseÅrsaker={unikeUtsettelseÅrsaker}
                        erFarEllerMedmor={erFarEllerMedmor}
                        readOnly={readOnly}
                        selectLegend={(color: CalendarPeriodColor) => {
                            const periode = notEmpty(perioderForKalendervisning.find((p) => p.color === color));
                            setValgtePerioder((old) =>
                                old.some((p) => p.fom === periode.fom || p.tom === periode.tom)
                                    ? []
                                    : [
                                          {
                                              color: 'DARKBLUE',
                                              fom: periode?.fom,
                                              tom: periode?.tom,
                                              isSelected: true,
                                              srText: '',
                                          },
                                      ],
                            );
                        }}
                    />
                </div>

                {!readOnly && (
                    <RadioGroup
                        legend={<FormattedMessage id="UttaksplanKalender.VelgDagEllerPeriode" />}
                        onChange={() => {
                            setValgtePerioder([]);
                            setIsRangeSelection(!isRangeSelection);
                        }}
                        value={isRangeSelection}
                    >
                        <HStack gap="space-16">
                            <Radio value={true}>
                                <FormattedMessage id="UttaksplanKalender.VelgPeriode" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="UttaksplanKalender.VelgEnkeltDager" />
                            </Radio>
                        </HStack>
                    </RadioGroup>
                )}

                <div className="ax-md:flex-row flex flex-col">
                    <div className={readOnly ? 'flex-1' : 'ax-md:w-[300px]'}>
                        <Calendar
                            periods={perioderForKalendervisning.concat(valgtePerioder).sort(sortPeriods)}
                            setSelectedPeriods={readOnly ? undefined : setValgtePerioder}
                            isRangeSelection={isRangeSelection}
                        />
                    </div>
                    {handleOnPlanChange && valgtePerioder.length > 0 && (
                        <div
                            className={[
                                'fixed bottom-0 left-0 right-0 z-40 w-full',
                                'ax-md:sticky ax-md:top-4 ax-md:ml-4 ax-md:max-w-[20.5rem] ax-md:self-start',
                            ].join(' ')}
                            style={{ paddingBottom: 'env(safe-area-inset-bottom, 1rem)' }}
                        >
                            <RedigeringPanel
                                valgtePerioder={valgtePerioder}
                                uttaksplan={uttaksplan}
                                setValgtePerioder={setValgtePerioder}
                                oppdaterUttaksplan={getModifyPlan(uttaksplanBuilder, handleOnPlanChange)}
                            />
                        </div>
                    )}
                </div>
            </VStack>

            <Button
                className="ax-md:pb-0 mt-8 pb-20 print:hidden"
                variant="tertiary"
                icon={<DownloadIcon aria-hidden />}
                onClick={() => toPDF()}
            >
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </VStack>
    );
};

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

const getModifyPlan =
    (
        uttaksplanBuilder: ReturnType<typeof Uttaksplanbuilder>,
        handleOnPlanChange: (perioder: SaksperiodeNy[]) => void,
    ) =>
    (oppdatertPeriode: Planperiode[]) => {
        const planperioder = uttaksplanBuilder.leggTilPerioder(oppdatertPeriode);
        const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        handleOnPlanChange(
            resultUtenHull.map((p) => omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin'])),
        );
    };
