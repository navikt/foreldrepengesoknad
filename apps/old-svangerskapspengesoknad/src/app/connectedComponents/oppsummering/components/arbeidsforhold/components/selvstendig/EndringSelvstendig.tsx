import { FunctionComponent } from 'react';
import moment from 'moment';
import { EndringAvNæringsinntektInformasjon } from 'app/types/SelvstendigNæringsdrivende';
import BEMHelper from 'common/util/bem';
import './endringSelvstendig.less';
import OppsummeringBeskrivelse from '../../../OppsummeringBeskrivelse';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { Label } from '@navikt/ds-react';

interface Props {
    endringAvNæringsinntektInformasjon: EndringAvNæringsinntektInformasjon;
}

const cls = BEMHelper('endringSelvstendig');

const EndringSelvstendig: FunctionComponent<Props> = ({ endringAvNæringsinntektInformasjon }) => {
    const intl = useIntl();
    return (
        <div className={cls.block}>
            <div>
                <Label>
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.endring" />
                </Label>
            </div>
            <Block margin="xxs">{moment(endringAvNæringsinntektInformasjon.dato).format('DD.MM.YYYY')}</Block>
            <Block margin="xxs">
                <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.etterEndring" />{' '}
                {endringAvNæringsinntektInformasjon.næringsinntektEtterEndring}
            </Block>
            <Block margin="xxs">
                <OppsummeringBeskrivelse
                    label={getMessage(intl, 'oppsummering.arbeidsforhold.svar.selvstendig.beskrivelseAvEndring')}
                    innhold={endringAvNæringsinntektInformasjon.forklaring}
                />
            </Block>
        </div>
    );
};

export default EndringSelvstendig;
