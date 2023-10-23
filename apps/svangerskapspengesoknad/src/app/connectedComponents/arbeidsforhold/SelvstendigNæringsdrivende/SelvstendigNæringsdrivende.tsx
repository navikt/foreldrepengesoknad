import { FunctionComponent, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik, FormikProps } from 'formik';
import { isValid } from 'i18n-iso-countries';

import BEMHelper from 'common/util/bem';
import { Næringstype, Næring } from 'app/types/SelvstendigNæringsdrivende';
import getMessage from 'common/util/i18nUtils';
import CheckboksGruppe from 'app/formik/wrappers/CheckboksPanelGruppe';
import Block from 'common/components/block/Block';
import InputField from 'app/formik/wrappers/InputField';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import getCountries from 'app/utils/getCountries';
import DatoInput from 'app/formik/wrappers/DatoInput';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import VarigEndringAvNæringsinntekt from './VarigEndringAvNæringsinntekt';
import Næringsrelasjon from './Næringsrelasjon';
import { ModalFormProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import Select from 'app/formik/wrappers/Select';
import validateSelvstendigNæringsdrivende from 'app/utils/validation/validateSelvstendigNæringsdrivende';
import { visKomponentSelvstendigNæringsdrivende } from '../utils/visibility';
import { cleanupNæring } from '../utils/cleanup';
import DatoerInputLayout from 'common/components/layout/datoerInputLayout/DatoerInputLayout';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Button, Heading } from '@navikt/ds-react';

import './selvstendigNæringsdrivende.less';

const cls = BEMHelper('selvstendig-næringsdrivende');

type Props = ModalFormProps<Næring>;
const SelvstendigNæringsdrivende: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();
    const { endre, onCancel, element = { næringstyper: [] }, onAdd } = props;
    const countries = useMemo(() => getCountries(true, true, intl.locale), []);
    const onSubmit = (næring: Næring) => {
        onAdd(cleanupNæring(næring) as Næring);
    };

    return (
        <Formik
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore Fiks
            initialValues={element}
            validate={validateSelvstendigNæringsdrivende()}
            onSubmit={onSubmit}
            render={({ handleSubmit, values }: FormikProps<Næring>) => {
                const visKomponent = visKomponentSelvstendigNæringsdrivende(values);
                return (
                    <form
                        className={cls.block}
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit();
                        }}
                    >
                        <Heading size="small" className="title">
                            {getMessage(intl, `arbeidsforhold.selvstendig.tittel${endre ? '.endre' : ''}`)}
                        </Heading>

                        <Block>
                            <CheckboksGruppe
                                name="næringstyper"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.næringstype')}
                                options={Object.values(Næringstype).map((næringstype: Næringstype) => ({
                                    label: getMessage(intl, `næringstype.${næringstype.toLocaleLowerCase()}`),
                                    value: næringstype,
                                }))}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseNavnPåNæringen}>
                            <InputField
                                name="navnPåNæringen"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.navn')}
                                required={true}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseAdvarselFisker}>
                            <Veilederinfo type="advarsel">
                                <FormattedMessage
                                    id="arbeidsforhold.selvstendig.fisker"
                                    values={{ navnPåNæringen: values.navnPåNæringen }}
                                />
                            </Veilederinfo>
                        </Block>

                        <Block visible={visKomponent.skalViseRegistrertINorge}>
                            <JaNeiSpørsmål
                                name="registrertINorge"
                                legend={getMessage(intl, 'arbeidsforhold.selvstendig.registrertINorge', {
                                    navn: values.navnPåNæringen,
                                })}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseLand}>
                            <Select
                                name="registrertILand"
                                label={getMessage(intl, 'arbeidsforhold.seslvstendig.registrertILand')}
                            >
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

                        <Block visible={visKomponent.skalViseOrgNr}>
                            <InputField
                                name="organisasjonsnummer"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.organisasjonsnummer')}
                                required={true}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseTidsperiode}>
                            <DatoerInputLayout
                                fullbredde={true}
                                fra={
                                    <DatoInput
                                        name="tidsperiode.fom"
                                        label={getMessage(intl, 'arbeidsforhold.selvstendig.fom', {
                                            navn: values.navnPåNæringen,
                                        })}
                                    />
                                }
                                til={
                                    <DatoInput
                                        name="tidsperiode.tom"
                                        label={getMessage(intl, 'arbeidsforhold.selvstendig.tom', {
                                            navn: values.navnPåNæringen,
                                        })}
                                    />
                                }
                            />
                        </Block>

                        <Block visible={visKomponent.skalVisevarigEndringAvNæringsinntektBolk}>
                            <VarigEndringAvNæringsinntekt values={values} />
                        </Block>

                        <Block visible={visKomponent.skalViseNæringsinntekt}>
                            <InputField
                                name="næringsinntekt"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.næringsinntekt')}
                                required={true}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseharBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene}>
                            <JaNeiSpørsmål
                                name="harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"
                                legend={getMessage(
                                    intl,
                                    'arbeidsforhold.selvstendig.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene',
                                )}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseOppstartsdato}>
                            <DatoInput
                                name="oppstartsdato"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.oppstartsdato')}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseHarRegnskapsfører}>
                            <JaNeiSpørsmål
                                name="harRegnskapsfører"
                                legend={getMessage(intl, 'arbeidsforhold.selvstendig.harRegnskapsfører')}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseNæringsrelasjonRegnskapsfører}>
                            <Næringsrelasjon type="regnskapsfører" values={values} />
                        </Block>

                        <Block visible={visKomponent.skalViseRevisor}>
                            <JaNeiSpørsmål
                                name="harRevisor"
                                legend={getMessage(intl, 'arbeidsforhold.selvstendig.harRevisor')}
                            />
                        </Block>
                        <Block visible={visKomponent.skalViseNæringsrelasjonRevisor}>
                            <Næringsrelasjon type="revisor" values={values} />
                        </Block>

                        <Block visible={visKomponent.skalViseKanInnhenteOpplysningerFraRevisor}>
                            <JaNeiSpørsmål
                                name="kanInnhenteOpplsyningerFraRevisor"
                                legend={getMessage(
                                    intl,
                                    'arbeidsforhold.selvstendig.kanInnhenteOpplsyningerFraRevisor',
                                )}
                            />
                        </Block>

                        <Block visible={visKomponent.skalViseformButtons}>
                            <Veilederinfo type="advarsel">
                                <FormattedMessage id="arbeidsforhold.selvstendig.bliKontaktet" />
                            </Veilederinfo>
                        </Block>

                        <Block visible={visKomponent.skalViseformButtons}>
                            <Knapperad stil="mobile-50-50">
                                <Button variant="secondary" type="button" onClick={onCancel}>
                                    <FormattedMessage id="avbryt" />
                                </Button>
                                <Button variant="primary" disabled={!isValid} type="submit">
                                    <FormattedMessage id={endre ? 'endre' : 'leggtil'} />
                                </Button>
                            </Knapperad>
                        </Block>
                    </form>
                );
            }}
        />
    );
};

export default SelvstendigNæringsdrivende;
