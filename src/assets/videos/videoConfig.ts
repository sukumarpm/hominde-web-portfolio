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

export const HOMINODE_DEMO_DURATION = "1 min 15 sec";

export const HOMINODE_DEMO_TITLE = "Hominode Platform Demo";

export const HOMINODE_DEMO_CHAPTERS = [
  { id: 1,  label: "Green Wave",        time: 4  },
  { id: 2,  label: "Resident App",      time: 12 },
  { id: 3,  label: "Visitors & Gates",  time: 19 },
  { id: 4,  label: "Billing & Payments",time: 27 },
  { id: 5,  label: "Amenities",         time: 35 },
  { id: 6,  label: "Parcels",           time: 42 },
  { id: 7,  label: "Events",            time: 49 },
  { id: 8,  label: "Complaints",        time: 56 },
  { id: 9,  label: "Security",          time: 63 },
  { id: 10, label: "Final",             time: 70 },
] as const;
