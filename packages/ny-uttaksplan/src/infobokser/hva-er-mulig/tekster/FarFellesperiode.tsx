import { PersonGroupIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { finnTekstForMedmorEllerFar, finnTekstForMorEllerFar } from '../../utils/infoboksUtils';

interface Props {
    erFarOgFar: boolean;
}

export const FarFellesperiode = ({ erFarOgFar }: Props) => {
    const intl = useIntl();

    const {
        familiesituasjon,
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    const erAdopsjon = familiesituasjon === 'adopsjon';
    const erMedmor = erMedmorDelAvSøknaden;

    const medmorEllerFarTekst = finnTekstForMedmorEllerFar(intl, søker, rettighetType, erMedmorDelAvSøknaden);

    const morEllerFarTekst = finnTekstForMorEllerFar(intl, søker, rettighetType, erFarOgFar, erMedmorDelAvSøknaden);

    const erMorDelAvSøknaden = !erFarOgFar && (søker === 'MOR' || rettighetType === 'BEGGE_RETT');

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonGroupIcon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>
            <div>
                {erAdopsjon ? (
                    <>
                        <Heading size="small">
                            <FormattedMessage
                                id="HvaErMulig.FarFellesperiode.Adopsjon"
                                values={{ hvem: medmorEllerFarTekst, erFedre: erFarOgFar, erMedmor }}
                            />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage
                                id="HvaErMulig.FarFellesperiode.Tekst.Adopsjon"
                                values={{
                                    hvem: morEllerFarTekst ? capitalizeFirstLetter(morEllerFarTekst) : '',
                                    erMorHovedsøker: erMorDelAvSøknaden,
                                    erFar: medmorEllerFarTekst,
                                    erMedmor,
                                    erFedre: erFarOgFar,
                                    erAdopsjon,
                                }}
                            />
                        </BodyLong>
                    </>
                ) : (
                    <>
                        <Heading size="small">
                            <FormattedMessage
                                id="HvaErMulig.FarFellesperiode"
                                values={{ hvem: medmorEllerFarTekst, erMedmor }}
                            />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage
                                id="HvaErMulig.FarFellesperiode.Tekst"
                                values={{
                                    hvem: morEllerFarTekst ? capitalizeFirstLetter(morEllerFarTekst) : '',
                                    erMorHovedsøker: erMorDelAvSøknaden,
                                    erFar: medmorEllerFarTekst,
                                    erMedmor,
                                    erFedre: erFarOgFar,
                                    erAdopsjon,
                                }}
                            />
                        </BodyLong>
                    </>
                )}
            </div>
        </HStack>
    );
};
