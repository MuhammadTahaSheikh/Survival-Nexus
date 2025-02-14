export const survivors = [
    {
      id: 1,
      name: "Alice",
      age: 28,
      gender: "Female",
      lastLocation: { latitude: 34.0522, longitude: -118.2437 },
      inventory: [
        { itemId: 1, quantity: 5 }, // Water
        { itemId: 2, quantity: 10 }, // Food
      ],
      infected: false,
    },
    {
      id: 2,
      name: "Bob",
      age: 35,
      gender: "Male",
      lastLocation: { latitude: 40.7128, longitude: -74.006 },
      inventory: [
        { itemId: 3, quantity: 2 }, // Medication
        { itemId: 4, quantity: 1 }, // C-Virus Vaccine
      ],
      infected: true,
    },
  ];