import { PersonGroupIcon } from '@navikt/aksel-icons';
import { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, HStack, Heading, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { finnTekstForMedmorEllerFar } from '../../utils/infoboksUtils';

interface Props {
    erFarOgFar: boolean;
}

export const ForeldrepengerSamtidig = ({ erFarOgFar }: Props) => {
    const intl = useIntl();

    const {
        barn,
        familiesituasjon,
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    const bTag = (msg: ReactNode[]) => <b>{msg}</b>;

    const erFødsel = familiesituasjon === 'fødsel';
    const erAdopsjon = familiesituasjon === 'adopsjon';

    const beggeHarRett = rettighetType === 'BEGGE_RETT';

    const erFar =
        erFarOgFar ||
        (!erMedmorDelAvSøknaden && (beggeHarRett || (rettighetType === 'ALENEOMSORG' && søker === 'FAR_MEDMOR')));

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
                <Heading size="small">
                    <FormattedMessage id="HvaErMulig.ForeldrepengerSamtidig" />
                </Heading>

                {!erFarOgFar && (
                    <>
                        <BodyLong>
                            <FormattedMessage id="HvaErMulig.ForeldrepengerSamtidig.ForskjelligeMåter" />
                        </BodyLong>
                        {erFødsel && (
                            <BodyLong>
                                <FormattedMessage
                                    id="HvaErMulig.ForeldrepengerSamtidig.ToUker"
                                    values={{
                                        erAdopsjon: false,
                                        hvem: finnTekstForMedmorEllerFar(
                                            intl,
                                            søker,
                                            rettighetType,
                                            erMedmorDelAvSøknaden,
                                        ),
                                        erFar,
                                        b: bTag,
                                    }}
                                />
                            </BodyLong>
                        )}

                        {barn.antallBarn !== 1 && (
                            <BodyLong>
                                {!erAdopsjon ? (
                                    <FormattedMessage
                                        id="HvaErMulig.ForeldrepengerSamtidig.Flerbarnsdager"
                                        values={{ b: bTag }}
                                    />
                                ) : (
                                    <FormattedMessage
                                        id="HvaErMulig.ForeldrepengerSamtidig.Flerbarnsdager.Adopsjon"
                                        values={{ b: bTag }}
                                    />
                                )}{' '}
                            </BodyLong>
                        )}
                        <BodyLong>
                            <FormattedMessage
                                id="HvaErMulig.ForeldrepengerSamtidig.Opptil100"
                                values={{ erAdopsjon, b: bTag }}
                            />
                        </BodyLong>

                        <BodyLong>
                            <FormattedMessage
                                id="HvaErMulig.ForeldrepengerSamtidig.TilSammen100"
                                values={{ erAdopsjon, erFar, b: bTag }}
                            />
                        </BodyLong>

                        <BodyLong>
                            <FormattedMessage
                                id="HvaErMulig.ForeldrepengerSamtidig.Opptil150"
                                values={{ erAdopsjon, b: bTag }}
                            />
                        </BodyLong>
                    </>
                )}
                {erFarOgFar && beggeHarRett && (
                    <BodyLong>
                        <FormattedMessage
                            id="HvaErMulig.ForeldrepengerSamtidig.Tekst"
                            values={{
                                a: (msg) => (
                                    <Link inlineText href={links.fleksibeltuttak} rel="noreferrer" target="_blank">
                                        {msg}
                                    </Link>
                                ),
                            }}
                        />
                    </BodyLong>
                )}
            </div>
        </HStack>
    );
};
