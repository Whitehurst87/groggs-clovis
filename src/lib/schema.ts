export function generateMenuSchema(items: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Grogg's Traditional Irish Pub Menu",
    "mainEntityOfPage": "https://www.groggsclovis.com/menu",
    "hasMenuSection": Object.entries(
      items.reduce((acc, item) => {
        const cat = item.data.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {} as Record<string, any[]>)
    ).map(([category, categoryItems]) => ({
      "@type": "MenuSection",
      "name": category,
      "hasMenuItem": categoryItems.map((item) => ({
        "@type": "MenuItem",
        "name": item.data.name,
        "description": item.data.description,
        "offers": {
          "@type": "Offer",
          "price": typeof item.data.price === 'number' ? item.data.price : undefined,
          "priceCurrency": "USD"
        }
      }))
    }))
  };
}

export function generateRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Grogg's Traditional Irish Pub",
    "image": "https://www.groggsclovis.com/site-logo.png",
    "@id": "https://www.groggsclovis.com",
    "url": "https://www.groggsclovis.com",
    "telephone": "+15593230433",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1225 N Willow Ave #180",
      "addressLocality": "Clovis",
      "addressRegion": "CA",
      "postalCode": "93611",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8252, // Update with real coordinates
      "longitude": -119.7029
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "00:00"
      }
    ],
    "menu": "https://www.groggsclovis.com/menu",
    "servesCuisine": ["Irish", "Pub Fare"]
  };
}

export function generateCateringSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grogg's Traditional Irish Pub",
    "@id": "https://www.groggsclovis.com/#organization",
    "url": "https://www.groggsclovis.com",
    "logo": "https://www.groggsclovis.com/site-logo.png",
    "telephone": "+15593230433",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1225 N Willow Ave #180",
      "addressLocality": "Clovis",
      "addressRegion": "CA",
      "postalCode": "93611",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100057293602987",
      "https://www.instagram.com/groggsclovis"
    ]
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Private Events & Catering — Grogg's Traditional Irish Pub",
    "description": "Private event hosting and catering services at Grogg's Traditional Irish Pub in Clovis, CA. Intimate gatherings, party packages, and full venue buyouts available.",
    "url": "https://www.groggsclovis.com/catering",
    "serviceType": ["Private Event Space", "Catering", "Bar Service"],
    "provider": {
      "@id": "https://www.groggsclovis.com/#organization"
    },
    "areaServed": {
      "@type": "City",
      "name": "Clovis",
      "sameAs": "https://en.wikipedia.org/wiki/Clovis,_California"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Intimate Gathering",
        "description": "Private dining area for up to 30 guests with set menu and bar tab.",
        "eligibleQuantity": { "@type": "QuantitativeValue", "maxValue": 30, "unitText": "guests" }
      },
      {
        "@type": "Offer",
        "name": "Party Package",
        "description": "Semi-private event for 30–80 guests with custom menu and entertainment options.",
        "eligibleQuantity": { "@type": "QuantitativeValue", "minValue": 30, "maxValue": 80, "unitText": "guests" }
      },
      {
        "@type": "Offer",
        "name": "Full Venue Buyout",
        "description": "Exclusive use of the entire pub for 80+ guests with fully custom food, drink, and entertainment.",
        "eligibleQuantity": { "@type": "QuantitativeValue", "minValue": 80, "unitText": "guests" }
      }
    ]
  };

  return [organization, service];
}

export function generateEventSchema(event: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.data.title,
    "startDate": event.data.date.toISOString(),
    "endDate": event.data.endDate ? event.data.endDate.toISOString() : undefined,
    "description": event.data.description,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Grogg's Traditional Irish Pub",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1225 N Willow Ave #180",
        "addressLocality": "Clovis",
        "addressRegion": "CA",
        "postalCode": "93611",
        "addressCountry": "US"
      }
    },
    "image": event.data.image ? `https://www.groggsclovis.com${event.data.image}` : "https://www.groggsclovis.com/site-logo.png",
    "organizer": {
      "@type": "Organization",
      "name": "Grogg's Traditional Irish Pub",
      "url": "https://www.groggsclovis.com"
    }
  };
}
