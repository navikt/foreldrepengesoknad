import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Radio, ReadMore, VStack } from '@navikt/ds-react';

import { Søkersituasjon, isFarEllerMedmor } from '@navikt/fp-common';
import { RadioGroup, Select } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { BarnetFormValues } from '../OmBarnetFormValues';
import ErFødtPanel from './ErFødtPanel';
import TerminPanel from './TerminPanel';

const finnAntallBarnLabel = (intl: IntlShape, søkerErFarMedmor: boolean, erBarnetFødt?: boolean) => {
    if (erBarnetFødt === true) {
        return intl.formatMessage({ id: 'omBarnet.antallBarn.født' });
    }
    return søkerErFarMedmor
        ? intl.formatMessage({ id: 'omBarnet.antallBarn.termin.far' })
        : intl.formatMessage({ id: 'omBarnet.antallBarn.termin' });
};

const finnAntallBarnIsRequired = (intl: IntlShape, søkerErFarMedmor: boolean, erBarnetFødt?: boolean) => {
    if (erBarnetFødt !== false) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.antallFått.duMåOppgi' });
    }
    return søkerErFarMedmor
        ? intl.formatMessage({ id: 'valideringsfeil.omBarnet.antallVenter.duMåOppgi' })
        : intl.formatMessage({ id: 'valideringsfeil.omBarnet.antallVenterDu.duMåOppgi' });
};

interface Props {
    søkersituasjon: Søkersituasjon;
    erFarEllerMedmor: boolean;
    søknadGjelderEtNyttBarn: boolean;
    arbeidsforhold: Arbeidsforhold[];
}

const FødselPanel: FunctionComponent<Props> = ({
    søkersituasjon,
    erFarEllerMedmor,
    søknadGjelderEtNyttBarn,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const formMethods = useFormContext<BarnetFormValues>();

    const erBarnetFødt = formMethods.watch('erBarnetFødt');
    const antallBarn = formMethods.watch('antallBarn');

    const søkerErFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);

    return (
        <>
            {søknadGjelderEtNyttBarn && (
                <>
                    <div>
                        <RadioGroup
                            name="erBarnetFødt"
                            label={intl.formatMessage({ id: 'omBarnet.erBarnetFødt' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'valideringsfeil.omBarnet.erBarnetFødt.duMåOppgi',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value={true}>Ja</Radio>
                            <Radio value={false}>Nei</Radio>
                        </RadioGroup>
                        {!erFarEllerMedmor && (
                            <ReadMore header={intl.formatMessage({ id: 'omBarnet.erBarnetFødt.readMore.header' })}>
                                <VStack gap="4">
                                    <div>
                                        <FormattedMessage id="omBarnet.erBarnetFødt.readMore.innhold.del1" />
                                    </div>
                                    <FormattedMessage id="omBarnet.erBarnetFødt.readMore.innhold.del2" />
                                </VStack>
                            </ReadMore>
                        )}
                    </div>
                    <RadioGroup
                        name="antallBarn"
                        label={finnAntallBarnLabel(intl, søkerErFarMedmor, erBarnetFødt)}
                        validate={[isRequired(finnAntallBarnIsRequired(intl, søkerErFarMedmor, erBarnetFødt))]}
                    >
                        <Radio value={1}>
                            <FormattedMessage id="omBarnet.radiobutton.ettBarn" />
                        </Radio>
                        <Radio value={2}>
                            <FormattedMessage id="omBarnet.radiobutton.tvillinger" />
                        </Radio>
                        <Radio value={3}>
                            <FormattedMessage id="omBarnet.radiobutton.flere" />
                        </Radio>
                    </RadioGroup>
                    {antallBarn !== undefined && antallBarn === 3 && (
                        <Select name="antallBarnSelect" label="Antall barn">
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </Select>
                    )}
                </>
            )}
            {erBarnetFødt !== true && (
                <TerminPanel
                    søkersituasjon={søkersituasjon}
                    arbeidsforhold={arbeidsforhold}
                    søknadGjelderEtNyttBarn={søknadGjelderEtNyttBarn}
                />
            )}
            {erBarnetFødt === true && søknadGjelderEtNyttBarn && <ErFødtPanel />}
        </>
    );
};

export default FødselPanel;
