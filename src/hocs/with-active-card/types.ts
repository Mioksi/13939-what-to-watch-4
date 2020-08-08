export interface IWithActiveCardState {
  activeCard: number;
}

export interface InjectingProps {
  onCardMouseEnter: (id: number) => void
  onCardMouseLeave: () => void
}
