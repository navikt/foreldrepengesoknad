import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { AppState } from '../../../redux/reducers';
import { AnnenForelderPartial } from '../../../types/s\u00F8knad/AnnenForelder';
import Steg from '../../../components/layout/Steg';
import { StegID } from '../../../util/stegConfig';
import { partials } from './partials';
import { BarnPartial, ForeldreansvarBarn } from '../../../types/søknad/Barn';

import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import { Attachment } from 'storage/attachment/types/Attachment';

interface StateProps {
    barn: BarnPartial;
    søknad: Søknad;
    annenForelder: AnnenForelderPartial;
    attachments: Attachment[];
}

type Props = StateProps & InjectedIntlProps & DispatchProps;
class AnnenForelderSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    shouldRenderInfoOmDenAndreForelderenPartial() {
        const { annenForelder } = this.props;
        return annenForelder.navn && annenForelder.fnr;
    }

    shouldRenderOmsorgPartial() {
        const { søknad } = this.props;
        return søknad.aleneOmOmsorg === true;
    }

    renderPartials(): any[] {
        const { barn, søknad, annenForelder, dispatch } = this.props;
        const partialList = [] as any;
        const erFarEllerMedmor = false;

        partialList.push(
            <partials.AnnenForelderPersonaliaPartial
                søknad={søknad}
                annenForelder={annenForelder}
                erFarEllerMedmor={erFarEllerMedmor}
                dispatch={dispatch}
            />
        );

        if (this.shouldRenderInfoOmDenAndreForelderenPartial()) {
            partialList.push(
                <partials.KjentAndreForelderPartial
                    barn={barn as ForeldreansvarBarn}
                    annenForelder={annenForelder}
                    erFarEllerMedmor={erFarEllerMedmor}
                    søknad={søknad}
                    dispatch={dispatch}
                />
            );
        }
        return partialList;
    }

    render() {
        return <Steg id={StegID.ANNEN_FORELDER}>{this.renderPartials()}</Steg>;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad,
    barn: state.søknad.barn,
    annenForelder: state.søknad.annenForelder,
    attachments: state.attachments
});

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(AnnenForelderSteg)
);
