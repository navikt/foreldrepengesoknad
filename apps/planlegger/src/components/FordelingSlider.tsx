import { PlusIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { UkerOgDager } from 'utils/stønadskontoerUtils';
import { Uttaksdata } from 'utils/uttakUtils';

import { BodyShort, Button, HStack, Heading, VStack } from '@navikt/ds-react';

import { Slider } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface FordelingSliderProps {
    antallDagerSøker1: number | undefined;
    onAntallDagerSøker1Change: (value: number) => void;
    antallUkerOgDagerFellesperiode: UkerOgDager;
    fornavnSøker1?: string;
    fornavnSøker2?: string;
    uttaksdata?: Uttaksdata;
}

export const FordelingSlider = ({
    antallDagerSøker1,
    onAntallDagerSøker1Change,
    antallUkerOgDagerFellesperiode,
    fornavnSøker1,
    fornavnSøker2,
    uttaksdata,
}: FordelingSliderProps) => {
    const intl = useIntl();

    const totalDager = antallUkerOgDagerFellesperiode.uker * 5 + antallUkerOgDagerFellesperiode.dager;

    return (
        <VStack gap="space-8">
            <HStack width="full" justify="space-between">
                <BodyShort weight="semibold">{fornavnSøker1 && capitalizeFirstLetter(fornavnSøker1)}</BodyShort>
                <BodyShort weight="semibold">{fornavnSøker2 && capitalizeFirstLetter(fornavnSøker2)}</BodyShort>
            </HStack>

            {uttaksdata && (
                <HStack width="full" justify="space-between" paddingBlock="space-0 space-16">
                    <BodyShort className="w-1/2 wrap-break-word">
                        {intl.formatDate(uttaksdata.startdatoPeriode1, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}{' '}
                        –<wbr />{' '}
                        {intl.formatDate(uttaksdata.sluttdatoPeriode1, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </BodyShort>
                    {uttaksdata.startdatoPeriode2 && uttaksdata.sluttdatoPeriode2 && (
                        <BodyShort className="w-1/2 wrap-break-word text-right">
                            {intl.formatDate(uttaksdata.startdatoPeriode2, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}{' '}
                            –<wbr />{' '}
                            {intl.formatDate(uttaksdata.sluttdatoPeriode2, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </BodyShort>
                    )}
                </HStack>
            )}

            <div className="flex w-full items-center gap-4">
                <VStack gap="space-2" align="start" className="shrink-0">
                    {antallDagerSøker1 !== undefined && (
                        <Heading size="small" level="4">
                            <FormattedMessage
                                id="FordelingSteg.Uker"
                                values={{ uker: Math.floor(antallDagerSøker1 / 5) }}
                            />
                        </Heading>
                    )}
                    {antallDagerSøker1 !== undefined && (
                        <Button
                            type="button"
                            variant="tertiary"
                            size="small"
                            icon={<PlusIcon aria-hidden />}
                            aria-label={intl.formatMessage(
                                { id: 'FordelingSteg.ØkAntallUker' },
                                { navn: fornavnSøker1 },
                            )}
                            onClick={() => {
                                const newValue = Math.min(totalDager, antallDagerSøker1 + 5);
                                onAntallDagerSøker1Change(newValue);
                            }}
                            disabled={antallDagerSøker1 >= totalDager}
                        />
                    )}
                </VStack>

                {/* Slideren er implementert omvendt: slider-verdien representerer antall dager til søker 2,
                    slik at det blir intuitivt at slideren beveger seg mot personen som får flere dager */}
                <div className="min-w-0 flex-1">
                    <Slider
                        min={0}
                        max={totalDager}
                        step={5}
                        value={[antallDagerSøker1 === undefined ? totalDager / 2 : totalDager - antallDagerSøker1]}
                        ariaLabelledby="fordeling-slider-label"
                        getAriaValueText={(sliderValue: number) => {
                            const dager1 = totalDager - sliderValue;
                            const uker1 = Math.floor(dager1 / 5);
                            const dager1Rest = dager1 % 5;
                            const resterende = sliderValue;
                            const uker2 = Math.floor(resterende / 5);
                            const dager2Rest = resterende % 5;

                            return intl.formatMessage(
                                { id: 'FordelingSteg.Slider.AriaValueText' },
                                {
                                    uker1,
                                    dager1: dager1Rest,
                                    uker2,
                                    dager2: dager2Rest,
                                    fornavn1: fornavnSøker1,
                                    fornavn2: fornavnSøker2,
                                },
                            );
                        }}
                        onValueChange={(value: number[]) => {
                            if (value[0] !== undefined) {
                                onAntallDagerSøker1Change(totalDager - value[0]);
                            }
                        }}
                    />
                </div>

                <VStack gap="space-2" align="end" className="shrink-0">
                    {antallDagerSøker1 !== undefined && (
                        <Heading size="small" level="4">
                            <FormattedMessage
                                id="FordelingSteg.Uker"
                                values={{
                                    uker: Math.floor((totalDager - antallDagerSøker1) / 5),
                                }}
                            />
                        </Heading>
                    )}
                    {antallDagerSøker1 !== undefined && (
                        <Button
                            type="button"
                            variant="tertiary"
                            size="small"
                            icon={<PlusIcon aria-hidden />}
                            aria-label={intl.formatMessage(
                                { id: 'FordelingSteg.ØkAntallUker' },
                                { navn: fornavnSøker2 },
                            )}
                            onClick={() => {
                                const newValue = Math.max(0, antallDagerSøker1 - 5);
                                onAntallDagerSøker1Change(newValue);
                            }}
                            disabled={antallDagerSøker1 <= 0}
                        />
                    )}
                </VStack>
            </div>
        </VStack>
    );
};
