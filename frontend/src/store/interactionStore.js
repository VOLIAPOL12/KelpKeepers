import { create } from "zustand";

const interactionStore = create((set) => ({
    currentHotspot: null,
    setCurrentHotspot: (hotspot) => set({ currentHotspot: hotspot }),
    hotspotList: [],
    setHotspotList: (list) => set({ hotspotList: list }),
    clearHotspot: () => set({ currentHotspot: null }),
}))

export default interactionStore;