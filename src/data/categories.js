// ScrapMandi Catalog & Standards - Delhi NCR Scrap Mandi Focus

export const SCRAP_CATEGORIES = [
  {
    id: "ferrous",
    name: "Loha & Steel Scrap",
    hindiName: "लोहा एवं स्टील स्क्रैप",
    icon: "Hammer",
    color: "slate",
    units: ["kg", "tonne"],
    defaultUnit: "tonne",
    description: "MS scrap, heavy melting scrap (HMS), saria tukda, iron turnings, cast iron.",
    subcategories: [
      { id: "hms1", name: "HMS 1 (Heavy Melting Steel)", grades: ["Heavy Structure 80:20", "Industrial Plate Cut", "Girder / Channel"], baseBenchmark: 38800, unit: "tonne" },
      { id: "hms2", name: "HMS 2 (Light Melting Scrap)", grades: ["Fabrication Off-cuts", "Light Pipe Scrap", "Mixed Commercial"], baseBenchmark: 35400, unit: "tonne" },
      { id: "ms_scrap", name: "MS Scrap (Mild Steel)", grades: ["Saria Tukda / TMT Ends", "Angle & Channel Scrap", "Heavy Machine Parts"], baseBenchmark: 37200, unit: "tonne" },
      { id: "cast_iron", name: "Cast Iron (Kaccha Loha)", grades: ["Automotive CI Engine Blocks", "Machinery Casting Clean"], baseBenchmark: 34000, unit: "tonne" },
      { id: "turnings_borings", name: "Loha Chhilan (Turnings)", grades: ["Dry Machine Turning", "Lathe Turning Scrap"], baseBenchmark: 29500, unit: "tonne" },
      { id: "cr_hr_sheet", name: "CR / HR Sheet Scrap", grades: ["Prime Sheet Cuttings", "Press Scrap Bundles"], baseBenchmark: 40500, unit: "tonne" }
    ]
  },
  {
    id: "non_ferrous",
    name: "Tamba, Peetal & Aluminium",
    hindiName: "अलौह धातु (तांबा, पीतल, एल्युमिनियम)",
    icon: "Coins",
    color: "amber",
    units: ["kg"],
    defaultUnit: "kg",
    description: "High-value copper wire/armature, brass purza, aluminium section & utensil scrap.",
    subcategories: [
      { id: "copper_berry", name: "Copper Armature / Berry", grades: ["99% Bright Clean Wire", "Motor Armature Scrap", "Copper Pipe / Tube"], baseBenchmark: 775, unit: "kg" },
      { id: "brass_honey", name: "Brass Purza (Honey Peetal)", grades: ["Clean Honey 60/40", "Sanitary & Valve Brass", "Peetal Bartan Mix"], baseBenchmark: 490, unit: "kg" },
      { id: "aluminium_extrusion", name: "Aluminium Section 6063", grades: ["Clean White Section 6063", "Anodized Section Cut", "Coloured Extrusion"], baseBenchmark: 218, unit: "kg" },
      { id: "aluminium_tense", name: "Aluminium Tense / Bartan", grades: ["Bartan Scrap (Utensil)", "Cast Engine Part (Tense)", "Aluminium Wire Clean"], baseBenchmark: 172, unit: "kg" },
      { id: "stainless_steel_304", name: "SS-304 Stainless Steel", grades: ["SS-304 Sheet Scrap (Magnet-free)", "Industrial Vessel Scrap"], baseBenchmark: 132, unit: "kg" },
      { id: "lead_battery", name: "Sikka / Lead Scrap", grades: ["Soft Lead Raw", "Battery Lead Plates"], baseBenchmark: 185, unit: "kg" },
      { id: "zinc_dross", name: "Jasta / Zinc Scrap", grades: ["Die Cast Scrap", "Zinc Tukda / Dross"], baseBenchmark: 225, unit: "kg" }
    ]
  },
  {
    id: "paper",
    name: "Raddi & Cardboard (Gatta)",
    hindiName: "रद्दी कागज और गत्ता",
    icon: "FileText",
    color: "emerald",
    units: ["kg", "tonne"],
    defaultUnit: "kg",
    description: "Corrugated OCC boxes, raddi newspaper, office white records, duplex board.",
    subcategories: [
      { id: "occ_cardboard", name: "OCC Gatta (Corrugated Boxes)", grades: ["Mill Baled Box Gatta", "Loose Factory Carton Scrap", "Clean Kraft Bales"], baseBenchmark: 16.0, unit: "kg" },
      { id: "old_newspaper", name: "Raddi Akhbaar (Newspaper)", grades: ["OINP Clean Over-issue", "Regular Mixed Newspaper"], baseBenchmark: 18.5, unit: "kg" },
      { id: "office_white_paper", name: "White Record / Office Paper", grades: ["Clean White Ledger Paper", "School Book & Notebook Scrap"], baseBenchmark: 25.0, unit: "kg" },
      { id: "kraft_paper", name: "Kraft Mill Waste", grades: ["Baled Kraft Trimmings", "Duplex Board Waste"], baseBenchmark: 16.5, unit: "kg" }
    ]
  },
  {
    id: "plastic",
    name: "Industrial Plastic Scrap",
    hindiName: "प्लास्टिक दाना एवं कबाड़",
    icon: "Boxes",
    color: "blue",
    units: ["kg"],
    defaultUnit: "kg",
    description: "PET bottle scrap, HDPE drum dana, LDPE polythene film, PVC pipeline, ABS plastic.",
    subcategories: [
      { id: "pet_bottles", name: "PET Bottle & Flakes", grades: ["Hot Washed Transparent Flakes", "Cold Washed Clear", "Green/Mix Baled Bottles"], baseBenchmark: 47.5, unit: "kg" },
      { id: "hdpe_drums", name: "HDPE Drum & Can Scrap", grades: ["Blue Drum Regrind", "White Milk Bottle Scrap", "Moulded HDPE Scrap"], baseBenchmark: 70.0, unit: "kg" },
      { id: "ldpe_film", name: "LDPE Polythene Film", grades: ["Clean Transparent 98/2", "Packaging Coloured Film"], baseBenchmark: 55.0, unit: "kg" },
      { id: "pvc_pipes", name: "PVC Pipeline & Conduit", grades: ["White Conduit Pipe Regrind", "Grey Agri Pipe Scrap"], baseBenchmark: 43.5, unit: "kg" },
      { id: "abs_engineering", name: "ABS / PP Plastic Scrap", grades: ["Appliance White ABS", "Automotive Bumper PP"], baseBenchmark: 79.0, unit: "kg" }
    ]
  },
  {
    id: "ewaste",
    name: "E-Waste & Battery Scrap",
    hindiName: "ई-वेस्ट और पुरानी बैटरी",
    icon: "Cpu",
    color: "purple",
    units: ["kg", "unit"],
    defaultUnit: "kg",
    description: "Computer motherboards, inverter batteries, copper wiring harness, transformer core.",
    subcategories: [
      { id: "server_pcb", name: "Motherboard & PCBs", grades: ["High Grade Gold Finger PCB", "Mixed Green Electronic Board"], baseBenchmark: 880, unit: "kg" },
      { id: "computer_ram_cpu", name: "RAM & Ceramic Processor", grades: ["Gold Plated RAM Sticks", "Ceramic Core Processor Chips"], baseBenchmark: 1480, unit: "kg" },
      { id: "lead_acid_batteries", name: "Inverter & UPS Batteries", grades: ["Dry Inverter Battery (Clean)", "Automotive 12V Battery Scrap"], baseBenchmark: 98, unit: "kg" },
      { id: "copper_wiring_harness", name: "Gadi Wiring Loom / Cables", grades: ["Automotive Wire Harness 50% Cu", "Heavy Transformer Wire"], baseBenchmark: 395, unit: "kg" }
    ]
  },
  {
    id: "rubber_glass",
    name: "Old Tyres & Glass Cullet",
    hindiName: "पुराने टायर और कांच",
    icon: "Disc",
    color: "zinc",
    units: ["tonne", "unit", "kg"],
    defaultUnit: "tonne",
    description: "Truck/bus tyres, crumb rubber, broken bottle glass and float glass sheets.",
    subcategories: [
      { id: "truck_tyres", name: "Truck Radial Tyres (TBR)", grades: ["Cut Tread Commercial Tyres", "Whole Truck Tyre Lot"], baseBenchmark: 11800, unit: "tonne" },
      { id: "rubber_crumb", name: "Crumb Rubber Powder", grades: ["30 Mesh Clean Rubber Powder", "Tyre Buffing Powder"], baseBenchmark: 24500, unit: "tonne" },
      { id: "glass_cullet", name: "Glass Cullet (Kanch Ka Tukda)", grades: ["Sorted Beer/Soda Bottle Glass", "Clear Window Float Glass"], baseBenchmark: 4300, unit: "tonne" }
    ]
  }
];

export const MAJOR_MANDIS = [
  { city: "Mayapuri Scrap Yard", state: "Delhi", region: "West Delhi", hubType: "Major Auto & Metal Scrap Market", tag: "Main Hub" },
  { city: "Mundka Metal Market", state: "Delhi", region: "West Delhi", hubType: "Heavy Iron, Structure & Machinery Hub", tag: "Heavy Scrap" },
  { city: "Bawana Industrial Area", state: "Delhi", region: "North Delhi", hubType: "Plastics, Polymers & Metal Processing", tag: "Industrial Hub" },
  { city: "Wazirpur Industrial Area", state: "Delhi", region: "North West Delhi", hubType: "Stainless Steel & Utensils Cluster", tag: "Steel Hub" },
  { city: "Okhla Industrial Area", state: "Delhi", region: "South Delhi", hubType: "Paper, E-Waste & Fabrication Scrap", tag: "Phases 1-3" },
  { city: "Naraina Industrial Area", state: "Delhi", region: "South West Delhi", hubType: "Non-Ferrous & Cable Scrap Hub", tag: "Trading Core" },
  { city: "Sahibabad & Ghaziabad", state: "NCR (UP)", region: "East NCR", hubType: "Foundry Scrap & Sheet Cuttings", tag: "Border Hub" },
  { city: "Faridabad Industrial Belt", state: "NCR (Haryana)", region: "South NCR", hubType: "Auto Component & Forging Scrap", tag: "Foundry Belt" },
  { city: "Gurugram & Manesar", state: "NCR (Haryana)", region: "South West NCR", hubType: "Automotive & Heavy Industry Waste", tag: "Auto Cluster" },
  { city: "Narela Industrial Area", state: "Delhi", region: "North Delhi", hubType: "Plastics, PVC & Packaging Scrap", tag: "Manufacturing" }
];

export const ORDER_STATES = {
  ORDER_CREATED: {
    key: "order_created",
    label: "Order Created (Payment Pending)",
    hindiLabel: "ऑर्डर दर्ज / पेमेंट पेंडिंग",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Buyer requested lot. Waiting for payment authorization.",
    allowedNext: ["payment_confirmed", "payment_failed", "cancelled"]
  },
  PAYMENT_CONFIRMED: {
    key: "payment_confirmed",
    label: "Payment Confirmed (Held)",
    hindiLabel: "पेमेंट प्राप्त (सुरक्षित)",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Amount held securely. Awaiting yard vendor confirmation.",
    allowedNext: ["vendor_accepted", "vendor_rejected", "disputed"]
  },
  VENDOR_ACCEPTED: {
    key: "vendor_accepted",
    label: "Vendor Accepted (Yard Slot Ready)",
    hindiLabel: "विक्रेता द्वारा स्वीकृत",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description: "Yard vendor confirmed stock & shared weighbridge gate details.",
    allowedNext: ["ready_for_pickup", "vendor_rejected", "disputed"]
  },
  VENDOR_REJECTED: {
    key: "vendor_rejected",
    label: "Vendor Rejected",
    hindiLabel: "विक्रेता द्वारा रद्द",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    description: "Vendor could not fulfill. Auto refund initiated back to buyer.",
    allowedNext: ["refund_pending", "refunded"]
  },
  READY_FOR_PICKUP: {
    key: "ready_for_pickup",
    label: "Ready for Loading / In Transit",
    hindiLabel: "लोडिंग हेतु तैयार / रास्ते में",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    description: "Material segregated at yard. Dharam Kanta slip ready.",
    allowedNext: ["completed", "disputed", "cancelled"]
  },
  COMPLETED: {
    key: "completed",
    label: "Completed & Settled",
    hindiLabel: "सौदा पूर्ण (पेमेंट रिलीज)",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    description: "Weighbridge weight verified. Payout released to vendor.",
    allowedNext: ["closed"]
  },
  DISPUTED: {
    key: "disputed",
    label: "Dispute Raised (Kanta Mismatch)",
    hindiLabel: "विवाद दर्ज (जांच जारी)",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    description: "Weight or grade mismatch under admin review.",
    allowedNext: ["resolved_refund", "resolved_release"]
  },
  REFUNDED: {
    key: "refunded",
    label: "Refund Processed",
    hindiLabel: "रिफंड वापस हुआ",
    badgeColor: "bg-zinc-100 text-zinc-800 border-zinc-200",
    description: "Full amount returned to buyer account.",
    allowedNext: []
  }
};

export const LISTING_STATES = {
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  SOLD: "Sold",
  EXPIRED: "Expired",
  SUSPENDED: "Suspended"
};
