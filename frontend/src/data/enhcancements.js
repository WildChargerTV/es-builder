// * frontend/src/data/enhancements.js
// ! DATA FINALIZED - DO NOT MODIFY

const enhancementData = [
    {
        "id": 0,
        "name": "Ancient Friends",
        "icon": "/enhancements/enhancement-glyph1.png",
        "category": "Defense",
        "effect_pos": "Occasionally, Ancients will spawn and defend the player ship.",
        "effect_neg": null
    },
    {
        "id": 1,
        "name": "Ancient Structures",
        "icon": "/enhancements/enhancement-glyph2.png",
        "category": "Navigation",
        "effect_pos": "Displays all Ancient structures on the star map.",
        "effect_neg": null
    },
    {
        "id": 2,
        "name": "Ancient Weapon",
        "icon": "/enhancements/enhancement-glyph3.png",
        "category": "Weapons",
        "effect_pos": "You are given a very powerful Ancient Shock Rifle which deals even more damage the lower your ship's hull hitpoints are.",
        "effect_neg": "Your ship's hull is damaged each time you fire and no other primary or secondary weapons can be used."
    },
    {
        "id": 3,
        "name": "Armor Bonus",
        "icon": "/enhancements/enhancement-icon1.png",
        "category": "Defense",
        "effect_pos": "5% more armor.",
        "effect_neg": null
    },
    {
        "id": 4,
        "name": "Artisan",
        "icon": "/enhancements/enhancement-icon2.png",
        "category": "Crafting",
        "effect_pos": "When crafting a primary weapon, the weapon will be enhanced.",
        "effect_neg": "Secondary weapons can't be crafted."
    },
    {
        "id": 5,
        "name": "Beeline",
        "icon": "/enhancements/enhancement-icon3.png",
        "category": "Defense",
        "effect_pos": "Hostile homing missiles do not lock on player ship.",
        "effect_neg": "Player homing missiles do not lock on hostiles."
    },
    {
        "id": 6,
        "name": "Berserker",
        "icon": "/enhancements/enhancement-glyph4.png",
        "category": "Damage and Repair",
        "effect_pos": "While boosting the ship's hull cannot be damaged.",
        "effect_neg": "If you don't make a kill at least every 40 seconds your ship's hull gets constantly damaged."
    },
    {
        "id": 7,
        "name": "Bullseye",
        "icon": "/enhancements/enhancement-glyph5.png",
        "category": "Defense",
        "effect_pos": "Every critical hit immediately recharges the shield by 10%.",
        "effect_neg": "Critical hits don't deal additional damage.",
        "allowed_ships": [0, 1, 3]
    },
    {
        "id": 8,
        "name": "Damage Bonus",
        "icon": "/enhancements/enhancement-icon4.png",
        "category": "Weapons",
        "effect_pos": "Weapons deal 5% more damage.",
        "effect_neg": null
    },
    {
        "id": 9,
        "name": "Daredevil",
        "icon": "/enhancements/enhancement-icon5.png",
        "category": "Weapons",
        "effect_pos": "Weapons no longer require energy and deal 25% more damage.",
        "effect_neg": "Shield is permanently disabled.",
        "allowed_ships": [0, 1, 3]
    },
    {
        "id": 10,
        "name": "Devastator",
        "icon": "/enhancements/enhancement-icon6.png",
        "category": "Weapons",
        "effect_pos": "Weapons deal 40% more damage.",
        "effect_neg": "Energy core recharge rate is lowered by 40%.",
        "allowed_ships": [2]
    },
    {
        "id": 11,
        "name": "Energy Bonus",
        "icon": "/enhancements/enhancement-icon7.png",
        "category": "Energy",
        "effect_pos": "5% more energy capacity.",
        "effect_neg": null
    },
    {
        "id": 12,
        "name": "Equalizer",
        "icon": "/enhancements/enhancement-glyph6.png",
        "category": "Damage and Repair",
        "effect_pos": "After each jump the hull is set to 50%.",
        "effect_neg": "After each jump the hull is set to 50%."
    },
    {
        "id": 13,
        "name": "Fuel Conservation",
        "icon": "/enhancements/enhancement-icon8.png",
        "category": "Navigation",
        "effect_pos": "Saves 0% to 50% of fuel when jumping.",
        "effect_neg": "Increases jump charge duration and cooldown by 100%."
    },
    {
        "id": 14,
        "name": "Headstart",
        "icon": "/enhancements/enhancement-glyph7.png",
        "category": "Navigation",
        "effect_pos": "Start in Sector 2.",
        "effect_neg": null
    },
    {
        "id": 15,
        "name": "Hull Bonus",
        "icon": "/enhancements/enhancement-icon9.png",
        "category": "Defense",
        "effect_pos": "5% more hull hitpoints.",
        "effect_neg": null
    },
    {
        "id": 16,
        "name": "Infinite Drift",
        "icon": "/enhancements/enhancement-icon10.png",
        "category": "Movement",
        "effect_pos": "50% less collision damage.",
        "effect_neg": "Reduced inertia dampening."
    },
    {
        "id": 17,
        "name": "Jump Repairs",
        "icon": "/enhancements/enhancement-icon11.png",
        "category": "Damage and Repair",
        "effect_pos": "After each jump 5% of hull hitpoints are restored.",
        "effect_neg": null
    },
    {
        "id": 18,
        "name": "Leech",
        "icon": "/enhancements/enhancement-glyph8.png",
        "category": "Damage and Repair",
        "effect_pos": "If an enemy is destroyed, the player ship's hull is repaired by 20 hitpoints.",
        "effect_neg": "Nanobots can only be used for component damage repairs and crafting."
    },
    {
        "id": 19,
        "name": "Low Profile",
        "icon": "/enhancements/enhancement-glyph9.png",
        "category": "Navigation",
        "effect_pos": "Okkar forces and Colonial warships will not jump in anymore.",
        "effect_neg": "Every location has a jump suppressor."
    },
    {
        "id": 20,
        "name": "Predetermination",
        "icon": "/enhancements/enhancement-glyph10.png",
        "category": "Navigation",
        "effect_pos": "G&B and Okkar are hostile to each other.",
        "effect_neg": "Jump destinations can't be chosen."
    },
    {
        "id": 21,
        "name": "Regeneration Bonus",
        "icon": "/enhancements/enhancement-icon12.png",
        "category": "Energy",
        "effect_pos": "5% faster energy regeneration.",
        "effect_neg": null
    },
    {
        "id": 22,
        "name": "Sensory Overload",
        "icon": "/enhancements/enhancement-icon13.png",
        "category": "Sensors",
        "effect_pos": "All enemies and loot are visible on the radar (unlimited sensor range).",
        "effect_neg": "Hull and shield bars of enemies are not visible."
    },
    {
        "id": 23,
        "name": "Shadow Strike",
        "icon": "/enhancements/enhancement-icon14.png",
        "category": "Devices",
        "effect_pos": "Firing weapons while cloaked will leave the ship undetected.",
        "effect_neg": "Activating cloak will damage the ship by 25 hitpoints.",
        "allowed_ships": [1]
    },
    {
        "id": 24,
        "name": "Splitter",
        "icon": "/enhancements/enhancement-glyph11.png",
        "category": "Weapons",
        "effect_pos": "When fired, secondary weapons split into two.",
        "effect_neg": "Runs always start with only one empty secondary weapon slot."
    },
    {
        "id": 25,
        "name": "Survival Instinct",
        "icon": "/enhancements/enhancement-icon15.png",
        "category": "Damage and Repair",
        "effect_pos": "For every damaged system receive a 20% weapon damage bonus.",
        "effect_neg": null
    },
    {
        "id": 26,
        "name": "Thrust Diversion",
        "icon": "/enhancements/enhancement-icon16.png",
        "category": "Movement",
        "effect_pos": "Increases the ship's base speed by 30%.",
        "effect_neg": "Reduces the boost efficiency by 30%."
    }
]

export default enhancementData;