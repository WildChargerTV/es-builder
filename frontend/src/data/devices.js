// * frontend/src/data/devices.js
// ! DATA FINALIZED - DO NOT MODIFY

const deviceData = [
    {
        "id": 0,
        "name": "Adaptive Armor",
        "type": "Passive Device",
        "icon": "/devices/adaptive-armor.png",
        "description": "Increases the ship's armor by a small percentage, effectively reducing any incoming damage.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 2],
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 16,
            "Effect": 0.1
        }
    },
    {
        "id": 1,
        "name": "Adaptive Armor Mk2",
        "type": "Passive Device",
        "icon": "/devices/adaptive-armor.png",
        "description": "Increases the ship's armor by a small percentage, effectively reducing any incoming damage.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 2],
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 24,
            "Effect": 0.15
        }
    },
    {
        "id": 2,
        "name": "Adaptive Armor Mk3",
        "type": "Passive Device",
        "icon": "/devices/adaptive-armor.png",
        "description": "Increases the ship's armor by a small percentage, effectively reducing any incoming damage.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 2],
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 36,
            "Effect": 0.2
        }
    },
    {
        "id": 3,
        "name": "Cloak",
        "type": "Active Device",
        "icon": "/devices/cloak.png",
        "description": "Will cloak your ship for a certain amount of time, rendering you hidden on enemy radars. When firing your weapons enemies may spot you again.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_ships": [1],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 30,
            "Effect Duration": 14,
            "Cool Down Duration": 28
        }
    },
    {
        "id": 4,
        "name": "Cloak Mk2",
        "type": "Active Device",
        "icon": "/devices/cloak.png",
        "description": "Will cloak your ship for a certain amount of time, rendering you hidden on enemy radars. When firing your weapons enemies may spot you again.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_ships": [1],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 40,
            "Effect Duration": 18,
            "Cool Down Duration": 24
        }
    },
    {
        "id": 5,
        "name": "Cloak Mk3",
        "type": "Active Device",
        "icon": "/devices/cloak.png",
        "description": "Will cloak your ship for a certain amount of time, rendering you hidden on enemy radars. When firing your weapons enemies may spot you again.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_ships": [1],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 50,
            "Effect Duration": 22,
            "Cool Down Duration": 20
        }
    },
    {
        "id": 6,
        "name": "Damage Converter",
        "type": "Passive Device",
        "icon": "/devices/damage-converter.png",
        "description": "Converts a percentage of incoming damage, both shield and hull, into usable energy at a certain ratio.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 18,
            "Conversion Percentage": 0.05,
            "Conversion Ratio": 3
        }
    },
    {
        "id": 7,
        "name": "Damage Converter Mk2",
        "type": "Passive Device",
        "icon": "/devices/damage-converter.png",
        "description": "Converts a percentage of incoming damage, both shield and hull, into usable energy at a certain ratio.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 28,
            "Conversion Percentage": 0.05,
            "Conversion Ratio": 4
        }
    },
    {
        "id": 8,
        "name": "Damage Converter Mk3",
        "type": "Passive Device",
        "icon": "/devices/damage-converter.png",
        "description": "Converts a percentage of incoming damage, both shield and hull, into usable energy at a certain ratio.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 32,
            "Conversion Percentage": 0.05,
            "Conversion Ratio": 5
        }
    },
    {
        "id": 9,
        "name": "Decoy Generator",
        "type": "Active Device",
        "icon": "/devices/decoy-generator.png",
        "description": "Creates two holographic projections of your ship that may trick enemies into attacking them instead of you.",
        "manufacturer": null,
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 35,
            "Effect Duration": 30,
            "Cool Down Duration": 60
        }
    },
    {
        "id": 10,
        "name": "Decoy Generator Mk2",
        "type": "Active Device",
        "icon": "/devices/decoy-generator.png",
        "description": "Creates two holographic projections of your ship that may trick enemies into attacking them instead of you.",
        "manufacturer": null,
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 40,
            "Effect Duration": 45,
            "Cool Down Duration": 50
        }
    },
    {
        "id": 11,
        "name": "Decoy Generator Mk3",
        "type": "Active Device",
        "icon": "/devices/decoy-generator.png",
        "description": "Creates two holographic projections of your ship that may trick enemies into attacking them instead of you.",
        "manufacturer": null,
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 50,
            "Effect Duration": 50,
            "Cool Down Duration": 40
        }
    },
    {
        "id": 12,
        "name": "Drone Disassembler",
        "type": "Active Device",
        "icon": "/devices/drone-disassembler.png",
        "description": "Dismantles drones into tech resources, destroying them instantly.",
        "manufacturer": "Vohs Space Industries",
        "allowed_mods": [28, 30],
        "stats": {
            "Energy Consumption": 20,
            "Cool Down Duration": 8,
            "Resource Amount": 4,
            "Nano Bots Drop Chance": 0.15,
            "Range": 800
        }
    },
    {
        "id": 13,
        "name": "Drone Disassembler Mk2",
        "type": "Active Device",
        "icon": "/devices/drone-disassembler.png",
        "description": "Dismantles drones into tech resources, destroying them instantly.",
        "manufacturer": "Vohs Space Industries",
        "allowed_mods": [28, 30],
        "stats": {
            "Energy Consumption": 24,
            "Cool Down Duration": 6,
            "Resource Amount": 8,
            "Nano Bots Drop Chance": 0.2,
            "Range": 1000
        }
    },
    {
        "id": 14,
        "name": "Drone Disassembler Mk3",
        "type": "Active Device",
        "icon": "/devices/drone-disassembler.png",
        "description": "Dismantles drones into tech resources, destroying them instantly.",
        "manufacturer": "Vohs Space Industries",
        "allowed_mods": [28, 30],
        "stats": {
            "Energy Consumption": 32,
            "Cool Down Duration": 4,
            "Resource Amount": 10,
            "Nano Bots Drop Chance": 0.3,
            "Range": 1200
        }
    },
    {
        "id": 15,
        "name": "EMP Generator",
        "type": "Active Device",
        "icon": "/devices/emp-generator.png",
        "description": "Creates a huge electromagnetic pulse around your ship that temporarily disables all targets in the vicinity, leaving them floating through space uncontrollably. Should be kept clear from hard drives.",
        "manufacturer": "Shiva Systems",
        "allowed_ships": [3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 28,
            "Effect Duration": 8,
            "Cool Down Duration": 40,
            "Range": 800
        }
    },
    {
        "id": 16,
        "name": "EMP Generator Mk2",
        "type": "Active Device",
        "icon": "/devices/emp-generator.png",
        "description": "Creates a huge electromagnetic pulse around your ship that temporarily disables all targets in the vicinity, leaving them floating through space uncontrollably. Should be kept clear from hard drives.",
        "manufacturer": "Shiva Systems",
        "allowed_ships": [3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 34,
            "Effect Duration": 10,
            "Cool Down Duration": 36,
            "Range": 1000
        }
    },
    {
        "id": 17,
        "name": "EMP Generator Mk3",
        "type": "Active Device",
        "icon": "/devices/emp-generator.png",
        "description": "Creates a huge electromagnetic pulse around your ship that temporarily disables all targets in the vicinity, leaving them floating through space uncontrollably. Should be kept clear from hard drives.",
        "manufacturer": "Shiva Systems",
        "allowed_ships": [3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 38,
            "Effect Duration": 12,
            "Cool Down Duration": 32,
            "Range": 1200
        }
    },
    {
        "id": 18,
        "name": "Emergency Shield",
        "type": "Passive Device",
        "icon": "/devices/emergency-shield.png",
        "description": "Automatically activates a temporary, impenetrable shield around the ship once the hull integrity is lost. Gets destroyed after usage.",
        "manufacturer": "Ancile",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 14,
            "Effect Duration": 8
        }
    },
    {
        "id": 19,
        "name": "Emergency Shield Mk2",
        "type": "Passive Device",
        "icon": "/devices/emergency-shield.png",
        "description": "Automatically activates a temporary, impenetrable shield around the ship once the hull integrity is lost. Gets destroyed after usage.",
        "manufacturer": "Ancile",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 18,
            "Effect Duration": 10
        }
    },
    {
        "id": 20,
        "name": "Emergency Shield Mk3",
        "type": "Passive Device",
        "icon": "/devices/emergency-shield.png",
        "description": "Automatically activates a temporary, impenetrable shield around the ship once the hull integrity is lost. Gets destroyed after usage.",
        "manufacturer": "Ancile",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 24,
            "Effect Duration": 12
        }
    },
    {
        "id": 21,
        "name": "Energized Boost",
        "type": "Active Device",
        "icon": "/devices/energized-boost.png",
        "description": "Instantly increases your ship's boost for a short amount of time. Shuts down your shield when activated.",
        "manufacturer": "Benca",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 22,
            "Effect Duration": 2,
            "Cool Down Duration": 40,
            "Effect": 2.5
        }
    },
    {
        "id": 22,
        "name": "Energized Boost Mk2",
        "type": "Active Device",
        "icon": "/devices/energized-boost.png",
        "description": "Instantly increases your ship's boost for a short amount of time. Shuts down your shield when activated.",
        "manufacturer": "Benca",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 28,
            "Effect Duration": 2,
            "Cool Down Duration": 30,
            "Effect": 3
        }
    },
    {
        "id": 23,
        "name": "Energized Boost Mk3",
        "type": "Active Device",
        "icon": "/devices/energized-boost.png",
        "description": "Instantly increases your ship's boost for a short amount of time. Shuts down your shield when activated.",
        "manufacturer": "Benca",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 34,
            "Effect Duration": 2,
            "Cool Down Duration": 20,
            "Effect": 4
        }
    },
    {
        "id": 24,
        "name": "Energy Core Extension",
        "type": "Passive Device",
        "icon": "/devices/energy-core-extension.png",
        "description": "Increases your energy core's capacity. Can be installed multiple times.",
        "manufacturer": "First Aeronautics",
        "allowed_mods": [-1],
        "allow_multi_install": true,
        "stats": { "Effect": 20 }
    },
    {
        "id": 25,
        "name": "Energy Core Extension Mk2",
        "type": "Passive Device",
        "icon": "/devices/energy-core-extension.png",
        "description": "Greatly increases your energy core's capacity. Can be installed multiple times.",
        "manufacturer": "First Aeronautics",
        "allowed_mods": [-1],
        "allow_multi_install": true,
        "stats": { "Effect": 30 }
    },
    {
        "id": 26,
        "name": "Energy Core Extension Mk3",
        "type": "Passive Device",
        "icon": "/devices/energy-core-extension.png",
        "description": "Strikingly increases your energy core's capacity. Can be installed multiple times.",
        "manufacturer": "First Aeronautics",
        "allowed_mods": [-1],
        "allow_multi_install": true,
        "stats": { "Effect": 40 }
    },
    {
        "id": 27,
        "name": "Energy Discharger",
        "type": "Active Device",
        "icon": "/devices/energy-discharger.png",
        "description": "Discharges the ship's remaining energy to create a radial blast around it. Base damage is increased by the available energy. Shuts down shield if available.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 2, 3],
        "allowed_mods": [28],
        "stats": {
            "Hull Damage": 40,
            "Shield Damage": 40,
            "Damage Per Energy": 1.8,
            "Range": 500,
            "Cool Down Duration": 60,
        }
    },
    {
        "id": 28,
        "name": "Energy Discharger Mk2",
        "type": "Active Device",
        "icon": "/devices/energy-discharger.png",
        "description": "Discharges the ship's remaining energy to create a radial blast around it. Base damage is increased by the available energy. Shuts down shield if available.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 2, 3],
        "allowed_mods": [28],
        "stats": {
            "Hull Damage": 60,
            "Shield Damage": 60,
            "Damage Per Energy": 2,
            "Range": 600,
            "Cool Down Duration": 75,
        }
    },
    {
        "id": 29,
        "name": "Energy Discharger Mk3",
        "type": "Active Device",
        "icon": "/devices/energy-discharger.png",
        "description": "Discharges the ship's remaining energy to create a radial blast around it. Base damage is increased by the available energy. Shuts down shield if available.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 2, 3],
        "allowed_mods": [28],
        "stats": {
            "Hull Damage": 80,
            "Shield Damage": 80,
            "Damage Per Energy": 2.2,
            "Range": 700,
            "Cool Down Duration": 90,
        }
    },
    {
        "id": 30,
        "name": "Energy Diverter",
        "type": "Active Device",
        "icon": "/devices/energy-diverter.png",
        "description": "Instantly transfers a certain amount of shield energy into your energy core.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 3],
        "allowed_mods": [-1],
        "stats": {
            "Conversion Amount": 20,
            "Conversion Ratio": 1
        }
    },
    {
        "id": 31,
        "name": "Energy Diverter Mk2",
        "type": "Active Device",
        "icon": "/devices/energy-diverter.png",
        "description": "Instantly transfers a certain amount of shield energy into your energy core.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 3],
        "allowed_mods": [-1],
        "stats": {
            "Conversion Amount": 25,
            "Conversion Ratio": 1.4
        }
    },
    {
        "id": 32,
        "name": "Energy Diverter Mk3",
        "type": "Active Device",
        "icon": "/devices/energy-diverter.png",
        "description": "Instantly transfers a certain amount of shield energy into your energy core.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 3],
        "allowed_mods": [-1],
        "stats": {
            "Conversion Amount": 30,
            "Conversion Ratio": 1.8
        }
    },
    {
        "id": 33,
        "name": "Engine Booster",
        "type": "Active Device",
        "icon": "/devices/engine-booster.png",
        "description": "Temporarily increases the ships maneuverability, perfect for evading enemy fire.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [2, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 15,
            "Effect Duration": 16,
            "Cool Down Duration": 24,
            "Effect": 1
        }
    },
    {
        "id": 34,
        "name": "Engine Booster Mk2",
        "type": "Active Device",
        "icon": "/devices/engine-booster.png",
        "description": "Temporarily increases the ships maneuverability, perfect for evading enemy fire.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [2, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 18,
            "Effect Duration": 20,
            "Cool Down Duration": 21,
            "Effect": 1.25
        }
    },
    {
        "id": 35,
        "name": "Engine Booster Mk3",
        "type": "Active Device",
        "icon": "/devices/engine-booster.png",
        "description": "Temporarily increases the ships maneuverability, perfect for evading enemy fire.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [2, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 22,
            "Effect Duration": 25,
            "Cool Down Duration": 18,
            "Effect": 1.5
        }
    },
    {
        "id": 36,
        "name": "Front Shield Generator",
        "type": "Active Device",
        "icon": "/devices/front-shield-generator.png",
        "description": "Creates an impenetrable shield in front of your ship for a certain amount of time.",
        "manufacturer": "Ancile",
        "allowed_ships": [2],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 25,
            "Effect Duration": 15,
            "Cool Down Duration": 42
        }
    },
    {
        "id": 37,
        "name": "Front Shield Generator Mk2",
        "type": "Active Device",
        "icon": "/devices/front-shield-generator.png",
        "description": "Creates an impenetrable shield in front of your ship for a certain amount of time.",
        "manufacturer": "Ancile",
        "allowed_ships": [2],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 30,
            "Effect Duration": 20,
            "Cool Down Duration": 38
        }
    },
    {
        "id": 38,
        "name": "Front Shield Generator Mk3",
        "type": "Active Device",
        "icon": "/devices/front-shield-generator.png",
        "description": "Creates an impenetrable shield in front of your ship for a certain amount of time.",
        "manufacturer": "Ancile",
        "allowed_ships": [2],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 35,
            "Effect Duration": 25,
            "Cool Down Duration": 34
        }
    },
    {
        "id": 39,
        "name": "Gatling Turret",
        "type": "Active Device",
        "icon": "/devices/turret-gatling.png",
        "description": "Mounted turret that automatically shoots at enemies within range, dealing high amounts of hull damage.",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [2],
        "allowed_mods": [9, 10, 11, 13, 14, 15, 16, 17, 18, 28, 29, 30],
        "stats": {
            "Energy Consumption": 20,
            "Effect Duration": 30,
            "Cool Down Duration": 15,
            "Hull DPS": 114.3,
            "Shield DPS": 57.1,
            "Hull Damage": 8,
            "Shield Damage": 4,
            "Fire Rate": 14.3,
            "Range": 930,
            "Velocity": 1100,
        }
    },
    {
        "id": 40,
        "name": "Laser Turret",
        "type": "Active Device",
        "icon": "/devices/turret-laser.png",
        "description": "Mounted turret that automatically shoots at enemies within range, dealing high amounts of shield damage.",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [2],
        "allowed_mods": [9, 10, 11, 13, 14, 15, 16, 17, 18, 28, 29, 30],
        "stats": {
            "Energy Consumption": 20,
            "Effect Duration": 30,
            "Cool Down Duration": 15,
            "Hull DPS": 55,
            "Shield DPS": 100,
            "Hull Damage": 11,
            "Shield Damage": 20,
            "Fire Rate": 5,
            "Range": 1600,
            "Velocity": 1650
        }
    },
    {
        "id": 41,
        "name": "Mainframe Override",
        "type": "Active Device",
        "icon": "/devices/mainframe-override.png",
        "description": "Overrides the target ship's control unit and makes them fight on your side. Enemy resistance to these attacks varies and you can only have one active target at a time.",
        "manufacturer": "Alioth Electronics",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 40,
            "Cool Down Duration": 75,
            "Full Charge Duration": 10,
            "Range": 4000,
            "Success Chance": 0.7
        }
    },
    {
        "id": 42,
        "name": "Mainframe Override Mk2",
        "type": "Active Device",
        "icon": "/devices/mainframe-override.png",
        "description": "Overrides the target ship's control unit and makes them fight on your side. Enemy resistance to these attacks varies and you can only have one active target at a time. Requires more energy than the MK1 version but comes with a greater override probability.",
        "manufacturer": "Alioth Electronics",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 50,
            "Cool Down Duration": 60,
            "Full Charge Duration": 8,
            "Range": 4000,
            "Success Chance": 0.8
        }
    },
    {
        "id": 43,
        "name": "Mainframe Override Mk3",
        "type": "Active Device",
        "icon": "/devices/mainframe-override.png",
        "description": "Overrides the target ship's control unit and makes them fight on your side. Enemy resistance to these attacks varies and you can only have one active target at a time. Requires more energy than the MK2 version but has greater override probability.",
        "manufacturer": "Alioth Electronics",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 60,
            "Cool Down Duration": 45,
            "Full Charge Duration": 6,
            "Range": 4000,
            "Success Chance": 0.9
        }
    },
    {
        "id": 44,
        "name": "Missile Defense System",
        "type": "Active Device",
        "icon": "/devices/missile-defense-system.png",
        "description": "Destroys all missiles within a certain range when activated.",
        "manufacturer": "Ancile",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 28,
            "Effect Duration": 18,
            "Cool Down Duration": 22,
            "Range": 300,
            "Fire Rate": 1.1
        }
    },
    {
        "id": 45,
        "name": "Missile Defense System Mk2",
        "type": "Active Device",
        "icon": "/devices/missile-defense-system.png",
        "description": "Destroys all missiles within a certain range when activated.",
        "manufacturer": "Ancile",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 36,
            "Effect Duration": 24,
            "Cool Down Duration": 18,
            "Range": 400,
            "Fire Rate": 1.2
        }
    },
    {
        "id": 46,
        "name": "Missile Defense System Mk3",
        "type": "Active Device",
        "icon": "/devices/missile-defense-system.png",
        "description": "Destroys all missiles within a certain range when activated.",
        "manufacturer": "Ancile",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 42,
            "Effect Duration": 30,
            "Cool Down Duration": 16,
            "Range": 500,
            "Fire Rate": 1.4
        }
    },
    {
        "id": 47,
        "name": "Missile Turret",
        "type": "Active Device",
        "icon": "/devices/turret-missile.png",
        "description": "Mounted missile turret that automatically shoots at enemies within range, dealing high amounts of damage.",
        "manufacturer": "Baron Nova Gunnery Ltd.",
        "allowed_ships": [2],
        "allowed_mods": [9, 10, 11, 13, 14, 15, 16, 17, 18, 28, 29, 30],
        "stats": {
            "Energy Consumption": 25,
            "Effect Duration": 36,
            "Cooldown Duration": 40,
            "Hull DPS": 58.3,
            "Shield DPS": 22.9,
            "Hull Damage": 56,
            "Shield Damage": 22,
            "Fire Rate": 0.2,
            "Range": 1800,
            "Velocity": 600
        }
    },
    {
        "id": 48,
        "name": "Remote Energy Discharger",
        "type": "Active Device",
        "icon": "/devices/remote-energy-discharger.png",
        "description": "Forces the target's energy core to discharge and create a damaging blast around them.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [28, 30],
        "stats": {
            "Hull Damage": 225,
            "Shield Damage": 225,
            "Area Damage Range": 450,
            "Range": 3000,
            "Energy Consumption": 25,
            "Cool Down Duration": 36
        }
    },
    {
        "id": 49,
        "name": "Remote Energy Discharger Mk2",
        "type": "Active Device",
        "icon": "/devices/remote-energy-discharger.png",
        "description": "Forces the target's energy core to discharge and create a damaging blast around them.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [28, 30],
        "stats": {
            "Hull Damage": 375,
            "Shield Damage": 375,
            "Area Damage Range": 525,
            "Range": 3000,
            "Energy Consumption": 30,
            "Cool Down Duration": 30
        }
    },
    {
        "id": 50,
        "name": "Remote Energy Discharger Mk3",
        "type": "Active Device",
        "icon": "/devices/remote-energy-discharger.png",
        "description": "Forces the target's energy core to discharge and create a damaging blast around them.",
        "manufacturer": "First Aeronautics",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [28, 30],
        "stats": {
            "Hull Damage": 450,
            "Shield Damage": 450,
            "Area Damage Range": 600,
            "Range": 3000,
            "Energy Consumption": 35,
            "Cool Down Duration": 24
        }
    },
    {
        "id": 51,
        "name": "Sensor Relay",
        "type": "Passive Device",
        "icon": "/devices/sensor-relay.png",
        "description": "Increases the ship's sensor range by a small percentage.",
        "manufacturer": "Primesense Instruments",
        "allowed_mods": [-1],
        "stats": {
            "Range": 0.4,
            "Energy Allocation": 18
        }
    },
    {
        "id": 52,
        "name": "Sensor Relay Mk2",
        "type": "Passive Device",
        "icon": "/devices/sensor-relay.png",
        "description": "Increases the ship's sensor range by a medium percentage.",
        "manufacturer": "Primesense Instruments",
        "allowed_mods": [-1],
        "stats": {
            "Range": 0.8,
            "Energy Allocation": 24
        }
    },
    {
        "id": 53,
        "name": "Sensor Relay Mk3",
        "type": "Passive Device",
        "icon": "/devices/sensor-relay.png",
        "description": "Increases the ship's sensor range by a large percentage.",
        "manufacturer": "Primesense Instruments",
        "allowed_mods": [-1],
        "stats": {
            "Range": 1.2,
            "Energy Allocation": 30
        }
    },
    {
        "id": 54,
        "name": "Shield",
        "type": "Passive Device",
        "icon": "/devices/shield.png",
        "description": "Protects your hull from taking damage when not depleted. Constantly recharges but stops recharging for a small amount of time after every hit. When depleted the shield shuts down for a certain amount of time before recharging again.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 12,
            "Hitpoints": 125,
            "Recharge Rate": 10,
            "Recharge Delay": 5,
            "Shutdown Duration": 10
        }
    },
    {
        "id": 55,
        "name": "Shield Disruptor",
        "type": "Active Device",
        "icon": "/devices/shield-disruptor.png",
        "description": "Disables the target's shield for a few seconds. Some enemies are resistant to this attack.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 35,
            "Cool Down Duration": 40,
            "Range": 1000,
            "Effect Duration": 6
        }
    },
    {
        "id": 56,
        "name": "Shield Disruptor Mk2",
        "type": "Active Device",
        "icon": "/devices/shield-disruptor.png",
        "description": "Disables the target's shield for a few seconds. Some enemies are resistant to this attack.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 40,
            "Cool Down Duration": 35,
            "Range": 1000,
            "Effect Duration": 8
        }
    },
    {
        "id": 57,
        "name": "Shield Disruptor Mk3",
        "type": "Active Device",
        "icon": "/devices/shield-disruptor.png",
        "description": "Disables the target's shield for a few seconds. Some enemies are resistant to this attack.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 45,
            "Cool Down Duration": 30,
            "Range": 1000,
            "Effect Duration": 10
        }
    },
    {
        "id": 58,
        "name": "Shield Mk2",
        "type": "Passive Device",
        "icon": "/devices/shield.png",
        "description": "Protects your hull from taking damage when not depleted. Constantly recharges but stops recharging for a small amount of time after every hit. When depleted the shield shuts down for a certain amount of time before recharging again.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 20,
            "Hitpoints": 150,
            "Recharge Rate": 12,
            "Recharge Delay": 4.5,
            "Shutdown Duration": 9
        }
    },
    {
        "id": 59,
        "name": "Shield Mk3",
        "type": "Passive Device",
        "icon": "/devices/shield.png",
        "description": "Protects your hull from taking damage when not depleted. Constantly recharges but stops recharging for a small amount of time after every hit. When depleted the shield shuts down for a certain amount of time before recharging again.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 32,
            "Hitpoints": 175,
            "Recharge Rate": 14,
            "Recharge Delay": 4,
            "Shutdown Duration": 8
        }
    },
    {
        "id": 60,
        "name": "Shield ST",
        "type": "Passive Device",
        "icon": "/devices/shield-st.png",
        "description": "The \"Superior Titanium\" edition of the shield comes with a huge capacity at the cost of reduced recharge rate and higher operational delays.",
        "manufacturer": "Ancile",
        "allowed_ships": [3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 22,
            "Hitpoints": 210,
            "Recharge Rate": 8,
            "Recharge Delay": 9,
            "Shutdown Duration": 20
        }
    },
    {
        "id": 61,
        "name": "Shield ST Mk2",
        "type": "Passive Device",
        "icon": "/devices/shield-st.png",
        "description": "The \"Superior Titanium\" edition of the shield comes with a huge capacity at the cost of reduced recharge rate and higher operational delays.",
        "manufacturer": "Ancile",
        "allowed_ships": [3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 28,
            "Hitpoints": 240,
            "Recharge Rate": 10,
            "Recharge Delay": 8,
            "Shutdown Duration": 18
        }
    },
    {
        "id": 62,
        "name": "Shield ST Mk3",
        "type": "Passive Device",
        "icon": "/devices/shield-st.png",
        "description": "The \"Superior Titanium\" edition of the shield comes with a huge capacity at the cost of reduced recharge rate and higher operational delays.",
        "manufacturer": "Ancile",
        "allowed_ships": [3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 38,
            "Hitpoints": 270,
            "Recharge Rate": 12,
            "Recharge Delay": 7,
            "Shutdown Duration": 16
        }
    },
    {
        "id": 63,
        "name": "Shield XC",
        "type": "Passive Device",
        "icon": "/devices/shield-xc.png",
        "description": "The \"Extra Charge\" edition of the shield has an increased recharge rate and shorter shutdown delays at the cost of maximum capacity.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 10,
            "Hitpoints": 60,
            "Recharge Rate": 16,
            "Recharge Delay": 3.2,
            "Shutdown Duration": 6.2
        }
    },
    {
        "id": 64,
        "name": "Shield XC Mk2",
        "type": "Passive Device",
        "icon": "/devices/shield-xc.png",
        "description": "The \"Extra Charge\" edition of the shield has an increased recharge rate and shorter shutdown delays at the cost of maximum capacity.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 18,
            "Hitpoints": 75,
            "Recharge Rate": 20,
            "Recharge Delay": 2.8,
            "Shutdown Duration": 5.4
        }
    },
    {
        "id": 65,
        "name": "Shield XC Mk3",
        "type": "Passive Device",
        "icon": "/devices/shield-xc.png",
        "description": "The \"Extra Charge\" edition of the shield has an increased recharge rate and shorter shutdown delays at the cost of maximum capacity.",
        "manufacturer": "Ancile",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [31, 32, 33],
        "stats": {
            "Energy Allocation": 30,
            "Hitpoints": 90,
            "Recharge Rate": 24,
            "Recharge Delay": 2.4,
            "Shutdown Duration": 4.6
        }
    },
    {
        "id": 66,
        "name": "Static Discharger",
        "type": "Active Device",
        "icon": "/devices/static-discharger.png",
        "description": "Attacks surrounding hostiles with electric discharges for a certain amount of time.",
        "manufacturer": "Shiva Systems",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 28,
            "Effect Duration": 18,
            "Cool Down Duration": 40,
            "Range": 500,
            "Fire Rate": 2.6,
            "Hull DPS": 26.3,
            "Shield DPS": 26.3
        }
    },
    {
        "id": 67,
        "name": "Static Discharger Mk2",
        "type": "Active Device",
        "icon": "/devices/static-discharger.png",
        "description": "Attacks surrounding hostiles with electric discharges for a certain amount of time.",
        "manufacturer": "Shiva Systems",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 34,
            "Effect Duration": 24,
            "Cool Down Duration": 35,
            "Range": 550,
            "Fire Rate": 3.1,
            "Hull DPS": 37.5,
            "Shield DPS": 37.5
        }
    },
    {
        "id": 68,
        "name": "Static Discharger Mk3",
        "type": "Active Device",
        "icon": "/devices/static-discharger.png",
        "description": "Attacks surrounding hostiles with electric discharges for a certain amount of time.",
        "manufacturer": "Shiva Systems",
        "allowed_ships": [0, 1, 3],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 40,
            "Effect Duration": 30,
            "Cool Down Duration": 28,
            "Range": 600,
            "Fire Rate": 3.8,
            "Hull DPS": 53.8,
            "Shield DPS": 53.8
        }
    },
    {
        "id": 69,
        "name": "Target Decelerator",
        "type": "Passive Device",
        "icon": "/devices/target-decelerator.png",
        "description": "Reduces your currently locked target's speed by a certain percentage, making them easier to hit.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 24,
            "Effect": -0.2
        }
    },
    {
        "id": 70,
        "name": "Target Decelerator Mk2",
        "type": "Passive Device",
        "icon": "/devices/target-decelerator.png",
        "description": "Reduces your currently locked target's speed by a certain percentage, making them easier to hit.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 26,
            "Effect": -0.4
        }
    },
    {
        "id": 71,
        "name": "Target Decelerator Mk3",
        "type": "Passive Device",
        "icon": "/devices/target-decelerator.png",
        "description": "Reduces your currently locked target's speed by a certain percentage, making them easier to hit.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 34,
            "Effect": -0.6
        }
    },
    {
        "id": 72,
        "name": "Teleporter",
        "type": "Active Device",
        "icon": "/devices/teleporter.png",
        "description": "Teleports your ship forward.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_ships": [1, 3],
        "allowed_mods": [30],
        "stats": {
            "Energy Consumption": 24,
            "Range": 600
        }
    },
    {
        "id": 73,
        "name": "Teleporter Mk2",
        "type": "Active Device",
        "icon": "/devices/teleporter.png",
        "description": "Teleports your ship forward.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_ships": [1, 3],
        "allowed_mods": [30],
        "stats": {
            "Energy Consumption": 29,
            "Range": 750
        }
    },
    {
        "id": 74,
        "name": "Teleporter Mk3",
        "type": "Active Device",
        "icon": "/devices/teleporter.png",
        "description": "Teleports your ship forward.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_ships": [1, 3],
        "allowed_mods": [30],
        "stats": {
            "Energy Consumption": 34,
            "Range": 900
        }
    },
    {
        "id": 75,
        "name": "Time Extender",
        "type": "Active Device",
        "icon": "/devices/time-extender.png",
        "description": "Slows down time for a few seconds but leaves your ship unaffected.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Cool Down Duration": 44,
            "Effect Duration": 10,
            "Energy Consumption": 22
        }
    },
    {
        "id": 76,
        "name": "Time Extender Mk2",
        "type": "Active Device",
        "icon": "/devices/time-extender.png",
        "description": "Slows down time for a few seconds but leaves your ship unaffected.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Cool Down Duration": 38,
            "Effect Duration": 14,
            "Energy Consumption": 25
        }
    },
    {
        "id": 77,
        "name": "Time Extender Mk3",
        "type": "Active Device",
        "icon": "/devices/time-extender.png",
        "description": "Slows down time for a few seconds but leaves your ship unaffected.",
        "manufacturer": "Adumbratech Quantum Technologies PLC",
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Cool Down Duration": 32,
            "Effect Duration": 18,
            "Energy Consumption": 34
        }
    },
    {
        "id": 78,
        "name": "Tractor Beam",
        "type": "Passive Device",
        "icon": "/devices/tractor-beam.png",
        "description": "Increases your ship range for collecting pickups.",
        "manufacturer": "Federal Arms & Crafts",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 8,
            "Range": 300
        }
    },
    {
        "id": 79,
        "name": "Tractor Beam Mk2",
        "type": "Passive Device",
        "icon": "/devices/tractor-beam.png",
        "description": "Greatly increases your ship range for collecting pickups.",
        "manufacturer": "Federal Arms & Crafts",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 14,
            "Range": 500
        }
    },
    {
        "id": 80,
        "name": "Tractor Beam Mk3",
        "type": "Passive Device",
        "icon": "/devices/tractor-beam.png",
        "description": "Strikingly increases your ship range for collecting pickups.",
        "manufacturer": "Federal Arms & Crafts",
        "allowed_mods": [-1],
        "stats": {
            "Energy Allocation": 20,
            "Range": 700
        }
    },
    {
        "id": 81,
        "name": "Weapon Overdrive",
        "type": "Active Device",
        "icon": "/devices/weapon-overdrive.png",
        "description": "Increases your weapon's fire rate and damage for some seconds. Decreases your weapon's energy consumption at the same time.",
        "manufacturer": "Alioth Electronics",
        "allowed_ships": [0],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 30,
            "Effect Duration": 24,
            "Cool Down Duration": 38,
            "Damage": 0.15,
            "Fire Rate": 0.22,
            "Weapon Energy Consumption": -0.4
        }
    },
    {
        "id": 82,
        "name": "Weapon Overdrive Mk2",
        "type": "Active Device",
        "icon": "/devices/weapon-overdrive.png",
        "description": "Increases your weapon's fire rate and damage for some seconds. Decreases your weapon's energy consumption at the same time.",
        "manufacturer": "Alioth Electronics",
        "allowed_ships": [0],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 35,
            "Effect Duration": 28,
            "Cool Down Duration": 34,
            "Damage": 0.18,
            "Fire Rate": 0.3,
            "Weapon Energy Consumption": -0.45
        }
    },
    {
        "id": 83,
        "name": "Weapon Overdrive Mk3",
        "type": "Active Device",
        "icon": "/devices/weapon-overdrive.png",
        "description": "Increases your weapon's fire rate and damage for some seconds. Decreases your weapon's energy consumption at the same time.",
        "manufacturer": "Alioth Electronics",
        "allowed_ships": [0],
        "allowed_mods": [28, 29, 30],
        "stats": {
            "Energy Consumption": 45,
            "Effect Duration": 32,
            "Cool Down Duration": 30,
            "Damage": 0.22,
            "Fire Rate": 0.38,
            "Weapon Energy Consumption": -0.5,
        }
    },
];

export default deviceData;