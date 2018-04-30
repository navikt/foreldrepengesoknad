import routeConfig from './../../util/routeConfig';

export enum StegRoutes {
  'relasjonTilBarn' = 'relasjon-til-barn',
  'relasjonTilBarnAdopsjon' = 'relasjon-til-barn-adopsjon',
  'annenForelder' = 'annen-forelder',
  'velkommen' = 'velkommen'
}

const getStegRoute = (route: StegRoutes) => {
  return `${routeConfig.ROUTE_PREFIX}/${route}`;
};

export default {
  [getStegRoute(StegRoutes.relasjonTilBarn)]: {
    tittel: 'Relasjon til barn header',
    nesteKnapp: 'Fortsett'
  },
  [getStegRoute(StegRoutes.relasjonTilBarnAdopsjon)]: {
    tittel: 'Relasjon til barn (adopsjon) header',
    nesteKnapp: 'Fortsett'
  },
  [getStegRoute(StegRoutes.annenForelder)]: {
    tittel: 'Annen forelder header',
    nesteKnapp: 'Fortsett'
  }
};
