export interface IWithTabsState {
  activeTab: string;
}

export interface InjectingProps {
  activeTab: string;
  renderTabs: () => void;
}
