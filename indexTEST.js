//--- OK ---
// se puede unificar id y newproduct en una sola variable (idOrProduct = process.argv[4]), 
// ya que no se usan al mismo tiempo, 
// pero lo dejo separado para mayor claridad en el código.

console.log("Proyecto pre-entega - API Fake Store - GET / POST / DELETE");

const resource = process.argv[3]; // "products" es el recurso
const id = process.argv[4];       // Numero id (o undefined) para GET/DELETE
const newproduct = process.argv[4]; // Nuevo producto para POST
const price = process.argv[5];     // Precio para POST (debe ser un número, se parsea a float)
const category = process.argv[6];  // Categoría para POST (debe ser una cadena, se pasa tal cual)
const BASE_URL = 'https://fakestoreapi.com/products';

async function getProducts() {  
    const url = id ? `${BASE_URL}/${id}` : BASE_URL;  // Construye la URL si se proporciona un ID o no
    console.log(`Obteniendo datos de ${url}...`);
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Datos:', data);
    } catch (error) {
        console.error('Error:', error);
    } 
    break;
}

async function postProduct() {
    if (newproduct && price && category) {
        try {
            const newProductData = { 
            title: newproduct, 
            price: parseFloat(price), // Asegura que el precio sea un número, se parsea a float
            category: category};
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProductData)
            });
        const data = await response.json();
        console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }}
    else {
        console.log("Error: Usa el formato: POST products, nuevo producto, precio, categoría");
        }   
    break;
}

async function deleteProduct() {
    if (resource === "products" && id) {
        try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }}
    else {
        console.log("Error: Usa el formato: DELETE products {id}");
        }
    break;
}

switch (process.argv[2]) {
    case "GET":
        getProducts();
        break;
    case "POST":
        postProduct();
        break;
    case "DELETE":
        deleteProduct();
        break; 
    default:
        console.log("Método no reconocido. Usa GET, POST o DELETE.");
}

//----------------------------------------------------------------------  

console.log(process.argv.slice(2)); 
switch (process.argv[2]) {    
    case "GET":
        const Products = process.argv[3]; // "productos"
        const id = process.argv[4];       // "15" (o undefined)
    
        if (Products === "products" ) {
            // const url = id ? `https://fakestoreapi.com/products/${id}` : 'https://fakestoreapi.com/products/'; //con operador ternario 
            let url;
                if (id) {
                        url = `https://fakestoreapi.com/products/${id}`;
                } else {
                        url = 'https://fakestoreapi.com/products/';
                }
            console.log(`Obteniendo datos de ${url}...`);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                console.log('Datos:', data);
                })
                .catch(error => console.error('Error:', error))
                .finally(() => {console.log("Solicitud finalizada.")});
        }
    break;
   
    case "POST":
        const Products = process.argv[3]; // "productos"
        const newproduct = process.argv[4];    // "Producto de prueba"
        const price = process.argv[5];
        const category = process.argv[6];
     
        if (Products === "products" && newproduct && price && category) {
            fetch('https://fakestoreapi.com/products/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: newproduct,
                    price: parseFloat(price),
                    category: category
                    })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Datos creados:', data);
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {console.log("Solicitud finalizada.")});
        } else {
            console.log("Error: Usa el formato: POST products, nuevo producto, precio, categoría");
            break;
        }
    break;

// Deberia ir un PUT para actualizar un producto, pero no se especifica en el enunciado, asi que lo dejo para una futura mejora.            
    
    case "DELETE":
        const Products = process.argv[3]; // "productos"
        const id = process.argv[4];       // "15" (o undefined)

        if (Products === "products" && id) {
            fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                })
            .then(response => response.json())
            .then(data => {
                console.log('Datos eliminados:', data);
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {console.log("Solicitud finalizada.")});

        } else {
            console.log("Error: Usa el formato: DELETE products {id}");
            break;
        }
    break; 

    default :
            console.log("Método no reconocido. Usa GET, POST, PUT o DELETE.");
            break;
}

//-------------------------------------------------------------------

const [,, method, resource, idOrProduct, price, category] = process.argv;
const BASE_URL = 'https://fakestoreapi.com/products';

const defaultProductData = {
  description: 'Producto creado vía CLI',
  image: 'https://via.placeholder.com/150'
};

async function getProduct() {
  if (resource !== 'products') {
    console.log('Error: El recurso debe ser "products".');
    return;
  }

  const url = idOrProduct ? `${BASE_URL}/${idOrProduct}` : BASE_URL;
  console.log(`Obteniendo datos de ${url}...`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (Array.isArray(data)) {
      const productos = data.map(({ id, title, price, category }) => ({
        id,
        title,
        price,
        category
      }));

      console.log('Lista completa de productos:', productos);
    } else {
      const { id, title, price, category, description } = data;
      console.log('Producto específico:', {
        id,
        title,
        price,
        category,
        description
      });
    }
  } catch (error) {
    console.error('Error en GET:', error);
  } finally {
    console.log('Solicitud GET finalizada.');
  }
}

async function postProduct() {
  if (resource !== 'products' || !idOrProduct || !price || !category) {
    console.log('Error: Usa POST products <nuevo producto> <precio> <categoría>');
    return;
  }

  const newProductData = {
    ...defaultProductData,
    title: idOrProduct,
    price: parseFloat(price),
    category
  };

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProductData)
    });

    const data = await response.json();
    const { id, title, price: responsePrice, category: responseCategory } = data;
    console.log('Producto creado:', { id, title, responsePrice, responseCategory });
  } catch (error) {
    console.error('Error en POST:', error);
  } finally {
    console.log('Solicitud POST finalizada.');
  }
}

async function deleteProduct() {
  if (resource !== 'products' || !idOrProduct) {
    console.log('Error: Usa DELETE products {id}');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/${idOrProduct}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    const { id, title } = data;
    console.log(`Producto eliminado: ${id} - ${title}`);
  } catch (error) {
    console.error('Error en DELETE:', error);
  } finally {
    console.log('Solicitud DELETE finalizada.');
  }
}

async function main() {
  switch (method) {
    case 'GET':
      await getProduct();
      break;
    case 'POST':
      await postProduct();
      break;
    case 'DELETE':
      await deleteProduct();
      break;
    default:
      console.log('Método no reconocido. Usa GET, POST o DELETE.');
  }
}

main();

