import { DownloadIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Button, HStack, Modal, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { Calendar, CalendarPeriod } from '@navikt/fp-ui';

import { UttaksplanLegend } from '../legend/UttaksplanLegend';

interface Props {
    perioderForKalendervisning: CalendarPeriod[];
    førsteDatoIKalender: string;
    sisteDatoIKalender: string;
}

export const KalenderPdf = ({ perioderForKalendervisning, førsteDatoIKalender, sisteDatoIKalender }: Props) => {
    const intl = useIntl();

    const [isOpen, setIsOpen] = useState(false);
    const [isCreatingPdf, setIsCreatingPdf] = useState(false);
    const [antallKolonner, setAntallKolonner] = useState<1 | 2 | 3>(2);

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.NORMAL,
        page: {
            margin: Margin.MEDIUM,
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    return (
        <>
            <Button
                variant="tertiary"
                icon={<DownloadIcon aria-hidden />}
                onClick={() => setIsOpen(true)}
                type="button"
            >
                <FormattedMessage id="kalender.lastNedSomPdf" />
            </Button>
            {isOpen && (
                <Modal
                    open
                    onClose={() => setIsOpen(false)}
                    header={{ heading: intl.formatMessage({ id: 'kalender.lastNedSomPdf' }) }}
                >
                    <Modal.Body>
                        <VStack gap="space-48">
                            <VStack gap="space-16">
                                <RadioGroup
                                    legend={intl.formatMessage({ id: 'kalender.AntallKolonner' })}
                                    onChange={setAntallKolonner as (value: React.SetStateAction<1 | 2 | 3>) => void}
                                    value={antallKolonner}
                                >
                                    <HStack gap="space-16">
                                        <Radio value={1}>1</Radio>
                                        <Radio value={2}>2</Radio>
                                        <Radio value={3}>3</Radio>
                                    </HStack>
                                </RadioGroup>

                                <HStack gap="space-8">
                                    <Button
                                        variant="primary"
                                        icon={<DownloadIcon aria-hidden />}
                                        loading={isCreatingPdf}
                                        onClick={() => {
                                            // Denne koden er nødvendig for å få korrekt antall kolonner i PDFen på alle enheter
                                            setIsCreatingPdf(true);
                                            const originalWidth = globalThis.innerWidth;

                                            Object.defineProperty(globalThis, 'innerWidth', {
                                                configurable: true,
                                                value: 1400,
                                            });
                                            globalThis.dispatchEvent(new Event('resize'));

                                            toPDF();

                                            setTimeout(() => {
                                                Object.defineProperty(globalThis, 'innerWidth', {
                                                    configurable: true,
                                                    value: originalWidth,
                                                });
                                                globalThis.dispatchEvent(new Event('resize'));
                                                setIsCreatingPdf(false);
                                            }, 500);
                                        }}
                                        type="button"
                                    >
                                        <FormattedMessage id="kalender.lastNed" />
                                    </Button>
                                    <Button variant="tertiary" onClick={() => setIsOpen(false)} type="button">
                                        <FormattedMessage id="kalender.avbryt" />
                                    </Button>
                                </HStack>
                            </VStack>
                            <VStack gap="space-24" ref={targetRef}>
                                <UttaksplanLegend perioderForKalendervisning={perioderForKalendervisning} readOnly />
                                <Calendar
                                    periods={perioderForKalendervisning}
                                    nrOfColumns={antallKolonner}
                                    firstDateInCalendar={førsteDatoIKalender}
                                    lastDateInCalendar={sisteDatoIKalender}
                                />
                            </VStack>
                        </VStack>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};
