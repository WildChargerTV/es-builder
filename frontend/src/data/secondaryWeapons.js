// * frontend/src/data/secondaryWeapons.js
// ! DATA FINALIZED - DO NOT MODIFY

const secondaryWeaponData = [
    {
        "id": 0,
        "name": "ARC-9000",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/arc-9000.png",
        "description": "This devastating weapon will annihilate almost anything within a certain radius around the projectile. Caution is advised! Has to be charged before it fires.",
        "manufacturer": "Shiva Systems",
        "stack_size": 1,
        "stats": {
            "Hull Damage": 1030,
            "Shield Damage": 1030,
            "Area Damage Range": 500,
            "Fire Rate": 0.2,
            "Range": 3000,
            "Velocity": 300
        }
    },
    {
        "id": 1,
        "name": "Corrosion Missile",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/corrosion-missile.png",
        "description": "This missile bypasses the target's shields and disintegrates their hull over time.",
        "manufacturer": "Ancile",
        "stack_size": 8,
        "stats": {
            "Hull Damage": 240,
            "Effect Duration": 16,
            "Fire Rate": 2,
            "Range": 2000,
            "Velocity": 600,
            "Homing": "Yes"
        }
    },
    {
        "id": 2,
        "name": "Destabilizer Missile",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/destabilizer-missile.png",
        "description": "Disrupts the target's atomic structure and makes them more susceptible to kinetic and energetic stress, effectively increasing any incoming damage by a certain percentage. The effect does not stack.",
        "manufacturer": "Ancile",
        "stack_size": 12,
        "allowed_ships": [1, 3],
        "stats": {
            "Effect": 0.8,
            "Effect Duration": 12,
            "Hull Damage": 24,
            "Shield Damage": 16,
            "Area Damage Range": 50,
            "Fire Rate": 0.33,
            "Range": 3000,
            "Velocity": 600
        } 
    },
    {
        "id": 3,
        "name": "Heavy Missile",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/heavy-missile.png",
        "description": "A slow but very deadly long-range homing missile that deals massive hull damage and considerable shield damage. Keep your distance, though, as the explosion does splash damage.",
        "manufacturer": "Maverick Precision Technologies Inc.",
        "stack_size": 10,
        "stats": {
            "Hull Damage": 300,
            "Shield Damage": 220,
            "Area Damage Range": 90,
            "Fire Rate": 1,
            "Range": 3000,
            "Velocity": 300,
            "Homing": "Yes"
        }
    },
    {
        "id": 4,
        "name": "Light Missile",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/light-missile.png",
        "description": "Not as powerful as its big brother, the Heavy Missile, but faster, more maneuverable, and cheaper. Be ready to quickly fire several of these missiles at your enemy when its shield is down to deal some damage.",
        "manufacturer": "Maverick Precision Technologies Inc.",
        "stack_size": 20,
        "stats": {
            "Hull Damage": 100,
            "Shield Damage": 40,
            "Area Damage Range": 50,
            "Fire Rate": 3.33,
            "Range": 2000,
            "Velocity": 600,
            "Homing": "Yes"
        }
    },
    {
        "id": 5,
        "name": "Mine Cluster",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/mine-cluster.png",
        "description": "Creates a minefield after it reached its maximum range or on impact. Can be charged to increase the range.",
        "manufacturer": "Vohs Space Industries",
        "stack_size": 5,
        "allowed_ships": [2],
        "stats": {
            "Fire Rate": 0.13,
            "Range": 2000,
            "Velocity": 500
        }
    },
    {
        "id": 6,
        "name": "Plasma Torpedo",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/plasma-torpedo.png",
        "description": "An unguided long range rocket that deals large amounts of damage.",
        "manufacturer": "Federal Arms & Crafts",
        "stack_size": 8,
        "stats": {
            "Hull Damage": 560,
            "Shield Damage": 380,
            "Area Damage Range": 100,
            "Fire Rate": 1,
            "Range": 2500,
            "Velocity": 300
        }
    },
    {
        "id": 7,
        "name": "Seeker Missile Battery",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/seeker-missile-battery.png",
        "description": "Fires a barrage of ten autonomous, target seeking missiles at hostile targets around you.",
        "manufacturer": "Maverick Precision Technologies Inc.",
        "stack_size": 6,
        "allowed_ships": [0, 2, 3],
        "stats": {
            "Hull Damage": 96,
            "Shield Damage": 84,
            "Area Damage Range": 50,
            "Fire Rate": 1,
            "Range": 2000,
            "Velocity": 500,
            "Homing": "Yes"
        }
    },
    {
        "id": 8,
        "name": "Shield Breaker Missile",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/shield-breaker-missile.png",
        "description": "As the name implies, only use the Shield Breaker missiles on shields! Everything else would be a waste of resources.",
        "manufacturer": "Ancile",
        "stack_size": 10,
        "stats": {
            "Hull Damage": 20,
            "Shield Damage": 100,
            "Area Damage Range": 80,
            "Fire Rate": 2,
            "Range": 2000,
            "Velocity": 600,
            "Homing": "Yes"
        }
    },    
    {
        "id": 9,
        "name": "Stasis Missile",
        "type": "Secondary Weapon",
        "icon": "/secondary-weapons/stasis-missile.png",
        "description": "Deals no damage but wraps the target in a stasis field for some seconds. This may sound less helpful than it is!",
        "manufacturer": "Ancile",
        "stack_size": 10,
        "allowed_ships": [1, 3],
        "stats": {
            "Effect Duration": 8,
            "Fire Rate": 3.33,
            "Range": 2000,
            "Velocity": 600,
            "Homing": "Yes"
        }   
    }
];

export default secondaryWeaponData;