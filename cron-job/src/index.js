const axios = require('axios').default;
const cheerio = require('cheerio');
const cron = require('node-cron');

cron.schedule('*/2 * * * *',async()=>{
  console.log(`Datos cargados en la BD fecha: ${new Date().toLocaleString()}`);
  const html = await axios.get('http://localhost:3000/');
  const $ = cheerio.load(html.data);
  const filas = $("tbody tr");
  const arreglo = [];
  //Obtener las filas en un arreglo
  filas.each((i, e)=>{
    const fila = $(e).text().toString().trim();
    const datos = fila.split('\n');
    const retiro = {
      numeroCuenta: datos[0].trim(),
      Sucursal: datos[1].trim(),
      fecha: datos[2].trim(),
      hora: datos[3].trim(),
      monto: parseInt(datos[4].trim().substring(1, datos[4].trim().length)),
      comision: parseFloat((datos[5].trim().substring(1, datos[5].trim().length)).replace(',','.'))
    }
    arreglo.push(retiro);
  });

  //Cada elemento del arreglo lo agregamos a la BD
  await arreglo.forEach(async(e) =>{
    await axios.post('http://localhost:5000/api', e)
  })
})
