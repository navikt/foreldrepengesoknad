import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { bemUtils, Block, InfoBlock, intlUtils } from '@navikt/fp-common';
import { YesOrNo, UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';

import EtikettBase from 'nav-frontend-etiketter';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';

import VeilederKompakt from 'app/assets/VeilederKompaktSvg';
import BarnevognIkon from 'app/assets/BarnevognIkon';
import { VelkommenFormComponents, VelkommenFormData, VelkommenFormField } from '../velkommenFormConfig';

import './søknadStatus.less';
import './wrapper.less';
interface SøknadStatusProps {
    sakOpprettetDato: Date;
    sakErAvsluttet: boolean;
}

interface SøknadProps {
    sakOpprettetDato: Date;
    sakErAvsluttet: boolean;
    values: VelkommenFormData;
    visibility: QuestionVisibility<VelkommenFormField, undefined>;
}

const SøknadStatusInfoBlokk: React.FunctionComponent<SøknadStatusProps> = ({ sakOpprettetDato, sakErAvsluttet }) => {
    const bem = bemUtils('søknad-status');
    const intl = useIntl();
    const etikettType = sakErAvsluttet ? 'suksess' : 'fokus';
    const statusTekst = sakErAvsluttet
        ? 'velkommen.sak.status.ferdigBehandlet'
        : 'velkommen.sak.status.underBehandling';
    return (
        <div className="wrapper">
            <InfoBlock>
                <div className={bem.block}>
                    <div className={bem.element('text')}>
                        <Element className="blokk-xxxs">{intlUtils(intl, 'velkommen.sak.type')}</Element>
                        <Normaltekst className="blokk-xxxs">
                            <FormattedMessage
                                id="velkommen.sak.sistEndret"
                                values={{
                                    date: dayjs(sakOpprettetDato).format('D. MMMM YYYY'),
                                }}
                            />
                        </Normaltekst>
                        <EtikettBase className="blokk-xxxs" type={etikettType}>
                            {intlUtils(intl, statusTekst)}
                        </EtikettBase>
                    </div>
                    <div className={bem.element('icon')}>
                        <BarnevognIkon></BarnevognIkon>
                    </div>
                </div>
            </InfoBlock>
        </div>
    );
};

const SøknadStatus: React.FunctionComponent<SøknadProps> = ({
    sakOpprettetDato,
    sakErAvsluttet,
    values,
    visibility,
}) => {
    const intl = useIntl();
    const statusTekstDel1 = sakErAvsluttet
        ? 'velkommen.intro.harSak.del1'
        : 'velkommen.intro.harFørstegangssøknadUnderBehandling';

    return (
        <>
            <Block padBottom="xl">
                <Normaltekst>{intlUtils(intl, statusTekstDel1)}</Normaltekst>
                {sakErAvsluttet && (
                    <Block margin="l">
                        <Normaltekst>{intlUtils(intl, 'velkommen.intro.harSak.del2')}</Normaltekst>
                    </Block>
                )}
            </Block>

            <SøknadStatusInfoBlokk
                sakOpprettetDato={sakOpprettetDato}
                sakErAvsluttet={sakErAvsluttet}
            ></SøknadStatusInfoBlokk>

            <Block visible={visibility.isVisible(VelkommenFormField.vilSøkeOmEndring)} padBottom="l" margin="l">
                <Block padBottom="l">
                    <Element>{intlUtils(intl, 'velkommen.spørsmål.søknadstype.harSak.spørsmål')}</Element>
                </Block>
                <Block padBottom="l">
                    <VelkommenFormComponents.YesOrNoQuestion
                        name={VelkommenFormField.vilSøkeOmEndring}
                        labels={{
                            yes: intlUtils(intl, `velkommen.spørsmål.søknadstype.harSak.alternativ.endring`),
                            no: intlUtils(intl, `velkommen.spørsmål.søknadstype.harSak.alternativ.nyttbarn`),
                        }}
                    />
                </Block>
            </Block>
            <Block visible={values.vilSøkeOmEndring === YesOrNo.NO} padBottom="l">
                <Veilederpanel kompakt svg={<VeilederKompakt svgProps />}>
                    {intlUtils(intl, `velkommen.intro.harSak.veileder`)}
                </Veilederpanel>
            </Block>
            <Block
                padBottom="l"
                visible={
                    visibility.isVisible(VelkommenFormField.vilSøkeOmEndring) &&
                    values.vilSøkeOmEndring === YesOrNo.UNANSWERED
                }
            >
                <UnansweredQuestionsInfo>
                    <FormattedMessage id="steg.footer.spørsmålMåBesvares" />
                </UnansweredQuestionsInfo>
            </Block>
        </>
    );
};

export default SøknadStatus;
