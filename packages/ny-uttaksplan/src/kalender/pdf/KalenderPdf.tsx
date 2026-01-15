import { DownloadIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Button, Dialog, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { Calendar, CalendarPeriod } from '@navikt/fp-ui';

import { UttaksplanLegend } from '../legend/UttaksplanLegend';

interface Props {
    perioderForKalendervisning: CalendarPeriod[];
    førsteDatoIKalender: string;
    sisteDatoIKalender: string;
}

export const KalenderPdf = ({ perioderForKalendervisning, førsteDatoIKalender, sisteDatoIKalender }: Props) => {
    const intl = useIntl();

    const [isCreatingPdf, setIsCreatingPdf] = useState(false);
    const [antallKolonner, setAntallKolonner] = useState<1 | 2 | 3>(2);

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.NORMAL,
        page: {
            margin: Margin.MEDIUM,
        },
        overrides: {
            canvas: {
                windowWidth: 1200,
            },
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    return (
        <Dialog>
            <Dialog.Trigger>
                <Button variant="tertiary" icon={<DownloadIcon aria-hidden />} type="button">
                    <FormattedMessage id="kalender.lastNedSomPdf" />
                </Button>
            </Dialog.Trigger>
            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="kalender.lastNedSomPdf" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <VStack gap="space-48">
                        <VStack gap="space-16">
                            <RadioGroup
                                legend={intl.formatMessage({ id: 'kalender.antallKolonner' })}
                                onChange={setAntallKolonner}
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
                                        setIsCreatingPdf(true);

                                        toPDF();

                                        // Kun for visuell feedback til bruker
                                        timeoutRef.current = setTimeout(() => {
                                            setIsCreatingPdf(false);
                                        }, 500);
                                    }}
                                    type="button"
                                >
                                    <FormattedMessage id="kalender.lastNed" />
                                </Button>
                                <Dialog.CloseTrigger>
                                    <Button variant="tertiary" type="button">
                                        <FormattedMessage id="kalender.avbryt" />
                                    </Button>
                                </Dialog.CloseTrigger>
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
                </Dialog.Body>
            </Dialog.Popup>
        </Dialog>
    );
};
