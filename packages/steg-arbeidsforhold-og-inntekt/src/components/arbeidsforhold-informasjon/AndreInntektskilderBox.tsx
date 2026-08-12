import { BriefcaseClockIcon, TrashIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Button, HStack, Heading, Label, Tag, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

import { type AndreInntektskilder, AnnenInntektType } from '../../types/AndreInntektskilder';

interface Props {
    andreInntektskilder: AndreInntektskilder[];
    onRemove: (index: number) => void;
}

const getTittelId = (type: AnnenInntektType) => {
    switch (type) {
        case AnnenInntektType.JOBB_I_UTLANDET:
            return 'AndreInntektskilderStep.RadioButton.Utlandet';
        case AnnenInntektType.SLUTTPAKKE:
            return 'AndreInntektskilderStep.RadioButton.Etterlønn';
        case AnnenInntektType.MILITÆRTJENESTE:
            return 'AndreInntektskilderStep.RadioButton.Førstegangstjeneste';
    }
};

const DetaljRad = ({ label, children }: { label: React.ReactNode; children: React.ReactNode }) => (
    <HStack justify="space-between">
        <Label>{label}</Label>
        <BodyShort className="text-ax-text-neutral-subtle" size="small">
            {children}
        </BodyShort>
    </HStack>
);

const Inntektsdetaljer = ({ inntekt }: { inntekt: AndreInntektskilder }) => {
    const intl = useIntl();

    return (
        <>
            {inntekt.type === AnnenInntektType.JOBB_I_UTLANDET && (
                <>
                    <DetaljRad label={<FormattedMessage id="JobbIUtlandetPanel.LandDuHarJobbet" />}>
                        {inntekt.land}
                    </DetaljRad>
                    <DetaljRad label={<FormattedMessage id="JobbIUtlandetPanel.NavnPåArbeidsgiver" />}>
                        {capitalizeFirstLetterInEveryWordOnly(inntekt.arbeidsgiverNavn)}
                    </DetaljRad>
                </>
            )}
            <DetaljRad label="Dato:">
                <FormattedMessage
                    id="inntektsinformasjon.arbeidsforhold.periode"
                    values={{
                        fom: formatDate(inntekt.fom),
                        tom: inntekt.tom
                            ? formatDate(inntekt.tom)
                            : intl.formatMessage({ id: 'HarArbeidsforhold.pågående' }),
                    }}
                />
            </DetaljRad>
        </>
    );
};

export const AndreInntektskilderBox = ({ andreInntektskilder, onRemove }: Props) => {
    const intl = useIntl();

    if (andreInntektskilder.length === 0) {
        return null;
    }

    return (
        <VStack gap="space-8">
            {andreInntektskilder.map((inntekt, index) => (
                <Box
                    key={`${inntekt.type}-${inntekt.fom}-${inntekt.tom ?? ''}`}
                    padding="space-16"
                    className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
                >
                    <VStack gap="space-16">
                        <Heading size="xsmall" level="3">
                            <FormattedMessage id={getTittelId(inntekt.type)} />
                        </Heading>
                        <Tag
                            className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                            icon={<BriefcaseClockIcon aria-hidden />}
                            variant="info"
                        >
                            Annen inntekt
                        </Tag>
                        <Inntektsdetaljer inntekt={inntekt} />
                        <Button
                            type="button"
                            size="small"
                            variant="tertiary"
                            data-color="danger"
                            icon={<TrashIcon aria-hidden />}
                            className="self-start"
                            aria-label={`Fjern ${intl.formatMessage({ id: getTittelId(inntekt.type) })}`}
                            onClick={() => onRemove(index)}
                        >
                            Fjern
                        </Button>
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
