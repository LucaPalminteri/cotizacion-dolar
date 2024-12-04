export async function fetchDollarRates() {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares", {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch rates");
    const data = await response.json();

    // Ensure the data is in the correct format
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    // Map and validate the data
    return data.map((rate) => ({
      name: rate.nombre || "Desconocido",
      code: rate.codigo || "unknown",
      buy_price: rate.compra || null,
      sell_price: rate.venta || null,
      last_update: rate.fechaActualizacion || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching dollar rates:", error);
    throw error;
  }
}
