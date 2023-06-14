import { FunctionComponent } from 'react';
import moment from 'moment';
import Block from 'common/components/block/Block';
import { AnnenInntekt } from 'app/types/AnnenInntekt';
import { FormattedMessage } from 'react-intl';
import { Label } from '@navikt/ds-react';

interface Props {
    annenInntekt: AnnenInntekt;
}

const InformasjonOmAndreInntekter: FunctionComponent<Props> = ({ annenInntekt }) => {
    return (
        <Block margin="xxs">
            <div className="grayInfoBox">
                <Block margin="xxs">
                    <Label>{annenInntekt.type}</Label>
                </Block>
                <div>
                    {moment(annenInntekt.tidsperiode.fom).format('DD.MM.YYYY')} -{' '}
                    {annenInntekt.pågående ? (
                        <FormattedMessage id="pågående" />
                    ) : (
                        moment(annenInntekt.tidsperiode.tom).format('DD.MM.YYYY')
                    )}
                </div>
            </div>
        </Block>
    );
};

export default InformasjonOmAndreInntekter;
