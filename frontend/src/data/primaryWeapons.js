// * frontend/src/data/primaryWeapons.js
// ! DATA FINALIZED - DO NOT MODIFY

const primaryWeaponData = [
    {
        "id": 0,
        "name": "Ancient Weapon",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/ancient-weapon.png",
        "description": "This mysterious alien weapon fuses with the ship and replaces its weapon systems completely. The heat created from its raw power cannot be channeled by conventional means which leads to some damage to the ship's hull with every shot fired. However, it will not destroy the ship and its damage output increases with declining hull integrity.",
        "manufacturer": null,
        "disallowed_mods": [-1],
        "required_enhancements": [2],
        "stats": {
            "Hull DPS": 240,
            "Shield DPS": 240,
            "Hull Damage": 120,
            "Shield Damage": 120,
            "Fire Rate": 2,
            "Energy Consumption": 12.6,
            "Range": 4000,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 1,
        "name": "Beam Laser",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/beam-laser.png",
        "description": "A powerful energy beam weapon that deals a constant high amount of both hull and shield damage. The perfect tool to quickly destroy weaker drones.",
        "manufacturer": "Salvor Armament Group",
        "disallowed_mods": [0, 1, 2, 6, 7, 8, 22, 23, 24, 25, 26, 27],
        "stats": {
            "Hull DPS": 48,
            "Shield DPS": 48,
            "Energy Consumption": 4.5,
            "Range": 1600
        }
    },
    {
        "id": 2,
        "name": "Beam Laser M3",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/beam-laser.png",
        "description": "A powerful energy beam weapon that deals a constant high amount of both hull and shield damage. Needs to charge up before firing.",
        "manufacturer": "Salvor Armament Group",
        "disallowed_mods": [0, 1, 2, 6, 7, 8, 22, 23, 24, 25, 26, 27],
        "stats": {
            "Hull DPS": 80,
            "Shield DPS": 80,
            "Energy Consumption": 7.1,
            "Range": 1100
        }
    },
    {
        "id": 3,
        "name": "Coil Gun",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/coil-gun.png",
        "description": "The Coil Gun accelerates ferromagnetic projectiles to ludicrous speeds using arrays of electromagnets.",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [0, 1, 3],
        "disallowed_mods": [25, 26, 27],
        "stats": {
            "Hull DPS": 55.6,
            "Shield DPS": 61.1,
            "Hull Damage": 10,
            "Shield Damage": 11,
            "Fire Rate": 5.6,
            "Energy Consumption": 7.8,
            "Range": 2400,
            "Spread": 0.6,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 4,
        "name": "Coil Gun T-1",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/coil-gun.png",
        "description": "The Coil Gun T-1 accelerates ferromagnetic projectiles to ludicrous speeds using arrays of electromagnets. This special version has a higher fire rate at the cost of higher energy consumption.",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [0, 1, 3],
        "disallowed_mods": [25, 26, 27],
        "stats": {
            "Hull DPS": 63.6,
            "Shield DPS": 54.5,
            "Hull Damage": 7,
            "Shield Damage": 6,
            "Fire Rate": 9.1,
            "Energy Consumption": 7.3,
            "Range": 2200,
            "Spread": 0.8,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 5,
        "name": "Flak Cannon",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/flak-cannon.png",
        "description": "A devastating weapon that shoots explosive bullets which will detonate near their targets dealing splash damage. Very efficient when dealing with groups of enemies!",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [0, 2],
        "stats": {
            "Hull DPS": 73.85,
            "Shield DPS": 30.77,
            "Hull Damage": 48,
            "Shield Damage": 20,
            "Fire Rate": 1.54,
            "Energy Consumption": 6.77,
            "Range": 1900,
            "Velocity": 1090,
            "Spread": 2.2,
            "Area Damage Range": 100,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 6,
        "name": "Flak Cannon 5-5",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/flak-cannon.png",
        "description": "A devastating weapon that shoots explosive bullets which will detonate near their targets dealing splash damage. Very efficent when dealing with groups of enemies! Increased fire rate.",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [0, 2],
        "stats": {
            "Hull DPS": 83.33,
            "Shield DPS": 45.83,
            "Hull Damage": 20,
            "Shield Damage": 11,
            "Fire Rate": 4.17,
            "Energy Consumption": 6.25,
            "Range": 1300,
            "Velocity": 935,
            "Spread": 4,
            "Area Damage Range": 50,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 7,
        "name": "Fusion Blaster",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/fusion-blaster.png",
        "description": "Because of its relatively low range and speed this blaster is best used in close combat. The weapon's synchronized fusion particles deplete common energy shields very fast.",
        "manufacturer": "Federal Arms & Crafts",
        "allowed_ships": [0, 2],
        "stats": {
            "Hull DPS": 60,
            "Shield DPS": 120,
            "Hull Damage": 6,
            "Shield Damage": 12,
            "Fire Rate": 10,
            "Energy Consumption": 6,
            "Range": 900,
            "Velocity": 760,
            "Spread": 2.1,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 8,
        "name": "Fusion Blaster M6-A",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/fusion-blaster.png",
        "description": "Because of its relatively low range and speed this blaster is best used in close combat. The weapon's synchronized fusion particles deplete common energy shields very fast. This version deals more damage but has a lower range than its little brother.",
        "manufacturer": "Federal Arms & Crafts",
        "allowed_ships": [0, 2],
        "stats": {
            "Hull DPS": 83.33,
            "Shield DPS": 133.33,
            "Hull Damage": 25,
            "Shield Damage": 40,
            "Fire Rate": 3.33,
            "Energy Consumption": 7.33,
            "Range": 700,
            "Velocity": 650,
            "Spread": 1.5,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 9,
        "name": "Gatling",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/gatling.png",
        "description": "The good old gatling has been used for decades and still enjoys an excellent reputation when it comes to taking out Outlaw units or stationary objects. The full metal jacket high-velocity projectiles deal a lot of damage to the hull.",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [0, 1, 2],
        "stats": {
            "Hull DPS": 80,
            "Shield DPS": 40,
            "Hull Damage": 4,
            "Shield Damage": 2,
            "Fire Rate": 20,
            "Energy Consumption": 6,
            "Range": 1250,
            "Velocity": 1320,
            "Spread": 1,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 10,
        "name": "Gatling 40mm",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/gatling.png",
        "description": "This version of the Gatling deals high amounts of damage at the cost of range and projectile velocity.",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [0, 1, 2],
        "stats": {
            "Hull DPS": 114.29,
            "Shield DPS": 57.14,
            "Hull Damage": 8,
            "Shield Damage": 4,
            "Fire Rate": 14.29,
            "Energy Consumption": 7.14,
            "Range": 930,
            "Velocity": 1100,
            "Spread": 2,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 11,
        "name": "Goo Gun",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/goo-gun.png",
        "description": "Launches sticky blobs of goo that explode some time after impact. Someone, somewhere thought this was a good idea.",
        "manufacturer": null,
        "allowed_ships": [0, 1, 2],
        "disallowed_mods": [0, 1, 2, 19, 20, 21],
        "stats": {
            "Hull DPS": 138.89,
            "Shield DPS": 116.67,
            "Hull Damage": 25,
            "Shield Damage": 21,
            "Fire Rate": 5.56,
            "Energy Consumption": 7.22,
            "Range": 950,
            "Velocity": 600,
            "Spread": 1.8,
            "Area Damage Range": 50,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 12,
        "name": "Lightning Gun",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/lightning-gun.png",
        "description": "Emits a continuous bolt of lightning that arcs over to additional targets and deals 50% of damage to them.",
        "manufacturer": "Maverick Precision Technologies Inc.",
        "allowed_ships": [0, 3],
        "disallowed_mods": [0, 1, 2, 6, 7, 8, 22, 23, 24, 25, 26, 27],
        "stats": {
            "Hull DPS": 45,
            "Shield DPS": 52,
            "Energy Consumption": 6.5,
            "Range": 1400,
        }
    },
    {
        "id": 13,
        "name": "Neutron Cannon",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/neutron-cannon.png",
        "description": "Fires balls of concentrated neutron energy that deal huge amounts of area damage. Charging this weapon will increase both damage and impact radius.",
        "manufacturer": null,
        "allowed_ships": [0, 2],
        "disallowed_mods": [22, 23, 24],
        "stats": {
            "Hull DPS": 81.36,
            "Shield DPS": 101.69,
            "Hull Damage": 240,
            "Shield Damage": 300,
            "Fire Rate": 6.67,
            "Energy Consumption": 8.4,
            "Range": 2800,
            "Velocity": 840,
            "Full Charge Duration": 2.8,
            "Area Damage Range": 500,
            "Full Charge Damage Bonus": 30,
            "Critical Hit Chance": 0.05,
        }
    },
    {
        "id": 14,
        "name": "Plasma Thrower",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/plasma-thrower.png",
        "description": "Originally conceived as a means to combat bug infestations, this tool can be used as a devastating close quarters weapon that deals shield piercing damage over time.",
        "manufacturer": null,
        "allowed_ships": [0, 1, 3],
        "disallowed_mods": [0, 1, 2, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        "stats": {
            "Hull DPS": 56,
            "Energy Consumption": 6.4,
            "Range": 480,
            "Shield Piercing": 1,
        }
    },
    {
        "id": 15,
        "name": "Pulse Laser",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/pulse-laser.png",
        "description": "Your standard tool for shooting down enemy shields. This is a fast and reliable weapon with good range but when it comes to dealing hull damage you better switch weapons.",
        "manufacturer": "Salvor Armament Group",
        "stats": {
            "Hull DPS": 26.67,
            "Shield DPS": 73.33,
            "Hull Damage": 4,
            "Shield Damage": 11,
            "Fire Rate": 6.67,
            "Energy Consumption": 4.67,
            "Range": 2000,
            "Velocity": 2200,
            "Spread": 0.9,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 16,
        "name": "Pulse Laser KS",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/pulse-laser-ks.png",
        "description": "This is a special version of the fast and reliable Pulse Laser given to all space warriors who took part in making this game possible! Thank you!",
        "manufacturer": "Salvor Armament Group",
        "stats": {
            "Hull DPS": 26.67,
            "Shield DPS": 73.33,
            "Hull Damage": 4,
            "Shield Damage": 11,
            "Fire Rate": 6.7,
            "Energy Consumption": 4.67,
            "Range": 2300,
            "Velocity": 2200,
            "Spread": 0.9,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 17,
        "name": "Pulse Laser MX",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/pulse-laser.png",
        "description": "This version of the standard laser is a more chaotic weapon. When handled correctly it does a lot of damage to shields.",
        "manufacturer": "Salvor Armament Group",
        "stats": {
            "Hull DPS": 55,
            "Shield DPS": 100,
            "Hull Damage": 11,
            "Shield Damage": 20,
            "Fire Rate": 5,
            "Energy Consumption": 7.5,
            "Range": 1600,
            "Velocity": 1650,
            "Spread": 1.4,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 18,
        "name": "Scatter Gun",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/scatter-gun.png",
        "description": "This weapon shoots several low-range projectiles simultaneously, even more when charged to the maximum. Because of its high spread it is best used in close combat.",
        "manufacturer": "Hellhound Ordinance Inc.",
        "allowed_ships": [0, 2],
        "stats": {
            "Hull DPS": 89.41,
            "Shield DPS": 37.65,
            "Hull Damage": 152,
            "Shield Damage": 64,
            "Fire Rate": 0.59,
            "Energy Consumption": 4.8,
            "Range": 620,
            "Velocity": 1125,
            "Spread": 4,
            "Full Charge Duration": 1.2,
            "Full Charge Add. Projectiles": 6,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 19,
        "name": "Scatter Gun 2880",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/scatter-gun.png",
        "description": "This special edition of the scatter gun does not need to be charged. It has a high fire rate but lower damage than the standard version.",
        "manufacturer": "Hellhound Ordinance Inc.",
        "allowed_ships": [0, 2],
        "stats": {
            "Hull DPS": 96,
            "Shield DPS": 36,
            "Hull Damage": 48,
            "Shield Damage": 18,
            "Fire Rate": 2,
            "Energy Consumption": 5.4,
            "Range": 580,
            "Velocity": 970,
            "Spread": 4,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 20,
        "name": "Shock Rifle",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/shock-rifle.png",
        "description": "Instantly emits a ray of energy that deals low shield and hull damage. Unlock this weapon's full potential by charging it before firing which will significantly increase the damage dealt.",
        "manufacturer": "Shiva Systems",
        "allowed_ships": [0, 1, 3],
        "disallowed_mods": [13, 14, 15, 22, 23, 24, 25, 26, 27],
        "stats": {
            "Hull DPS": 41.74,
            "Shield DPS": 41.74,
            "Hull Damage": 96,
            "Shield Damage": 96,
            "Fire Rate": 2,
            "Energy Consumption": 6.9,
            "Range": 4000,
            "Full Charge Duration": 1.8,
            "Full Charge Damage Bonus": 12,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 21,
        "name": "Shock Rifle PRO",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/shock-rifle.png",
        "description": "Instantly emits a ray of energy that deals low shield and hull damage. Unlock this weapon's full potential by charging it before firing which will significantly increase the damage dealt. This special version of the Shock Rifle will slow down time as long as the weapon is charging.",
        "manufacturer": "Shiva Systems",
        "allowed_ships": [0, 1, 3],
        "disallowed_mods": [13, 14, 15, 22, 23, 24, 25, 26, 27],
        "stats": {
            "Hull DPS": 40,
            "Shield DPS": 40,
            "Hull Damage": 84,
            "Shield Damage": 84,
            "Fire Rate": 2,
            "Energy Consumption": 5.9,
            "Range": 3400,
            "Full Charge Duration": 1.6,
            "Full Charge Damage Bonus": 12,
            "Critical Hit Chance": 0.05
        }
    },
    {
        "id": 22,
        "name": "Thermo Gun",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/thermo-gun.png",
        "description": "This weapon may not be amongst the most powerful ones but it shoots homing projectiles that will almost always hit your locked target.",
        "manufacturer": "Maverick Precision Technologies Inc.",
        "allowed_ships": [0, 1, 3],
        "stats": {
            "Hull DPS": 21.43,
            "Shield DPS": 57.14,
            "Hull Damage": 3,
            "Shield Damage": 8,
            "Fire Rate": 7.14,
            "Energy Consumption": 7.14,
            "Range": 1500,
            "Velocity": 715,
            "Spread": 3.5,
            "Critical Hit Chance": 0.05,
            "Homing": "Yes"
        }
    },
    {
        "id": 23,
        "name": "Thermo Gun X10",
        "type": "Primary Weapon",
        "icon": "/primary-weapons/thermo-gun.png",
        "description": "This variation of the Thermo Gun charges up to ten additional homing projectiles and unleashes them on your target.",
        "manufacturer": "Maverick Precision Technologies Inc.",
        "allowed_ships": [0, 1, 3],
        "stats": {
            "Hull DPS": 24.72,
            "Shield DPS": 32.96,
            "Hull Damage": 6,
            "Shield Damage": 8,
            "Fire Rate": 2,
            "Energy Consumption": 6.2,
            "Range": 1400,
            "Velocity": 605,
            "Spread": 10,
            "Full Charge Duration": 1.5,
            "Critical Hit Chance": 0.05,
            "Homing": "Yes"
        }
    }
];

export default primaryWeaponData;