/**
 * Hominode Demo Video Configuration
 *
 * To swap in a real MP4, set HOMINODE_DEMO_VIDEO to the path of your video file.
 * Example:
 *   export const HOMINODE_DEMO_VIDEO = "/assets/videos/hominode-demo.mp4";
 *
 * When HOMINODE_DEMO_VIDEO is null, the interactive animated demo player renders instead.
 */
export const HOMINODE_DEMO_VIDEO: string | null = null;

export const HOMINODE_DEMO_POSTER: string | null = null;

export const HOMINODE_DEMO_DURATION = "2 min";

export const HOMINODE_DEMO_TITLE = "Hominode Platform Demo";

export const HOMINODE_DEMO_CHAPTERS = [
  { id: 1,  label: "Dashboard",    time: 0   },
  { id: 2,  label: "Resident App", time: 15  },
  { id: 3,  label: "Visitors",     time: 27  },
  { id: 4,  label: "Security",     time: 40  },
  { id: 5,  label: "Maintenance",  time: 52  },
  { id: 6,  label: "Amenities",    time: 64  },
  { id: 7,  label: "Parking",      time: 75  },
  { id: 8,  label: "Community",    time: 87  },
  { id: 9,  label: "Marketplace",  time: 99  },
  { id: 10, label: "Complaints",   time: 110 },
  { id: 11, label: "Staff",        time: 121 },
  { id: 12, label: "Admin",        time: 132 },
  { id: 13, label: "White Label",  time: 165 },
] as const;
