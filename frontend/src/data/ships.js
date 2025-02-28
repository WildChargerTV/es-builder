// * frontend/src/data/ships.js
// ! DATA FINALIZED - DO NOT MODIFY

const shipData = [
    {
        "id": 0,
        "name": "Colonial Interceptor",
        "class": "Medium Fighter Class",
        "description": "A versatile combat ship that can equip most weapon systems and devices. Though it does not have considerable disadvantages, the Colonial Interceptor does not shine in any particular field either.",
        "primary_weapons": 3,
        "secondary_weapons": 3,
        "devices": 5,
        "consumables": 5,
        "max_mods": 3,
        "stats": {
            "Hull Hitpoints": 660,
            "Armor": 0.1,
            "Shield Hitpoints": 125,
            "Shield Recharge Rate": 10,
            "Energy Core Capacity": 200,
            "Energy Allocation": 12,
            "Energy Core Recharge Rate": 9.5,
            "Max Number Of Jumps": 6,
            "Jump Charge Duration": 6,
            "Primary Weapon Slots": 3,
            "Secondary Weapon Slots": 3,
            "Device Slots": 5,
            "Consumable Slots": 5,
            "Cruise Speed": 140,
            "Boost Speed": 406,
            "Sensor Strength": 1,
        },
        "presets": {
            "a": {
                "primary": [{ id: 15, mods: { 0: null, 1: null, 2: null } }, { id: 9, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["4x20"],
                "device": [{ id: 54, mods: { 0: null, 1: null, 2: null } }, { id: 81, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["25x2"]
            },
            "b": {
                "primary": [{ id: 2, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["1x8"],
                "device": [{ id: 54, mods: { 0: null, 1: null, 2: null } }, { id: 21, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["2x3"]
            },
            "c": {
                "primary": [{ id: 7, mods: { 0: null, 1: null, 2: null } }, { id: 18, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["6x8"],
                "device": [{ id: 63, mods: { 0: null, 1: null, 2: null } }, { id: 55, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["5x4"]
            }
        }
    },
    {
        "id": 1,
        "name": "Colonial Scout",
        "class": "Light Fighter Class",
        "description": "Fast and swift but also quite fragile, the Colonial Scout demands a clear playing style. To compensate its lack of hull hitpoints, it is the only ship being able to use cloaking devices and teleporters.",
        "primary_weapons": 2,
        "secondary_weapons": 2,
        "devices": 4,
        "consumables": 5,
        "max_mods": 3,
        "stats": {
            "Hull Hitpoints": 355,
            "Armor": 0,
            "Shield Hitpoints": 60,
            "Shield Recharge Rate": 16,
            "Energy Core Capacity": 150,
            "Energy Allocation": 10,
            "Energy Core Recharge Rate": 12,
            "Max Number Of Jumps": 5,
            "Jump Charge Duration": 3.5,
            "Primary Weapon Slots": 2,
            "Secondary Weapon Slots": 2,
            "Device Slots": 4,
            "Consumable Slots": 5,
            "Cruise Speed": 150,
            "Boost Speed": 525,
            "Sensor Strength": 1.53,
        },
        "presets": {
            "a": {
                "primary": [{ id: 20, mods: { 0: null, 1: null, 2: null } }, { id: 1, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["9x10"],
                "device": [{ id: 63, mods: { 0: null, 1: null, 2: null } }, { id: 3, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["10x4", "9x2"]
            },
            "b": {
                "primary": [{ id: 22, mods: { 0: null, 1: null, 2: null } }, { id: 9, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["8x10"],
                "device": [{ id: 54, mods: { 0: null, 1: null, 2: null } }, { id: 72, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["28x4", "5x4"]
            },
            "c": {
                "primary": [{ id: 3, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["1x8"],
                "device": [{ id: 63, mods: { 0: null, 1: null, 2: null } }, { id: 75, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["19x1", "14x1"]
            }
        }
    },
    {
        "id": 2,
        "name": "Colonial Gunship",
        "class": "Heavy Fighter Class",
        "description": "The Colonial Gunship is a clunky beast to maneuver but it can take a lot of hits. Its reinforced hull provides the best protection available though this comes with a weak spot: It is not possible to equip a shield device. The front shield generator and a powerful turret provide remedy.",
        "primary_weapons": 4,
        "secondary_weapons": 5,
        "devices": 5,
        "consumables": 6,
        "max_mods": 3,
        "stats": {
            "Hull Hitpoints": 1300,
            "Armor": 0.4,
            "Shield Hitpoints": 0,
            "Shield Recharge Rate": 0,
            "Energy Core Capacity": 240,
            "Energy Allocation": 0,
            "Energy Core Recharge Rate": 9.5,
            "Max Number Of Jumps": 6,
            "Jump Charge Duration": 6,
            "Primary Weapon Slots": 4,
            "Secondary Weapon Slots": 5,
            "Device Slots": 5,
            "Consumable Slots": 6,
            "Cruise Speed": 130,
            "Boost Speed": 344.5,
            "Sensor Strength": 1
        },
        "presets": {
            "a": {
                "primary": [{ id: 7, mods: { 0: null, 1: null, 2: null } }, { id: 5, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["3x10", "5x5"],
                "device": [{ id: 39, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["5x2", "1x4"]
            },
            "b": {
                "primary": [{ id: 15, mods: { 0: null, 1: null, 2: null } }, { id: 19, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["4x20", "0x1"],
                "device": [{ id: 40, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["5x2", "32x4"]
            },
            "c": {
                "primary": [{ id: 2, mods: { 0: null, 1: null, 2: null } }, { id: 9, mods: { 0: null, 1: null, 2: null } }],
                "secondary": ["1x8", "5x5"],
                "device": [{ id: 36, mods: { 0: null, 1: null, 2: null } }],
                "consumable": ["0x4", "16x2"]
            }
        }
    },
    {
        "id": 3,
        "name": "Colonial Sentinel",
        "class": "Medium Fighter Class",
        "description": "With the option to enable fast hacking and an additional modification slot for weapons and devices the Sentinel further underlines its electronic warfare capabilities, already given by an exclusive set of unconventional equipment.",
        "primary_weapons": 1,
        "secondary_weapons": 2,
        "devices": 6,
        "consumables": 4,
        "max_mods": 4,
        "stats": {
            "Hull Hitpoints": 450,
            "Armor": 0,
            "Shield Hitpoints": 210,
            "Shield Recharge Rate": 8,
            "Energy Core Capacity": 255,
            "Energy Allocation": 22,
            "Energy Core Recharge Rate": 13,
            "Max Number Of Jumps": 6,
            "Jump Charge Duration": 6,
            "Primary Weapon Slots": 1,
            "Secondary Weapon Slots": 2,
            "Device Slots": 6,
            "Consumable Slots": 4,
            "Cruise Speed": 140,
            "Boost Speed": 392,
            "Sensor Strength": 1 
        },
        "presets": {
            "a": {
                "primary": [{ id: 12, mods: { 0: null, 1: null, 2: null, 3: null } }],
                "secondary": ["1x8"],
                "device": [{ id: 60, mods: { 0: null, 1: null, 2: null, 3: null } }, { id: 15, mods: { 0: null, 1: null, 2: null, 3: null } }],
                "consumable": ["8x4", "31x2"]
            },
            "b": {
                "primary": [{ id: 3, mods: { 0: null, 1: null, 2: null, 3: null } }],
                "secondary": ["2x12"],
                "device": [{ id: 60, mods: { 0: null, 1: null, 2: null, 3: null } }, { id: 12, mods: { 0: null, 1: null, 2: null, 3: null } }],
                "consumable": ["13x1", "28x4"]
            },
            "c": {
                "primary": [{ id: 17, mods: { 0: null, 1: null, 2: null, 3: null } }],
                "secondary": ["7x4"],
                "device": [{ id: 60, mods: { 0: null, 1: null, 2: null, 3: null } }, { id: 66, mods: { 0: null, 1: null, 2: null, 3: null } }],
                "consumable": ["25x3", "2x3"]
            }
        }
    }
];

export default shipData;