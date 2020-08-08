module.exports = client => {
  console.log('Tersambung.');
  client.user.setStatus('idle');

  function randomStatus() {
    let guildTotal = client.guilds.cache.size;
    let userTotal = client.users.cache.size;
    let status = ["k@help | KatowProject",
      "type k@help | k.help",
      "k@help | Katow (o゜▽゜)o☆",
      `k@help | Guilds : ${guildTotal}`,
      `K@help | Members: ${userTotal}`]
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], { type: 'PLAYING' });

  }; setInterval(randomStatus, 15000);
}