// liveStore.js
import EventEmitter from "eventemitter3";

class LiveStoreClass {
  constructor() {
    this.breathing = [];   // breathing values
    this.fallEvents = [];  // fall detection logs
    this.helpEvents = [];  // help voice logs

    // Event emitter compatible with Expo React Native
    this.emitter = new EventEmitter();
  }

  // ⭐ Add breathing data
  addBreathing(value) {
    const entry = {
      value,
      time: Date.now(),
    };

    this.breathing.push(entry);

    // Keep only last 50 records
    if (this.breathing.length > 50) {
      this.breathing.shift();
    }

    // Notify UI components
    this.emitter.emit("update");
  }

  // ⭐ Get breathing data
  getBreathing() {
    return this.breathing;
  }

  // ⭐ Subscribe to changes
  subscribe(callback) {
    this.emitter.on("update", callback);

    // Cleanup function
    return () => this.emitter.off("update", callback);
  }
}

const LiveStore = new LiveStoreClass();
export default LiveStore;
