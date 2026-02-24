import { PersonPregnantIcon } from '@navikt/aksel-icons';
import { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, HStack, Heading, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { finnTekstForMedmorEllerFar } from '../../utils/infoboksUtils';

interface Props {
    erFarOgFar: boolean;
}

export const DetteKanIkkeEndres = ({ erFarOgFar }: Props) => {
    const intl = useIntl();

    const {
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    const erAleneforsørger = rettighetType === 'ALENEOMSORG';

    const harBeggeRett = rettighetType === 'BEGGE_RETT';

    const erFarEnDelAvSøknaden =
        !erMedmorDelAvSøknaden && (harBeggeRett || (erAleneforsørger && søker === 'FAR_MEDMOR'));

    const hvem = finnTekstForMedmorEllerFar(intl, søker, rettighetType, erMedmorDelAvSøknaden);

    const kunMorSøker = søker === 'MOR' && erAleneforsørger;

    const morHarRett = harBeggeRett || kunMorSøker;

    const kunFarSøker = søker === 'FAR_MEDMOR' && !erMedmorDelAvSøknaden && erAleneforsørger;

    const bTag = (msg: ReactNode[]) => <b>{msg}</b>;

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonPregnantIcon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="HvaErMulig.KanIkkeEndres" />
                </Heading>
                <VStack gap="space-8">
                    {!erFarOgFar && kunFarSøker && (
                        <BodyLong>
                            <FormattedMessage id="HvaErMulig.TreUkerFørTermin" values={{ b: bTag, erAleneforsørger }} />
                        </BodyLong>
                    )}
                    {(harBeggeRett || kunFarSøker || kunMorSøker) && (
                        <BodyLong>
                            {morHarRett && !erFarOgFar && (
                                <>
                                    <FormattedMessage id="HvaErMulig.SeksUkerEtterFødsel" values={{ b: bTag }} />

                                    <FormattedMessage
                                        id="HvaErMulig.SeksUkerEtterFødsel.DeFørsteUkene"
                                        values={{ erAleneforsørger, erMedmor: erMedmorDelAvSøknaden }}
                                    />
                                </>
                            )}
                            {!erAleneforsørger && (
                                <FormattedMessage
                                    id="HvaErMulig.SeksUkerEtterFødsel.OfteFårFedre"
                                    values={{ erFar: erFarEnDelAvSøknaden, hvem }}
                                />
                            )}
                        </BodyLong>
                    )}
                </VStack>
            </div>
        </HStack>
    );
};
