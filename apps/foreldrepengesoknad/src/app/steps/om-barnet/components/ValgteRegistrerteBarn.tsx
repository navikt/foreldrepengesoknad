import * as React from 'react';
import { RegistrertBarn } from 'app/types/Person';
import RegistrertePersonalia from 'app/components/registrerte-personalia/RegistrertePersonalia';
import { Block, intlUtils } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { OmBarnetFormComponents, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateTermindatoFødsel } from '../validation/omBarnetValidering';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Element } from 'nav-frontend-typografi';
import { formaterFødselsdatoerPåFlereBarn, getLeverBarnet, getTekstForAntallBarn } from 'app/utils/barnUtils';
import { sorterRegistrerteBarnEtterEldstOgNavn } from 'app/pages/velkommen/velkommenUtils';

interface Props {
    valgteBarn: RegistrertBarn[];
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const ValgteRegistrerteBarn: React.FunctionComponent<Props> = ({ valgteBarn, visibility }: Props) => {
    const intl = useIntl();
    const antallBarn = valgteBarn.length;
    const alleBarnaLever = valgteBarn.every((b) => getLeverBarnet(b));
    const sortedBarn = valgteBarn.sort(sorterRegistrerteBarnEtterEldstOgNavn);
    const formattertFødselsdato = formaterFødselsdatoerPåFlereBarn(sortedBarn.map((b) => b.fødselsdato));
    return (
        <>
            <Block padBottom="l">
                <div>
                    <Block padBottom="s">
                        <Element>
                            <FormattedMessage id="omBarnet.valgteBarn.tittel" values={{ antallBarn }} />
                        </Element>
                    </Block>
                    {alleBarnaLever ? (
                        sortedBarn.map((barn: RegistrertBarn, index: number) => (
                            <Block padBottom="l" key={index}>
                                <RegistrertePersonalia person={barn} fødselsdatoForVisning={formattertFødselsdato} />
                            </Block>
                        ))
                    ) : (
                        <Block padBottom="l">
                            <RegistrertePersonalia
                                person={sortedBarn[0]}
                                fødselsdatoForVisning={formattertFødselsdato}
                                altTekstHvisUkjentNavn={getTekstForAntallBarn(sortedBarn.length, intl)}
                            />
                        </Block>
                    )}
                </div>
            </Block>
            <Block visible={visibility.isVisible(OmBarnetFormField.termindato) && valgteBarn.length > 0}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.termindato}
                    label={intlUtils(intl, 'omBarnet.termindato.født')}
                    dayPickerProps={{
                        initialMonth: sortedBarn[0].fødselsdato,
                    }}
                    minDate={dayjs(sortedBarn[0].fødselsdato).subtract(1, 'months').toDate()}
                    maxDate={dayjs(sortedBarn[0].fødselsdato).add(6, 'months').toDate()}
                    placeholder={'dd.mm.åååå'}
                    validate={validateTermindatoFødsel(dateToISOString(sortedBarn[0].fødselsdato), intl)}
                />
            </Block>
        </>
    );
};

export default ValgteRegistrerteBarn;
