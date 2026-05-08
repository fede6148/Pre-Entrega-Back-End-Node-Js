
//"Proyecto pre-entega - API Fake Store - GET / POST / DELETE"

const [,, method, endpoint, ...rest] = process.argv;
const [newProduct, price, category] = rest; 
const url = "https://fakestoreapi.com/products"

async function main() {
  
  let resource, id;  // Se declaran variables para "products" e id, que se asignarán según el formato del endpoint
  if (endpoint.includes("/")) {
    const partes = endpoint.split("/");
    resource = partes[0];
    id = partes[1];
  } else {
    resource = endpoint;
    id = rest[0]; // Si no hay ID, se toma el siguiente argumento (para POST)
  }
  
  switch (method) {
    case "GET":
      if (endpoint === "products" || id) {
        const urlRequest = id // Si hay un ID, se construye la URL con él a través de un operador ternario, si no, se usa la URL base
          ? `${url}/${id}`
          : `${url}`;

        console.log(`\nObteniendo datos de ${urlRequest}...\n`);
        try {
          const response = await fetch(urlRequest);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("\nError:", error);
        } finally {
          console.log("\nSolicitud finalizada.\n");
        }
      } else {
        console.log("\nError: Usa el formato: GET products o GET products/{id} o GET products {id}\n");
      }
      break;

    case "POST":
      if (resource === "products" && newProduct && price && category) {
        const newProductData = {
          title: newProduct,
          price: price,
          category: category,
        };

        try {
          const response = await fetch(`${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProductData)
          });
          const data = await response.json();
          console.log('\nProducto creado:', data);
        } catch (error) {
          console.error("\nError:", error);
        } finally {
          console.log("\nSolicitud finalizada.\n");
        }
      } else {
        console.log(
          "\nError: Usa el formato: POST products <nuevo producto> <precio> <categoría>\n"
        );
      }
      break;

    case "DELETE":
      if (resource === "products" && id) {
        try {
          const response = await fetch(
            `${url}/${id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" }
            }
          );
          const data = await response.json();
          console.log('\nProducto eliminado:', data);
        } catch (error) {
          console.error("\nError:", error);
        } finally {
          console.log("\nSolicitud finalizada.\n");
        }
      } else {
        console.log("\nError: Usa el formato: DELETE products/{id} o DELETE products {id}\n");
      }
      break;

    default:
      console.log("\nMétodo no reconocido. Usa GET, POST o DELETE.\n");
  }
}

main();