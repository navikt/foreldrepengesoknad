import { useIntl } from 'react-intl';
import Block from 'common/components/block/Block';
import InputField from 'app/formik/wrappers/InputField';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { Næring, Næringsrelasjon as NæringsrelasjonType } from 'app/types/SelvstendigNæringsdrivende';

interface NæringsrelasjonBolkProps {
    values: Næring;
    type: 'revisor' | 'regnskapsfører';
}

type Props = NæringsrelasjonBolkProps;

const Næringsrelasjon: React.FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();
    const { values, type } = props;
    const næringsrelasjon: Partial<NæringsrelasjonType> = values[type] || {};

    const skalViseTelefonnummer = næringsrelasjon.navn !== undefined && næringsrelasjon.navn !== '';
    const skalViseErNærVennEllerFamilie =
        skalViseTelefonnummer && næringsrelasjon.telefonnummer !== undefined && næringsrelasjon.telefonnummer !== '';

    return (
        <>
            <Block>
                <InputField
                    name={`${type}.navn`}
                    label={getMessage(intl, `arbeidsforhold.selvstendig.næringsrelasjon.${type}.navn`)}
                />
            </Block>
            <Block visible={skalViseTelefonnummer}>
                <InputField
                    name={`${type}.telefonnummer`}
                    label={getMessage(intl, `arbeidsforhold.selvstendig.næringsrelasjon.${type}.tlfnr`)}
                />
            </Block>
            <Block visible={skalViseErNærVennEllerFamilie}>
                <JaNeiSpørsmål
                    name={`${type}.erNærVennEllerFamilie`}
                    legend={getMessage(intl, `arbeidsforhold.selvstendig.næringsrelasjon.erNærVennEllerFamilie`)}
                />
            </Block>
        </>
    );
};
export default Næringsrelasjon;
