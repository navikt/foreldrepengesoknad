import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, IntlShape } from 'react-intl';
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
import { SøkerinfoProps } from '../../types/søkerinfo';
import { selectSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import Barn, { isUfødtBarn, UfødtBarn } from 'app/types/søknad/Barn';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';
import * as countries from 'i18n-iso-countries';
import UtenlandsoppholdForm from './UtenlandsoppholdForm';
import { ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik/lib';
import { formatDate } from 'app/util/dates/dates';
import { UtenlandsoppholdFormValues } from './form/utenlandsoppholdFormTypes';
import { BostedUtland } from './bostedUtlandListAndDialog/types';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import routeConfig from 'app/util/routing/routeConfig';
import { logAmplitudeEvent, PageKeys } from 'app/amplitude/amplitude';

interface StateProps {
    søknad: Søknad;
    stegProps: StegProps;
    barn: Barn;
}

interface OwnProps {
    intl: IntlShape;
}

type Props = SøkerinfoProps & StateProps & DispatchProps & HistoryProps & OwnProps;

const mapBostedTilUtenlandsopphold = (opphold: BostedUtland): Utenlandsopphold => ({
    land: opphold.landkode,
    tidsperiode: {
        fom: opphold.fom,
        tom: opphold.tom,
    },
});

class UtenlandsoppholdSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.hentRelevantUtenlandsopphold = this.hentRelevantUtenlandsopphold.bind(this);
        this.updateReduxState = this.updateReduxState.bind(this);

        if (!props.stegProps.isAvailable) {
            props.dispatch(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
            props.history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        logAmplitudeEvent('sidevisning', {
            app: 'foreldrepengesøknad',
            team: 'foreldrepenger',
            pageKey: PageKeys.Utenlandsopphold,
        });
    }

    updateReduxState(values: UtenlandsoppholdFormValues) {
        const { dispatch } = this.props;
        const reduxObject: InformasjonOmUtenlandsopphold = {
            iNorgeNeste12Mnd: values.skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO,
            iNorgeSiste12Mnd: values.harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO,
            senereOpphold: values.utenlandsoppholdNeste12Mnd.map(mapBostedTilUtenlandsopphold),
            tidligereOpphold: values.utenlandsoppholdSiste12Mnd.map(mapBostedTilUtenlandsopphold),
        };

        dispatch(søknadActions.setInformasjonOmUtenlandsopphold(reduxObject));
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
            termindato = ISOStringToDate(barn.termindato);
        }

        if (termindato !== undefined) {
            return informasjonOmUtenlandsopphold.senereOpphold.find((info) =>
                Tidsperioden(info.tidsperiode).inneholderDato(termindato!)
            );
        }

        return undefined;
    }

    getCountryName(
        countryNames: countries.LocalizedCountryNames<{
            select: 'official';
        }>,
        utenlandsopphold: Utenlandsopphold | undefined
    ) {
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

        return (
            <Steg
                {...stegProps}
                renderProp={(options) => (
                    <>
                        <Block visible={relevantUtenlandsopphold !== undefined}>
                            <VeilederInfo
                                messages={[
                                    {
                                        type: 'normal',
                                        contentIntlKey: 'utenlandsopphold.infoOmFødselsattest',
                                        values: {
                                            land: this.getCountryName(countryNames, relevantUtenlandsopphold),
                                            termindato: formatDate(ISOStringToDate((barn as UfødtBarn).termindato)),
                                        },
                                    },
                                ]}
                            />
                        </Block>
                        <UtenlandsoppholdForm
                            onValidSubmit={(values) => {
                                this.updateReduxState(values);
                                options.onValidFormSubmit();
                            }}
                            informasjonOmUtenlandsoppholdFraSøknad={informasjonOmUtenlandsopphold}
                        />
                    </>
                )}
            />
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps) => {
    const { søknad } = state;
    const { history } = props;
    const { barn } = søknad;

    const stegProps: StegProps = {
        id: StegID.UTENLANDSOPPHOLD,
        renderFormTag: false,
        renderFortsettKnapp: false,
        history,
        isAvailable: isAvailable(StegID.UTENLANDSOPPHOLD, state.søknad, props.søkerinfo, selectSøknadsinfo(state)),
        renderAlleSpørsmålMåBesvares: false,
    };

    return {
        søknad,
        stegProps,
        barn,
        ...props,
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(UtenlandsoppholdSteg));
