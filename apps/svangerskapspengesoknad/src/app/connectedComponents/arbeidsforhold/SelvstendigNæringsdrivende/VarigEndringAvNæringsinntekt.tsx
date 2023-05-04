import { FunctionComponent } from 'react';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';
import DatoInput from 'app/formik/wrappers/DatoInput';
import InputField from 'app/formik/wrappers/InputField';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import Textarea from 'app/formik/wrappers/Textarea';

interface VarigEndringAvNæringsinntektProps {
    values: Partial<Næring>;
}

type Props = VarigEndringAvNæringsinntektProps;
const VarigEndringAvNæringsinntekt: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();
    const { values } = props;

    const visDato = values.hattVarigEndringAvNæringsinntektSiste4Kalenderår === true;
    const visNæringsinntektEtterEndring =
        visDato &&
        values.endringAvNæringsinntektInformasjon !== undefined &&
        values.endringAvNæringsinntektInformasjon.dato !== undefined;

    const visForklaring =
        visNæringsinntektEtterEndring &&
        values.endringAvNæringsinntektInformasjon !== undefined &&
        values.endringAvNæringsinntektInformasjon.næringsinntektEtterEndring !== undefined;

    return (
        <>
            <Block>
                <JaNeiSpørsmål
                    name="hattVarigEndringAvNæringsinntektSiste4Kalenderår"
                    legend={getMessage(
                        intl,
                        'arbeidsforhold.selvstendig.endringAvNæringsinntektInformasjon.hattVarigEndringAvNæringsinntektSiste4Kalenderår'
                    )}
                />
            </Block>

            <Block visible={visDato}>
                <DatoInput
                    name="endringAvNæringsinntektInformasjon.dato"
                    label={getMessage(intl, 'arbeidsforhold.selvstendig.endringAvNæringsinntektInformasjon.dato')}
                />
            </Block>

            <Block visible={visNæringsinntektEtterEndring}>
                <InputField
                    name="endringAvNæringsinntektInformasjon.næringsinntektEtterEndring"
                    label={getMessage(
                        intl,
                        'arbeidsforhold.selvstendig.endringAvNæringsinntektInformasjon.næringsinntektEtterEndring'
                    )}
                    required={true}
                />
            </Block>

            <Block visible={visForklaring}>
                <Textarea
                    name="endringAvNæringsinntektInformasjon.forklaring"
                    label={getMessage(intl, 'arbeidsforhold.selvstendig.endringAvNæringsinntektInformasjon.forklaring')}
                    maxLength={1000}
                />
            </Block>
        </>
    );
};

export default VarigEndringAvNæringsinntekt;
