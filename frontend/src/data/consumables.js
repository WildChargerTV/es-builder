// * frontend/src/data/consumables.js
// ! DATA FINALIZED - DO NOT MODIFY

const consumableData = [
    {
        "id": 0,
        "name": "Anti-Missile Drone",
        "type": "Consumable",
        "icon": "/consumables/anti-missile-drone.png",
        "description": "This drone will automatically engage incoming missiles.",
        "manufacturer": "Vohs Space Industries",
        "stack_size": 4
    },
    {
        "id": 1,
        "name": "Combat Drone",
        "type": "Consumable",
        "icon": "/consumables/combat-drone.png",
        "description": "A friendly combat drone that fights for you.",
        "manufacturer": "Federal Arms & Crafts",
        "stack_size": 4
    },
    {
        "id": 2,
        "name": "Damage Booster",
        "type": "Consumable",
        "icon": "/consumables/damage-booster.png",
        "description": "Increases the damage output for a certain amount of time.",
        "manufacturer": "Maverick Precision Technologies Inc",
        "stack_size": 3,
        "stats": {
            "Effect": 0.4,
            "Effect Duration": 20
        }
    },
    {
        "id": 3,
        "name": "Damage Booster Mk2",
        "type": "Consumable",
        "icon": "/consumables/damage-booster.png",
        "description": "Increases the damage output for a certain amount of time.",
        "manufacturer": "Maverick Precision Technologies Inc",
        "stack_size": 3,
        "stats": {
            "Effect": 0.8,
            "Effect Duration": 30
        }
    },
    {
        "id": 4,
        "name": "Damage Booster Mk3",
        "type": "Consumable",
        "icon": "/consumables/damage-booster.png",
        "description": "Increases the damage output for a certain amount of time.",
        "manufacturer": "Maverick Precision Technologies Inc",
        "stack_size": 3,
        "stats": {
            "Effect": 1.2,
            "Effect Duration": 40
        }
    },
    {
        "id": 5,
        "name": "Damage Limiter",
        "type": "Consumable",
        "icon": "/consumables/damage-limiter.png",
        "description": "Reduces any incoming damage for a short amount of time.",
        "manufacturer": "ANCILE",
        "stack_size": 4,
        "stats": {
            "Effect": -0.4,
            "Effect Duration": 12
        }
    },
    {
        "id": 6,
        "name": "Damage Limiter Mk2",
        "type": "Consumable",
        "icon": "/consumables/damage-limiter.png",
        "description": "Reduces any incoming damage for a short amount of time.",
        "manufacturer": "ANCILE",
        "stack_size": 4,
        "stats": {
            "Effect": -0.5,
            "Effect Duration": 16
        }
    },
    {
        "id": 7,
        "name": "Damage Limiter Mk3",
        "type": "Consumable",
        "icon": "/consumables/damage-limiter.png",
        "description": "Reduces any incoming damage for a short amount of time.",
        "manufacturer": "ANCILE",
        "stack_size": 4,
        "stats": {
            "Effect": -0.6,
            "Effect Duration": 20
        }
    },
    {
        "id": 8,
        "name": "Device Charger",
        "type": "Consumable",
        "icon": "/consumables/device-charger.png",
        "description": "Instantly resets all active device cooldowns, making them available for use.",
        "manufacturer": "First Aeronautics",
        "stack_size": 4,
        "allowed_ships": [0, 2, 3]
    },
    {
        "id": 9,
        "name": "Drone Override",
        "type": "Consumable",
        "icon": "/consumables/drone-override.png",
        "description": "When activated, influences drones within a certain range to fight on your side for a certain amount of time.",
        "manufacturer": "Alioth Electronics",
        "stack_size": 2,
        "stats": {
            "Range": 1500,
            "Effect Duration": 45
        }
    },
    {
        "id": 10,
        "name": "Energy Injector",
        "type": "Consumable",
        "icon": "/consumables/energy-injector.png",
        "description": "Instantly adds a small amount of energy to your core.",
        "manufacturer": "First Aeronautics",
        "stack_size": 4,
        "stats": { "Effect": 50 }
    },
    {
        "id": 11,
        "name": "Energy Injector Mk2",
        "type": "Consumable",
        "icon": "/consumables/energy-injector.png",
        "description": "Instantly adds a medium amount of energy to your core.",
        "manufacturer": "First Aeronautics",
        "stack_size": 4,
        "stats": { "Effect": 75 }
    },
    {
        "id": 12,
        "name": "Energy Injector Mk3",
        "type": "Consumable",
        "icon": "/consumables/energy-injector.png",
        "description": "Instantly adds a huge amount of energy to your core.",
        "manufacturer": "First Aeronautics",
        "stack_size": 4,
        "stats": { "Effect": 120 }
    },
    {
        "id": 13,
        "name": "G&B Distress Beacon",
        "type": "Consumable",
        "icon": "/consumables/gb-distress-beacon.png",
        "description": "Sends out a distress signal and calls in G&B forces to support you. Warning: They will attack you if your standing with G&B is negative!",
        "manufacturer": "Grady & Brunt Prospects",
        "stack_size": 1
    },
    {
        "id": 14,
        "name": "Jump Stabilizer",
        "type": "Consumable",
        "icon": "/consumables/jump-stabilizer.png",
        "description": "Counteracts jump suppressors by overcharging the ship's jump drive.",
        "manufacturer": "Benca",
        "stack_size": 1
    },
    {
        "id": 15,
        "name": "Nano Extractor",
        "type": "Consumable",
        "icon": "/consumables/nano-extractor.png",
        "description": "Damages a random ship component to repair your hull for the equivalent of 4 nano bots.",
        "manufacturer": "Vohs Space Industries",
        "stack_size": 1,
        "stats": { "Effect": 180 }
    },
    {
        "id": 16,
        "name": "Nano Injector",
        "type": "Consumable",
        "icon": "/consumables/nano-injector.png",
        "description": "Instantly repairs a certain amount of hull hitpoints. The exact amount depends on the ship's nano bot efficiency.",
        "manufacturer": "ANCILE",
        "stack_size": 2,
        "stats": { "Effect": 270 }
    },
    {
        "id": 17,
        "name": "Nano Injector Mk2",
        "type": "Consumable",
        "icon": "/consumables/nano-injector.png",
        "description": "Instantly repairs a certain amount of hull hitpoints. The exact amount depends on the ship's nano bot efficiency.",
        "manufacturer": "ANCILE",
        "stack_size": 2,
        "stats": { "Effect": 315 }
    },
    {
        "id": 18,
        "name": "Nano Injector Mk3",
        "type": "Consumable",
        "icon": "/consumables/nano-injector.png",
        "description": "Instantly repairs a certain amount of hull hitpoints. The exact amount depends on the ship's nano bot efficiency.",
        "manufacturer": "ANCILE",
        "stack_size": 2,
        "stats": { "Effect": 360 }
    },
    {
        "id": 19,
        "name": "Nano Kit",
        "type": "Consumable",
        "icon": "/consumables/nano-kit.png",
        "description": "Repairs a random damaged component.",
        "manufacturer": "Vohs Space Industries",
        "stack_size": 1
    },
    {
        "id": 20,
        "name": "Plasma Mine",
        "type": "Consumable",
        "icon": "/consumables/plasma-mine.png",
        "description": "Will explode when moving objects are in close vicinity, dealing shield and hull damage.",
        "manufacturer": "Federal Arms & Crafts",
        "stack_size": 4,
        "stats": {
            "Hull Damage": 250,
            "Shield Damage": 250,
            "Range": 200,
            "Life Time": 30
        }
    },
    {
        "id": 21,
        "name": "Plasma Mine Mk2",
        "type": "Consumable",
        "icon": "/consumables/plasma-mine.png",
        "description": "Will explode when moving objects are in close vicinity, dealing shield and hull damage.",
        "manufacturer": "Federal Arms & Crafts",
        "stack_size": 4,
        "stats": {
            "Hull Damage": 300,
            "Shield Damage": 300,
            "Range": 250,
            "Life Time": 30
        }
    },
    {
        "id": 22,
        "name": "Plasma Mine Mk3",
        "type": "Consumable",
        "icon": "/consumables/plasma-mine.png",
        "description": "Will explode when moving objects are in close vicinity, dealing shield and hull damage.",
        "manufacturer": "Federal Arms & Crafts",
        "stack_size": 4,
        "stats": {
            "Hull Damage": 350,
            "Shield Damage": 350,
            "Range": 300,
            "Life Time": 30
        }
    },
    {
        "id": 23,
        "name": "Plasma-Powered Jump",
        "type": "Consumable",
        "icon": "/consumables/plasma-powered-jump.png",
        "description": "Immediately activates the ship's jump drive without the need to align or charge it. Does not consume any fuel.",
        "manufacturer": "Benca",
        "stack_size": 1
    },
    {
        "id": 24,
        "name": "Sensor Drone",
        "type": "Consumable",
        "icon": "/consumables/sensor-drone.png",
        "description": "While alive, increases the ship's sensor range by 200% of its base value.",
        "manufacturer": "Primesense Instruments",
        "stack_size": 4
    },
    {
        "id": 25,
        "name": "Shield Booster",
        "type": "Consumable",
        "icon": "/consumables/shield-booster.png",
        "description": "Increases your shield's hitpoints and recharge rate for a certain amount of time. Also decreases recharge delay after hits and shield shutdown duration.",
        "manufacturer": "Ancile",
        "stack_size": 3,
        "allowed_ships": [0, 1, 3],
        "stats": {
            "Hitpoints": 0.5,
            "Recharge Rate": 0.5,
            "Recharge Delay": -0.5,
            "Shutdown Duration": -0.5,
            "Effect Duration": 20
        }
    },
    {
        "id": 26,
        "name": "Shield Booster Mk2",
        "type": "Consumable",
        "icon": "/consumables/shield-booster.png",
        "description": "Increases your shield's hitpoints and recharge rate for a certain amount of time. Also decreases recharge delay after hits and shield shutdown duration.",
        "manufacturer": "Ancile",
        "stack_size": 3,
        "allowed_ships": [0, 1, 3],
        "stats": {
            "Hitpoints": 0.75,
            "Recharge Rate": 0.75,
            "Recharge Delay": -0.75,
            "Shutdown Duration": -0.75,
            "Effect Duration": 30
        }
    },
    {
        "id": 27,
        "name": "Shield Booster Mk3",
        "type": "Consumable",
        "icon": "/consumables/shield-booster.png",
        "description": "Increases your shield's hitpoints and recharge rate for a certain amount of time. Also decreases recharge delay after hits and shield shutdown duration.",
        "manufacturer": "Ancile",
        "stack_size": 3,
        "allowed_ships": [0, 1, 3],
        "stats": {
            "Hitpoints": 1,
            "Recharge Rate": 1,
            "Recharge Delay": -1,
            "Shutdown Duration": -1,
            "Effect Duration": 40
        }
    },
    {
        "id": 28,
        "name": "Shield Charge Drone",
        "type": "Consumable",
        "icon": "/consumables/shield-charge-drone.png",
        "description": "A consumable drone that continuously recharges your shield at a certain rate when close to your ship.",
        "manufacturer": "Okkar Fleet",
        "stack_size": 4,
        "allowed_ships": [0, 1, 3]
    },
    {
        "id": 29,
        "name": "Tareen Beacon",
        "type": "Consumable",
        "icon": "/consumables/tareen-beacon.png",
        "description": "Calls Tareen.",
        "manufacturer": null,
        "stack_size": 1
    },
    {
        "id": 30,
        "name": "Throng Beacon",
        "type": "Consumable",
        "icon": "/consumables/throng-beacon.png",
        "description": "Calls Throng.",
        "manufacturer": null,
        "stack_size": 1
    },
    {
        "id": 31,
        "name": "Turret Override",
        "type": "Consumable",
        "icon": "/consumables/turret-override.png",
        "description": "Temporarily overrides any turret within a certain range to fight for you.",
        "manufacturer": "Alioth Electronics",
        "stack_size": 2,
        "allowed_ships": [3],
        "stats": {
            "Range": 1000,
            "Effect Duration": 45
        }
    },
    {
        "id": 32,
        "name": "Webber Drone",
        "type": "Consumable",
        "icon": "/consumables/webber-drone.png",
        "description": "A friendly webber drone that slows down enemies for you.",
        "manufacturer": "Federal Arms & Crafts",
        "stack_size": 4
    }
];

export default consumableData;