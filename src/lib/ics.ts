export function generateICS(event: { title: string; date: Date; description: string; location?: string }) {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const start = formatDate(event.date);
  // Default to 2 hours duration if no end date
  const end = formatDate(new Date(event.date.getTime() + 2 * 60 * 60 * 1000));

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grogg's Traditional Irish Pub//NONSGML Event//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location || "Grogg's Traditional Irish Pub, Clovis, CA"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsLines.join("\r\n"))}`;
}
