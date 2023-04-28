import { FunctionComponent } from 'react';
import moment from 'moment';
import Block from 'common/components/block/Block';
import { FrilansInformasjon } from 'app/types/FrilansInformasjon';
import DuHarSvartNeiListe from '../DuHarSvartNeiListe';
import { FormattedMessage } from 'react-intl';
import { BodyShort, Label } from '@navikt/ds-react';

interface Props {
    frilansInformasjon: Partial<FrilansInformasjon>;
}

const InformasjonOmFrilans: FunctionComponent<Props> = ({ frilansInformasjon }) => {
    return (
        <Block margin="xxs">
            <div className="grayInfoBox">
                <Label>
                    <FormattedMessage id="oppsummering.arbeidsforhold.frilans" />
                </Label>
                <BodyShort>{moment(frilansInformasjon.oppstart).format('DD.MM.YYYY')}</BodyShort>
                <DuHarSvartNeiListe
                    frilansOppsummering={true}
                    hattInntektSomFosterforelder={frilansInformasjon.driverFosterhjem}
                    nyoppstartetFrilanser={frilansInformasjon.jobberFremdelesSomFrilans}
                    hattOppdragForNærVennEllerFamilie={frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd}
                />
            </div>
        </Block>
    );
};

export default InformasjonOmFrilans;
