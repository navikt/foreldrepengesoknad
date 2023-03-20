/* eslint-disable */
import React, { FunctionComponent, useMemo } from 'react';
import { Formik, FormikProps } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';

import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import getCountries from 'app/utils/getCountries';
import getMessage from 'common/util/i18nUtils';
import Select from 'app/formik/wrappers/Select';
import validateOpphold, { getDatoAvgrensninger } from 'app/utils/validation/validateOpphold';
import './oppholdsvalg.less';
import Knapperad from 'common/components/knapperad/Knapperad';
import DatoerInputLayout from 'common/components/layout/datoerInputLayout/DatoerInputLayout';
import { Button, Heading } from '@navikt/ds-react';

const cls = BEMHelper('oppholdsvalg');

interface Props {
    endre: boolean;
    opphold?: Utenlandsopphold;
    type: Oppholdstype;
    onAdd: (opphold: Utenlandsopphold) => void;
    onCancel: () => void;
}

const initialOpphold = {
    land: '',
    tidsperiode: {},
};

const Oppholdvalg: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { endre, opphold = initialOpphold, onAdd, onCancel, type } = props;

    const countries = useMemo(() => getCountries(true, false, intl.locale), []);

    return (
        <Formik
            // @ts-ignore Fiks
            initialValues={opphold}
            validate={validateOpphold(type)}
            onSubmit={onAdd}
            render={({ values, handleSubmit }: FormikProps<Utenlandsopphold>) => {
                const datoAvgrensinger = getDatoAvgrensninger(type, values.tidsperiode.fom, values.tidsperiode.tom);

                const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit();
                };

                return (
                    <form onSubmit={onFormSubmit} className={cls.block}>
                        <Block>
                            <Heading size="small">
                                {getMessage(intl, `utenlandsopphold.modal.tittel${endre ? '.endre' : ''}`)}
                            </Heading>
                        </Block>
                        <Block>
                            <Select name="land" label={getMessage(intl, `utenlandsopphold.${type}.land.label`)}>
                                <option value="" />
                                {countries.map((countryOption: string[]) => {
                                    const [countryCode, countryName] = countryOption;
                                    return (
                                        <option key={countryCode} value={countryCode}>
                                            {countryName}
                                        </option>
                                    );
                                })}
                            </Select>
                        </Block>
                        <Block>
                            <DatoerInputLayout
                                fra={
                                    <DatoInput
                                        fullskjermKalender={true}
                                        name="tidsperiode.fom"
                                        label={getMessage(intl, 'utenlandsopphold.land.fraOgMed')}
                                        datoAvgrensinger={datoAvgrensinger.fom}
                                    />
                                }
                                til={
                                    <DatoInput
                                        fullskjermKalender={true}
                                        name="tidsperiode.tom"
                                        datoAvgrensinger={datoAvgrensinger.tom}
                                        label={getMessage(intl, 'utenlandsopphold.land.tilOgMed')}
                                    />
                                }
                            />
                        </Block>
                        <Knapperad stil="mobile-50-50">
                            <Button variant="secondary" type="button" onClick={onCancel}>
                                <FormattedMessage id="utenlandsopphold.land.avbryt" />
                            </Button>
                            <Button variant="primary">
                                <FormattedMessage
                                    id={endre ? 'utenlandsopphold.land.endre' : 'utenlandsopphold.land.leggTil'}
                                />
                            </Button>
                        </Knapperad>
                    </form>
                );
            }}
        />
    );
};

export default Oppholdvalg;
