import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Calendar, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { isAvslåttPeriode, isAvslåttPeriodeFørsteSeksUkerMor } from '../utils/periodeUtils';
import { UttaksplanLegend } from './legend/UttaksplanLegend';
import { RedigerKalenderIndex } from './redigering/RedigerKalenderIndex';
import { usePerioderForKalendervisning } from './utils/usePerioderForKalendervisning';

interface Props {
    readOnly: boolean;
    barnehagestartdato?: string;
    oppdaterUttaksplan?: (perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>) => void;
}

export const UttaksplanKalender = ({ readOnly, barnehagestartdato, oppdaterUttaksplan }: Props) => {
    const intl = useIntl();
    const { erFarEllerMedmor, navnPåForeldre } = useUttaksplanData();

    const [isRangeSelection, setIsRangeSelection] = useState(true);
    const [valgtePerioder, setValgtePerioder] = useState<CalendarPeriod[]>([]);

    const perioderForKalendervisning = usePerioderForKalendervisning(barnehagestartdato);

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    const getSrTextForSelectedPeriod = useCallback(
        (periode: { fom: string; tom: string }) => {
            return intl.formatMessage(
                { id: 'UttaksplanKalender.ValgtPeriodeSrTekst' },
                {
                    fom: dayjs(periode.fom).format(DDMMYYYY_DATE_FORMAT),
                    tom: dayjs(periode.tom).format(DDMMYYYY_DATE_FORMAT),
                },
            );
        },
        [intl],
    );

    return (
        <VStack gap="space-8">
            <AvslåttePerioder />

            <VStack gap="space-16" ref={targetRef}>
                <div className="ax-md:pb-2 mb-4 flex flex-wrap" id="legend">
                    <UttaksplanLegend
                        perioderForKalendervisning={perioderForKalendervisning}
                        navnAnnenPart={navnAnnenPart}
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
                                              srText: getSrTextForSelectedPeriod(periode),
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
                            getSrTextForSelectedPeriod={readOnly ? undefined : getSrTextForSelectedPeriod}
                            isRangeSelection={isRangeSelection}
                        />
                    </div>
                    {oppdaterUttaksplan && valgtePerioder.length > 0 && (
                        <div
                            className={[
                                'fixed bottom-0 left-0 right-0 z-40 w-full',
                                'ax-md:sticky ax-md:top-24 ax-md:ml-4 ax-md:max-w-[20.5rem] ax-md:self-start',
                                'pb-[env(safe-area-inset-bottom,1rem)]',
                            ].join(' ')}
                        >
                            <RedigerKalenderIndex
                                valgtePerioder={valgtePerioder}
                                setValgtePerioder={setValgtePerioder}
                                oppdaterUttaksplan={oppdaterUttaksplan}
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
                type="button"
            >
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </VStack>
    );
};

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

const AvslåttePerioder = () => {
    const { saksperioder, erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

    const harAvslåttePerioderSomIkkeGirTapteDager = saksperioder.some(
        (p) =>
            isAvslåttPeriode(p) &&
            !('trekkdager' in p) &&
            p.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER' &&
            (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsedato)),
    );

    return harAvslåttePerioderSomIkkeGirTapteDager ? (
        <Alert variant="info" className="my-6">
            <FormattedMessage id="kalender.avslåttePerioder" />
        </Alert>
    ) : null;
};
