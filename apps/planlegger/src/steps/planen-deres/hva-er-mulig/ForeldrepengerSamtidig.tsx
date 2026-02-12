import { PersonGroupIcon } from '@navikt/aksel-icons';
import { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    erAdopsjon?: boolean;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    barnet: OmBarnet;
}

export const ForeldrepengerSamtidig = ({ erAdopsjon = false, hvemPlanlegger, arbeidssituasjon, barnet }: Props) => {
    const intl = useIntl();
    const bTag = (msg: ReactNode[]) => <b>{msg}</b>;
    const erFødsel = barnet.erFødsel === true;
    const erFar =
        hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR;
    const erFedre = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;
    const beggeHarRett = utledHvemSomHarRett(arbeidssituasjon) === 'beggeHarRett';

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

                {!erFedre && (
                    <>
                        <BodyLong>
                            <FormattedMessage id="HvaErMulig.ForeldrepengerSamtidig.ForskjelligeMåter" />
                        </BodyLong>
                        {erFødsel && (
                            <BodyLong>
                                <FormattedMessage
                                    id="HvaErMulig.ForeldrepengerSamtidig.ToUker"
                                    values={{
                                        erAdopsjon,
                                        hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                        erFar,
                                        b: bTag,
                                    }}
                                />
                            </BodyLong>
                        )}

                        {barnet.antallBarn !== '1' && (
                            <>
                                <BodyLong>
                                    <FormattedMessage
                                        id="HvaErMulig.ForeldrepengerSamtidig.Flerbarnsdager"
                                        values={{ b: bTag }}
                                    />
                                </BodyLong>
                            </>
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
                {erFedre && beggeHarRett && (
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
