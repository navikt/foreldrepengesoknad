import { Label } from '@navikt/ds-react';
import { Block, intlUtils } from '@navikt/fp-common';
import { SøkerBarn } from '@navikt/fp-types';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import RegistrertePersonalia from 'app/components/registrerte-personalia/RegistrertePersonalia';
import { sorterRegistrerteBarnEtterEldstOgNavn } from 'app/pages/velkommen/velkommenUtils';
import { formaterFødselsdatoerPåBarn, getLeverBarnet, getTittelBarnNårNavnSkalIkkeVises } from 'app/utils/barnUtils';
import dayjs from 'dayjs';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateTermindatoFødsel } from '../validation/omBarnetValidering';

interface Props {
    valgteBarn: SøkerBarn[];
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const ValgteRegistrerteBarn: React.FunctionComponent<Props> = ({ valgteBarn, visibility }: Props) => {
    const intl = useIntl();
    const antallBarn = valgteBarn.length;
    const alleBarnaLever = valgteBarn.every((b) => getLeverBarnet(b));
    valgteBarn.sort(sorterRegistrerteBarnEtterEldstOgNavn);
    const fødselsdatoer = valgteBarn.map((b) => b.fødselsdato);
    const fødselsdato = valgteBarn[0].fødselsdato;
    return (
        <>
            <Block padBottom="xl">
                <div>
                    <Block padBottom="s">
                        <Label>
                            <FormattedMessage id="omBarnet.valgteBarn.tittel" values={{ antallBarn }} />
                        </Label>
                    </Block>
                    {alleBarnaLever ? (
                        valgteBarn.map((barn) => (
                            <Block padBottom="s" key={barn.fnr}>
                                <RegistrertePersonalia
                                    person={barn}
                                    fødselsdatoForVisning={formaterFødselsdatoerPåBarn([barn.fødselsdato])}
                                    visEtternavn={false}
                                />
                            </Block>
                        ))
                    ) : (
                        <Block padBottom="s">
                            <RegistrertePersonalia
                                person={valgteBarn[0]}
                                fødselsdatoForVisning={formaterFødselsdatoerPåBarn(fødselsdatoer)}
                                altTekstHvisUkjentNavn={getTittelBarnNårNavnSkalIkkeVises(
                                    undefined,
                                    fødselsdatoer,
                                    valgteBarn.length,
                                    intl,
                                )}
                                visEtternavn={false}
                            />
                        </Block>
                    )}
                </div>
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.termindato) && valgteBarn.length > 0}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.termindato}
                    label={intlUtils(intl, 'omBarnet.termindato.født')}
                    dayPickerProps={{
                        defaultMonth: dayjs.utc(fødselsdato).toDate(),
                    }}
                    minDate={dayjs(fødselsdato).subtract(1, 'months').toDate()}
                    maxDate={dayjs(fødselsdato).add(6, 'months').toDate()}
                    placeholder={'dd.mm.åååå'}
                    validate={validateTermindatoFødsel(fødselsdato, intl)}
                />
            </Block>
        </>
    );
};

export default ValgteRegistrerteBarn;
