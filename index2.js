const [,, method, endpoint, ...rest] = process.argv;
const [newProduct, price, category] = rest; 
const url = "https://fakestoreapi.com/products"

let resource, id;  // Se declaran variables para "products" e id, que se asignarán según el formato del endpoint
  if (endpoint.includes("/")) {
    const partes = endpoint.split("/");
    resource = partes[0];
    id = partes[1];
  } else {
    resource = endpoint;
    id = rest[0]; // Si no hay ID, se toma el siguiente argumento (para POST)
  }

async function getProduct() {
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
      break;}

async function createProduct() {
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
      break;}

async function deleteProduct() {
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
      break;}

async function main() {
  switch (method) {
    case "GET":
        getProduct();
        break;
    case "POST":
        createProduct();
        break;
    case "DELETE":
        deleteProduct();
        break;
    default:
        console.log("\nError: Método no soportado. Usa GET, POST o DELETE.\n");
}}

main();