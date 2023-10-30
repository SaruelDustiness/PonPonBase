const {Events} = require('discord.js');

module.exports = {
  name:Events.ClientReady,
  once:true,
  execute(p){
    console.log(`Pronto! Login realizado como ${p.user.tag}`)
  }

}
