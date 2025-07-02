export const FamilyTree = [
    {
        Name: "Grandpa Joe",
        Age: 78,
        Location: "VillAge A",
        Parents: [
            {
                Name: "Papa John",
                Age: 50,
                Location: "City B",
                Money: 8000,
                Children: [
                    {
                        Name: "Alex",
                        Age: 27,
                        Location: "City C",
                        Money: 3000,
                        Wife: [
                            {
                                Name: "Emily",
                                Age: 26,
                                Location: "City C",
                                Hobbies: ["painting", "reading"],
                                Family: [
                                    {
                                        Father: {
                                            Name: "Mr. Smith",
                                            Age: 58,
                                            Location: "Town D",
                                        },
                                        Mother: {
                                            Name: "Mrs. Smith",
                                            Age: 56,
                                            Location: "Town D",
                                        },
                                    },
                                ],
                            },
                        ],
                        Children: [
                            {
                                Name: "Liam",
                                Age: 4,
                                Location: "City C",
                                Toys: ["blocks", "train", "puzzle"],
                            },
                        ],
                    },
                    {
                        Name: "Anna",
                        Age: 23,
                        Location: "City B",
                        Money: 1500,
                        Husband: [
                            {
                                Name: "Daniel",
                                Age: 25,
                                Location: "City B",
                                Job: "Engineer",
                            },
                        ],
                    },
                ],
            },
            {
                Name: "Uncle Sam",
                Age: 48,
                Location: "City D",
                Money: 6000,
                Children: [
                    {
                        Name: "Cousin Mike",
                        Age: 21,
                        Location: "City E",
                        Money: 2000,
                        Girlfriend: [
                            {
                                Name: "Rachel",
                                Age: 20,
                                Location: "City F",
                                Interests: ["music", "sports"],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        Name: "Grandma Lucy",
        Age: 75,
        Location: "VillAge Z",
        Parents: [
            {
                Name: "Mom Clara",
                Age: 53,
                Location: "City Y",
                Money: 9000,
                Children: [
                    {
                        Name: "Meghan",
                        Age: 28,
                        Location: "City X",
                        Money: 3200,
                        Husband: [
                            {
                                Name: "Ryan",
                                Age: 30,
                                Location: "City X",
                                Job: "Doctor",
                                Pets: [
                                    {
                                        Type: "Dog",
                                        Name: "Buddy",
                                        Age: 3,
                                    },
                                    {
                                        Type: "Cat",
                                        Name: "Whiskers",
                                        Age: 2,
                                    },
                                ],
                            },
                        ],
                        Children: [
                            {
                                Name: "Olivia",
                                Age: 3,
                                FavoriteFoods: ["pasta", "apple", "milk"],
                            },
                            {
                                Name: "Noah",
                                Age: 1,
                                FavoriteFoods: ["banana", "cereal"],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];