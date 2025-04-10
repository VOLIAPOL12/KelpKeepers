import image1 from '../assets/images/sky-high-seaweed.jpg';
import image2 from '../assets/images/rapid-growth-champions.png';
import image3 from '../assets/images/buoyant-bladders.jpg';
import image4 from '../assets/images/human-connections.png';
import image5 from '../assets/images/great-southern-reef.jpg';
import image6 from '../assets/images/biodiversity-hotspot.jpg';
import image7 from '../assets/images/economic-contribution.png';
import image8 from '../assets/images/loss-in-tasmania.jpg';
import image9 from '../assets/images/formidable-fortresses.jpg';
import image10 from '../assets/images/process-of-destruction.jpg';
import image11 from '../assets/images/rapid-population-expansion.jpg';
import image12 from '../assets/images/natural-predators.jpg';
import image13 from '../assets/images/culinary-delicacy.jpg';
import image14 from '../assets/images/harvesting-urchins.jpg';
import image19 from '../assets/images/restores-balance.jpg';
import image20 from '../assets/images/coast-shield.jpg';
import image21 from '../assets/images/oxygen-machine.jpg';
import image22 from '../assets/images/ocean-tree-power.png';
import image23 from '../assets/images/urchin-culling-and-harvesting.png';
import image24 from '../assets/images/innovative-restoration.jpg';
import image25 from '../assets/images/video-reviving-giants.png';


export const hotspotData = [
  {
    id: 'kelp',
    position: { top: '60%', right: '22%' },
    title: 'THE UNDERWATER JUNGLE',
    dialogType: 'cards',
    layout: { xs: 12, sm: 6, md: 3 },
    content: [
      {
        id: 1,
        title: "Sky-High Seaweed",
        image: image1,
        description: `Imagine a marine organism so colossal that it rivals the height of a 20-story building.
        Giant kelp (Macrocystis pyrifera) can soar to lengths exceeding 100 feet (30 meters), with some specimens
        stretching up to an astonishing 175 feet (53 meters) under ideal conditions.`,
        type: "info",
      },
      {
        id: 2,
        title: "Rapid G rowth Champions",
        image: image2,
        description: `Hold onto your fins! Giant kelp isn't just about size; it's about speed. In the race of growth,
        this marine marvel leaves most in its wake, shooting up at rates of up to 2 feet (60 centimeters) per day.
        This rapid ascent allows it to reach the ocean's surface swiftly, forming dense, sun-dappled canopies that teem with life.`,
        type: "info",
      },
      {
        id: 3,
        title: "Buoyant Bladders",
        image: image3,
        description: `Ever wonder how these towering algae stand upright in the ocean's depths? Enter the pneumatocysts: gas-filled
        bladders nestled at the base of each blade. These natural floatation devices elevate the kelp toward sunlight, essential for
        photosynthesis, and contribute to the formation of expansive underwater forests.`,
        type: "info",
      },
      {
        id: 4,
        title: "Human Connections",
        image: image4,
        description: `Beyond their ecological significance, giant kelp touches human lives in surprising ways. Compounds derived from
        kelp are found in everyday products like toothpaste, ice cream, and even cosmetics, showcasing the versatility and importance
        of this marine giant.`,
        type: "info",
      },
      {
        id: 5,
        title: "Great Southern Reef",
        image: image5,
        description: `Stretching over 8,000 kilometers from Kalbarri in Western Australia to the Queensland border, the GSR boasts
        the world's longest continuous kelp forest.`,
        type: "info-graph",
      },
      {
        id: 6,
        title: "Biodiversity Hotspot",
        image: image6,
        description: `Kelp forests in the GSR is a global biodiversity hotspot, home to numerous species across at least nine phyla.
        Around 60% of all species in this region are endemic, meaning they are found nowhere else on Earth.`,
        type: "info",
      },
      {
        id: 7,
        title: "Economic Contribution",
        image: image7,
        description: `Kelp supports significant economic activities, with fishing and tourism industries generating at least AU$10
        billion annually. This includes lucrative fisheries such as Australian rock lobster and abalone, which are integral to local economies.`,
        type: "info",
      },
      {
        id: 8 ,
        title: "Loss in Tasmania",
        image: image8,
        description: `Tasmania has experienced a dramatic decline in giant kelp forests, with over 95% loss attributed to ocean warming and
        climate change. This decline threatens the rich biodiversity and the stability of marine ecosystems in the region. `,
        type: "info",
      },
    ],
    unlocked: true,
  },
  {
    id: 'kelp-dead',
    position: { top: '40%', left: '13%' },
    title: 'THE URCHIN INVASION',
    dialogType: 'cards',
    layout: { xs: 12, sm: 6, md: 4 },
    content: [
      {
        id: 9,
        title: "Formidable Fortresses",
        image: image9,
        description: `The Purple Sea Urchin (Heliocidaris erythrogramma) is a spiny survivor of Australia’s southern coast, clinging to rocky
        shores and shallow waters up to 35 m deep. Ranging in colour from olive to vivid purple, this striking urchin was once mistaken for multiple
        species. It burrows into stone, hides beneath shells and sand, and gathers in tight clusters armored for survival.`,
        type: "info",
      },
      {
        id: 10,
        title: "Process of Destruction",
        image: image10,
        descriptions: [
          {
            title: "Rising sea temperatures",
            description: `Sea temperatures are rising worldwide with global warming. Tasmanian waters have warmed by 2°C over the past century, a
            rate three to four times the global average.`,
          },
          {
            title: "Booming urchin population",
            description: `Warmer waters have facilitated the southward migration and population explosion of the long spined sea urchin (Centrostephanus
            rodgersii), extending its range by over 650 km into Tasmanian waters.`,
          },
          {
            title: "Kelp deforestation",
            description: `These sea urchins overgraze on kelp, transforming lush forests into barren areas known as "urchin barrens." This has led to
            the loss of 95% of giant kelp forests along Tasmania's east coast.`,
          },
          {
            title: "Ecosystem collapse",
            description: `The destruction of kelp forests disrupts marine ecosystems, leading to declines in biodiversity and negatively impacting the
            endemic species that depend on these habitats.`,
          },
        ],
        type: "slider",
      },
      {
        id: 11,
        title: "Rapid Population Expansion",
        image: image11,
        description: `Rising ocean temperatures have facilitated their southward migration. In Tasmania, numbers have surged from 11 million to over 20
        million in 15 years. If unchecked, 50% or remaining kelp could disappear by 2030, as seen in southern NSW and eastern Victoria.`,
        type: "info-graph",
      },
      {
        id: 12,
        title: "Natural Predators",
        image: image12,
        description: `​The decline of key sea urchin predators, such as sunflower sea stars due to sea star wasting disease linked to warming waters, has
        led to unchecked sea urchin populations, resulting in the degradation of vital kelp forest ecosystems.​`,
        type: "info-graph",
      },
      {
        id: 13,
        title: "Culinary Delicacy",
        image: image13,
        description: `Beneath their prickly armor lies a gastronomic gem: the sea urchin's gonads, known as "uni." Revered across global cuisines, uni is
      celebrated for its rich, creamy texture and briny sweetness. In Japan, it's a sushi staple, often served atop rice to highlight its delicate flavor.
      Mediterranean cultures savor it spread on crostini or blended into pasta dishes, adding a touch of the sea to their culinary creations​`,
        type: "info",
      },
      {
        id: 14,
        title: "Harvesting Urchins",
        image: image14,
        description: `Efforts in harvesting sea urchins are small because removing them is time consuming and labor intensive. This is where you can make
        a difference! Voluntary culling efforts and raising awareness can help restore balance to these vital ecosystems. ​`,
        type: "info",
      },
    ],
    unlocked: false,
  },
  {
    id: 'fish',
    position: { top: '60%', left: '22%' },
    title: 'THE COMMUNITY AT RISK',
    dialogType: 'cards',
    layout: { xs: 12, sm: 6, md: 3 },
    content: [
      {
        id: 15,
        title: "Sea Star",
        image: "frontend/src/assets/images/sky-high-seaweed.jpg",
        description: `One of the world’s rarest seastars, once abundant in Tasmania’s coastal waters, has declined by nearly 90% over the past 20 years.
        Habitat destruction and competition from invasive seastar species have driven it to the brink of extinction.​`,
        type: "info-graph",
      },
      {
        id: 16,
        title: "Leafy Seadragon",
        image: "frontend/src/assets/images/sky-high-seaweed.jpg",
        description: `The  seadragon, with its leaf-like appendages, is listed as near threatened. Its survival depends on disappearing kelp, taking with
        them the seadragon’s refuge and breeding grounds, pushing the species closer to extinction.​`,
        type: "info-graph",
      },
      {
        id: 17,
        title: "Spotted Handfish",
        image: "frontend/src/assets/images/sky-high-seaweed.jpg",
        description: `Once abundant in Tasmania’s Derwent Estuary, the first marine fish listed as critically endangered. Its sharp decline is tied to habitat
        degradation and the loss of vital kelp covered breeding sites, making it a symbol of marine crisis.​`,
        type: "info-graph",
      },
      {
        id: 18,
        title: "Abalone",
        image: "frontend/src/assets/images/sky-high-seaweed.jpg",
        description: `The marine jewels of Australia’s reefs, are under severe threat, with 37% of species globally facing extinction. The widespread loss of
        kelp, their main food source, has caused mass mortalities, with red abalone populations declining by up to 80% in some regions.​`,
        type: "info-graph",
      },
    ],
    unlocked: false,
  },
  { 
    id: 'sunlight',
    position: { top: '10%', left: '45%', color: 'black' },
    title: 'CLIMATE FIGHTING POWERHOUSE',
    dialogType: 'cards',
    layout: { xs: 12, sm: 6, md: 3 },
    content: [
      {
        id: 19,
        title: "Restores Balance",
        image: image19,
        description: `These submerged forests are bustling metropolises, providing sanctuary and sustenance to a myriad of marine species. From the elusive spotted handfish to the vibrant abalone, countless creatures depend on kelp forests for survival. The decline of these habitats spells disaster for marine biodiversity, leading to cascading effects throughout the ecosystem.​`,
        type: "info",
      },
      {
        id: 20,
        title: "Coast Shield",
        image: image20,
        description: `Acting as formidable barriers, kelp forests absorb the ocean's fury, dissipating wave energy and safeguarding coastlines from erosion. In an era where climate change intensifies storm activity and accelerates sea-level rise, the protective role of kelp becomes increasingly vital.​`,
        type: "info",
      },
      {
        id: 21,
        title: "Oxygen Machine",
        image: image21,
        description: `Through relentless photosynthesis, kelp forests are prolific oxygen factories, contributing significantly to the Earth's oxygen supply. Their unparalleled productivity not only supports marine life but also enriches the very air we breathe.​`,
        type: "info",
      },
      {
        id: 22,
        title: "Ocean Tree Power",
        image: image22,
        description: `In the battle against climate change, kelp forests emerge as unsung heroes. They efficiently capture and store vast amounts of carbon dioxide, with Australian kelp forests accounting for over 30% of the nation's blue carbon sequestration. This remarkable capacity positions them as crucial allies in mitigating global warming.​`,
        type: "info",
      },
    ],
    unlocked: false,
  },
  {
    id: 'diver',
    position: { top: '65%', left: '46%' },
    title: 'BATTLE TO REVIVE KELP',
    dialogType: 'cards',
    layout: { xs: 12, sm: 6, md: 4 },
    content: [
      {
        id: 23,
        title: "Urchin Culling and Harvesting",
        image: image23,
        description: `In Port Phillip Bay, divers are waging an underwater war, systematically culling millions of purple sea urchins that have decimated approximately 60% of the bay's rocky reefs. Similarly, along New South Wales' southern coast, the 'Restoration Through Urchin Harvest' pilot program is transforming ecological threats into economic opportunities by harvesting urchins for their prized roe and as agricultural fertilizer, thereby financing further restoration efforts.​​`,
        type: "info",
      },
      {
        id: 24,
        title: "Innovative Restoration",
        image: image24,
        description: `Beyond culling, pioneering methods are being deployed to rejuvenate kelp ecosystems. In Tasmania, a groundbreaking $3.5 million project unites marine industries, Indigenous communities, and scientists to rear and replant giant kelp, remove invasive seaweed species, and bolster populations of urchin-eating rock lobsters.  Additionally, the development of modular robotic platforms aims to enhance kelp restoration by actively managing urchin populations through advanced underwater technology.​`,
        type: "info",
      },
      {
        id: 25,
        title: "YouTube Video",
        image: image25, 
        type: "video",
        videoUrl: "https://www.youtube.com/embed/rCRncbD1X7g",
      }
      
    
    ], 
    unlocked: false,
  },
];