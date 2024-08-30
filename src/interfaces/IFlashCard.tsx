interface IFlashCard {
  FlashCard: {
    userID?: string;
    flashCardID?: number;
    flashCardQuestion: string;
    flashCardAnswer: string;
    flashCardCategoryID: number;
    createdDate: Date;
  };
}
export default IFlashCard;
