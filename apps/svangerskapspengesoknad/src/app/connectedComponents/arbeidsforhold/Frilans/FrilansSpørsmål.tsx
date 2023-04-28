import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'app/formik/wrappers/DatoInput';
import Block from 'common/components/block/Block';
import ArbeidSeksjon from '../ArbeidSeksjon/ArbeidSeksjon';
import FrilansOppdrag from './FrilansOppdrag';
import { CustomFormikProps } from 'app/types/Formik';
import { cleanupFrilansinformasjon } from '../utils/cleanup';
import _ from 'lodash';
import FrilansListElement from './FrilansListElement';
import InfoBlock from 'common/components/info-block/InfoBlock';

import FrilansSpørsmålInfoBoksTekst from './FrilansSpørsmålInfoBoksTekst';

interface Props {
    formikProps: CustomFormikProps;
}

const FrilansSpørsmål: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();
    const { formikProps } = props;
    const normalisertFrilansinfo = cleanupFrilansinformasjon(formikProps.values.søker);

    const visKomponent = {
        oppstartsdato: formikProps.values.søker.harJobbetSomFrilansSiste10Mnd === true,
        jobberFremdelesSomFrilans: !_.isUndefined(normalisertFrilansinfo.oppstart),
        harJobbetForNærVennEllerFamilieSiste10Mnd: !_.isUndefined(normalisertFrilansinfo.jobberFremdelesSomFrilans),
        driverFosterhjem:
            normalisertFrilansinfo.harJobbetForNærVennEllerFamilieSiste10Mnd === false ||
            (normalisertFrilansinfo.oppdragForNæreVennerEllerFamilieSiste10Mnd !== undefined &&
                normalisertFrilansinfo.oppdragForNæreVennerEllerFamilieSiste10Mnd.length > 0),
    };

    return (
        <>
            <Block>
                <JaNeiSpørsmål
                    name="søker.harJobbetSomFrilansSiste10Mnd"
                    legend={getMessage(intl, 'arbeidsforhold.frilans.erFrilanser')}
                    description={<FrilansSpørsmålInfoBoksTekst />}
                />
            </Block>

            {formikProps.values.søker.harJobbetSomFrilansSiste10Mnd && (
                <>
                    <Block header={{ title: 'Frilans' }}>
                        <InfoBlock>
                            <Block
                                visible={visKomponent.oppstartsdato}
                                margin={visKomponent.jobberFremdelesSomFrilans ? undefined : 'xxs'}
                            >
                                <DatoInput
                                    name="søker.frilansInformasjon.oppstart"
                                    label={getMessage(intl, 'arbeidsforhold.frilans.fraOgMed')}
                                />
                            </Block>

                            <Block visible={visKomponent.jobberFremdelesSomFrilans}>
                                <JaNeiSpørsmål
                                    name={'søker.frilansInformasjon.jobberFremdelesSomFrilans'}
                                    legend={getMessage(intl, 'arbeidsforhold.frilans.erDuFremdelesFrilanser')}
                                />
                            </Block>

                            <Block visible={visKomponent.harJobbetForNærVennEllerFamilieSiste10Mnd}>
                                <ArbeidSeksjon
                                    name="søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd"
                                    listName="søker.frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd"
                                    legend={getMessage(
                                        intl,
                                        'arbeidsforhold.frilans.oppdragForNæreVennerEllerFamilieSiste10Mnd'
                                    )}
                                    buttonLabel={getMessage(intl, 'leggtil')}
                                    summaryListElementComponent={FrilansListElement}
                                    renderForm={(formProps: any) => <FrilansOppdrag {...formProps} />}
                                    summaryListTitle={{ title: getMessage(intl, 'arbeidsforhold.frilans.listetittel') }}
                                />
                            </Block>

                            <Block visible={visKomponent.driverFosterhjem} margin="s">
                                <JaNeiSpørsmål
                                    name={'søker.frilansInformasjon.driverFosterhjem'}
                                    legend={getMessage(intl, 'arbeidsforhold.frilans.driverFosterhjem')}
                                />
                            </Block>
                        </InfoBlock>
                    </Block>
                </>
            )}
        </>
    );
};

export default FrilansSpørsmål;
