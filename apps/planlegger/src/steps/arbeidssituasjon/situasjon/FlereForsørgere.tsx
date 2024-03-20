import { CheckmarkIcon, XMarkIcon } from '@navikt/aksel-icons';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import Infoboks from 'components/infoboks/Infoboks';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, getFornavnPåAnnenPart, getFornavnPåSøker } from 'types/HvemPlanlegger';

import { BodyLong, Link, Radio, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { isRequired } from '@navikt/fp-validation';

type Props = {
    hvemPlanlegger: HvemPlanlegger;
};

const FlereForsørgere: FunctionComponent<Props> = ({ hvemPlanlegger }) => {
    const intl = useIntl();

    const formMethods = useFormContext<Arbeidssituasjon>();

    const arbeidssituasjon = formMethods.watch('arbeidssituasjon');
    const arbeidssituasjonAnnenPart = formMethods.watch('arbeidssituasjonAnnenPart');

    const fornavnSøker = getFornavnPåSøker(hvemPlanlegger);
    const fornavnAnnenPart = getFornavnPåAnnenPart(hvemPlanlegger);

    return (
        <VStack gap="10">
            {arbeidssituasjon === ArbeidssituasjonEnum.JOBBER && (
                <Infoboks
                    header={
                        <FormattedMessage
                            id="arbeid.jobber.infoboks.harRettTilForeldrepenger"
                            values={{ navn: fornavnSøker }}
                        />
                    }
                    icon={<CheckmarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                >
                    <BodyLong>
                        <FormattedMessage
                            id="arbeid.jobber.infoboks.harJobbetSeksAvTiMnd"
                            values={{ navn: fornavnSøker }}
                        />
                    </BodyLong>
                </Infoboks>
            )}
            {arbeidssituasjon === ArbeidssituasjonEnum.UFØR && (
                <Infoboks
                    header={
                        <FormattedMessage
                            id="arbeid.infoboks.harIkkeRettTilForeldrepenger"
                            values={{ navn: fornavnSøker }}
                        />
                    }
                    icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                >
                    <BodyLong>
                        <FormattedMessage id="arbeid.ufør.infoboks.erUfør" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="arbeid.ufør.infoboks.lesMer"
                            values={{
                                a: (msg: any) => (
                                    <Link href={links.hvorLenge} className="lenke" rel="noreferrer" target="_blank">
                                        {msg}
                                    </Link>
                                ),
                                navn: fornavnSøker,
                            }}
                        />
                    </BodyLong>
                </Infoboks>
            )}
            {arbeidssituasjon === ArbeidssituasjonEnum.INGEN && (
                <Infoboks
                    header={
                        <FormattedMessage
                            id="arbeid.infoboks.harIkkeRettTilForeldrepenger"
                            values={{ navn: fornavnSøker }}
                        />
                    }
                    icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                >
                    <BodyLong>
                        <FormattedMessage id="arbeid.ingen.infoboks.manHarIkkeRett" values={{ navn: fornavnSøker }} />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="arbeid.ingen.infoboks.engangsstønad"
                            values={{
                                a: (msg: any) => (
                                    <Link href={links.veiviser} className="lenke" rel="noreferrer" target="_blank">
                                        {msg}
                                    </Link>
                                ),
                                navn: fornavnSøker,
                            }}
                        />
                    </BodyLong>
                </Infoboks>
            )}
            {arbeidssituasjon && (
                <VStack gap="5">
                    <GreenRadioGroup
                        name="arbeidssituasjonAnnenPart"
                        label={<FormattedMessage id="arbeid.andreForelder" values={{ navn: fornavnAnnenPart }} />}
                        validate={[isRequired(intl.formatMessage({ id: 'validation.required' }))]}
                    >
                        <Radio value={true} autoFocus>
                            <FormattedMessage id="ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="nei" />
                        </Radio>
                    </GreenRadioGroup>
                    {arbeidssituasjonAnnenPart === true && (
                        <Infoboks
                            header={
                                <FormattedMessage
                                    id="arbeid.jobber.infoboks.harRettTilForeldrepenger"
                                    values={{ navn: fornavnAnnenPart }}
                                />
                            }
                            icon={<CheckmarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                        >
                            <BodyLong>
                                <FormattedMessage id="arbeid.jobber.infoboks.harJobbetSeksAvTiMnd" />
                            </BodyLong>
                        </Infoboks>
                    )}
                    {arbeidssituasjonAnnenPart === false && (
                        <Infoboks
                            header={
                                <FormattedMessage
                                    id="arbeid.infoboks.harIkkeRettTilForeldrepenger"
                                    values={{ navn: fornavnAnnenPart }}
                                />
                            }
                            icon={<XMarkIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                        >
                            <BodyLong>
                                <FormattedMessage id="arbeid.ingen.infoboks.manHarIkkeRett" />
                            </BodyLong>
                        </Infoboks>
                    )}
                </VStack>
            )}
        </VStack>
    );
};

export default FlereForsørgere;
