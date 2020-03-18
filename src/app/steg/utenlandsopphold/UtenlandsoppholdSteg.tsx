import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../redux/reducers';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from '../../types/søknad/InformasjonOmUtenlandsopphold';
import Block from 'common/components/block/Block';
import søknadActions from '../../redux/actions/søknad/søknadActionCreators';
import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../components/applikasjon/steg/Steg';
import { StegID } from '../../util/routing/stegConfig';
import { HistoryProps } from '../../types/common';
import isAvailable from '../../util/steg/isAvailable';
import { utenlandsoppholdErGyldig } from '../../util/validation/steg/utenlandsopphold';
// import { default as visibility } from './visibility';
import { SøkerinfoProps } from '../../types/søkerinfo';
import cleanupUtenlandsOppholdSteg from '../../util/cleanup/cleanupUtenlandsoppholdSteg';
import { selectSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import Barn, { isUfødtBarn, UfødtBarn } from 'app/types/søknad/Barn';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';
import * as countries from 'i18n-iso-countries';
import FormikUtenlandsopphold from './FormikUtenlandsopphold';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { BostedUtland } from '@navikt/sif-common-forms/lib/bosted-utland/types';
import { formatDate } from 'app/util/dates/dates';
import { UtenlandsoppholdFormValues } from './formTypes/utenlandsoppholdFormTypes';

interface StateProps {
    søknad: Søknad;
    stegProps: StegProps;
    barn: Barn;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

const mapBostedTilUtenlandsopphold = (opphold: BostedUtland): Utenlandsopphold => ({
    land: opphold.landkode,
    tidsperiode: {
        fom: opphold.fom,
        tom: opphold.tom
    }
});

class UtenlandsoppholdSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.cleanupSteg = this.cleanupSteg.bind(this);
        this.hentRelevantUtenlandsopphold = this.hentRelevantUtenlandsopphold.bind(this);
        this.updateReduxState = this.updateReduxState.bind(this);
    }

    updateReduxState(values: UtenlandsoppholdFormValues) {
        const { dispatch } = this.props;
        const reduxObject: InformasjonOmUtenlandsopphold = {
            iNorgeNeste12Mnd: values.skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO,
            iNorgeSiste12Mnd: values.harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO,
            senereOpphold: values.utenlandsoppholdNeste12Mnd.map(mapBostedTilUtenlandsopphold),
            tidligereOpphold: values.utenlandsoppholdSiste12Mnd.map(mapBostedTilUtenlandsopphold)
        };

        dispatch(søknadActions.setInformasjonOmUtenlandsopphold(reduxObject));
    }

    cleanupSteg() {
        const { dispatch, søknad } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;
        dispatch(søknadActions.updateUtenlandsopphold(cleanupUtenlandsOppholdSteg(informasjonOmUtenlandsopphold)));
    }

    hentRelevantUtenlandsopphold(
        barn: Barn,
        informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold,
        situasjon: Søkersituasjon
    ): Utenlandsopphold | undefined {
        if (informasjonOmUtenlandsopphold.iNorgeNeste12Mnd) {
            return undefined;
        }

        let termindato: Date | undefined;
        if (isUfødtBarn(barn, situasjon)) {
            termindato = barn.termindato;
        }

        if (termindato !== undefined) {
            return informasjonOmUtenlandsopphold.senereOpphold.find((info) =>
                Tidsperioden(info.tidsperiode).inneholderDato(termindato!)
            );
        }

        return undefined;
    }

    getCountryName(countryNames: countries.LocalizedCountryNames, utenlandsopphold: Utenlandsopphold | undefined) {
        if (utenlandsopphold) {
            return countryNames[utenlandsopphold.land];
        }
    }

    render() {
        const { søknad, stegProps, barn, intl } = this.props;
        const { informasjonOmUtenlandsopphold, situasjon } = søknad;
        const språk = intl.locale;
        const countryNames = countries.getNames(språk);
        const relevantUtenlandsopphold = this.hentRelevantUtenlandsopphold(
            barn,
            informasjonOmUtenlandsopphold,
            situasjon
        );
        const visFortsettKnapp = utenlandsoppholdErGyldig(informasjonOmUtenlandsopphold);
        const nyStegProps: StegProps = { ...stegProps, renderFortsettKnapp: visFortsettKnapp };

        return (
            <Steg
                {...nyStegProps}
                onPreSubmit={this.cleanupSteg}
                renderFormTag={false}
                submitButtonId="utenlandsoppholdForm"
            >
                <Block visible={relevantUtenlandsopphold !== undefined}>
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'utenlandsopphold.infoOmFødselsattest',
                                values: {
                                    land: this.getCountryName(countryNames, relevantUtenlandsopphold),
                                    termindato: formatDate((barn as UfødtBarn).termindato)
                                }
                            }
                        ]}
                    />
                </Block>
                <FormikUtenlandsopphold onValidSubmit={this.updateReduxState} />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps) => {
    const { søknad } = state;
    const { history } = props;
    const { barn } = søknad;

    const stegProps: StegProps = {
        id: StegID.UTENLANDSOPPHOLD,
        renderFormTag: true,
        history,
        isAvailable: isAvailable(StegID.UTENLANDSOPPHOLD, state.søknad, props.søkerinfo, selectSøknadsinfo(state))
    };

    return {
        søknad,
        stegProps,
        barn,
        ...props
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UtenlandsoppholdSteg));
