import { makeAutoObservable } from "mobx";
import type { Song } from "../../types";

class ContextMenuStore {
  isOpen: boolean = false;
  x: number = 0;
  y: number = 0;
  items: object | undefined;
  song: Song | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  open = (x: number, y: number, items: object) => {
    this.isOpen = true;
    this.x = x;
    this.y = y;
    this.items = items;
  };

  close = () => {
    this.isOpen = false;
  };
}

export const contextMenuStore = new ContextMenuStore();
