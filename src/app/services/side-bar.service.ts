import { Injectable } from '@angular/core';
import { Bar } from '../constant/alink';
import { SEARCH_SIDE_BAR, STRATEGY_SIDE_BAR } from '../constant/sider-bar';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  constructor() {}

  public sidebar:Bar = SEARCH_SIDE_BAR;

  init() {
    let path = window.location.pathname;
    switch (true) {
      case path == '/':
        return true;
      case path == '/home':
        return false;
      case path.includes('search'):
        this.sidebar = SEARCH_SIDE_BAR;
        return true;
      case path.includes('strategy'):
        this.sidebar = STRATEGY_SIDE_BAR;
        return true;
      default:
        return false;
    }
  }

  isActive(link: string) {
    let path = window.location.pathname;

    if (path.includes(link)) {
      return 'active'
    }
    return '';
  }
}
