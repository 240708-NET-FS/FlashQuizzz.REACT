interface IFlashCard {
  FlashCard: {
    UserID?: string;
    FlashCardID?: number;
    FlashCardQuestion: string;
    FlashCardAnswer: string;
    FlashCardCategory: number;
    CreatedDate: Date;
  };
}
export default IFlashCard;
