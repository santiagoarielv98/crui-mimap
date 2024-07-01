const errores = [];
const normalizaciones = [];
const direccionesNormalizadas = [
  {
    name: "Marben",
    address: "INT CARLOS RATTI 963",
    contact_phone: " 15-6717-2584.",
  },
  {
    name: "Farmacia Do Nascimento",
    address: "BRANDSEN 3674",
    contact_phone: " 15-3556-2342.",
  },
  {
    name: "Artesanías María",
    address: "BRANDSEN 2364",
    contact_phone:
      ' Tel  15-6197-3605  Facebook  <strong><a href="https   www.facebook.com artisticaydeco" target="_blank" rel="noopener">Atesanías María< a>< strong>&nbsp;  Instagram  <a href="https   www.instagram.com artesaniasmariadeco ?igshid=1ijh9ftq8rh6d" target="_blank" rel="noopener"><strong>Artesanías María< strong>< a>',
  },
  {
    name: "Fancar decoraciones",
    address: "Manuel Belgrano 21899",
    contact_phone:
      ' Tel  4624-1430   <strong><a href="http   www.facebook.com Fancar-Decoraciones-187431708078203 ?ref=page_internal" target="_blank">Facebook  Francar Decoraciones< a>< strong>',
  },
  {
    name: "El Alba",
    address: " Leon Bloy 898",
    contact_phone: " Tel  15-5859-7955",
  },
].map(async function (business) {
  try {
    // https://apis.datos.gob.ar/georef/api/direcciones?direccion=Av.%20Santa%20Fe%20nro%20260%202ndo%20C,%20entre%20Santa%20Rosa%20y%20Col%C3%B3n&departamento=capital&provincia=cordoba
    // pero para ituzaingo
    const response = await fetch(
      `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${business.address}&departamento=ituzaingo&provincia=buenos aires`
    );
    const data = await response.json();
    const location = data.direcciones[0].ubicacion;
    normalizaciones.push({
      name: business.name,
      address: data.direcciones[0].nomenclatura,
      contact_phone: business.contact_phone,
      location: location,
    });
  } catch (error) {
    console.log(error);
    errores.push(business);
  }
});
