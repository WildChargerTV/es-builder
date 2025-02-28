// * frontend/src/data/suffixes.js

/** 
 * Data file containing suffix strings for numbered stats. 
 * 
 * - This file DOES NOT account for string stats such as "Homing", which should have their suffixes 
 * built-in (if any exist).
 * - The "Energy Consumption" stat is unique, in that it's a Per Second stat for Primary Weapons
 * and a Number Stat for Devices. Functions iterating through this datafile should add "PW " or
 * "D " onto the "Energy Consumption" name temporarily in order to catch this differentiation.
 */
const suffixData = [
    /* Degree (°) Stats */
    {
        "suffix": "°",
        "statNames": [
            "Spread",
        ]
    },
    /* Meter (m) Stats */
    {
        "suffix": "m",
        "statNames": [
            "Area Damage Range",
            "Range",
        ]
    },
    /* Meters Per Second (m/s) Stats */
    {
        "suffix": "m/s",
        "statNames": [
            "Velocity",
        ]
    },
    /* Multiplicative (x) Stats */
    {
        "suffix": "x",
        "statNames": [
            "Full Charge Damage Bonus",
            "Full Charge Damage Multiplier",
        ]
    },
    /* Number Stats - No Suffix */
    {
        "suffix": null,
        "statNames": [
            "D Energy Consumption",
            "Full Charge Add. Projectiles",
            "Hull Damage",
            "Shield Damage",
        ]
    },
    /* Per Second (/s) Stats */
    {
        "suffix": "/s",
        "statNames": [
            "PW Energy Consumption",
            "Fire Rate",
            "Hull DPS",
            "Shield DPS",
        ]
    },
    /* Percentage (%) Stats */
    {
        "suffix": "%",
        "statNames": [
            "Critical Hit Chance",
            "Effect",
            "Nano Bots Drop Chance",
            "Shield Piercing",
        ]
    },
    /* Second (s) Stats */
    {
        "suffix": "s",
        "statNames": [
            "Cool Down Duration",
            "Effect Duration",
            "Full Charge Duration",
        ]
    }
];

export default suffixData;