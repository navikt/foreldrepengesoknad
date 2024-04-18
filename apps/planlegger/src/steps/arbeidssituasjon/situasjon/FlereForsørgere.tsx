import { CheckmarkIcon, XMarkIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, getFornavnPåAnnenPart, getFornavnPåSøker, isAlene } from 'types/HvemPlanlegger';

import { BodyLong, Link, Radio, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { isRequired } from '@navikt/fp-validation';

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    status?: Arbeidsstatus;
};

const FlereForsørgere: FunctionComponent<Props> = ({ hvemPlanlegger, status }) => {
    const intl = useIntl();

    const formMethods = useFormContext<Arbeidssituasjon>();
    const jobberAnnenPart = formMethods.watch('jobberAnnenPart');

    const erAlenesøker = isAlene(hvemPlanlegger);
    const fornavnSøker = getFornavnPåSøker(hvemPlanlegger, intl);
    const fornavnAnnenPart = getFornavnPåAnnenPart(hvemPlanlegger, intl);

    return (
        <VStack gap="10">
            {status === Arbeidsstatus.JOBBER && (
                <Infobox
                    header={
                        <FormattedMessage
                            id="FlereForsørgere.Jobber.Infoboks.HarRettTilForeldrepenger"
                            values={{ navn: fornavnSøker }}
                        />
                    }
                    icon={<CheckmarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                    shouldFadeIn
                >
                    <BodyLong>
                        <FormattedMessage
                            id="FlereForsørgere.Jobber.Infoboks.HarJobbetSeksAvTiMnd"
                            values={{ navn: fornavnSøker }}
                        />
                    </BodyLong>
                </Infobox>
            )}
            {status === Arbeidsstatus.UFØR && (
                <Infobox
                    header={
                        <FormattedMessage
                            id="FlereForsørgere.Infoboks.HarIkkeRettTilForeldrepenger"
                            values={{ navn: fornavnSøker }}
                        />
                    }
                    icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                    shouldFadeIn
                >
                    <BodyLong>
                        <FormattedMessage
                            id="FlereForsørgere.Ufør.Infoboks.ErUfør"
                            values={{ erAlenesøker, navn: fornavnSøker }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="FlereForsørgere.Ufør.Infoboks.LesMer"
                            values={{
                                a: (msg: any) => (
                                    <Link
                                        inlineText
                                        href={links.hvorLenge}
                                        className="lenke"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        {msg}
                                    </Link>
                                ),
                                navn: fornavnSøker,
                            }}
                        />
                    </BodyLong>
                </Infobox>
            )}
            {status === Arbeidsstatus.INGEN && (
                <Infobox
                    header={
                        <FormattedMessage
                            id="FlereForsørgere.Infoboks.HarIkkeRettTilForeldrepenger"
                            values={{ navn: fornavnSøker }}
                        />
                    }
                    icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                    shouldFadeIn
                >
                    <BodyLong>
                        <FormattedMessage
                            id="FlereForsørgere.Ingen.Infoboks.ManHarIkkeRett"
                            values={{ navn: fornavnSøker }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="FlereForsørgere.Ingen.Infoboks.Engangsstønad"
                            values={{
                                a: (msg: any) => (
                                    <Link
                                        inlineText
                                        href={links.veiviser}
                                        className="lenke"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        {msg}
                                    </Link>
                                ),
                                navn: fornavnSøker,
                            }}
                        />
                    </BodyLong>
                </Infobox>
            )}
            {status && (
                <>
                    <GreenRadioGroup
                        name="jobberAnnenPart"
                        label={
                            <FormattedMessage id="FlereForsørgere.AndreForelder" values={{ navn: fornavnAnnenPart }} />
                        }
                        validate={[isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' }))]}
                        shouldFadeIn
                    >
                        <Radio value={true} autoFocus>
                            <FormattedMessage id="DefaultMessage.Ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="DefaultMessage.Nei" />
                        </Radio>
                    </GreenRadioGroup>
                    {jobberAnnenPart === true && (
                        <Infobox
                            header={
                                <FormattedMessage
                                    id="FlereForsørgere.Jobber.Infoboks.HarRettTilForeldrepenger"
                                    values={{ navn: fornavnAnnenPart }}
                                />
                            }
                            icon={<CheckmarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                            shouldFadeIn
                        >
                            <BodyLong>
                                <FormattedMessage id="FlereForsørgere.Jobber.Infoboks.HarJobbetSeksAvTiMnd" />
                            </BodyLong>
                        </Infobox>
                    )}
                    {jobberAnnenPart === false && (
                        <Infobox
                            header={
                                <FormattedMessage
                                    id="FlereForsørgere.Infoboks.HarIkkeRettTilForeldrepenger"
                                    values={{ navn: fornavnAnnenPart }}
                                />
                            }
                            icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                            shouldFadeIn
                        >
                            <BodyLong>
                                <FormattedMessage id="FlereForsørgere.Ingen.Infoboks.ManHarIkkeRett" />
                            </BodyLong>
                        </Infobox>
                    )}
                </>
            )}
        </VStack>
    );
};

export default FlereForsørgere;
