
export interface Zone extends GeoJSON.Feature {
    folderName: string;
    tracks: string[];
    style?: {
        color: string;
        weight: number;
        opacity: number;
    }
}

export function pointInsideZone(
    latitude: number,
    longitude: number,
    feature: GeoJSON.Feature // 'any' is used for properties, you can replace it with your specific type
  ): boolean {
    if (feature.geometry.type !== "Polygon" || !Array.isArray(feature.geometry.coordinates)) {
      // Handle invalid GeoJSON feature type
      return false;
    }
  
    const coordinates = feature.geometry.coordinates[0];
  
    if (coordinates.length !== 4) {
      // For a rectangle, there should be exactly 4 coordinates (4 corners)
      return false;
    }
  
    const [minLng, maxLng] = [Math.min(coordinates[0][0], coordinates[2][0]), Math.max(coordinates[0][0], coordinates[2][0])];
    const [minLat, maxLat] = [Math.min(coordinates[0][1], coordinates[2][1]), Math.max(coordinates[0][1], coordinates[2][1])];
  
    if (longitude < minLng || longitude > maxLng || latitude < minLat || latitude > maxLat) {
      // Point is outside the bounding box
      return false;
    }
  
    // Point is inside the bounding box
    return true;
}

export const Transitions: string[] = [
    "Bamboo_Wind_Chimes",
    "Bells",
    "Big_Bottle_Cap_Rattle",
    "Camel_Bells",
    "Glass_Wind_Chimes",
    "Goat_Hooves",
    "Key_Tree",
    "Legos",
    "Meta_Cap_Rattle",
    "Metal_Mark_Tree",
    "Ocean_Drum",
    "Plastic_Caps",
    "Pod_Rattle",
    "Rainstick",
    "Shell_Wind_Chimes",
]

export const TransitionZone: Zone = {
    type: "Feature",
    properties: {
        "name": "Transition Zone",
    },
    geometry: {
        "type": "Polygon",
        "coordinates": []
    },
    folderName: "Between Zones",
    tracks: Transitions,
}

export const Zones: Zone[] = [
    {
        type: "Feature",
        properties: {
            "name": "Crystal Memories",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58122, 37.10818], // top left
                [-113.57906, 37.10818], // top right
                [-113.57906, 37.10646], // bottom right
                [-113.58122, 37.10646], // bottom left
            ]]
        },
        style: {
            color: "#00ffff",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Crystal Memories 2020",
        tracks: ["Crystal_Memories_2020"],
    },
    {
        type: "Feature",
        properties: {
            "name": "Mural Alley",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
            [-113.58450, 37.10991], // top left
            [-113.583316, 37.10991], // top right
            [-113.583316, 37.10818], // bottom right
            [-113.58450, 37.108180], // bottom left
            ]]
        },
        style: {
            color: "#0000ee",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Mural Alley",
        tracks: [
            "Mural_Alley_Flute_Guitar_Glass",
            "Mural_Alley_Flute_Guitar_Shells",
            "Mural_Alley_Flute_Marimba_Glass",
            "Mural_Alley_Flute_Marimba_Guitar_Shell_Cymbal",
            "Mural_Alley_Flute_Marimba_Shells",
            "Mural_Alley_Flute_Vibe_Glass",
            "Mural_Alley_Flute_Vibe_Marimba_Guitar",
            "Mural_Alley_Flute_Vibe_Marimba_Guitar_Glass",
            "Mural_Alley_Flute_Vibe_Marimba_Guitar_Glass_Cymbal_Tam_1",
            "Mural_Alley_Flute_Vibe_Marimba_Guitar_Glass_Cymbal_Tam_2",
            "Mural_Alley_Flute_Vibe_Marimba_Guitar_Shells",
            "Mural_Alley_Flute_Vibe_Marimba_Guitar_Shells_Cymbal_Scrape_Tam_1",
            "Mural_Alley_Flute_Vibe_Marimba_Guitar_Shells_Cymbal_Scrape_Tam_2",
            "Mural_Alley_Flute_Vibe_Shells"
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "95 West",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
            [-113.58660, 37.106503], // top left
            [-113.58328, 37.106503], // top right
            [-113.58328, 37.096349], // bottom right
            [-113.58660, 37.096349], // bottom left
            ]]
        },
        style: {
            color: "#00ffff",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Ninety Five West",
        tracks: [
            "Ninety_Five_West"
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Zone 3",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
            [-113.58970, 37.10991], // top left
            [-113.58660, 37.10991], // top right
            [-113.58660, 37.106503], // bottom right
            [-113.58970, 37.106503], // bottom left
            ]]
        },
        style: {
            color: "#0000ee",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Zone 3",
        tracks: [
            "Zone_3_Guitar_Antarctic_Sun_Carbon_Particles",
            "Zone_3_Guitar_Antarctic_Sun",
            "Zone_3_Guitar_Carbon_Particles",
            "Zone_3_Guitar_Harp_1_Antarctic_Sun",
            "Zone_3_Guitar_Harp_1_Carbon_Particles",
            "Zone_3_Guitar_Harp_1",
            "Zone_3_Guitar_Harp_2_Antarctic_Sun",
            "Zone_3_Guitar_Harp_2_Carbon_Particles",
            "Zone_3_Guitar_Harp_2",
            "Zone_3_Guitar_Harp_3_Antarctic_Sun",
            "Zone_3_Guitar_Harp_3",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "South Temple",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
            [-113.57906, 37.102233], // top left
            [-113.57489, 37.102233], // top right
            [-113.57489, 37.098014], // bottom right
            [-113.57906, 37.098014], // bottom left
            ]]
        },
        style: {
            color: "#0000ee",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "South Temple",
        tracks: [
            "South_Temple_1_Vibe_and_Marimba",
            "South_Temple_2_Vibe_and_Guitar",
            "South_Temple_3_Flute_Guitar_Vibe",
            "South_Temple_4_Alto_Flute_Guitar_Vibe",
            "South_Temple_5_Alto_Flute_Marimba_Vibe",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Fireclay Ave",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
            [-113.57916, 37.106460], // top left
            [-113.57589, 37.106460], // top right
            [-113.57589, 37.10396], // bottom right
            [-113.57916, 37.10396], // bottom left
            ]]
        },
        style: {
            color: "#0000ee",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Fire Clay",
        tracks: [
            "Fire_Clay_Guitar_Solo_No_Wah",
            "Fire_Clay_Guitar_Solo",
            "Fire_Clay_Vibe_Solo_1",
            "Fire_Clay_Vibe_Solo_2",
            "Fire_Clay_Vibe_Solo_3",
            "Fire_Clay_Vibe_Solo_4",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Marimba Improvs",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
            [-113.57589, 37.10646], // top left
            [-113.57267, 37.10646], // top right
            [-113.57267, 37.10396], // bottom right
            [-113.57589, 37.10396], // bottom left
            ]]
        },
        style: {
            color: "#00ffff",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Marimba Free Improvisation",
        tracks: [
            "Marimba_Free_Improvisation_1",
            "Marimba_Free_Improvisation_2",
            "Marimba_Free_Improvisation_3",
            "Marimba_Free_Improvisation_4",
            "Marimba_Free_Improvisation_5",
            "Marimba_Free_Improvisation_6",
            "Marimba_Free_Improvisation_7",
            "Marimba_Free_Improvisation_8",
            "Marimba_Free_Improvisation_9",
            "Marimba_Free_Improvisation_10",
            "Marimba_Free_Improvisation_11",
            "Marimba_Free_Improvisation_12",
            "Marimba_Free_Improvisation_13",
            "Marimba_Free_Improvisation_14",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Outlaw",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
            [-113.57589, 37.10396], // top left
            [-113.57267, 37.10396], // top right
            [-113.57267, 37.10223], // bottom right
            [-113.57589, 37.10223], // bottom left
            ]]
        },
        style: {
            color: "#ee00ee",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Outlaw",
        tracks: [
            "Outlaw_Guitar",
            "Outlaw_Tenor",
            "Outlaw_Trombone",
            "Outlaw_Vibraphone",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Outlaw",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
            [-113.57489, 37.10223], // top left
            [-113.57267, 37.10223], // top right
            [-113.57267, 37.10137], // bottom right
            [-113.57489, 37.10137], // bottom left
            ]]
        },
        style: {
            color: "#ee00ee",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Outlaw",
        tracks: [
            "Outlaw_Guitar",
            "Outlaw_Tenor",
            "Outlaw_Trombone",
            "Outlaw_Vibraphone",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Land Of Endurance",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58329, 37.10396], // top left
                [-113.57589, 37.10396], // top right
                [-113.57589, 37.10223], // bottom right
                [-113.58329, 37.10223], // bottom left
                ]]
        },
        style: {
            color: "#ff0000",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Land Of Endurance",
        tracks: [
            "Land_of_Endurance_Almost_LoFi",
            "Land_of_Endurance_Big_Broom_Stick_50_Ways",
            "Land_of_Endurance_Big_Broom_Stick_Mumbles",
            "Land_of_Endurance_Hot_Rod_High_Hat",
            "Land_of_Endurance_Hot_Rods",
            "Land_of_Endurance_Loose_Drums",
            "Land_of_Endurance_Lucky_Number",
            "Land_of_Endurance_Phil_Collins_Doesnt_Live_Here",
            "Land_of_Endurance_Snare_Drum_City",
            "Land_of_Endurance_Tighter_Drums",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "99 Drones",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58328, 37.10646], // top left
                [-113.57916, 37.10646], // top right
                [-113.57916, 37.10396], // bottom right
                [-113.58328, 37.10396], // bottom left
                ]]
        },
        style: {
            color: "#00ff00",
            weight: 0,
            opacity: 0.2,
        },
        folderName: "Ninety Nine Drones",
        tracks: [
            "Ninety_Nine_Drones",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Slow Zone",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.583316, 37.10818], // top left
                [-113.58122, 37.10818], // top right
                [-113.58122, 37.10646], // bottom right
                [-113.58328, 37.10646], // bottom left
                ]]
        },
        style: {
            color: "#aaaaee",
            weight: 0,
            opacity: 0.6,
        },
        folderName: "Slow Zone",
        tracks: [
            "Slow_Zone",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Birds",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.57906, 37.10818], // top left
                [-113.57699, 37.10818], // top right
                [-113.57699, 37.10646], // bottom right
                [-113.57906, 37.10646], // bottom left
                ]]
        },
        style: {
            color: "#aaaaee",
            weight: 0,
            opacity: 0.6,
        },
        folderName: "Birds",
        tracks: [
            "Birds_Alto_Flute_Bass_Clarinet",
            "Birds_Alto_Flute_Marimba_Bass_Clarinet",
            "Birds_Alto_Flute_Marimba_Flute",
            "Birds_Alto_Flute_Marimba_Violin",
            "Birds_Alto_Flute_Marimba",
            "Birds_Alto_Flute_Violin",
            "Birds_Alto_Flute",
            "Birds_Bass_Clarinet_Violin_Marimba",
            "Birds_Bass_Clarinet_Violin",
            "Birds_Everything",
            "Birds_Flute_Alto_Flute",
            "Birds_Flute_Bass_Clarinet",
            "Birds_Flute_Marimba",
            "Birds_Flute_Violin",
            "Birds_Flute",
            "Birds_Marimba",
            "Birds_Violin_Marimba",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Sabor - Iceberg",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58122, 37.10991], // top left
                [-113.57697, 37.10991], // top right
                [-113.57697, 37.10818], // bottom right
                [-113.58122, 37.10818], // bottom left
                ]]
        },
        style: {
            color: "#ff00ff",
            weight: 0,
            opacity: 0.4,
        },
        folderName: "Sabor to Iceberg",
        tracks: [
            "Sabor_to_Iceberg_Bass_Conga",
            "Sabor_to_Iceberg_Bass_Guitar_4_Conga",
            "Sabor_to_Iceberg_Guitar_3_Bass_Conga_Drums",
            "Sabor_to_Iceberg_Guitar_4_Conga",
            "Sabor_to_Iceberg_Trumpet_Bass_Guitar_4_Conga",
            "Sabor_to_Iceberg_Trumpet_Guitar_1_Bass_Conga_Drums",
            "Sabor_to_Iceberg_Trumpet_Guitar_1_Drums_Bass",
            "Sabor_to_Iceberg_Trumpet_Guitar_2_Bass_Conga_Drums",
            "Sabor_to_Iceberg_Trumpet_Guitar_2_Drums",
            "Sabor_to_Iceberg_Trumpet_Guitar_3_Bass_Conga_Drums",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Warner Valley",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.583316, 37.10991], // top left
                [-113.58122, 37.10991], // top right
                [-113.58122, 37.10818], // bottom right
                [-113.583316, 37.10818], // bottom left
                ]]
        },
        style: {
            color: "#00ff00",
            weight: 0,
            opacity: 0.4,
        },
        folderName: "Warner Valley",
        tracks: [
            "Warner_Valley_Guitar_Marimba",
            "Warner_Valley_Guitar_Melody_Vibe_Fills",
            "Warner_Valley_Guitar_Melody",
            "Warner_Valley_No_Melody",
            "Warner_Valley_Trumpet_Guitars",
            "Warner_Valley_Trumpet",
            "Warner_Valley_Vibe_Melody_Guitar_Fills",
            "Warner_Valley_Vibe_Solo_1",
            "Warner_Valley_Vibe_Solo_2",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Restless Morning",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58330, 37.11255], // top left
                [-113.58122, 37.11255], // top right
                [-113.58122, 37.10991], // bottom right
                [-113.58330, 37.10991], // bottom left
                ]]
        },
        style: {
            color: "#eeff00",
            weight: 0,
            opacity: 0.4,
        },
        folderName: "Restless Morning",
        tracks: [
            "Restless_Morning_Everything",
            "Restless_Morning_Marimba",
            "Restless_Morning_Marimba_Sleigh_Bell",
            "Restless_Morning_Marimba_Wood_Block",
            "Restless_Morning_Sleigh_Bells",
            "Restless_Morning_Wood_Block",
            "Restless_Morning_Xylo",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Bass Eventually",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58330, 37.11499], // top left
                [-113.57907, 37.11499], // top right
                [-113.57907, 37.11255], // bottom right
                [-113.58330, 37.11255], // bottom left
                ]]
        },
        style: {
            color: "#ff0000",
            weight: 0,
            opacity: 0.4,
        },
        folderName: "Bass Eventually",
        tracks: [
            "Bass_Eventually_1_Everything",
            "Bass_Eventually_2_No_Cello",
            "Bass_Eventually_3_No_Keys",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Bass Eventually",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58122, 37.11255], // top left
                [-113.57914, 37.11255], // top right
                [-113.57914, 37.10991], // bottom right
                [-113.58122, 37.10991], // bottom left
                ]]
        },
        style: {
            color: "#ff0000",
            weight: 0,
            opacity: 0.4,
        },
        folderName: "Bass Eventually",
        tracks: [
            "Bass_Eventually_1_Everything",
            "Bass_Eventually_2_No_Cello",
            "Bass_Eventually_3_No_Keys",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "We Will Be Glad v1",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58449, 37.10818], // top left
                [-113.583316, 37.10818], // top right
                [-113.583316, 37.10655], // bottom right
                [-113.58449, 37.10655], // bottom left
                ]]
        },
        style: {
            color: "#ffff22",
            weight: 0,
            opacity: 0.8,
        },
        folderName: "We Will Be Glad 1",
        tracks: [
            "We_Will_Be_Glad_1_Alto_Flute",
            "We_Will_Be_Glad_1_Bass_Clarinet",
            "We_Will_Be_Glad_1_Flute",
            "We_Will_Be_Glad_1_Guitar_Violin",
            "We_Will_Be_Glad_1_Sax_Flute",
            "We_Will_Be_Glad_1_Soprano_Sax",
            "We_Will_Be_Glad_1_Violin",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "We Will Be Glad v2",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58540, 37.10991], // top left
                [-113.58450, 37.10991], // top right
                [-113.58450, 37.10818], // bottom right
                [-113.58540, 37.10818], // bottom left
                ]]
        },
        style: {
            color: "#ff0022",
            weight: 0,
            opacity: 0.8,
        },
        folderName: "We Will Be Glad 2",
        tracks: [
            "We_Will_Be_Glad_2_Alto_Flute",
            "We_Will_Be_Glad_2_Bass_Clarinet_Alto_Flute",
            "We_Will_Be_Glad_2_Bass_Clarinet",
            "We_Will_Be_Glad_2_Flute",
            "We_Will_Be_Glad_2_Soprano_Sax",
            "We_Will_Be_Glad_2_Tenor_Sax",
            "We_Will_Be_Glad_2_Violin",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Not Whole Tone",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58546, 37.11156], // top left
                [-113.58330, 37.11156], // top right
                [-113.58330, 37.10991], // bottom right
                [-113.58546, 37.10991], // bottom left
                ]]
        },
        style: {
            color: "#00ffff",
            weight: 0,
            opacity: 0.8,
        },
        folderName: "Not Whole Tone",
        tracks: [
            "Not_Whole_Tone_Eeverything",
            "Not_Whole_Tone_Flute_Camel",
            "Not_Whole_Tone_Flute_Picc_Camel",
            "Not_Whole_Tone_Marimba_Camel",
            "Not_Whole_Tone_Marimba_Vibe_Plastic",
            "Not_Whole_Tone_Picc_Camel",
            "Not_Whole_Tone_Vibe_Key",
            "Not_Whole_Tone_Vibe_Marimba_Key",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Out in the Wild",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58546, 37.11499], // top left
                [-113.58330, 37.11499], // top right
                [-113.58330, 37.11156], // bottom right
                [-113.58546, 37.11156], // bottom left
                ]]
        },
        style: {
            color: "#00ee22",
            weight: 0,
            opacity: 0.8,
        },
        folderName: "Out In the Wild",
        tracks: [
            "Out_In_the_Wild",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Bike Lane",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[
                [-113.58958, 37.11333], // top left
                [-113.58546, 37.11333], // top right
                [-113.58546, 37.10991], // bottom right
                [-113.58958, 37.10991], // bottom left
                ]]
        },
        style: {
            color: "#ff00ff",
            weight: 0,
            opacity: 0.8,
        },
        folderName: "Bike Lane",
        tracks: [
            "Bike_Lane_Everything",
            "Bike_Lane_Guitar_and_Marimba_1_and_Organ",
            "Bike_Lane_Guitar_and_Marimba_1",
            "Bike_Lane_Guitar_and_Marimba_2",
            "Bike_Lane_Guitar_Synth_1_and_Synth_3",
            "Bike_Lane_Marimba_1_Synth_3",
            "Bike_Lane_Marimba_2_Synth_1_and_Synth_2",
            "Bike_Lane_Organ_Guitar_and_Synth_5",
            "Bike_Lane_Synth_4_and_Marimba_1",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Trumpet and Timp",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[     
                [-113.58540, 37.10818], // top left
                [-113.58449, 37.10818], // top right
                [-113.58449, 37.106503], // bottom right
                [-113.58540, 37.106503], // bottom left
                ]]
        },
        style: {
            color: "#ff00ff",
            weight: 0,
            opacity: 0.8,
        },
        folderName: "Trumpet Timp",
        tracks: [
            "Trumpet_and_Timp_Bottom_Octave_Trumpet",
            "Trumpet_and_Timp_Everything",
            "Trumpet_and_Timp_Less_Trumpet",
            "Trumpet_and_Timp_Timp_Solo",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Spider Heaven",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[     
                [-113.59184, 37.10983], // top left
                [-113.58970, 37.10983], // top right
                [-113.58970, 37.10654], // bottom right
                [-113.59184, 37.10654], // bottom left
                ]]
        },
        style: {
            color: "#ff0000",
            weight: 0,
            opacity: 0.8,
        },
        folderName: "Spider Heaven",
        tracks: [
            "Spider_Heaven_Lego_1_Metal_2",
            "Spider_Heaven_Lego_1_Plastic_2",
            "Spider_Heaven_Perc_1_Lego_2",
            "Spider_Heaven_Perc_1_Metal_2",
            "Spider_Heaven_Perc_1_Perc_2",
            "Spider_Heaven_Perc_1_Plastic_2",
            "Spider_Heaven_Perc_2_Lego_1",
            "Spider_Heaven_Perc_2_Metal_1",
            "Spider_Heaven_Perc_2_Plastic_1",
        ],
    },
    {
        type: "Feature",
        properties: {
            "name": "Copper Glow",
        },
        geometry: {
            "type": "Polygon",
            "coordinates": [[     
                [-113.58660, 37.10991], // top left
                [-113.58540, 37.10991], // top right
                [-113.58540, 37.106503], // bottom right
                [-113.58660, 37.106503], // bottom left
                ]]
        },
        style: {
            color: "#B87333",
            weight: 0,
            opacity: 0,
        },
        folderName: "Copper Glow",
        tracks: [
            "Copper_Glow",
        ],
    },
]
