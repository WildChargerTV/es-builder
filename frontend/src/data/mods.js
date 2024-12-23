// * frontend/src/data/mods.js
// ! DATA FINALIZED - DO NOT MODIFY

const weaponMods = [
    {
        "id": 0,
        "name": "Critical Hit Chance Mod",
        "type": "Weapon Mod",
        "description": "Increases the weapon's critical hit chance.",
        "stats": {
            "Critical Hit Chance": 0.01,
            "Energy Consumption": 0.05
        }
    },
    {
        "id": 1,
        "name": "Critical Hit Chance Mod Mk2",
        "type": "Weapon Mod",
        "description": "Greatly increases the weapon's critical hit chance.",
        "stats": {
            "Critical Hit Chance": 0.02,
            "Energy Consumption": 0.1
        }
    },
    {
        "id": 2,
        "name": "Critical Hit Chance Mod Mk3",
        "type": "Weapon Mod",
        "description": "Strikingly increases the weapon's critical hit chance.",
        "stats": {
            "Critical Hit Chance": 0.03,
            "Energy Consumption": 0.2
        }
    },
    {
        "id": 3,
        "name": "Energy Consumption Mod",
        "type": "Weapon Mod",
        "description": "Reduces the weapon's energy consumption.",
        "stats": { "Energy Consumption": -0.1 }
    },
    {
        "id": 4,
        "name": "Energy Consumption Mod Mk2",
        "type": "Weapon Mod",
        "description": "Greatly reduces the weapon's energy consumption.",
        "stats": { "Energy Consumption": -0.15 }
    },
    {
        "id": 5,
        "name": "Energy Consumption Mod Mk3",
        "type": "Weapon Mod",
        "description": "Strikingly reduces the weapon's energy consumption.",
        "stats": { "Energy Consumption": -0.2 }
    },
    {
        "id": 6,
        "name": "Fire Rate Mod",
        "type": "Weapon Mod",
        "description": "Increases the weapon's fire rate and charge speed.",
        "stats": { "Fire Rate": 0.1 }
    },
    {
        "id": 7,
        "name": "Fire Rate Mod Mk2",
        "type": "Weapon Mod",
        "description": "Greatly increases the weapon's fire rate and charge speed.",
        "stats": { "Fire Rate": 0.12 }
    },
    {
        "id": 8,
        "name": "Fire Rate Mod Mk3",
        "type": "Weapon Mod",
        "description": "Strikingly increases the weapon's fire rate and charge speed.",
        "stats": { "Fire Rate": 0.15 }
    },
    {
        "id": 9,
        "name": "Hull Damage Mod",
        "type": "Weapon Mod",
        "description": "Increases the weapon's hull damage.",
        "stats": {
            "Damage": 0.1,
            "Energy Consumption": 0.08
        }
    },
    {
        "id": 10,
        "name": "Hull Damage Mod Mk2",
        "type": "Weapon Mod",
        "description": "Greatly increases the weapon's hull damage.",
        "stats": {
            "Damage": 0.15,
            "Energy Consumption": 0.12
        }
    },
    {
        "id": 11,
        "name": "Hull Damage Mod Mk3",
        "type": "Weapon Mod",
        "description": "Strikingly increases the weapon's hull damage.",
        "stats": {
            "Damage": 0.2,
            "Energy Consumption": 0.16
        }
    },
    {
        "id": 12,
        "name": "Randomize Mod",
        "type": "Weapon Mod",
        "description": "Increases or decreases all weapon stats randomly by a certain percentage.",
        "stats": null
    },
    {
        "id": 13,
        "name": "Range Mod",
        "type": "Weapon Mod",
        "description": "Increases the weapon's range.",
        "stats": {
            "Range": 0.12,
            "Energy Consumption": 0.04
        }
    },
    {
        "id": 14,
        "name": "Range Mod Mk2",
        "type": "Weapon Mod",
        "description": "Greatly increases the weapon's range.",
        "stats": {
            "Range": 0.16,
            "Energy Consumption": 0.05
        }
    },
    {
        "id": 15,
        "name": "Range Mod Mk3",
        "type": "Weapon Mod",
        "description": "Strikingly increases the weapon's range.",
        "stats": {
            "Range": 0.2,
            "Energy Consumption": 0.06
        }
    },
    {
        "id": 16,
        "name": "Shield Damage Mod",
        "type": "Weapon Mod",
        "description": "Increases the weapon's shield damage.",
        "stats": {
            "Damage": 0.1,
            "Energy Consumption": 0.05
        }
    },
    {
        "id": 17,
        "name": "Shield Damage Mod Mk2",
        "type": "Weapon Mod",
        "description": "Greatly increases the weapon's shield damage.",
        "stats": {
            "Damage": 0.15,
            "Energy Consumption": 0.08
        }
    },
    {
        "id": 18,
        "name": "Shield Damage Mod Mk3",
        "type": "Weapon Mod",
        "description": "Strikingly increases the weapon's shield damage.",
        "stats": {
            "Damage": 0.2,
            "Energy Consumption": 0.1
        }
    },
    {
        "id": 19,
        "name": "Shield Piercing Mod",
        "type": "Weapon Mod",
        "description": "Lets a very small percentage of hull damage pierce through the target's shield.",
        "stats": {
            "Energy Consumption": 0.03,
            "Shield Piercing": 0.05
        }
    },
    {
        "id": 20,
        "name": "Shield Piercing Mod Mk2",
        "type": "Weapon Mod",
        "description": "Lets a small percentage of hull damage pierce through the target's shield.",
        "stats": {
            "Energy Consumption": 0.06,
            "Shield Piercing": 0.1
        }
    },
    {
        "id": 21,
        "name": "Shield Piercing Mod Mk3",
        "type": "Weapon Mod",
        "description": "Lets a certain percentage of hull damage pierce through the target's shield.",
        "stats": {
            "Energy Consumption": 0.09,
            "Shield Piercing": 0.15
        }
    },
    {
        "id": 22,
        "name": "Spread Mod",
        "type": "Weapon Mod",
        "description": "Reduces the weapon's spread.",
        "stats": {
            "Spread": -0.2,
            "Energy Consumption": 0.04
        }
    },
    {
        "id": 23,
        "name": "Spread Mod Mk2",
        "type": "Weapon Mod",
        "description": "Greatly reduces the weapon's spread.",
        "stats": {
            "Spread": -0.4,
            "Energy Consumption": 0.08
        }
    },
    {
        "id": 24,
        "name": "Spread Mod Mk3",
        "type": "Weapon Mod",
        "description": "Strikingly reduces the weapon's spread.",
        "stats": {
            "Spread": -0.6,
            "Energy Consumption": 0.12
        }
    },
    {
        "id": 25,
        "name": "Velocity Mod",
        "type": "Weapon Mod",
        "description": "Increases the weapon's projectile velocity.",
        "stats": {
            "Velocity": 0.1,
            "Energy Consumption": 0.07
        }
    },
    {
        "id": 26,
        "name": "Velocity Mod Mk2",
        "type": "Weapon Mod",
        "description": "Greatly increases the weapon's projectile velocity.",
        "stats": {
            "Velocity": 0.15,
            "Energy Consumption": 0.1
        }
    },
    {
        "id": 27,
        "name": "Velocity Mod Mk3",
        "type": "Weapon Mod",
        "description": "Strikingly increases the weapon's projectile velocity.",
        "stats": {
            "Velocity": 0.2,
            "Energy Consumption": 0.14
        }
    }
];

const deviceMods = [
    {
        "id": 28,
        "name": "Cooldown Mod",
        "type": "Device Mod",
        "description": "Reduces the device's cooldown duration.",
        "stats": {
            "Cool Down Duration": -0.2,
            "Energy Consumption": 0.15
        }
    },
    {
        "id": 29,
        "name": "Duration Mod",
        "type": "Device Mod",
        "description": "Increases the device's effect duration.",
        "stats": { 
            "Effect Duration": 0.2,
            "Energy Consumption": 0.15
        }
    },
    {
        "id": 30,
        "name": "Energy Consumption Mod",
        "type": "Device Mod",
        "description": "Reduces the device's energy consumption.",
        "stats": { "Energy Consumption": -0.2 }
    },
    {
        "id": 31,
        "name": "Shield Capacity Mod",
        "type": "Device Mod",
        "description": "Increases the shield's capacity.",
        "stats": {
            "Hitpoints": 0.1,
            "Energy Consumption": 0.2
        }
    },
    {
        "id": 32,
        "name": "Shield Recharge Delay Mod",
        "type": "Device Mod",
        "description": "Reduces the shield's recharge delay.",
        "stats": {
            "Recharge Delay": -0.15,
            "Energy Consumption": 0.15
        }
    },
    {
        "id": 33,
        "name": "Shield Shutdown Duration Mod",
        "type": "Device Mod",
        "description": "Reduces the shield's shut down duration.",
        "stats": {
            "Shutdown Duration": -0.15,
            "Energy Consumption": 0.1
        }
    }
];

export { weaponMods, deviceMods };