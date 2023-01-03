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

interface Props {
    valgteBarn: RegistrertBarn[];
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const sorterRegistrerteBarn = (b1: RegistrertBarn, b2: RegistrertBarn): number => {
    if (b1.fornavn === b2.fornavn) {
        return 0;
    }
    return b1.fornavn < b2.fornavn ? -1 : 1;
};

const ValgteRegistrerteBarn: React.FunctionComponent<Props> = ({ valgteBarn, visibility }: Props) => {
    const intl = useIntl();
    const sorterteRegistrerteBarn = valgteBarn.sort(sorterRegistrerteBarn);
    const antallBarn = valgteBarn.length;
    const fødselsdato = valgteBarn[0].fødselsdato;

    return (
        <>
            <Block padBottom="l">
                <div>
                    <Block padBottom="s">
                        <Element>
                            <FormattedMessage id="omBarnet.valgteBarn.tittel" values={{ antallBarn }} />
                        </Element>
                    </Block>
                    {sorterteRegistrerteBarn.map((valgtBarn: RegistrertBarn, index: number) => (
                        <Block padBottom="l" key={index}>
                            <RegistrertePersonalia
                                person={valgtBarn}
                                fødselsdatoForVisning={dateToISOString(valgtBarn.fødselsdato)}
                            />
                        </Block>
                    ))}
                </div>
            </Block>
            <Block visible={visibility.isVisible(OmBarnetFormField.termindato) && valgteBarn.length > 0}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.termindato}
                    label={intlUtils(intl, 'omBarnet.termindato.født')}
                    dayPickerProps={{
                        initialMonth: fødselsdato,
                    }}
                    minDate={dayjs(fødselsdato).subtract(1, 'months').toDate()}
                    maxDate={dayjs(fødselsdato).add(6, 'months').toDate()}
                    placeholder={'dd.mm.åååå'}
                    validate={validateTermindatoFødsel(dateToISOString(fødselsdato), intl)}
                />
            </Block>
        </>
    );
};

export default ValgteRegistrerteBarn;
