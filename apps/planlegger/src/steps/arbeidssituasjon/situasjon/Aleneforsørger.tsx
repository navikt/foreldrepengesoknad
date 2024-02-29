import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';

import { BodyLong, Radio, VStack } from '@navikt/ds-react';

import { Form, RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

const Aleneforsørger: FunctionComponent = () => {
    const intl = useIntl();
    const formMethods = useForm<Arbeidssituasjon>();
    const arbeidssituasjon = formMethods.watch('arbeidssituasjonAlene');

    return (
        <Form formMethods={formMethods}>
            <VStack gap="10">
                <GreenPanel>
                    <RadioGroup
                        label={<FormattedMessage id="barnet.hvaGjelderDeg" />}
                        name="arbeidssituasjonAlene"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'feilmelding.arbeidssituasjonAlene.duMåOppgi',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={ArbeidssituasjonEnum.JOBBER}>
                            <FormattedMessage id="arbeid.jobber" />
                        </Radio>
                        <Radio value={ArbeidssituasjonEnum.UFØR}>
                            <FormattedMessage id="arbeid.ufør" />
                        </Radio>
                        <Radio value={ArbeidssituasjonEnum.INGEN}>
                            <FormattedMessage id="arbeid.ingen" />
                        </Radio>
                    </RadioGroup>
                </GreenPanel>
                {arbeidssituasjon === ArbeidssituasjonEnum.JOBBER && (
                    <Infoboks header={<FormattedMessage id="arbeid.jobber.infoboksDeg" />}>
                        <BodyLong>
                            <FormattedMessage id="arbeid.jobber.infoboks.beskrivelseDeg" />
                        </BodyLong>
                    </Infoboks>
                )}
                {arbeidssituasjon === ArbeidssituasjonEnum.UFØR && (
                    <Infoboks header={<FormattedMessage id="arbeid.infoboksDeg" />}>
                        <BodyLong>
                            <FormattedMessage id="arbeid.infoboks.aktivitet" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="arbeid.ufør.infoboks.beskrivelseDel3Deg" />
                        </BodyLong>
                    </Infoboks>
                )}
                {arbeidssituasjon === ArbeidssituasjonEnum.INGEN && (
                    <Infoboks header={<FormattedMessage id="arbeid.infoboksDeg" />}>
                        <BodyLong>
                            <FormattedMessage id="arbeid.ingen.infoboks.beskrivelseDeg" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="arbeid.infoboks.aktivitet" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="arbeid.ingen.infoboks.beskrivelseDel3Deg" />
                        </BodyLong>
                    </Infoboks>
                )}
            </VStack>
        </Form>
    );
};

export default Aleneforsørger;
