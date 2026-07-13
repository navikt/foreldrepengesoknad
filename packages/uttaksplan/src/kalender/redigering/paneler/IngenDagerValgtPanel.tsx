import { CheckmarkCircleIcon, ChevronDownIcon, ChevronUpIcon, NotePencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Detail, HStack, Heading, Link, Show, Tag, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { UttaksplanHandlingKnapper } from '../../../felles/UttaksplanHandlingKnapper';
import { getVarighetString } from '../../../utils/dateUtils';
import {
    useTellDagerIUttaksPeriodene,
    useUbrukteDagerPerKontoKunEnHarRett,
} from '../../../utils/kvoteOppsummeringUtils';
import { useErDesktop, useMediaResetMinimering } from '../utils/useMediaActions';

interface Props {
    scrollToKvoteOppsummering: () => void;
    labels: React.ReactNode;
}

export const IngenDagerValgtPanel = ({ scrollToKvoteOppsummering, labels }: Props) => {
    const intl = useIntl();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const erDesktop = useErDesktop();

    const [erMinimert, setErMinimert] = useState(!erDesktop);

    useMediaResetMinimering(setErMinimert);

    return (
        <VStack gap="space-16">
            <Box
                padding="space-12"
                onClick={erDesktop ? undefined : () => setErMinimert(!erMinimert)}
                className={
                    erDesktop
                        ? 'bg-ax-bg-accent-soft'
                        : 'bg-ax-bg-accent-soft hover:bg-ax-bg-accent-moderate cursor-pointer'
                }
            >
                <Show below="md">
                    <VStack gap="space-1" align="center">
                        {erMinimert ? (
                            <ChevronUpIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Maksimer' })}
                                height={24}
                                width={24}
                            />
                        ) : (
                            <ChevronDownIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Minimer' })}
                                height={24}
                                width={24}
                            />
                        )}
                        <Heading size="small">
                            <HStack gap="space-4" align="center">
                                <NotePencilIcon aria-hidden height={16} width={16} />
                                <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                            </HStack>
                        </Heading>
                    </VStack>
                </Show>
                <Show above="md">
                    <VStack gap="space-4">
                        <BodyShort size="small">
                            <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                        </BodyShort>
                    </VStack>
                </Show>
            </Box>
            <div style={erMinimert ? { display: 'none' } : undefined}>
                <VStack gap="space-16" className="px-4 pb-4">
                    {labels}
                    <VStack gap="space-8">
                        <PlanStatus />
                        <Link as="button" onClick={scrollToKvoteOppsummering}>
                            <FormattedMessage id="RedigeringKalenderIndex.SeDetaljer" />
                        </Link>
                    </VStack>
                    <UttaksplanHandlingKnapper
                        tilbakestillPlan={
                            uttaksplanRedigering?.harEndretPlan
                                ? () => uttaksplanRedigering.setVisTilbakestillModal(true)
                                : undefined
                        }
                        angreEndring={
                            uttaksplanRedigering && uttaksplanRedigering.uttaksplanVersjoner.length > 0
                                ? () => uttaksplanRedigering.angreSisteEndring()
                                : undefined
                        }
                        visTilbakestillModal={uttaksplanRedigering?.visTilbakestillModal}
                    />
                </VStack>
            </div>
        </VStack>
    );
};

const PlanStatus = () => {
    const tellingData = useTellDagerIUttaksPeriodene();
    const kunEnHarRettData = useUbrukteDagerPerKontoKunEnHarRett();
    const harPerioderSomKanLeggesTil = useHarPerioderSomKanLeggesTil(tellingData, kunEnHarRettData);
    const harLagtTilForMye = useHarLagtTilForMye(tellingData, kunEnHarRettData);

    if (!harPerioderSomKanLeggesTil && !harLagtTilForMye) {
        return <AlleDagerLagtTilBoks />;
    }

    return (
        <VStack gap="space-12">
            {harPerioderSomKanLeggesTil && (
                <VStack gap="space-4">
                    <Detail uppercase style={{ letterSpacing: '1.05px' }}>
                        <FormattedMessage id="IngenDagerValgtPanel.PerioderSomKanLeggesTil" />
                    </Detail>
                    <PerioderSomKanLeggesTilTags tellingData={tellingData} kunEnHarRettData={kunEnHarRettData} />
                </VStack>
            )}
            {harLagtTilForMye && <LagtTilForMyeTags tellingData={tellingData} kunEnHarRettData={kunEnHarRettData} />}
        </VStack>
    );
};

const AlleDagerLagtTilBoks = () => (
    <Box padding="space-12" borderRadius="8" borderWidth="1" className="bg-ax-bg-success-soft border-ax-border-success">
        <HStack gap="space-8" align="start" wrap={false}>
            <CheckmarkCircleIcon className="text-ax-text-success shrink-0" fontSize="1.5rem" aria-hidden />
            <BodyShort size="small">
                <FormattedMessage id="IngenDagerValgtPanel.AlleDagerLagtTil" />
            </BodyShort>
        </HStack>
    </Box>
);

interface TellingData {
    tellingData: ReturnType<typeof useTellDagerIUttaksPeriodene>;
    kunEnHarRettData: ReturnType<typeof useUbrukteDagerPerKontoKunEnHarRett>;
}

const LagtTilForMyeTags = ({ tellingData, kunEnHarRettData }: TellingData) => {
    const intl = useIntl();
    const {
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    let tags: React.ReactNode;
    if (rettighetType === 'BEGGE_RETT') {
        tags = (
            <ForMyeTagsBeggeRett erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} intl={intl} tellingData={tellingData} />
        );
    } else if (søker === 'FAR_MEDMOR') {
        tags = <ForMyeTagsKunFar intl={intl} kunEnHarRettData={kunEnHarRettData} />;
    } else {
        tags = <ForMyeTagsKunMor intl={intl} tellingData={tellingData} kunEnHarRettData={kunEnHarRettData} />;
    }

    return (
        <VStack gap="space-4">
            <Detail uppercase style={{ letterSpacing: '1.05px' }}>
                <FormattedMessage id="IngenDagerValgtPanel.LagtTilForMyeTittel" />
            </Detail>
            {tags}
        </VStack>
    );
};

const ForMyeTagsBeggeRett = ({
    erMedmorDelAvSøknaden,
    intl,
    tellingData,
}: {
    erMedmorDelAvSøknaden: boolean;
    intl: ReturnType<typeof useIntl>;
    tellingData: ReturnType<typeof useTellDagerIUttaksPeriodene>;
}) => {
    const { ubrukteDagerMor, ubrukteDagerFar, ubrukteDagerFelles } = tellingData;

    const tags = [
        ubrukteDagerMor < 0 && (
            <Tag key="mor" variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeMor"
                    values={{ varighet: getVarighetString(ubrukteDagerMor * -1, intl) }}
                />
            </Tag>
        ),
        ubrukteDagerFar < 0 && (
            <Tag key="far" variant="error" size="small">
                {erMedmorDelAvSøknaden ? (
                    <FormattedMessage
                        id="IngenDagerValgtPanel.LagtTilForMyeMedmor"
                        values={{ varighet: getVarighetString(ubrukteDagerFar * -1, intl) }}
                    />
                ) : (
                    <FormattedMessage
                        id="IngenDagerValgtPanel.LagtTilForMyeFar"
                        values={{ varighet: getVarighetString(ubrukteDagerFar * -1, intl) }}
                    />
                )}
            </Tag>
        ),
        ubrukteDagerFelles < 0 && (
            <Tag key="felles" variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeFellesperiode"
                    values={{ varighet: getVarighetString(ubrukteDagerFelles * -1, intl) }}
                />
            </Tag>
        ),
    ].filter(Boolean);

    if (tags.length === 0) {
        return null;
    }
    return (
        <HStack gap="space-4" wrap>
            {tags}
        </HStack>
    );
};

const ForMyeTagsKunFar = ({
    intl,
    kunEnHarRettData,
}: {
    intl: ReturnType<typeof useIntl>;
    kunEnHarRettData: ReturnType<typeof useUbrukteDagerPerKontoKunEnHarRett>;
}) => {
    const { overtrukketDagerAktivitetsfri, overtrukketDagerMedAktivitetskrav } = kunEnHarRettData;

    const tags = [
        overtrukketDagerAktivitetsfri > 0 && (
            <Tag key="aktivitetsfri" variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeUtenAktivitetskrav"
                    values={{ varighet: getVarighetString(overtrukketDagerAktivitetsfri, intl) }}
                />
            </Tag>
        ),
        overtrukketDagerMedAktivitetskrav > 0 && (
            <Tag key="medAktivitetskrav" variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeMedAktivitetskrav"
                    values={{ varighet: getVarighetString(overtrukketDagerMedAktivitetskrav, intl) }}
                />
            </Tag>
        ),
    ].filter(Boolean);

    if (tags.length === 0) {
        return null;
    }
    return (
        <HStack gap="space-4" wrap>
            {tags}
        </HStack>
    );
};

const ForMyeTagsKunMor = ({
    intl,
    tellingData,
    kunEnHarRettData,
}: {
    intl: ReturnType<typeof useIntl>;
    tellingData: ReturnType<typeof useTellDagerIUttaksPeriodene>;
    kunEnHarRettData: ReturnType<typeof useUbrukteDagerPerKontoKunEnHarRett>;
}) => {
    const { antallOvertrukketDager } = tellingData;
    const { overtrukketDagerAktivitetsfri, overtrukketDagerMedAktivitetskrav } = kunEnHarRettData;

    const totalOvertrukket =
        antallOvertrukketDager > 0
            ? antallOvertrukketDager
            : overtrukketDagerAktivitetsfri + overtrukketDagerMedAktivitetskrav;

    if (totalOvertrukket <= 0) {
        return null;
    }

    return (
        <HStack gap="space-4">
            <Tag variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeMor"
                    values={{ varighet: getVarighetString(totalOvertrukket, intl) }}
                />
            </Tag>
        </HStack>
    );
};

const useHarPerioderSomKanLeggesTil = (
    {
        ubrukteDagerMor,
        ubrukteDagerFar,
        ubrukteDagerFelles,
        antallUbrukteDager,
    }: ReturnType<typeof useTellDagerIUttaksPeriodene>,
    {
        ubrukteDagerAktivitetsfri,
        ubrukteDagerMedAktivitetskrav,
    }: ReturnType<typeof useUbrukteDagerPerKontoKunEnHarRett>,
) => {
    const {
        foreldreInfo: { rettighetType, søker },
    } = useUttaksplanData();

    if (rettighetType === 'BEGGE_RETT') {
        return ubrukteDagerMor > 0 || ubrukteDagerFar > 0 || ubrukteDagerFelles > 0;
    }
    if (søker === 'FAR_MEDMOR') {
        return ubrukteDagerAktivitetsfri > 0 || ubrukteDagerMedAktivitetskrav > 0;
    }
    return antallUbrukteDager > 0 || ubrukteDagerAktivitetsfri + ubrukteDagerMedAktivitetskrav > 0;
};

const useHarLagtTilForMye = (
    {
        ubrukteDagerMor,
        ubrukteDagerFar,
        ubrukteDagerFelles,
        antallOvertrukketDager,
    }: ReturnType<typeof useTellDagerIUttaksPeriodene>,
    {
        overtrukketDagerAktivitetsfri,
        overtrukketDagerMedAktivitetskrav,
    }: ReturnType<typeof useUbrukteDagerPerKontoKunEnHarRett>,
) => {
    const {
        foreldreInfo: { rettighetType, søker },
    } = useUttaksplanData();

    if (rettighetType === 'BEGGE_RETT') {
        return ubrukteDagerMor < 0 || ubrukteDagerFar < 0 || ubrukteDagerFelles < 0;
    }
    if (søker === 'FAR_MEDMOR') {
        return overtrukketDagerAktivitetsfri > 0 || overtrukketDagerMedAktivitetskrav > 0;
    }
    return antallOvertrukketDager > 0 || overtrukketDagerAktivitetsfri + overtrukketDagerMedAktivitetskrav > 0;
};

const PerioderSomKanLeggesTilTags = ({ tellingData, kunEnHarRettData }: TellingData) => {
    const intl = useIntl();
    const {
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    if (rettighetType === 'BEGGE_RETT') {
        return <TagsBeggeRett erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} intl={intl} tellingData={tellingData} />;
    }

    if (søker === 'FAR_MEDMOR') {
        return <TagsKunFar intl={intl} kunEnHarRettData={kunEnHarRettData} />;
    }

    return <TagsKunMor intl={intl} tellingData={tellingData} kunEnHarRettData={kunEnHarRettData} />;
};

const TagsBeggeRett = ({
    erMedmorDelAvSøknaden,
    intl,
    tellingData,
}: {
    erMedmorDelAvSøknaden: boolean;
    intl: ReturnType<typeof useIntl>;
    tellingData: ReturnType<typeof useTellDagerIUttaksPeriodene>;
}) => {
    const { ubrukteDagerMor, ubrukteDagerFar, ubrukteDagerFelles } = tellingData;

    const tags = [
        ubrukteDagerMor > 0 && (
            <Tag key="mor" variant="info" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerTilMor"
                    values={{ varighet: getVarighetString(ubrukteDagerMor, intl) }}
                />
            </Tag>
        ),
        ubrukteDagerFar > 0 && (
            <Tag key="far" variant="success" size="small">
                {erMedmorDelAvSøknaden ? (
                    <FormattedMessage
                        id="IngenDagerValgtPanel.UkerTilMedmor"
                        values={{ varighet: getVarighetString(ubrukteDagerFar, intl) }}
                    />
                ) : (
                    <FormattedMessage
                        id="IngenDagerValgtPanel.UkerTilFar"
                        values={{ varighet: getVarighetString(ubrukteDagerFar, intl) }}
                    />
                )}
            </Tag>
        ),
        ubrukteDagerFelles > 0 && (
            <Tag key="felles" variant="neutral" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerFellesperiode"
                    values={{ varighet: getVarighetString(ubrukteDagerFelles, intl) }}
                />
            </Tag>
        ),
    ].filter(Boolean);

    if (tags.length === 0) {
        return null;
    }
    return (
        <HStack gap="space-4" wrap>
            {tags}
        </HStack>
    );
};

const TagsKunFar = ({
    intl,
    kunEnHarRettData,
}: {
    intl: ReturnType<typeof useIntl>;
    kunEnHarRettData: ReturnType<typeof useUbrukteDagerPerKontoKunEnHarRett>;
}) => {
    const { ubrukteDagerAktivitetsfri, ubrukteDagerMedAktivitetskrav } = kunEnHarRettData;

    const tags = [
        ubrukteDagerAktivitetsfri > 0 && (
            <Tag key="aktivitetsfri" variant="success" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerUtenAktivitetskrav"
                    values={{ varighet: getVarighetString(ubrukteDagerAktivitetsfri, intl) }}
                />
            </Tag>
        ),
        ubrukteDagerMedAktivitetskrav > 0 && (
            <Tag key="medAktivitetskrav" variant="success" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerMedAktivitetskrav"
                    values={{ varighet: getVarighetString(ubrukteDagerMedAktivitetskrav, intl) }}
                />
            </Tag>
        ),
    ].filter(Boolean);

    if (tags.length === 0) {
        return null;
    }
    return (
        <HStack gap="space-4" wrap>
            {tags}
        </HStack>
    );
};

const TagsKunMor = ({
    intl,
    tellingData,
    kunEnHarRettData,
}: {
    intl: ReturnType<typeof useIntl>;
    tellingData: ReturnType<typeof useTellDagerIUttaksPeriodene>;
    kunEnHarRettData: ReturnType<typeof useUbrukteDagerPerKontoKunEnHarRett>;
}) => {
    const { antallUbrukteDager } = tellingData;
    const { ubrukteDagerAktivitetsfri, ubrukteDagerMedAktivitetskrav } = kunEnHarRettData;

    const totalUbrukte =
        antallUbrukteDager > 0 ? antallUbrukteDager : ubrukteDagerAktivitetsfri + ubrukteDagerMedAktivitetskrav;

    if (totalUbrukte <= 0) {
        return null;
    }

    return (
        <HStack gap="space-4">
            <Tag variant="info" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerTilMor"
                    values={{ varighet: getVarighetString(totalUbrukte, intl) }}
                />
            </Tag>
        </HStack>
    );
};
