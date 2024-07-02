const data = [];

document
  .querySelector("#accordion-aryqd")
  .querySelectorAll(".panel.panel-default")
  .forEach((el) => {
    const category = el.querySelector(".panel-title > a").innerText;
    const items = [];
    el.querySelectorAll(".panel-body ul li").forEach((item) => {
      //industry_name: address / rest
      // Magma: Soler 156 /  Tel: 15-4075-3222 / Instagram: Magma/ Facebook: MAGMA
      const itemText = item.innerText;

      const findSeparator = itemText.indexOf("/");
      const firstInfo = itemText.slice(0, findSeparator);
      const [industry_name, address_name] = firstInfo.split(":");

      const name = industry_name.trim();
      const address = address_name?.trim();

      let phones = [];
      const contacts = itemText.match(
        /\d{2}-\d{4}-\d{4}|\(\d{3}\) \d{3}-\d{4}/g
      );

      if (contacts === null) {
        const search2 = itemText.match(/\d{4}-\d{4}/g);
        if (search2 == null) {
          console.warn("No phone found for:", itemText);
        } else {
          phones = search2;
        }
      } else {
        phones = contacts;
      }

      if (address && phones.length > 0) {
        data.push({
          name,
          address,
          phones,
          category,
        });
      }
    });
  });

// normalizaciones

const errores = [];
const normalizaciones = [];
const direccionesNormalizadas = data.map(async function (business) {
  try {
    // https://apis.datos.gob.ar/georef/api/direcciones?direccion=Av.%20Santa%20Fe%20nro%20260%202ndo%20C,%20entre%20Santa%20Rosa%20y%20Col%C3%B3n&departamento=capital&provincia=cordoba
    // pero para ituzaingo
    const response = await fetch(
      `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${business.address}&departamento=ituzaingo&provincia=buenos aires`
    );
    const data = await response.json();
    const location = data.direcciones[0].ubicacion;

    normalizaciones.push({
      ...business,
      address: data.direcciones[0].nomenclatura,
      location: location,
    });
  } catch (error) {
    console.log(error);
    errores.push(business);
  }
});

/* normalizaciones.push(
  ...[
    {
      name: "Artesanías María",
      address: "CNL CARLOS F DE BRANDSEN 2364",
      phones: ["15-6197-3605"],
      category: "ARTÍSTICA",
    },
    {
      name: "La Primavera",
      address: "Av. rivadavia 2208",
      phones: ["15-6295-6725"],
      category: "FÁBRICAS PASTAS",
    },
    {
      name: "Red Del Hogar",
      address: "Av. rivadavia 21646",
      phones: ["15-5248-9906"],
      category: "ELECTRODOMÉSTICOS Y ARTÍCULOS PARA EL HOGAR",
    },
    {
      name: "Farmacia Luís",
      address: "Int. Carlos Ratti 2001",
      phones: ["15-6035-6186"],
      category: "FARMACIAS",
    },
    {
      name: "Anandá",
      address: "Balbastro 1795",
      phones: ["15-2253-2999"],
      category: "CHURRERÍA",
    },
    {
      name: "Sanitarios y Ferreteria Villa Ariza",
      address: "Presidente Perón 7402",
      phones: ["15-4472-1820"],
      category: "FERRETERÍAS",
    },
    {
      name: "Sanitarios y Ferreteria Ituzaingó",
      address: "Int. Carlos Ratti 1250",
      phones: ["15-6241-1350"],
      category: "FERRETERÍAS",
    },
    {
      name: "Farmacia Del Pueblo",
      address: "Av. rivadavia 21824",
      phones: ["15-3916-9572"],
      category: "FARMACIAS",
    },
    {
      name: "Farmacia Do Nascimento",
      address: "CNL CARLOS F DE BRANDSEN 3674",
      phones: ["15-3556-2342"],
      category: "FARMACIAS",
    },
    {
      name: "El Buen Gusto (Fiambreria, Despensa y Granja)",
      address: "jose maria Paz 1053",
      phones: ["15-2172-3609"],
      category: "CARNICERÍAS Y GRANJAS",
    },
    {
      name: "Farmacia Nuevo Puente",
      address: "pres Perón 6501",
      phones: ["(230) 421-7397"],
      category: "FARMACIAS",
    },
    {
      name: "Granja Dos Cuñados",
      address: "pres Perón 6871",
      phones: ["4006-0150"],
      category: "CARNICERÍAS Y GRANJAS",
    },
    {
      name: "Marben",
      address: "Int. Carlos Ratti 963",
      phones: ["15-6717-2584"],
      category: "BICICLETERÍA",
    },
    {
      name: "Los Rosales",
      address: "Av. rivadavia 21500",
      phones: ["15-5567-2738"],
      category: "FIAMBRERÍAS",
    },
    {
      name: "La Muchita",
      address: "Int. Carlos Ratti 1301",
      phones: ["15-4097-2886"],
      category: "FIAMBRERÍAS",
    },
    {
      name: "La Blanquería",
      address: "Av. rivadavia 21526",
      phones: ["15-3206-5792"],
      category: "COLCHONERÍA",
    },
    {
      name: "Noni – Noni",
      address: "Bacacay 699",
      phones: ["15-2836-7963"],
      category: "COLCHONERÍA",
    },
    {
      name: "Decor Interiores",
      address: "Av. rivadavia 21898",
      phones: ["4624-7481"],
      category: "DECORACIÓN",
    },
    {
      name: "Fancar decoraciones",
      address: "Gral. Manuel Belgrano 21899",
      phones: ["4624-1430"],
      category: "DECORACIÓN",
    },
    {
      name: "Dormi piero",
      address: "Av. rivadavia 21546",
      phones: ["15-3162-4212"],
      category: "COLCHONERÍA",
    },
    {
      name: "Cintia Decoraciones",
      address: "Av. rivadavia 21638",
      phones: ["15-5451-7661"],
      category: "DECORACIÓN",
    },
    {
      name: "La Casa del Audio Ituzaingó",
      address: "Av. pres Perón 9046 (Colectora Sur)",
      phones: ["15-4172-5297", "15-3628-4767"],
      category: "ELECTRODOMÉSTICOS Y ARTÍCULOS PARA EL HOGAR",
    },
    {
      name: "El Alba",
      address: "LEON BLOY 898",
      phones: ["15-5859-7955"],
      category: "CASAS DE CAMPING",
    },
    {
      name: "El Buen Gusto (Fiambrería, Despensa Y Granja)",
      address: "jose maria Paz 1053",
      phones: ["15-2172-3609"],
      category: "FIAMBRERÍAS",
    },
  ]
);
 */