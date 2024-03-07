import Infoboks from 'components/Infoboks';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import {
    HvemPlanlegger,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
    isFar,
    isFarOgFar,
    isMorOgFar,
    isMorOgMedmor,
} from 'types/HvemPlanlegger';

import { BodyLong, Link, Radio } from '@navikt/ds-react';

import { isRequired } from '@navikt/fp-validation';

import { HVOR_LENGE_LENKE, VEIVISER_LENKE } from '../ArbeidssituasjonSteg';

const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Medmor' });
    }
    if (isFar(hvemPlanlegger) || isFarOgFar(hvemPlanlegger) || isMorOgFar(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Far' });
    }
    return undefined;
};

type Props = {
    hvemPlanlegger: HvemPlanlegger;
};

const FlereForsørgere: FunctionComponent<Props> = ({ hvemPlanlegger }) => {
    const intl = useIntl();

    const formMethods = useFormContext<Arbeidssituasjon>();

    const arbeidssituasjon = formMethods.watch('arbeidssituasjon');

    const fornavnSøker = getFornavnPåSøker(hvemPlanlegger);
    const fornavnAnnenPart = getFornavnPåAnnenPart(hvemPlanlegger);

    return (
        <>
            {arbeidssituasjon === ArbeidssituasjonEnum.JOBBER && (
                <Infoboks header={<FormattedMessage id="arbeid.jobber.infoboks" values={{ navn: fornavnSøker }} />}>
                    <BodyLong>
                        <FormattedMessage id="arbeid.jobber.infoboks.beskrivelse" values={{ navn: fornavnSøker }} />
                    </BodyLong>
                </Infoboks>
            )}
            {arbeidssituasjon === ArbeidssituasjonEnum.UFØR && (
                <Infoboks header={<FormattedMessage id="arbeid.infoboks" values={{ navn: fornavnSøker }} />}>
                    <BodyLong>
                        <FormattedMessage id="arbeid.infoboks.aktivitet" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="arbeid.ufør.infoboks.beskrivelseDel3"
                            values={{
                                a: (msg: any) => (
                                    <Link href={HVOR_LENGE_LENKE} className="lenke" rel="noreferrer" target="_blank">
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
                <Infoboks header={<FormattedMessage id="arbeid.infoboks" values={{ navn: fornavnSøker }} />}>
                    <BodyLong>
                        <FormattedMessage id="arbeid.ingen.infoboks.beskrivelse" values={{ navn: fornavnSøker }} />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage id="arbeid.infoboks.aktivitet" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="arbeid.ingen.infoboks.beskrivelseDel3"
                            values={{
                                a: (msg: any) => (
                                    <Link href={VEIVISER_LENKE} className="lenke" rel="noreferrer" target="_blank">
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
                <GreenRadioGroup
                    name="arbeidssituasjonAnnenPart"
                    label={<FormattedMessage id="arbeid.andreForelder" values={{ navn: fornavnAnnenPart }} />}
                    validate={[
                        isRequired(
                            intl.formatMessage(
                                { id: 'feilmelding.arbeidssituasjonFlere.duMåOppgi' },
                                {
                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                },
                            ),
                        ),
                    ]}
                >
                    <Radio value={true} autoFocus>
                        <FormattedMessage id="ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="nei" />
                    </Radio>
                </GreenRadioGroup>
            )}
        </>
    );
};

export default FlereForsørgere;
