import { Router } from 'express';

/**
 * Som standard serverer vi bare requests til vårt eget domain.
 * Eneste unntaket er veiledere som bruker skjermleser, de kommer fra "https://nav.psplugin.com".
 * Grunnen til at det fungerte før er at selve siden, index.html, er et "top-level navigation", den vil fungere uavhengig av CORS.
 * Men alle andre requests er underlagt cors. Så for at veileder skal få styling på siden må vi tillate å sende css-en dit.
 */
export const setupSkjermleserCssTilgang = (router: Router) => {
    router.use((req, res, next) => {
        if (req.path.endsWith('.css')) {
            res.setHeader('Access-Control-Allow-Origin', 'https://nav.psplugin.com');
        }

        next();
    });
};
