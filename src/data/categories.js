// ScrapMandi Catalog & Standards (PRD v1.1 Compliant)

export const SCRAP_CATEGORIES = [
  {
    id: "ferrous",
    name: "Ferrous Metals",
    hindiName: "लोहा एवं फेरस स्क्रैप",
    icon: "Hammer",
    color: "slate",
    units: ["kg", "tonne"],
    defaultUnit: "tonne",
    description: "Iron, MS scrap, heavy melting scrap, turnings, and cast metals.",
    subcategories: [
      { id: "hms1", name: "HMS 1 (Heavy Melting Steel)", grades: ["Grade 80:20", "Grade 70:30", "Industrial Heavy"], baseBenchmark: 38500, unit: "tonne" },
      { id: "hms2", name: "HMS 2 (Light Melting Steel)", grades: ["Standard Commercial", "Fabrication Off-cuts"], baseBenchmark: 35200, unit: "tonne" },
      { id: "ms_scrap", name: "MS Scrap (Mild Steel)", grades: ["Structure Scrap", "Pipe Scrap", "Angle / Channel"], baseBenchmark: 36800, unit: "tonne" },
      { id: "cast_iron", name: "Cast Iron", grades: ["Automotive CI", "Machinery CI", "Grade 1 Clean"], baseBenchmark: 33500, unit: "tonne" },
      { id: "turnings_borings", name: "Turnings & Borings", grades: ["Dry Machine Chips", "Oily Turning Scrap"], baseBenchmark: 29000, unit: "tonne" },
      { id: "shredded_steel", name: "Shredded Steel 211", grades: ["Clean Auto Shred", "High Density Baler"], baseBenchmark: 39200, unit: "tonne" }
    ]
  },
  {
    id: "non_ferrous",
    name: "Non-Ferrous Metals",
    hindiName: "अलौह धातु (तांबा, पीतल, एल्युमिनियम)",
    icon: "Coins",
    color: "amber",
    units: ["kg"],
    defaultUnit: "kg",
    description: "High-value copper, brass, aluminium, zinc, lead, and stainless steel.",
    subcategories: [
      { id: "copper_berry", name: "Copper Armature / Berry", grades: ["Bright Clean Wire (99%)", "Heavy Armature", "Birch / Cliff Mixed"], baseBenchmark: 765, unit: "kg" },
      { id: "brass_honey", name: "Brass (Honey & Purza)", grades: ["Clean Honey 60/40", "Ship Brass", "Utensil Mix"], baseBenchmark: 485, unit: "kg" },
      { id: "aluminium_extrusion", name: "Aluminium Extrusion 6063", grades: ["Clean Anodized 6063", "Mill Finish 6063", "Painted Extrusion"], baseBenchmark: 215, unit: "kg" },
      { id: "aluminium_tense", name: "Aluminium Tense / Cast", grades: ["Engine Block Casting", "Clean Wheels", "Mixed Tense"], baseBenchmark: 168, unit: "kg" },
      { id: "stainless_steel_304", name: "Stainless Steel SS-304", grades: ["SS-304 Magnet-free", "Industrial Sheet Off-cuts"], baseBenchmark: 128, unit: "kg" },
      { id: "lead_battery", name: "Lead Scrap", grades: ["Soft Lead Remelted", "Hard Battery Plates"], baseBenchmark: 182, unit: "kg" },
      { id: "zinc_dross", name: "Zinc Die Cast / Dross", grades: ["Clean Die Cast", "Galvanizer Dross"], baseBenchmark: 220, unit: "kg" }
    ]
  },
  {
    id: "paper",
    name: "Paper & Pulp",
    hindiName: "कागज और रद्दी गत्ता",
    icon: "FileText",
    color: "emerald",
    units: ["kg", "tonne"],
    defaultUnit: "kg",
    description: "Corrugated cardboard, OCC, newspapers, craft offcuts, and office paper.",
    subcategories: [
      { id: "occ_cardboard", name: "OCC Corrugated Cardboard", grades: ["Grade A Mill Baled", "Loose Box Scrap", "Supermarket Clean"], baseBenchmark: 15.5, unit: "kg" },
      { id: "old_newspaper", name: "Old Newspapers (ONP)", grades: ["Over-issue Clean (OINP)", "Standard Reader Read"], baseBenchmark: 18.0, unit: "kg" },
      { id: "office_white_paper", name: "Office Records & White Ledger", grades: ["Shredded White Paper", "Ledger Binder Free"], baseBenchmark: 24.5, unit: "kg" },
      { id: "kraft_paper", name: "Kraft Mill Waste", grades: ["100% Virgin Kraft Off-cuts", "Mixed Kraft Board"], baseBenchmark: 16.0, unit: "kg" }
    ]
  },
  {
    id: "plastic",
    name: "Industrial & Rigid Plastics",
    hindiName: "प्लास्टिक स्क्रैप",
    icon: "Boxes",
    color: "blue",
    units: ["kg"],
    defaultUnit: "kg",
    description: "PET bottles, HDPE drums, LDPE films, PVC pipes, and ABS engineering scrap.",
    subcategories: [
      { id: "pet_bottles", name: "PET Flakes / Bottles", grades: ["Clear Washed Flakes (Hot)", "Cold Washed Clear", "Green / Mixed Baled"], baseBenchmark: 46.0, unit: "kg" },
      { id: "hdpe_drums", name: "HDPE Blow / Regrind", grades: ["Blue Drum Regrind", "Milk Bottle Natural", "Mixed Blow Regrind"], baseBenchmark: 68.0, unit: "kg" },
      { id: "ldpe_film", name: "LDPE Clean Film", grades: ["Grade 98/2 Transparent", "Coloured Post-Consumer Film"], baseBenchmark: 54.0, unit: "kg" },
      { id: "pvc_pipes", name: "PVC Rigid Regrind", grades: ["Clean White Conduit", "Agricultural Grey Pipe"], baseBenchmark: 42.0, unit: "kg" },
      { id: "abs_engineering", name: "ABS / Polycarbonate", grades: ["Appliance White ABS", "Automotive PC/ABS"], baseBenchmark: 78.0, unit: "kg" }
    ]
  },
  {
    id: "ewaste",
    name: "E-Waste & Batteries",
    hindiName: "ई-कचरा एवं बैटरियां",
    icon: "Cpu",
    color: "purple",
    units: ["kg", "unit"],
    defaultUnit: "kg",
    description: "Telecom boards, server motherboards, batteries, copper cables, and monitors.",
    subcategories: [
      { id: "server_pcb", name: "Server / Telecom PCBs", grades: ["High Grade Gold-plated", "Green Motherboard Clean"], baseBenchmark: 850, unit: "kg" },
      { id: "computer_ram_cpu", name: "RAM & Ceramic CPUs", grades: ["Gold Finger Memory", "Ceramic Core Chips"], baseBenchmark: 1450, unit: "kg" },
      { id: "lead_acid_batteries", name: "Lead Acid UPS / Inverter Batteries", grades: ["Dry Drained", "Sealed Wet Core"], baseBenchmark: 95, unit: "kg" },
      { id: "copper_wiring_harness", name: "Automotive Wiring Harness", grades: ["Car Loom Complete (50% Cu)", "Heavy Industrial Cable"], baseBenchmark: 380, unit: "kg" }
    ]
  },
  {
    id: "rubber_glass",
    name: "Rubber & Industrial Glass",
    hindiName: "रबर टायर एवं ग्लास",
    icon: "Disc",
    color: "zinc",
    units: ["tonne", "unit", "kg"],
    defaultUnit: "tonne",
    description: "Truck radial tyres, buffing powder, glass cullet, and window sheets.",
    subcategories: [
      { id: "truck_tyres", name: "Truck Radial Tyres (TBR)", grades: ["Cut Tread Tyres", "Whole TBR Scrap", "Bead Wire Free"], baseBenchmark: 11500, unit: "tonne" },
      { id: "rubber_crumb", name: "Crumb Rubber / Buffing", grades: ["30 Mesh Clean Powder", "Tread Buffings"], baseBenchmark: 24000, unit: "tonne" },
      { id: "glass_cullet", name: "Flint / Clear Glass Cullet", grades: ["Sorted Bottle Cullet", "Float Window Glass Clean"], baseBenchmark: 4200, unit: "tonne" }
    ]
  }
];

export const MAJOR_MANDIS = [
  { city: "Mandi Gobindgarh", state: "Punjab", region: "North", hubType: "Major Steel & Scrap Hub", tag: "Steel Capital" },
  { city: "Delhi-NCR", state: "Delhi / Haryana", region: "North", hubType: "Multi-Category Mega Hub", tag: "Trading Core" },
  { city: "Mumbai / Navi Mumbai", state: "Maharashtra", region: "West", hubType: "Port & Industrial Hub", tag: "Export / Import" },
  { city: "Alang / Bhavnagar", state: "Gujarat", region: "West", hubType: "Shipbreaking Heavy Scrap", tag: "Ship Scrap" },
  { city: "Ahmedabad", state: "Gujarat", region: "West", hubType: "Foundry & Non-Ferrous Hub", tag: "Industrial" },
  { city: "Chennai", state: "Tamil Nadu", region: "South", hubType: "Automotive & Non-Ferrous Hub", tag: "Auto Cluster" },
  { city: "Raipur", state: "Chhattisgarh", region: "East", hubType: "Sponge Iron & Secondary Steel", tag: "Smelter Base" },
  { city: "Kolkata / Howrah", state: "West Bengal", region: "East", hubType: "Heavy Engineering & Paper Hub", tag: "Industrial Hub" },
  { city: "Hyderabad", state: "Telangana", region: "South", hubType: "E-Waste & Non-Ferrous Aggregation", tag: "Tech & Metals" }
];

export const ORDER_STATES = {
  ORDER_CREATED: {
    key: "order_created",
    label: "Order Created (Payment Pending)",
    hindiLabel: "ऑर्डर दर्ज / भुगतान लंबित",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Dealer requested order; awaiting payment authorization.",
    allowedNext: ["payment_confirmed", "payment_failed", "cancelled"]
  },
  PAYMENT_CONFIRMED: {
    key: "payment_confirmed",
    label: "Payment Confirmed",
    hindiLabel: "भुगतान प्राप्त (सत्यापित)",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Gateway confirmed server-side; awaiting vendor acceptance.",
    allowedNext: ["vendor_accepted", "vendor_rejected", "disputed"]
  },
  VENDOR_ACCEPTED: {
    key: "vendor_accepted",
    label: "Vendor Accepted",
    hindiLabel: "विक्रेता द्वारा स्वीकृत",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description: "Vendor verified inventory and scheduled dispatch/pickup.",
    allowedNext: ["ready_for_pickup", "vendor_rejected", "disputed"]
  },
  VENDOR_REJECTED: {
    key: "vendor_rejected",
    label: "Vendor Rejected",
    hindiLabel: "विक्रेता द्वारा अस्वीकृत",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    description: "Vendor could not fulfill; automatic refund flow initiated.",
    allowedNext: ["refund_pending", "refunded"]
  },
  READY_FOR_PICKUP: {
    key: "ready_for_pickup",
    label: "Ready for Pickup / In Transit",
    hindiLabel: "पिकअप हेतु तैयार / ट्रांजिट में",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    description: "Scrap is weighed, segregated, and ready at vendor yard.",
    allowedNext: ["completed", "disputed", "cancelled"]
  },
  COMPLETED: {
    key: "completed",
    label: "Completed & Settled",
    hindiLabel: "ऑर्डर पूर्ण एवं निपटान सम्पन्न",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    description: "Both parties signed off; settlement rules applied.",
    allowedNext: ["closed"]
  },
  DISPUTED: {
    key: "disputed",
    label: "Dispute Raised",
    hindiLabel: "विवाद दर्ज (जांच जारी)",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    description: "Quantity/grade dispute under admin review.",
    allowedNext: ["resolved_refund", "resolved_release"]
  },
  REFUNDED: {
    key: "refunded",
    label: "Refund Processed",
    hindiLabel: "रिफंड पूर्ण",
    badgeColor: "bg-zinc-100 text-zinc-800 border-zinc-200",
    description: "Funds returned to dealer gateway source.",
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
