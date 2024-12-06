export function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return "Hace unos segundos";
    if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
    if (diffMinutes < 120) return "Hace 1 hora";
    if (diffMinutes < 1440) return `Hace ${Math.floor(diffMinutes / 60)} horas`;

    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Fecha no disponible";
  }
}

export function getLastNDays(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 1; i <= n; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
}

export function formatDateShort(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
  });
}
