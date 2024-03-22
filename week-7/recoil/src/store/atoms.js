import { atom } from "recoil";

const networkAtom = atom({
  key: "networkAtom",
  default: 102
})

const jobsAtom = atom({
  key: "jobsAtom",
  default: 0
})

const messagingAtom = atom({
  key: "messagingAtom",
  default: 0
})

const notificationAtom = atom({
  key: "notificationAtom",
  default: 12
})

export { jobsAtom, messagingAtom, networkAtom, notificationAtom };
