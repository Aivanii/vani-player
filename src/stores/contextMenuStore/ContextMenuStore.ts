import { makeAutoObservable } from "mobx";

class ContextMenuStore {
  isOpen: boolean = false;
  x: number = 0;
  y: number = 0;
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  open = (x: number, y: number, items) => {
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
