interface IFlashCard {
  FlashCard: {
    UserID?: number;
    FlashCardID?: number;
    FlashCardQuestion: string;
    FlashCardAnswer: string;
    FlashCardCategory: number;
    CreatedDate: Date;
  };
}
export default IFlashCard;
