import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, isFar, isFarOgFar, isMor, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';

import { BodyLong, Link, Radio, VStack } from '@navikt/ds-react';

import { intlUtils } from '@navikt/fp-common';
import { Form, RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { HVOR_LENGE_LENKE, VEIVISER_LENKE } from '../ArbeidssituasjonSteg';

export const finnNavn = (hvemPlanlegger: HvemPlanlegger) => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor, hvemPlanlegger.navnPåMedmor];
    }
    if (isMorOgFar(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor, hvemPlanlegger.navnPåFar];
    }
    if (!isFarOgFar(hvemPlanlegger)) {
        throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
    }
    return [hvemPlanlegger.navnPåFar, hvemPlanlegger.navnPåMedfar];
};

export const finnHvemPlanlegger = (hvemPlanlegger: HvemPlanlegger) => {
    if (isMorOgFar(hvemPlanlegger)) {
        return ['mor', 'far'];
    }
    if (isMorOgMedmor(hvemPlanlegger)) {
        return ['mor', 'medmor'];
    }
    if (isMor(hvemPlanlegger)) {
        return ['mor'];
    }
    if (isFar(hvemPlanlegger)) {
        return ['far'];
    }
    if (!isFarOgFar(hvemPlanlegger)) {
        throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
    }
    return ['far', 'far'];
};

const FlereForsørgere: FunctionComponent = () => {
    const intl = useIntl();

    const formMethods = useForm<Arbeidssituasjon>();
    const arbeidssituasjonFørste = formMethods.watch('arbeidssituasjonFørste');
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const navn = finnNavn(hvemPlanlegger);
    const hvem = finnHvemPlanlegger(hvemPlanlegger);

    const fornavnFørste = navn[0].split(' ')[0];
    const fornavnAndre = navn[1].split(' ')[0];

    return (
        <Form formMethods={formMethods}>
            <VStack gap="10">
                <VStack gap="5">
                    <GreenPanel>
                        <RadioGroup
                            name="arbeidssituasjonFørste"
                            label={<FormattedMessage id={'arbeid.hvaGjelder'} values={{ navn: fornavnFørste }} />}
                            validate={[
                                isRequired(
                                    intlUtils(intl, 'feilmelding.arbeidssituasjonFlere.duMåOppgi', { hvem: hvem[0] }),
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

                    {arbeidssituasjonFørste === ArbeidssituasjonEnum.JOBBER && (
                        <Infoboks
                            header={<FormattedMessage id="arbeid.jobber.infoboks" values={{ navn: fornavnFørste }} />}
                        >
                            <BodyLong>
                                <FormattedMessage
                                    id="arbeid.jobber.infoboks.beskrivelse"
                                    values={{ navn: fornavnFørste }}
                                />
                            </BodyLong>
                        </Infoboks>
                    )}
                    {arbeidssituasjonFørste === ArbeidssituasjonEnum.UFØR && (
                        <Infoboks header={<FormattedMessage id="arbeid.infoboks" values={{ navn: fornavnFørste }} />}>
                            <BodyLong>
                                <FormattedMessage id="arbeid.infoboks.aktivitet" />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage
                                    id="arbeid.ufør.infoboks.beskrivelseDel3"
                                    values={{
                                        a: (msg: any) => (
                                            <Link
                                                href={HVOR_LENGE_LENKE}
                                                className="lenke"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                {msg}
                                            </Link>
                                        ),
                                        navn: fornavnFørste,
                                    }}
                                />
                            </BodyLong>
                        </Infoboks>
                    )}
                    {arbeidssituasjonFørste === ArbeidssituasjonEnum.INGEN && (
                        <Infoboks header={<FormattedMessage id="arbeid.infoboks" values={{ navn: fornavnFørste }} />}>
                            <BodyLong>
                                <FormattedMessage
                                    id="arbeid.ingen.infoboks.beskrivelse"
                                    values={{ navn: fornavnFørste }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage id="arbeid.infoboks.aktivitet" />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage
                                    id="arbeid.ingen.infoboks.beskrivelseDel3"
                                    values={{
                                        a: (msg: any) => (
                                            <Link
                                                href={VEIVISER_LENKE}
                                                className="lenke"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                {msg}
                                            </Link>
                                        ),
                                        navn: fornavnFørste,
                                    }}
                                />
                            </BodyLong>
                        </Infoboks>
                    )}
                </VStack>

                <VStack gap="1">
                    <GreenPanel>
                        <RadioGroup
                            name="arbeidssituasjonAndre"
                            label={<FormattedMessage id={'arbeid.andreForelder'} values={{ navn: fornavnAndre }} />}
                            validate={[
                                isRequired(
                                    intlUtils(intl, 'feilmelding.arbeidssituasjonFlere.duMåOppgi', { hvem: hvem[1] }),
                                ),
                            ]}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="nei" />
                            </Radio>
                        </RadioGroup>
                    </GreenPanel>
                </VStack>
            </VStack>
        </Form>
    );
};

export default FlereForsørgere;
