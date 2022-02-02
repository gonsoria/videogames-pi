//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require('axios');
const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const { API_KEY } = process.env



// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {

  const dbVerification = await Genre.findAll();
  if (dbVerification.length < 1) {
    const apiGenresData = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const preLoadDb = apiGenresData.data.results?.map((genre) => {
      return {
        name: genre.name
      }
    })
    // console.log(preLoadDb)
    await Genre.bulkCreate(preLoadDb)
  }
  server.listen(3001, () => {
    console.log('listening port 3001'); 
  });
});
