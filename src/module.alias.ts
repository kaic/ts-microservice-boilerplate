import moduleAlias = require('module-alias')

moduleAlias.addAliases({
  '@src': `${__dirname}`,
  '@bin': `${__dirname}/bin`,
  '@config': `${__dirname}/config`
})
